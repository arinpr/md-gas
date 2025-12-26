// ❌ REMOVE THIS (NO LONGER NEEDED)
// export const SERVICE_TYPES = { ... };

export const SERVICE_QUESTIONS = {
    new: [
        /* ─────────────────────────────
       1. MAINS GAS
    ───────────────────────────── */
        {
            id: "mains_gas",
            question: "Is the boiler powered by mains gas?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
        },

        /* ─────────────────────────────
       1A. FUEL TYPE (NO MAINS GAS)
    ───────────────────────────── */
        {
            id: "boiler_fuel",
            question: "What fuel does your boiler run on?",
            type: "select",
            options: [{ label: "LPG" }, { label: "Other" }],
            showIf: (a) => a.mains_gas?.label === "No",
        },

        {
            id: "fuel_help",
            question:
                "Thanks — this setup needs a specialist review. One of our experts will help you.",
            type: "info",
            showIf: (a) =>
                a.mains_gas?.label === "No" && a.boiler_fuel?.label === "Other",
        },

        /* ─────────────────────────────
       2. KNOW BOILER TYPE
    ───────────────────────────── */
        {
            id: "boiler_type_known",
            question: "Do you know the type of boiler currently installed?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                a.mains_gas?.label === "Yes" || a.boiler_fuel?.label === "LPG",
        },

        /* ─────────────────────────────
       2A. KNOWN BOILER TYPE
    ───────────────────────────── */
        {
            id: "current_boiler_type",
            question: "What kind of boiler do you have right now?",
            type: "select",
            options: [
                { label: "Combi boiler" },
                { label: "Regular / Standard boiler" },
                { label: "System boiler" },
                { label: "Back boiler" },
            ],
            showIf: (a) => a.boiler_type_known?.label === "Yes",
        },

        /* ─────────────────────────────
       2B. UNKNOWN BOILER TYPE
    ───────────────────────────── */
        {
            id: "has_water_tank",
            question: "Does your home have a water tank or hot water cylinder?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => a.boiler_type_known?.label === "No",
        },

        {
            id: "pressure_gauge",
            question: "Can you see a pressure gauge on your boiler?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => a.has_water_tank?.label === "Yes",
        },

        /* ─────────────────────────────
       3. MOVE TO COMBI
    ───────────────────────────── */
        {
            id: "move_to_combi",
            question: "Are you thinking about moving to a combi boiler?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                ["Regular / Standard boiler", "System boiler"].includes(
                    a.current_boiler_type?.label
                ) || a.pressure_gauge,
        },

        /* ─────────────────────────────
       4. MOVE LOCATION
    ───────────────────────────── */
        {
            id: "boiler_move_location",
            question:
                "Are you planning to move the boiler to a different location?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                a.move_to_combi ||
                a.has_water_tank?.label === "No" ||
                a.current_boiler_type?.label === "Combi boiler",
        },

        {
            id: "preferred_location",
            question: "What is the preferred location for the boiler?",
            type: "select",
            options: [
                { label: "In the airing cupboard" },
                { label: "New place within the same room" },
                { label: "Another room on the same floor" },
                { label: "Another floor or loft" },
            ],
            showIf: (a) =>
                a.boiler_move_location?.label === "Yes" ||
                a.current_boiler_type?.label === "Back boiler",
        },

        /* ─────────────────────────────
       5. PROPERTY TYPE
    ───────────────────────────── */
        {
            id: "property_type",
            question: "What type of property do you live in?",
            type: "select",
            options: [
                { label: "House" },
                { label: "Bungalow" },
                { label: "Flat / Apartment" },
            ],
            showIf: (a) =>
                a.boiler_move_location?.label === "No" || a.preferred_location,
        },

        {
            id: "flat_upper_floor",
            question: "Is the property on the second floor or higher?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => a.property_type?.label === "Flat / Apartment",
        },

        {
            id: "flue_reachable",
            question: "Can the flue be reached from outside?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => a.flat_upper_floor?.label === "Yes",
        },

        {
            id: "flue_help",
            question:
                "Thanks — this setup requires a specialist assessment. Our team will help you.",
            type: "info",
            showIf: (a) => a.flue_reachable?.label === "No",
        },

        /* ─────────────────────────────
       6. HOUSE QUESTIONS
    ───────────────────────────── */
        {
            id: "bathrooms",
            question: "How many bathrooms are in your property?",
            type: "select",
            options: [
                { label: "1 bathroom" },
                { label: "2 bathrooms" },
                { label: "3 bathrooms" },
                { label: "4+ bathrooms" },
            ],
            showIf: (a) =>
                (a.property_type?.label === "House" ||
                    a.property_type?.label === "Bungalow" ||
                    a.flat_upper_floor?.label === "No" ||
                    a.flue_reachable?.label === "Yes") &&
                a.pressure_gauge?.label !== "No",
        },

        {
            id: "bedrooms",
            question: "How many bedrooms are in your property?",
            type: "select",
            options: [
                { label: "1 bedroom" },
                { label: "2 bedrooms" },
                { label: "3 bedrooms" },
                { label: "4+ bedrooms" },
            ],
            showIf: (a) => a.bathrooms || a.pressure_gauge?.label === "No",
        },

        {
            id: "radiators",
            question: "How many radiators are in your home?",
            type: "select",
            options: [
                { label: "0–5" },
                { label: "6–9" },
                { label: "10–13" },
                { label: "14–16" },
                { label: "17+" },
            ],
            showIf: (a) =>
                a.bedrooms &&
                a.move_to_combi?.label !== "Yes" &&
                !["Combi boiler", "Back boiler"].includes(
                    a.current_boiler_type?.label
                ),
        },

        /* ─────────────────────────────
       7. FLUE DETAILS (ONLY IF NOT MOVING)
    ───────────────────────────── */
        {
            id: "flue_wall",
            question: "Does your boiler flue go through the wall outside?",
            helperImages: [
                {
                    src: "/images/stepper/flue_wall.jpg",
                    alt: "Boiler flue exiting wall",
                },
                {
                    src: "/images/stepper/flue_wall2.jpg",
                    alt: "External boiler flue",
                },
            ],
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => a.boiler_move_location?.label === "No" && a.bedrooms,
        },

        {
            id: "flue_distance",
            question: "Is the flue at least 30cm away from a window or door?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                a.boiler_move_location?.label === "No" &&
                a.flue_wall?.label === "Yes",
        },

        {
            id: "flue_roof",
            question: "Does the flue exit via the roof?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                a.boiler_move_location?.label === "No" &&
                a.flue_wall?.label === "No",
        },

        /* ─────────────────────────────
       8. FINAL — WATER METER (MERGE POINT)
    ───────────────────────────── */
        {
            id: "water_meter",
            question: "Is your property fitted with a water meter?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                (a.boiler_move_location?.label === "No" &&
                    (a.flue_distance || a.flue_roof)) ||
                (a.boiler_move_location?.label === "Yes" && a.bedrooms),
        },
    ],
};
