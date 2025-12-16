import Stepper from "@/Components/extra/Stepper";
import React from "react";

const STEPS = [
    {
        id: "property_type",
        question: "What type of property is the new boiler for?",
        options: ["Flat", "House (2–3 bed)", "House (4+ bed)", "Commercial"],
    },
    {
        id: "fuel",
        question: "Preferred fuel type?",
        options: ["Mains Gas", "LPG / Propane", "Electric", "Oil"],
    },
    {
        id: "heat_requirements",
        question: "Do you need central heating + hot water or hot water only?",
        options: ["Heating + Hot Water", "Hot Water only"],
    },
    {
        id: "budget",
        question: "Estimated budget for installation?",
        options: ["Under £1k", "£1k–£2.5k", "£2.5k+"],
    },
];

export default function NewBoilerQuote() {
    return <Stepper title="New Boiler Quote" steps={STEPS} />;
}
