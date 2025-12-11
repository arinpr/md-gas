import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, usePage, Head, useForm, router, createInertiaApp } from "@inertiajs/react";
import { useState, useEffect, forwardRef, useRef, useImperativeHandle, useMemo, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Flame, Phone, X, Menu, ArrowRight, Shield, Award, Users, Clock, CheckCircle2, Mail, MapPin, Check, Droplets, ArrowLeft, FileText, Calculator, ChevronDownIcon, CheckIcon, ChevronUpIcon, Wrench, Upload, Settings, Home as Home$1, Building2, Castle, Building, MessageCircleMore, Touchpad, Hammer } from "lucide-react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiAward, FiHeart, FiTag, FiStar, FiShield, FiZap } from "react-icons/fi";
import createServer from "@inertiajs/server";
import { renderToString } from "react-dom/server";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function PageHeader({ title }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
    /* @__PURE__ */ jsxs("nav", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Flame, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-foreground", children: "MD Gas" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-8 md:flex", children: navigation.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          href: item.href,
          className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          children: item.name
        },
        item.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
        /* @__PURE__ */ jsxs("a", { href: "tel:08001234567", className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-primary" }),
          "0800 123 4567"
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/book/quote", children: "Get Quote" }) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1 px-4 py-4", children: [
      navigation.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          href: item.href,
          className: "block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
          onClick: () => setMobileMenuOpen(false),
          children: item.name
        },
        item.name
      )),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:08001234567",
            className: "flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground",
            children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-primary" }),
              "0800 123 4567"
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { className: "mt-2 w-full", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/book/quote", children: "Get Quote" }) })
      ] })
    ] }) })
  ] });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const MEGA_SECTIONS = {
  services: [
    {
      title: "Boiler installation",
      description: "Efficient new boiler installations tailored to your home.",
      href: "/#services"
    },
    {
      title: "Boiler repair & servicing",
      description: "Fast, reliable repairs and annual servicing for peace of mind.",
      href: "/#services"
    },
    {
      title: "Gas safety certificates",
      description: "Landlord & homeowner gas safety checks and certificates.",
      href: "/#services"
    }
  ],
  about: [
    {
      title: "Why choose MD Gas?",
      description: "Experienced, friendly engineers with a focus on safety and quality.",
      href: "/#about"
    },
    {
      title: "Our qualifications",
      description: "Fully Gas Safe registered and compliant with UK regulations.",
      href: "/#about"
    },
    {
      title: "Our service areas",
      description: "Reliable boiler services across your local surrounding areas.",
      href: "/#about"
    }
  ],
  contact: [
    {
      title: "Request a call back",
      description: "Leave your details and we’ll get back to you as soon as possible.",
      href: "/#contact"
    },
    {
      title: "Emergency support",
      description: "24/7 emergency boiler breakdown and gas leak assistance.",
      href: "/#contact"
    },
    {
      title: "Free quote",
      description: "Tell us about your boiler needs and get a no-obligation quote.",
      href: "/#contact"
    }
  ]
};
const NAV_ITEMS = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const isMegaOpen = !!openMenu;
  const toggleMenu = (id) => {
    setOpenMenu((prev) => prev === id ? null : id);
  };
  const closeMega = () => setOpenMenu(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMega();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const currentCards = openMenu ? MEGA_SECTIONS[openMenu] : [];
  return /* @__PURE__ */ jsx("header", { className: "absolute top-4 w-full z-50", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-2 lg:px-6", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/",
          className: "flex items-center gap-2",
          onClick: closeMega,
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-dark", children: /* @__PURE__ */ jsx(Flame, { className: "h-6 w-6 text-foreground" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-dark", children: "MD Gas" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("nav", { className: "hidden flex-1 items-center justify-center gap-3 md:flex z-50", children: NAV_ITEMS.map((item) => {
        const active = openMenu === item.id;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => toggleMenu(item.id),
            className: `rounded-full px-6 py-2 text-sm font-medium transition shadow-sm cursor-pointer
                                        ${active ? "bg-black text-white shadow-md" : "bg-white/80 text-slate-800 hover:bg-white"}`,
            children: item.label
          },
          item.id
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png",
            alt: "Gas Safe Register",
            width: 32,
            height: 32,
            className: "hidden sm:block",
            onClick: closeMega
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "md",
            className: "hidden gap-2 rounded-full bg-dark px-4 py-2 text-sm font-medium cursor-pointer text-foreground hover:bg-dark/60 transition-colors duration-200 sm:flex",
            onClick: closeMega,
            children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Call now" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "md:hidden rounded-full p-2 text-slate-700 hover:bg-white/60",
            onClick: () => {
              setMobileMenuOpen((open) => !open);
              closeMega();
            },
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
          }
        )
      ] })
    ] }),
    isMegaOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-20 bg-black/60 backdrop-blur-[1px]",
        onClick: closeMega
      }
    ),
    isMegaOpen && /* @__PURE__ */ jsx("div", { className: "pointer-events-auto hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 z-30 w-full max-w-3xl -translate-x-1/2 px-4 pb-6 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-3xl bg-white shadow-xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-8 !pt-20", children: currentCards.map((card) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: card.href,
        onClick: closeMega,
        className: "group flex flex-col justify-between rounded-2xl bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:bg-slate-100 hover:shadow-md",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-base font-semibold text-slate-900", children: card.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: card.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition group-hover:translate-x-1", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }) }) })
        ]
      },
      card.title
    )) }) }) }) }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-2 px-4 py-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/#services",
          className: "rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
          onClick: () => setMobileMenuOpen(false),
          children: "Services"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/about",
          className: "rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
          onClick: () => setMobileMenuOpen(false),
          children: "About"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/#contact",
          className: "rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
          onClick: () => setMobileMenuOpen(false),
          children: "Contact"
        }
      )
    ] }) })
  ] }) });
}
const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "All our engineers are Gas Safe registered and undergo regular training to ensure the highest safety standards."
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description: "We take pride in our work and guarantee all repairs and installations with comprehensive warranties."
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We provide clear communication and transparent pricing on every job."
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "We show up on time, every time. Our punctuality and professionalism set us apart from the competition."
  }
];
const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "10,000+", label: "Jobs Completed" },
  { value: "24/7", label: "Emergency Support" }
];
function AboutPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "About Us";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Header, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl", children: "About MD Gas" }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-muted-foreground", children: "For over 15 years, MD Gas has been providing expert boiler services to homeowners across Greater London. Our team of Gas Safe registered engineers is committed to delivering safe, reliable, and affordable heating solutions." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-card py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-8 sm:grid-cols-4", children: stats.map((stat) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-primary sm:text-4xl", children: stat.value }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: stat.label })
            ]
          },
          stat.label
        )) }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground sm:text-3xl", children: "Our Story" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4 text-muted-foreground", children: [
              /* @__PURE__ */ jsx("p", { children: "MD Gas was founded with a simple mission: to provide honest, reliable boiler services at fair prices. What started as a one-man operation has grown into a trusted team of skilled engineers serving thousands of homes across the Greater London area." }),
              /* @__PURE__ */ jsx("p", { children: "Over the years, we've built our reputation on transparency, quality workmanship, and exceptional customer service. We believe in doing the job right the first time, and our fixed pricing means you'll never face unexpected costs." }),
              /* @__PURE__ */ jsx("p", { children: "Today, MD Gas continues to grow while maintaining the personal touch and attention to detail that our customers have come to expect. Whether you need an emergency repair or a full boiler installation, we're here to help." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-2xl bg-muted", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/professional-gas-engineer-working-on-boiler.jpg",
                alt: "MD Gas engineer at work",
                className: "h-full w-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-xl", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: "15+" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Years Experience" })
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "bg-muted/50 py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground sm:text-3xl", children: "Our Values" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "The principles that guide everything we do" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: values.map((value) => /* @__PURE__ */ jsx(
            Card,
            {
              className: "text-center",
              children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-8 pb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(value.icon, { className: "h-7 w-7 text-primary" }) }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: value.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: value.description })
              ] })
            },
            value.title
          )) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Accreditations & Certifications" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "We maintain the highest industry standards" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-8", children: [
            "Gas Safe Registered",
            "OFTEC Certified",
            "Which? Trusted Trader",
            "Checkatrade Verified"
          ].map((cert) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-4",
              children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: cert })
              ]
            },
            cert
          )) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "bg-primary py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-primary-foreground sm:text-3xl", children: "Ready to Get Started?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-primary-foreground/80", children: "Contact us today for a free quote or to book a service" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/book/quote", children: "Get a Quote" }) }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "gap-2 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                  "0800 123 4567"
                ]
              }
            )
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutPage
}, Symbol.toStringTag, { value: "Module" }));
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-700 ` + className,
      children: value ? value : children
    }
  );
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));
  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className,
      ref: localRef
    }
  );
});
function ApplicationLogo({ className = "", alt = "Logo", ...props }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/assets/logo.png",
      alt,
      className: `select-none ${className}`,
      loading: "lazy",
      decoding: "async",
      ...props
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { id: "contact", className: "", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Flame, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-foreground", children: "MD Gas" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-foreground/70", children: "Professional boiler services for homes across the region. Gas Safe registered and fully insured." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 font-semibold text-foreground", children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-foreground/70", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/book/repair",
              className: "hover:text-foreground transition-colors",
              children: "Boiler Repair"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/book/service",
              className: "hover:text-foreground transition-colors",
              children: "Annual Servicing"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/book/quote",
              className: "hover:text-foreground transition-colors",
              children: "New Installations"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/book/power-flush",
              className: "hover:text-foreground transition-colors",
              children: "Power Flush"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 font-semibold text-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-foreground/70", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-primary" }),
            "0800 123 4567"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-primary" }),
            "info@mdgas.co.uk"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            "Greater London Area"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 font-semibold text-foreground", children: "Accreditations" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/511-5113277-gas-safe-register-logo-symbol-gas-safe-logo.png",
              alt: "Gas Safe Register",
              className: "w-20 h-auto"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: "OFTEC" }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: "Which? Trusted" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 border-t border-border pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-foreground/70", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " MD Gas. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-sm text-foreground/70", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/about",
            className: "hover:text-foreground transition-colors",
            children: "About Us"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/privacy-policy",
            className: "hover:text-foreground transition-colors",
            children: "Privacy Policy"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/terms-conditions",
            className: "hover:text-foreground transition-colors",
            children: "Terms & Conditions"
          }
        )
      ] })
    ] }) })
  ] }) });
}
function GuestLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col relative", children: [
    /* @__PURE__ */ jsx(Header, {}),
    children,
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex justify-center items-center bg-gray-100 px-4", children: [
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md bg-white shadow-xl rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Flame, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "MD Gas" })
      ] }) }),
      status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              value: data.email,
              className: "mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600",
              onChange: (e) => setData("email", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              value: data.password,
              className: "mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600",
              onChange: (e) => setData("password", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              name: "remember",
              checked: data.remember,
              onChange: (e) => setData("remember", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          canResetPassword && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("password.request"),
              className: "text-sm text-blue-600 hover:underline",
              children: "Forgot Password?"
            }
          ),
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Log In" })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function FormStepper({ steps: steps2, currentStep, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-5 left-0 right-0 h-0.5 bg-border" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 ease-out",
          style: {
            width: `${currentStep / (steps2.length - 1) * 100}%`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-between", children: steps2.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : isCurrent ? "border-primary bg-background text-primary shadow-md shadow-primary/20" : "border-border bg-background text-muted-foreground"
              ),
              children: isCompleted ? /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: index + 1 })
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "mt-2 text-xs font-medium transition-colors duration-300",
                isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
              ),
              children: step
            }
          )
        ] }, step);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-foreground", children: [
          "Step ",
          currentStep + 1,
          " of ",
          steps2.length
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-primary", children: steps2[currentStep] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-full bg-primary transition-all duration-500 ease-out",
          style: {
            width: `${(currentStep + 1) / steps2.length * 100}%`
          }
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-between text-xs text-muted-foreground", children: steps2.map((step, index) => /* @__PURE__ */ jsx(
        "span",
        {
          className: cn("transition-colors duration-300", index <= currentStep && "text-primary font-medium"),
          children: index + 1
        },
        step
      )) })
    ] })
  ] });
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsxs(Label, { htmlFor: name, className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-destructive ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id: name,
        name,
        type,
        value,
        onChange,
        placeholder,
        className: cn(error && "border-destructive focus-visible:ring-destructive"),
        ...props
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 3,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsxs(Label, { htmlFor: name, className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-destructive ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        id: name,
        name,
        value,
        onChange,
        placeholder,
        rows,
        className: cn(error && "border-destructive focus-visible:ring-destructive"),
        ...props
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function RadioGroupField({ label, name, value, onChange, options, error, required, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-3", className), children: [
    /* @__PURE__ */ jsxs(Label, { className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-destructive ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: options.map((option) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(option.value),
        className: cn(
          "rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all",
          value === option.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
        ),
        children: option.label
      },
      option.value
    )) }),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
const steps$3 = ["Radiator Count", "System Info", "Your Details", "Schedule"];
const radiatorOptions = [
  { value: "5-or-less", label: "≤5 radiators", price: 400 },
  { value: "6-8", label: "6-8 radiators", price: 500 },
  { value: "9-12", label: "9-12 radiators", price: 600 },
  { value: "13-15", label: "13-15 radiators", price: 700 },
  { value: "16-20", label: "16-20 radiators", price: 800 },
  { value: "21-plus", label: "21+ radiators", price: 900 }
];
const systemTypes = [
  { value: "combi", label: "Combi" },
  { value: "system", label: "System" },
  { value: "heat-only", label: "Heat Only" }
];
const flushHistory = [
  { value: "never", label: "Never" },
  { value: "1-3-years", label: "1-3 years ago" },
  { value: "3-5-years", label: "3-5 years ago" },
  { value: "5-plus-years", label: "5+ years ago" }
];
const accessOptions$1 = [
  { value: "easy", label: "Easy access" },
  { value: "tight", label: "Tight space" },
  { value: "loft", label: "Loft" }
];
function PowerFlushPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Book Power Flush";
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    radiatorCount: "",
    systemType: "",
    coldSpots: "",
    sludgeWater: "",
    previousFlush: "",
    leaksPresent: "",
    accessType: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    preferredDate: ""
  });
  const [errors, setErrors] = useState({});
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };
  const selectedPrice = useMemo(() => {
    const option = radiatorOptions.find((opt) => opt.value === formData.radiatorCount);
    return option ? option.price : null;
  }, [formData.radiatorCount]);
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0 && !formData.radiatorCount)
      newErrors.radiatorCount = "Please select radiator count";
    if (step === 1) {
      if (!formData.systemType) newErrors.systemType = "Please select system type";
      if (!formData.coldSpots) newErrors.coldSpots = "This field is required";
      if (!formData.sludgeWater) newErrors.sludgeWater = "This field is required";
      if (!formData.previousFlush) newErrors.previousFlush = "Please select an option";
      if (!formData.leaksPresent) newErrors.leaksPresent = "This field is required";
      if (!formData.accessType) newErrors.accessType = "Select access type";
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = "Enter name";
      if (!formData.phone) newErrors.phone = "Enter phone";
      if (!formData.email) newErrors.email = "Enter email";
      if (!formData.postcode) newErrors.postcode = "Enter postcode";
    }
    if (step === 3 && !formData.preferredDate)
      newErrors.preferredDate = "Choose a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    if (!validateStep(currentStep)) return;
    console.log("Power flush form submitted:", formData, "Price:", selectedPrice);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Booking Confirmed" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsx(Card, { className: "text-center", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-12 pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-green-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-3", children: "Power Flush Booked!" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "We will contact you shortly to confirm your appointment." }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-muted/50 p-4 mb-8 text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Booking Summary" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Service:" }),
            " Power Flush"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Date:" }),
            " ",
            formData.preferredDate
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Cost:" }),
            " £",
            selectedPrice,
            formData.radiatorCount === "21-plus" ? "+" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: () => router.visit("/"), className: "gap-2", children: "Return Home" })
      ] }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsx(Droplets, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Book a Power Flush" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Restore system efficiency" })
      ] }),
      /* @__PURE__ */ jsx(FormStepper, { steps: steps$3, currentStep, className: "mb-10" }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 sm:p-8", children: [
        currentStep === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Select Radiator Count" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: radiatorOptions.map((option) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => updateField("radiatorCount", option.value),
              className: `rounded-xl border-2 p-4 transition-all ${formData.radiatorCount === option.value ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: option.label }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xl font-bold text-primary", children: [
                  "£",
                  option.price,
                  option.value === "21-plus" && "+"
                ] })
              ]
            },
            option.value
          )) }),
          selectedPrice && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl bg-primary/10 p-5", children: [
            /* @__PURE__ */ jsx(Droplets, { className: "h-10 w-10 text-primary" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Your Price" }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-primary", children: [
                "£",
                selectedPrice,
                formData.radiatorCount === "21-plus" && "+"
              ] })
            ] })
          ] })
        ] }),
        currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "System Information" }),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "System Type",
              name: "systemType",
              value: formData.systemType,
              onChange: (v) => updateField("systemType", v),
              options: systemTypes,
              error: errors.systemType,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "Cold spots in radiators?",
              name: "coldSpots",
              value: formData.coldSpots,
              onChange: (v) => updateField("coldSpots", v),
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ],
              error: errors.coldSpots,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "Sludge/dirty water?",
              name: "sludgeWater",
              value: formData.sludgeWater,
              onChange: (v) => updateField("sludgeWater", v),
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ],
              error: errors.sludgeWater,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "Previous Flush",
              name: "previousFlush",
              value: formData.previousFlush,
              onChange: (v) => updateField("previousFlush", v),
              options: flushHistory,
              error: errors.previousFlush,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "Any leaks present?",
              name: "leaksPresent",
              value: formData.leaksPresent,
              onChange: (v) => updateField("leaksPresent", v),
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ],
              error: errors.leaksPresent,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            RadioGroupField,
            {
              label: "Access Type",
              name: "accessType",
              value: formData.accessType,
              onChange: (v) => updateField("accessType", v),
              options: accessOptions$1,
              error: errors.accessType,
              required: true
            }
          )
        ] }),
        currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Your Details" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "Full Name",
              value: formData.name,
              onChange: (e) => updateField("name", e.target.value),
              error: errors.name,
              required: true
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Phone",
                value: formData.phone,
                onChange: (e) => updateField("phone", e.target.value),
                error: errors.phone,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Email",
                value: formData.email,
                onChange: (e) => updateField("email", e.target.value),
                error: errors.email,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "Postcode",
              value: formData.postcode,
              onChange: (e) => updateField("postcode", e.target.value),
              error: errors.postcode,
              required: true
            }
          )
        ] }),
        currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Schedule Your Visit" }),
          /* @__PURE__ */ jsx(Label, { children: "Preferred Date *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "date",
              value: formData.preferredDate,
              onChange: (e) => updateField("preferredDate", e.target.value),
              min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              className: errors.preferredDate ? "border-destructive" : ""
            }
          ),
          errors.preferredDate && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.preferredDate }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary p-6 bg-primary/5", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Estimated Cost" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-3xl font-bold text-primary", children: [
              "£",
              selectedPrice,
              formData.radiatorCount === "21-plus" && "+"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between gap-4 pt-6 border-t", children: [
          currentStep > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: prevStep, children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ] }) : /* @__PURE__ */ jsx("div", {}),
          currentStep < steps$3.length - 1 ? /* @__PURE__ */ jsxs(Button, { onClick: nextStep, children: [
            "Continue",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) : /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleSubmit, children: "Submit Booking" })
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PowerFlushPage
}, Symbol.toStringTag, { value: "Module" }));
const steps$2 = ["Boiler Type", "System Details", "Add-ons", "Your Details"];
const pageTitle = "Get a Quote ";
const boilerTypes$2 = [
  {
    value: "combi",
    label: "Combi Boiler",
    description: "Best for smaller homes with up to 20 radiators",
    image: "/images/baxi-20-20any.webp"
  },
  {
    value: "system",
    label: "System Boiler",
    description: "Great for larger homes with higher hot water demand",
    image: "/images/ideal-20atlantic.webp"
  },
  {
    value: "heat-only",
    label: "Heat Only",
    description: "Traditional setup with separate hot water cylinder",
    image: "/images/ideal-20logic.png"
  }
];
const addOnImages = {
  verticalFlue: "/images/vertical-20flue-20option.png",
  trv: "/images/trv-20upgrade.png",
  smartThermostat: "/images/smart-20thermostat-20upgrade.jpg",
  filter: "/images/standard-20included-20filter.webp"
};
function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    boilerType: "",
    radiatorRange: "",
    bathrooms: "",
    flueType: "horizontal",
    trvRequired: "no",
    trvCount: 0,
    thermostat: "basic",
    name: "",
    phone: "",
    email: "",
    postcode: ""
  });
  const [errors, setErrors] = useState({});
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };
  const radiatorOptions2 = useMemo(() => {
    const baseOptions = [
      { value: "up-to-6", label: "Up to 6" },
      { value: "7-12", label: "7-12" },
      { value: "13-20", label: "13-20" }
    ];
    if (formData.boilerType !== "combi") {
      baseOptions.push({ value: "21-plus", label: "21+" });
    }
    return baseOptions;
  }, [formData.boilerType]);
  const bathroomOptions = useMemo(() => {
    const baseOptions = [
      { value: "1", label: "1" },
      { value: "1.5", label: "1.5" },
      { value: "2", label: "2" }
    ];
    if (formData.boilerType !== "combi") {
      baseOptions.push({ value: "3-plus", label: "3+" });
    }
    return baseOptions;
  }, [formData.boilerType]);
  const priceBreakdown = useMemo(() => {
    const items = [];
    let total = 0;
    if (!formData.boilerType || !formData.radiatorRange) {
      return { items: [], total: 0 };
    }
    if (formData.boilerType === "combi") {
      let basePrice = 2200;
      if (formData.radiatorRange === "7-12") basePrice = 2500;
      if (formData.radiatorRange === "13-20") basePrice = 2800;
      items.push({ label: `Combi Boiler (${formData.radiatorRange} rads)`, price: basePrice });
      total = basePrice;
    } else {
      const basePrice = 2750;
      items.push({
        label: `${formData.boilerType === "system" ? "System" : "Heat Only"} Boiler`,
        price: basePrice
      });
      total = basePrice;
      if (formData.flueType === "vertical") {
        items.push({ label: "Vertical Flue", price: 150 });
        total += 150;
      }
      if (formData.trvRequired === "yes" && formData.trvCount > 0) {
        const trvCost = formData.trvCount * 25;
        items.push({ label: `TRVs x${formData.trvCount}`, price: trvCost });
        total += trvCost;
      }
      if (formData.thermostat === "smart") {
        items.push({ label: "Smart Thermostat", price: 100 });
        total += 100;
      }
    }
    return { items, total };
  }, [formData]);
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0 && !formData.boilerType) newErrors.boilerType = "Please select a boiler type";
    if (step === 1) {
      if (!formData.radiatorRange) newErrors.radiatorRange = "Required";
      if (!formData.bathrooms) newErrors.bathrooms = "Required";
    }
    if (step === 3) {
      if (!formData.name) newErrors.name = "Required";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.postcode) newErrors.postcode = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && formData.boilerType === "combi") {
        setCurrentStep(3);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prevStep = () => {
    if (currentStep === 3 && formData.boilerType === "combi") {
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Quote Submitted" }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background pb-20", children: [
        /* @__PURE__ */ jsx(PageHeader, { title: "Quote Submitted" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsx(Card, { className: "text-center", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-12 pb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-green-600" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-3", children: "Quote Submitted!" }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-primary/5 border-2 border-primary p-6 mb-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Your Estimated Quote" }),
            /* @__PURE__ */ jsxs("p", { className: "text-4xl font-bold text-primary", children: [
              "£",
              priceBreakdown.total.toLocaleString()
            ] })
          ] })
        ] }) }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: pageTitle }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsx(FileText, { className: "h-7 w-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground sm:text-3xl", children: "Get Your Instant Quote" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Competitive pricing with transparent breakdown" })
        ] }),
        /* @__PURE__ */ jsx(FormStepper, { steps: steps$2, currentStep, className: "mb-10" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx(Card, { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 sm:p-8", children: [
            currentStep === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "Select Boiler Type" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Choose the type of boiler you need" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: boilerTypes$2.map((type) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    updateField("boilerType", type.value);
                    updateField("radiatorRange", "");
                    updateField("bathrooms", "");
                  },
                  className: `flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${formData.boilerType === type.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "shrink-0 w-20 h-20 rounded-lg bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: type.image,
                        alt: type.label,
                        className: "w-full h-full object-contain p-1"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: type.label }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: type.description })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${formData.boilerType === type.value ? "border-primary bg-primary" : "border-muted-foreground"}`,
                        children: formData.boilerType === type.value && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary-foreground" })
                      }
                    )
                  ]
                },
                type.value
              )) }),
              errors.boilerType && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.boilerType })
            ] }),
            currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "System Details" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Tell us about your heating system" })
              ] }),
              /* @__PURE__ */ jsx(
                RadioGroupField,
                {
                  label: "Number of Radiators",
                  name: "radiatorRange",
                  value: formData.radiatorRange,
                  onChange: (v) => updateField("radiatorRange", v),
                  options: radiatorOptions2,
                  error: errors.radiatorRange,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                RadioGroupField,
                {
                  label: "Number of Bathrooms",
                  name: "bathrooms",
                  value: formData.bathrooms,
                  onChange: (v) => updateField("bathrooms", v),
                  options: bathroomOptions,
                  error: errors.bathrooms,
                  required: true
                }
              )
            ] }),
            currentStep === 2 && formData.boilerType !== "combi" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "Optional Add-ons" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Customize your installation" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-foreground", children: "Flue Type" }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("flueType", "horizontal"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.flueType === "horizontal" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl", children: "↔" }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Horizontal" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: "Included" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("flueType", "vertical"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.flueType === "vertical" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: addOnImages.verticalFlue,
                            alt: "Vertical Flue",
                            className: "w-full h-full object-contain"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Vertical" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: "+£150" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-foreground", children: "TRVs Required?" }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("trvRequired", "no"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.trvRequired === "no" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl", children: "✕" }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "No TRVs" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Not required" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("trvRequired", "yes"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.trvRequired === "yes" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: addOnImages.trv,
                            alt: "TRV Valve",
                            className: "w-full h-full object-contain"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Yes, add TRVs" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: "+£25 each" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              formData.trvRequired === "yes" && /* @__PURE__ */ jsxs("div", { className: "space-y-2 pl-4 border-l-2 border-primary/20", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-foreground", children: "Number of TRVs (1-13)" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    min: 1,
                    max: 13,
                    value: formData.trvCount || "",
                    onChange: (e) => updateField(
                      "trvCount",
                      Math.min(13, Math.max(0, Number(e.target.value) || 0))
                    ),
                    className: "w-32"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-foreground", children: "Thermostat" }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("thermostat", "basic"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.thermostat === "basic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl", children: "🌡️" }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Basic" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: "Included" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateField("thermostat", "smart"),
                      className: `flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${formData.thermostat === "smart" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: addOnImages.smartThermostat,
                            alt: "Smart Thermostat",
                            className: "w-full h-full object-cover"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Smart" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: "+£100" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "Your Details" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "How can we contact you?" })
              ] }),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Full Name",
                  name: "name",
                  value: formData.name,
                  onChange: (e) => updateField("name", e.target.value),
                  placeholder: "John Smith",
                  error: errors.name,
                  required: true
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsx(
                  FormField,
                  {
                    label: "Phone",
                    name: "phone",
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => updateField("phone", e.target.value),
                    placeholder: "07123 456789",
                    error: errors.phone,
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormField,
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    value: formData.email,
                    onChange: (e) => updateField("email", e.target.value),
                    placeholder: "john@example.com",
                    error: errors.email,
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Postcode",
                  name: "postcode",
                  value: formData.postcode,
                  onChange: (e) => updateField("postcode", e.target.value),
                  placeholder: "SW1A 1AA",
                  error: errors.postcode,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between gap-4 pt-6 border-t border-border", children: [
              currentStep > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: prevStep, className: "gap-2 bg-transparent", children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back"
              ] }) : /* @__PURE__ */ jsx("div", {}),
              currentStep < steps$2.length - 1 ? /* @__PURE__ */ jsxs(Button, { onClick: nextStep, className: "gap-2", children: [
                "Continue",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] }) : /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, size: "lg", children: "Submit Quote Request" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsx(Card, { className: "border-2 border-primary/20", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground", children: "Live Quote" })
            ] }),
            priceBreakdown.total > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-4", children: priceBreakdown.items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: item.label })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-medium text-foreground", children: [
                  "£",
                  item.price.toLocaleString()
                ] })
              ] }, index)) }),
              /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: "Total" }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                  "£",
                  priceBreakdown.total.toLocaleString()
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-border", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Included with installation:" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg bg-muted/50", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: addOnImages.filter,
                      alt: "MagnaClean Filter",
                      className: "w-10 h-10 rounded"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-foreground", children: "MagnaClean Filter" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "System protection included" })
                  ] })
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Select options to see your live quote" })
          ] }) }) })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuotePage
}, Symbol.toStringTag, { value: "Module" }));
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const steps$1 = ["Boiler Info", "Issue Details", "Your Details", "Schedule"];
const boilerTypes$1 = [
  { value: "combi", label: "Combi" },
  { value: "system", label: "System" },
  { value: "heat-only", label: "Heat Only" }
];
const ageOptions$1 = [
  { value: "under-5", label: "<5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15-plus", label: "15+ years" }
];
const faultCategories = [
  { value: "no-heating", label: "No heating" },
  { value: "no-hot-water", label: "No hot water" },
  { value: "both", label: "Both heating and hot water" },
  { value: "leaking", label: "Leaking" },
  { value: "error-code", label: "Error code" },
  { value: "strange-noise", label: "Strange noise" },
  { value: "low-pressure", label: "Low pressure" },
  { value: "other", label: "Other" }
];
const issueStarted = [
  { value: "today", label: "Today" },
  { value: "1-3-days", label: "1-3 days ago" },
  { value: "1-2-weeks", label: "1-2 weeks ago" },
  { value: "2-plus-weeks", label: "More than 2 weeks ago" }
];
const accessTypes = [
  { value: "easy", label: "Easy access" },
  { value: "cupboard", label: "Cupboard/boxed in" },
  { value: "loft", label: "Loft" },
  { value: "other", label: "Other" }
];
const timeSlots = [
  { value: "am", label: "AM (8am-12pm)" },
  { value: "pm", label: "PM (12pm-5pm)" }
];
function RepairPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    boilerType: "",
    brand: "",
    model: "",
    age: "",
    faultCategory: "",
    errorCode: "",
    otherDescription: "",
    issueStarted: "",
    priorWork: "",
    priorWorkDetails: "",
    files: [],
    accessType: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    preferredDate: "",
    timeSlot: ""
  });
  const [errors, setErrors] = useState({});
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };
  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...uploaded].slice(0, 5)
    }));
  };
  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.boilerType) newErrors.boilerType = "Required";
      if (!formData.brand) newErrors.brand = "Required";
      if (!formData.age) newErrors.age = "Required";
    }
    if (step === 1) {
      if (!formData.faultCategory) newErrors.faultCategory = "Required";
      if (formData.faultCategory === "error-code" && !formData.errorCode)
        newErrors.errorCode = "Required";
      if (formData.faultCategory === "other" && !formData.otherDescription)
        newErrors.otherDescription = "Required";
      if (!formData.issueStarted) newErrors.issueStarted = "Required";
      if (!formData.accessType) newErrors.accessType = "Required";
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = "Required";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.postcode) newErrors.postcode = "Required";
    }
    if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = "Required";
      if (!formData.timeSlot) newErrors.timeSlot = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0 });
    }
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0 });
  };
  const handleSubmit = () => {
    if (!validateStep(3)) return;
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "files") {
        value.forEach((file) => payload.append("files[]", file));
      } else {
        payload.append(key, value);
      }
    });
    router.post("/repair/submit", payload, {
      onSuccess: () => setIsSubmitted(true)
    });
  };
  const pageTitle2 = "Book a Boiler Repair";
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Booking Confirmed" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsx(Card, { className: "text-center", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-12 pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-green-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Booking Submitted!" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground my-4", children: "We’ll contact you shortly to confirm your boiler repair appointment." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Return to Home" }) })
      ] }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "h-14 w-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Wrench, { className: "h-7 w-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Book a Boiler Repair" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Fixed £75 labour charge" })
        ] }),
        /* @__PURE__ */ jsx(FormStepper, { steps: steps$1, currentStep, className: "mb-10" }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 sm:p-8", children: [
          currentStep === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Boiler Information" }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Boiler Type",
                name: "boilerType",
                value: formData.boilerType,
                onChange: (v) => updateField("boilerType", v),
                options: boilerTypes$1,
                error: errors.boilerType,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Brand",
                  value: formData.brand,
                  onChange: (e) => updateField("brand", e.target.value),
                  error: errors.brand,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Model",
                  value: formData.model,
                  onChange: (e) => updateField("model", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Boiler Age",
                value: formData.age,
                onChange: (v) => updateField("age", v),
                options: ageOptions$1,
                error: errors.age,
                required: true
              }
            )
          ] }),
          currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Issue Details" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Fault Category *" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: formData.faultCategory,
                  onValueChange: (v) => updateField("faultCategory", v),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: errors.faultCategory ? "border-destructive" : "", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: faultCategories.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
                  ]
                }
              ),
              errors.faultCategory && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.faultCategory })
            ] }),
            formData.faultCategory === "error-code" && /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Error Code",
                value: formData.errorCode,
                onChange: (e) => updateField("errorCode", e.target.value),
                error: errors.errorCode,
                required: true
              }
            ),
            formData.faultCategory === "other" && /* @__PURE__ */ jsx(
              FormTextarea,
              {
                label: "Describe the issue",
                value: formData.otherDescription,
                onChange: (e) => updateField("otherDescription", e.target.value),
                error: errors.otherDescription
              }
            ),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "When did the issue start?",
                value: formData.issueStarted,
                onChange: (v) => updateField("issueStarted", v),
                options: issueStarted,
                error: errors.issueStarted,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Access Type",
                value: formData.accessType,
                onChange: (v) => updateField("accessType", v),
                options: accessTypes,
                error: errors.accessType,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Label, { children: "Upload Photos (optional)" }),
              /* @__PURE__ */ jsxs("div", { className: "border border-dashed p-5 rounded-xl text-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "file-upload",
                    multiple: true,
                    className: "hidden",
                    accept: "image/*,video/*",
                    onChange: handleFileChange
                  }
                ),
                /* @__PURE__ */ jsxs("label", { htmlFor: "file-upload", className: "cursor-pointer", children: [
                  /* @__PURE__ */ jsx(Upload, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Click to upload" })
                ] })
              ] }),
              formData.files.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: formData.files.map((file, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2 bg-muted px-3 py-2 rounded-lg",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px]", children: file.name }),
                    /* @__PURE__ */ jsx("button", { onClick: () => removeFile(index), children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-destructive" }) })
                  ]
                },
                index
              )) })
            ] })
          ] }),
          currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Your Details" }),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Full Name",
                value: formData.name,
                onChange: (e) => updateField("name", e.target.value),
                error: errors.name,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Phone",
                  value: formData.phone,
                  onChange: (e) => updateField("phone", e.target.value),
                  error: errors.phone,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Email",
                  value: formData.email,
                  onChange: (e) => updateField("email", e.target.value),
                  error: errors.email,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Postcode",
                value: formData.postcode,
                onChange: (e) => updateField("postcode", e.target.value),
                error: errors.postcode,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextarea,
              {
                label: "Address (optional)",
                value: formData.address,
                onChange: (e) => updateField("address", e.target.value)
              }
            )
          ] }),
          currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "Schedule" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Date *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "date",
                  value: formData.preferredDate,
                  min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                  onChange: (e) => updateField("preferredDate", e.target.value),
                  className: errors.preferredDate ? "border-destructive" : ""
                }
              ),
              errors.preferredDate && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.preferredDate })
            ] }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Preferred Time",
                value: formData.timeSlot,
                onChange: (v) => updateField("timeSlot", v),
                options: timeSlots,
                error: errors.timeSlot,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-primary/5 border-primary", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "Repair Cost" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-primary mt-2", children: "£75" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Labour only, parts extra" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between border-t pt-6", children: [
            currentStep > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: prevStep, children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
              " Back"
            ] }) : /* @__PURE__ */ jsx("div", {}),
            currentStep < steps$1.length - 1 ? /* @__PURE__ */ jsxs(Button, { onClick: nextStep, children: [
              "Continue ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 ml-2" })
            ] }) : /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleSubmit, children: "Submit Booking" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RepairPage
}, Symbol.toStringTag, { value: "Module" }));
const steps = ["Boiler Info", "Access & Issues", "Your Details", "Schedule"];
const boilerTypes = [
  { value: "combi", label: "Combi" },
  { value: "system", label: "System" },
  { value: "heat-only", label: "Heat Only" }
];
const ageOptions = [
  { value: "under-5", label: "<5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15-plus", label: "15+ years" }
];
const accessOptions = [
  { value: "easy", label: "Easy access" },
  { value: "tight", label: "Tight cupboard" },
  { value: "loft", label: "Loft" }
];
function ServicePage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Book a Service";
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    boilerType: "",
    brand: "",
    model: "",
    age: "",
    accessSituation: "",
    knownIssues: "",
    issueDetails: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    preferredDate: ""
  });
  const [errors, setErrors] = useState({});
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.boilerType) newErrors.boilerType = "Please select a boiler type";
      if (!formData.brand) newErrors.brand = "Please enter the brand";
      if (!formData.age) newErrors.age = "Please select boiler age";
    }
    if (step === 1) {
      if (!formData.accessSituation) newErrors.accessSituation = "Please select access";
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = "Enter name";
      if (!formData.phone) newErrors.phone = "Enter phone";
      if (!formData.email) newErrors.email = "Enter email";
      if (!formData.postcode) newErrors.postcode = "Enter postcode";
    }
    if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = "Select date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Service Submitted:", formData);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Service Booked!" }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
        /* @__PURE__ */ jsx(PageHeader, { title: "Booking Confirmed" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsx(Card, { className: "text-center", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-12 pb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-green-600" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-3", children: "Service Booked!" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "We will contact you shortly to confirm your appointment." }),
          /* @__PURE__ */ jsx(Button, { onClick: () => router.visit("/"), className: "gap-2", children: "Return Home" })
        ] }) }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsx(Settings, { className: "h-7 w-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Book a Boiler Service" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Annual service from £75" })
        ] }),
        /* @__PURE__ */ jsx(FormStepper, { steps, currentStep, className: "mb-10" }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 sm:p-8", children: [
          currentStep === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Boiler Information" }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Boiler Type",
                name: "boilerType",
                value: formData.boilerType,
                onChange: (v) => updateField("boilerType", v),
                options: boilerTypes,
                error: errors.boilerType,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Brand",
                  value: formData.brand,
                  onChange: (e) => updateField("brand", e.target.value),
                  error: errors.brand,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Model",
                  value: formData.model,
                  onChange: (e) => updateField("model", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Boiler Age",
                name: "age",
                value: formData.age,
                onChange: (v) => updateField("age", v),
                options: ageOptions,
                error: errors.age,
                required: true
              }
            )
          ] }),
          currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Access & Known Issues" }),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Access Situation",
                name: "accessSituation",
                value: formData.accessSituation,
                onChange: (v) => updateField("accessSituation", v),
                options: accessOptions,
                error: errors.accessSituation,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioGroupField,
              {
                label: "Any Known Issues?",
                name: "knownIssues",
                value: formData.knownIssues,
                onChange: (v) => updateField("knownIssues", v),
                options: [
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]
              }
            ),
            formData.knownIssues === "yes" && /* @__PURE__ */ jsx(
              FormTextarea,
              {
                label: "Describe Issues",
                value: formData.issueDetails,
                onChange: (e) => updateField("issueDetails", e.target.value)
              }
            )
          ] }),
          currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Your Details" }),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Full Name",
                value: formData.name,
                onChange: (e) => updateField("name", e.target.value),
                error: errors.name,
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Phone",
                  value: formData.phone,
                  onChange: (e) => updateField("phone", e.target.value),
                  error: errors.phone,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  label: "Email",
                  value: formData.email,
                  onChange: (e) => updateField("email", e.target.value),
                  error: errors.email,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: "Postcode",
                value: formData.postcode,
                onChange: (e) => updateField("postcode", e.target.value),
                error: errors.postcode,
                required: true
              }
            )
          ] }),
          currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Schedule Your Service" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Preferred Date *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "date",
                  value: formData.preferredDate,
                  onChange: (e) => updateField("preferredDate", e.target.value),
                  min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                  className: errors.preferredDate ? "border-destructive" : ""
                }
              ),
              errors.preferredDate && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: errors.preferredDate })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border-2 border-primary bg-primary/5 p-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Service Cost" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-primary", children: "From £75" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between gap-4 pt-6 border-t", children: [
            currentStep > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: prevStep, children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ] }) : /* @__PURE__ */ jsx("div", {}),
            currentStep < steps.length - 1 ? /* @__PURE__ */ jsxs(Button, { onClick: nextStep, children: [
              "Continue",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) : /* @__PURE__ */ jsx(Button, { size: "lg", onClick: handleSubmit, children: "Submit Booking" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ServicePage
}, Symbol.toStringTag, { value: "Module" }));
const DropDownContext = createContext();
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-md ring-1 ring-black ring-opacity-50 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 text-gray-900 focus:border-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") + className,
      children
    }
  );
}
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx("style", { children: `input { padding: 10px; }` }),
    /* @__PURE__ */ jsxs("nav", { className: "border-b border-gray-100 bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto fill-current text-gray-800" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden space-x-8 sm:-my-px sm:ms-10 sm:flex", children: /* @__PURE__ */ jsx(
            NavLink,
            {
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: "Dashboard"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:ms-6 sm:flex sm:items-center", children: /* @__PURE__ */ jsx("div", { className: "relative ms-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
              children: [
                user.name,
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "-me-0.5 ms-2 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("profile.edit"),
                children: "Profile"
              }
            ),
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                children: "Log Out"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "-me-2 flex items-center sm:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown(
              (previousState) => !previousState
            ),
            className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "h-6 w-6",
                stroke: "currentColor",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M4 6h16M4 12h16M4 18h16"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                ]
              }
            )
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-1 pb-3 pt-2", children: /* @__PURE__ */ jsx(
              ResponsiveNavLink,
              {
                href: route("dashboard"),
                active: route().current("dashboard"),
                children: "Dashboard"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pb-1 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-medium text-gray-800", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
                /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
                /* @__PURE__ */ jsx(
                  ResponsiveNavLink,
                  {
                    method: "post",
                    href: route("logout"),
                    as: "button",
                    children: "Log Out"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: header }) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
function Dashboard() {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const FAQ_LIST = [
  {
    q: "Who are MD Gas?",
    a: "MD Gas is a trusted home heating specialist providing boiler installations, repairs, servicing, and energy-efficient heating solutions across the region."
  },
  {
    q: "Do you offer finance options for boiler installations?",
    a: "Yes, we offer flexible finance plans to help you spread the cost of your boiler installation easily and affordably."
  },
  {
    q: "What services does MD Gas provide?",
    a: "We provide boiler installation, servicing, repairs, central heating upgrades, smart thermostat setup, and emergency call-outs."
  },
  {
    q: "Who carries out the installation?",
    a: "All installations are completed by fully qualified Gas Safe registered engineers with years of professional experience."
  },
  {
    q: "Are my payments and purchases protected?",
    a: "Yes, all installations and products come with full protection, warranties, and transparent pricing."
  },
  {
    q: "How quickly can you install a new boiler?",
    a: "In many cases, we offer next-day installation depending on engineer availability and your location."
  },
  {
    q: "Do you provide emergency boiler repairs?",
    a: "Yes, we provide urgent same-day repair services for breakdowns and heating emergencies."
  },
  {
    q: "What warranties do you offer?",
    a: "We offer manufacturer warranties up to 10 years depending on the boiler model you choose."
  },
  {
    q: "Do you install smart thermostats?",
    a: "Yes, we install major smart thermostats such as Hive, Nest, and Tado for superior energy control."
  },
  {
    q: "Can I get a quote online?",
    a: "Absolutely. You can receive an instant fixed-price quote online without needing a home visit."
  },
  {
    q: "Are your engineers Gas Safe certified?",
    a: "Yes, all MD Gas engineers are Gas Safe registered and fully qualified."
  },
  {
    q: "Do you offer annual boiler servicing?",
    a: "Yes, we offer affordable annual servicing to keep your boiler safe, efficient, and under warranty."
  },
  {
    q: "Can you upgrade radiators or heating systems?",
    a: "Yes, we provide full central heating upgrades including radiators, pipework, pumps, and valves."
  },
  {
    q: "What areas do you cover?",
    a: "We cover a wide service area—contact us or enter your postcode online to confirm availability."
  },
  {
    q: "How do I book an installation?",
    a: "You can book directly online or speak to our team for support with selecting a boiler."
  }
];
function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const displayedFaqs = showAll ? FAQ_LIST : FAQ_LIST.slice(0, 5);
  const scrollToSectionTop = () => {
    if (!sectionRef.current) return;
    const offsetTop = sectionRef.current.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  };
  const handleViewAll = () => {
    setShowAll(true);
    scrollToSectionTop();
  };
  const handleShowLess = () => {
    setShowAll(false);
    setOpenIndex(0);
    scrollToSectionTop();
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: sectionRef,
      className: "bg-foreground text-white py-20 px-6 sm:px-10 rounded-b-[45px]",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-10 z-20 bg-foreground pt-4 pb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-bold text-dark", children: "FAQ’s" }),
          !showAll && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleViewAll,
              className: "bg-dark text-foreground px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 cursor-pointer",
              children: [
                "View all ",
                /* @__PURE__ */ jsx(IoChevronDown, { className: "text-base" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: displayedFaqs.map((item, index) => {
          const isOpen = openIndex === index;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "border-b border-dark/60 pb-3",
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "w-full flex justify-between items-center text-left",
                    onClick: () => setOpenIndex(isOpen ? null : index),
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-dark", children: item.q }),
                      isOpen ? /* @__PURE__ */ jsx(IoChevronUp, { className: "text-xl text-dark" }) : /* @__PURE__ */ jsx(IoChevronDown, { className: "text-xl text-dark" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] mt-3 opacity-100" : "max-h-0 opacity-0"}`,
                    children: /* @__PURE__ */ jsx("p", { className: "text-[15px] text-dark leading-relaxed", children: item.a })
                  }
                )
              ]
            },
            index
          );
        }) }),
        showAll && /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleShowLess,
            className: "bg-white text-black px-6 py-2 rounded-full text-sm font-semibold",
            children: "Show less"
          }
        ) })
      ] })
    }
  );
}
const services = [
  {
    id: "repair",
    title: "Boiler Repair",
    description: "Fast boiler repairs with fixed labour.",
    image: "/images/product_boiler.png",
    highlight: "From £75 Labour",
    href: "/book/repair",
    theme: {
      hoverBg: "hover:bg-[#E5F1FF]",
      hoverBorder: "hover:border-[#2358FF]",
      labelBg: "bg-[#2358FF]",
      rippleColor: "text-[#7190F5]",
      arrowHoverBg: "group-hover:bg-[#2358FF]"
    }
  },
  {
    id: "service",
    title: "Boiler Service",
    description: "Annual service to keep your boiler safe.",
    image: "/images/product_boiler.png",
    highlight: "Yearly Service",
    href: "/book/service",
    theme: {
      hoverBg: "hover:bg-[#FFECA9]",
      hoverBorder: "hover:border-[#FFC727]",
      labelBg: "bg-[#FFC727]",
      rippleColor: "text-[#FFC727]",
      arrowHoverBg: "group-hover:bg-[#2358FF]"
    }
  },
  {
    id: "quote",
    title: "New Boiler Quote",
    description: "Instant online quote for a new boiler.",
    image: "/images/product_boiler.png",
    highlight: "Instant Quote",
    href: "/book/quote",
    theme: {
      hoverBg: "hover:bg-[#E6F9EC]",
      hoverBorder: "hover:border-[#17A44A]",
      labelBg: "bg-[#17A44A]",
      rippleColor: "text-[#17A44A]",
      arrowHoverBg: "group-hover:bg-[#2358FF]"
    }
  },
  {
    id: "powerflush",
    title: "Power Flush",
    description: "Deep clean for radiators and pipework.",
    image: "/images/product_boiler.png",
    highlight: "From £400",
    href: "/book/power-flush",
    theme: {
      hoverBg: "hover:bg-[#F3E9FF]",
      hoverBorder: "hover:border-[#8B4DFF]",
      labelBg: "bg-[#8B4DFF]",
      rippleColor: "text-[#8B4DFF]",
      arrowHoverBg: "group-hover:bg-[#2358FF]"
    }
  }
];
function GlowRipple({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "203",
      height: "205",
      viewBox: "0 0 243 225",
      fill: "none",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxs("g", { opacity: "0.2", children: [
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "121.282",
            cy: "112.153",
            rx: "106.355",
            ry: "98.3498",
            fill: "currentColor",
            fillOpacity: "0.4"
          }
        ),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "121.282",
            cy: "112.153",
            rx: "121.282",
            ry: "112.153",
            fill: "currentColor",
            fillOpacity: "0.2"
          }
        ),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "121.283",
            cy: "112.154",
            rx: "94.0935",
            ry: "87.0113",
            fill: "currentColor",
            fillOpacity: "0.4"
          }
        ),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "121.282",
            cy: "112.154",
            rx: "77.0341",
            ry: "71.2358",
            fill: "currentColor",
            fillOpacity: "0.6"
          }
        )
      ] })
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "services",
      className: "relative overflow-hidden py-20 rounded-b-[45px] bg-light-grey pt-40",
      children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mb-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-5 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary via-[#FFC727]/30 to-transparent blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6", children: /* @__PURE__ */ jsxs("span", { className: "relative", children: [
              "That's",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
                "Not All",
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "118",
                    height: "14",
                    viewBox: "0 0 118 14",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "absolute -bottom-[15px] left-0 w-full scale-110",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M101.992 4.34893C93.4576 2.71542 84.7474 2.23937 76.0816 1.77516C75.1495 1.85756 74.2176 1.80286 73.2865 1.74821C72.2639 1.68819 71.2425 1.62823 70.2233 1.7501C68.9183 1.75842 67.6129 1.75643 66.3074 1.75444C63.7424 1.75053 61.1767 1.74663 58.612 1.82086C56.9659 2.02015 55.3079 2.06054 53.6514 2.0813C50.5664 2.18806 47.4891 2.43338 44.4118 2.6787C43.0887 2.78418 41.7656 2.88966 40.4418 2.98412C39.2747 3.19702 38.0955 3.28183 36.9167 3.36662C35.5818 3.46264 34.2472 3.55864 32.9308 3.8406C26.4858 4.5214 20.081 5.61998 13.7274 6.95662C13.1161 7.10891 12.5034 7.25847 11.8905 7.40812C8.24899 8.2971 4.59479 9.1892 1.12186 10.6759C1.09073 10.8399 1.02847 11.1681 0.99999 11.3324C1.61906 11.3569 2.24821 11.354 2.84503 11.1454C6.82619 10.2378 10.8101 9.36423 14.8236 8.6622C15.8594 8.3854 16.9156 8.2416 17.9718 8.09783C18.885 7.97351 19.7981 7.8492 20.6977 7.63894C21.6191 7.428 22.554 7.32028 23.4885 7.21261C24.4494 7.1019 25.4099 6.99124 26.355 6.76847C27.1118 6.59953 27.8795 6.53875 28.6474 6.47795C29.1613 6.43726 29.6754 6.39656 30.1864 6.32342C32.0012 6.00008 33.8308 5.8207 35.6609 5.64129C36.8302 5.52665 37.9997 5.412 39.1655 5.25977C40.3225 5.10525 41.4856 5.03639 42.6487 4.96753C44.0432 4.88497 45.4375 4.80242 46.8209 4.57225C47.9164 4.49158 49.0139 4.45141 50.1115 4.41125C51.2801 4.36848 52.4488 4.32571 53.6156 4.23403C55.3437 4.05603 57.0773 4.02745 58.8111 3.99887C60.1603 3.97664 61.5096 3.9544 62.8567 3.86174C63.5661 3.89715 64.275 3.87348 64.9834 3.84984C65.8921 3.8195 66.8001 3.78919 67.7079 3.88358C70.4209 3.74309 73.1333 3.85345 75.8461 3.96382C77.3711 4.02586 78.8962 4.08791 80.4216 4.10541C89.1913 4.6396 97.9759 5.43447 106.547 7.4573C106.917 7.54018 107.288 7.61901 107.66 7.69792C109.338 8.05399 111.024 8.41164 112.593 9.14988C111.841 9.19013 111.098 9.08707 110.357 8.98421C110.025 8.93815 109.693 8.89213 109.361 8.85902C108.739 8.7808 108.115 8.71942 107.491 8.65806C106.177 8.52893 104.865 8.39991 103.574 8.11428C98.014 7.56178 92.4394 7.16897 86.8657 6.83547C84.8069 6.8854 82.7468 6.80839 80.687 6.73139C77.7652 6.62217 74.8442 6.51297 71.9286 6.7662C66.6683 6.76123 61.4045 6.97886 56.1564 7.40929C54.5766 7.45132 53.0046 7.61475 51.4325 7.77818C50.023 7.9247 48.6134 8.07124 47.198 8.13033C45.9342 8.37195 44.6579 8.49962 43.3811 8.62734C42.098 8.75569 40.8145 8.88408 39.543 9.12821C38.6327 9.30628 37.7132 9.41469 36.7939 9.52309C35.6258 9.6608 34.458 9.7985 33.3093 10.079C27.0488 10.4818 28.1215 13.3945 31.0593 12.6571C31.4738 12.6309 34.7193 12.6043 35.1335 12.5777C37.6768 12.4145 37.3895 12.2449 39.9339 12.0748C40.3255 12.0486 40.7171 12.0225 41.1088 11.9963C42.8789 11.6575 44.6532 11.3412 46.4508 11.2277C48.6012 10.8611 50.7745 10.7411 52.9459 10.6213C53.6291 10.5835 54.312 10.5458 54.994 10.5005C57.6714 10.2037 60.3591 10.1387 63.0456 10.0738C64.1615 10.0468 65.2772 10.0198 66.3919 9.9762C67.2218 9.82877 68.0577 9.83236 68.8945 9.83595C69.4033 9.83813 69.9125 9.84032 70.4207 9.80855C73.5399 9.82847 76.6534 9.81693 79.767 9.80539C80.5892 9.67894 81.413 9.73055 82.2375 9.7822C82.7055 9.81153 83.1738 9.84086 83.6421 9.83764C85.0517 9.75476 86.4598 9.83448 87.8685 9.91423C88.9692 9.97654 90.0701 10.0389 91.1724 10.0237C95.1868 10.1238 99.1858 10.4622 103.185 10.8007C106.117 11.0488 109.05 11.297 111.989 11.4513C112.402 11.4069 112.835 11.4088 113.272 11.4107C114.481 11.4159 115.717 11.4212 116.614 10.4515C116.696 9.76089 116.474 9.06973 116.027 8.56462C114.507 7.31973 112.647 6.8384 110.804 6.36153C110.221 6.21055 109.639 6.06002 109.07 5.88585C107.634 5.36968 106.139 5.11425 104.644 4.85894C103.756 4.70715 102.867 4.5554 101.992 4.34893Z",
                        fill: "#0067ff",
                        stroke: "#0067ff",
                        "stroke-width": "1.53248"
                      }
                    )
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "p-3 border-[2px] border-dark rounded-full inline-flex items-center justify-center cursor-pointer group", children: /* @__PURE__ */ jsx("span", { className: "transform rotate-45 transition-all duration-300 group-hover:rotate-0", children: /* @__PURE__ */ jsx(ArrowRight, { size: 20 }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-4", children: services.map((service) => /* @__PURE__ */ jsxs(
          Card,
          {
            className: `group relative flex flex-col justify-start items-start overflow-hidden rounded-[30px] border-[3px] border-[#EFEFEF] bg-white px-7 pt-7 pb-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${service.theme.hoverBg} ${service.theme.hoverBorder}`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${service.theme.labelBg}`,
                  children: service.highlight
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative mt-1 flex h-44 w-full items-center justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx(
                  GlowRipple,
                  {
                    className: `${service.theme.rippleColor}`
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: service.image,
                    alt: service.title,
                    className: "relative z-10 max-h-32 object-contain mx-auto"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4 mt-1", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(CardHeader, { className: "p-0", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-[18px] font-semibold text-slate-900", children: service.title }) }),
                  /* @__PURE__ */ jsx(CardContent, { className: " p-0", children: /* @__PURE__ */ jsx(CardDescription, { className: "text-[14px] leading-relaxed text-slate-600", children: service.description }) })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: service.href, className: "shrink-0", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:translate-x-1 ${service.theme.arrowHoverBg}`,
                    children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
                  }
                ) })
              ] })
            ]
          },
          service.id
        )) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100", children: /* @__PURE__ */ jsx(FcGoogle, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.12em] text-slate-500", children: "Google Reviews" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-900", children: "4.5 / 5" }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 text-amber-400", children: [
                /* @__PURE__ */ jsx(FaStar, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(FaStar, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(FaStar, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(FaStar, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(FaStarHalfAlt, { className: "h-4 w-4" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-slate-500", children: "120+ reviews" })
            ] })
          ] })
        ] }) })
      ] })
    }
  );
}
const homeTypes = [
  {
    name: "Terrace",
    icon: Home$1,
    tag: "Home type",
    description: "Compact heating solutions designed for smaller terraces."
  },
  {
    name: "Semi-detached",
    icon: Building2,
    tag: "Home type",
    description: "Efficient boiler systems for mid-size family homes."
  },
  {
    name: "Detached",
    icon: Castle,
    tag: "Home type",
    description: "High-capacity heating for larger detached properties."
  },
  {
    name: "Flat",
    icon: Building,
    tag: "Home type",
    description: "Space-saving boilers perfect for apartments and flats."
  }
];
function HomeTypesStrip() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const scrollByStep = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const step = container.clientWidth / 2;
    const delta = direction === "left" ? -step : step;
    container.scrollBy({
      left: delta,
      behavior: "smooth"
    });
  };
  const handlePrev = () => scrollByStep("left");
  const handleNext = () => scrollByStep("right");
  const onMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = true;
    container.classList.add("cursor-grabbing");
    startX.current = e.clientX;
    startScrollLeft.current = container.scrollLeft;
  };
  const onMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container || !isDragging.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    container.scrollLeft = startScrollLeft.current - dx;
  };
  const endDrag = () => {
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = false;
    container.classList.remove("cursor-grabbing");
  };
  useEffect(() => {
    const end = () => endDrag();
    window.addEventListener("mouseup", end);
    return () => window.removeEventListener("mouseup", end);
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[40%] flex flex-col justify-between gap-10 mb-12 lg:mb-0", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-semibold tracking-wide text-primary", children: "We service all home types" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold leading-tight text-light-background sm:text-4xl lg:text-5xl", children: [
          "The right boiler for",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "every home" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-sm leading-relaxed text-light-grey/80", children: "From compact terraces to larger detached homes, our engineers recommend and install boilers that match your property, usage, and budget." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrev,
            className: "flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-light-background/30 text-light-background transition hover:bg-light-background hover:text-dark",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNext,
            className: "flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-light-background/30 text-light-background transition hover:bg-light-background hover:text-dark",
            children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-[60%] relative", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "\n                                flex gap-6 \n                                overflow-x-auto \n                                scroll-smooth \n                                snap-x snap-mandatory \n                                cursor-grab \n                                no-scrollbar\n                            ",
        onMouseDown,
        onMouseMove,
        onMouseLeave: endDrag,
        children: homeTypes.map((type) => /* @__PURE__ */ jsx(
          "article",
          {
            className: "\n                                        snap-center\n                                        shrink-0\n                                        basis-[85%]\n                                        sm:basis-[70%]\n                                        lg:basis-1/2\n                                        xl:basis-[45%]\n                                    ",
            children: /* @__PURE__ */ jsx("div", { className: "flex h-full relative flex-col justify-between rounded-3xl bg-dark/60 p-6 sm:p-8 ", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-50 w-12 text-center h-12 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[8px] font-medium text-primary leading-2.5", children: type.tag }),
              /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 shrink-0", children: /* @__PURE__ */ jsx(type.icon, { className: "h-6 w-6 text-primary" }) }),
                /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold leading-7 text-light-background sm:text-3xl", children: [
                  type.name,
                  " homes"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "max-w-md text-sm leading-relaxed text-neutral", children: type.description })
            ] }) })
          },
          type.name
        ))
      }
    ) }) })
  ] }) });
}
function ServiceCards() {
  const steps2 = [
    {
      title: "You answer",
      description: "Tell us a few simple details about your home and current boiler setup.",
      icon: MessageCircleMore
    },
    {
      title: "You pick",
      description: "Choose your preferred boiler and package from fixed, transparent pricing.",
      icon: Touchpad
    },
    {
      title: "We fit",
      description: "Your chosen boiler is installed by a trusted, local Gas Safe engineer.",
      icon: Hammer
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F3F5F7] py-20 sm:py-28 rounded-t-[45px] mt-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-[500] tracking-tight text-dark leading-snug", children: [
        "Get a",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "fixed online price" }),
        ",",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        /* @__PURE__ */ jsx("span", { className: "inline-block", children: "without a salesperson in sight." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-dark/70 text-lg", children: "Simple, transparent, and fully online — the way it should be." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-12 sm:grid-cols-3", children: steps2.map((step) => {
      const Icon = step.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col items-center text-center group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_15px_40px_rgba(15,23,42,0.12)] relative overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(15,23,42,0.18)]", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" }),
              /* @__PURE__ */ jsx(
                Icon,
                {
                  className: "h-12 w-12 text-dark",
                  strokeWidth: 2.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-[20px] font-semibold text-dark", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-dark/70 max-w-xs", children: step.description })
          ]
        },
        step.title
      );
    }) })
  ] }) });
}
const BENEFITS = [
  {
    title: "Trusted installer.",
    description: "Accredited by leading industry bodies so you know your installation is in safe hands.",
    icon: FiAward,
    iconColor: "text-sky-600"
  },
  {
    title: "All-inclusive aftercare.",
    description: "Every installation comes with our workmanship guarantee and dedicated support.",
    icon: FiHeart,
    iconColor: "text-blue-600"
  },
  {
    title: "Price promise.",
    description: "If you find a genuine like-for-like quote that’s cheaper, we’ll match it. Simple.",
    icon: FiTag,
    iconColor: "text-violet-600"
  },
  {
    title: "5 star reviews.",
    description: "Thousands of verified 5★ reviews across platforms like Trustpilot and Google.",
    icon: FiStar,
    iconColor: "text-emerald-600"
  },
  {
    title: "We give back.",
    description: "For every energy-saving installation, we donate to carefully chosen charities.",
    icon: FiShield,
    iconColor: "text-fuchsia-600"
  },
  {
    title: "A safe choice.",
    description: "Gas Safe registered engineers and fully certified for boiler and heating work.",
    icon: FiZap,
    iconColor: "text-amber-500"
  }
];
function WhyChooseUs() {
  return /* @__PURE__ */ jsx("section", { className: "bg-primary/20 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold tracking-[0.18em] text uppercase text-foreground", children: "Why choose us" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl sm:text-3xl font-semibold text-foreground/70", children: "Benefits that come as standard" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-x-16 gap-y-12 md:grid-cols-2", children: BENEFITS.map((item) => {
      const Icon = item.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-4",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(
              Icon,
              {
                className: `h-7 w-7 ${item.iconColor}`
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-light-grey", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-light-grey", children: item.description })
            ] })
          ]
        },
        item.title
      );
    }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-xs text-foreground/70", children: "…so, why wouldn’t you choose us?" })
  ] }) });
}
function Home() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen", children: /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(HomeTypesStrip, {}),
    /* @__PURE__ */ jsx(ServiceCards, {}),
    /* @__PURE__ */ jsx(WhyChooseUs, {}),
    /* @__PURE__ */ jsx(Faq, {})
  ] }) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function PrivacyPolicyPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Privacy Policy";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Last updated: November 2024" }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-gray max-w-none space-y-8", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "1. Introduction" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'MD Gas ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.' })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "2. Information We Collect" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "We may collect information about you in a variety of ways, including:" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Personal Data:" }),
                " ",
                "Name, email, phone number, address, and postcode."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Property Information:" }),
                " ",
                "Details about your boiler system."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Payment Information:" }),
                " ",
                "Securely processed via our payment provider."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Usage Data:" }),
                " ",
                "IP address, browser type, and site interaction data."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "3. How We Use Your Information" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "We use your information for:" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx("li", { children: "Providing and improving our services" }),
              /* @__PURE__ */ jsx("li", { children: "Processing bookings" }),
              /* @__PURE__ */ jsx("li", { children: "Communicating about appointments" }),
              /* @__PURE__ */ jsx("li", { children: "Sending promotional updates (with consent)" }),
              /* @__PURE__ */ jsx("li", { children: "Complying with legal obligations" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "4. Information Sharing" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We do not sell or rent your data. We only share your information with trusted service providers who assist us in delivering our services." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "5. Data Security" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We use security measures to protect your information, but no online transmission is 100% secure." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "6. Your Rights" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx("li", { children: "Right to access your data" }),
              /* @__PURE__ */ jsx("li", { children: "Right to correct inaccuracies" }),
              /* @__PURE__ */ jsx("li", { children: "Right to deletion" }),
              /* @__PURE__ */ jsx("li", { children: "Right to restrict processing" }),
              /* @__PURE__ */ jsx("li", { children: "Right to data portability" }),
              /* @__PURE__ */ jsx("li", { children: "Right to object to processing" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "7. Cookies" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our website uses cookies to improve user experience. You may disable cookies in your browser settings." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "8. Contact Us" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Email:" }),
                " ",
                "privacy@mdgas.co.uk"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Phone:" }),
                " ",
                "0800 123 4567"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Address:" }),
                " ",
                "MD Gas Ltd, Greater London"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyPolicyPage
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: "Current Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function TermsConditionsPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Terms & Conditions";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Last updated: November 2024" }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-gray max-w-none space-y-8", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "1. Agreement to Terms" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'By accessing or using the services provided by MD Gas ("Company", "we", "our", or "us"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.' })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "2. Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "MD Gas provides boiler repair, servicing, installation, and power flush services. Our services include:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Boiler Repairs:" }),
              " ",
              "Fixed £75 labour charge (parts extra)."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Servicing:" }),
              " ",
              "Annual servicing from £75."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Installations:" }),
              " ",
              "Pricing varies depending on system."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Power Flush:" }),
              " ",
              "Price based on radiator count."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "3. Bookings & Appointments" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Provide accurate and complete booking information." }),
            /* @__PURE__ */ jsx("li", { children: "An adult must be present during the appointment." }),
            /* @__PURE__ */ jsx("li", { children: "You must ensure safe access to the boiler/system." }),
            /* @__PURE__ */ jsx("li", { children: "Cancel at least 24 hours before to avoid fees." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "4. Pricing & Payment" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "All prices include VAT (unless stated)." }),
            /* @__PURE__ */ jsx("li", { children: "Labour charges are fixed; parts quoted separately." }),
            /* @__PURE__ */ jsx("li", { children: "Payment due upon completion unless otherwise agreed." }),
            /* @__PURE__ */ jsx("li", { children: "We accept cash, card, and bank transfer." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "5. Warranties & Guarantees" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "12-month workmanship guarantee." }),
            /* @__PURE__ */ jsx("li", { children: "Manufacturer warranties apply to new boilers." }),
            /* @__PURE__ */ jsx("li", { children: "Parts covered by manufacturer warranty." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "6. Liability" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We are fully insured and Gas Safe registered. Liability is limited to service cost. We are not liable for: pre-existing system faults, third-party damage, or issues caused by lack of maintenance." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "7. Safety Requirements" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "All work follows Gas Safe regulations. If we find unsafe conditions, we may need to isolate the appliance as required by law." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "8. Complaints" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Contact us within 14 days if you’re unhappy. We respond within 2 working days and resolve complaints within 14 working days." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "9. Changes to Terms" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We may update these terms at any time. Updates are effective immediately once posted. Continued use of our services means acceptance of updated terms." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "10. Contact Information" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Email:" }),
              " ",
              "info@mdgas.co.uk"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Phone:" }),
              " ",
              "0800 123 4567"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Address:" }),
              " ",
              "MD Gas Ltd, Greater London"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TermsConditionsPage
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "background",
          className: "absolute -left-20 top-0 max-w-[877px]",
          src: "https://laravel.com/assets/img/welcome/background.svg"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex lg:col-start-2 lg:justify-center", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
              viewBox: "0 0 62 65",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                  fill: "currentColor"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Log in"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Register"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              id: "docs-card",
              className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "screenshot-container",
                    className: "relative flex w-full flex-1 items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                          alt: "Laravel documentation screenshot",
                          className: "aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                          onError: handleImageError
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                          alt: "Laravel documentation screenshot",
                          className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: "docs-card-content",
                      className: "flex items-start gap-6 lg:flex-col",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "size-5 sm:size-6",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  fill: "#FF2D20",
                                  d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5 lg:pt-0", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "size-6 shrink-0 stroke-[#FF2D20]",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxs("g", { fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-5 sm:size-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm/relaxed", children: [
                "Laravel's robust library of first-party tools and libraries, such as",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://forge.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                    children: "Forge"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://vapor.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Vapor"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://nova.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Nova"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://envoyer.io",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Envoyer"
                  }
                ),
                ", and",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://herd.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Herd"
                  }
                ),
                " ",
                "help you take your projects to the next level. Pair them with powerful open source libraries like",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/billing",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Cashier"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/dusk",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Dusk"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/broadcasting",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Echo"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/horizon",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Horizon"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/sanctum",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Sanctum"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/telescope",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Telescope"
                  }
                ),
                ", and more."
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("footer", { className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
          "Laravel v",
          laravelVersion,
          " (PHP v",
          phpVersion,
          ")"
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About/AboutPage.jsx": __vite_glob_0_0, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_1, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_2, "./Pages/Auth/Login.jsx": __vite_glob_0_3, "./Pages/Auth/Register.jsx": __vite_glob_0_4, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_5, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_6, "./Pages/Book/PowerFlushPage.jsx": __vite_glob_0_7, "./Pages/Book/QuotePage.jsx": __vite_glob_0_8, "./Pages/Book/RepairPage.jsx": __vite_glob_0_9, "./Pages/Book/ServicePage.jsx": __vite_glob_0_10, "./Pages/Dashboard.jsx": __vite_glob_0_11, "./Pages/Home.jsx": __vite_glob_0_12, "./Pages/PrivacyPolicyPage.jsx": __vite_glob_0_13, "./Pages/Profile/Edit.jsx": __vite_glob_0_14, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_15, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_16, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_17, "./Pages/TermsConditionsPage.jsx": __vite_glob_0_18, "./Pages/Welcome.jsx": __vite_glob_0_19 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
