import { SERVICES_KEY_VALUE } from "@/components/extra/ServicesKeyValue";
import Stepper from "@/components/extra/Stepper";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function PowerflushQuote() {
    const { basePrice, symbol } = usePage().props;

    const RADIATOR_PRICING = [
        { label: "Up to 5 radiators", price: 75 },
        { label: "6-8 radiators", price: 125 },
        { label: "9-12 radiators", price: 75 },
        { label: "13-15 radiators", price: 100 },
        { label: "16-20 radiators", price: 75 },
        { label: "21+ radiators", price: 125 },
    ];

    const STEPS = [
        {
            id: "radiators",
            type: "select",
            question: "How many radiators are in your property?",
            options: RADIATOR_PRICING.map((i) => ({
                label: i.label,
                price: i.price,
            })),
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
    ];

    return (
        <Stepper
            title="Power Flush"
            basePrice={basePrice}
            steps={STEPS}
            currency={symbol}
            serviceKey={SERVICES_KEY_VALUE.POWER_FLUSH}
        />
    );
}
