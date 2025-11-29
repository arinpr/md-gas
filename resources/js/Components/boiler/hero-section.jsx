"use client"

import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Flame, Shield, Clock, Phone, Menu, X } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
            <header className="relative z-20 border-b border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <Flame className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">MD Gas</span>
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex">
                        <a
                            href="/#services"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Services
                        </a>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        <a
                            href="/#contact"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png"
                            alt="Gas Safe Register"
                            width={40}
                            height={40}
                            className="hidden sm:block"
                        />
                        <Button size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            <span className="hidden sm:inline">Call Now</span>
                        </Button>
                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
                        <nav className="flex flex-col px-4 py-4 space-y-3">
                            <a
                                href="/#services"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </a>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <a
                                href="/#contact"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                )}
            </header>

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
