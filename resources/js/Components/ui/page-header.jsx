import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Flame } from "lucide-react";

export function PageHeader({ title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/#services" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header className="border-b border-border">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Flame className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        MD Gas
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-4 md:flex">
                    <a
                        href="tel:08001234567"
                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                        <Phone className="h-4 w-4 text-primary" />
                        0800 123 4567
                    </a>

                    <Button asChild>
                        <Link href="/book/quote">Get Quote</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-border bg-background md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="mt-4 border-t border-border pt-4">
                            <a
                                href="tel:08001234567"
                                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground"
                            >
                                <Phone className="h-5 w-5 text-primary" />
                                0800 123 4567
                            </a>

                            <Button className="mt-2 w-full" asChild>
                                <Link href="/book/quote">Get Quote</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
