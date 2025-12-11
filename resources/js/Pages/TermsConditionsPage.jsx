import { PageHeader } from "@/components/ui/page-header";
// import { Footer } from "@/components/footer"
import { usePage } from "@inertiajs/react";

export default function TermsConditionsPage() {
    const { props } = usePage();
    const pageTitle = props.pageTitle ?? "Terms & Conditions";

    return (
        <div className="min-h-screen bg-background">
            <PageHeader title={pageTitle} />

            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Terms & Conditions
                </h1>
                <p className="text-muted-foreground mb-8">
                    Last updated: November 2024
                </p>

                <div className="prose prose-gray max-w-none space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            1. Agreement to Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using the services provided by MD
                            Gas ("Company", "we", "our", or "us"), you agree to
                            be bound by these Terms and Conditions. If you
                            disagree with any part of these terms, you may not
                            access our services.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            2. Services
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            MD Gas provides boiler repair, servicing,
                            installation, and power flush services. Our services
                            include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong className="text-foreground">
                                    Boiler Repairs:
                                </strong>{" "}
                                Fixed £75 labour charge (parts extra).
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Servicing:
                                </strong>{" "}
                                Annual servicing from £75.
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Installations:
                                </strong>{" "}
                                Pricing varies depending on system.
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Power Flush:
                                </strong>{" "}
                                Price based on radiator count.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            3. Bookings & Appointments
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                Provide accurate and complete booking
                                information.
                            </li>
                            <li>
                                An adult must be present during the appointment.
                            </li>
                            <li>
                                You must ensure safe access to the
                                boiler/system.
                            </li>
                            <li>
                                Cancel at least 24 hours before to avoid fees.
                            </li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            4. Pricing & Payment
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>All prices include VAT (unless stated).</li>
                            <li>
                                Labour charges are fixed; parts quoted
                                separately.
                            </li>
                            <li>
                                Payment due upon completion unless otherwise
                                agreed.
                            </li>
                            <li>We accept cash, card, and bank transfer.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            5. Warranties & Guarantees
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>12-month workmanship guarantee.</li>
                            <li>
                                Manufacturer warranties apply to new boilers.
                            </li>
                            <li>Parts covered by manufacturer warranty.</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            6. Liability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We are fully insured and Gas Safe registered.
                            Liability is limited to service cost. We are not
                            liable for: pre-existing system faults, third-party
                            damage, or issues caused by lack of maintenance.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            7. Safety Requirements
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            All work follows Gas Safe regulations. If we find
                            unsafe conditions, we may need to isolate the
                            appliance as required by law.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            8. Complaints
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Contact us within 14 days if you’re unhappy. We
                            respond within 2 working days and resolve complaints
                            within 14 working days.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            9. Changes to Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update these terms at any time. Updates are
                            effective immediately once posted. Continued use of
                            our services means acceptance of updated terms.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            10. Contact Information
                        </h2>
                        <div className="mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground">
                            <p>
                                <strong className="text-foreground">
                                    Email:
                                </strong>{" "}
                                info@mdgas.co.uk
                            </p>
                            <p>
                                <strong className="text-foreground">
                                    Phone:
                                </strong>{" "}
                                0800 123 4567
                            </p>
                            <p>
                                <strong className="text-foreground">
                                    Address:
                                </strong>{" "}
                                MD Gas Ltd, Greater London
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
