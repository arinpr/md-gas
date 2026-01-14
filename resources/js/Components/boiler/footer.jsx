import { Link } from "@inertiajs/react";
import {
    Flame,
    Phone,
    Mail,
    MapPin,
    CheckCircle,
    Shield,
    Clock,
} from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative  text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">
                            Gas Safe Registered
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">
                            Fully Insured
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium">
                            24/7 Emergency
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <img
                                src="/footerLogo.png"
                                alt="MD Gas Logo"
                                className="h-22 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
                            Professional boiler services for homes across the
                            region. Gas Safe registered, fully insured, and
                            committed to excellence in every service we provide.
                        </p>
                        <div className="mt-6 flex gap-4">
                            {/* <a
                                href="tel:08001234567"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                <Phone className="h-4 w-4" />
                                <span className="font-medium">Call Now</span>
                            </a> */}
                            <a
                                href="mailto:info@mdgas.co.uk"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                <Mail className="h-4 w-4" />
                                <span className="font-medium">Email Us</span>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                {
                                    href: "/book/quote?service=repair",
                                    label: "Boiler Repair",
                                },
                                {
                                    href: "/book/quote?service=service",
                                    label: "Annual Servicing",
                                },
                                {
                                    href: "/book",
                                    label: "New Installations",
                                },
                                {
                                    href: "/book/quote?service=powerflush",
                                    label: "Power Flush",
                                },
                                // {
                                //     href: "/book/landlord",
                                //     label: "Landlord Certificates",
                                // },
                            ].map((service) => (
                                <li key={service.href}>
                                    <Link
                                        href={service.href}
                                        className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Contact Info
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                    <Phone className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">
                                        WhatsApp Chat
                                    </p>
                                    <a
                                        href="https://wa.me/447454796398"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        +44 7454 796398
                                    </a>


                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:Info@mdgasleeds.co.uk"
                                        className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        Info@mdgasleeds.co.uk
                                    </a>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">
                                        Service Area
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        Leeds &<br />
                                        Surrounding Areas
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Opening Hours
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-3 py-2 border-b border-white/10">
                                <span>Mon - Fri</span>
                                <span className="font-medium text-white">
                                    8:00 AM - 8:00 PM
                                </span>
                            </li>
                            <li className="flex items-center gap-3 py-2 border-b border-white/10">
                                <span>Saturday</span>
                                <span className="font-medium text-white">
                                    9:00 AM - 6:00 PM
                                </span>
                            </li>
                            <li className="flex items-center gap-3 py-2 border-b border-white/10">
                                <span>Sunday</span>
                                <span className="font-medium text-white">
                                    Emergency Only
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-gray-400">
                            © {currentYear} MD Gas, registered in England and
                            Wales under Company No. 636354. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link
                                href="/about"
                                className="text-sm text-gray-300 hover:text-white transition-colors hover:underline"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-gray-300 hover:text-white transition-colors hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-conditions"
                                className="text-sm text-gray-300 hover:text-white transition-colors hover:underline"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10 text-center text-xs text-gray-500">
                        <p>
                            MD Gas is registered with the Gas Safe Register (Gas
                            Safe ID: 636354). All work is carried out by fully
                            Gas Safe certified engineers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Add to your global CSS or Tailwind config */}
        </footer>
    );
}
