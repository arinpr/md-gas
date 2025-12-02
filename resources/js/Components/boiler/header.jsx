
import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

// Icons (update based on your setup)
import { Flame, Phone, Menu, X } from "lucide-react";
import { Button } from "@/Components/ui/button"; // update if different

export default function Header({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">

            <header className="relative z-20 border-b border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <Flame className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">MD Gas</span>
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a
                            href="/#services"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Services
                        </a>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        <a
                            href="/#contact"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <img
                            src="/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png"
                            alt="Gas Safe Register"
                            width={40}
                            height={40}
                            className="hidden sm:block"
                        />

                        <Button size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            <span className="hidden sm:inline">Call Now</span>
                        </Button>

                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
                        <nav className="flex flex-col px-4 py-4 space-y-3">
                            <a
                                href="/#services"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </a>

                            <Link
                                href="/about"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>

                            <a
                                href="/#contact"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                )}
            </header>
            <main className="flex flex-1 flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="w-full max-w-md overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                    {children}
                </div>
            </main>

        </div>
    );
}

