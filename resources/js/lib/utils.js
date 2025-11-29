// resources/js/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes safely.
 * Usage: cn("px-4", condition && "bg-red-500")
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
