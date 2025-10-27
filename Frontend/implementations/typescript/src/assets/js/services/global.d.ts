// global.d.ts
import { PixelStreaming } from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6";

declare global {
    interface Window {
        pixelStreaming: PixelStreaming;
    }
}

export {};