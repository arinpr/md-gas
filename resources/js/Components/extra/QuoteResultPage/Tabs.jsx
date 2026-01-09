import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    FiCpu,
    FiInfo,
    FiCheckSquare,
    FiCheck,
    FiCalendar,
    FiPackage,
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
];

export default function ProductTabs({
    notes = [],
    includes = [],
    kw = "25",
    warranty = "10",
    brand = "Boiler",
    containerRef,
}) {
    const [activeTab, setActiveTab] = useState("details");
    const [isSticky, setIsSticky] = useState(false);

    const isManualScroll = useRef(false);
    const sectionRef = useRef(null);
    const tabRefs = useRef({});

    useEffect(() => {
        const currentContainer = containerRef?.current;
        if (!currentContainer) return;

        const observerOptions = {
            root: currentContainer,
            rootMargin: "-20% 0px -50% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (isManualScroll.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        }, observerOptions);

        Object.values(tabRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [containerRef]);

    useEffect(() => {
        const currentContainer = containerRef?.current;
        if (!currentContainer) return;

        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const containerRect = currentContainer.getBoundingClientRect();
                // Check if tabs header hits top of container
                setIsSticky(rect.top - containerRect.top <= 10);
            }
        };

        currentContainer.addEventListener("scroll", handleScroll);
        return () =>
            currentContainer.removeEventListener("scroll", handleScroll);
    }, [containerRef]);

    const scrollToSection = useCallback(
        (tabId) => {
            const element = tabRefs.current[tabId];
            const container = containerRef?.current;

            if (element && container) {
                isManualScroll.current = true;
                setActiveTab(tabId);

                const headerOffset = 160;

                // 1. CHANGE: Use getBoundingClientRect for absolute precision regardless of nesting
                const elementTop = element.getBoundingClientRect().top;
                const containerTop = container.getBoundingClientRect().top;
                const currentScroll = container.scrollTop;

                // Calculate exact position to scroll to
                const targetPosition =
                    currentScroll + (elementTop - containerTop) - headerOffset;

                container.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                setTimeout(() => {
                    isManualScroll.current = false;
                }, 1000);
            }
        },
        [containerRef]
    );

    return (
        <div ref={sectionRef} className="relative">
            {/* Sticky Tabs Header */}
            <div
                className={`sticky z-40 transition-all duration-300  rounded-2xl ${
                    isSticky
                        ? "top-0 py-3 bg-dark/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl -mx-2 px-6"
                        : "top-4"
                }`}
            >
                {isSticky && (
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-slate-900/90 to-transparent pointer-events-none" />
                )}

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex overflow-x-auto py-2 px-2 no-scrollbar bg-gradient- from-slate-900/5 via-slate-900/10 to-slate-900/5 backdrop-blur-2xl">
                        <div className="flex gap-3">
                            {tabs.map((tab) => {
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
                                        {isActive && (
                                            <div
                                                className={`absolute -inset-0.5 ${tab.color} rounded-xl blur-sm opacity-50`}
                                            />
                                        )}

                                        <div className="relative flex items-center gap-3">
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
                                                {isActive && (
                                                    <div className="absolute inset-0 rounded-xl bg-current opacity-20 animate-ping" />
                                                )}
                                            </div>

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
            <div className="relative max-w-4xl mx-auto mt-8 space-y-12 pb-20">
                {/* Details Section */}
                <section
                    id="details"
                    ref={(el) => (tabRefs.current["details"] = el)}
                    className="scroll-mt-32"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.02]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                        </div>

                        <div className="flex items-start gap-4 mb-8 relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                <FiInfo className="text-2xl text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Built for everyday comfort
                                </h3>
                                <div className="text-slate-400">
                                    A dependable {brand} boiler designed around
                                    real homes and real usage.
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <FiCpu className="text-blue-400 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            {kw}kW
                                        </div>
                                        <div className="text-[12px] text-slate-400">
                                            Output Rating
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    Optimized power output ensuring consistent
                                    heating and hot water performance for your
                                    specific property needs.
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <FiCalendar className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            {warranty} Year
                                        </div>
                                        <div className="text-[12px] text-slate-400">
                                            Warranty Included
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 text-sm">
                                    Long-term peace of mind with extensive cover
                                    on parts and labour when maintained in line
                                    with guidance.
                                </div>
                            </div>
                        </div>

                        {notes && notes.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-white mb-4">
                                    Key Highlights
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    This model focuses on simplicity,
                                    efficiency, and proven performance — making
                                    it a solid choice for homeowners.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {notes.map((note, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30"
                                        >
                                            <FiCheck className="text-emerald-400 flex-shrink-0" />
                                            <span className="text-slate-300 text-[14px]">
                                                {note}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* What's Included Section */}
                <section
                    id="whats-included"
                    ref={(el) => (tabRefs.current["whats-included"] = el)}
                    className="scroll-mt-32"
                >
                    <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden">
                        <div className="flex items-start gap-4 mb-8 relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                                <FiCheckSquare className="text-2xl text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold text-white">
                                    What’s included in your installation
                                </h3>
                                <div className="text-slate-400 text-[14px]">
                                    Everything required for a safe, complete,
                                    and compliant boiler replacement.
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {includes.map((item, index) => (
                                <div key={index} className="group">
                                    <div className="h-full bg-gradient-to-br from-slate-900/40 to-slate-800/20 rounded-xl border border-slate-700/40 p-6 transition-all duration-300 hover:border-slate-600/60 hover:scale-[1.02]">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">
                                                <FiPackage className="text-emerald-500/80 text-lg" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">
                                                    {item}
                                                </h4>
                                                <p className="text-sm text-slate-400">
                                                    Premium component included
                                                    in your package.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
