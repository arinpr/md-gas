import React, { useEffect, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { PageHeader } from "@/Components/ui/page-header";

const pageTitle = "Get a Quote";

const SERVICE_KEYS = {
    REPAIR: "repair",
    NEW: "new",
    POWERFLUSH: "powerflush",
    SERVICE: "service",
};

const SERVICE_CONTENT = {
    [SERVICE_KEYS.REPAIR]: {
        slug: SERVICE_KEYS.REPAIR,
        heroTitle:
            "Fast boiler repair — same-day engineers, transparent pricing.",
        heroDesc:
            "Emergency diagnosis and on-site fixes. Fixed labour rates, clear parts pricing — we prioritise safety and speed.",
        badge: "Boiler Repair",
        sampleJobLabel: "Boiler Repair • £250",
        estimateLabel: "Typical fix",
        labour: "£120",
        parts: "£80",
        gaugeLabel: "Repair success",
        gaugeValueText: "82%",
        cta: "Get your personalised quote",
    },

    [SERVICE_KEYS.NEW]: {
        slug: SERVICE_KEYS.NEW,
        heroTitle: "New boiler installations — efficient, tested, guaranteed.",
        heroDesc:
            "Supply & install modern, high-efficiency boilers. Full removal, install, commissioning and certificates included.",
        badge: "New Boiler",
        sampleJobLabel: "New Boiler • From £1,200",
        estimateLabel: "Install estimate",
        labour: "£600",
        parts: "£600",
        gaugeLabel: "Install success",
        gaugeValueText: "95%",
        cta: "Get installation quote",
    },

    [SERVICE_KEYS.POWERFLUSH]: {
        slug: SERVICE_KEYS.POWERFLUSH,
        heroTitle: "Power flush — deep clean for radiators & pipework.",
        heroDesc:
            "Remove sludge and improve circulation to restore performance and reduce breakdowns. Ideal when radiators are cold or noisy.",
        badge: "Power Flush",
        sampleJobLabel: "Power Flush • From £180",
        estimateLabel: "System clean",
        labour: "£120",
        parts: "—",
        gaugeLabel: "Flow restored",
        gaugeValueText: "88%",
        cta: "Book a power flush",
    },

    [SERVICE_KEYS.SERVICE]: {
        slug: SERVICE_KEYS.SERVICE,
        heroTitle: "Annual boiler service — safety checks & reliability.",
        heroDesc:
            "Annual safety inspection, combustion check and preventative maintenance to keep your system efficient and safe.",
        badge: "Boiler Service",
        sampleJobLabel: "Boiler Service • From £65",
        estimateLabel: "Annual check",
        labour: "£65",
        parts: "—",
        gaugeLabel: "Pass rate",
        gaugeValueText: "99%",
        cta: "Schedule service",
    },
};

function getServiceFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get("service");
        if (q) return q.toLowerCase();
        const hash = (window.location.hash || "").replace("#", "");
        if (hash) return hash.toLowerCase();
    } catch (e) {}
    return SERVICE_KEYS.REPAIR;
}

