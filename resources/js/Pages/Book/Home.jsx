
// import Faq from "@/Components/boiler/Faq";
import Faq from "@/Components/boiler/Faq";
import { Footer } from "@/Components/boiler/footer";
import Header from "@/Components/boiler/header";
import { ServiceCards } from "@/Components/boiler/service-cards";
import WhyChooseUs from "@/Components/boiler/WhyChooseUs";
import { HeroServices } from "@/Components/HeroService";
// import { ServiceCards } from "@/Components/boiler/service-cards";
// import WhyChooseUs from "@/Components/boiler/WhyChooseUs";
// import { HeroServices } from "@/Components/extra/HeroServices";
// import { GoogleReview } from "@/Components/GoogleReview";

export default function Home() {
    return (

        <>
            <Header
                textColor="text-white"
                buttonBg="bg-white"
                buttonText="text-black"
                navInactive="bg-white/20 text-white"
                navActive="bg-white text-black"

            />
            <section className="relative overflow-hidden bg-dark text-white pt-24 pb-32">

                {/* Soft gradient bloom */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

                {/* Left glow */}
                <div className="absolute -left-32 top-40 w-72 h-72 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none" />

                {/* Right glow */}
                <div className="absolute -right-20 top-56 w-80 h-80 bg-[var(--secondary)]/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* ---------------- LEFT SECTION ---------------- */}
                    <div className="md:col-span-7">

                        {/* Tag */}
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-[var(--secondary)] backdrop-blur-md shadow-sm">
                            New Offers
                        </span>

                        {/* Heading */}
                        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            Get a new boiler and <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                                win up to £5000 cash
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-lg text-gray-200 max-w-xl leading-relaxed">
                            Book a boiler installation before{" "}
                            <strong className="text-white">19th December</strong> and you'll receive
                            free tickets for our festive prize draw.
                        </p>

                        {/* Input + CTA */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
                            <input
                                placeholder="Enter postcode"
                                className="w-full sm:w-72 px-5 py-3.5 rounded-full bg-white/10 text-white placeholder:text-white/60 
              border border-white/20 focus:ring-4 focus:ring-[var(--primary)]/50 outline-none transition"
                            />

                            <button className="px-7 py-3.5 rounded-full font-semibold 
              bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
              hover:opacity-90 shadow-lg shadow-[var(--primary)]/20 transition transform hover:-translate-y-0.5">
                                Get quote →
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-gray-300">
                            Free prize draw ticket with every booking •{" "}
                            <span className="text-white font-semibold">T&Cs apply</span>
                        </p>
                    </div>
                    {/* ---------------- RIGHT CARD ---------------- */}
                    <div className="md:col-span-5 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-sm">
                            {/* Glowing background */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-[var(--primary)]/15 to-[var(--secondary)]/15 
                    blur-2xl rounded-3xl animate-pulse" />

                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
                    border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Header banner */}
                                <div className="bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30 
                    p-4 text-center">
                                    <p className="text-sm font-semibold text-white uppercase tracking-wider">
                                        🎉 Festive Special Offer 🎉
                                    </p>
                                </div>

                                {/* Main content */}
                                <div className="p-8">
                                    {/* Prize circle */}
                                    <div className="relative mx-auto w-48 h-48">
                                        <div className="absolute inset-0 border-4 border-transparent rounded-full 
                        bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                        animate-spin-slow" />
                                        <div className="absolute inset-2 bg-[var(--dark)] rounded-full 
                        flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-300 mb-2">Win Up To</p>
                                                <div className="text-5xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                           bg-clip-text text-transparent">
                                                    £5,000
                                                </div>
                                                <p className="text-gray-400 text-sm mt-2">Cash Prize</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features list */}
                                    <div className="mt-8 space-y-3">
                                        {[
                                            { icon: "✅", text: "Free prize draw entry" },
                                            { icon: "⚡", text: "Fast installation" },
                                            { icon: "🛡️", text: "Full warranty included" }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="text-gray-200">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <button className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                         text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                                        Enter Draw Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Floating soft circles */}
                <div className="pointer-events-none">
                    <div className="absolute left-10 bottom-20 w-24 h-24 rounded-full bg-[var(--primary)]/10 blur-xl animate-float" />
                    <div className="absolute right-10 bottom-10 w-28 h-28 rounded-full bg-[var(--secondary)]/10 blur-xl animate-float-slow" />
                </div>

                <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
             `}</style>

            </section>

            <div className=" relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-0 p-15  bg-light-grey">
                <div className="max-w-7xl mx-auto">
                    <HeroServices />
                </div>
                {/* <GoogleReview /> */}
            </div>

            <WhyChooseUs />
            <ServiceCards />


            <Faq />
            <Footer />
        </>
    )
}