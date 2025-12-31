import { useState } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";

import { Flame, Phone, Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";

// Icons (update based on your setup)
// import { Flame, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // update if different
import Header from "@/components/boiler/header";
import { Footer } from "@/components/boiler/footer";

export default function GuestLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col relative">
            <Header />

            {/* <main className="flex flex-1 flex-col items-center pt-6 sm:justify-center sm:pt-0"> */}
            {/* <div className="w-full max-w-md overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                    {children}
                </div> */}
            {children}
            {/* </main> */}

            {/* footer */}

            <Footer />
        </div>
    );
}
