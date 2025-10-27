
import { setDoorsBtnVisibility } from "../components/doors";
import { sendUEMessage } from "./unrealEngine";
import { getURLParam, updateURLParam } from "./url";



// ============================= ZOOM ====================================== //


export const setZoomOutBtnVisibility = (action: 'show' | 'hide', position: { top: string, left: string } | null = null) => {
    const zoomOutBtn = document.getElementById('zoomOutBtn')!;

    if (action === 'show') {
        // hide it first then show it after 4 seconds - this is useful when you change conversions so that the zoom out toggle don't stay visible
        zoomOutBtn.style.display = 'none';

        if (position) {
            // zoomOutBtn.style.top = position.top;
            // zoomOutBtn.style.left = position.left;
        }

        // wait for UE animation to finish
        setTimeout(() => {
            zoomOutBtn.style.display = 'flex';
        }, 4000);
    }
    else if (action === 'hide') {
        zoomOutBtn.style.display = 'none';
    }
}


export const zoomOut = () => {
    console.log("ZOOMING OUT");
    sendUEMessage('zoom out');
    setZoomOutBtnVisibility('hide');
    setDoorsBtnVisibility('hide');
}
window.zoomOut = zoomOut;


// ============================= FULLSCREEN ====================================== //

export const toggleFullscreen = () => {
    const fullscreenBtn = document.getElementById('fullscreenBtn')!;
    const canvas = document.getElementById('canvas')!;
    const threeD = document.getElementById('threeD')!;

    const fullscreenIcons = {
        maximise: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.25">
                <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
            </svg>
        `,
        minimise: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.25">
                <path d="M15 19v-2a2 2 0 0 1 2 -2h2"></path>
                <path d="M15 5v2a2 2 0 0 0 2 2h2"></path>
                <path d="M5 15h2a2 2 0 0 1 2 2v2"></path>
                <path d="M5 9h2a2 2 0 0 0 2 -2v-2"></path>
            </svg>
        `
    };
    
    const isFullscreen = canvas.classList.contains('fullscreen')!;

    if (isFullscreen) {
        canvas.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = fullscreenIcons.maximise;

        // exit fullscreen
        document.exitFullscreen();
    } 
    else {
        canvas.classList.add('fullscreen');
        fullscreenBtn.innerHTML = fullscreenIcons.minimise;
        
        // request fullscreen
        threeD.requestFullscreen();

        if (window.innerWidth <= 999) {
            // on mobile screen rotate to landscape
            (screen.orientation as any).lock('landscape');
        }
    }
}
window.toggleFullscreen = toggleFullscreen;


// ============================= Interior or Exterior View ====================================== //
export const changeView = (view: string) => {
    const viewParam = getURLParam('view');
    if (viewParam === view) return;

    updateURLParam('view', view);
    sendUEMessage(view);
    console.log("SWITCHED VIEW TO: " + view);
};
window.changeView = changeView;


// ============================= HEADER BACK BTN ====================================== //
export const goBack = () => {
    if (history.length > 1) {
        window.history.back();
    }
    else {
        window.location.href = 'https://toyota.co.za';
    }
}
window.goBack = goBack;


const toggleComponentsContainer = (group: string) => {
    const groupElement = document.querySelector(`.${group}-container`)!;
    const isExpanded = groupElement?.classList.contains('expanded') || false;
    
    if (isExpanded) {
        groupElement.classList.remove('expanded');
    } 
    else {
        groupElement.classList.add('expanded');
    }
};
window.toggleComponentsContainer = toggleComponentsContainer;


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        zoomOut: () => void,
        toggleFullscreen: () => void,
        changeView: (view: 'interior' | 'exterior') => void,
        goBack: () => void,
        toggleComponentsContainer: (group: string) => void
    }
}

