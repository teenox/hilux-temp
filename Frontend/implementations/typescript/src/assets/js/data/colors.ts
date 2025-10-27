
export interface Color {
    id: number;
    model: string; // 0 means all models
    name: string;
    src: string;
    category: string;
}

export const colors = [
    {
        id: 10000,
        model: 0,
        name: 'Glacier White',
        src: '#FFFFFF',
        category: 'exterior',
    },
    {
        id: 90000,
        model: 0,
        name: 'Black',
        src: '#101010',
        category: 'interior',
    },
];

export const colorHelpers = {
    // Get color by id
    getById: (colorId: number) => {
        return colors.find(color => color.id === colorId)
    },

    // Get model colors including common colors for all models exteriorOrInterior: 'exterior' or 'interior'
    getModelColors: (modelId: number, exteriorOrInterior: 'exterior' | 'interior' | null = null) => {
        const allModelColors = colors.filter(color => color.model === modelId || color.model === 0);

        if (exteriorOrInterior) {
            return allModelColors.filter(color => color.category === exteriorOrInterior);
        } 
        else {
            return allModelColors;
        }
    },
};