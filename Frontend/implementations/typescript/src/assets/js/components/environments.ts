import { sendUEMessage } from "../services/unrealEngine";
import { updateURLParam } from "../services/url";
import { setLoaderVisibility } from "./loader";


export const changeEnvironment = (environment: string) => {
    setLoaderVisibility('show', false);
    
    const environmentPreview = document.getElementById('environmentPreview')!;
    environmentPreview.style.backgroundImage = `url('assets/images/environments/${environment}.jpg')`;

    const environments = document.querySelectorAll('.environment');
    environments.forEach(env => {        
        if (env.classList.contains(environment)) {
            env.classList.add('active');
        } 
        else {
            env.classList.remove('active');
        }
    });
        
    updateURLParam('env', environment);
    sendUEMessage(environment);
    setEnvironmentsVisibility('hide');
    
    // Assuming the environment would have loaded in 4 seconds
    setTimeout(() => {
        setLoaderVisibility('hide', false);
    }, 4000);

    console.log("CHANGED ENVIRONMENT TO: " + environment);
}
window.changeEnvironment = changeEnvironment;


export const setEnvironmentsVisibility = (action: 'show' | 'hide' | 'toggle') => {
    const environments = document.getElementById('environments')!;

    if (action === 'show') {
        environments.classList.add('visible');
    } 
    else if (action === 'hide') {
        environments.classList.remove('visible');
    }
    else if (action === 'toggle') {
        environments.classList.toggle('visible');
    }
};
window.setEnvironmentsVisibility = setEnvironmentsVisibility;


export const setTimeOfDay = (time: 'day' | 'night') => {
    const timeOfDay = document.getElementById('timeOfDay')!;
    
    if (time === 'day') {
        sendUEMessage('day');
        console.log("CHANGED TIME OF DAY TO DAY");

        timeOfDay.classList.remove('night-active');
        timeOfDay.classList.add('day-active');
    } 
    else {
        sendUEMessage('night');
        console.log("CHANGED TIME OF DAY TO NIGHT");

        timeOfDay.classList.remove('day-active');
        timeOfDay.classList.add('night-active');
    }
}
window.setTimeOfDay = setTimeOfDay;


// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        changeEnvironment: (environment: string) => void;
        setEnvironmentsVisibility: (action: 'show' | 'hide' | 'toggle') => void;
        setTimeOfDay: (time: 'day' | 'night') => void;
    }
}