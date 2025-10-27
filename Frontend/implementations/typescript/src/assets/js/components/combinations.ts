

let currentAngle = 1; // 1-6

export const viewAngle = (angle: number) => {
    const imagesContainer = document.getElementById('images');
    const images = imagesContainer!.querySelectorAll('.image');

    if (angle < 1 || angle > images.length) return;

    currentAngle = angle;

    // Set active image
    images.forEach((image, index) => {
        image.classList.toggle('active', index === currentAngle - 1);
    });

    // Set counter
    const counter = document.getElementById('currentImage');
    counter!.textContent = `${currentAngle}`;

    // Set active angle thumbnail
    const angleThumbnails = document.querySelectorAll('.angles .angle');
    angleThumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentAngle - 1);
    });
};
window.viewAngle = viewAngle;



export const scrollImages = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentAngle > 1) {
        viewAngle(currentAngle - 1);
    }
    else if (direction === 'right' && currentAngle < 6) {
        viewAngle(currentAngle + 1);
    }
};
window.scrollImages = scrollImages;



// Extend the Window interface to include the global functions
declare global {
    interface Window {
        viewAngle: (angle: number) => void;
        scrollImages: (direction: 'left' | 'right') => void;
    }
}
