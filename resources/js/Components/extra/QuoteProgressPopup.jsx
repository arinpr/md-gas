import { useEffect, useState, useMemo, useRef } from "react";
import {
    FiCheck,
    FiChevronRight,
    FiZap,
    FiClock,
    FiCpu,
    FiDollarSign,
} from "react-icons/fi";
import { router } from "@inertiajs/react";
import { buildBoilerQuote } from "@/lib/quoteEngine";
import { SERVICE_QUESTIONS } from "./boilerSteps";

export default function QuoteProcessingModal({
    open,
    answers,
    onComplete,
    onClose,
}) {
    const [activeStep, setActiveStep] = useState(0);
    const [waveOffset, setWaveOffset] = useState(0);
    const [energyLevels, setEnergyLevels] = useState([0, 0, 0]);
    const canvasRef = useRef(null);

    const [quote, setQuote] = useState(null);

    useEffect(() => {
        if (open) {
            console.log("MODAL RECEIVED ANSWERS:", answers);
            //const quote = buildNewBoilerQuote(answers, { margin: 0 }); // keep margin 0 unless you truly need it
            // localStorage.setItem("new_boiler_quote", JSON.stringify(quote));
            // console.log("Product Details & Quote", quote);
            const quote = buildBoilerQuote({
                answers,
                questions: SERVICE_QUESTIONS.new,
            });
            console.log("Generated Quote", quote);

            const postcode =
                answers?.details?.postcode ||
                new URLSearchParams(window.location.search).get("postcode") ||
                "";

            const quoteWithPostcode = {
                ...quote,
                inputs: {
                    ...(quote?.inputs || {}),
                    postcode,
                },
            };

            setQuote(quoteWithPostcode);

            // If you already have a boiler base price from selection:
            // const total = boilerBasePrice + addOnsTotal;
        }
    }, [open]);

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
                    if (i === activeStep) {
                        return Math.min(100, v + 2 + Math.random() * 3);
                    }
                    // slow decay instead of hard drop
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
        ctx.strokeStyle = step.waveColor
            .replace("rgb", "rgba")
            .replace(")", ",0.35)");
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

    if (!open) return null;

    const completed = activeStep >= steps.length;
    const currentStep = steps[activeStep] || steps[steps.length - 1];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl mx-4">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full rounded-3xl opacity-30"
                    width={900}
                    height={500}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 lg:p-0">
                    {/* LEFT PANEL */}
                    <div className="lg:col-span-2 bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
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

                        {/* ================= ENERGY BARS ================= */}
                        <div className="relative h-56 rounded-2xl bg-black/60 border border-white/10 mb-6 overflow-hidden">
                            {!completed ? (
                                <div className="absolute inset-0 flex items-end gap-4 p-4">
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
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
                                    <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                                        <FiCheck className="text-white w-7 h-7" />
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-white">
                                        All set — your quote is ready
                                    </h3>
                                    <p className="mt-1 text-[12px] text-gray-400 max-w-sm">
                                        We’ve checked everything and you’re good
                                        to go.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* STATUS CARD */}
                        <div className="bg-black/60 rounded-2xl p-6 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2">
                                {completed ? "Done" : "Working on it…"}
                            </p>
                            <h3 className="text-lg font-semibold text-white">
                                {currentStep.text}
                            </h3>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-3 flex flex-col h-full space-y-6">
                        <div className="flex-1 bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-5">
                                What we’re checking
                            </h3>

                            <div className="space-y-4">
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
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${active
                                                        ? "bg-foreground"
                                                        : done
                                                            ? "bg-primary"
                                                            : "bg-gray-800"
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                                                        <Icon
                                                            className="w-4 h-4 text-white shrink-0"
                                                            style={{
                                                                lineHeight: 1,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-[14px] font-semibold text-gray-400">
                                                        Step {i + 1}
                                                    </p>
                                                    <p className="text-[13px] text-white truncate">
                                                        {step.text}
                                                    </p>
                                                </div>

                                                {done && (
                                                    <FiCheck className="text-primary/90" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Almost there</span>
                                    <span>
                                        {Math.round(
                                            (activeStep / steps.length) * 100
                                        )}
                                        %
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-primary transition-all"
                                        style={{
                                            width: `${(activeStep / steps.length) *
                                                100
                                                }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {completed && (
                            <button
                                onClick={() => {
                                    if (!quote) return;

                                    router.post(`/book/quote/new/results`, quote,
                                        {
                                            preserveScroll: true,
                                        }
                                    );
                                }}
                                className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-white font-semibold flex items-center justify-between hover:opacity-90 transition cursor-pointer"
                            >
                                <span>View your quote</span>
                                <FiChevronRight />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= TEXT BUILDERS ================= */

function buildQuoteText(answers) {
    const flue = answers?.flue_type?.label;
    return `We’re preparing a quote for your boiler${flue ? ` with a ${flue.toLowerCase()}` : ""
        }`;
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
