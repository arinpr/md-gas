import { PageHeader } from "@/components/ui/page-header";
// import { Footer } from "@/components/footer"
import { Head, usePage } from "@inertiajs/react";

export default function PrivacyPolicyPage() {
    const { props } = usePage();
    const pageTitle = props.pageTitle ?? "Privacy Policy";

    return (
        <>
            <Head title={pageTitle} />

            <div className="min-h-screen bg-background">
                <PageHeader title={pageTitle} />

                <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Last updated: November 2024
                    </p>

                    <div className="prose prose-gray max-w-none space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                1. Introduction
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                MD Gas ("we", "our", or "us") is committed to
                                protecting your privacy. This Privacy Policy
                                explains how we collect, use, disclose, and
                                safeguard your information when you use our
                                website and services.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We may collect information about you in a
                                variety of ways, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">
                                        Personal Data:
                                    </strong>{" "}
                                    Name, email, phone number, address, and
                                    postcode.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Property Information:
                                    </strong>{" "}
                                    Details about your boiler system.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Payment Information:
                                    </strong>{" "}
                                    Securely processed via our payment provider.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Usage Data:
                                    </strong>{" "}
                                    IP address, browser type, and site
                                    interaction data.
                                </li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We use your information for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Providing and improving our services</li>
                                <li>Processing bookings</li>
                                <li>Communicating about appointments</li>
                                <li>
                                    Sending promotional updates (with consent)
                                </li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                4. Information Sharing
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We do not sell or rent your data. We only share
                                your information with trusted service providers
                                who assist us in delivering our services.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                5. Data Security
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use security measures to protect your
                                information, but no online transmission is 100%
                                secure.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                6. Your Rights
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Right to access your data</li>
                                <li>Right to correct inaccuracies</li>
                                <li>Right to deletion</li>
                                <li>Right to restrict processing</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing</li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                7. Cookies
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website uses cookies to improve user
                                experience. You may disable cookies in your
                                browser settings.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                8. Contact Us
                            </h2>
                            <div className="mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground">
                                <p>
                                    <strong className="text-foreground">
                                        Email:
                                    </strong>{" "}
                                    privacy@mdgas.co.uk
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
        </>
    );
}
