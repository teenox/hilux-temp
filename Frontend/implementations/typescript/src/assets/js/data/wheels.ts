
export interface Wheel {
    id: number;
    model: number; // 0 means all models
    description: string;
    image: string;
}

export const wheels: Wheel[] = [
    {
        id: 1,
        model: 0,
        description: '225-70R17C Full Steel',
        image: 'assets/components/wheels/wheels.png',
    }
];

export const wheelsHelpers = {
    // Get wheels by id
    getById: (wheelId: number) => {
        return wheels.find(wheel => wheel.id === wheelId)
    },

    // Get model wheels including common wheels for all models
    getModelWheels: (modelId: number) => {
        return wheels.filter(wheel => wheel.model === modelId || wheel.model === 0)
    },
};