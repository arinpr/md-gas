import {
    MessageCircleMore,
    Touchpad,
    Hammer,
    CheckCircle2,
} from "lucide-react";

export function ServiceCards() {
    const steps = [
        {
            title: "You answer",
            description:
                "Tell us a few simple details about your home and current boiler setup.",
            icon: MessageCircleMore,
            badge: "Start here",
            step: "STEP 01",
        },
        {
            title: "You pick",
            description:
                "Choose your preferred boiler and package from fixed, transparent pricing.",
            icon: Touchpad,
            badge: "Choose",
            step: "STEP 02",
        },
        {
            title: "We fit",
            description:
                "Your chosen boiler is installed by a trusted, local Gas Safe engineer.",
            icon: Hammer,
            badge: "Installation",
            step: "STEP 03",
        },
    ];

    return (
        <section className="relative overflow-hidden rounded-t-[45px] bg-gradient-to-b from-[#F4F7FB] via-[#F3F6FB] to-[#EEF3FA] py-16 sm:py-24">
            {/* soft background blobs */}
            <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-[#fde5cf] blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-5">
                        {/* heading */}
                        <div className="max-w-3xl">
                            <h2 className="text-3xl sm:text-4xl font-[500] tracking-tight text-dark leading-10">
                                Get a{" "}
                                <span className="font-bold font-marcellus text-primary text-[42px]">
                                    clear online quote
                                </span>
                                ,
                                <br className="hidden sm:block" />
                                <span className="inline-block">
                                    with no pressure or obligation.
                                </span>
                            </h2>
                            <p className="mt-3 text-lg text-dark/70">
                                Straightforward pricing and a simple online
                                process from start to finish.
                            </p>
                        </div>

                        {/* STEP CARDS + CENTER LINE */}
                        <div className="relative mt-3">
                            {/* horizontal line behind cards (desktop only) */}
                            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-[1px] -translate-y-1/2 bg-primary/70 sm:block" />

                            <div className="relative grid gap-4 sm:grid-cols-3">
                                {steps.map((step) => {
                                    const Icon = step.icon;
                                    return (
                                        <article
                                            key={step.title}
                                            className="relative z-[1] flex h-full flex-col rounded-[24px] border border-white/70 bg-white/90 px-4 py-5 sm:px-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-white"
                                        >
                                            {/* top row: icon + badge */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.55)]">
                                                        <Icon
                                                            className="h-5 w-5 text-white"
                                                            strokeWidth={2.2}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="inline-flex rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                                                    {step.badge}
                                                </span>
                                            </div>

                                            {/* title + description */}
                                            <h3 className="mt-4 text-[18px] font-semibold text-dark">
                                                {step.title}
                                            </h3>
                                            <p className="mt-1.5 text-[14px] leading-relaxed text-dark/70">
                                                {step.description}
                                            </p>

                                            {/* footer: centered pill + short line */}
                                            <div className="mt-4 flex items-center justify-start gap-3">
                                                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-[5px] text-[11px] font-medium tracking-[0.16em] text-slate-600 uppercase">
                                                    {step.step}
                                                </span>
                                                <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: FULL-HEIGHT INFO CARD */}
                    <div className="relative h-full">
                        <div className="relative flex h-full flex-col rounded-[30px] border border-dashed border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                            {/* top-right badge */}
                            <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Online, start to finish
                            </div>

                            {/* make inner content fill height to avoid empty bottom */}
                            <div className="mt-8 flex h-full flex-col gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-[15px] font-semibold uppercase tracking-[0.2em] text-dark/60">
                                        Three simple steps
                                    </h3>
                                    <p className="text-[17px] leading-relaxed text-dark">
                                        From first click to a fully-installed
                                        boiler, everything happens online with
                                        clear pricing and no pushy home visit.
                                    </p>

                                    <ul className="mt-4 space-y-3 text-[16px] text-dark">
                                        <li className="flex gap-2">
                                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>
                                                Instant fixed-price quote.
                                            </span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/80" />
                                            <span>
                                                Pick your boiler and date.
                                            </span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/60" />
                                            <span>
                                                Gas Safe engineer fits it
                                                on-site.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* chips pinned towards bottom to fill space nicely */}
                                <div className="flex flex-wrap gap-3 text-[15px] text-foreground">
                                    <span className="rounded-full bg-dark px-3.5 py-1.5">
                                        No sales visit
                                    </span>
                                    <span className="rounded-full bg-dark px-3.5 py-1.5">
                                        Done in minutes
                                    </span>
                                </div>

                                {/* <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
