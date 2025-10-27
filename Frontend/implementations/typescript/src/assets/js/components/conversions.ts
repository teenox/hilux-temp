import { conversions, conversionsHelpers } from '../data/conversions';
import { combinationsHelpers } from '../data/combinations';
import { getURLParam, updateURLParam } from '../services/url';
import { build, calculateTotalPrice} from './build';
import { setZoomOutBtnVisibility } from '../services/common';
import { openCloseDoors, setDoorsBtnVisibility } from './doors';
import { disableAccessory, toggleAccessory } from './accessories';
import { sendUEMessage } from '../services/unrealEngine';


export const populateConversions = () => {
    const conversionsContainer = document.getElementById('conversions')!;

    let conversionsHtml = '';
    conversions.forEach(conversion => {
        conversionsHtml += `
            <div class="conversion" onclick="addConversion(${conversion.id})" id="conversion${conversion.id}">
                <div class="image">
                    <img src='${conversion.image}'>
                    <button class='add-btn flex-center primary btn round'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2.5">
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                    </button>
                    <button class='remove-btn flex-center primary btn round'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2.5"> 
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg> 
                    </button>
                </div>
                <div class="details">
                    <p class="name">${conversion.name}</p>
                    <p class="price">R${conversion.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    });

    conversionsContainer.innerHTML = conversionsHtml;
};


export const addConversion = (conversionId: number) => {
    const conversion = conversionsHelpers.getById(conversionId);

    if (!conversion) {
        console.error(`conversion ${conversionId} not found`);
        return;
    }
    
    // Save build
    build.conversion = conversion.id;
    build.conversionPrice= conversion.price;

    if (getURLParam('mode') === '3d') {
        sendUEMessage(conversion.ueMessage);
        setZoomOutBtnVisibility('show');
        openCloseDoors('close'); //  make sure the doors are closed by default when selecting a different conversion
        
        // check if doors can be opened on this conversion
        if (conversion.doorsOpen) {
            setDoorsBtnVisibility('show');
        }
        else {
            setDoorsBtnVisibility('hide');
        }
    }

    // check if there are any un-allowed accessories for this conversion
    const unAllowedAccessories = conversion.unAllowedAccessories;
    if (unAllowedAccessories.length > 0) {
        unAllowedAccessories.forEach(accessoryId => {
            disableAccessory(accessoryId);
            toggleAccessory(accessoryId, 'remove');
        });

        console.log("UN-ALLOWED ACCESSORIES: " + unAllowedAccessories);
    }
    else {
        disableAccessory(0, true);

        console.log("NO UN-ALLOWED ACCESSORIES");
    }

    calculateTotalPrice();

    markActiveConversion('mark', conversionId);

    updateURLParam('conversion', conversionId);

    // sync with static mode
    combinationsHelpers.viewCombinations();
};


const markActiveConversion = (action: 'mark' | 'unmark', conversionId: number) => {
    const conversions = document.querySelectorAll('#conversions .conversion');
    conversions.forEach(conversion => conversion.classList.remove('active'));

    const conversion = document.getElementById(`conversion${conversionId}`)!;
    
    if (action === 'mark') {
        conversion.classList.add('active');
    } 
    else if (action === 'unmark') {
        conversion.classList.remove('active');
    }
};

window.addConversion = addConversion;


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        addConversion: (conversionId: number) => void
    }
}