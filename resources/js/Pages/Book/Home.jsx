import { useState } from "react";
import Header from "@/Components/boiler/header";
import { Footer } from "@/Components/boiler/footer";
import WhyChooseUs from "@/Components/boiler/WhyChooseUs";
import { ServiceCards } from "@/Components/boiler/service-cards";
import Faq from "@/Components/boiler/Faq";
import { Link } from "@inertiajs/react";

export default function Home() {
    const [postcode, setPostcode] = useState("");

    return (
        <>
            <Header />

            {/* ================= HERO ================= */}
            <section className="relative min-h-screen flex items-center justify-center bg-[#F7FAF9] px-4 overflow-hidden">
                {/* Abstract background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.3),transparent_45%)]" />

                <div className="relative max-w-4xl w-full text-center">
                    {/* Confidence label */}
                    <span className="inline-block mb-6 text-xs font-semibold tracking-widest text-primary uppercase">
                        Boiler installation, done properly
                    </span>

                    {/* Headline */}
                    <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                        Warmth, on your terms.
                    </h1>

                    {/* Subtext */}
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Get a fixed boiler price instantly. Installed by
                        certified engineers — often next day.
                    </p>

                    {/* Quote Panel (PRODUCT FEEL) */}
                    <div className="mt-12 bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-3 md:p-4 max-w-2xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                                placeholder="Enter your postcode"
                                className="flex-1 px-6 py-5 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 outline-none"
                            />

                            <Link
                                href={`/book/quote/new?postcode=${encodeURIComponent(
                                    postcode
                                )}`}
                                className={`px-8 py-5 rounded-2xl font-semibold transition flex items-center justify-center
                                ${
                                    postcode
                                        ? "bg-primary text-white"
                                        : "bg-slate-200 text-slate-500 pointer-events-none"
                                }`}
                            >
                                Get instant quote →
                            </Link>
                        </div>
                    </div>

                    {/* Trust */}
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
