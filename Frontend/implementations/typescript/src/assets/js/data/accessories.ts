

export interface Accessory {
    id: number;
    model: number; // 0 means all models
    name: string;
    category: string;
    description: string;
    image: string;
    price: number;
    ueMessage: string;
    position: { top: string; left: string };
}

export const accessories: Accessory[] = [
    {
        id: 11111,
        model: 0,
        name: 'Nudge Bar Stainless Steel',
        category: 'exterior',
        description: 'Description here...',
        image: 'assets/components/accessories/nudge-bar-silver.png',
        price: 2500,
        ueMessage: "nudge bar silver",
        position: {
            top: '40%',
            left: '40%',
        }
    },
    {
        id: 22222,
        model: 0,
        name: 'Nudge Bar Matt Black',
        category: 'exterior',
        description: 'Description here...',
        image: 'assets/components/accessories/nudge-bar-black.png',
        price: 2000,
        ueMessage: "nudge bar black",
        position: {
            top: '40%',
            left: '40%',
        }
    },
    {
        id: 33333,
        model: 0,
        name: 'Double Tube Rear Step',
        category: 'exterior',
        description: 'Description here...',
        image: 'assets/components/accessories/rear-step.png',
        price: 1200,
        ueMessage: "rear step",
        position: {
            top: '40%',
            left: '40%',
        }
    },
    {
        id: 44444,
        model: 0,
        name: 'Mesh Guard',
        category: 'exterior',
        description: 'Description here...',
        image: 'assets/components/accessories/mesh-guard.jpg',
        price: 950,
        ueMessage: "mesh guard",
        position: {
            top: '40%',
            left: '40%',
        }
    },
];


export const accessoriesHelpers = {
    // Get accessories by id
    getById: (accessoryId: number) => {
        return accessories.find(accessories => accessories.id === accessoryId)
    },

    // Get model accessories including common accessories for all models
    // exteriorOrInterior: 'exterior' or 'interior' if null will return all
    getModelAccessories: (modelId: number, exteriorOrInterior: string | null = null) => {
        const allModelAccessories = accessories.filter(accessory => accessory.model === modelId || accessory.model === 0);

        if (exteriorOrInterior) {
            return allModelAccessories.filter(accessory => accessory.category === exteriorOrInterior);
        } 
        else {
            return allModelAccessories;
        }
    },
};