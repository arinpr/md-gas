import { Link } from "@inertiajs/react";
import { Flame, MessageSquare, ChevronRight } from "lucide-react";

/**
 * Slim, modern header using lucide-react icons.
 * - Logo left
 * - Slim contact bar right (MessageSquare icon + chevron)
 * - Online status blink on the right side of the chat element
 */
export function PageHeader() {
    const waHref = "https://wa.me/441234567890"; // replace with your number
    const waNumber = "0330 113 1333";

    return (
        <header className="border border-b-dark/15">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                <div className="flex h-[75px] items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        aria-label="MD Gas home"
                    >
                        <div
                            className="h-10 w-10 rounded-md flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            <Flame className="h-5 w-5 text-light-background" />
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-dark leading-none">
                                MD Gas
                            </span>
                        </div>
                    </Link>

                    {/* Slim contact bar (relative so status-blink can be positioned) */}
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="slim-bar relative inline-flex items-center rounded-md px-3 pr-8 py-1.5 gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,103,255,0.16)]"
                        aria-label={`Chat on WhatsApp ${waNumber}`}
                    >
                        {/* icon tile */}
                        <span
                            className="icon-square inline-flex items-center justify-center h-8 w-8 rounded-sm"
                            style={{
                                background: "rgba(0,103,255,0.06)",
                                border: "1px solid rgba(0,103,255,0.06)",
                            }}
                        >
                            <MessageSquare className="h-4 w-4 text-primary" />
                        </span>

                        {/* divider */}
                        <span className="divider hidden sm:block" aria-hidden />

                        {/* label (hidden on very small screens) */}
                        <span className="hidden sm:block text-xs text-dark">
                            Chat
                        </span>

                        {/* phone/text */}
                        <span className="text-sm font-bold text-dark">
                            {waNumber}
                        </span>

                        {/* chevron */}
                        <span
                            className="chev hidden sm:inline-flex items-center justify-center h-6 w-6 rounded-sm"
                            aria-hidden
                        >
                            <ChevronRight className="h-4 w-4 text-dark" />
                        </span>

                        {/* --- ONLINE STATUS: on the RIGHT side of the chat card --- */}
                        <span
                            className="status-blink"
                            aria-hidden="true"
                            title="Online"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
}
