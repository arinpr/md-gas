// AboutPage.jsx
import { Head, Link, usePage } from "@inertiajs/react";
import Header from "@/Components/boiler/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock, CheckCircle2, Phone } from "lucide-react";
import {
    FaShieldAlt,
    FaOilCan,
    FaCheckCircle,
    FaStar,
    FaGasPump,
    FaCertificate,
    FaUserCheck,
    FaClipboardCheck,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Footer } from "@/Components/boiler/footer";

/* ---------- Content (edit to taste) ---------- */
const VALUES = [
    {
        icon: Shield,
        title: "Safety First",
        description:
            "All engineers are Gas Safe registered and receive ongoing training to maintain the highest safety standards.",
    },
    {
        icon: Award,
        title: "Quality Workmanship",
        description:
            "We guarantee workmanship and back installations with manufacturer and labour warranties.",
    },
    {
        icon: Users,
        title: "Customer Focused",
        description:
            "Clear pricing, friendly engineers and proactive communication on every job.",
    },
    {
        icon: Clock,
        title: "Reliable Service",
        description:
            "On-time arrivals, rapid emergency response and dependable aftercare.",
    },
];

const STATS = [
    { key: "years", value: 15, label: "Years in business" },
    { key: "customers", value: 5000, label: "Happy customers" },
    { key: "jobs", value: 10000, label: "Jobs completed" },
    { key: "support", value: 24, label: "Emergency support (hrs)" },
];

