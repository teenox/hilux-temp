

export const sendUEMessage = (message: string) => {
    
    //streampixel.io method
    // const streamIframe = document.getElementById('streamIframe') as HTMLIFrameElement;
    // if (streamIframe.contentWindow) {
    //     streamIframe.contentWindow.postMessage(message, 'https://share.streampixel.io');
    // }

    //pixel streaming method
    if (window.pixelStreaming) {
        window.pixelStreaming.emitUIInteraction(message);
    }
}