export default function QuotePage() {
    const radius = 14;

    const [serviceKey, setServiceKey] = useState(() => {
        const s = getServiceFromUrl();
        return Object.values(SERVICE_KEYS).includes(s)
            ? s
            : SERVICE_KEYS.REPAIR;
    });

    useEffect(() => {
        function handleChange() {
            const s = getServiceFromUrl();
            setServiceKey(
                Object.values(SERVICE_KEYS).includes(s)
                    ? s
                    : SERVICE_KEYS.REPAIR
            );
        }

        window.addEventListener("popstate", handleChange);
        window.addEventListener("hashchange", handleChange);

        // in case SPA updates attributes without events
        const observer = new MutationObserver(handleChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-page"],
        });

        return () => {
            window.removeEventListener("popstate", handleChange);
            window.removeEventListener("hashchange", handleChange);
            observer.disconnect();
        };
    }, []);

    const content = useMemo(
        () =>
            SERVICE_CONTENT[serviceKey] || SERVICE_CONTENT[SERVICE_KEYS.REPAIR],
        [serviceKey]
    );

    const parseGaugePercent = (text) => {
        const n = parseInt(String(text || "").replace("%", ""), 10);
        return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) / 100 : 0.7;
    };

    const gaugePercent = parseGaugePercent(content.gaugeValueText);
    const circumference = 2 * Math.PI * radius;
    const dash = circumference * gaugePercent;
    const gap = Math.max(0, circumference - dash);

    return (
        <>
            <Head title="Get a Quote" />
            <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white text-slate-900">
                <PageHeader title={pageTitle} />

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 mt-16">
                    {/* HERO */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        {/* LEFT: copy */}
                        <div className="md:col-span-7">
                            <div className="max-w-2xl md:mx-0 mx-auto text-center md:text-left">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-dark px-3 py-1 rounded-full text-xs font-medium mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden
                                    >
                                        <path
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12h18"
                                        />
                                    </svg>
                                    {content.badge} quote
                                </div>

                                <h1 className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl line-clamp-2">
                                    {(() => {
                                        const words =
                                            content.heroTitle.split(" ");
                                        const firstTwo = words
                                            .slice(0, 2)
                                            .join(" ");
                                        const rest = words.slice(2).join(" ");

                                        return (
                                            <>
                                                <span className="text-primary">
                                                    {firstTwo}
                                                </span>{" "}
                                                <span className="text-dark">
                                                    {rest}
                                                </span>
                                            </>
                                        );
                                    })()}
                                </h1>

                                <p className="mt-4 text-base text-slate-600 max-w-prose">
                                    {content.heroDesc}
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
                                    <Link
                                        href={route(
                                            `book.quote.${content.slug}`
                                        )}
                                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary/80 via-primary/70 via-primary/40 to-secondary/20 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_8px_28px_rgba(23,42,68,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                                        aria-label={content.cta}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden
                                        >
                                            <path
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        {content.cta}
                                    </Link>

                                    <a
                                        href="#contact-expert"
                                        className="inline-flex items-center justify-center rounded-full border border-dark/70 bg-white px-4 py-3 text-sm font-medium text-slate-900"
                                    >
                                        Book a technician
                                    </a>
                                </div>

                                {/* ====== REPLACED: Review highlight + Trust features (was micro-stats) ====== */}
                                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                                    {/* review highlight */}

                                    {/* trust / features — boiler specific (moved up) */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
                                        {[
                                            {
                                                title: "Gas Safe certified",
                                                desc: "Qualified engineers for safe, compliant work.",
                                            },
                                            {
                                                title: "Transparent invoices",
                                                desc: "Clear breakdown of labour & parts.",
                                            },
                                            {
                                                title: "Parts warranty",
                                                desc: "Manufacturer-backed parts where applicable.",
                                            },
                                        ].map((f, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 items-start rounded-lg border border-dark/6  p-3"
                                            >
                                                <div className="h-9 w-9 flex-none rounded-md bg-primary grid place-items-center text-foreground">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        aria-hidden
                                                    >
                                                        <path
                                                            strokeWidth="1.4"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {f.title}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-1">
                                                        {f.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: refined, lighter card */}
                        <div className="md:col-span-5">
                            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 p-6 shadow-[0_18px_40px_rgba(6,34,20,0.06)]">
                                {/* header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-primary/10 p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden
                                            >
                                                <path
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 12h18"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="text-xs text-dark/60">
                                                {content.estimateLabel}
                                            </div>
                                            <div className="text-lg font-bold text-dark leading-tight">
                                                {content.sampleJobLabel}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs text-dark/60">
                                        Demo • No obligation
                                    </div>
                                </div>

                                {/* visual + gauge */}
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <div className="rounded-lg bg-white p-3 border border-white/30 flex items-center justify-center">
                                        <svg
                                            viewBox="0 0 220 140"
                                            className="w-full h-24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden
                                        >
                                            <defs>
                                                {/* Blue gradient */}
                                                <linearGradient
                                                    id="accentGrad2"
                                                    x1="0"
                                                    x2="1"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stopColor="#0067ff"
                                                        stopOpacity="0.85"
                                                    />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#0067ff40"
                                                        stopOpacity="0.65"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            {/* White card */}
                                            <rect
                                                x="20"
                                                y="62"
                                                width="180"
                                                height="44"
                                                rx="8"
                                                fill="#ffffff"
                                                stroke="#d9e2f1"
                                                strokeWidth="1"
                                            />

                                            {/* Top gradient shape */}
                                            <path
                                                d="M20 62 L110 20 L200 62 Z"
                                                fill="url(#accentGrad2)"
                                                opacity="0.95"
                                                stroke="#c7d8f5"
                                                strokeWidth="1"
                                            />
                                        </svg>
                                    </div>

                                    <div className="flex items-center justify-center sm:justify-end">
                                        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white/60 border border-white/30 p-2">
                                            <svg
                                                width="84"
                                                height="84"
                                                viewBox="0 0 36 36"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden
                                            >
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r={radius}
                                                    fill="none"
                                                    stroke="#f6fdf8"
                                                    strokeWidth="3"
                                                />
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r={radius}
                                                    fill="none"
                                                    stroke="url(#g3)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${dash.toFixed(
                                                        2
                                                    )} ${gap.toFixed(2)}`}
                                                    transform="rotate(-90 18 18)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="g3"
                                                        x1="0"
                                                        x2="1"
                                                    >
                                                        <stop
                                                            offset="0"
                                                            stopColor="#0067ff"
                                                        />
                                                        <stop
                                                            offset="1"
                                                            stopColor="#0067ff40"
                                                        />
                                                    </linearGradient>
                                                </defs>

                                                <text
                                                    x="18"
                                                    y="16.6"
                                                    textAnchor="middle"
                                                    fontSize="5"
                                                    fill="#065f46"
                                                    fontWeight="700"
                                                >
                                                    {content.gaugeValueText}
                                                </text>
                                                <text
                                                    x="18"
                                                    y="21.4"
                                                    textAnchor="middle"
                                                    fontSize="4"
                                                    fill="#065f46"
                                                >
                                                    {content.gaugeLabel}
                                                </text>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* cost row */}
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-md bg-white p-3 border border-gray-100 text-sm">
                                        <div className="text-xs text-slate-500">
                                            Labour
                                        </div>
                                        <div className="text-sm font-medium text-slate-900">
                                            {content.labour}
                                        </div>
                                    </div>

                                    <div className="rounded-md bg-white p-3 border border-gray-100 text-sm">
                                        <div className="text-xs text-slate-500">
                                            Parts
                                        </div>
                                        <div className="text-sm font-medium text-slate-900">
                                            {content.parts}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-5">
                                    <Link
                                        href={route(
                                            `book.quote.${content.slug}`
                                        )}
                                        className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-primary/80 via-primary/70 via-primary/40 to-secondary/20 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(23,42,68,0.12)] focus:outline-none "
                                    >
                                        {content.cta}
                                    </Link>
                                    <div className="mt-4 text-center text-xs text-slate-500">
                                        No obligation — booking in 2 mins
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <GoogleReviews /> */}
                </main>
            </div>
        </>
    );
}
