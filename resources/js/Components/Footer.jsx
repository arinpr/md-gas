import { Link } from "@inertiajs/react"

import { Flame, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
    return ( 
        
        <footer id="contact" className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Flame className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">MD Gas</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Professional boiler services for homes across the region. Gas Safe registered and fully insured.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">Services</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/book/repair" className="hover:text-foreground transition-colors">
                                    Boiler Repair
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/service" className="hover:text-foreground transition-colors">
                                    Annual Servicing
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/quote" className="hover:text-foreground transition-colors">
                                    New Installations
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/power-flush" className="hover:text-foreground transition-colors">
                                    Power Flush
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">Contact</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                0800 123 4567
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                info@mdgas.co.uk
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Greater London Area
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-foreground">Accreditations</h4>
                        <div className="flex flex-col gap-4">
                            <img
                                src="/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png"
                                alt="Gas Safe Register"
                                className="w-20 h-auto"
                            />
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">OFTEC</span>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    Which? Trusted
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-border pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MD Gas. All rights reserved.</p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-foreground transition-colors">
                                About Us
                            </Link>
                            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-conditions" className="hover:text-foreground transition-colors">
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
