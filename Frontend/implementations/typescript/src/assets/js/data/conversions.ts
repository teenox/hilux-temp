
export interface Conversion {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    ueMessage: string;
    doorsOpen: boolean;
    unAllowedAccessories: number[];
}

export const conversions: Conversion[] = [
    {
        id: 11111,
        name: 'Dropside Steel',
        description: 'Description here...',
        image: 'assets/components/conversions/dropside-steel.png',
        price: 63446,
        ueMessage: "dropside steel",
        doorsOpen: false,
        unAllowedAccessories: []
    },
    {
        id: 22222,
        name: 'Dropside Alluminium',
        description: 'Description here...',
        image: 'assets/components/conversions/dropside-alluminium.png',
        price: 71870,
        ueMessage: "dropside alluminium",
        doorsOpen: false,
        unAllowedAccessories: []
    },
    {
        id: 33333,
        name: 'Cargo Rails with Dropside',
        description: 'Description here...',
        image: 'assets/components/conversions/cargo-rails.png',
        price: 77192,
        ueMessage: "cargo rails",
        doorsOpen: false,
        unAllowedAccessories: []
    },
    {
        id: 44444,
        name: 'Cargo Rails Only',
        description: 'Description here...',
        image: 'assets/components/conversions/cargo-rails-only.png',
        price: 61055,
        ueMessage: "cargo rails only",
        doorsOpen: false,
        unAllowedAccessories: []
    },
    {
        id: 88888,
        name: 'Field Technician Canopy with Half Dropside',
        description: 'Description here...',
        image: 'assets/components/conversions/technician-canopy-dropside.png',
        price: 95304,
        ueMessage: "full canopy",
        doorsOpen: true,
        unAllowedAccessories: [44444]
    },
    {
        id: 55555,
        name: 'Field Technician Canopy with Half Dropside and Lid',
        description: 'Description here...',
        image: 'assets/components/conversions/technician-canopy-lid.png',
        price: 105742,
        ueMessage: "field technician canopy",
        doorsOpen: true,
        unAllowedAccessories: [44444]
    },
    {
        id: 66666,
        name: 'Field Technician Canopy Only',
        description: 'Description here...',
        image: 'assets/components/conversions/technician-canopy-only.png',
        price: 81094,
        ueMessage: "field technician canopy only",
        doorsOpen: true,
        unAllowedAccessories: [44444]
    },
    {
        id: 77777,
        name: 'Full Canopy with Dropside',
        description: 'Description here...',
        image: 'assets/components/conversions/full-canopy.png',
        price: 106320,
        ueMessage: "full canopy",
        doorsOpen: true,
        unAllowedAccessories: [44444]
    },
    {
        id: 99999,
        name: 'Drybox',
        description: 'Description here...',
        image: 'assets/components/conversions/drybox.png',
        price: 69484,
        ueMessage: "drybox",
        doorsOpen: true,
        unAllowedAccessories: [44444]
    }
];


export const conversionsHelpers = {
    // Get conversion by id
    getById: (conversionId: number) => {
        return conversions.find(conversion => conversion.id === conversionId);
    }
};