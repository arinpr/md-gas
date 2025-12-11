import { Head, Link, usePage } from "@inertiajs/react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock, CheckCircle2, Phone } from "lucide-react";
// import { Footer } from "@/components/footer";
import Header from "@/Components/boiler/header";

const values = [
    {
        icon: Shield,
        title: "Safety First",
        description:
            "All our engineers are Gas Safe registered and undergo regular training to ensure the highest safety standards.",
    },
    {
        icon: Award,
        title: "Quality Workmanship",
        description:
            "We take pride in our work and guarantee all repairs and installations with comprehensive warranties.",
    },
    {
        icon: Users,
        title: "Customer Focused",
        description:
            "Your satisfaction is our priority. We provide clear communication and transparent pricing on every job.",
    },
    {
        icon: Clock,
        title: "Reliable Service",
        description:
            "We show up on time, every time. Our punctuality and professionalism set us apart from the competition.",
    },
];

const stats = [
    { value: "15+", label: "Years in Business" },
    { value: "5,000+", label: "Happy Customers" },
    { value: "10,000+", label: "Jobs Completed" },
    { value: "24/7", label: "Emergency Support" },
];

export default function AboutPage() {
    const { props } = usePage();
    const pageTitle = props.pageTitle ?? "About Us";

    return (
        <>
            <Head title={pageTitle} />

            <div className="min-h-screen bg-background">
                <Header title={pageTitle} />

                <main>
                    {/* Hero section */}
                    <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                    About MD Gas
                                </h1>
                                <p className="mt-6 text-lg text-muted-foreground">
                                    For over 15 years, MD Gas has been providing
                                    expert boiler services to homeowners across
                                    Greater London. Our team of Gas Safe
                                    registered engineers is committed to
                                    delivering safe, reliable, and affordable
                                    heating solutions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="border-y border-border bg-card py-12">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="text-center"
                                    >
                                        <div className="text-3xl font-bold text-primary sm:text-4xl">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Our story */}
                    <section className="py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                                        Our Story
                                    </h2>
                                    <div className="mt-6 space-y-4 text-muted-foreground">
                                        <p>
                                            MD Gas was founded with a simple
                                            mission: to provide honest, reliable
                                            boiler services at fair prices. What
                                            started as a one-man operation has
                                            grown into a trusted team of skilled
                                            engineers serving thousands of homes
                                            across the Greater London area.
                                        </p>
                                        <p>
                                            Over the years, we've built our
                                            reputation on transparency, quality
                                            workmanship, and exceptional
                                            customer service. We believe in
                                            doing the job right the first time,
                                            and our fixed pricing means you'll
                                            never face unexpected costs.
                                        </p>
                                        <p>
                                            Today, MD Gas continues to grow
                                            while maintaining the personal touch
                                            and attention to detail that our
                                            customers have come to expect.
                                            Whether you need an emergency repair
                                            or a full boiler installation, we're
                                            here to help.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                                        <img
                                            src="/professional-gas-engineer-working-on-boiler.jpg"
                                            alt="MD Gas engineer at work"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-xl">
                                        <div className="text-3xl font-bold">
                                            15+
                                        </div>
                                        <div className="text-sm">
                                            Years Experience
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Values */}
                    <section className="bg-muted/50 py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                                    Our Values
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    The principles that guide everything we do
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {values.map((value) => (
                                    <Card
                                        key={value.title}
                                        className="text-center"
                                    >
                                        <CardContent className="pt-8 pb-6">
                                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                                <value.icon className="h-7 w-7 text-primary" />
                                            </div>
                                            <h3 className="font-semibold">
                                                {value.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {value.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section className="py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-2xl font-bold">
                                    Accreditations & Certifications
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    We maintain the highest industry standards
                                </p>
                            </div>

                            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
                                {[
                                    "Gas Safe Registered",
                                    "OFTEC Certified",
                                    "Which? Trusted Trader",
                                    "Checkatrade Verified",
                                ].map((cert) => (
                                    <div
                                        key={cert}
                                        className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-4"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                        <span className="font-medium">
                                            {cert}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-primary py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                                Ready to Get Started?
                            </h2>
                            <p className="mt-4 text-primary-foreground/80">
                                Contact us today for a free quote or to book a
                                service
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/book/quote">Get a Quote</Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                                >
                                    <Phone className="h-5 w-5" />
                                    0800 123 4567
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* <Footer /> */}
            </div>
        </>
    );
}
