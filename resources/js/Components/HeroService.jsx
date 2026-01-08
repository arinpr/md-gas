import { Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ArrowRight } from "lucide-react";

const services = [
    {
        id: "repair",
        title: "Boiler Repair",
        description: "Fast boiler repairs with fixed labour.",
        image: "/images/product_boiler.png",
        highlight: "instant booking",
        href: "/book/quote?service=repair",
        featured: true,
        theme: {
            hoverBg: "hover:bg-[#E5F1FF]",
            hoverBorder: "hover:border-[#2358FF]",
            labelBg: "bg-[#2358FF]",
            rippleColor: "text-[#7190F5]",
            arrowHoverBg: "group-hover:bg-[#2358FF]",
        },
    },
    {
        id: "service",
        title: "Boiler Service",
        description: "Annual service to keep your boiler safe.",
        image: "/images/product_boiler.png",
        highlight: "Yearly Service",
        href: "/book/quote?service=service",
        theme: {
            hoverBg: "hover:bg-[#FFECA9]",
            hoverBorder: "hover:border-[#FFC727]",
            labelBg: "bg-[#FFC727]",
            rippleColor: "text-[#FFC727]",
            arrowHoverBg: "group-hover:bg-[#2358FF]",
        },
    },
    {
        id: "quote",
        title: "New Boiler Quote",
        description: "Instant online quote for a new boiler.",
        image: "/images/product_boiler.png",
        highlight: "Instant Quote",
        href: "/book",

        theme: {
            hoverBg: "hover:bg-[#E6F9EC]",
            hoverBorder: "hover:border-[#17A44A]",
            labelBg: "bg-[#17A44A]",
            rippleColor: "text-[#17A44A]",
            arrowHoverBg: "group-hover:bg-[#2358FF]",
        },
    },
    {
        id: "powerflush",
        title: "Power Flush",
        description: "Deep clean for radiators and pipework.",
        image: "/images/product_boiler.png",
        highlight: "instant booking",
        href: "/book/quote?service=powerflush",
        theme: {
            hoverBg: "hover:bg-[#F3E9FF]",
            hoverBorder: "hover:border-[#8B4DFF]",
            labelBg: "bg-[#8B4DFF]",
            rippleColor: "text-[#8B4DFF]",
            arrowHoverBg: "group-hover:bg-[#2358FF]",
        },
    },
];

// SVG ripple using currentColor so we can tint it per card
function GlowRipple({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="203"
            height="205"
            viewBox="0 0 243 225"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <g opacity="0.2">
                <ellipse
                    cx="121.282"
                    cy="112.153"
                    rx="106.355"
                    ry="98.3498"
                    fill="currentColor"
                    fillOpacity="0.4"
                />
                <ellipse
                    cx="121.282"
                    cy="112.153"
                    rx="121.282"
                    ry="112.153"
                    fill="currentColor"
                    fillOpacity="0.2"
                />
                <ellipse
                    cx="121.283"
                    cy="112.154"
                    rx="94.0935"
                    ry="87.0113"
                    fill="currentColor"
                    fillOpacity="0.4"
                />
                <ellipse
                    cx="121.282"
                    cy="112.154"
                    rx="77.0341"
                    ry="71.2358"
                    fill="currentColor"
                    fillOpacity="0.6"
                />
            </g>
        </svg>
    );
}

export function HeroServices() {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
                <Card
                    key={service.id}
                    className={`group relative flex flex-col items-start overflow-hidden rounded-[30px]
    border-[3px]
    ${
        service.featured
            ? "border-[#2358FF] shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
            : "border-[#EFEFEF] shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
    }
    bg-white px-7 pt-7 pb-6
    transition-all duration-300
    hover:shadow-[0_24px_60px_rgba(15,23,42,0.35)]
    ${service.theme.hoverBg}
    ${service.theme.hoverBorder}`}
                >
                    {/* label pill */}
                    <div
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${service.theme.labelBg}`}
                    >
                        {service.highlight}
                    </div>

                    {/* image + ripple */}
                    <div className="relative mt-1 flex h-44 w-full items-center justify-center">
                        {/* ripple perfectly centered */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <GlowRipple
                                className={`${service.theme.rippleColor}`}
                            />
                        </div>

                        {/* image perfectly centered */}
                        <img
                            src={service.image}
                            alt={service.title}
                            className="relative z-10 max-h-32 object-contain mx-auto"
                        />
                    </div>

                    {/* text + round arrow bottom-right */}
                    <div className="flex items-end justify-between gap-4 mt-1">
                        <div>
                            <CardHeader className="p-0">
                                <CardTitle className="text-[18px] font-semibold text-slate-900">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className=" p-0">
                                <CardDescription className="text-[14px] leading-relaxed text-slate-600">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </div>

                        <Link href={service.href} className="shrink-0">
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:translate-x-1 ${service.theme.arrowHoverBg}`}
                            >
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    );
}
