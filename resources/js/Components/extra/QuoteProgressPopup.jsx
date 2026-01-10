import { useEffect, useState, useMemo, useRef } from "react";
import {
    FiCheck,
    FiChevronRight,
    FiZap,
    FiClock,
    FiCpu,
    FiDollarSign,
    FiX,
} from "react-icons/fi";
import { router } from "@inertiajs/react";
import { buildBoilerQuote } from "@/lib/quoteEngine";
import { SERVICE_QUESTIONS } from "./boilerSteps";

export default function QuoteProcessingModal({ open, answers, onComplete, onClose }) {
    const [activeStep, setActiveStep] = useState(0);
    const [waveOffset, setWaveOffset] = useState(0);
    const [energyLevels, setEnergyLevels] = useState([0, 0, 0]);
    const canvasRef = useRef(null);

    const [quote, setQuote] = useState(null);

    useEffect(() => {
        if (!open) return;

        const q = buildBoilerQuote({
            answers,
            questions: SERVICE_QUESTIONS.new,
        });

        console.log("Built quote:", q);

        const postcode =
            answers?.details?.postcode ||
            new URLSearchParams(window.location.search).get("postcode") ||
            "";

        setQuote({
            ...q,
            inputs: { ...(q?.inputs || {}), postcode },
        });
    }, [open, answers]);

    const steps = useMemo(
        () => [
            {
                id: 1,
                text: buildQuoteText(answers),
                icon: FiZap,
                frequency: 120,
                waveColor: "rgb(0, 200, 255)",
            },
            {
                id: 2,
                text: buildCompatibilityText(answers),
                icon: FiCpu,
                frequency: 180,
                waveColor: "rgb(200, 100, 255)",
            },
            {
                id: 3,
                text: "Finalising your price",
                icon: FiDollarSign,
                frequency: 240,
                waveColor: "rgb(100, 255, 100)",
            },
        ],
        [answers]
    );

    /* ================= ANIMATIONS ================= */

    useEffect(() => {
        if (!open) return;

        let raf;
        let start;

        const animate = (t) => {
            if (!start) start = t;
            setWaveOffset(((t - start) * 0.001) % 1);
            raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);

        const energyInterval = setInterval(() => {
            setEnergyLevels((prev) =>
                prev.map((v, i) => {
                    if (i === activeStep) return Math.min(100, v + 2 + Math.random() * 3);
                    return Math.max(15, v - 1.5);
                })
            );
        }, 120);

        return () => {
            cancelAnimationFrame(raf);
            clearInterval(energyInterval);
        };
    }, [open, activeStep]);

    useEffect(() => {
        if (!canvasRef.current || !open) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const step = steps[activeStep];
        if (!step) return;

        ctx.beginPath();
        ctx.strokeStyle = step.waveColor.replace("rgb", "rgba").replace(")", ",0.35)");
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x++) {
            const y =
                canvas.height / 2 +
                Math.sin((x + waveOffset * canvas.width) * 0.02) * 40;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.stroke();
    }, [waveOffset, activeStep, steps, open]);

    useEffect(() => {
        if (!open) {
            setActiveStep(0);
            setEnergyLevels([0, 0, 0]);
            return;
        }

        if (activeStep >= steps.length) return;

        const timer = setTimeout(() => setActiveStep((s) => s + 1), 2400);
        return () => clearTimeout(timer);
    }, [open, activeStep, steps.length]);

    // Prevent background scroll on mobile while modal open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    const completed = activeStep >= steps.length;
    const currentStep = steps[Math.min(activeStep, steps.length - 1)];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            {/* Layout: mobile = full-height sheet with sticky footer, desktop = centered card */}
            <div className="h-[100dvh] w-full flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div className="relative w-full sm:max-w-5xl">
                    {/* Card / Sheet */}
                    <div className="relative bg-black/40 sm:bg-transparent">
                        {/* Canvas (hidden on small screens to avoid overflow + performance) */}
                        <canvas
                            ref={canvasRef}
                            className="hidden sm:block absolute inset-0 w-full h-full rounded-3xl opacity-30 pointer-events-none"
                            width={900}
                            height={500}
                        />

                        {/* Wrapper with sticky footer on mobile */}
                        <div className="relative w-full h-[100dvh] sm:h-auto sm:rounded-3xl sm:overflow-hidden">
                            {/* Header bar for mobile (close button) */}
                            <div className="sm:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                                        <FiClock className="text-white w-5 h-5" />
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-[13px] font-bold text-white">Preparing your quote</p>
                                        <p className="text-[11px] text-gray-400">Please wait…</p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white"
                                    aria-label="Close"
                                >
                                    <FiX />
                                </button>
                            </div>

                            {/* Content area: scrollable on mobile */}
                            <div className="px-4 pb-24 sm:pb-4 sm:px-0 sm:grid sm:grid-cols-1 lg:grid-cols-5 sm:gap-6 sm:p-4 lg:p-0 overflow-y-auto sm:overflow-visible h-[85dvh] sm:h-auto">
                                {/* LEFT PANEL */}
                                <div className="lg:col-span-2 bg-black/55 backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-8 mt-4 sm:mt-0">
                                    {/* Desktop Header */}
                                    <div className="hidden sm:flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                                                <FiClock className="text-white w-6 h-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-[18px] font-bold text-white">
                                                    Preparing your quote
                                                </h2>
                                                <p className="text-[14px] text-gray-400">
                                                    Just a moment while we check everything
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ENERGY BARS */}
                                    <div className="relative h-40 sm:h-56 rounded-2xl bg-black/60 border border-white/10 mb-5 sm:mb-6 overflow-hidden">
                                        {!completed ? (
                                            <div className="absolute inset-0 flex items-end gap-3 p-4">
                                                {energyLevels.map((v, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 rounded-t-lg transition-[height] duration-700 ease-out"
                                                        style={{
                                                            height: `${v}%`,
                                                            background: steps[i]?.waveColor,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in px-4">
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 flex items-center justify-center mb-3 sm:mb-4">
                                                    <FiCheck className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                                                </div>
                                                <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">
                                                    All set — your quote is ready
                                                </h3>
                                                <p className="mt-1 text-[12px] text-gray-400 max-w-sm">
                                                    We’ve checked everything and you’re good to go.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* STATUS CARD */}
                                    <div className="bg-black/60 rounded-2xl p-5 sm:p-6 border border-white/10">
                                        <p className="text-[11px] sm:text-xs text-gray-400 mb-2">
                                            {completed ? "Done" : "Working on it…"}
                                        </p>

                                        {/* prevent text overflow on mobile */}
                                        <h3 className="text-[15px] sm:text-lg font-semibold text-white break-words">
                                            {currentStep?.text}
                                        </h3>
                                    </div>
                                </div>

                                {/* RIGHT PANEL */}
                                <div className="lg:col-span-3 flex flex-col space-y-6 mt-4 sm:mt-0">
                                    <div className="flex-1 bg-black/55 backdrop-blur-xl rounded-3xl border border-white/10 p-5 sm:p-6">
                                        <h3 className="text-[16px] sm:text-lg font-semibold text-white mb-4 sm:mb-5">
                                            What we’re checking
                                        </h3>

                                        <div className="space-y-3 sm:space-y-4">
                                            {steps.map((step, i) => {
                                                const Icon = step.icon;
                                                const active = i === activeStep;
                                                const done = i < activeStep;

                                                return (
                                                    <div
                                                        key={step.id}
                                                        className={`rounded-xl p-4 border transition ${active
                                                            ? "border-cyan-400/40 bg-white/10"
                                                            : done
                                                                ? "border-primary/90/30 bg-primary/90/10"
                                                                : "border-white/5 bg-white/5"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-foreground" : done ? "bg-primary" : "bg-gray-800"
                                                                    }`}
                                                            >
                                                                <Icon className="w-4 h-4 text-white" />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[12px] sm:text-[14px] font-semibold text-gray-400">
                                                                    Step {i + 1}
                                                                </p>
                                                                {/* clamp to avoid overflow on mobile */}
                                                                <p className="text-[13px] text-white line-clamp-2">
                                                                    {step.text}
                                                                </p>
                                                            </div>

                                                            {done && <FiCheck className="text-primary/90 shrink-0" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-6">
                                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                                <span>Almost there</span>
                                                <span>{Math.round((activeStep / steps.length) * 100)}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-primary transition-all"
                                                    style={{
                                                        width: `${(activeStep / steps.length) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop button (kept here for desktop layout) */}
                                    {completed && (
                                        <button
                                            onClick={() => {
                                                if (!quote) return;
                                                router.post(`/book/quote/new/results`, quote, { preserveScroll: true });
                                            }}
                                            className="hidden sm:flex w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-white font-semibold items-center justify-between hover:opacity-90 transition cursor-pointer"
                                        >
                                            <span>View your quote</span>
                                            <FiChevronRight />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Sticky footer button on mobile: always visible, no scroll needed */}
                            {completed && (
                                <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-black/70 backdrop-blur-xl border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            if (!quote) return;
                                            router.post(`/book/quote/new/results`, quote, { preserveScroll: true });
                                        }}
                                        className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-white font-semibold flex items-center justify-between hover:opacity-90 transition cursor-pointer"
                                    >
                                        <span className="truncate">View your quote</span>
                                        <FiChevronRight />
                                    </button>
                                </div>
                            )}

                            {/* Desktop close (optional) */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="hidden sm:flex absolute top-4 right-4 h-11 w-11 rounded-2xl bg-white/10 border border-white/10 items-center justify-center text-white hover:bg-white/15 transition"
                                aria-label="Close"
                            >
                                <FiX />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= TEXT BUILDERS ================= */

function buildQuoteText(answers) {
    const flue = answers?.flue_type?.label;
    return `We’re preparing a quote for your boiler${flue ? ` with a ${flue.toLowerCase()}` : ""}`;
}

function buildCompatibilityText(answers) {
    const rads = answers?.radiator_count?.label;
    const baths = answers?.bathrooms?.label;

    const info = [];
    if (rads) info.push(`${rads.toLowerCase()} radiators`);
    if (baths) info.push(`${baths.toLowerCase()} bathrooms`);

    return info.length
        ? `Making sure everything suits your home (${info.join(", ")})`
        : "Making sure everything suits your home";
}