/* ---------- Page ---------- */
export default function AboutPage() {
    const { props } = usePage();
    const pageTitle = props.pageTitle ?? "About Us";

    // simple counter animation
    const [counters, setCounters] = useState(
        STATS.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {})
    );

    useEffect(() => {
        let raf;
        const duration = 900; // ms
        const start = performance.now();

        const animate = (t) => {
            const elapsed = Math.min(t - start, duration);
            const progress = elapsed / duration;
            const next = {};
            STATS.forEach((s) => {
                next[s.key] = Math.floor(s.value * progress);
            });
            setCounters(next);
            if (elapsed < duration) raf = requestAnimationFrame(animate);
            else {
                // ensure final values
                const final = {};
                STATS.forEach((s) => (final[s.key] = s.value));
                setCounters(final);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <>
            <Head title={pageTitle} />

            <div className="min-h-screen rounded-b-3xl bg-foreground text-gray-900">
                <Header title={pageTitle} />

                <main className="w-full">
                    {/* HERO – MODERN REDESIGN */}
                    {/* HERO - MODERN REDESIGN */}

                    <section className="relative pt-40 pb-14 px-4 sm:px-6 lg:px-0 overflow-hidden">
                        {/* Clean minimal background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

                        {/* Subtle geometric accents */}
                        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                {/* LEFT CONTENT - Clean optimized layout */}
                                <div className="space-y-8">
                                    {/* Minimal badge */}
                                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
                                        <div className="h-2 w-2 bg-indigo-500 rounded-full" />
                                        <span className="text-sm font-medium">
                                            Trusted Since 2012
                                        </span>
                                    </div>

                                    {/* Clean title hierarchy */}
                                    <div className="space-y-4">
                                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                                            Reliable Heating
                                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                                Solutions for London
                                            </span>
                                        </h1>
                                        <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                                    </div>

                                    {/* Optimized description */}
                                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                        For over a decade, MD Gas has been
                                        providing professional boiler services
                                        across Greater London with transparent
                                        pricing and reliable engineering.
                                    </p>

                                    {/* Key benefits in clean list */}
                                    <div className="space-y-3">
                                        {[
                                            "✓ Gas Safe Registered & Certified",
                                            "✓ 24/7 Emergency Support Available",
                                            "✓ Fixed Pricing - No Hidden Fees",
                                            "✓ Same-Day Service When Needed",
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="text-green-600 font-semibold">
                                                    ✓
                                                </span>
                                                <span className="text-gray-700">
                                                    {item.split("✓ ")[1]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Clean CTA section */}
                                    <div className="space-y-6 pt-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl px-8 text-foreground bg-gradient-to-r from-dark via-dark/80 to-primary hover:from-gray-800 hover:to-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                <Link href="/book/quote">
                                                    <span className="flex items-center gap-2">
                                                        Book a Service
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            </Button>

                                            <Button
                                                asChild
                                                size="lg"
                                                variant="outline"
                                                className="rounded-xl px-8 border-gray-300 bg-gray-50 hover:border-gray-400 transition-all"
                                            >
                                                <Link href="/services">
                                                    <span className="flex items-center gap-2">
                                                        View All Services
                                                    </span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT CONTENT - Clean image with stats */}
                                <div className="relative">
                                    {/* Main image container */}
                                    <div className="relative overflow-hidden rounded-3xl shadow-xl">
                                        <img
                                            src="/professional-gas-engineer-working-on-boiler.jpg"
                                            alt="Professional gas engineer servicing boiler"
                                            className="w-full h-[420px] object-cover"
                                            loading="lazy"
                                        />

                                        {/* Experience badge - subtle */}
                                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                Experience
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                15+ Years
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats bar - positioned below image */}
                                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <div className="grid grid-cols-4 divide-x divide-gray-200">
                                            {STATS.map((s) => (
                                                <div
                                                    key={s.key}
                                                    className="px-4 text-center"
                                                >
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {s.key === "support"
                                                            ? "24/7"
                                                            : `${s.value}${
                                                                  s.value >=
                                                                  1000
                                                                      ? "+"
                                                                      : ""
                                                              }`}
                                                    </div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {s.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* VALUES SECTION - Optimized to match hero */}
                    <section className="py-16 lg:py-5">
                        {/* Background matches hero section */}
                        <div className="absolute inset-x-0 h-[600px] bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30 -z-10" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Clean header with subtle divider */}
                            <div className="max-w-3xl mx-auto text-center">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <div className="h-px w-8 bg-gradient-to-r from-indigo-500 to-blue-500" />
                                    <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
                                        Our Foundation
                                    </span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                                    Built on Core Values
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                    Safety, quality and customers-first — the
                                    foundation of every job we complete in
                                    Greater London.
                                </p>
                            </div>

                            {/* Clean value cards - 2x2 grid on mobile, 4 columns on desktop */}
                            <div className="mt-12 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                {VALUES.map((value) => (
                                    <div
                                        key={value.title}
                                        className="group relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 
                   hover:shadow-lg hover:border-indigo-100 transition-all duration-300 
                   hover:-translate-y-1"
                                    >
                                        {/* Subtle hover effect background */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50/30 opacity-0 
                        group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10"
                                        />

                                        {/* Icon container - matches hero's style */}
                                        <div
                                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl 
                        bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 
                        group-hover:from-indigo-100 group-hover:to-blue-100 transition-all"
                                        >
                                            <value.icon className="h-7 w-7 text-indigo-600" />
                                        </div>

                                        {/* Content */}
                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                                {value.title}
                                            </h3>
                                            <p className="mt-3 text-gray-600 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>

                                        {/* Subtle indicator */}
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover:bg-indigo-500 transition-colors" />
                                                Learn more
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Optional: Trust indicators row */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                                            Why it matters
                                        </p>
                                        <h3 className="text-lg font-semibold text-gray-900 mt-1">
                                            Your safety and satisfaction come
                                            first
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            {
                                                value: "100%",
                                                label: "Gas Safe Compliance",
                                            },
                                            {
                                                value: "24/7",
                                                label: "Support Available",
                                            },
                                            {
                                                value: "0%",
                                                label: "Hidden Fees",
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="text-center"
                                            >
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {item.value}
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* OUR STORY SECTION - Unique Modern Design */}
                    <section
                        id="qualification"
                        className="relative py-20 lg:py-24 overflow-hidden"
                    >
                        {/* Abstract background shapes */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/20" />
                        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-100/30 rounded-full -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

                        {/* Geometric grid overlay */}
                        <div className="absolute inset-0 opacity-5">
                            <div
                                className="h-full w-full"
                                style={{
                                    backgroundImage: `linear-gradient(to right, #9ca3af 1px, transparent 1px),
                        linear-gradient(to bottom, #9ca3af 1px, transparent 1px)`,
                                    backgroundSize: "60px 60px",
                                }}
                            />
                        </div>

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                {/* LEFT SIDE - Content with timeline */}
                                <div className="space-y-8">
                                    {/* Section indicator */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-12 bg-gradient-to-r from-indigo-500 to-blue-500" />
                                        <span className="text-sm font-medium text-indigo-600 uppercase tracking-widest">
                                            Our Journey
                                        </span>
                                    </div>

                                    {/* Main title */}
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                        From a single van
                                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                            To London's trusted name
                                        </span>
                                    </h2>

                                    {/* Timeline/story */}
                                    <div className="relative">
                                        {/* Timeline line */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-blue-300 to-transparent" />

                                        <div className="space-y-8 pl-6">
                                            <div>
                                                <div className="absolute left-[-3px] w-2 h-2 rounded-full bg-indigo-600" />
                                                <p className="text-gray-600 leading-relaxed">
                                                    Started in 2012 with a
                                                    simple mission: provide
                                                    honest, reliable heating
                                                    services at fair prices to
                                                    London homeowners.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="absolute left-[-3px] mt-2 w-2 h-2 rounded-full bg-blue-600" />
                                                <p className="text-gray-600 leading-relaxed">
                                                    Grew through word-of-mouth
                                                    by consistently delivering
                                                    quality workmanship and
                                                    building lasting
                                                    relationships.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="absolute left-[-3px] mt-2 w-2 h-2 rounded-full bg-indigo-500" />
                                                <p className="text-gray-600 leading-relaxed">
                                                    Today, we're a team of
                                                    certified engineers using
                                                    advanced diagnostic tools
                                                    while maintaining our
                                                    founding principles.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT SIDE - Creative Image Layout */}
                                <div className="relative">
                                    {/* Clean minimal design */}
                                    <div className="relative">
                                        {/* Main image with subtle frame */}
                                        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                                            <img
                                                src="/images/engineers-image.jpg"
                                                alt="MD Gas professional engineer team"
                                                className="w-full h-[400px] object-cover"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Simple overlay badges */}
                                        <div className="absolute top-6 right-6">
                                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl px-4 py-3 shadow-lg">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium">
                                                        Since
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        2012
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom info bar */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/70 to-transparent p-6 rounded-b-2xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-white font-semibold">
                                                        MD Gas Engineers
                                                    </p>
                                                    <p className="text-white/80 text-sm mt-1">
                                                        Gas Safe Certified •
                                                        London
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                                                    <svg
                                                        className="w-4 h-4 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                        />
                                                    </svg>
                                                    <span className="text-white text-sm font-medium">
                                                        Certified
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle background elements */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl -z-10" />
                                </div>
                            </div>

                            {/* Mission statement below */}
                            <div className="mt-24">
                                {/* Modern split layout */}
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-indigo-50/30 border border-gray-100 shadow-xl">
                                    {/* Geometric background pattern */}
                                    <div className="absolute top-0 left-0 w-full h-full opacity-5">
                                        <div className="absolute top-0 left-0 w-64 h-64 border border-indigo-200 rounded-full -translate-x-1/2 -translate-y-1/2" />
                                        <div className="absolute bottom-0 right-0 w-96 h-96 border border-blue-200 rounded-full translate-x-1/3 translate-y-1/3" />
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Left side - Visual element */}
                                        <div className="relative p-8 lg:p-12 bg-gradient-to-br from-indigo-600/10 to-blue-600/10">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600" />

                                            <div className="relative z-10">
                                                <div className="inline-flex items-center gap-3 mb-8">
                                                    <div
                                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 
                          flex items-center justify-center shadow-lg"
                                                    >
                                                        <svg
                                                            className="w-6 h-6 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900">
                                                            Our Promise
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Unchanging since day
                                                            one
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Timeline indicator */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                Integrity First
                                                            </p>
                                                            <p className="text-gray-600 text-sm">
                                                                Honest service,
                                                                fair pricing
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                Quality
                                                                Craftsmanship
                                                            </p>
                                                            <p className="text-gray-600 text-sm">
                                                                Work that lasts
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                Customer Care
                                                            </p>
                                                            <p className="text-gray-600 text-sm">
                                                                Your peace of
                                                                mind matters
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side - Quote */}
                                        <div className="p-8 lg:p-12">
                                            <div className="relative">
                                                <div className="absolute -top-2 -left-2 text-5xl text-indigo-100 font-serif">
                                                    "
                                                </div>

                                                <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed font-light pl-6">
                                                    To deliver exceptional
                                                    heating services with
                                                    integrity, transparency, and
                                                    craftsmanship that stands
                                                    the test of time — ensuring
                                                    every home we serve enjoys
                                                    reliable warmth and peace of
                                                    mind.
                                                </blockquote>

                                                <div className="absolute -bottom-2 -right-2 text-5xl text-indigo-100 font-serif rotate-180">
                                                    "
                                                </div>
                                            </div>

                                            <div className="mt-10 pt-8 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            MD Gas Team
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Trusted since 2012
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {[1, 2, 3].map(
                                                            (_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="w-2 h-2 rounded-full bg-indigo-400"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-8 h-8 border-r-2 border-b-2 border-indigo-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ACCREDITATIONS - Modern Unique Design */}
                    <section id="services-area" className="py-16 lg:py-3">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Header with creative layout */}
                            <div className="text-center mb-12 lg:mb-16">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-12 bg-gradient-to-r from-indigo-500 to-blue-500" />
                                    <span className="text-sm font-medium text-indigo-600 uppercase tracking-widest">
                                        Professional Accreditations
                                    </span>
                                    <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-indigo-500" />
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Certified Excellence
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Our professional certifications ensure the
                                    highest standards of safety and quality.
                                </p>
                            </div>

                            {/* Accreditations Grid */}
                            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                {[
                                    {
                                        title: "Gas Safe Registered",
                                        description:
                                            "Fully certified and compliant with all UK gas safety regulations",
                                        icon: FaGasPump,
                                        color: "from-blue-500 to-cyan-500",
                                    },
                                    {
                                        title: "OFTEC Certified",
                                        description:
                                            "Qualified for oil heating installations and servicing",
                                        icon: FaOilCan,
                                        color: "from-emerald-500 to-green-500",
                                    },
                                    {
                                        title: "Which? Trusted Trader",
                                        description:
                                            "Vetted and approved by the UK's leading consumer champion",
                                        icon: FaCheckCircle,
                                        color: "from-purple-500 to-indigo-500",
                                    },
                                    {
                                        title: "Checkatrade Verified",
                                        description:
                                            "Rated and reviewed by customers with proven track record",
                                        icon: FaStar,
                                        color: "from-amber-500 to-orange-500",
                                    },
                                ].map((cert, index) => {
                                    const IconComponent = cert.icon;
                                    return (
                                        <div
                                            key={cert.title}
                                            className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 
                     hover:border-indigo-200 hover:shadow-xl transition-all duration-300 
                     hover:-translate-y-1"
                                        >
                                            {/* Decorative corner */}
                                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-blue-50 transform rotate-45 translate-x-8 -translate-y-8" />
                                            </div>

                                            {/* Number indicator */}
                                            <div
                                                className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 
                          text-white flex items-center justify-center text-sm font-bold shadow-md"
                                            >
                                                {index + 1}
                                            </div>

                                            {/* Icon with gradient */}
                                            <div
                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} 
                          flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}
                                            >
                                                <IconComponent className="h-7 w-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                {cert.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {cert.description}
                                            </p>

                                            {/* Bottom indicator */}
                                            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                                <span className="text-xs font-medium text-indigo-600">
                                                    Verified & Certified
                                                </span>
                                                <svg
                                                    className="w-4 h-4 text-green-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* CTA - Enhanced Simple Design */}
                    <section className="relative py-16 overflow-hidden rounded-b-3xl">
                        <div className="absolute inset-0 bg-primary" />

                        {/* Decorative circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative max-w-3xl mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold text-white">
                                Ready to get started?
                            </h2>
                            <p className="mt-4 text-lg text-white/90">
                                Book a free quote or request emergency service —
                                we’ll be there.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-full bg-white text-indigo-600 hover:bg-gray-100 px-10 shadow-lg"
                                >
                                    <Link href="/book/quote">Get a Quote</Link>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full border-white text-white hover:bg-white/10 px-10"
                                >
                                    <Link
                                        href="tel:08001234567"
                                        className="inline-flex items-center gap-2"
                                    >
                                        <Phone className="h-5 w-5" />
                                        0800 123 4567
                                    </Link>
                                </Button>
                            </div>

                            <p className="mt-8 text-sm text-white/80">
                                Trusted by thousands of homeowners across London
                            </p>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
