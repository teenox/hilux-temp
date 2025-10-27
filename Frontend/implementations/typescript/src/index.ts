// Copyright Epic Games, Inc. All Rights Reserved.
export * from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
export * from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
import { Config, PixelStreaming, Logger, LogLevel } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
const PixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

import { updateURLParam, getURLParam } from './assets/js/services/url';
import { selectModel, loadPreviousSelections } from './assets/js/components/modelSelection';
import { setLoaderVisibility } from './assets/js/components/loader';
import './assets/js/components/environments';

// expose the pixel streaming object for hooking into. tests etc.
declare global {
    interface Window { pixelStreaming: PixelStreaming; }
}

document.body.onload = async function() {
    Logger.InitLogging(LogLevel.Warning, true);
 
    const PIXEL_SESSION_KEY = "pixelSessionId";
    let pixelSessionId = localStorage.getItem(PIXEL_SESSION_KEY);
 
    try {
        const response = await fetch("/pixel-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pixelSessionId }),
        });
 
        if (!response.ok) throw new Error("Failed to POST /pixel-session");
        const data = await response.json();
        pixelSessionId = data.pixelSessionId || data.id || pixelSessionId || "session_id_not_found";
 
        localStorage.setItem(PIXEL_SESSION_KEY, pixelSessionId);
    } catch (err) {
        console.error("Error creating/updating pixel session:", err);
        pixelSessionId = "session_id_not_found";
    }
 
    console.log("Using pixelSessionId:", pixelSessionId);
 
    const config = new Config({
        useUrlParams: true,
        initialSettings: {
            StreamerId: pixelSessionId,
            AutoPlayVideo: true,
            AutoConnect: true,
            StartVideoMuted: true,
            HoveringMouse: true,
            WaitForStreamer: false,
        }
    });
 
    const stream = new PixelStreaming(config);
    const application = new Application({
        stream,
        onColorModeChanged: (isLightMode) =>
            PixelStreamingApplicationStyles.setColorMode(isLightMode),
    });
 
    document.getElementById("canvas")?.appendChild(application.rootElement);
    window.pixelStreaming = stream;
 
    window.pixelStreaming.addEventListener("videoInitialized", () => {
        console.log("STREAM LOADED");
        document.body.classList.remove("freeze");
 
        const configMode = getURLParam("mode") || "3d";
        if (configMode === "3d") {
            setTimeout(() => {
                console.log("LOADING PREVIOUS SELECTIONS AFTER STREAM HAS LOADED");
                loadPreviousSelections();
            }, 1500);
        }
 
        setLoaderVisibility("hide");
        unrealAlreadyLoaded = true;
    });
};

// document.body.onload = function() {
//     Logger.InitLogging(LogLevel.Warning, true);

//     const PIXEL_SESSION_KEY = "pixelSessionId";
//     const pixelSessionId = localStorage.getItem(PIXEL_SESSION_KEY) || 'session_id_not_found';
    
//     if(pixelSessionId){

//     }

//     fetch('/pixel-session').then

// 	// Create a config object
// 	const config = new Config({
//         useUrlParams: true,
//         initialSettings: {
//             AutoPlayVideo: true,
//             AutoConnect: true,
//             //HideUI: true,
//             StartVideoMuted: true,
//             HoveringMouse: true,
//             WaitForStreamer: false,
//         }
//     });

// 	// Create the main Pixel Streaming object for interfacing with the web-API of Pixel Streaming
// 	const stream = new PixelStreaming(config);

// 	const application = new Application({
// 		stream,
// 		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode)
// 	});
	
//     document.getElementById('canvas')?.appendChild(application.rootElement);

// 	window.pixelStreaming = stream;

//     window.pixelStreaming.addEventListener('videoInitialized', () => {
//         console.log("STREAM LOADED");
//         document.body.classList.remove('freeze');

//         const configMode = getURLParam('mode') || '3d';

//         if (configMode === '3d') {

//             // load previous selections once stream is FULLY ready (e.i about a second after it has loaded)
//             setTimeout(() => {
//                 console.log("LOADING PREVIOUS SELECTIONS AFTER STREAM HAS LOADED");
//                 loadPreviousSelections();
//             }, 1500);
//         }
        
