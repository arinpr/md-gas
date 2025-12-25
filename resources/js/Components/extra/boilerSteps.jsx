// ❌ REMOVE THIS (NO LONGER NEEDED)
// export const SERVICE_TYPES = { ... };

export const SERVICE_QUESTIONS = {
    new: [
        /* -----------------------------
           BOILER MODELS
        ----------------------------- */
        {
            id: "mains_gas",
            question: "Is the boiler powered by mains gas?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
        },

        {
            id: "boiler_type",
            question: "Do you know the type of boiler currently installed?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (answers) => answers.mains_gas?.label === "Yes",
        },

        {
            id: "boiler_fuel",
            question: "What fuel does your boiler run on?",
            type: "select",
            options: [
                { label: "Oil" },
                { label: "LPG" },
                { label: "Electric" },
            ],
            showIf: (answers) => answers.mains_gas?.label === "No",
        },

        {
            id: "boiler_fuel",
            question: "What fuel does your boiler run on?",
            type: "select",
            options: [
                { label: "Oil" },
                { label: "LPG" },
                { label: "Electric" },
            ],
            showIf: (answers) => answers.mains_gas?.label === "No",
        },
        {
            id: "what_boiler",
            question: "What kind of boiler do you have right now?",
            type: "select",
            options: [
                { label: "Combi Boiler" },
                { label: "Regular/Standard Boiler" },
                { label: "System Boiler" },
                { label: "Back Boiler" },
            ],
        },

        {
            id: "move_location",
            question:
                "Are you planning to move the boiler to a different location?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
        },
        {
            id: "preferred_location",
            question: "What is the preferred location for the boiler?",
            type: "select",
            options: [
                { label: "In the airing cupboard" },
                { label: "New place within same room" },
                { label: "To another floor/loft" },
                { label: "Another room on same floor" },
            ],
        },
        {
            id: "property_type",
            question: "What type of property do you live in?",
            type: "select",
            options: [
                { label: "A house" },
                { label: "A bungalow" },
                { label: "A apartment/ Flat" },
            ],
        },
        {
            id: "bathrooms",
            question: "Select the number of bathrooms in your property",
            type: "select",
            options: [
                { label: "1" },
                { label: "2" },
                { label: "3" },
                { label: "4+" },
            ],
        },
        {
            id: "bedrooms",
            question: "Select the number of bedrooms in your property",
            type: "select",
            options: [
                { label: "1" },
                { label: "2" },
                { label: "3" },
                { label: "4+" },
            ],
        },
        {
            id: "water_meter",
            question: "Is there a water meter installed in your home?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
        },
    ],
};
