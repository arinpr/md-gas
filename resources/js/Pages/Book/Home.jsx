import { useMemo, useState } from "react";
import Header from "@/Components/boiler/header";
import { Footer } from "@/Components/boiler/footer";
import WhyChooseUs from "@/Components/boiler/WhyChooseUs";
import { ServiceCards } from "@/Components/boiler/service-cards";
import Faq from "@/Components/boiler/Faq";
import { Link, router } from "@inertiajs/react";

const UK_POSTCODE_RE =
    /^(GIR\s?0AA|(?:(?:[A-PR-UWYZ][0-9]{1,2})|(?:[A-PR-UWYZ][A-HK-Y][0-9]{1,2})|(?:[A-PR-UWYZ][0-9][A-HJKPSTUW])|(?:[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

function normalizeUkPostcode(input) {
    const raw = String(input || "")
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, ""); // strip spaces/symbols

    if (raw.length <= 3) return raw;
    // insert a space before last 3 chars
    return `${raw.slice(0, -3)} ${raw.slice(-3)}`.trim();
}

function isValidUkPostcode(value) {
    const v = String(value || "").trim().toUpperCase();
    return UK_POSTCODE_RE.test(v);
}

export default function Home() {
    const [postcode, setPostcode] = useState("");
    const [touched, setTouched] = useState(false);

    const normalized = useMemo(() => normalizeUkPostcode(postcode), [postcode]);
    const valid = useMemo(() => isValidUkPostcode(normalized), [normalized]);

    const submit = () => {
        if (!valid) {
            setTouched(true);
            return;
        }

        // Option A (recommended): router visit so Enter works without relying on <Link>
        router.visit(`/book/quote/new?postcode=${encodeURIComponent(normalized)}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Header />

            {/* ================= HERO ================= */}
            <section className="relative min-h-screen flex items-center justify-center bg-[#F7FAF9] px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.3),transparent_45%)]" />

                <div className="relative max-w-4xl w-full text-center">
                    <span className="inline-block mb-6 text-xs font-semibold tracking-widest text-primary uppercase">
                        Boiler installation, done properly
                    </span>

                    <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                        Warmth, on your terms.
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Get a fixed boiler price instantly. Installed by certified engineers — often next day.
                    </p>

                    {/* Quote Panel */}
                    <div className="mt-12 bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-3 md:p-4 max-w-2xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <input
                                    value={normalized}
                                    onChange={(e) => {
                                        setTouched(true);
                                        setPostcode(e.target.value);
                                    }}
                                    onBlur={() => setTouched(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            submit();
                                        }
                                    }}
                                    placeholder="Enter your postcode (e.g. SW1A 1AA)"
                                    className={[
                                        "w-full px-6 py-5 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition",
                                        touched && !valid ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-slate-200",
                                    ].join(" ")}
                                    inputMode="text"
                                    autoComplete="postal-code"
                                    spellCheck={false}
                                />

                                {touched && normalized && !valid ? (
                                    <div className="mt-2 text-left text-sm text-red-600 font-semibold">
                                        Please enter a valid UK postcode.
                                    </div>
                                ) : (
                                    <div className="mt-2 text-left text-xs text-slate-500">
                                        Tip: We’ll use this to check availability and pricing in your area.
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={submit}
                                className={[
                                    "px-8 py-5 rounded-2xl font-semibold transition flex items-center justify-center",
                                    valid ? "bg-primary text-white hover:opacity-95" : "bg-slate-200 text-slate-500 cursor-not-allowed",
                                ].join(" ")}
                                disabled={!valid}
                            >
                                Get instant quote →
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-sm text-slate-500">
                        Fixed pricing · No obligation · 0% finance available
                    </div>
                </div>
            </section>

            <WhyChooseUs />
            <ServiceCards />
            <Faq />
            <Footer />
        </>
    );
}
