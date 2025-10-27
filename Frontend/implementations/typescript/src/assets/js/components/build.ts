import { modelHelpers } from '../data/models';
import { conversionsHelpers } from '../data/conversions';
import { accessories, accessoriesHelpers } from '../data/accessories';
import { colorHelpers } from '../data/colors';
import { wheelsHelpers } from '../data/wheels';
import { combinationsHelpers } from '../data/combinations';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface Build {
    model: number;
    exteriorColor: number;
    wheels: number;
    accessories: number[];
    conversion: number;
    modelPrice: number;
    conversionPrice: number;
    extrasPrice: number;
    totalPrice: number;
}

export const build: Build = {
    model: 0,
    exteriorColor: 0,
    wheels: 0,
    accessories: [],
    conversion: 0,
    modelPrice: 0,
    conversionPrice: 0,
    extrasPrice: 0,
    totalPrice: 0,
};

export const calculateTotalPrice = (): { conversionPrice: number; extrasPrice: number; totalPrice: number } => {
    let modelPrice = 0;
    let conversionPrice = 0;
    let extrasPrice = 0;

    // 1. Base Model Price
    const selectedModel = modelHelpers.getById(build.model);
    if (selectedModel) modelPrice = selectedModel.price;

    // 2. Conversion Price
    const selectedConversion = conversionsHelpers.getById(build.conversion);
    if (selectedConversion) conversionPrice = selectedConversion.price;

    // Optional Extras Price

    // 3. Accessories
    build.accessories.forEach(accessoryId => {
        const accessory = accessoriesHelpers.getById(accessoryId);
        if (accessory) extrasPrice += accessory.price;
    });

    // 4. Final Total
    const totalPrice = modelPrice + conversionPrice + extrasPrice;

    // Assign to build
    build.modelPrice = modelPrice;
    build.conversionPrice = conversionPrice;
    build.extrasPrice = extrasPrice;
    build.totalPrice = totalPrice;

    populateTotalPrice();

    // Make it accessible
    return { conversionPrice, extrasPrice, totalPrice };
};

export const populateTotalPrice = () => {
    const totalPrice = build.totalPrice;
    
    const totalPriceLabel = document.getElementById('totalPrice')!;
    totalPriceLabel.innerHTML = totalPrice.toLocaleString();
};

