import { conversionsHelpers } from "../data/conversions";
import { sendUEMessage } from "../services/unrealEngine";
import { build } from "./build";


export const openCloseDoors = (action: 'open' | 'close') => {
    const conversion = conversionsHelpers.getById(build.conversion);
    const doorsToggleBtn = document.getElementById('doorsToggleBtn')!;
    
    if (conversion) {
        if (action === 'open') {
            doorsToggleBtn.classList.remove('close-active');
            doorsToggleBtn.classList.add('open-active');
        }
        else if (action === 'close') {
            doorsToggleBtn.classList.remove('open-active');
            doorsToggleBtn.classList.add('close-active');
        }

        // to change later
        // const terms = [
        //     {
        //         conversion: 88888,
        //         term: 'drybox',
        //     },
        //     {
        //         conversion: 77777,
        //         term: 'canopy',
        //     },
        //     {
        //         conversion: 66666,
        //         term: 'techonly',
        //     },
        //     {
        //         conversion: 55555,
        //         term: 'tech and lid',
        //     },
        // ];

        if (conversion.doorsOpen) {

            // find term
            // const term = terms.find(term => term.conversion === conversion.id);
            // if (term) {
            //     const ueMessage = `${action} ${term.term}`; // e.g. 'open drybox' or 'close drybox'
            //     sendUEMessage(ueMessage);
            //     console.log(`${action} ${term.term}`);
            // }

            const ueMessage = `${action} ${conversion.ueMessage}`; // e.g. 'open full canopy' or 'close full canopy'
            sendUEMessage(ueMessage);
            console.log(`${action} ${conversion.ueMessage}`);
        }
    }
};
window.openCloseDoors = openCloseDoors;


export const setDoorsBtnVisibility = (action: 'show' | 'hide') => {
    const doorsToggle = document.getElementById('doorsToggleBtn')!;

    if (action === 'show') {
        // hide it first then show it after 4 seconds - this is useful when you change conversions so that the doors toggle don't stay visible
        doorsToggle.style.display = 'none';

        setTimeout(() => {
            doorsToggle.style.display = 'flex';
        }, 4000);
    }
    else if (action === 'hide') {
        doorsToggle.style.display = 'none';
    }
}


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
       openCloseDoors: (action: 'open' | 'close') => void
    }
}