"use client";

import { useRef, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const FAQ_LIST = [
    {
        q: "Who are MD Gas?",
        a: "MD Gas is a trusted home heating specialist providing boiler installations, repairs, servicing, and energy-efficient heating solutions across the region.",
    },
    {
        q: "Do you offer finance options for boiler installations?",
        a: "Yes, we offer flexible finance plans to help you spread the cost of your boiler installation easily and affordably.",
    },
    {
        q: "What services does MD Gas provide?",
        a: "We provide boiler installation, servicing, repairs, central heating upgrades, smart thermostat setup, and emergency call-outs.",
    },
    {
        q: "Who carries out the installation?",
        a: "All installations are completed by fully qualified Gas Safe registered engineers with years of professional experience.",
    },
    {
        q: "Are my payments and purchases protected?",
        a: "Yes, all installations and products come with full protection, warranties, and transparent pricing.",
    },
    {
        q: "How quickly can you install a new boiler?",
        a: "In many cases, we offer next-day installation depending on engineer availability and your location.",
    },
    {
        q: "Do you provide emergency boiler repairs?",
        a: "Yes, we provide urgent same-day repair services for breakdowns and heating emergencies.",
    },
    {
        q: "What warranties do you offer?",
        a: "We offer manufacturer warranties up to 10 years depending on the boiler model you choose.",
    },
    {
        q: "Do you install smart thermostats?",
        a: "Yes, we install major smart thermostats such as Hive, Nest, and Tado for superior energy control.",
    },
    {
        q: "Can I get a quote online?",
        a: "Absolutely. You can receive an instant fixed-price quote online without needing a home visit.",
    },
    {
        q: "Are your engineers Gas Safe certified?",
        a: "Yes, all MD Gas engineers are Gas Safe registered and fully qualified.",
    },
    {
        q: "Do you offer annual boiler servicing?",
        a: "Yes, we offer affordable annual servicing to keep your boiler safe, efficient, and under warranty.",
    },
    {
        q: "Can you upgrade radiators or heating systems?",
        a: "Yes, we provide full central heating upgrades including radiators, pipework, pumps, and valves.",
    },
    {
        q: "What areas do you cover?",
        a: "We cover a wide service area—contact us or enter your postcode online to confirm availability.",
    },
    {
        q: "How do I book an installation?",
        a: "You can book directly online or speak to our team for support with selecting a boiler.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const sectionRef = useRef(null);

    const displayedFaqs = showAll ? FAQ_LIST : FAQ_LIST.slice(0, 5);

    const scrollToSectionTop = () => {
        if (!sectionRef.current) return;
        const offsetTop = sectionRef.current.offsetTop - 80; // adjust if header exists
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    };

    const handleViewAll = () => {
        setShowAll(true);
        scrollToSectionTop();
    };

    const handleShowLess = () => {
        setShowAll(false);
        setOpenIndex(0);
        scrollToSectionTop();
    };

    return (
        <section
            ref={sectionRef}
            className="bg-foreground text-white py-20 px-6 sm:px-10 rounded-b-[45px]"
        >
            <div className="max-w-7xl mx-auto">
                {/* Sticky header */}
                <div className="flex justify-between items-center mb-10 z-20 bg-foreground pt-4 pb-6">
                    <h2 className="text-4xl sm:text-5xl font-bold text-dark">
                        FAQ’s
                    </h2>

                    {!showAll && (
                        <button
                            onClick={handleViewAll}
                            className="bg-dark text-foreground px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 cursor-pointer"
                        >
                            View all <IoChevronDown className="text-base" />
                        </button>
                    )}
                </div>

                {/* Accordion */}
                <div className="space-y-6">
                    {displayedFaqs.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border-b border-dark/60 pb-3"
                            >
                                <button
                                    className="w-full flex justify-between items-center text-left"
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                >
                                    <span className="text-lg font-semibold text-dark">
                                        {item.q}
                                    </span>

                                    {isOpen ? (
                                        <IoChevronUp className="text-xl text-dark" />
                                    ) : (
                                        <IoChevronDown className="text-xl text-dark" />
                                    )}
                                </button>

                                {/* Smooth expand / collapse */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? "max-h-[300px] mt-3 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p className="text-[15px] text-dark leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show less */}
                {showAll && (
                    <div className="text-center mt-10">
                        <button
                            onClick={handleShowLess}
                            className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold"
                        >
                            Show less
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
