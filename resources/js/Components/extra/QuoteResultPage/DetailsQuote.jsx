import {
    FiX,
    FiShield,
    FiTruck,
    FiHash,
    FiChevronLeft,
    FiChevronRight,
    FiCamera,
    FiCalendar,
    FiCheck,
    FiCreditCard,
    FiMessageSquare,
    FiZap,
} from "react-icons/fi";
import ProductTabs from "./Tabs";

export default function DetailsQuoteSidebar({
    detailsQuote,
    onClose,

    // carousel
    carouselImages,
    currentImageIndex,
    onPrevImage,
    onNextImage,
    autoRotate,
    setAutoRotate,

    // power
    selectedPower,
    onPowerSelect,
}) {
    if (!detailsQuote) return null; // ✅ HARD GUARD

    const {
        name,
        badge,
        tier,
        id,
        warranty,
        price,
        oldPrice,
        monthly,
        dimensions,
        weight,
    } = detailsQuote;

    return (
        <>
            {/* Overlay with animated circuit pattern */}
            <div
                onClick={onClose}
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
                    <div className="sticky top-0 z-30 bg-dark/90 backdrop-blur-xl border-b border-dark/50">
                        <div className="relative px-8 py-5">
                            <div className="relative flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`relative px-4 py-2.5 rounded-lg font-bold text-dark ${detailsQuote.badge} overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-foreground" />
                                        <div className="relative flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                            <span className="text-shadow-lg">
                                                {detailsQuote.tier}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold text-white tracking-tight">
                                            {detailsQuote.name}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Holographic button */}
                                    <button className="relative px-4 py-3 rounded-lg bg-dark/50 backdrop-blur-sm border border-dark.90 hover:border-green-500/50 cursor-pointer transition-colors duration-300 text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2 group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <FiMessageSquare className="relative z-10 group-hover:text-green-500 transition-colors duration-300" />
                                        <span className="relative z-10 group-hover:text-green-300 transition-colors duration-300">
                                            Talk to our experts
                                        </span>
                                    </button>

                                    {/* Close button with particle effect */}
                                    <button
                                        onClick={onClose}
                                        className="relative h-12 w-12 cursor-pointer rounded-xl bg-dark/50 border border-dark hover:border-red-400/50 hover:bg-dark/80 flex items-center justify-center transition-all group"
                                    >
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-red-500/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-red-500/10 transition-all" />
                                        <FiX className="text-slate-400 group-hover:text-white transition-colors text-lg relative z-10" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Body with split layout */}
                    <div className="flex-1 overflow-hidden bg-dark/40">
                        <div className="flex h-full">
                            {/* Left Column - Sticky Carousel (keep as is) */}
                            <div className="hidden lg:flex lg:w-[400px] sticky top-0">
                                <div className="relative w-full p-6">
                                    {/* Carousel Container */}
                                    <div className="relative rounded-2xl bg-gradient-to-br from-dark/90 to-dark/30 border border-white/10 overflow-hidden">
                                        {/* Grid pattern background */}
                                        <div className="absolute inset-0 opacity-20">
                                            <div
                                                className="absolute inset-0 h-full"
                                                style={{
                                                    backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px),
                                                linear-gradient(to bottom, #334155 1px, transparent 1px)`,
                                                    backgroundSize: "40px 20px",
                                                }}
                                            />
                                        </div>

                                        {/* Carousel header */}
                                        <div className="relative z-10 px-6 py-4 border-b border-foreground/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                        <FiCamera className="text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white">
                                                            Visual Overview
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-slate-400">
                                                    {currentImageIndex + 1}/
                                                    {carouselImages.length}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main carousel image */}
                                        <div className="relative p-8 pb-2">
                                            <div className="relative aspect-square rounded-2xl bg-[#f4f5f4] overflow-hidden flex items-center justify-center">
                                                {/* Soft vertical vignette */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-black/10" />

                                                {/* Center glow */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                                                <div className="absolute bottom-[18%] w-[60%] h-6 bg-black/30 blur-2xl rounded-full" />

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
                                                        currentImageIndex + 1
                                                    }`}
                                                    className="relative z-10 max-h-[85%]
    max-w-[80%]
    object-contain
    drop-shadow-[0_35px_50px_rgba(0,0,0,0.25)]
    transition-transform duration-300
    hover:scale-[1.03]
  "
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
                                            </div>
                                        </div>

                                        {/* Carousel controls */}
                                        <div className="flex items-center justify-center gap-4 w-full mt-3 pb-6">
                                            <button
                                                onClick={onPrevImage}
                                                className="w-10 h-10 rounded-full bg-dark/80 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all group"
                                            >
                                                <FiChevronLeft className="text-slate-400 group-hover:text-white" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setAutoRotate(!autoRotate)
                                                }
                                                className={`px-4 py-2 rounded-lg border ${
                                                    autoRotate
                                                        ? "bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 border-emerald-500/50 text-emerald-400"
                                                        : "bg-dark/50 border-white/10 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400"
                                                } text-sm font-medium transition-all`}
                                            >
                                                {autoRotate
                                                    ? "Stop Auto"
                                                    : "Auto Rotate"}
                                            </button>
                                            <button
                                                onClick={onNextImage}
                                                className="w-10 h-10 rounded-full bg-dark/80 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center hover:bg-slate-800 transition-all group"
                                            >
                                                <FiChevronRight className="text-slate-400 group-hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - COMPLETELY REDESIGNED */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6">
                                    {/* Price & Power Selection in one row */}
                                    <div className="grid grid-cols-1 gap-6 mb-8">
                                        {/* Investment Breakdown */}
                                        <div className="relative group">
                                            <div className="bg-gradient-to-br from-dark/50 to-dark/30 rounded-2xl border border-white/10 p-6 overflow-hidden">
                                                {/* Animated background */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                <div className="relative">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                                                                <FiCreditCard className="text-amber-400" />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-xl font-bold text-white">
                                                                    Investment
                                                                    Summary
                                                                </h2>
                                                                <div className="text-sm text-slate-400">
                                                                    Fixed price
                                                                    package
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary text-sm font-medium">
                                                            {selectedPower}
                                                            kW
                                                        </div>
                                                    </div>

                                                    {/* Total Price */}
                                                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-black/30 border border-white/10">
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <div className="text-sm text-slate-400 mb-2">
                                                                    Total
                                                                    Package
                                                                </div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <div className="text-4xl font-bold text-white">
                                                                        £
                                                                        {detailsQuote.price.toLocaleString()}
                                                                    </div>
                                                                    <div className="px-2 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-primary/10 border border-primary/30 text-primary text-xs">
                                                                        Save £
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
                                                                <div className="text-2xl font-bold text-white">
                                                                    £
                                                                    {
                                                                        detailsQuote.monthly
                                                                    }
                                                                </div>
                                                                <div className="text-[13px] text-primary">
                                                                    0% APR • 10
                                                                    Years
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Power Selection with System Load */}
                                        <div className="relative group">
                                            <div className="bg-gradient-to-br from-dark/50 to-dark/30 rounded-2xl border border-white/10 p-6 overflow-hidden">
                                                <div className="relative">
                                                    <div className="flex items-center justify-between mb-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                                                                <FiZap className="text-purple-400" />
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
                                                            <div className="text-2xl font-bold text-primary">
                                                                {selectedPower}
                                                                kW
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between gap-6 flex-col lg:flex-row">
                                                        {/* Power options */}
                                                        <div className="flex flex-col justify-center gap-3">
                                                            {[
                                                                {
                                                                    power: "25",
                                                                    price: detailsQuote.price,
                                                                    label: "25kW",
                                                                },
                                                                {
                                                                    power: "30",
                                                                    price:
                                                                        detailsQuote.price +
                                                                        100,
                                                                    label: "30kW",
                                                                },
                                                            ].map((option) => {
                                                                const isSelected =
                                                                    selectedPower ===
                                                                    option.power;
                                                                return (
                                                                    <button
                                                                        key={
                                                                            option.power
                                                                        }
                                                                        onClick={() =>
                                                                            onPowerSelect(
                                                                                option.power
                                                                            )
                                                                        }
                                                                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                                                            isSelected
                                                                                ? "border-primary bg-gradient-to-br from-primary/5 to-primary/5"
                                                                                : "border-white/20 hover:border-white/30 hover:bg-slate-800/30"
                                                                        }`}
                                                                    >
                                                                        <div className="text-center">
                                                                            <div className="text-4xl font-bold text-white mb-1">
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                className={`text-xs font-medium py-1 rounded-full ${
                                                                                    isSelected
                                                                                        ? "bg-primary/10 text-[#689bdf]"
                                                                                        : "bg-slate-800/50 text-slate-400"
                                                                                }`}
                                                                            >
                                                                                {isSelected
                                                                                    ? "✓ Selected"
                                                                                    : `+£${
                                                                                          option.price -
                                                                                          detailsQuote.price
                                                                                      }`}
                                                                            </div>
                                                                        </div>
                                                                        {isSelected && (
                                                                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                                                                <FiCheck className="text-white text-[8px]" />
                                                                            </div>
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Toggle Button Container with System Load Info */}
                                                        <div className="flex flex-col items-center justify-center space-y-4">
                                                            {/* System Load Label */}
                                                            <div className="text-center">
                                                                <div className="text-sm font-medium text-slate-300 mb-2">
                                                                    System Load
                                                                </div>
                                                                <div className="text-3xl font-bold text-secondary">
                                                                    {selectedPower ===
                                                                    "25"
                                                                        ? "60%"
                                                                        : "45%"}
                                                                </div>
                                                                <div className="text-xs text-slate-400 mt-1">
                                                                    {selectedPower ===
                                                                    "25"
                                                                        ? "Optimal for efficiency"
                                                                        : "Conservative for flexibility"}
                                                                </div>
                                                            </div>

                                                            {/* Toggle Switch */}
                                                            <div className="flex items-center justify-center">
                                                                <button
                                                                    onClick={() =>
                                                                        onPowerSelect(
                                                                            selectedPower ===
                                                                                "25"
                                                                                ? "30"
                                                                                : "25"
                                                                        )
                                                                    }
                                                                    className="relative w-20 h-10 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
                                                                >
                                                                    {/* Track Background - Fixed with better gradient */}
                                                                    <div
                                                                        className={`absolute inset-0 rounded-full transition-all duration-300 ${
                                                                            selectedPower ===
                                                                            "25"
                                                                                ? "bg-gradient-to-r from-secondary via-secondary to-secondary/90"
                                                                                : "bg-gradient-to-r from-slate-600/90 via-slate-500/80 to-slate-600/90"
                                                                        }`}
                                                                    >
                                                                        {/* Pulsing Glow Effect */}
                                                                        <div
                                                                            className={`absolute inset-0 rounded-full transition-all duration-300 ${
                                                                                selectedPower ===
                                                                                "25"
                                                                                    ? "bg-primary/30 animate-pulse"
                                                                                    : "bg-slate-500/20"
                                                                            }`}
                                                                            style={{
                                                                                animationDuration:
                                                                                    "2s",
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    {/* Toggle Knob - Fixed with transform for smoother animation */}
                                                                    <div
                                                                        className={`absolute top-1 w-8 h-8 rounded-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${
                                                                            selectedPower ===
                                                                            "25"
                                                                                ? "translate-x-1"
                                                                                : "translate-x-11"
                                                                        }`}
                                                                    >
                                                                        {/* Inner Glow/Color */}
                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                            <div
                                                                                className={`w-6 h-6 rounded-full transition-all duration-300 ${
                                                                                    selectedPower ===
                                                                                    "25"
                                                                                        ? "bg-gradient-to-br from-primary to-primary shadow-inner shadow-primary/30"
                                                                                        : "bg-gradient-to-br from-slate-300 to-slate-400 shadow-inner shadow-slate-400/30"
                                                                                }`}
                                                                            >
                                                                                {/* Shimmer Effect */}
                                                                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-60" />
                                                                            </div>
                                                                        </div>

                                                                        {/* Knob Glow */}
                                                                        <div
                                                                            className={`absolute -inset-1 rounded-full blur-sm transition-all duration-300 ${
                                                                                selectedPower ===
                                                                                "25"
                                                                                    ? "bg-primary/50"
                                                                                    : "bg-slate-400/30"
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* System Load Visualization - Updated with Proper Synchronization */}
                                                        <div className="relative">
                                                            <div className="relative h-full w-24 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-xl">
                                                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/20 to-slate-900" />
                                                                <div className="absolute inset-0 opacity-[0.15]">
                                                                    <div
                                                                        className="absolute inset-0"
                                                                        style={{
                                                                            backgroundImage: `
              linear-gradient(90deg, transparent 24px, rgba(255,255,255,0.1) 25px, transparent 26px),
              linear-gradient(0deg, transparent 49px, rgba(255,255,255,0.1) 50px, transparent 51px)
            `,
                                                                            backgroundSize:
                                                                                "50px 50px",
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div
                                                                    className={`
          absolute bottom-0 left-0 right-0 
          transition-all duration-500 ease-out
          ${
              selectedPower === "25"
                  ? "h-[60%] bg-gradient-to-t from-primary via-primary/80 to-secondary/90"
                  : "h-[45%] bg-gradient-to-t from-slate-600/80 via-slate-500/70 to-slate-600/80"
          }
        `}
                                                                >
                                                                    {/* Animated Shimmer Effect */}
                                                                    <div className="absolute inset-0 overflow-hidden">
                                                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-transparent animate-shimmer" />
                                                                    </div>

                                                                    {/* Inner Glow Effect */}
                                                                    <div
                                                                        className={`absolute inset-0 ${
                                                                            selectedPower ===
                                                                            "25"
                                                                                ? "shadow-[inset_0_0_30px_rgba(16,185,129,0.3)]"
                                                                                : "shadow-[inset_0_0_20px_rgba(100,116,139,0.2)]"
                                                                        }`}
                                                                    />
                                                                </div>

                                                                {/* Scale Markers */}
                                                                <div className="absolute inset-0 flex flex-col justify-between py-4 z-10">
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
                                                                                className="relative px-3"
                                                                            >
                                                                                {/* Scale Line */}
                                                                                <div
                                                                                    className={`
                absolute left-1/2 -translate-x-1/2 w-8 h-px
                ${
                    index === 0
                        ? "bg-gradient-to-r from-red-400/60 via-red-400/80 to-red-400/60"
                        : index === 1
                        ? "bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60"
                        : "bg-gradient-to-r from-slate-400/40 via-slate-400/60 to-slate-400/40"
                }
              `}
                                                                                >
                                                                                    {/* Line Glow */}
                                                                                    <div
                                                                                        className={`
                  absolute inset-0 blur-[1px]
                  ${
                      index === 0
                          ? "bg-red-400/30"
                          : index === 1
                          ? "bg-emerald-400/30"
                          : "bg-slate-400/20"
                  }
                `}
                                                                                    />
                                                                                </div>

                                                                                {/* Label Container */}
                                                                                <div className="relative flex justify-center mt-1">
                                                                                    <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300/90 backdrop-blur-sm border border-slate-700/50 shadow-sm">
                                                                                        {
                                                                                            label
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>

                                                                {/* Current Level Indicator - UPDATED with toggle synchronization */}
                                                                <div
                                                                    className={`
          absolute left-0 right-0 z-20
          ${selectedPower === "25" ? "bottom-[60%]" : "bottom-[45%]"}
          transition-all duration-500 ease-out
        `}
                                                                >
                                                                    {/* Indicator Line */}
                                                                    <div
                                                                        className={`
            border-t-2 border-dashed w-full
            ${
                selectedPower === "25"
                    ? "border-primary/70 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "border-slate-400/50 shadow-[0_0_10px_rgba(100,116,139,0.3)]"
            }
          `}
                                                                    >
                                                                        {/* Indicator Dot */}
                                                                        <div
                                                                            className={`
              absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full 
              transition-all duration-300
              ${
                  selectedPower === "25"
                      ? "bg-primary shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                      : "bg-slate-400 shadow-[0_0_10px_rgba(100,116,139,0.5)]"
              }
            `}
                                                                        >
                                                                            {/* Inner Glow */}
                                                                            <div className="absolute inset-1 rounded-full bg-white/30" />
                                                                        </div>

                                                                        {/* Indicator Glow Line */}
                                                                        <div
                                                                            className={`
              absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px blur-[2px]
              ${
                  selectedPower === "25"
                      ? "bg-emerald-400/40"
                      : "bg-slate-400/20"
              }
            `}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Border Glow Effect */}
                                                                <div className="absolute inset-0 rounded-2xl pointer-events-none border border-slate-600/30 shadow-[inset_0_0_25px_rgba(255,255,255,0.05)]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Unique Tabs Design */}
                                    <div className="mb-8">
                                        <ProductTabs />
                                    </div>

                                    {/* Action Buttons - Futuristic design */}
                                    <div className="w-full">
                                        <button className="w-full relative group p-5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-400/50 transition-all">
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative flex items-center justify-center gap-3">
                                                <FiCalendar className="text-emerald-400 text-xl" />
                                                <div className="text-left">
                                                    <div className="font-bold text-white">
                                                        Book Installation
                                                    </div>
                                                    <div className="text-sm text-emerald-400">
                                                        Schedule installation
                                                        date
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
                                <span className="text-slate-600">•</span>
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
    );
}
