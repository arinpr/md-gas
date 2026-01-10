import { FcGoogle } from "react-icons/fc";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export function GoogleReview() {
    return (
        <div className="mt-20 flex justify-center">
            <a
                href="https://share.google/JhykkBzwvNl7jPnwU"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    group relative
                    flex items-center
                    rounded-2xl
                    px-6 py-4
                    bg-white
                    ring-1 ring-slate-200
                    shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]
                    transition-all duration-300 ease-out
                    hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.45)]
                    hover:ring-primary/40
                    hover:-translate-y-0.5
                    active:scale-[0.98]
                    cursor-pointer
                "
            >
                {/* Ambient glow */}
                <div
                    className="
                        pointer-events-none
                        absolute -inset-6 -z-10 rounded-full
                        bg-gradient-to-r from-blue-400/5 to-amber-400/5
                        opacity-0 blur-2xl transition-opacity duration-500
                        group-hover:opacity-100
                    "
                />

                <div className="relative flex items-center gap-5">
                    {/* Google */}
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex h-10 w-10 items-center justify-center
                                rounded-lg bg-white
                                ring-1 ring-slate-200
                                shadow-[0_8px_24px_-14px_rgba(0,0,0,0.25)]
                                transition-transform duration-300
                                group-hover:scale-[1.06]
                            "
                        >
                            <FcGoogle className="h-6 w-6" />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                                Rated on
                            </span>
                            <span className="text-[15px] font-semibold text-dark">
                                Google
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-7 w-px bg-secondary/40" />

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold text-slate-900">
                            4.5
                        </span>

                        <div className="flex items-center gap-0.5 text-amber-400/90">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-7 w-px bg-secondary/40" />

                    {/* Review count */}
                    <div
                        className="
                            rounded-full
                            bg-foreground
                            px-4 py-2
                            ring-1 ring-primary/20
                            transition-all duration-300
                            group-hover:ring-primary/40
                        "
                    >
                        <span className="text-sm text-slate-600">
                            <span className="font-semibold text-slate-900">
                                120+
                            </span>{" "}
                            reviews
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}
