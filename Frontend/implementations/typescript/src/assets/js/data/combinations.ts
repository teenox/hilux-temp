import { build } from "../components/build";
import { viewAngle } from "../components/combinations";

export interface Combination {
    id: number;
    conversion: number;
    accessories: number[];
}

export const combinations: Combination[] = [
    { id: 1,  conversion: 11111, accessories: [] },
    { id: 2,  conversion: 11111, accessories: [11111] },
    { id: 3,  conversion: 11111, accessories: [22222] },
    { id: 4,  conversion: 11111, accessories: [33333] },
    { id: 5,  conversion: 11111, accessories: [44444] },
    { id: 6,  conversion: 11111, accessories: [11111, 33333] },
    { id: 7,  conversion: 11111, accessories: [11111, 44444] },
    { id: 8,  conversion: 11111, accessories: [22222, 33333] },
    { id: 9,  conversion: 11111, accessories: [22222, 44444] },
    { id: 10, conversion: 11111, accessories: [33333, 44444] },
    { id: 11, conversion: 11111, accessories: [11111, 33333, 44444] },
    { id: 12, conversion: 11111, accessories: [22222, 33333, 44444] },

    { id: 13, conversion: 22222, accessories: [] },
    { id: 14, conversion: 22222, accessories: [11111] },
    { id: 15, conversion: 22222, accessories: [22222] },
    { id: 16, conversion: 22222, accessories: [33333] },
    { id: 17, conversion: 22222, accessories: [44444] },
    { id: 18, conversion: 22222, accessories: [11111, 33333] },
    { id: 19, conversion: 22222, accessories: [11111, 44444] },
    { id: 20, conversion: 22222, accessories: [22222, 33333] },
    { id: 21, conversion: 22222, accessories: [22222, 44444] },
    { id: 22, conversion: 22222, accessories: [33333, 44444] },
    { id: 23, conversion: 22222, accessories: [11111, 33333, 44444] },
    { id: 24, conversion: 22222, accessories: [22222, 33333, 44444] },

    { id: 25, conversion: 33333, accessories: [] },
    { id: 26, conversion: 33333, accessories: [11111] },
    { id: 27, conversion: 33333, accessories: [22222] },
    { id: 28, conversion: 33333, accessories: [33333] },
    { id: 29, conversion: 33333, accessories: [44444] },
    { id: 30, conversion: 33333, accessories: [11111, 33333] },
    { id: 31, conversion: 33333, accessories: [11111, 44444] },
    { id: 32, conversion: 33333, accessories: [22222, 33333] },
    { id: 33, conversion: 33333, accessories: [22222, 44444] },
    { id: 34, conversion: 33333, accessories: [33333, 44444] },
    { id: 35, conversion: 33333, accessories: [11111, 33333, 44444] },
    { id: 36, conversion: 33333, accessories: [22222, 33333, 44444] },

    { id: 37, conversion: 44444, accessories: [] },
    { id: 38, conversion: 44444, accessories: [11111] },
    { id: 39, conversion: 44444, accessories: [22222] },
    { id: 40, conversion: 44444, accessories: [33333] },
    { id: 41, conversion: 44444, accessories: [44444] },
    { id: 42, conversion: 44444, accessories: [11111, 33333] },
    { id: 43, conversion: 44444, accessories: [11111, 44444] },
    { id: 44, conversion: 44444, accessories: [22222, 33333] },
    { id: 45, conversion: 44444, accessories: [22222, 44444] },
    { id: 46, conversion: 44444, accessories: [33333, 44444] },
    { id: 47, conversion: 44444, accessories: [11111, 33333, 44444] },
    { id: 48, conversion: 44444, accessories: [22222, 33333, 44444] },

    { id: 49, conversion: 55555, accessories: [] },
    { id: 50, conversion: 55555, accessories: [11111] },
    { id: 51, conversion: 55555, accessories: [22222] },
    { id: 52, conversion: 55555, accessories: [33333] },
    { id: 53, conversion: 55555, accessories: [11111, 33333] },
    { id: 54, conversion: 55555, accessories: [22222, 33333] },

    { id: 55, conversion: 66666, accessories: [] },
    { id: 56, conversion: 66666, accessories: [11111] },
    { id: 57, conversion: 66666, accessories: [22222] },
    { id: 58, conversion: 66666, accessories: [33333] },
    { id: 59, conversion: 66666, accessories: [11111, 33333] },
    { id: 60, conversion: 66666, accessories: [22222, 33333] },

    { id: 61, conversion: 77777, accessories: [] },
    { id: 62, conversion: 77777, accessories: [11111] },
    { id: 63, conversion: 77777, accessories: [22222] },
    { id: 64, conversion: 77777, accessories: [33333] },
    { id: 65, conversion: 77777, accessories: [11111, 33333] },
    { id: 66, conversion: 77777, accessories: [22222, 33333] },

    { id: 67, conversion: 88888, accessories: [] },
    { id: 68, conversion: 88888, accessories: [11111] },
    { id: 69, conversion: 88888, accessories: [22222] },
    { id: 70, conversion: 88888, accessories: [33333] },
    { id: 71, conversion: 88888, accessories: [11111, 33333] },
    { id: 72, conversion: 88888, accessories: [22222, 33333] },
];

export const combinationsHelpers = {

    viewCombinations: () => {
        // get selected conversion
        const conversion = build.conversion;

        // get selected accessories
        const accessories = build.accessories;

        // find matching combination from combinations array
        const combination = combinations.find(combination =>
            combination.conversion === conversion &&
            combination.accessories.length === accessories.length &&
            combination.accessories.every(accessory => accessories.includes(accessory))
        );

        if (!combination) {
            console.warn("No matching combination found!");
            return;
        }

        // images container to inject the 6 images
        const imagesContainer = document.getElementById('images');
        let imagesHtml = '';

        for (let i = 1; i <= 6; i++) {
            imagesHtml += `
                <div class="image">
                    <img src="assets/images/static-mode/combinations/${combination.id}/${i}.png">
                </div>
            `;
        }

        imagesContainer!.innerHTML = imagesHtml;
        
        // set the first image as active
        viewAngle(1);

        console.log("VIEWING COMBINATION: " + combination.id);
    },


    getCombination: (conversion: number, accessories: number[]) => {
        return combinations.find(combination =>
            combination.conversion === conversion &&
            combination.accessories.length === accessories.length &&
            combination.accessories.every(accessory => accessories.includes(accessory))
        );
    }
};


