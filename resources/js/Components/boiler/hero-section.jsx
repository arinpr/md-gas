"use client"

import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Flame, Shield, Clock, Phone, Menu, X } from "lucide-react"
import { useState } from "react" 
// import GuestLayout from "@/Layouts/GuestLayout"


// Home.layout = (page) => <GuestLayout children={page} />;
export function HeroSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="text-center lg:text-left">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            <Shield className="h-4 w-4" />
                            Gas Safe Registered Engineers
                        </div>
                        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Expert Boiler Solutions for Every Home
                        </h1>
                        <p className="mx-auto lg:mx-0 mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
                            Professional boiler repairs, servicing, and installations. Fast response times with fixed pricing and no
                            hidden costs.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                                <Link href="/book/quote">
                                    <Clock className="h-5 w-5" />
                                    Get Instant Quote
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                                <a href="/#services">View Our Services</a>
                            </Button>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            {[
                                { value: "15+", label: "Years Experience" },
                                { value: "5000+", label: "Happy Customers" },
                                { value: "24/7", label: "Emergency Service" },
                                { value: "100%", label: "Satisfaction Rate" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
                            <img
                                src="/images/landing-20boiler.png"
                                alt="Modern gas boiler"
                                width={400}
                                height={550}
                                className="relative z-10 drop-shadow-2xl"
                                priority
                            />
                            {/* Gas Safe badge overlay */}
                            <div className="absolute -bottom-4 -left-4 z-20 rounded-xl bg-card p-3 shadow-lg border border-border">
                                <img
                                    src="/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png"
                                    alt="Gas Safe Registered"
                                    width={80}
                                    height={80}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
