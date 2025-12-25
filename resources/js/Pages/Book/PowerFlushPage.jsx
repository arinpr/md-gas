import Stepper from "@/Components/extra/Stepper";
import React from "react";

const RADIATOR_PRICING = [
    { label: "Up to 5 radiators", value: "1-5" },
    { label: "6–8 radiators", value: "6-8" },
    { label: "9–12 radiators", value: "9-12" },
    { label: "13–15 radiators", value: "13-15" },
    { label: "16–20 radiators", value: "16-20" },
    { label: "21+ radiators", value: "21+" },
];

const STEPS = [
    {
        id: "radiators",
        type: "dropdown",
        question: "How many radiators are in your property?",
        options: RADIATOR_PRICING,
    },

    {
        id: "boiler_flush_type",
        question: "What type of boiler system do you have?",
        type: "select",
        options: ["Combi", "System", "Heat Only"],
    },
    {
        id: "any_cold_spots",
        question: "Any cold spots?",
        type: "select",
        options: [{ label: "No" }, { label: "Yes" }],
    },
    {
        id: "any_sludge",
        question: "Any sludge/dirty water?",
        type: "select",
        options: [{ label: "No" }, { label: "Yes" }],
    },

    {
        id: "flush_before",
        question: " Has system ever been flushed before?",
        type: "select",
        options: [{ label: "No" }, { label: "Yes" }, { label: "Not Sure" }],
    },
    {
        id: "leaking_radiators",
        question: " Any leaking radiators or valves?",
        type: "select",
        options: [{ label: "No" }, { label: "Yes" }],
    },

    {
        id: "access_flush",
        question: "Access type",
        type: "select",
        options: ["Easy access", "Cupboard / boxed in", "Loft"],
    },

    {
        id: "customer_details",
        question: "Your details",
        type: "details",
    },

    {
        id: "visit_time",
        question: "Preferred visit date & time",
        type: "datetime",
    },
    {
        id: "summary",
        question: "Review & pricing",
        type: "summary",
    },
];

export default function PowerflushQuote() {
    return <Stepper title="Power Flush" basePrice={180} steps={STEPS} />;
}
