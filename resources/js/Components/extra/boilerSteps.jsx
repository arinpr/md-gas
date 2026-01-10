import { Phone } from "lucide-react";

export const SERVICE_QUESTIONS = {
    new: [
        {
            id: "mains_gas",
            question: "Does your boiler run on mains gas?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            infoBox: {
                badge: "Tip",
                text:
                    "Most homes in the UK are connected to mains gas. If you receive a gas bill or have a gas meter installed, this is almost certainly the correct option for your home.",
                // helperLabel: "Not sure?",
                // phone: "0330 113 1333",
                // phoneLabel: "Speak to an engineer",
            },
        },

        {
            id: "boiler_fuel",
            question: "What fuel does your boiler run on?",
            type: "select",
            options: [{ label: "LPG Gas" }, { label: "Other" }],
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

        {
            id: "boiler_type_known",
            question: "Do you know the type of boiler currently installed?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            infoBox: {
                badge: "Tip",
                text:
                    "Select Yes if you know. If you’re not sure, choose No and we’ll guide you through it in the next step — or you can speak with an engineer.",
                // helperLabel: "Not sure?",
                // phone: "0330 113 1333",
                // phoneLabel: "Speak to an expert",
            },
            showIf: (a) =>
                a.mains_gas?.label === "Yes" || a.boiler_fuel?.label === "LPG Gas",
        },

        {
            id: "current_boiler_type",
            question: "What kind of boiler do you have right now?",
            type: "select",
            options: [
                {
                    label: "Combi boiler",
                    image: "/images/stepper/combi_boiler.png",
                },
                {
                    label: "Regular / Standard boiler",
                    image: "/images/stepper/regular_boiler.png",
                },
                {
                    label: "System boiler",
                    image: "/images/stepper/system_boiler.png",
                },
                {
                    label: "Back boiler",
                    image: "/images/stepper/back_boiler.png",
                },
            ],
            showIf: (a) => a.boiler_type_known?.label === "Yes",
        },


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

        {
            id: "move_to_combi",
            question: "Are you thinking about moving to a combi boiler?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                ["Regular / Standard boiler", "System boiler"].includes(
                    a.current_boiler_type?.label
                ) || a.pressure_gauge?.label === "Yes",
        },

        {
            id: "boiler_move_location",
            question: "Are you planning to move the boiler to a different location?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) =>
                a.move_to_combi?.label ||
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
                a.boiler_move_location?.label === "No" || !!a.preferred_location,
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

        // Spec buckets (keep)
        {
            id: "bathrooms",
            question: "How many bathrooms are in your property?",
            type: "select",
            options: [{ label: "1" }, { label: "1.5" }, { label: "2" }, { label: "3+" }],
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
            options: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4+" }],
            showIf: (a) => !!a.bathrooms || a.pressure_gauge?.label === "No",
        },

        // ✅ show radiators always once bedrooms are known (even when moving to combi)
        {
            id: "radiators",
            question: "How many radiators are in your home?",
            type: "select",
            options: [
                { label: "Up to 6" },
                { label: "7–12" },
                { label: "13–20" },
                { label: "21+" },
            ],
            showIf: (a) => !!a.bedrooms,
        },

        // No flue_type needed. Engine: if flue_wall=No => +£300 vertical flue.
        {
            id: "flue_wall",
            question: "Does the flue come out the wall?",
            type: "select",
            options: [
                {
                    label: "Yes",
                    image: "/images/stepper/Is your flue coming out of the wall - YES.jpeg",
                },
                {
                    label: "No",
                    image: "/images/stepper/Is your flue coming out of the wall - NO.jpeg",
                }
            ],
            helperImages: [
                // {
                //     src: "/images/stepper/outside_wall.png",
                //     alt: "Boiler flue coming out of the wall",
                // },
                // {
                //     src: "/images/stepper/outside_wall2.png",
                //     alt: "External boiler flue example",
                // },
            ],
            showIf: (a) => a.boiler_move_location?.label === "No" && !!a.radiators,
        },


        {
            id: "thermostat_type",
            question: "Thermostat choice",
            type: "select",
            options: [{ label: "Basic" }, { label: "Smart" }],
            preset: { label: "Basic" },
            showIf: (a) => !!a.radiators,
        },

        {
            id: "trv_required",
            question: "Do you require new/additional TRVs?",
            type: "select",
            options: [{ label: "No" }, { label: "Yes" }],
            preset: { label: "No" },
            showIf: (a) => !!a.thermostat_type,
        },

        {
            id: "trv_qty",
            question: "How many TRVs?",
            type: "dropdown",
            options: Array.from({ length: 13 }, (_, idx) => {
                const v = idx + 1;
                return { label: String(v), value: v };
            }),
            showIf: (a) => a.trv_required?.label === "Yes",
        },

        {
            id: "water_meter",
            question: "Is your property fitted with a water meter?",
            type: "select",
            options: [{ label: "Yes" }, { label: "No" }],
            showIf: (a) => !!a.trv_required, // keep it as the final merge point
        },
    ],
};
