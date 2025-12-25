import Stepper from "@/Components/extra/Stepper";
import React from "react";

const STEPS = [
    {
        id: "boiler_Service_type",
        question: "What type of boiler do you have?",
        type: "select",
        options: ["Combi", "System", "Heat Only"],
    },

    {
        id: "boiler_Service_model",
        question: "What is the boiler brand & model?",
        type: "text",
        placeholder: "e.g. Worcester Bosch Greenstar 30i",
    },

    {
        id: "boiler_Service_age",
        question: "How old is your boiler?",
        type: "select",
        options: [
            "Under 5 years",
            "5–10 years",
            "10–15 years",
            "15+ years / Not sure",
        ],
    },

    {
        id: "access_Service",
        question: "Where is your boiler located?",
        type: "select",
        options: [
            "Easy access",
            "Tight cupboard",
            "Loft",
            { label: "Other", requiresText: true },
        ],
    },

    {
        id: "Any_issue",
        question: "Any known issues?",
        type: "select",
        options: [{ label: "No" }, { label: "Yes", requiresText: true }],
    },

    {
        id: "customer_Service_details",
        question: "Your details",
        type: "details",
    },

    {
        id: "visit_time",
        question: "Preferred visit date & time",
        type: "datetime",
    },
    // {
    //     id: "summary",
    //     question: "Review & pricing",
    //     type: "summary",
    // },
];

export default function ServiceQuote() {
    return (
        <>
            <Stepper
                title="Annual Boiler Service"
                basePrice={75}
                steps={STEPS}
            />
        </>
    );
}
