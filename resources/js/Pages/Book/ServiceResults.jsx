import QuoteResultsPage from "@/components/extra/QuoteResultsPage";
import { PageHeader } from "@/components/ui/page-header";
import { usePage } from "@inertiajs/react";

export default function ServiceResults() {
    const { answers } = usePage().props;

    return (
        <>
            <PageHeader variant="results" currentStep={4} />
            <QuoteResultsPage answers={answers} />{" "}
        </>
    );
}
