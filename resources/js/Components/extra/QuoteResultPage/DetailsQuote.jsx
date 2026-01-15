import {
    FiX,
    FiCamera,
    FiCalendar,
    FiSave,
    FiArrowRight,
} from "react-icons/fi";
import ProductTabs from "./Tabs";
import { useRef, useState } from "react";
import { router } from "@inertiajs/react";



export default function DetailsQuoteSidebar({ detailsQuote, onClose, answers, product, selectedPower }) {
    if (!detailsQuote) return null;

    // 1. We create the reference here
    const scrollContainerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {
        brand = "",
        model = "",
        tier = "",
        kw = "",
        warrantyYears = "",
        includes = [],
        badge = "bg-slate-200 text-dark",
        price = 0,
        productImages = [],
    } = detailsQuote;

    console.log("details page include", detailsQuote);

    const safePrice = Number(price) || 0;

    // Calculate Price: Handle nulls from your screenshot (base + margin + addons)
    const calculatePrice = (product) => {
        console.log("Calculating price for product:", product);
        if (product.pricing?.total) return product.pricing.total;

        const base = parseFloat(product.pricing?.base || 0);
        const margin = parseFloat(product.pricing?.marginApplied || 0);
        const addons = parseFloat(product.pricing?.addOnsTotal || 0);
        return base + margin + addons;
    };

    const finalPrice = calculatePrice(product);

    const carouselImages = Array.isArray(productImages)
        ? productImages
        : productImages
        ? [productImages]
        : ["/images/ideal-20logic.png"];


    console.log("Detailed Quote", {
                                                    boiler_id: product.id,
                                                    brand: product.brand,
                                                    model: product.model,
                                                    includes:
                                                        product.includes ?? [],
                                                    images:
                                                        product.images ?? [],
                                                    kw: product.kw,
                                                    warrantyYears:
                                                        product.warrantyYears,
                                                    price: finalPrice,
                                                    power: selectedPower,
                                                    answers: answers,
                                                })

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/70 z-40"
            />

            <aside className="fixed right-0 top-0 h-full w-full overflow-y-auto lg:w-[1000px] bg-gradient-to-b from-slate-900 to-slate-800 z-50 border-l border-slate-700/50 shadow-2xl animate-slideFromRight">
                <div className="h-full flex flex-col">
                    {/* HEADER */}
                    <div className="sticky top-0 z-30 bg-dark/90 backdrop-blur-xl border-b border-dark/50">
                        <div className="relative px-8 py-6 flex justify-between items-center overflow-hidden">
                            {/* Background decorative gradient */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

                            <div className="flex gap-4 items-center z-10">
                                {/* Tier Badge - Technical Tag Style */}
                                {tier && (
                                    <div className="flex flex-col items-start justify-center pl-3 border-l-2 border-emerald-500/50">
                                        <span className="text-[9px] uppercase text-emerald-500/80 leading-none mb-1">
                                            Current Tier
                                        </span>
                                        <span className="text-xs font-mono font-bold text-emerald-100 tracking-widest uppercase">
                                            {tier}
                                        </span>
                                    </div>
                                )}

                                {/* Save Button - Glass Panel */}
                                <button
                                    className="
            group relative flex items-center gap-3
            px-6 py-3
            bg-gradient-to-b from-slate-800/50 to-slate-900/50
            border border-slate-700 hover:border-emerald-500/50
            backdrop-blur-sm rounded-lg
            transition-all duration-300
        "
                                >
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <FiSave className="text-emerald-500/70 group-hover:text-emerald-400 text-lg transition-colors" />
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                                        Save Quote
                                    </span>
                                </button>
                            </div>

                            {/* Close Button - Red Accent Hover */}
                            <button
                                onClick={onClose}
                                className="
            group relative h-10 w-10 cursor-pointer
            flex items-center justify-center
            rounded-lg border border-slate-800 bg-slate-900/50
            hover:border-red-500/30 hover:bg-red-500/10
            transition-all duration-300
        "
                            >
                                <FiX className="text-slate-400 group-hover:text-red-400 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* LEFT: CAROUSEL */}
                        <div className="hidden lg:block w-[400px] p-6">
                            <div className="rounded-2xl bg-dark/80 border border-white/10">
                                <div className="px-6 py-4 border-b border-white/10 flex justify-between">
                                    <div className="flex gap-3 items-center">
                                        <FiCamera className="text-emerald-400" />
                                        <h3 className="text-white font-bold">
                                            Visual Overview
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <img
                                        src={carouselImages[currentImageIndex]}
                                        alt={`${brand} ${model}`}
                                        className="mx-auto max-h-[300px] object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/images/ideal-20logic.png";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        {/* 2. CHANGE: Added 'ref' here and 'scroll-smooth'. This is the main scroll area. */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-6 scroll-smooth relative thin-scroll"
                        >
                            {/* STACKED CARD LAYOUT */}
                            <div className="space-y-4 mb-8">
                                <div className="bg-dark/50 rounded-2xl border border-white/10 p-6">
                                    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:items-center gap-6 lg:gap-8">
                                        <div className="lg:border-r border-white/10 lg:pr-8">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                                                {model}
                                            </p>
                                            <h1 className="text-3xl lg:text-4xl font-bold text-white break-words leading-tight">
                                                {brand}
                                            </h1>
                                        </div>
                                        <div className="text-left lg:text-right lg:min-w-[200px] pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                                            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">
                                                Total Package
                                            </div>
                                            <div className="text-4xl lg:text-5xl font-bold text-white">
                                                £{safePrice.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                            router.post(
                                                "/book/quote/new/install",
                                                {
                                                    boiler_id: product.id,
                                                    brand: product.brand,
                                                    model: product.model,
                                                    includes:
                                                        product.includes ?? [],
                                                    images:
                                                        product.images ?? [],
                                                    kw: product.kw,
                                                    warrantyYears:
                                                        product.warrantyYears,
                                                    price: finalPrice,
                                                    power: selectedPower,
                                                    answers: answers,
                                                }
                                            )
                                        }
                                    className="group relative cursor-pointer w-full flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-secondary/30 to-secondary/15 border border-secondary/20 hover:border-secondary/50 hover:from-secondary/30 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                >
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-secondary text-black shadow-lg shadow-secondary/20 shrink-0">
                                        <FiCalendar className="text-2xl" />
                                    </div>
                                    <div className="flex flex-col text-left flex-1 min-w-0">
                                        <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                                            Action
                                        </span>
                                        <span className="text-white font-bold text-xl">
                                            Book Now
                                        </span>
                                    </div>
                                    <FiArrowRight className="text-secondary group-hover:translate-x-1 transition-transform text-2xl shrink-0" />
                                </button>
                            </div>

                            {/* TABS */}
                            {/* 3. CHANGE: Removed the extra wrapper <div> that was causing the scroll issue. Passed ref directly. */}
                            <ProductTabs
                                containerRef={scrollContainerRef}
                                notes={detailsQuote.notes}
                                includes={detailsQuote.includes}
                                kw={detailsQuote.kw}
                                warranty={detailsQuote.warrantyYears}
                                brand={detailsQuote.brand}
                            />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
