import React from "react";
import {
    FiAward,
    FiHeart,
    FiTag,
    FiStar,
    FiShield,
    FiZap,
} from "react-icons/fi";

const BENEFITS = [
    {
        title: "Trusted installer.",
        description:
            "Accredited by leading industry bodies so you know your installation is in safe hands.",
        icon: FiAward,
        iconColor: "text-sky-400",
    },
    {
        title: "All-inclusive aftercare.",
        description:
            "Every installation comes with our workmanship guarantee and dedicated support.",
        icon: FiHeart,
        iconColor: "text-blue-400",
    },
    {
        title: "Price promise.",
        description:
            "If you find a genuine like-for-like quote that’s cheaper, we’ll match it. Simple.",
        icon: FiTag,
        iconColor: "text-violet-400",
    },
    {
        title: "5 star reviews.",
        description:
            "Thousands of verified 5★ reviews across platforms like Trustpilot and Google.",
        icon: FiStar,
        iconColor: "text-emerald-400",
    },
    {
        title: "We give back.",
        description:
            "For every energy-saving installation, we donate to carefully chosen charities.",
        icon: FiShield,
        iconColor: "text-pink-400",
    },
    {
        title: "A safe choice.",
        description:
            "Gas Safe registered engineers and fully certified for boiler and heating work.",
        icon: FiZap,
        iconColor: "text-amber-400",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative bg-dark/90 py-16 sm:py-20">
            {/* background fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
                {/* heading */}
                <header className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary bg-dark/30 px-3 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200">
                            Why choose us
                        </span>
                    </div>

                    <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                        Benefits that come as standard
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-slate-300/90">
                        Everything we do is built around peace of mind, clear
                        pricing and long-term support.
                    </p>
                </header>

                {/* cards grid */}
                <div className="mt-14 grid gap-6 md:grid-cols-2 items-stretch">
                    {BENEFITS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="
                                    relative flex h-full items-center gap-4 
                                    rounded-2xl border border-slate-800/80 
                                    bg-background/20
                                    p-5 sm:p-6 
                                    shadow-[0_10px_30px_rgba(0,0,0,0.4)] 
                                    backdrop-blur-md 
                                    transition-colors duration-300 
                                    hover:border-primary
                                "
                            >
                                {/* Accent bar that always matches card height */}
                                <span
                                    className="
                                        pointer-events-none
                                        absolute inset-y-2 left-0
                                        w-[3px]
                                        rounded-full 
                                        bg-primary
                                        shadow-[0_0_8px_rgba(56,189,248,0.45)]
                                    "
                                />

                                {/* Icon tile */}
                                <div className="mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950">
                                        <Icon
                                            className={`h-6 w-6 ${item.iconColor}`}
                                        />
                                    </div>
                                </div>

                                {/* Text area */}
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-sm sm:text-[15px] font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-[13px] sm:text-sm leading-relaxed text-slate-300/90">
                                        {item.description}
                                    </p>

                                    {/* filler to help equalize height */}
                                    <div className="flex-1" />
                                </div>
                            </article>
                        );
                    })}
                </div>

                <p className="mt-10 text-center text-xl text-foreground/80">
                    …so, why wouldn't you choose us?
                </p>
            </div>
        </section>
    );
}
