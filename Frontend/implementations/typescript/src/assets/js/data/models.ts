
export interface Model {
    id: number;
    name: string;
    shortName: string;
    image: string;
    price: number;
    specs: {
        smc: string;
        engineCapacity: string;
        transmission: string;
        fuelSystem: string;
    };
    defaults: {
        exteriorColor: number;
        interiorColor: number;
        wheels: number;
    };
}

export const models: Model[] = [
    {
        id: 1,
        name: 'Hilux Conversion 4x4',
        shortName: '4x4',
        image: '4x4.png',
        price: 598900,
        
        // Specifications
        specs: {
            smc: 'A6L',
            engineCapacity: '2.4l',
            transmission: 'Manual 6-speed',
            fuelSystem: 'Diesel',
        },
        
        // Default Configuration
        defaults: {
            exteriorColor: 10000,
            interiorColor: 90000,
            wheels: 1
        }
    },
    {
        id: 2,
        name: 'Hilux Conversion 4x2',
        shortName: '4x2',
        image: '4x2.png',
        price: 433000,
        
        // Specifications
        specs: {
            smc: 'A6B',
            engineCapacity: '2.0l',
            transmission: 'Manual 5-speed',
            fuelSystem: 'Petrol',
        },
        
        // Default Configuration
        defaults: {
            exteriorColor: 10000,
            interiorColor: 90000,
            wheels: 1
        }
    }
];

// Helper functions to work with models
export const modelHelpers = {

    // Get model by id
    getById: (modelId: number) => models.find(model => model.id === modelId),
};

// Constants for easy reference
export const MODEL_IDS = {
    HILUX_4X4: 1,
    HILUX_4X2: 2
};

export const DEFAULT_MODEL_ID = MODEL_IDS.HILUX_4X4;