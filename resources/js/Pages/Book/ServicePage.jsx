import Stepper from "@/Components/extra/Stepper";
import React from "react";

const STEPS = [
    {
        id: "boiler_type",
        question: "What type of boiler do you have?",
        options: ["Combi", "System", "Heat Only"],
    },
    {
        id: "boiler_age",
        question: "How old is your boiler?",
        options: ["Under 5 years", "5–10 years", "10–15 years", "15+ years"],
    },
    {
        id: "access",
        question: "How easy is it to access your boiler?",
        options: ["Easy access", "Tight cupboard", "Loft"],
    },
    {
        id: "known_issues",
        question: "Are you aware of any issues with the boiler?",
        options: ["No issues", "Yes — something isn’t right"],
    },
];

export default function ServiceQuote() {
    return (
        <>
            <Stepper
                title="Annual Boiler Service"
                basePrice={65}
                steps={STEPS}
            />
        </>
    );
}
