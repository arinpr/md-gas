import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function FAQItem({ faq }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-slate-700/40">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
            >
                <span className="font-semibold text-white">{faq.question}</span>
                <span
                    className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/40 text-slate-300 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <MdKeyboardArrowDown />
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    open ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                }`}
            >
                <p className="text-slate-400 text-sm leading-relaxed pr-10">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
}
