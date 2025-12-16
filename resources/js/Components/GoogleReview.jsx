import { FcGoogle } from "react-icons/fc";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


export function GoogleReview() {
    return (
        <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm">
                {/* Google Icon */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <FcGoogle className="h-5 w-5" />
                </div>

                {/* Text + Rating */}
                <div className="flex flex-col items-start">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                        Google Reviews
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                            4.5 / 5
                        </span>

                        <span className="flex items-center gap-0.5 text-amber-400">
                            <FaStar className="h-4 w-4" />
                            <FaStar className="h-4 w-4" />
                            <FaStar className="h-4 w-4" />
                            <FaStar className="h-4 w-4" />
                            <FaStarHalfAlt className="h-4 w-4" />
                        </span>

                        <span className="text-[11px] text-slate-500">
                            120+ reviews
                        </span>
                    </div>
                </div>
            </div>
        </div>


    );
}