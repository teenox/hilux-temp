import { colorHelpers } from "../data/colors";
import { sendUEMessage } from "../services/unrealEngine";
import { updateURLParam } from "../services/url";
import { build } from "./build";


export const populateExteriorColors = (modelId: number) => {
    const colorsContainer = document.getElementById('exteriorColors')!;
    const exteriorColors = colorHelpers.getModelColors(modelId, 'exterior');

    let colorsHtml = '';
    exteriorColors.forEach(color => {
        colorsHtml += `
            <div class="component color flex-left light" id="color${color.id}" onclick="addExteriorColor(${color.id})">
                <div class="round circle flex-center" style="background-color: ${color.src}">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                </div>
                <p class="name">${color.name}</p>
            </div>
        `;
    });

    colorsContainer.innerHTML = colorsHtml;
};


export const addExteriorColor = (colorId: number) => {
    const color = colorHelpers.getById(colorId);

    if (!color) {
        console.error(`color ${colorId} not found`);
        return;
    }

    sendUEMessage(color.name);

    updateURLParam('exteriorColor', colorId);
    
    markActiveExteriorColor(colorId);
    
    build.exteriorColor = colorId;

    console.log("SET EXTERIOR COLOR: " + color.name);
};


const markActiveExteriorColor = (colorId: number) => {
    const colorComponents = document.querySelectorAll('#exteriorColors .color');
    colorComponents.forEach(component => component.classList.remove('active'));
    
    const colorElement = document.getElementById(`color${colorId}`)!;
    colorElement.classList.add('active');
};


window.addExteriorColor = addExteriorColor;


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        addExteriorColor: (colorId: number) => void
    }
}