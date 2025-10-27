
import { modelHelpers, models } from "../data/models";
import { changeView } from "../services/common";
import { sendUEMessage } from "../services/unrealEngine";
import { updateURLParam, getURLParam } from "../services/url";
import { populateAccessories, toggleAccessory } from "./accessories";
import { build, calculateTotalPrice } from "./build";
import { addExteriorColor, populateExteriorColors } from "./colors";
import { addConversion, populateConversions } from "./conversions";
import { changeEnvironment } from "./environments";
import { addWheels, populateWheels } from "./wheels";


const populateModelSelection = () => {
    const modelsContainer = document.getElementById('models')!;

    let modelsHtml = '';
    let selectedModel = build.model;

    models.forEach(model => {
        let cta = `
            <button class="primary btn" onclick="selectModel(${model.id}, 'new'); setModelSelectionVisibility('hide');">
                Select Derivative
            </button>
        `;

        if (model.id === selectedModel) {
            cta = `
                <button class="secondary btn" onclick="setModelSelectionVisibility('hide')">
                    Selected
                </button>
            `;
        }

        modelsHtml += `
            <div class="model">
                <div class="image">
                    <img src="assets/images/models/${model.image}" alt="${model.name}">
                </div>
                <div class="details">
                    <h2 class="large heading name">${model.name}</h2>
                    <div class="specs">
                        <p class="flex-between">
                            <span>SMC</span>
                            <span>${model.specs.smc}</span>
                        </p>
                        <p class="flex-between">
                            <span>Fuel System</span>
                            <span>${model.specs.fuelSystem}</span>
                        </p>
                        <p class="flex-between">
                            <span>Transmission</span>
                            <span>${model.specs.transmission}</span>
                        </p>
                        <p class="flex-between">
                            <span>Engine Capacity</span>
                            <span>${model.specs.engineCapacity}</span>
                        </p>
                    </div>
                    <div class="price">
                        <p>From</p>
                        <h2 class="large heading">R${model.price.toLocaleString()}</h2>
                    </div>
                    ${ cta }
                </div>
            </div>
        `;
    });

    modelsContainer.innerHTML = modelsHtml;
};


export const selectModel = (modelId: number, action: 'new' | 'custom' | 'default') => {
    const model = modelHelpers.getById(modelId);

    if (!model) {
        console.log('MODEL NOT FOUND - DEFAULT TO MODEL 1');
        selectModel(1, 'new');
        return;
    }

    build.model = modelId;
    
    console.log('SWITCHED TO MODEL: ' + model.shortName);

    sendUEMessage(model.shortName);

    // Populate model components
    populateExteriorColors(modelId);
    populateWheels(modelId);
    populateConversions();
    populateAccessories();
    populateSpecifications(modelId);

    if (action === 'new') {
        console.log("NEW MODEL SELECTED - RESET EVERYTHING");

        // Reset build
        build.exteriorColor = model.defaults.exteriorColor;
        build.wheels = model.defaults.wheels;
        build.conversion = 0;
        build.accessories = [];

        // Update URL params
        updateURLParam('mid', modelId);
        updateURLParam('conversion', '');
        updateURLParam('exteriorColor', model.defaults.exteriorColor);
        updateURLParam('accessories', '');
        updateURLParam('wheels', model.defaults.wheels);
        updateURLParam('view', 'exterior');
        updateURLParam('env', 'studio');
    } 
    else if (action === 'default') {
        console.log("MARK DEFAULTS");
        addExteriorColor(model.defaults.exteriorColor);
        addWheels(model.defaults.wheels);
    }
    else if (action === 'custom') {
        console.log("ALREADY CUSTOMISED - USE PREVIOUS SELECTIONS");
    }

    // Recalculate total price
    calculateTotalPrice();
};
window.selectModel = selectModel;


const populateSpecifications = (modelId: number) => {
    const model = modelHelpers.getById(modelId);

    // populate model name in more than 1 places
    const selectedModelNameLabels = document.querySelectorAll('.selected-model-name')!;
    const engineCapacity = document.getElementById('engineCapacity')!;
    const transmission = document.getElementById('transmission')!;
    const fuelSystem = document.getElementById('fuelSystem')!;
    const smc = document.getElementById('smc')!;

    if (model) {
        selectedModelNameLabels.forEach(label => label.textContent = model.name);
        engineCapacity.textContent = model.specs.engineCapacity;
        transmission.innerHTML = model.specs.transmission;
        fuelSystem.innerHTML = model.specs.fuelSystem;
        smc.innerHTML = model.specs.smc;
    }
};



export const setModelSelectionVisibility = (action: 'show' | 'hide') => {
    const modelSelection = document.getElementById('modelSelection')!;
    const modelSelectionDropdownBtn = document.getElementById('modelSelectionDropdownBtn')!;

    if (action === 'show') {
        populateModelSelection();

        modelSelection.style.display = 'flex';

        modelSelectionDropdownBtn.style.transform = 'rotate(-180deg)';

        setTimeout(() => {
            modelSelection.classList.add('open');
        }, 50);
    }
    else if (action === 'hide') {
        
        modelSelection.classList.remove('open');

        modelSelectionDropdownBtn.style.transform = 'rotate(0deg)';
        
        setTimeout(() => {
            modelSelection.style.display = 'none';
        }, 500);
    }
};
window.setModelSelectionVisibility = setModelSelectionVisibility;


export const loadPreviousSelections = () => {
    const modelParam = getURLParam('mid');
    const conversionParam = getURLParam('conversion');
    const accessoriesParam = getURLParam('accessories');
    const exteriorColorParam = getURLParam('exteriorColor');
    //const interiorColorParam = getURLParam('interiorColor');
    const wheelsParam = /*getURLParam('wheels')*/ 1;
    //const viewParam = getURLParam('view');
    //const environmentParam = getURLParam('env');

    if (modelParam) {
        const modelId = Number(modelParam);
        build.model = modelId;

        if (!conversionParam || !accessoriesParam || !exteriorColorParam) {
            selectModel(modelId, 'new');
        }

        if (conversionParam) {
            build.conversion = Number(conversionParam);
            const conversionId = Number(conversionParam);
            addConversion(conversionId);
        }

        if (accessoriesParam) {
            const accessories = accessoriesParam.split('-').map(Number);
            accessories.forEach(accessoryId => {
                toggleAccessory(accessoryId, 'add');
            });
        }

        if (exteriorColorParam) {
            build.exteriorColor = Number(exteriorColorParam);
            const exteriorColorId = Number(exteriorColorParam);
            addExteriorColor(exteriorColorId);
        }

        if (wheelsParam) {
            build.wheels = Number(wheelsParam);
            const wheelsId = Number(wheelsParam);
            addWheels(wheelsId);
        }

        //if (viewParam) changeView(viewParam);

        //if (environmentParam) changeEnvironment(environmentParam);
    }
    else  selectModel(1, 'new');
};


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        selectModel: (modelId: number, action: 'new' | 'custom') => void,
        setModelSelectionVisibility: (action: 'show' | 'hide') => void
    }
}