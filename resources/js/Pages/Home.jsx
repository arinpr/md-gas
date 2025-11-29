import { HeroSection } from "@/components/boiler/hero-section"
import { HomeTypesStrip } from "@/components/boiler/home-types-strip"
import { ServiceCards } from "@/components/boiler/service-cards"
import { Footer } from "@/components/boiler/footer"

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <HomeTypesStrip />
            <ServiceCards />
            <Footer />
        </main>
    )
}
