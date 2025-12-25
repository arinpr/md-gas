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
import AppointmentDateTimePicker from "./AppointmentDateTimePicker";
import { useEffect, useRef, useState, useMemo } from "react";
import QuoteProcessingModal from "./QuoteProgressPopup";

export default function Stepper({
    title = "Boiler Repair Quote",
    steps = [],
    basePrice = 0,
    currency = "£",
    onSubmit,
}) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownTriggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [openUpwards, setOpenUpwards] = useState(false);
    // const [showQuotePopup, setShowQuotePopup] = useState(false);
    const [showProcessing, setShowProcessing] = useState(false);

    const current = steps[index] || null;

    /* -------------------------------------------------------
       dropdown positioning
    ------------------------------------------------------- */

    useEffect(() => {
        if (!isDropdownOpen || !dropdownTriggerRef.current) return;

        const rect = dropdownTriggerRef.current.getBoundingClientRect();
        const dropdownHeight = 320;
        const viewportHeight = window.innerHeight;

        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        setOpenUpwards(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
    }, [isDropdownOpen]);

    /* -------------------------------------------------------
       normalize options
    ------------------------------------------------------- */
    const displayOptions = useMemo(() => {
        if (!current?.options) return [];
        return current.options.map((opt) =>
            typeof opt === "string"
                ? { label: opt }
                : {
                      label: opt.label,
                      requiresText: opt.requiresText || false,
                  }
        );
    }, [current]);

    const answeredCount = Object.keys(answers).length;
    const progress = Math.round(
        (answeredCount / Math.max(1, steps.length)) * 100
    );

    useEffect(() => {
        steps.forEach((step) => {
            if (step.preset && !answers[step.id]) {
                setAnswers((s) => ({
                    ...s,
                    [step.id]: step.preset,
                }));
            }
        });
    }, [steps]);

    /* -------------------------------------------------------
       handlers
    ------------------------------------------------------- */
    function choose(option) {
        if (!current) return;
        setAnswers((s) => ({
            ...s,
            [current.id]: {
                ...option,
                extraText: "",
            },
        }));
    }

    function updateText(value) {
        setAnswers((s) => ({
            ...s,
            [current.id]: {
                ...(s[current.id] || {}),
                value,
            },
        }));
    }

    function updateExtraText(value) {
        setAnswers((s) => ({
            ...s,
            [current.id]: {
                ...s[current.id],
                extraText: value,
            },
        }));
    }

    function next() {
        if (!canProceed) return;

        // if (index === steps.length - 1) {
        //     setShowQuotePopup(true);
        //     return;
        // }

        setIndex((i) => i + 1);
    }

    function back() {
        setIndex((i) => Math.max(0, i - 1));
    }

    function restart() {
        setIndex(0);
        setAnswers({});
    }

    /* -------------------------------------------------------
       pricing (BASE ONLY)
    ------------------------------------------------------- */
    const pricing = {
        base: basePrice,
    };

    /* -------------------------------------------------------
       can proceed logic
    ------------------------------------------------------- */
    const canProceed = useMemo(() => {
        if (!current) return false;

        const ans = answers[current.id];

        if (current.type === "upload") return true;

        if (current.type === "text") {
            return !!ans?.value?.trim();
        }

        if (current.type === "select") {
            if (!ans) return false;
            if (ans.requiresText) {
                return !!ans.extraText?.trim();
            }
            return true;
        }

        if (current.type === "dropdown") {
            return !!ans?.label;
        }

        if (current.type === "checkbox_quantity") {
            return true;
        }

        if (current.type === "details") {
            return (
                !!ans?.name?.trim() &&
                !!ans?.phone?.trim() &&
                !!ans?.email?.trim() &&
                !!ans?.postcode?.trim()
            );
        }

        if (current.type === "datetime") {
            return !!ans?.datetime?.date && !!ans?.datetime?.range;
        }

        return false;
    }, [current, answers]);

    return (
        <>
            <div className="fixed inset-0 bg-light-grey -z-10"></div>
            <div className="min-h-screen bg-light-grey overflow-hidden sm:overflow-auto">
                <PageHeader />

                <div className="max-w-7xl mx-auto space-y-10 py-16 px-4 sm:px-6 lg:px-0">
                    {/* TITLE */}
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-dark">
                                {title}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
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
                                    className="inline-flex items-center gap-2 text-xs bg-foreground text-dark px-3 py-1.5 rounded-full cursor-pointer"
                                >
                                    <FiRefreshCcw /> Reset
                                </button>
                            </div>

                            <ul className="space-y-5 text-sm text-foreground/90">
                                <li>✓ Certified & trusted engineers</li>
                                <li>✓ Transparent pricing</li>
                                <li>✓ Warranty included</li>
                            </ul>

                            {/* PRICE */}
                            <div className="mt-8 rounded-2xl bg-foreground p-4">
                                <p className="text-xs uppercase text-muted-foreground">
                                    Your price
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-dark">
                                    {currency}
                                    {pricing.base}
                                </p>

                                <p className="mt-2 text-xs text-muted-foreground">
                                    Fixed price · No hidden extras
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

                                {/* ========= TRV CHECKBOX + QUANTITY ========= */}
                                {current?.type === "checkbox_quantity" && (
                                    <div className="max-w-2xl mx-auto w-full">
                                        <div
                                            className={`flex items-center justify-between rounded-2xl border px-6 py-5 transition ${
                                                answers[current.id]?.enabled
                                                    ? "border-primary bg-primary/5"
                                                    : "border-dark/20 bg-white"
                                            }`}
                                        >
                                            <label className="flex items-center gap-4 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        answers[current.id]
                                                            ?.enabled || false
                                                    }
                                                    onChange={(e) => {
                                                        const enabled =
                                                            e.target.checked;

                                                        setAnswers((s) => ({
                                                            ...s,
                                                            [current.id]:
                                                                enabled
                                                                    ? {
                                                                          enabled: true,
                                                                          qty: 1,
                                                                          unitPrice:
                                                                              current.price,
                                                                          price: current.price,
                                                                      }
                                                                    : {
                                                                          enabled: false,
                                                                          qty: 0,
                                                                          unitPrice:
                                                                              current.price,
                                                                          price: 0,
                                                                      },
                                                        }));
                                                    }}
                                                    className="h-5 w-5 accent-primary"
                                                />

                                                <div>
                                                    <p className="text-lg font-semibold text-dark">
                                                        {current.label}
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Quantity controls */}
                                        {/* {answers[current.id]?.enabled && (
                                            <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 border px-6 py-4">
                                                <span className="text-sm text-muted-foreground">
                                                    Quantity
                                                </span>

                                                <div className="flex items-center gap-4">
                                                    
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setAnswers((s) => {
                                                                const qty =
                                                                    Math.max(
                                                                        1,
                                                                        s[
                                                                            current
                                                                                .id
                                                                        ].qty -
                                                                            1
                                                                    );

                                                                return {
                                                                    ...s,
                                                                    [current.id]:
                                                                        {
                                                                            ...s[
                                                                                current
                                                                                    .id
                                                                            ],
                                                                            qty,
                                                                            price:
                                                                                qty *
                                                                                s[
                                                                                    current
                                                                                        .id
                                                                                ]
                                                                                    .unitPrice,
                                                                        },
                                                                };
                                                            })
                                                        }
                                                        className="h-10 w-10 rounded-full border flex items-center justify-center text-lg font-bold"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="text-lg font-semibold">
                                                        {
                                                            answers[current.id]
                                                                .qty
                                                        }
                                                    </span>

                                                    
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setAnswers((s) => {
                                                                const qty =
                                                                    s[
                                                                        current
                                                                            .id
                                                                    ].qty + 1;

                                                                return {
                                                                    ...s,
                                                                    [current.id]:
                                                                        {
                                                                            ...s[
                                                                                current
                                                                                    .id
                                                                            ],
                                                                            qty,
                                                                            price:
                                                                                qty *
                                                                                s[
                                                                                    current
                                                                                        .id
                                                                                ]
                                                                                    .unitPrice,
                                                                        },
                                                                };
                                                            })
                                                        }
                                                        className="h-10 w-10 rounded-full border flex items-center justify-center text-lg font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                )}

                                {/* photo upload */}

                                {current?.type === "upload" && (
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-4xl">
                                            <label className="group flex w-full cursor-pointer items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 transition hover:border-primary hover:bg-white">
                                                {/* Hidden input */}
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*,video/*"
                                                    onChange={(e) =>
                                                        setAnswers((s) => ({
                                                            ...s,
                                                            [current.id]:
                                                                Array.from(
                                                                    e.target
                                                                        .files
                                                                ),
                                                        }))
                                                    }
                                                    className="sr-only"
                                                />

                                                {/* Icon */}
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 16v-8m0 0l-4 4m4-4l4 4" />
                                                        <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1" />
                                                    </svg>
                                                </div>

                                                {/* Content */}
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-semibold text-dark">
                                                        Upload photos or videos
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        Optional, but helpful
                                                        for diagnosis
                                                    </p>
                                                </div>

                                                {/* Action */}
                                                <div className="ml-auto rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-dark transition group-hover:border-primary group-hover:text-primary">
                                                    Choose files
                                                </div>
                                            </label>

                                            {/* Helper */}
                                            <p className="mt-2 text-xs text-slate-400">
                                                JPG, PNG, MP4 supported
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* ========= TEXT INPUT ========= */}
                                {current?.type === "text" && (
                                    <div className="max-w-xl mx-auto w-full">
                                        <input
                                            type="text"
                                            placeholder={current.placeholder}
                                            value={
                                                answers[current.id]?.value || ""
                                            }
                                            onChange={(e) =>
                                                updateText(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-dark/20 px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                )}

                                {/* dropdown */}

                                {current?.type === "dropdown" && (
                                    <div className="max-w-2xl mx-auto w-full overflow-x-clip">
                                        <div className="relative">
                                            <button
                                                ref={dropdownTriggerRef}
                                                type="button"
                                                onClick={() =>
                                                    setIsDropdownOpen((s) => !s)
                                                }
                                                className={`
                    w-full px-5 py-4 bg-white border-2 rounded-xl
                    flex items-center justify-between text-left
                    transition-all duration-200
                    ${isDropdownOpen ? "border-blue-500" : "border-gray-200"}
                `}
                                            >
                                                {answers[current.id] ? (
                                                    <div className="flex items-center justify-between w-full pr-2">
                                                        <div className="min-w-0">
                                                            <div className="text-lg font-semibold text-gray-900 truncate">
                                                                {
                                                                    answers[
                                                                        current
                                                                            .id
                                                                    ].label
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-1 truncate">
                                                                System size
                                                                based pricing
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 ml-4">
                                                            <span className="text-xl font-bold text-gray-900">
                                                                £
                                                                {
                                                                    answers[
                                                                        current
                                                                            .id
                                                                    ].price
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-lg">
                                                        Select an option...
                                                    </span>
                                                )}
                                            </button>

                                            {isDropdownOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className={`absolute inset-x-0 z-50 ${
                                                        openUpwards
                                                            ? "bottom-full mb-2"
                                                            : "top-full mt-2"
                                                    }`}
                                                >
                                                    <div className="bg-white border-2 border-dark/20 rounded-xl overflow-hidden">
                                                        <div className="max-h-80 overflow-y-auto">
                                                            {current.options.map(
                                                                (opt) => (
                                                                    <button
                                                                        key={
                                                                            opt.value
                                                                        }
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setAnswers(
                                                                                (
                                                                                    s
                                                                                ) => ({
                                                                                    ...s,
                                                                                    [current.id]:
                                                                                        opt,
                                                                                })
                                                                            );
                                                                            setIsDropdownOpen(
                                                                                false
                                                                            );
                                                                        }}
                                                                        className="w-full px-5 py-4 text-left hover:bg-gray-50 flex justify-between"
                                                                    >
                                                                        <span className="font-semibold">
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </span>
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ========= Customer Details ========= */}
                                {current?.type === "details" && (
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-4xl px-2">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {[
                                                    {
                                                        key: "name",
                                                        label: "Full name",
                                                    },
                                                    {
                                                        key: "phone",
                                                        label: "Phone number",
                                                    },
                                                    {
                                                        key: "email",
                                                        label: "Email address",
                                                    },
                                                    {
                                                        key: "postcode",
                                                        label: "Postcode",
                                                    },
                                                ].map(({ key, label }) => (
                                                    <div
                                                        key={key}
                                                        className="relative"
                                                    >
                                                        <label className="absolute -top-2 left-5 z-10 bg-white px-1 text-xs font-medium text-slate-500">
                                                            {label}
                                                        </label>

                                                        <input
                                                            value={
                                                                answers[
                                                                    current.id
                                                                ]?.[key] || ""
                                                            }
                                                            onChange={(e) =>
                                                                setAnswers(
                                                                    (s) => ({
                                                                        ...s,
                                                                        [current.id]:
                                                                            {
                                                                                ...s[
                                                                                    current
                                                                                        .id
                                                                                ],
                                                                                [key]: e
                                                                                    .target
                                                                                    .value,
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            className="w-full rounded-2xl border border-dark/20 bg-white px-5 py-4 text-sm text-dark
                                   focus:border-primary focus:ring-1 focus:ring-primary/10
                                   transition"
                                                        />
                                                    </div>
                                                ))}

                                                {/* Address */}
                                                <div className="relative sm:col-span-2">
                                                    <label className="absolute -top-2 left-5 z-10 bg-white px-1 text-xs font-medium text-slate-500">
                                                        Address (optional)
                                                    </label>

                                                    <input
                                                        className="w-full rounded-2xl border border-dark/20 bg-white px-5 py-4 text-sm text-dark
                               focus:border-primary focus:ring-1 focus:ring-primary/10
                               transition"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ========= Date Time ========= */}

                                {current?.type === "datetime" && (
                                    <div className="">
                                        <AppointmentDateTimePicker
                                            value={
                                                answers[current.id]?.datetime ||
                                                null
                                            }
                                            onChange={(date) =>
                                                setAnswers((s) => ({
                                                    ...s,
                                                    [current.id]: {
                                                        ...s[current.id],
                                                        datetime: date,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                )}

                                {/* ========= SELECT OPTIONS ========= */}
                                {current?.type === "select" && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
                                            {displayOptions.map((opt, i) => {
                                                const active =
                                                    answers[current?.id]
                                                        ?.label === opt.label;
                                                // const Icon =
                                                //     ICONS[i % ICONS.length];

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
                                                            onClick={() =>
                                                                choose(opt)
                                                            }
                                                        >
                                                            <div className="flex items-center gap-5">
                                                                <div
                                                                    className={`radial-dot ${
                                                                        active
                                                                            ? "radial-dot-active"
                                                                            : "radial-dot-inactive"
                                                                    }`}
                                                                >
                                                                    <span className="radial-dot-core" />
                                                                </div>

                                                                <div className="flex-1 text-left flex gap-4">
                                                                    <div>
                                                                        <p className="font-semibold text-dark">
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </p>
                                                                        <p className="text-xs text-muted-foreground mt-0.5">
                                                                            {active
                                                                                ? "Best choice"
                                                                                : "Tap to select"}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {active && (
                                                                    <FiCheck className="text-primary text-lg" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {answers[current?.id]?.requiresText && (
                                            <div className="max-w-lg mx-auto mt-6 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Please provide details"
                                                    value={
                                                        answers[current.id]
                                                            ?.extraText || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateExtraText(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-dark/20 px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* CONTROLS */}
                                <div className="mt-auto pt-10 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {answers[current?.id]
                                            ? "Answer recorded"
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

                                        <button
                                            onClick={() => {
                                                if (
                                                    index ===
                                                    steps.length - 1
                                                ) {
                                                    setShowProcessing(true);
                                                } else {
                                                    next();
                                                }
                                            }}
                                            disabled={!canProceed}
                                            className={`btn-gloss flex gap-1 items-center ${
                                                !canProceed
                                                    ? "btn-disabled"
                                                    : ""
                                            }`}
                                        >
                                            Next <FiChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <QuoteProcessingModal
                open={showProcessing}
                // answers={answers}
                onComplete={() => {
                    setShowProcessing(false);
                    // later → navigate to results page
                    // console.log("READY TO SHOW QUOTES", answers);
                }}
                onClose={() => setShowProcessing(false)}
            />
        </>
    );
}
