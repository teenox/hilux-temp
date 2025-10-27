
let loaderInterval: any = null;


export const setLoaderVisibility = (action: 'show' | 'hide', instructions = true) => {
    const loader = document.getElementById('loader')!;

    // show or hide instructions
    if (!instructions) {
        loader.classList.add('hide-instructions');
    }
    else {
        loader.classList.remove('hide-instructions');
    }

    if (action === 'show') {
        loader.style.display = 'flex';
        
        // Show drag instructions first
        interchangeLoaderInstructions('drag');
        
        // Clear any existing interval first (just in case)
        if (loaderInterval) clearInterval(loaderInterval);

        loaderInterval = setInterval(() => {
            interchangeLoaderInstructions('drag');
        }, 10000);
    } 
    else if (action === 'hide') {
        loader.style.display = 'none';
        
        // Clear the interval when hiding
        if (loaderInterval) {
            clearInterval(loaderInterval);
            loaderInterval = null;
        }
    }
};


let currentInstruction: 'drag' | 'scroll' = 'drag';


const interchangeLoaderInstructions = (forceInstruction: 'drag' | 'scroll' | null = null) => {
    const loaderIcon = document.getElementById('loaderIcon')!;
    const instruction = document.getElementById('loaderInstruction')!;
    const loaderInstructions = {
        drag: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.44 76.76">
                    <defs>
                        <style>
                            .cls-100 { fill: none; stroke: white; stroke-miterlimit: 10; stroke-width: 2px;}
                        </style>
                    </defs>
                    <path class="cls-100" d="M32.85,75.5l22.58-14.59v-27.64c0-7.29-8.47-6.35-8.47-1.88v7.41-8.61c0-6.4-10.35-6.59-10.35,0v8.61-10.78c0-5.76-10.35-6-10.35,0v10.78V12.92c0-6.94-9.41-6.7-9.41,0v33.88s-5.76-5.65-7.35-7.23c-3.76-3.76-11.41,3.29-7.35,7.35,3.59,3.59,30.7,28.58,30.7,28.58Z"/>
                    <path class="cls-100" d="M34.38,16.45v-2.75c0-7.02-5.69-12.7-12.7-12.7h0c-7.02,0-12.7,5.69-12.7,12.7v2.75"/>
                </svg>
            `,
            instruction: 'Click and drag to change the view'
        },
        scroll: {
            icon: `
                <div class="mouse-animation">
                    <span></span>
                </div>
            `,
            instruction: 'Scroll with the mouse to zoom'
        }
    };

    // If we're forcing a specific instruction (like on initial load), use that
    if (forceInstruction) currentInstruction = forceInstruction;

    loaderIcon.innerHTML = loaderInstructions[currentInstruction].icon;
    instruction.innerHTML = loaderInstructions[currentInstruction].instruction;
    
    // Switch to the other instruction after 5 seconds
    setTimeout(() => {
        const nextInstruction = currentInstruction === 'drag' ? 'scroll' : 'drag';
        
        loaderIcon.innerHTML = loaderInstructions[nextInstruction].icon;
        instruction.innerHTML = loaderInstructions[nextInstruction].instruction;
        
        currentInstruction = nextInstruction;
    }, 5000);
};