//         setLoaderVisibility('hide');
//         unrealAlreadyLoaded = true;
//     })
// }


// CUSTOM FUNCTIONALITIES

document.addEventListener('DOMContentLoaded', () => {
    const modelId = Number(getURLParam('mid') || 1);
    selectModel(modelId, 'default');

    const configMode = getURLParam('mode') || '3d';
    changeConfigurationMode(configMode);

    if (configMode === 'static') {
        document.body.classList.remove('freeze');
    }
    else setLoaderVisibility('show');
});



// CHECK IF UNREAL ENGINE ALREADY LOADED
let unrealAlreadyLoaded = false;

// window.addEventListener('message', (event) => {
        
//     if (event.data.value === 'loadingComplete') {
//         console.log("STREAM LOADED");
//         document.body.classList.remove('freeze');

//         const configMode = getURLParam('mode') || '3d';

//         if (configMode === '3d') {

//             // load previous selections once stream is FULLY ready (e.i about a second after it has loaded)
//             setTimeout(() => {
//                 console.log("LOADING PREVIOUS SELECTIONS AFTER STREAM HAS LOADED");
//                 loadPreviousSelections();
//             }, 1500);
//         }
        
//         setLoaderVisibility('hide');
//         unrealAlreadyLoaded = true;
//     }
// });



// SWITCH BETWEEN 3D AND STATIC MODE
const changeConfigurationMode = (mode: string) => {    
    const configModeBtn = document.getElementById('configModeBtn')!;
    const main = document.getElementById('main')!;

    updateURLParam('mode', mode);

    if (mode === 'static') {
        main.classList.remove('unreal-mode');
        main.classList.add('static-mode');
        configModeBtn?.classList.remove('unreal-active');
        configModeBtn?.classList.add('static-active');
    } 
    else {
        if (!unrealAlreadyLoaded)
        {
            setLoaderVisibility('show');

            window.addEventListener('message', (event) => {
                if (event.data.value === 'loadingComplete') setLoaderVisibility('hide');
            })
        }

        main.classList.remove('static-mode');
        main.classList.add('unreal-mode');
        configModeBtn?.classList.remove('static-active');
        configModeBtn?.classList.add('unreal-active');
    }

    console.log("CHANGED CONFIGURATION MODE TO: " + mode);
    loadPreviousSelections();
}
window.changeConfigurationMode = changeConfigurationMode;




// PUT SHADOW ON LEFT PANEL ON MOBILE SCREEN
if (window.innerWidth <= 1250) {
    const leftPanel = document.getElementById('leftPanel')!;
    const main = document.getElementById('wrapper')!;

    main.addEventListener('scroll', () => {
        if (main.scrollTop > 60) {
            leftPanel.classList.add('fade');
        } 
        else {
            leftPanel.classList.remove('fade');
        }
    });
}




// GO TO STATIC MODE ON INACTIVITY FOR 5 MINUTES
// let inactivityTimer: any;
// const INACTIVITY_TIME = 20 * 60 * 1000; // 5 minutes in milliseconds

// function resetInactivityTimer() {
//     // Clear the existing timer
//     clearTimeout(inactivityTimer);
    
//     // Start a new timer
//     console.log("STARTING INACTIVITY TIMER");
//     inactivityTimer = setTimeout(() => {
//         // This is where you call your function after 5 minutes of inactivity
//         changeConfigurationMode('static');
//         console.log("GOING TO STATIC MODE ON INACTIVE");
//     }, INACTIVITY_TIME);
// }

// // Listen for user activity events
// const activityEvents = [
//     'mousedown',
//     //'mousemove',
//     'keypress',
//     'scroll',
//     'touchstart',
//     'click'
// ];

// // Add event listeners for all activity types
// activityEvents.forEach(event => {
//     document.addEventListener(event, resetInactivityTimer, true);
// });

// // Start the timer when the page loads
// resetInactivityTimer();





// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        changeConfigurationMode: (mode: string) => void
    }
}