export const finishBuild = () => {
    const selectedModelContainer = document.getElementById('selectedModel')!;
    const selectedConversionContainer = document.getElementById('selectedConversion')!;
    const selectedAccessoriesContainer = document.getElementById('selectedAccessories')!;
    const selectedColorContainer = document.getElementById('selectedColor')!;
    const selectedWheelsContainer = document.getElementById('selectedWheels')!;
    const totalPriceContainer = document.getElementById('selectionsTotalPrice')!;

    const selectedModel = modelHelpers.getById(build.model);
    const selectedConversion = conversionsHelpers.getById(build.conversion);
    const selectedAccessories = accessories.filter(accessory => build.accessories.includes(accessory.id));
    const selectedColor = colorHelpers.getById(build.exteriorColor);
    const selectedWheels = wheelsHelpers.getById(build.wheels);
    const totalPrice = build.totalPrice;

    let modelHtml = '';
    let conversionHtml = '';
    let accessoriesHtml = '';
    
    // fill selected model and conversion
    if (selectedConversion) {
        conversionHtml = `
            <div class="conversion flex-left">
                <div class="image">
                    <img src='${selectedConversion.image}'>
                </div>
                <div class="details">
                    <h2 class="small heading name">${selectedConversion.name}</h2>
                    <p class="small heading price">R${selectedConversion.price.toLocaleString()}</p>
                </div>
            </div>
        `;

        let combination = combinationsHelpers.getCombination(selectedConversion.id, build.accessories);

        // create combination image name
        const conversionImage = selectedConversion.image;
        const imageName = conversionImage.substring(conversionImage.lastIndexOf('/') + 1);
        modelHtml = `
            <div class="image">
                <!--<img src='assets/images/static-mode/combinations/${combination?.id}/2.png' alt='Combination ${combination?.id}'>-->
                <img src='assets/images/static-mode/conversions/${imageName}'>
            </div>
            <div class="details">
                <h2 class="large heading">${selectedModel?.name}</h2>
                <div class="specs flex-left">
                    <p>${selectedModel?.shortName}</p>
                    <p>${selectedModel?.specs.transmission}</p>
                    <p>${selectedModel?.specs.engineCapacity}</p>
                </div>
            </div>
        `;
        
    }
    else {
        conversionHtml = `<p>No conversion selected</p>`;
        
        modelHtml = `
            <div class="image">
                <img src='assets/images/static-mode/conversions/base.png'>
            </div>
            <div class="details">
                <h2 class="large heading">${selectedModel?.name}</h2>
                <div class="specs flex-left">
                    <p>${selectedModel?.shortName}</p>
                    <p>${selectedModel?.specs.transmission}</p>
                    <p>${selectedModel?.specs.engineCapacity}</p>
                </div>
            </div>
        `;
    }
    selectedConversionContainer.innerHTML = conversionHtml;
    selectedModelContainer.innerHTML = modelHtml;

    // fill selected accessories
    if (selectedAccessories.length > 0) {
        selectedAccessories.forEach(accessory => {
            accessoriesHtml += `
                <div class="accessory">
                    <div class="image">
                        <img src='${accessory.image}'>
                    </div>
                    <div class="details">
                        <p class="name">${accessory.name}</p>
                        <h2 class="price small heading">R${accessory.price.toLocaleString()}</h2>
                    </div>
                </div>
            `;
        });
    }
    else accessoriesHtml = `<p>No accessories selected</p>`;
    selectedAccessoriesContainer.innerHTML = accessoriesHtml;

    // fill selected color
    const exteriorColorHtml = `
        <div class="component color flex-left light active">
            <div class="round circle flex-center round" style="background-color: ${selectedColor?.src}">
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
            <p class="name">${selectedColor?.name}</p>
        </div>
    `;
    selectedColorContainer.innerHTML = exteriorColorHtml;

    // fill selected wheels
    const wheelsHtml = `
        <div class="wheel flex-left">
            <div class="image flex-left">
                <img src='${selectedWheels?.image}'>
            </div>
            <div class="details">
                <h2 class="small heading">${selectedWheels?.description}</h2>
                <p>Standard</p>
            </div>
        </div>
    `;
    selectedWheelsContainer.innerHTML = wheelsHtml;

    // fill total price
    totalPriceContainer.innerHTML = `R${totalPrice.toLocaleString()}`;

    // show summary modal
    setSummaryVisibility('show');
};
window.finishBuild = finishBuild;



export const setSummaryVisibility = (action: 'show' | 'hide') => {
    const summaryModal = document.getElementById('summaryModal') as HTMLElement;

    if (action === 'show') {
        summaryModal.style.display = 'flex';
        setTimeout(() => {
            summaryModal.classList.add('open');
        }, 50);
    }
    else {
        summaryModal.classList.remove('open');
        setTimeout(() => {
            summaryModal.style.display = 'none';
        }, 500);
    }
}
window.setSummaryVisibility = setSummaryVisibility;




export async function downloadPDF() {
    const selectionsSummary = document.getElementById('selectionsSummary');
    const summaryModalContent = document.getElementById('summaryModalContent');

    try {
        summaryModalContent.classList.add('overflow');

        // Capture the modal as a canvas
        const canvas = await html2canvas(selectionsSummary, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            allowTaint: true
        });

        // Get image data URL
        const imgData = canvas.toDataURL('image/png');

        // Initialize PDF
        const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, mm units, A4 size

        // Dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add additional pages if content overflows
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        summaryModalContent.classList.remove('overflow');

        // Download the PDF
        pdf.save('hilux-conversion-configuration-summary.pdf');
    } 
    catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF');
    }
}
window.downloadPDF = downloadPDF;



// Extend the Window interface to include the global functions for inline onclicks
declare global {
    interface Window {
        finishBuild: () => void;
        setSummaryVisibility: (action: 'show' | 'hide') => void;
        downloadPDF: () => void;
    }
}
