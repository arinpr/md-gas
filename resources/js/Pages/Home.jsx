import { HeroSection } from "@/components/boiler/hero-section"
import { HomeTypesStrip } from "@/components/boiler/home-types-strip"
import { ServiceCards } from "@/components/boiler/service-cards"
import GuestLayout from "@/Layouts/GuestLayout"

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            {/* <Header/> */}
            <GuestLayout>
                <HeroSection />
                <HomeTypesStrip />
                <ServiceCards />
            </GuestLayout>


            {/* <Footer /> */}
        </main>
    )
}



