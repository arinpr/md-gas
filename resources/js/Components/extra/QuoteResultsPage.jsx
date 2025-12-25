import { useState } from "react";
import {
    FiStar,
    FiCheck,
    FiInfo,
    FiX,
    FiChevronRight,
    FiClock,
    FiShield,
    FiZap,
    FiThermometer,
    FiTag,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import { AiOutlineQuestion } from "react-icons/ai";
import { router } from "@inertiajs/react";

/* --------------------------------------------------
   DATA
-------------------------------------------------- */

const boilerImages = {
    1: "/images/ideal-20logic.png",
    2: "/images/ideal-20logic.png",
    3: "/images/ideal-20logic.png",
};

const INCLUDED_ITEMS = [
    {
        icon: <FiShield />,
        title: "Gas Safe registered installation",
        description: "All work by certified Gas Safe engineers",
    },
    {
        icon: <FiZap />,
        title: "Wireless smart heating controls",
        description: "Control your heating from anywhere",
    },
    {
        icon: <FiThermometer />,
        title: "Removal & disposal of old boiler",
        description: "Professional removal included",
    },
    {
        icon: <FiCheck />,
        title: "Standard horizontal flue included",
        description: "No hidden costs",
    },
    {
        icon: <FiCheck />,
        title: "Magnetic system filter",
        description: "Protects your boiler from sludge",
    },
    {
        icon: <FiCheck />,
        title: "Full chemical system flush",
        description: "Ensures optimal performance",
    },
    {
        icon: <FiShield />,
        title: "Gas safety certificate",
        description: "Legally required documentation",
    },
    {
        icon: <FiCheck />,
        title: "Building regulations compliance",
        description: "Fully compliant with UK standards",
    },
];

const QUOTES = [
    {
        id: 1,
        tier: "Good",
        badge: "bg-gradient-to-r from-slate-600/80 to-slate-500",
        accent: "bg-gradient-to-r from-slate-50 via-slate-50 to-slate-100",
        cardGradient: "from-slate-50 to-white",
        brand: "Glow-worm",
        name: "Compact 24kW Combi Boiler",
        warranty: "5 year warranty",
        expert: "A reliable and affordable option if you need a quick replacement without overspending.",
        price: 2230,
        oldPrice: 2430,
        monthly: 31.09,
        rating: 4.9,
        efficiency: "92%",
        hotWater: "9.8L/min",
        dimensions: "700 x 400 x 300mm",
        weight: "31kg",
        popularity: "High",
        isFavorite: false,
        featured: true,
    },
    {
        id: 2,
        tier: "Better",
        badge: "bg-gradient-to-r from-emerald-600/80 to-teal-500",
        accent: "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100",
        cardGradient: "from-emerald-50/50 to-white",
        brand: "Worcester Bosch",
        name: "Greenstar 4000 25kW Combi",
        warranty: "10 year warranty",
        expert: "The UK's best-selling combi — excellent efficiency, reliability and long-term peace of mind.",
        price: 2630,
        oldPrice: 2940,
        monthly: 36.66,
        rating: 4.8,
        efficiency: "94%",
        hotWater: "10.2L/min",
        dimensions: "720 x 450 x 310mm",
        weight: "34kg",
        popularity: "Very High",
        isFavorite: true,
        featured: true,
    },
    {
        id: 3,
        tier: "Best",
        badge: "bg-gradient-to-r from-violet-600/80 to-purple-500",
        accent: "bg-gradient-to-r from-violet-50 via-purple-50 to-violet-100",
        cardGradient: "from-violet-50/30 to-white",
        brand: "Vaillant",
        name: "ecoTEC Plus 26kW Premium",
        warranty: "12 year warranty · 0% APR available",
        expert: "Premium performance with faster hot water delivery and outstanding energy efficiency.",
        price: 3240,
        oldPrice: 3540,
        monthly: 45.17,
        rating: 4.9,
        efficiency: "95%",
        hotWater: "11.5L/min",
        dimensions: "690 x 420 x 290mm",
        weight: "32kg",
        popularity: "Premium",
        isFavorite: false,
        featured: true,
    },
];

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

export default function QuoteResultsPage() {
    const [activeQuote, setActiveQuote] = useState(null);
    const [detailsQuote, setDetailsQuote] = useState(null);
    const [expandedSpecs, setExpandedSpecs] = useState(false);
    const [powerModal, setPowerModal] = useState(null);
    const [selectedPower, setSelectedPower] = useState("25");

    return (
        <div className="min-h-screen bg-light-background px-4 py-12 md:px-6 md:py-16">
            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-14">
                <div className="relative">
                    {/* Main Rail */}
                    <div className="relative ">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            {/* LEFT — CONTEXT */}
                            <div>
                                <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                                    Installation packages
                                </div>
                                <div className="text-4xl font-semibold text-slate-900">
                                    13 options
                                </div>
                            </div>

                            {/* CENTER — PROPERTY */}
                            <div className="flex items-center gap-4 text-sm text-slate-700">
                                {["1 bedroom", "1 bathroom", "SW2"].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm"
                                        >
                                            {item}
                                        </div>
                                    )
                                )}

                                <button className="h-10 w-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
                                    ✎
                                </button>
                            </div>

                            {/* RIGHT — ACTIONS */}
                            <div className="flex items-center gap-3">
                                <button className="rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-medium hover:bg-white transition">
                                    What’s included?
                                </button>

                                <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
                                    ✉ Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUOTE CARDS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {QUOTES.map((q) => (
                    <div
                        key={q.id}
                        className={`relative rounded-3xl bg-gradient-to-b ${
                            q.cardGradient
                        } shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-foreground hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ${
                            q.featured
                                ? "ring-1 ring-primary/20 ring-offset-2"
                                : ""
                        }`}
                    >
                        {/* Header */}
                        <div
                            className={`h-40 ${q.accent} relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

                            <div className="relative p-6 flex justify-between items-start">
                                <div>
                                    <div className="absolute -right-7 top-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-xs font-bold px-10 py-2 transform rotate-45 shadow-lg">
                                        {q.tier}
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-white">
                                        {/* <FiStar className="h-4 w-4 text-amber-400 fill-amber-400" /> */}
                                        <span className="text-sm font-semibold">
                                            {/* {q.rating}
                                            <span className="ml-0.5 text-xs font-medium text-white/70">
                                                /5
                                            </span> */}
                                            {q.popularity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center -mt-28 relative z-10 px-6">
                            <div className="relative">
                                <div className="absolute inset-10 bg-gradient-to-r from-dark/40 to-transparent blur-2xl" />
                                <img
                                    src={boilerImages[q.id]}
                                    alt={q.name}
                                    className="h-60 object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Modern Divider */}
                        <div className="relative my-7">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            <div className="absolute inset-x-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm" />
                        </div>

                        {/* Content */}
                        <div className="px-7 pb-7">
                            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                {q.brand}
                            </p>

                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {q.name}
                                </h3>
                                <button
                                    onClick={() => setPowerModal(q)}
                                    className="h-5 w-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                                    aria-label={`${q.brand} boiler power options`}
                                >
                                    <FiInfo className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Warranty */}
                            <div className="mt-5 flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <FiShield className="text-emerald-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {q.warranty}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Included in price
                                    </div>
                                </div>
                            </div>

                            {/* Expert Opinion */}
                            <div className="mt-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 p-4 border border-blue-100">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <FiInfo className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">
                                            Expert Opinion
                                        </div>
                                        <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                                            "{q.expert}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

                                {/* INCLUDED ICON (with tooltip) */}
                                <div className="absolute top-2 right-2 group z-30">
                                    <button
                                        onClick={() => setActiveQuote(q)}
                                        aria-label="What's included in my installation"
                                        className="h-8 w-8 rounded-full bg-white/10 cursor-pointer hover:bg-white/20 border border-white/20 flex items-center justify-center transition"
                                    >
                                        <AiOutlineQuestion className="h-3 w-3 text-white transition-transform group-hover:scale-110" />
                                    </button>

                                    {/* Tooltip */}
                                    <div className="pointer-events-none absolute right-0  mt-2 w-max max-w-[220px] rounded-lg bg-white px-3 py-1.5 text-xs text-dark opacity-0 translate-y-1 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                                        What’s included in my installation?
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className="text-sm opacity-80 flex items-center gap-2">
                                        Total Price (inc. VAT)
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                        {/* LEFT: FULL PRICE */}
                                        <div>
                                            <div className="text-3xl font-bold tracking-tight">
                                                £{q.price.toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <div className="text-sm line-through opacity-60">
                                                    £
                                                    {q.oldPrice.toLocaleString()}
                                                </div>
                                                <div className="px-2 py-0.5 rounded-full bg-primary/30 text-white text-[10px] font-semibold">
                                                    SAVE £{q.oldPrice - q.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT: MONTHLY */}
                                        <button
                                            type="button"
                                            className="text-right group"
                                            onClick={() => setActiveQuote(q)}
                                        >
                                            <div className="text-sm opacity-80">
                                                or, monthly from
                                            </div>

                                            <div className="flex items-center justify-end gap-1 cursor-pointer">
                                                <span className="text-2xl font-bold ">
                                                    £{q.monthly}
                                                </span>

                                                <FiChevronDown className="h-5 w-5 opacity-80 group-hover:opacity-100 transition" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => setDetailsQuote(q)}
                                    className="w-full rounded-xl border-2 cursor-pointer border-primary/25 hover:border-primary hover:bg-primary/5 py-3.5 text-primary font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
                                >
                                    View Full Breakdown
                                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={() =>
                                        router.visit(route("book.install"), {
                                            method: "get",
                                            data: {
                                                boilerId: q.id,
                                                power: selectedPower,
                                            },
                                        })
                                    }
                                    className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-emerald-600 hover:to-teal-600 text-white py-3.5 font-semibold shadow-lg hover:shadow-emerald-200/50 hover:shadow-xl transition-all duration-200"
                                >
                                    Select This Boiler
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* INCLUDED SIDEBAR */}
            {activeQuote && (
                <>
                    <div
                        onClick={() => setActiveQuote(null)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
                    />

                    <aside className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl animate-slideFromRight">
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        What's Included
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Full breakdown of package
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveQuote(null)}
                                    className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                                >
                                    <FiX className="text-slate-600" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-4">
                                    {INCLUDED_ITEMS.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
                                        >
                                            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                                    <h3 className="font-bold text-lg mb-4">
                                        Total Value Breakdown
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm opacity-80">
                                                Boiler & Installation
                                            </span>
                                            <span className="font-semibold">
                                                £
                                                {activeQuote.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm opacity-80">
                                                Smart Controls
                                            </span>
                                            <span className="text-emerald-300">
                                                Included
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm opacity-80">
                                                Warranty ({activeQuote.warranty}
                                                )
                                            </span>
                                            <span className="text-emerald-300">
                                                Included
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">
                                                Total Package Value
                                            </span>
                                            <span className="text-2xl font-bold">
                                                £
                                                {activeQuote.price.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-slate-100">
                                <button
                                    onClick={() => {
                                        setActiveQuote(null);
                                        setDetailsQuote(activeQuote);
                                    }}
                                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Select This Package
                                </button>
                            </div>
                        </div>
                    </aside>
                </>
            )}

            {/* DETAILS SIDEBAR */}
            {detailsQuote && (
                <>
                    <div
                        onClick={() => setDetailsQuote(null)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
                    />

                    <aside className="fixed right-0 top-0 h-full w-full lg:w-[960px] bg-white z-50 shadow-[0_40px_120px_rgba(0,0,0,0.3)] animate-slideFromRight">
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-100 z-20">
                                <div className="flex justify-between items-center px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-10 px-4 rounded-full flex items-center font-bold text-white ${detailsQuote.badge}`}
                                        >
                                            {detailsQuote.tier}
                                        </div>
                                        <h1 className="text-xl font-bold text-slate-900">
                                            {detailsQuote.name}
                                        </h1>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            onClick={() =>
                                                setDetailsQuote(null)
                                            }
                                            className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                                        >
                                            <FiX className="text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        {/* Image */}
                                        <div className="relative">
                                            <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-12 flex justify-center items-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-slate-100/30" />
                                                <img
                                                    src={
                                                        boilerImages[
                                                            detailsQuote.id
                                                        ]
                                                    }
                                                    alt={detailsQuote.name}
                                                    className="h-72 object-contain drop-shadow-2xl relative z-10"
                                                />
                                            </div>
                                            <div className="flex gap-3 mt-6">
                                                <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm flex items-center gap-2">
                                                    <FiClock /> In stock • Next
                                                    day delivery
                                                </span>
                                                <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                                                    0% APR available
                                                </span>
                                            </div>
                                        </div>

                                        {/* Specifications */}
                                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Specifications
                                                </h2>
                                                <button
                                                    onClick={() =>
                                                        setExpandedSpecs(
                                                            !expandedSpecs
                                                        )
                                                    }
                                                    className="text-emerald-600 font-medium text-sm flex items-center gap-1"
                                                >
                                                    {expandedSpecs
                                                        ? "Show Less"
                                                        : "Show More"}
                                                    {expandedSpecs ? (
                                                        <FiChevronUp />
                                                    ) : (
                                                        <FiChevronDown />
                                                    )}
                                                </button>
                                            </div>
                                            <div
                                                className={`grid ${
                                                    expandedSpecs
                                                        ? "grid-cols-2"
                                                        : "grid-cols-3"
                                                } gap-4`}
                                            >
                                                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                    <div className="text-2xl font-bold text-slate-900">
                                                        {
                                                            detailsQuote.efficiency
                                                        }
                                                    </div>
                                                    <div className="text-sm text-slate-500 mt-1">
                                                        Efficiency Rating
                                                    </div>
                                                </div>
                                                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                    <div className="text-2xl font-bold text-slate-900">
                                                        {detailsQuote.hotWater}
                                                    </div>
                                                    <div className="text-sm text-slate-500 mt-1">
                                                        Hot Water Flow
                                                    </div>
                                                </div>
                                                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                    <div className="text-2xl font-bold text-slate-900">
                                                        {detailsQuote.weight}
                                                    </div>
                                                    <div className="text-sm text-slate-500 mt-1">
                                                        Weight
                                                    </div>
                                                </div>
                                                {expandedSpecs && (
                                                    <>
                                                        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                            <div className="text-2xl font-bold text-slate-900">
                                                                {
                                                                    detailsQuote.dimensions
                                                                }
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-1">
                                                                Dimensions
                                                            </div>
                                                        </div>
                                                        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                            <div className="text-2xl font-bold text-slate-900">
                                                                A
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-1">
                                                                Energy Rating
                                                            </div>
                                                        </div>
                                                        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                                            <div className="text-2xl font-bold text-slate-900">
                                                                ≤ 40dB
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-1">
                                                                Noise Level
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Price Card */}
                                        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                                            <div className="relative z-10">
                                                <h2 className="text-2xl font-bold mb-6">
                                                    Package Summary
                                                </h2>

                                                <div className="space-y-4 mb-8">
                                                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                                        <div className="text-sm opacity-80">
                                                            Boiler Unit
                                                        </div>
                                                        <div className="font-semibold">
                                                            £
                                                            {(
                                                                detailsQuote.price *
                                                                0.7
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                                        <div className="text-sm opacity-80">
                                                            Professional
                                                            Installation
                                                        </div>
                                                        <div className="font-semibold">
                                                            £
                                                            {(
                                                                detailsQuote.price *
                                                                0.2
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                                        <div className="text-sm opacity-80">
                                                            Smart Controls &
                                                            Accessories
                                                        </div>
                                                        <div className="text-emerald-300">
                                                            Included
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                                        <div className="text-sm opacity-80">
                                                            Warranty (
                                                            {
                                                                detailsQuote.warranty.split(
                                                                    "·"
                                                                )[0]
                                                            }
                                                            )
                                                        </div>
                                                        <div className="text-emerald-300">
                                                            Included
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <div className="text-sm opacity-80">
                                                            Total Package Price
                                                        </div>
                                                        <div className="text-5xl font-bold tracking-tight mt-2">
                                                            £
                                                            {detailsQuote.price.toLocaleString()}
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <div className="text-sm line-through opacity-60">
                                                                £
                                                                {detailsQuote.oldPrice.toLocaleString()}
                                                            </div>
                                                            <div className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-sm font-semibold">
                                                                Save £
                                                                {detailsQuote.oldPrice -
                                                                    detailsQuote.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm opacity-80">
                                                            Monthly from
                                                        </div>
                                                        <div className="text-3xl font-bold">
                                                            £
                                                            {
                                                                detailsQuote.monthly
                                                            }
                                                        </div>
                                                        <div className="text-xs opacity-60 mt-1">
                                                            0% APR available
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Power Selection */}
                                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border border-slate-100">
                                            <h3 className="text-lg font-bold text-slate-900 mb-4">
                                                Select Boiler Power
                                            </h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg">
                                                    25kW
                                                    <div className="text-sm font-normal opacity-90 mt-1">
                                                        Recommended
                                                    </div>
                                                </button>
                                                <button className="py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 font-bold transition-all group">
                                                    30kW
                                                    <div className="text-sm font-normal text-slate-500 mt-1 group-hover:text-emerald-600">
                                                        +£100
                                                    </div>
                                                </button>
                                                <button className="py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 font-bold transition-all group">
                                                    35kW
                                                    <div className="text-sm font-normal text-slate-500 mt-1 group-hover:text-emerald-600">
                                                        +£200
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-4">
                                            <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-5 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3">
                                                <FiCalendar />
                                                Book Installation Date
                                            </button>

                                            <button className="w-full rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                                                <FiTag />
                                                Request Final Quote
                                            </button>

                                            <div className="text-center">
                                                <button className="text-emerald-600 font-semibold inline-flex items-center gap-2 hover:text-emerald-700">
                                                    <FiClock />
                                                    Schedule Callback
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </>
            )}

            {powerModal && (
                <>
                    {/* Overlay with enhanced blur */}
                    <div
                        onClick={() => setPowerModal(null)}
                        className="fixed inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/40 backdrop-blur-lg z-40 animate-fadeIn"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4">
                            <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-white to-slate-50 shadow-[0_40px_200px_rgba(0,0,0,0.3)] overflow-hidden animate-modalSlideUp flex flex-col">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" />
                                <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100/50 to-cyan-100/30 blur-xl" />
                                <div className="absolute bottom-6 right-6 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/20 blur-xl" />

                                {/* Header */}
                                <div className="relative px-8 pt-8 pb-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-100 mb-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-sm font-medium text-emerald-700">
                                                    Power Selection
                                                </span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                Choose Your{" "}
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">
                                                    Boiler Power
                                                </span>
                                            </h2>
                                            <p className="text-slate-600 mt-2 max-w-md">
                                                Select the optimal output for
                                                your home's needs and future
                                                plans
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setPowerModal(null)}
                                            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-slate-300 hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                        >
                                            <FiX className="text-slate-600" />
                                        </button>
                                    </div>

                                    {/* Current Selection Preview */}
                                    <div className="mt-8 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white to-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                                                {/* <TbFlame className="text-emerald-600 text-2xl" /> */}
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500">
                                                    Selected Boiler
                                                </div>
                                                <div className="font-bold text-slate-900">
                                                    {powerModal.brand}
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    {powerModal.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-slate-500">
                                                Current Power
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {selectedPower}kW
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex-1 overflow-y-auto px-8 py-4">
                                    {/* Power Selection Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* 25kW Option */}
                                        <div
                                            onClick={() =>
                                                setSelectedPower("25")
                                            }
                                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden
                                ${
                                    selectedPower === "25"
                                        ? "border-emerald-500 bg-gradient-to-br from-emerald-50/50 to-white shadow-lg shadow-emerald-100/50"
                                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                                }`}
                                        >
                                            {/* Recommended Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold shadow-sm">
                                                    Recommended ✓
                                                </div>
                                            </div>

                                            {/* Animated Selection Indicator */}
                                            {selectedPower === "25" && (
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
                                            )}

                                            {/* Content */}
                                            <div className="mb-4">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-4xl font-bold text-slate-900">
                                                        25
                                                    </span>
                                                    <span className="text-xl font-semibold text-slate-600">
                                                        kW
                                                    </span>
                                                </div>
                                                <div className="text-sm text-emerald-600 font-medium mt-2">
                                                    <FiCheck className="inline mr-1" />
                                                    Perfect for your current
                                                    needs
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span>
                                                        Ideal for 1-2 bathrooms
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span>
                                                        Medium-sized homes (2-3
                                                        bedrooms)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span>
                                                        Standard insulation
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-6 pt-6 border-t border-slate-100">
                                                <div className="text-sm text-slate-500">
                                                    Fixed Price
                                                </div>
                                                <div className="text-2xl font-bold text-slate-900">
                                                    £
                                                    {powerModal.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 30kW Option */}
                                        <div
                                            onClick={() =>
                                                setSelectedPower("30")
                                            }
                                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden
                                ${
                                    selectedPower === "30"
                                        ? "border-indigo-500 bg-gradient-to-br from-indigo-50/30 to-white shadow-lg shadow-indigo-100/50"
                                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                                }`}
                                        >
                                            {/* Future-Proof Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-sm">
                                                    Future-Proof
                                                </div>
                                            </div>

                                            {selectedPower === "30" && (
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse" />
                                            )}

                                            <div className="mb-4">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-4xl font-bold text-slate-900">
                                                        30
                                                    </span>
                                                    <span className="text-xl font-semibold text-slate-600">
                                                        kW
                                                    </span>
                                                    <span className="ml-2 px-2 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-bold">
                                                        +£100
                                                    </span>
                                                </div>
                                                <div className="text-sm text-indigo-600 font-medium mt-2">
                                                    <FiInfo className="inline mr-1" />
                                                    Extra capacity for future
                                                    needs
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                                    <span>
                                                        Perfect for 2-3+
                                                        bathrooms
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                                    <span>
                                                        Larger homes (4+
                                                        bedrooms)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                                    <span>
                                                        Home extensions planned
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-6 pt-6 border-t border-slate-100">
                                                <div className="text-sm text-slate-500">
                                                    Fixed Price
                                                </div>
                                                <div className="flex items-baseline gap-2">
                                                    <div className="text-2xl font-bold text-slate-900">
                                                        £
                                                        {(
                                                            powerModal.price +
                                                            100
                                                        ).toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-slate-400 line-through">
                                                        +£100
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Comparison Info */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
                                            <div className="text-xs text-slate-500 mb-1">
                                                Hot Water Flow
                                            </div>
                                            <div className="text-lg font-bold text-slate-900">
                                                {selectedPower === "25"
                                                    ? "9.8"
                                                    : "10.5"}{" "}
                                                L/min
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
                                            <div className="text-xs text-slate-500 mb-1">
                                                Heating Capacity
                                            </div>
                                            <div className="text-lg font-bold text-slate-900">
                                                Up to{" "}
                                                {selectedPower === "25"
                                                    ? "120"
                                                    : "150"}{" "}
                                                m²
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
                                            <div className="text-xs text-slate-500 mb-1">
                                                Annual Running Cost
                                            </div>
                                            <div className="text-lg font-bold text-slate-900">
                                                ~£
                                                {selectedPower === "25"
                                                    ? "680"
                                                    : "720"}
                                                /year
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expert Recommendation */}
                                    <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100 p-5">
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                                                    <FiInfo className="text-blue-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-blue-900">
                                                    Expert Suggestion
                                                </div>
                                                <p className="text-sm text-blue-800 mt-1">
                                                    Based on your survey
                                                    answers, the <b>25kW</b>{" "}
                                                    model is optimal for your
                                                    current setup. Choose 30kW
                                                    if you plan to add
                                                    bathrooms, extend your home,
                                                    or want faster hot water
                                                    delivery.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer with Action */}
                                <div className="border-t border-slate-100 px-8 py-6 bg-white/50 backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-center sm:text-left">
                                            <div className="text-sm text-slate-500">
                                                Total for {selectedPower}kW
                                                boiler
                                            </div>
                                            <div className="text-3xl font-bold text-slate-900">
                                                £
                                                {selectedPower === "25"
                                                    ? powerModal.price.toLocaleString()
                                                    : (
                                                          powerModal.price + 100
                                                      ).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-slate-600 mt-1">
                                                Monthly from £
                                                {selectedPower === "25"
                                                    ? powerModal.monthly
                                                    : (
                                                          parseFloat(
                                                              powerModal.monthly
                                                          ) + 5.56
                                                      ).toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                            <button className="px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 font-medium hover:bg-slate-50 transition-colors">
                                                Need Advice?
                                            </button>
                                            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                                                Confirm {selectedPower}kW
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center text-sm text-slate-500 mt-4">
                                        Includes installation, all parts, and
                                        10-year warranty
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
