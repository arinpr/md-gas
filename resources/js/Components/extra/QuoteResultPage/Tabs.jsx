import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    FiCpu,
    FiInfo,
    FiCheckSquare,
    FiPackage,
    FiHelpCircle,
    FiStar,
    FiCheck,
    FiAlertCircle,
    FiCalendar,
    FiClock,
    FiUsers,
    FiShield,
} from "react-icons/fi";
import {
    HiOutlineArrowTurnUpLeft,
    HiOutlineArrowTurnUpRight,
} from "react-icons/hi2";
import FAQItem from "./FAQItem";

const tabs = [
    {
        id: "details",
        label: "Details",
        subtitle: "Product info",
        icon: FiInfo,
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-400",
    },
    {
        id: "whats-included",
        label: "What's Included",
        subtitle: "Package contents",
        icon: FiCheckSquare,
        color: "from-emerald-500/20 to-green-500/20",
        borderColor: "border-emerald-500/30",
        iconColor: "text-emerald-400",
    },
    {
        id: "extra",
        label: "Extra",
        subtitle: "Add-ons",
        icon: FiPackage,
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        iconColor: "text-purple-400",
    },
    {
        id: "faqs",
        label: "FAQs",
        subtitle: "Questions",
        icon: FiHelpCircle,
        color: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-500/30",
        iconColor: "text-amber-400",
    },
    {
        id: "reviews",
        label: "Reviews",
        subtitle: "Customer feedback",
        icon: FiStar,
        color: "from-rose-500/20 to-red-500/20",
        borderColor: "border-rose-500/30",
        iconColor: "text-rose-400",
    },
];

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState("details");
    const [isSticky, setIsSticky] = useState(false);
    const sectionRef = useRef(null);
    const tabRefs = useRef({});

    // Setup intersection observers for each tab section
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -80% 0px", // Adjusts when section becomes active
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all tab sections
        Object.values(tabRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    // Handle scroll for sticky tabs
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setIsSticky(rect.top <= 0 && rect.bottom > window.innerHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = useCallback(
        (tabId) => {
            const element = tabRefs.current[tabId];
            if (element) {
                const headerOffset = isSticky ? 80 : 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
                setActiveTab(tabId);
            }
        },
        [isSticky]
    );

    return (
        <div ref={sectionRef} className="relative">
            {/* Sticky Tabs Header */}
            <div
                className={`sticky z-40 transition-all duration-300 ${isSticky
                        ? "top-0 pt-4 pb-2 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl"
                        : "top-4"
                    }`}
            >
                {/* Glow effect under sticky header */}
                {isSticky && (
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-slate-900/90 to-transparent pointer-events-none" />
                )}

                {/* Tab Headers with Enhanced Design */}
                <div className="relative max-w-7xl mx-auto px-4">
                    {/* Tabs Container with Glass Effect */}
                    <div className="flex overflow-x-auto py-2 px-2 no-scrollbar bg-gradient- from-slate-900/5 via-slate-900/10 to-slate-900/5 backdrop-blur-2xl">
                        <div className="flex gap-3 mx-auto">
                            {tabs.map((tab, index) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => scrollToSection(tab.id)}
                                        className={`relative group min-w-[160px] px-5 py-3 rounded-xl border transition-all duration-300 flex-shrink-0 ${isActive
                                                ? `${tab.borderColor} bg-gradient-to-br from-slate-800/80 to-slate-900/60 shadow-2xl scale-[1.02]`
                                                : "border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/40 hover:scale-[1.01]"
                                            }`}
                                    >
                                        {/* Background Glow Effect for Active Tab */}
                                        {isActive && (
                                            <>
                                                <div
                                                    className={`absolute -inset-0.5 ${tab.color} rounded-xl blur-sm opacity-50`}
                                                />
                                            </>
                                        )}

                                        {/* Tab Content */}
                                        <div className="relative flex items-center gap-3">
                                            {/* Icon Container with Animation */}
                                            <div
                                                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? `${tab.color} border ${tab.borderColor}`
                                                        : "bg-slate-800/60"
                                                    }`}
                                            >
                                                <tab.icon
                                                    className={`text-lg transition-all duration-300 ${isActive
                                                            ? tab.iconColor
                                                            : "text-slate-400 group-hover:text-slate-300"
                                                        }`}
                                                />

                                                {/* Pulse Animation for Active Tab */}
                                                {isActive && (
                                                    <div className="absolute inset-0 rounded-xl bg-current opacity-20 animate-ping" />
                                                )}
                                            </div>

                                            {/* Text Content */}
                                            <div className="text-left">
                                                <div
                                                    className={`font-bold transition-all duration-300 ${isActive
                                                            ? "text-white"
                                                            : "text-slate-300 group-hover:text-white"
                                                        }`}
                                                >
                                                    {tab.label}
                                                </div>
                                                <div className="text-xs transition-all duration-300 text-slate-400 group-hover:text-slate-300">
                                                    {tab.subtitle}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content Sections */}
            <div className="relative max-w-4xl mx-auto px-4 mt-8 space-y-12">
                {/* Details Section */}
                <section
                    id="details"
                    ref={(el) => (tabRefs.current["details"] = el)}
                    className="scroll-mt-24"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.02]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                        </div>

                        {/* Section Header */}
                        <div className="flex items-start gap-4 mb-8 relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                <FiInfo className="text-2xl text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Built for everyday comfort
                                </h3>
                                <div className="text-slate-400">
                                    A dependable combi boiler designed around
                                    real homes and real usage
                                </div>
                            </div>
                        </div>

                        {/* Specifications Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <FiCpu className="text-blue-400 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            25kW
                                        </div>
                                        <div className="text-[12px] text-slate-400">
                                            Suitable output range
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    Well-balanced power for apartments and small
                                    to medium-sized houses, delivering steady
                                    heating and reliable hot water without
                                    unnecessary energy waste.
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <FiCalendar className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            10-Year
                                        </div>
                                        <div className="text-[12px] text-slate-400">
                                            Manufacturer-backed warranty
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    Long-term peace of mind with extensive cover
                                    on parts and labour when installed and
                                    maintained in line with manufacturer
                                    guidance.
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white mb-4">
                                Key Highlights
                            </h4>

                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                This combi boiler focuses on simplicity,
                                efficiency, and proven performance — making it a
                                solid choice for homeowners who want dependable
                                heating without unnecessary complexity.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                    "Consistent hot water for daily household demand",
                                    "Compact casing ideal for kitchens or cupboards",
                                    "Hydrogen-blend ready for future gas upgrades",
                                    "Designed to help keep running costs under control",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30"
                                    >
                                        <FiCheck className="text-emerald-400" />
                                        <span className="text-slate-300 text-[14px] line-clamp-1">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included Section */}
                <section
                    id="whats-included"
                    ref={(el) => (tabRefs.current["whats-included"] = el)}
                    className="scroll-mt-24"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden">
                        {/* Section Header */}
                        <div className="flex items-start gap-4 mb-8 relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                                <FiCheckSquare className="text-2xl text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    What’s included in your installation
                                </h3>
                                <div className="text-slate-400">
                                    Everything required for a safe, complete,
                                    and compliant boiler replacement
                                </div>
                            </div>
                        </div>

                        {/* Package Items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "New Combi Boiler Unit",
                                    description:
                                        "A brand-new, high-efficiency combi boiler supplied and fitted as part of your fixed price package.",
                                },
                                {
                                    title: "Full System Chemical Clean",
                                    description:
                                        "Your heating system is flushed and treated with inhibitor to help protect against corrosion and sludge.",
                                },
                                {
                                    title: "Magnetic System Filter",
                                    description:
                                        "Installed to capture debris and metal particles, helping extend the life of your new boiler.",
                                },
                                {
                                    title: "Wireless Heating Controls",
                                    description:
                                        "Simple, easy-to-use programmable controls for managing heating and hot water efficiently.",
                                },
                                {
                                    title: "Carbon Monoxide Alarm",
                                    description:
                                        "A safety alarm installed to alert you if carbon monoxide levels rise above safe limits.",
                                },
                                {
                                    title: "Gas Safe Installation",
                                    description:
                                        "Removal of your existing boiler and professional installation by Gas Safe registered engineers.",
                                },
                                {
                                    title: "Horizontal Flue Kit",
                                    description:
                                        "Supply and installation of a new horizontal flue where suitable for your property layout.",
                                },
                                {
                                    title: "Commissioning & Handover",
                                    description:
                                        "Full system testing, setup, and explanation so everything is working correctly before we leave.",
                                },
                            ].map((item, index) => (
                                <div key={index} className="group">
                                    <div className="h-full bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6 transition-all duration-300 hover:border-slate-600/60 hover:scale-[1.02]">
                                        <div className="flex items-start gap-4">
                                            <div>
                                                <h4 className="font-bold text-white mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-slate-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Extra Section */}
                <section
                    id="extra"
                    ref={(el) => (tabRefs.current["extra"] = el)}
                    className="scroll-mt-24"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                                    <FiPackage className="text-2xl text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-bold text-white">
                                        Often bought together
                                    </h3>
                                    <div className="text-slate-400">
                                        Optional upgrades
                                    </div>
                                </div>
                            </div>

                            {/* Arrows */}
                            <div className="hidden md:flex gap-2">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("extras-carousel")
                                            .scrollBy({
                                                left: -320,
                                                behavior: "smooth",
                                            })
                                    }
                                    className="w-11 h-11 rounded-xl cursor-pointer border border-slate-600/40 bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300"
                                >
                                    <HiOutlineArrowTurnUpLeft />
                                </button>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("extras-carousel")
                                            .scrollBy({
                                                left: 320,
                                                behavior: "smooth",
                                            })
                                    }
                                    className="w-11 h-11 rounded-xl cursor-pointer border border-slate-600/40 bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300"
                                >
                                    <HiOutlineArrowTurnUpRight />
                                </button>
                            </div>
                        </div>

                        {/* Carousel */}
                        <div
                            id="extras-carousel"
                            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                        >
                            {[
                                {
                                    title: "Limescale Protection",
                                    description:
                                        "Reduces mineral build-up to help protect internal boiler components over time.",
                                    price: "£65",
                                },
                                {
                                    title: "Professional Powerflush",
                                    description:
                                        "A deep system clean that removes sludge and debris before commissioning.",
                                    price: "£195",
                                },
                                {
                                    title: "Annual Boiler Service",
                                    description:
                                        "Routine inspection and tuning to maintain efficiency and safety.",
                                    price: "£99",
                                },
                                {
                                    title: "Extended Care Cover",
                                    description:
                                        "Extra reassurance with support beyond standard installation.",
                                    price: "£149",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="
                        min-w-[300px]
                        relative
                        rounded-2xl
                        border border-slate-700/40
                        bg-gradient-to-br from-slate-900/50 to-slate-800/30
                        p-6
                        flex flex-col
                        transition-all duration-300
                        hover:border-slate-600/60
                    "
                                >
                                    {/* Accent strip */}
                                    {/* <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/60 to-pink-500/60 rounded-t-2xl" /> */}

                                    {/* Content */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/40">
                                        <div className="text-xl font-bold text-white">
                                            {item.price}
                                        </div>
                                        <button className="px-4 py-2 text-sm rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs Section */}
                <section
                    id="faqs"
                    ref={(el) => (tabRefs.current["faqs"] = el)}
                    className="scroll-mt-24"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                                <FiHelpCircle className="text-2xl text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    FAQs
                                </h3>
                                <div className="text-slate-400">
                                    Answers to common questions about this
                                    boiler and installation
                                </div>
                            </div>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-3">
                            {[
                                {
                                    question:
                                        "Will this boiler fit inside a kitchen cupboard?",
                                    answer: "This boiler is larger than a standard kitchen wall unit used for storage. However, it fits comfortably inside most purpose-built boiler cupboards, utility spaces, or airing cupboards.",
                                },
                                {
                                    question:
                                        "How soon can installation be arranged?",
                                    answer: "Installation is often available within a few working days after order confirmation. Exact timings depend on availability and whether a pre-install check is required.",
                                },
                                {
                                    question:
                                        "Do I need a survey before purchasing?",
                                    answer: "Not always. Many installations can be planned using the details you provide online. If anything needs verification, we’ll arrange a quick check before proceeding.",
                                },
                                {
                                    question:
                                        "What’s the difference between the 4000 and 8000 models?",
                                    answer: "The 8000 range offers higher output, premium internal components, and is better suited to larger homes or higher demand. The 4000 focuses on reliable performance for everyday household use.",
                                },
                                {
                                    question:
                                        "How many radiators can the 4000 support?",
                                    answer: "In most homes, the 4000 model comfortably supports around 8 to 12 radiators, depending on insulation quality and system layout.",
                                },
                            ].map((faq, index) => (
                                <FAQItem key={index} faq={faq} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                <section
                    id="reviews"
                    ref={(el) => (tabRefs.current["reviews"] = el)}
                    className="scroll-mt-24 mb-20"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                                <FiStar className="text-2xl text-rose-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Customer reviews
                                </h3>
                                <div className="text-slate-400">
                                    Feedback from verified customers following
                                    installation
                                </div>
                            </div>
                        </div>

                        {/* Rating Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {/* Overall score */}
                            <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-6">
                                <div className="text-4xl font-bold text-white mb-2">
                                    4.8
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`text-lg ${i < 5
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-slate-600"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-slate-400">
                                    Based on 800+ verified reviews
                                </p>
                            </div>

                            {/* Breakdown */}
                            <div className="md:col-span-2 rounded-xl border border-slate-700/40 bg-slate-900/40 p-6 space-y-3">
                                {[
                                    { stars: "5", percent: 88 },
                                    { stars: "4", percent: 8 },
                                    { stars: "3", percent: 3 },
                                    { stars: "2", percent: 0 },
                                    { stars: "1", percent: 1 },
                                ].map((row, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-6 text-sm text-slate-300">
                                            {row.stars}
                                        </span>
                                        <div className="flex-1 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                                                style={{
                                                    width: `${row.percent}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="w-10 text-xs text-slate-400 text-right">
                                            {row.percent}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-6">
                            {[
                                {
                                    name: "Dani G",
                                    meta: "Installation in PE19 · Dec 2025",
                                    rating: 5,
                                    comment:
                                        "The boiler is noticeably quieter and more efficient than our previous system. You can feel the improvement straight away.",
                                },
                                {
                                    name: "Steve Q",
                                    meta: "Installation in NE17 · Dec 2025",
                                    rating: 5,
                                    comment:
                                        "From installation to daily use, everything has been smooth. The heating responds quickly and the controls are simple to use.",
                                },
                            ].map((review, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-700/40 bg-gradient-to-br from-slate-900/40 to-slate-800/20 p-6"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-white">
                                                {review.name}
                                            </h4>
                                            <p className="text-xs text-slate-500">
                                                {review.meta}
                                            </p>
                                            <div className="flex items-center gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className={`text-sm ${i < review.rating
                                                                ? "text-amber-400 fill-amber-400"
                                                                : "text-slate-600"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                                            Verified
                                        </span>
                                    </div>

                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10 text-center">
                            <button className="px-6 py-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all">
                                View all customer reviews
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
