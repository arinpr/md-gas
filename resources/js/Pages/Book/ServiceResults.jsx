import QuoteResultsPage from "@/Components/extra/QuoteResultsPage";
import { PageHeader } from "@/Components/ui/page-header";
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
