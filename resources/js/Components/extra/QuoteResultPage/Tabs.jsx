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
                className={`sticky z-40 transition-all duration-300 ${
                    isSticky
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
                                        className={`relative group min-w-[160px] px-5 py-3 rounded-xl border transition-all duration-300 flex-shrink-0 ${
                                            isActive
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
                                                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                    isActive
                                                        ? `${tab.color} border ${tab.borderColor}`
                                                        : "bg-slate-800/60"
                                                }`}
                                            >
                                                <tab.icon
                                                    className={`text-lg transition-all duration-300 ${
                                                        isActive
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
                                                    className={`font-bold transition-all duration-300 ${
                                                        isActive
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
                                    Product Details
                                </h3>
                                <div className="text-slate-400">
                                    Complete technical specifications and
                                    features
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
                                            Heating Output
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    High-efficiency condensing boiler with 94%
                                    efficiency rating
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <FiCalendar className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            10 Years
                                        </div>
                                        <div className="text-[12px] text-slate-400">
                                            Warranty
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    Comprehensive manufacturer warranty with
                                    extended coverage
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white mb-4">
                                Key Features
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                    "Quiet operation technology",
                                    "Smart heating control",
                                    "Energy efficiency A-rated",
                                    "Compact modern design",
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
                                    What's Included
                                </h3>
                                <div className="text-slate-400">
                                    Everything you get with your purchase
                                </div>
                            </div>
                        </div>

                        {/* Package Items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Professional Installation",
                                    description:
                                        "Gas Safe registered engineers",
                                    // icon: FiUsers,
                                    color: "text-blue-400",
                                    bg: "bg-blue-500/10",
                                },
                                {
                                    title: "Magnetic Filter",
                                    description:
                                        "System protection and efficiency",
                                    // icon: FiCpu,
                                    color: "text-cyan-400",
                                    bg: "bg-cyan-500/10",
                                },
                                {
                                    title: "Smart Thermostat",
                                    description:
                                        "Wireless programmable control",
                                    // icon: FiClock,
                                    color: "text-purple-400",
                                    bg: "bg-purple-500/10",
                                },
                                {
                                    title: "System Flush",
                                    description: "Complete cleaning process",
                                    // icon: FiAlertCircle,
                                    color: "text-amber-400",
                                    bg: "bg-amber-500/10",
                                },
                                {
                                    title: "10-Year Warranty",
                                    description:
                                        "Extended manufacturer coverage",
                                    // icon: FiShield,
                                    color: "text-emerald-400",
                                    bg: "bg-emerald-500/10",
                                },
                                {
                                    title: "Aftercare Support",
                                    description: "24/7 customer service",
                                    // icon: FiStar,
                                    color: "text-rose-400",
                                    bg: "bg-rose-500/10",
                                },
                            ].map((item, index) => (
                                <div key={index} className="group">
                                    <div className="h-full bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6 transition-all duration-300 hover:border-slate-600/60 hover:scale-[1.02]">
                                        <div className="flex items-start gap-4">
                                            {/* <div
                                                className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                                            >
                                                <item.icon
                                                    className={`text-xl ${item.color}`}
                                                />
                                            </div> */}
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
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                                <FiPackage className="text-2xl text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Additional Options
                                </h3>
                                <div className="text-slate-400">
                                    Enhance your system with these extras
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Extended Warranty",
                                    description:
                                        "Add 5 additional years to your warranty coverage",
                                    price: "£299",
                                    popular: true,
                                },
                                {
                                    title: "Annual Service Plan",
                                    description:
                                        "Regular maintenance and priority support",
                                    price: "£99/year",
                                    popular: false,
                                },
                                {
                                    title: "Smart Home Integration",
                                    description:
                                        "Connect with Alexa, Google Home, and Apple HomeKit",
                                    price: "£149",
                                    popular: true,
                                },
                            ].map((option, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6"
                                >
                                    <div className="flex flex-col justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-white">
                                                    {option.title}
                                                </h4>
                                                {option.popular && (
                                                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-3">
                                                {option.description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-white">
                                                {option.price}
                                            </div>
                                            <button className="mt-2 px-4 py-2 text-sm rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors">
                                                Add Option
                                            </button>
                                        </div>
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
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                                <FiHelpCircle className="text-2xl text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Frequently Asked Questions
                                </h3>
                                <div className="text-slate-400">
                                    Common questions about our products and
                                    services
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    question:
                                        "What's included in the installation price?",
                                    answer: "The price includes the boiler, all installation labor, system flush, magnetic filter, wireless smart thermostat, and commissioning. No hidden costs.",
                                },
                                {
                                    question:
                                        "How long does installation take?",
                                    answer: "Most installations are completed within 1-2 days, depending on system complexity. We'll provide a specific timeline during your survey.",
                                },
                                {
                                    question: "Do you offer financing options?",
                                    answer: "Yes, we offer 0% finance options over 2-5 years. Apply online or speak to our advisors for more information.",
                                },
                                {
                                    question: "What warranty do you provide?",
                                    answer: "All installations come with a 10-year manufacturer warranty and a 2-year workmanship guarantee for complete peace of mind.",
                                },
                            ].map((faq, index) => (
                                <div key={index} className="group">
                                    <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6 transition-all duration-300 hover:border-slate-600/60">
                                        <h4 className="font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                            {faq.question}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
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
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                                <FiStar className="text-2xl text-rose-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Customer Reviews
                                </h3>
                                <div className="text-slate-400">
                                    What our customers say about their
                                    experience
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    name: "Sarah Johnson",
                                    rating: 5,
                                    date: "2 weeks ago",
                                    comment:
                                        "Excellent service from start to finish. The engineers were professional and tidy.",
                                },
                                {
                                    name: "Michael Brown",
                                    rating: 5,
                                    date: "1 month ago",
                                    comment:
                                        "Great value for money. Boiler is quiet and efficient. Highly recommend!",
                                },
                                {
                                    name: "Emma Wilson",
                                    rating: 4,
                                    date: "3 months ago",
                                    comment:
                                        "Installation was quick and clean. The smart thermostat is easy to use.",
                                },
                                {
                                    name: "David Lee",
                                    rating: 5,
                                    date: "2 months ago",
                                    comment:
                                        "Professional team, quality workmanship. Heating bills have reduced significantly.",
                                },
                            ].map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-white">
                                                {review.name}
                                            </h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className={`text-sm ${
                                                            i < review.rating
                                                                ? "text-amber-400 fill-amber-400"
                                                                : "text-slate-600"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {review.date}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500/20 to-rose-600/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 transition-all duration-300">
                                View All Reviews
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
