import { accessoriesHelpers } from "../data/accessories";
import { combinationsHelpers } from "../data/combinations";
import { setZoomOutBtnVisibility } from "../services/common";
import { sendUEMessage } from "../services/unrealEngine";
import { getURLParam, updateURLParam } from "../services/url";
import { build, calculateTotalPrice } from "./build";
import { setDoorsBtnVisibility } from "./doors";

export const populateAccessories = () => {
    const accessoriesContainer = document.getElementById('accessories')!;
    const accessories = accessoriesHelpers.getModelAccessories(build.model);

    let accessoriesHtml = '';
    accessories.forEach(accessory => {
        accessoriesHtml += `
            <div class="accessory" onclick="toggleAccessory(${accessory.id}, 'toggle')" id="accessory${accessory.id}">
                <div class="image">
                    <img src='${accessory.image}'>
                    <button class='add-btn flex-center btn round'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2.5">
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                    </button>
                    <button class='remove-btn flex-center btn round'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2.5"> 
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg> 
                    </button>
                </div>
                <div class="details">
                    <p class="name">${accessory.name}</p>
                    <p class="price">R${accessory.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    });

    accessoriesContainer.innerHTML = accessoriesHtml;
};

export const toggleAccessory = (accessoryId: number, action: 'add' | 'remove' | 'toggle') => {
    const accessory = accessoriesHelpers.getById(accessoryId);

    if (!accessory) {
        console.error(`accessory ${accessoryId} not found`);
        return;
    }

    const alreadyAdded = build.accessories.includes(accessoryId);

    let add = false;

    switch (action) {
        case 'add':
            add = true;
            break;
        case 'remove':
            add = false;
            break;
        case 'toggle':
            add = alreadyAdded ? false : true;
            break;
        default:
            add = false;
            break;
    }

    if (add && !alreadyAdded) {
        // push accessory to build state
        build.accessories.push(accessoryId);

        // make sure only 1 nudge bar (black or silver) is added - when adding the other - remove the other
        if (accessoryId === 11111 && build.accessories.includes(22222)) {
            toggleAccessory(22222, 'remove');
            console.log("NUDGE BAR SILVER ADDED - REMOVING NUDGE BAR BLACK");
        }

        if (accessoryId === 22222 && build.accessories.includes(11111)) {
            toggleAccessory(11111, 'remove');
            console.log("NUDGE BAR BLACK ADDED - REMOVING NUDGE BAR SILVER");
        }

        sendUEMessage(`add ${accessory.ueMessage}`);
        markActiveAccessory('mark', accessoryId);

        // only show the zoom out btn if in 3d mode
        const configMode = getURLParam('mode') || '3d';
        if (configMode === '3d') {
            setZoomOutBtnVisibility('show', accessory.position);
            setDoorsBtnVisibility('hide');
        }

        console.log(`add ${accessory.ueMessage}`);
    }
    else {
        // remove accessory
        build.accessories = build.accessories.filter(id => id !== accessoryId);
        
        sendUEMessage(`remove ${accessory.ueMessage}`);
        markActiveAccessory('unmark', accessoryId);
        console.log(`remove ${accessory.ueMessage}`);
    }

    updateURLParam('accessories', build.accessories.join('-'));
    
    // Recalculate total price
    calculateTotalPrice();

    // sync with static mode
    combinationsHelpers.viewCombinations();
};
window.toggleAccessory = toggleAccessory;


export const markActiveAccessory = (action: 'mark' | 'unmark', accessoryId: number) => {
    const accessory = document.getElementById(`accessory${accessoryId}`)!;

    if (action === 'mark') {
        accessory.classList.add('active');
    } 
    else if (action === 'unmark') {
        accessory.classList.remove('active');
    }
};

export const disableAccessory = (accessoryId: number, clear: boolean = false) => {
    const accessoryElements = document.querySelectorAll('#accessories .accessory');
    accessoryElements.forEach(accessory => accessory.classList.remove('disabled'));

    if (clear === false) {
        const accessoryElement = document.getElementById(`accessory${accessoryId}`)!;
        accessoryElement.classList.add('disabled');
    }
};

// Extend the Window interface to include the global function
declare global {
    interface Window {
        toggleAccessory: (accessoryId: number, action: 'add' | 'remove' | 'toggle') => void
    }
}

