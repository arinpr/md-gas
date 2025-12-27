import { useEffect, useState } from "react";
import {
    FiInfo,
    FiX,
    FiChevronRight,
    FiShield,
    FiThermometer,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiZap,
    FiHome,
    FiDroplet,
    FiCheckCircle,
    FiMessageCircle,
    FiThumbsUp,
    FiActivity,
    FiCheck,
    FiDownload,
    FiHash,
    FiTruck,
    FiCamera,
    FiChevronLeft,
    FiCpu,
    FiTrendingUp,
    FiCreditCard,
    FiMessageSquare,
    FiEye,
    FiVolume2,
    FiMinus,
    FiPlus,
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

    // Carousel state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoRotate, setAutoRotate] = useState(false);

    // Carousel images array - replace with your actual images
    const carouselImages = detailsQuote
        ? [
              boilerImages[detailsQuote.id],
              "/images/ideal-20logic.png",
              "/images/ideal-20logic.png",
          ]
        : [];

    const imageViews = [
        "Front View • Technical Grade",
        "Side View • Component Layout",
        "Back View • Connection Points",
    ];

    // Power selection state
    // const [selectedPower, setSelectedPower] = useState("25");

    // Power options data
    const powerOptions = detailsQuote
        ? [
              {
                  power: "25kW",
                  price: detailsQuote.price,
                  selected: selectedPower === "25",
                  efficiency: "95%",
              },
              {
                  power: "30kW",
                  price: detailsQuote.price + 100,
                  selected: selectedPower === "30",
                  efficiency: "93%",
              },
              {
                  power: "35kW",
                  price: detailsQuote.price + 200,
                  selected: selectedPower === "35",
                  efficiency: "90%",
              },
          ]
        : [];

    // System load calculation
    const systemLoad = selectedPower === "25" ? 60 : 45;

    // Specifications data
    const specs = detailsQuote
        ? [
              {
                  label: "Efficiency",
                  value: detailsQuote.efficiency,
                  icon: FiActivity,
                  gradient: "from-emerald-500/20 to-emerald-600/10",
              },
              {
                  label: "Hot Water Flow",
                  value: detailsQuote.hotWater,
                  icon: FiDroplet,
                  gradient: "from-cyan-500/20 to-blue-500/10",
              },
              {
                  label: "Noise Level",
                  value: "≤ 40dB",
                  icon: FiVolume2,
                  gradient: "from-violet-500/20 to-purple-500/10",
              },
              {
                  label: "Energy Rating",
                  value: "A",
                  icon: FiTrendingUp,
                  gradient: "from-amber-500/20 to-orange-500/10",
              },
          ]
        : [];

    const additionalSpecs = detailsQuote
        ? [
              { label: "Max Pressure", value: "3.0 bar" },
              { label: "Flow Rate", value: "9.8 L/min" },
              {
                  label: "Warranty",
                  value: detailsQuote.warranty.split("·")[0] + " Years",
              },
              { label: "Certification", value: "UKCA Approved" },
          ]
        : [];

    const costBreakdown = detailsQuote
        ? [
              {
                  label: "Boiler Unit",
                  cost: detailsQuote.price * 0.7,
                  color: "bg-emerald-500",
                  width: "70%",
                  percentage: "70%",
                  included: false,
              },
              {
                  label: "Professional Installation",
                  cost: detailsQuote.price * 0.2,
                  color: "bg-cyan-500",
                  width: "20%",
                  percentage: "20%",
                  included: false,
              },
              {
                  label: "Smart Controls",
                  cost: 0,
                  color: "bg-blue-500",
                  width: "0%",
                  percentage: "0%",
                  included: true,
              },
              {
                  label: "Extended Warranty",
                  cost: 0,
                  color: "bg-violet-500",
                  width: "0%",
                  percentage: "0%",
                  included: true,
              },
          ]
        : [];

    // Carousel navigation functions
    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
        );
    };

    const handlePowerSelect = (power) => {
        setSelectedPower(power);
    };

    // Auto-rotate effect
    useEffect(() => {
        let interval;
        if (autoRotate) {
            interval = setInterval(() => {
                handleNextImage();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [autoRotate, currentImageIndex]);

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
                                    className="h-5 w-5 rounded-full cursor-pointer flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
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

            {detailsQuote && (
                <>
                    {/* Overlay with animated circuit pattern */}
                    <div
                        onClick={() => setDetailsQuote(null)}
                        className="fixed inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/70 z-40"
                    >
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>

                    {/* Main sidebar - Futuristic control panel design */}
                    <aside className="fixed right-0 top-0 h-full w-full overflow-y-auto lg:w-[1000px] bg-gradient-to-b from-slate-900 to-slate-800 z-50 border-l border-slate-700/50 shadow-2xl shadow-black/50">
                        <div className="h-full flex flex-col">
                            {/* Header - Holographic UI */}
                            <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50">
                                <div className="relative px-8 py-5">
                                    {/* Circuit line effect */}
                                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

                                    <div className="relative flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            {/* Holographic badge */}
                                            <div className="relative group">
                                                <div
                                                    className={`relative px-4 py-2.5 rounded-lg font-bold text-white ${detailsQuote.badge} overflow-hidden`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-shimmer" />
                                                    <div className="relative flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                        <span className="text-shadow-lg">
                                                            {detailsQuote.tier}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Holographic glow */}
                                                <div className="absolute -inset-2 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <div>
                                                <h1 className="text-2xl font-bold text-white tracking-tight">
                                                    {detailsQuote.name}
                                                </h1>
                                                <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <FiHash className="text-emerald-400" />
                                                        {detailsQuote.id}
                                                    </span>
                                                    <span className="text-slate-600">
                                                        •
                                                    </span>
                                                    <span className="text-emerald-400">
                                                        ACTIVE CONFIGURATION
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Holographic button */}
                                            <button className="relative px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-emerald-500/50 text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2 group">
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <FiDownload className="relative z-10" />
                                                <span className="relative z-10">
                                                    Export Specs
                                                </span>
                                            </button>

                                            {/* Close button with particle effect */}
                                            <button
                                                onClick={() =>
                                                    setDetailsQuote(null)
                                                }
                                                className="relative h-12 w-12 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-red-400/50 hover:bg-slate-800/80 flex items-center justify-center transition-all group"
                                            >
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-red-500/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-red-500/10 transition-all" />
                                                <FiX className="text-slate-400 group-hover:text-white transition-colors text-lg relative z-10" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Body with split layout */}
                            <div className="flex-1 overflow-hidden">
                                <div className="flex h-full">
                                    {/* Left Column - Sticky Carousel */}
                                    <div className="hidden lg:flex lg:w-[400px] sticky top-0">
                                        <div className="relative w-full p-6">
                                            {/* Carousel Container */}
                                            <div className="relative h-full rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/50 overflow-hidden">
                                                {/* Grid pattern background */}
                                                <div className="absolute inset-0 opacity-20">
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px),
                                                linear-gradient(to bottom, #334155 1px, transparent 1px)`,
                                                            backgroundSize:
                                                                "40px 40px",
                                                        }}
                                                    />
                                                </div>

                                                {/* Carousel header */}
                                                <div className="relative z-10 p-6 border-b border-slate-700/50">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                                <FiCamera className="text-emerald-400" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-white">
                                                                    Visual
                                                                    Overview
                                                                </h3>
                                                                <div className="text-sm text-slate-400">
                                                                    360°
                                                                    Inspection
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-slate-400">
                                                            {currentImageIndex +
                                                                1}
                                                            /
                                                            {
                                                                carouselImages.length
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Main carousel image */}
                                                <div className="relative p-8">
                                                    <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-slate-700/50 bg-gradient-to-br from-slate-900 to-black">
                                                        {/* Image with holographic effect */}
                                                        <img
                                                            src={
                                                                carouselImages[
                                                                    currentImageIndex
                                                                ]
                                                            }
                                                            alt={`${
                                                                detailsQuote.name
                                                            } - View ${
                                                                currentImageIndex +
                                                                1
                                                            }`}
                                                            className="w-full h-full object-contain p-6 transition-opacity duration-300"
                                                        />

                                                        {/* Holographic grid overlay */}
                                                        <div className="absolute inset-0 opacity-30">
                                                            <div
                                                                className="absolute inset-0"
                                                                style={{
                                                                    backgroundImage: `linear-gradient(90deg, transparent 24px, rgba(6, 182, 212, 0.1) 25px, transparent 26px),
                                                        linear-gradient(0deg, transparent 24px, rgba(6, 182, 212, 0.1) 25px, transparent 26px)`,
                                                                    backgroundSize:
                                                                        "50px 50px",
                                                                }}
                                                            />
                                                        </div>

                                                        {/* View indicator */}
                                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-emerald-400/50 flex items-center justify-center">
                                                            <div className="w-4 h-4 rounded-full border-2 border-emerald-400 animate-ping" />
                                                        </div>

                                                        {/* Zoom controls */}
                                                        <div className="absolute top-4 left-4 flex gap-2">
                                                            <button className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all">
                                                                <FiPlus className="text-slate-400 hover:text-white text-sm" />
                                                            </button>
                                                            <button className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all">
                                                                <FiMinus className="text-slate-400 hover:text-white text-sm" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Image details */}
                                                    <div className="mt-4 text-center">
                                                        <div className="text-sm text-slate-400 mb-2">
                                                            {
                                                                imageViews[
                                                                    currentImageIndex
                                                                ]
                                                            }
                                                        </div>
                                                        <div className="text-xs text-emerald-400">
                                                            Enhanced Detail •
                                                            Zoom Available
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Thumbnail strip */}
                                                <div className="relative z-10 p-6 border-t border-slate-700/50">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {carouselImages.map(
                                                            (img, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() =>
                                                                        setCurrentImageIndex(
                                                                            index
                                                                        )
                                                                    }
                                                                    className={`aspect-square rounded-lg border-2 ${
                                                                        currentImageIndex ===
                                                                        index
                                                                            ? "border-emerald-500/50 bg-emerald-500/10"
                                                                            : "border-slate-700 hover:border-emerald-500/50 bg-gradient-to-br from-slate-800 to-slate-900"
                                                                    } overflow-hidden relative group transition-all`}
                                                                >
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all" />
                                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                                        <img
                                                                            src={
                                                                                img
                                                                            }
                                                                            alt={`Thumbnail ${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={`absolute bottom-1 right-1 text-xs ${
                                                                            currentImageIndex ===
                                                                            index
                                                                                ? "text-emerald-400"
                                                                                : "text-slate-500 group-hover:text-emerald-400"
                                                                        } transition-colors`}
                                                                    >
                                                                        {index +
                                                                            1}
                                                                    </div>
                                                                    {currentImageIndex ===
                                                                        index && (
                                                                        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                                    )}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Carousel controls */}
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                                                    <button
                                                        onClick={() =>
                                                            handlePrevImage()
                                                        }
                                                        className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all group"
                                                    >
                                                        <FiChevronLeft className="text-slate-400 group-hover:text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setAutoRotate(
                                                                !autoRotate
                                                            )
                                                        }
                                                        className={`px-4 py-2 rounded-lg border ${
                                                            autoRotate
                                                                ? "bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 border-emerald-500/50 text-emerald-400"
                                                                : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400"
                                                        } text-sm font-medium transition-all`}
                                                    >
                                                        {autoRotate
                                                            ? "Stop Auto"
                                                            : "Auto Rotate"}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleNextImage()
                                                        }
                                                        className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all group"
                                                    >
                                                        <FiChevronRight className="text-slate-400 group-hover:text-white" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Quick specs in carousel panel */}
                                            <div className="mt-6 grid grid-cols-2 gap-3">
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/50">
                                                    <div className="text-xs text-slate-400 mb-2">
                                                        Dimensions
                                                    </div>
                                                    <div className="text-lg font-bold text-white">
                                                        {
                                                            detailsQuote.dimensions
                                                        }
                                                    </div>
                                                </div>
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/50">
                                                    <div className="text-xs text-slate-400 mb-2">
                                                        Weight
                                                    </div>
                                                    <div className="text-lg font-bold text-white">
                                                        {detailsQuote.weight}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Configuration Panel */}
                                    <div className="flex-1 overflow-y-auto">
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Technical Specifications Panel */}
                                                <div className="lg:col-span-2">
                                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl border border-slate-700/50 p-6">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                                <FiCpu className="text-emerald-400 text-xl" />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-xl font-bold text-white">
                                                                    Technical
                                                                    Specifications
                                                                </h2>
                                                                <div className="text-sm text-slate-400">
                                                                    Complete
                                                                    system
                                                                    analysis
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Specs grid with holographic effect */}
                                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                            {specs.map(
                                                                (
                                                                    spec,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="relative group"
                                                                    >
                                                                        <div
                                                                            className={`bg-gradient-to-br ${spec.gradient} rounded-xl border border-slate-700/50 p-4 backdrop-blur-sm`}
                                                                        >
                                                                            <div className="flex items-center gap-3 mb-3">
                                                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                                                                    <spec.icon className="text-white/80" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-2xl font-bold text-white mb-1">
                                                                                {
                                                                                    spec.value
                                                                                }
                                                                            </div>
                                                                            <div className="text-sm text-slate-400">
                                                                                {
                                                                                    spec.label
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {/* Hover effect */}
                                                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>

                                                        {/* Expanded specs toggle */}
                                                        {expandedSpecs && (
                                                            <div className="mt-6 pt-6 border-t border-slate-700/50">
                                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                                    {additionalSpecs.map(
                                                                        (
                                                                            spec,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="p-3 rounded-lg bg-slate-900/30 border border-slate-700/30"
                                                                            >
                                                                                <div className="text-xs text-slate-400 mb-1">
                                                                                    {
                                                                                        spec.label
                                                                                    }
                                                                                </div>
                                                                                <div className="text-lg font-semibold text-white">
                                                                                    {
                                                                                        spec.value
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <button
                                                            onClick={() =>
                                                                setExpandedSpecs(
                                                                    !expandedSpecs
                                                                )
                                                            }
                                                            className="mt-6 w-full py-3 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                                                        >
                                                            {expandedSpecs
                                                                ? "Show Less Details"
                                                                : "Show Full Technical Specifications"}
                                                            {expandedSpecs ? (
                                                                <FiChevronUp />
                                                            ) : (
                                                                <FiChevronDown />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Investment Breakdown - Holographic display */}
                                                <div className="lg:col-span-2">
                                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl border border-slate-700/50 p-6 overflow-hidden">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                                                                <FiCreditCard className="text-amber-400 text-xl" />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-xl font-bold text-white">
                                                                    Investment
                                                                    Analysis
                                                                </h2>
                                                                <div className="text-sm text-slate-400">
                                                                    Complete
                                                                    financial
                                                                    breakdown
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Cost breakdown with visual bars */}
                                                        <div className="space-y-4 mb-8">
                                                            {costBreakdown.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="relative group"
                                                                    >
                                                                        <div className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                                                                    <div
                                                                                        className={`w-2 h-2 rounded-full ${
                                                                                            item.included
                                                                                                ? "bg-emerald-400"
                                                                                                : "bg-amber-400"
                                                                                        }`}
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-medium text-white">
                                                                                        {
                                                                                            item.label
                                                                                        }
                                                                                    </div>
                                                                                    <div className="text-xs text-slate-400">
                                                                                        {!item.included &&
                                                                                            "Equipment & Labor"}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                {item.included ? (
                                                                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                                                                                        INCLUDED
                                                                                    </span>
                                                                                ) : (
                                                                                    <>
                                                                                        <div className="font-bold text-white">
                                                                                            £
                                                                                            {item.cost.toLocaleString()}
                                                                                        </div>
                                                                                        <div className="text-xs text-slate-400">
                                                                                            {
                                                                                                item.percentage
                                                                                            }{" "}
                                                                                            of
                                                                                            total
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        {/* Visual bar */}
                                                                        {!item.included && (
                                                                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-slate-800/50 rounded-full overflow-hidden">
                                                                                <div
                                                                                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                                                                    style={{
                                                                                        width: item.width,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>

                                                        {/* Total display with glowing effect */}
                                                        <div className="relative p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-black/30 border border-slate-700/50">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50" />

                                                            <div className="relative flex justify-between items-center">
                                                                <div>
                                                                    <div className="text-sm text-slate-400">
                                                                        Total
                                                                        Package
                                                                    </div>
                                                                    <div className="flex items-baseline gap-2 mt-2">
                                                                        <div className="text-4xl font-bold text-white">
                                                                            £
                                                                            {detailsQuote.price.toLocaleString()}
                                                                        </div>
                                                                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 text-sm">
                                                                            SAVE
                                                                            £
                                                                            {detailsQuote.oldPrice -
                                                                                detailsQuote.price}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-sm text-slate-400 mt-2 line-through">
                                                                        Was £
                                                                        {detailsQuote.oldPrice.toLocaleString()}
                                                                    </div>
                                                                </div>

                                                                <div className="text-right">
                                                                    <div className="text-sm text-slate-400">
                                                                        Monthly
                                                                    </div>
                                                                    <div className="text-3xl font-bold text-white mt-2">
                                                                        £
                                                                        {
                                                                            detailsQuote.monthly
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-emerald-400 mt-1">
                                                                        0% APR •
                                                                        10 Years
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Power Selection - Interactive panel */}
                                                <div className="lg:col-span-2">
                                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl border border-slate-700/50 p-6">
                                                        <div className="flex items-center justify-between mb-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                                                                    <FiZap className="text-purple-400 text-xl" />
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-xl font-bold text-white">
                                                                        Power
                                                                        Configuration
                                                                    </h2>
                                                                    <div className="text-sm text-slate-400">
                                                                        Select
                                                                        optimal
                                                                        output
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-sm text-slate-400">
                                                                    Current
                                                                </div>
                                                                <div className="text-2xl font-bold text-emerald-400">
                                                                    {
                                                                        selectedPower
                                                                    }
                                                                    kW
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Power options with unique slider */}
                                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                                            {powerOptions.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => (
                                                                    <button
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() =>
                                                                            handlePowerSelect(
                                                                                option.power
                                                                            )
                                                                        }
                                                                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                                                            option.selected
                                                                                ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5"
                                                                                : "border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/30"
                                                                        }`}
                                                                    >
                                                                        <div className="text-center">
                                                                            <div className="text-2xl font-bold text-white mb-2">
                                                                                {
                                                                                    option.power
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                                                                                    option.selected
                                                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                                                        : "bg-slate-800/50 text-slate-400"
                                                                                }`}
                                                                            >
                                                                                {option.selected
                                                                                    ? "RECOMMENDED"
                                                                                    : `+£${
                                                                                          option.price -
                                                                                          detailsQuote.price
                                                                                      }`}
                                                                            </div>
                                                                            <div className="text-xs text-slate-400 mt-3">
                                                                                Efficiency:{" "}
                                                                                <span className="text-emerald-400">
                                                                                    {
                                                                                        option.efficiency
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                        {option.selected && (
                                                                            <>
                                                                                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                                                                    <FiCheck className="text-white text-xs" />
                                                                                </div>
                                                                                <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/30" />
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>

                                                        {/* System Load Visualization */}
                                                        <div className="pt-6 border-t border-slate-700/50">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div>
                                                                    <div className="text-sm font-medium text-white">
                                                                        System
                                                                        Load
                                                                        Analysis
                                                                    </div>
                                                                    <div className="text-xs text-slate-400">
                                                                        Optimal
                                                                        at
                                                                        60-70%
                                                                        capacity
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-sm text-slate-400">
                                                                        Current
                                                                        Load
                                                                    </div>
                                                                    <div className="text-2xl font-bold text-emerald-400">
                                                                        {
                                                                            systemLoad
                                                                        }
                                                                        %
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Interactive load meter */}
                                                            <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden mb-2">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-cyan-500/20" />
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full relative transition-all duration-700"
                                                                    style={{
                                                                        width: `${systemLoad}%`,
                                                                    }}
                                                                >
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                                                </div>
                                                                {/* Load markers */}
                                                                <div className="absolute left-1/4 w-px h-3 bg-amber-400/50" />
                                                                <div className="absolute left-2/4 w-px h-3 bg-emerald-400/50" />
                                                                <div className="absolute left-3/4 w-px h-3 bg-red-400/50" />
                                                            </div>

                                                            <div className="flex justify-between text-xs text-slate-400">
                                                                <span>
                                                                    Idle
                                                                </span>
                                                                <span className="text-emerald-400">
                                                                    Optimal
                                                                </span>
                                                                <span>Max</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons - Futuristic panel */}
                                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                <button className="relative group p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-400/50 transition-all">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="relative flex items-center justify-center gap-3">
                                                        <FiCalendar className="text-emerald-400 text-xl" />
                                                        <div className="text-left">
                                                            <div className="font-bold text-white">
                                                                Book
                                                                Installation
                                                            </div>
                                                            <div className="text-sm text-emerald-400">
                                                                Schedule
                                                                installation
                                                                date
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>

                                                <button className="relative group p-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="relative flex items-center justify-center gap-3">
                                                        <FiMessageSquare className="text-cyan-400 text-xl" />
                                                        <div className="text-left">
                                                            <div className="font-bold text-white">
                                                                Live Chat
                                                            </div>
                                                            <div className="text-sm text-cyan-400">
                                                                Talk to our
                                                                experts
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>

                                                <button className="relative group p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 hover:border-purple-400/50 transition-all">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="relative flex items-center justify-center gap-3">
                                                        <FiDownload className="text-purple-400 text-xl" />
                                                        <div className="text-left">
                                                            <div className="font-bold text-white">
                                                                Download Quote
                                                            </div>
                                                            <div className="text-sm text-purple-400">
                                                                PDF with all
                                                                details
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Status bar */}
                            <div className="border-t border-slate-700/50 bg-slate-900/50 px-8 py-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <span className="flex items-center gap-2">
                                            <FiShield className="text-emerald-400" />
                                            {detailsQuote.warranty}
                                        </span>
                                        <span className="text-slate-600">
                                            •
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FiTruck className="text-cyan-400" />
                                            Next Day Delivery
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            Configuration Ready
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all">
                                            Finalize Selection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </>
            )}

            {powerModal && (
                <>
                    {/* Simple overlay - allows scrolling */}
                    <div
                        onClick={() => setPowerModal(null)}
                        className="fixed inset-0 bg-black/20 z-40"
                    />

                    {/* Scrollable modal container */}
                    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
                        <div className="relative w-full max-w-4xl my-8">
                            {/* Main modal with architectural lines */}
                            <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden border border-slate-200">
                                {/* Header */}
                                <div className="sticky top-0 z-10 px-10 pt-8 pb-6 bg-white border-b border-slate-100">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="relative">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                                        <FiZap className="text-white text-lg" />
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                                                        Power Configuration
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-slate-900">
                                                        Select Boiler Output
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setPowerModal(null)}
                                            className="h-10 w-10 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center transition-all hover:scale-110 group"
                                        >
                                            <FiX className="text-slate-500 group-hover:text-slate-700 transition-colors" />
                                        </button>
                                    </div>
                                </div>

                                {/* Scrollable content */}
                                <div className="">
                                    <div className="p-8">
                                        {/* Current selection */}
                                        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="text-sm text-slate-500">
                                                        Selected Boiler
                                                    </div>
                                                    <div className="font-bold text-slate-900 text-lg">
                                                        {powerModal.brand}
                                                    </div>
                                                    <div className="text-slate-600">
                                                        {powerModal.name}
                                                    </div>
                                                </div>
                                                <div className="text-center md:text-right">
                                                    <div className="text-sm text-slate-500">
                                                        Current Selection
                                                    </div>
                                                    <div className="text-3xl font-bold text-emerald-600">
                                                        {selectedPower}kW
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Power toggle */}
                                        <div className="text-center mb-10">
                                            <div className="inline-flex items-center gap-8 px-8 py-3 bg-slate-50 rounded-full border border-slate-100">
                                                <div
                                                    className={`text-lg font-bold transition-all ${
                                                        selectedPower === "25"
                                                            ? "text-emerald-600"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    25kW
                                                </div>

                                                {/* Unique toggle switch */}
                                                <button
                                                    onClick={() =>
                                                        setSelectedPower(
                                                            (prev) =>
                                                                prev === "25"
                                                                    ? "30"
                                                                    : "25"
                                                        )
                                                    }
                                                    className="relative w-16 h-8"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full" />
                                                    <div
                                                        className={`absolute top-0.5 w-7 h-7 rounded-full bg-white shadow-lg transition-all duration-300 ${
                                                            selectedPower ===
                                                            "25"
                                                                ? "left-0.5"
                                                                : "left-8"
                                                        }`}
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div
                                                                className={`w-4 h-4 rounded-full transition-all ${
                                                                    selectedPower ===
                                                                    "25"
                                                                        ? "bg-emerald-500"
                                                                        : "bg-slate-700"
                                                                }`}
                                                            />
                                                        </div>
                                                    </div>
                                                </button>

                                                <div
                                                    className={`text-lg font-bold transition-all ${
                                                        selectedPower === "30"
                                                            ? "text-slate-900"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    30kW
                                                </div>
                                            </div>

                                            <div className="mt-4 text-sm text-slate-500">
                                                Toggle between standard and
                                                premium power
                                            </div>
                                        </div>

                                        {/* Power options with system load */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                                            {/* 25kW Option */}
                                            <div
                                                className={`relative transition-all duration-300 ${
                                                    selectedPower === "25"
                                                        ? "opacity-100"
                                                        : "opacity-60"
                                                }`}
                                            >
                                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-slate-300 rounded-tl-lg" />
                                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-slate-300 rounded-br-lg" />

                                                <div className="bg-white rounded-xl border-2 border-slate-100 p-6 h-full">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div>
                                                            <div className="text-3xl font-bold text-slate-900">
                                                                25kW
                                                            </div>
                                                            <div className="text-sm text-slate-500">
                                                                Standard Power
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                                                                selectedPower ===
                                                                "25"
                                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                                    : "bg-slate-50 text-slate-600 border border-slate-100"
                                                            }`}
                                                        >
                                                            £
                                                            {powerModal.price.toLocaleString()}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                                <FiHome className="text-emerald-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    2-3 Bedrooms
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Medium sized
                                                                    homes
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                                <FiDroplet className="text-emerald-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    1-2
                                                                    Bathrooms
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Simultaneous
                                                                    use
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                                <FiThermometer className="text-emerald-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    Standard
                                                                    Insulation
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Normal heat
                                                                    retention
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-slate-100">
                                                        <div className="text-xs text-slate-500 mb-2">
                                                            Annual Running Cost
                                                        </div>
                                                        <div className="text-xl font-bold text-slate-900">
                                                            ~£680/year
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* System Load Component - Centered */}
                                            <div className="flex flex-col items-center justify-center lg:col-span-1">
                                                <div className="relative bg-white rounded-xl border-2 border-slate-100 p-6 w-full max-w-xs">
                                                    <div className="text-center mb-6">
                                                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                                                            System Load Level
                                                        </div>
                                                        <div className="text-2xl font-bold text-slate-900">
                                                            {selectedPower ===
                                                            "25"
                                                                ? "60%"
                                                                : "45%"}
                                                        </div>
                                                    </div>

                                                    {/* System Load Bar */}
                                                    <div className="relative w-full flex flex-col items-center">
                                                        <div className="relative w-16 h-[200px] rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                                                            {/* Fill */}
                                                            <div
                                                                className={`absolute bottom-0 left-0 right-0 transition-all duration-700
                                                        ${
                                                            selectedPower ===
                                                            "25"
                                                                ? "h-[60%] bg-gradient-to-t from-emerald-500 to-emerald-400"
                                                                : "h-[45%] bg-gradient-to-t from-slate-700 to-slate-600"
                                                        }
                                                    `}
                                                            />

                                                            {/* Gradient overlay for depth */}
                                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                                                            {/* Scale markers */}
                                                            <div className="absolute inset-0 flex flex-col justify-between py-4 text-[10px] text-slate-400">
                                                                {[
                                                                    "HIGH",
                                                                    "NORMAL",
                                                                    "LOW",
                                                                ].map(
                                                                    (
                                                                        label,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                label
                                                                            }
                                                                            className="flex items-center gap-2 px-1"
                                                                        >
                                                                            <div className="flex-1 h-px bg-slate-300/70" />
                                                                            <span className="font-medium">
                                                                                {
                                                                                    label
                                                                                }
                                                                            </span>
                                                                            <div className="flex-1 h-px bg-slate-300/70" />
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>

                                                            {/* Current indicator line */}
                                                            <div
                                                                className={`absolute left-0 right-0 border-t-2 border-dashed transition-all duration-700
                                                        ${
                                                            selectedPower ===
                                                            "25"
                                                                ? "border-emerald-400/50 bottom-[60%]"
                                                                : "border-slate-500/50 bottom-[45%]"
                                                        }`}
                                                            />
                                                        </div>

                                                        {/* Efficiency indicator */}
                                                        <div className="mt-6 text-center">
                                                            <div className="text-sm text-slate-500 mb-1">
                                                                {selectedPower ===
                                                                "25"
                                                                    ? "Optimal Load"
                                                                    : "Efficient Load"}
                                                            </div>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div
                                                                    className={`w-3 h-3 rounded-full ${
                                                                        selectedPower ===
                                                                        "25"
                                                                            ? "bg-emerald-500"
                                                                            : "bg-slate-600"
                                                                    }`}
                                                                />
                                                                <span className="text-sm text-slate-700">
                                                                    {selectedPower ===
                                                                    "25"
                                                                        ? "Perfect for daily use"
                                                                        : "Excellent efficiency"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Technical info */}
                                                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                                                        <div className="text-xs text-slate-500">
                                                            Lower load = better
                                                            efficiency
                                                        </div>
                                                        <div className="text-sm text-slate-700 mt-1">
                                                            {selectedPower ===
                                                            "25"
                                                                ? "60% load ensures optimal performance"
                                                                : "45% load maximizes energy savings"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 30kW Option */}
                                            <div
                                                className={`relative transition-all duration-300 ${
                                                    selectedPower === "30"
                                                        ? "opacity-100"
                                                        : "opacity-60"
                                                }`}
                                            >
                                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-slate-300 rounded-tl-lg" />
                                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-slate-300 rounded-br-lg" />

                                                <div className="bg-white rounded-xl border-2 border-slate-100 p-6 h-full">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div>
                                                            <div className="text-3xl font-bold text-slate-900">
                                                                30kW
                                                            </div>
                                                            <div className="text-sm text-slate-500">
                                                                Premium Power
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                                                                selectedPower ===
                                                                "30"
                                                                    ? "bg-slate-900 text-white"
                                                                    : "bg-slate-50 text-slate-600 border border-slate-100"
                                                            }`}
                                                        >
                                                            £
                                                            {(
                                                                powerModal.price +
                                                                100
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                                                <FiHome className="text-white" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    4+ Bedrooms
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Large family
                                                                    homes
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                                                <FiDroplet className="text-white" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    2-3+
                                                                    Bathrooms
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Multiple
                                                                    simultaneous
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                                                <FiThermometer className="text-white" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-900">
                                                                    Future
                                                                    Expansion
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    Room
                                                                    additions
                                                                    planned
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-slate-100">
                                                        <div className="text-xs text-slate-500 mb-2">
                                                            Annual Running Cost
                                                        </div>
                                                        <div className="text-xl font-bold text-slate-900">
                                                            ~£720/year
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Performance comparison */}
                                        <div className="mb-10">
                                            <div className="text-center mb-6">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full">
                                                    <FiActivity className="text-emerald-600" />
                                                    <span className="font-medium text-slate-700">
                                                        Performance Comparison
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="bg-slate-50 rounded-xl p-5">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="text-sm font-medium text-slate-600">
                                                            Hot Water Flow
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-900">
                                                            {selectedPower ===
                                                            "25"
                                                                ? "9.8"
                                                                : "10.5"}{" "}
                                                            L/min
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                selectedPower ===
                                                                "25"
                                                                    ? "bg-emerald-500 w-3/4"
                                                                    : "bg-slate-900 w-5/6"
                                                            } transition-all duration-500`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-5">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="text-sm font-medium text-slate-600">
                                                            Heating Coverage
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-900">
                                                            Up to{" "}
                                                            {selectedPower ===
                                                            "25"
                                                                ? "120"
                                                                : "150"}{" "}
                                                            m²
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                selectedPower ===
                                                                "25"
                                                                    ? "bg-emerald-500 w-2/3"
                                                                    : "bg-slate-900 w-4/5"
                                                            } transition-all duration-500`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-5">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="text-sm font-medium text-slate-600">
                                                            Energy Efficiency
                                                        </div>
                                                        <div className="text-lg font-bold text-slate-900">
                                                            {selectedPower ===
                                                            "25"
                                                                ? "94%"
                                                                : "96%"}
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                selectedPower ===
                                                                "25"
                                                                    ? "bg-emerald-500 w-[94%]"
                                                                    : "bg-slate-900 w-[96%]"
                                                            } transition-all duration-500`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendation */}
                                        <div className="p-6 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                        <FiThumbsUp className="text-emerald-600 text-xl" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 mb-2">
                                                        Expert Recommendation
                                                    </div>
                                                    <p className="text-slate-700">
                                                        Based on your survey,
                                                        the{" "}
                                                        <span className="font-bold">
                                                            {selectedPower}kW
                                                        </span>{" "}
                                                        model is recommended.
                                                        {selectedPower === "25"
                                                            ? " It provides optimal efficiency for your current home setup."
                                                            : " It offers future-proof capacity for potential home extensions or additional bathrooms."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sticky footer with action buttons */}
                                <div className="sticky bottom-0 border-t border-slate-100 px-10 py-6 bg-white shadow-lg">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="text-center md:text-left">
                                            <div className="text-sm text-slate-500">
                                                Total Investment
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <div className="text-4xl font-bold text-slate-900">
                                                    £
                                                    {selectedPower === "25"
                                                        ? powerModal.price.toLocaleString()
                                                        : (
                                                              powerModal.price +
                                                              100
                                                          ).toLocaleString()}
                                                </div>
                                                <div className="text-slate-500">
                                                    or £
                                                    {selectedPower === "25"
                                                        ? powerModal.monthly
                                                        : (
                                                              parseFloat(
                                                                  powerModal.monthly
                                                              ) + 5.56
                                                          ).toFixed(2)}
                                                    /month
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button className="px-8 py-3.5 rounded-xl border-2 border-slate-200 hover:border-slate-300 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                                <FiMessageCircle />
                                                <span>Speak with Expert</span>
                                            </button>

                                            <button className="px-10 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                                <FiCheckCircle />
                                                <span>
                                                    Select {selectedPower}kW
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100">
                                        <div className="flex flex-wrap items-center justify-center gap-4">
                                            <span className="flex items-center gap-2">
                                                <FiCheck className="text-emerald-500" />
                                                Professional installation
                                                included
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FiCheck className="text-emerald-500" />
                                                10-year manufacturer warranty
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FiCheck className="text-emerald-500" />
                                                All parts & labor covered
                                            </span>
                                        </div>
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
