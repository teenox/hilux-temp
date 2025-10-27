import { wheelsHelpers } from "../data/wheels";
import { build } from "./build";


export const populateWheels = (modelId: number) => {
    const wheelsContainer = document.getElementById('wheels');
    const modelWheels = wheelsHelpers.getModelWheels(modelId);

    let wheelsHtml = '';
    modelWheels.forEach(wheel => {
        wheelsHtml += `
            <div class="wheel flex-left" id="wheel${wheel.id}">
                <div class="image flex-left">
                    <img src='${wheel.image}'>
                </div>
                <div class="details">
                    <h2 class="small heading">${wheel.description}</h2>
                    <p>Standard</p>
                </div>
            </div>
        `;
    });

    wheelsContainer!.innerHTML = wheelsHtml;
};


export const addWheels = (wheelId: number) => {
    const wheel = wheelsHelpers.getById(wheelId);

    //sendUEMessage(wheel.ueMessage);
    
    //URLService.updateURLParam('wheels', wheelId);
    
    markActiveWheels(wheelId);
    
    build.wheels = wheelId;

    console.log("SET WHEELS: " + wheel?.description);
};
window.addWheels = addWheels;


const markActiveWheels = (wheelId: number) => {
    const wheelComponents = document.querySelectorAll('#wheels .wheel');
    wheelComponents.forEach(component => component.classList.remove('active'));
    
    const wheelElement = document.getElementById(`wheel${wheelId}`);
    wheelElement!.classList.add('active');
};


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        addWheels: (wheelId: number) => void;
    }
}

