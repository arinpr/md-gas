"use client";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

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
        a: "In many cases, we offer next-day installation depending on availability.",
    },
    {
        q: "Do you provide emergency boiler repairs?",
        a: "Yes, we provide same-day emergency boiler repair services.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const displayedFaqs = showAll ? FAQ_LIST : FAQ_LIST.slice(0, 5);

    return (
        <section className="bg-foreground py-20 rounded-b-[45px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                {/* Header */}
                <div className="mb-16 max-w-3xl">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Support
                    </span>
                    <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
                        Frequently asked questions
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="relative">
                    {/* Vertical rail */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

                    <div className="space-y-6">
                        {displayedFaqs.map((item, index) => {
                            const isOpen = openIndex === index;
                            const isNewItem = showAll && index >= 5;

                            return (
                                <div
                                    key={index}
                                    className="relative"
                                    style={
                                        isNewItem
                                            ? {
                                                  animation:
                                                      "faqFadeUp 0.45s ease-out forwards",
                                                  animationDelay: `${
                                                      (index - 5) * 70
                                                  }ms`,
                                              }
                                            : undefined
                                    }
                                >
                                    {/* Card */}
                                    <button
                                        onClick={() =>
                                            setOpenIndex(isOpen ? null : index)
                                        }
                                        className={`
                                            group relative w-full cursor-pointer
                                            border
                                            px-8 py-6 pl-14
                                            flex items-center justify-between
                                            text-left
                                            transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
                                            ${
                                                isOpen
                                                    ? "bg-slate-50/70 border-slate-300 shadow-[0_22px_50px_-30px_rgba(0,0,0,0.35)] translate-x-1"
                                                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        {/* Rail dot */}
                                        <span
                                            className={`
                                                absolute left-4 top-1/2 -translate-y-1/2
                                                h-3 w-3 rounded-full
                                                transition-all duration-300
                                                ${
                                                    isOpen
                                                        ? "bg-slate-900 ring-4 ring-slate-900/10"
                                                        : "bg-slate-300"
                                                }
                                            `}
                                        />

                                        {/* Question */}
                                        <span
                                            className={`
                                                text-lg transition-colors
                                                ${
                                                    isOpen
                                                        ? "font-semibold text-slate-900"
                                                        : "font-medium text-slate-800"
                                                }
                                            `}
                                        >
                                            {item.q}
                                        </span>

                                        {/* Chevron */}
                                        <span
                                            className={`
                                                flex h-9 w-9 items-center justify-center
                                                rounded-full
                                                transition-all duration-300
                                                ${
                                                    isOpen
                                                        ? "bg-slate-900 text-white rotate-180"
                                                        : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                                        >
                                            <IoChevronDown className="text-lg" />
                                        </span>
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`
                                            overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
                                            ${
                                                isOpen
                                                    ? "max-h-[200px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }
                                        `}
                                    >
                                        <div className="ml-14 mt-3 rounded-sm bg-white px-6 py-5 text-[15px] leading-relaxed text-slate-600 border border-slate-200 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View all / Show less */}
                <div className="mt-14 flex justify-center">
                    <button
                        onClick={() => {
                            setShowAll((prev) => !prev);
                            setOpenIndex(0);
                        }}
                        className="
                            inline-flex items-center gap-3 cursor-pointer
                            rounded-full
                            border border-slate-300
                            bg-white
                            px-6 py-3
                            text-sm font-semibold text-slate-900
                            transition-all duration-300
                            hover:border-slate-400 hover:shadow-md
                        "
                    >
                        {showAll ? "Show less questions" : "View all questions"}

                        <IoChevronDown
                            className={`transition-transform duration-300 ${
                                showAll ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
