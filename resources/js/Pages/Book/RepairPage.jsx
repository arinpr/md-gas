import Stepper from "@/Components/extra/Stepper";
import React from "react";

const STEPS = [
    {
        id: "boiler_type",
        question: "What type of boiler do you have?",
        options: ["Combi", "System", "Heat Only"],
    },

    {
        id: "fault_type",
        question: "What issue are you experiencing?",
        options: [
            { label: "No heating", price: 0 },
            { label: "Leaking", price: 25 },
            { label: "Error code showing", price: 15 },
            { label: "Other", price: 0 },
        ],
    },

    {
        id: "boiler_age",
        question: "How old is your boiler?",
        options: [
            "Under 5 years",
            "5–10 years",
            "10–15 years",
            "15+ years / Not sure",
        ],
    },

    {
        id: "issue_start",
        question: "When did this problem start?",
        options: [
            "Today",
            "1–3 days ago",
            "1–2 weeks ago",
            "More than 2 weeks ago",
        ],
    },
    {
        id: "previous_work",
        question: "Has anyone worked on the boiler recently?",
        options: ["Yes", "No"],
    },
    {
        id: "access",
        question: "Where is your boiler located?",
        options: ["Easy access", "Inside a cupboard", "Loft", "Other"],
    },
];

export default function RepairQuote() {
    return (
        <>
            <Stepper title="Boiler Repair Quote" basePrice={75} steps={STEPS} />
            ;
        </>
    );
}
