import Stepper from "@/Components/extra/Stepper";
import React from "react";

const STEPS = [
    {
        id: "radiators",
        question: "Are your radiators cold at the bottom?",
        options: ["Yes", "No"],
    },
    {
        id: "noisy",
        question: "Do your radiators make noise?",
        options: ["Yes", "No"],
    },
    {
        id: "system_size",
        question: "How many radiators roughly?",
        options: ["1–5", "6–10", "10+"],
    },
];

export default function PowerflushQuote() {
    return <Stepper title="Power Flush" basePrice={180} steps={STEPS} />;
}
