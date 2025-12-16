import React, { useMemo, useState } from "react";
import {
    FiCheck,
    FiChevronLeft,
    FiChevronRight,
    FiRefreshCcw,
    FiTool,
    FiHome,
    FiClock,
    FiStar,
} from "react-icons/fi";
import { PageHeader } from "../ui/page-header";

export default function Stepper({
    title = "Boiler Repair Quote",
    steps = [],
    basePrice = 0,
    currency = "£",
    onSubmit,
}) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const current = steps[index] || null;

    /* -------------------------------------------------------
       🔥 NORMALIZE OPTIONS (NO UI CHANGE)
    ------------------------------------------------------- */
    const displayOptions = useMemo(() => {
        if (!current?.options) return [];
        return current.options.map((opt) =>
            typeof opt === "string"
                ? { label: opt, price: 0 }
                : { label: opt.label, price: opt.price || 0 }
        );
    }, [current]);

    const answeredCount = Object.keys(answers).length;
    const progress = Math.round(
        (answeredCount / Math.max(1, steps.length)) * 100
    );

    const ICONS = [FiHome, FiTool, FiClock, FiStar];

    function choose(option) {
        if (!current) return;
        setAnswers((s) => ({ ...s, [current.id]: option }));
    }

    function next() {
        if (!answers[current?.id]) return;
        setIndex((i) => Math.min(steps.length - 1, i + 1));
    }

    function back() {
        setIndex((i) => Math.max(0, i - 1));
    }

    function restart() {
        setIndex(0);
        setAnswers({});
    }

    /* -------------------------------------------------------
       PRICE (same as current logic)
    ------------------------------------------------------- */
    const pricing = useMemo(() => {
        let extras = 0;
        Object.values(answers).forEach((opt) => {
            if (opt?.price) extras += opt.price;
        });
        return {
            base: basePrice,
            extras,
            total: basePrice + extras,
        };
    }, [answers, basePrice]);

    return (
        <>
            <div className="fixed inset-0 bg-light-grey -z-10"></div>
            <div className="min-h-screen bg-light-grey">
                <PageHeader />

                <div className="max-w-7xl mx-auto space-y-10 py-16 px-4 sm:px-6 lg:px-0">
                    {/* TITLE */}
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* LEFT: Title */}
                        <div>
                            <h1 className="text-4xl font-extrabold text-dark tracking-tight">
                                {title}
                            </h1>
                            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                                Answer a few quick questions to get a clear,
                                fixed-price estimate.
                            </p>
                        </div>

                        {/* RIGHT: Trust Rail */}
                        <div className="group relative flex items-center gap-4 px-5 py-3 rounded-2xl bg-white border border-primary/50 shadow-sm overflow-hidden">
                            {/* animated edge accent */}
                            <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary to-dark/90" />

                            {/* icon */}
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/80 text-foreground shrink-0">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                                    <path d="M9 12l2 2 4-4" />
                                </svg>
                            </div>

                            {/* text */}
                            <div className="leading-tight">
                                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                    Certified Engineers
                                </p>
                                <p className="text-sm font-semibold text-dark">
                                    Gas Safe Registered
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        {/* ================= LEFT ================= */}
                        <aside className="md:col-span-4 glass-dark p-8 rounded-3xl overflow-hidden h-full flex flex-col relative">
                            <div className="sheen absolute inset-0 pointer-events-none rounded-3xl" />

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-primary">
                                    Why choose us
                                </h3>

                                <button
                                    onClick={restart}
                                    className="inline-flex items-center gap-2 cursor-pointer text-xs bg-foreground text-dark px-3 py-1.5 rounded-full"
                                >
                                    <FiRefreshCcw /> Reset
                                </button>
                            </div>

                            <ul className="space-y-5 text-sm leading-relaxed text-foreground/90">
                                <li>✓ Certified & trusted engineers</li>
                                <li>✓ Transparent pricing</li>
                                <li>✓ Warranty included</li>
                            </ul>

                            {/* PRICE */}
                            <div className="mt-8 rounded-2xl bg-foreground p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Your price
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-dark">
                                    {currency}
                                    {pricing.total}
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Base {currency}
                                    {pricing.base}
                                    {pricing.extras > 0 && (
                                        <>
                                            {" "}
                                            • Extras +{currency}
                                            {pricing.extras}
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* PROGRESS */}
                            <div className="mt-auto pt-8">
                                <div className="text-xs text-foreground/70 mb-2">
                                    Progress
                                </div>
                                <div className="progress-track w-full rounded-full">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="mt-2 text-xs text-foreground/60">
                                    {answeredCount}/{steps.length} answered •{" "}
                                    {progress}%
                                </div>
                            </div>
                        </aside>

                        {/* ================= RIGHT ================= */}
                        <section className="md:col-span-8 h-full flex">
                            <div className="glass-root p-8 rounded-3xl w-full flex flex-col relative">
                                <div className="radial-highlight absolute inset-0 pointer-events-none" />

                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Question
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Step {index + 1} of {steps.length}
                                    </p>
                                </div>

                                <h2 className="text-2xl font-extrabold text-center text-dark mb-8">
                                    {current?.question}
                                </h2>

                                {/* 🔒 OPTION UI SAME AS OLD */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
                                    {displayOptions.map((opt, i) => {
                                        const active =
                                            answers[current?.id]?.label ===
                                            opt.label;
                                        const Icon = ICONS[i % ICONS.length];

                                        return (
                                            <div
                                                key={opt.label}
                                                className={`option-card ${
                                                    active
                                                        ? "option-active sheen"
                                                        : "option-inactive"
                                                }`}
                                            >
                                                <button
                                                    type="button"
                                                    className="p-4 rounded-2xl w-full cursor-pointer"
                                                    onClick={() => choose(opt)}
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div
                                                            className={`icon-wrap ${
                                                                active
                                                                    ? "icon-active"
                                                                    : "icon-inactive"
                                                            }`}
                                                        >
                                                            <Icon />
                                                        </div>

                                                        <div className="flex-1 flex flex-col items-start">
                                                            <p className="font-semibold text-dark">
                                                                {opt.label}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                                {active
                                                                    ? "Best choice for quick fix"
                                                                    : "Tap to select"}
                                                            </p>
                                                        </div>

                                                        {opt.price > 0 && (
                                                            <span className="text-xs text-muted-foreground">
                                                                +{currency}
                                                                {opt.price}
                                                            </span>
                                                        )}

                                                        {active && (
                                                            <FiCheck className="text-primary text-lg" />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* CONTROLS */}
                                <div className="mt-auto pt-10 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {answers[current?.id]
                                            ? `You chose: ${
                                                  answers[current.id].label
                                              }`
                                            : "Please choose an option"}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={back}
                                            disabled={index === 0}
                                            className={`btn-pill flex gap-1 items-center cursor-pointer ${
                                                index === 0
                                                    ? "btn-disabled"
                                                    : ""
                                            }`}
                                        >
                                            <FiChevronLeft /> Back
                                        </button>

                                        {index < steps.length - 1 ? (
                                            <button
                                                onClick={next}
                                                disabled={!answers[current?.id]}
                                                className={`btn-gloss flex gap-1 items-center cursor-pointer ${
                                                    !answers[current?.id]
                                                        ? "btn-disabled"
                                                        : ""
                                                }`}
                                            >
                                                Next <FiChevronRight />
                                            </button>
                                        ) : (
                                            <button className="btn-gloss flex gap-1 items-center cursor-pointer">
                                                Get Estimate <FiCheck />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
