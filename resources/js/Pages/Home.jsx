import Faq from "@/Components/boiler/Faq";
import { HeroSection } from "@/components/boiler/hero-section";
import { HomeTypesStrip } from "@/components/boiler/home-types-strip";
import { ServiceCards } from "@/components/boiler/service-cards";
import WhyChooseUs from "@/Components/boiler/WhyChooseUs";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* <Header/> */}
            <GuestLayout>
                <HeroSection />
                <HomeTypesStrip />
                <ServiceCards />
                <WhyChooseUs />
                <Faq />
            </GuestLayout>
            {/* <Footer /> */}
        </main>
    );
}
