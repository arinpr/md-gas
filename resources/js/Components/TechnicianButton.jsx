import { Link } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";



export function TechnicianButton() {
    return (
        <Link
    href="#contact-expert"
    className="group/secondary inline-flex items-center justify-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-7 py-4 text-sm font-medium text-slate-900 hover:border-primary/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-[1.02]"
>
    <span>Book a technician</span>

    <FaWhatsapp
        className="h-5 w-5 text-slate-500 group-hover/secondary:text-primary transition-colors"
    />
</Link>
    );
}
