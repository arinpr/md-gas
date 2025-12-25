import Stepper from "@/Components/extra/Stepper";
import { SERVICE_QUESTIONS } from "@/Components/extra/boilerSteps";
import { useMemo } from "react";

/* -----------------------------
   Read postcode only
----------------------------- */
function getInitialData() {
    const params = new URLSearchParams(window.location.search);

    return {
        postcode: params.get("postcode") || "",
    };
}

export default function NewBoilerQuote() {
    const { postcode } = getInitialData();

    const baseSteps = SERVICE_QUESTIONS?.new || [];

    const steps = useMemo(() => {
        return [...baseSteps];
    }, [postcode]);

    if (!baseSteps.length) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-2xl font-bold">Configuration error</h2>
                <p className="text-slate-500 mt-2">
                    No questions configured for new boiler
                </p>
            </div>
        );
    }

    return <Stepper title="New boiler quote" steps={steps} basePrice={75} />;
}
