import { Link } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const services = [
    {
        id: "repair",
        title: "Boiler Repair",
        description: "Fixed £75 labour charge for all repairs. Fast, professional service to get your heating back on.",
        image: "/images/ideal-20logic.png",
        buttonText: "Book Repair",
        highlight: "£75 Fixed Labour",
        href: "/book/repair",
    },
    {
        id: "service",
        title: "Boiler Service",
        description: "Annual servicing from £75. Keep your boiler running efficiently and safely.",
        image: "/images/baxi-20-20any.webp",
        buttonText: "Book Service",
        highlight: "From £75",
        href: "/book/service",
    },
    {
        id: "quote",
        title: "New Boiler Quote",
        description: "Competitive pricing with £750+ margin over wholesale costs. Get your instant quote.",
        image: "/images/ideal-20atlantic.webp",
        buttonText: "Get Quote",
        highlight: "Instant Pricing",
        href: "/book/quote",
    },
    {
        id: "powerflush",
        title: "Power Flush",
        description: "Prices scale by radiator count. Remove sludge and restore system efficiency.",
        image: "/images/standard-20included-20filter.webp",
        buttonText: "Book Power Flush",
        highlight: "From £400",
        href: "/book/power-flush",
    },
]

export function ServiceCards() {
    return (
        <section id="services" className="bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Professional boiler services with transparent, competitive pricing
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <Card
                            key={service.id}
                            className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card"
                        >
                            <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                {service.highlight}
                            </div>

                            {/* Image container */}
                            <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    fill
                                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105 max-w-[180px] mx-auto"
                                />
                            </div>

                            <CardHeader className="pb-2 pt-4">
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="pt-2 pb-4">
                                <Button asChild className="w-full gap-2 transition-all group-hover:gap-3">
                                    <Link href={service.href}>
                                        {service.buttonText}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
