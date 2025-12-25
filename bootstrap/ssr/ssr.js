import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, usePage, Head, useForm, createInertiaApp } from "@inertiajs/react";
import { useState, useEffect, forwardRef, useRef, useImperativeHandle, useMemo, createContext, useContext } from "react";
import { Flame, X, Menu, ArrowRight, Phone, Mail, MapPin, Shield, Award, Users, Clock, MessageCircleMore, Touchpad, Hammer, CheckCircle2, MessageSquare, ChevronRight, ArrowLeft, Home as Home$2, Building2, Castle, Building } from "lucide-react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaGasPump, FaOilCan, FaCheckCircle, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiAward, FiHeart, FiTag, FiStar, FiShield, FiZap, FiRefreshCcw, FiHome, FiTool, FiClock, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
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
function Header({
  textColor = "text-slate-900",
  buttonBg = "bg-dark",
  buttonText = "text-white",
  navInactive = "bg-white/80 text-slate-800",
  navActive = "bg-black text-white"
}) {
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
            /* @__PURE__ */ jsx("span", { className: `text-2xl font-semibold ${textColor}`, children: "MD Gas" })
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
            className: `rounded-full px-6 py-2 text-sm font-medium transition shadow-sm cursor-pointer ${active ? navActive : navInactive}
                                        `,
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
          "button",
          {
            type: "button",
            onClick: () => {
              closeMega();
            },
            className: `hidden gap-2 items-center rounded-full px-4 py-2 text-sm font-medium cursor-pointer ${buttonBg} ${buttonText} hover:opacity-80 transition sm:flex`,
            children: [
              /* @__PURE__ */ jsx(AiOutlineWhatsApp, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Chat Now" })
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
const VALUES = [
  {
    icon: Shield,
    title: "Safety First",
    description: "All engineers are Gas Safe registered and receive ongoing training to maintain the highest safety standards."
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description: "We guarantee workmanship and back installations with manufacturer and labour warranties."
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Clear pricing, friendly engineers and proactive communication on every job."
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "On-time arrivals, rapid emergency response and dependable aftercare."
  }
];
const STATS = [
  { key: "years", value: 15, label: "Years in business" },
  { key: "customers", value: 5e3, label: "Happy customers" },
  { key: "jobs", value: 1e4, label: "Jobs completed" },
  { key: "support", value: 24, label: "Emergency support (hrs)" }
];
function AboutPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "About Us";
  const [counters, setCounters] = useState(
    STATS.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {})
  );
  useEffect(() => {
    let raf;
    const duration = 900;
    const start = performance.now();
    const animate = (t) => {
      const elapsed = Math.min(t - start, duration);
      const progress = elapsed / duration;
      const next = {};
      STATS.forEach((s) => {
        next[s.key] = Math.floor(s.value * progress);
      });
      setCounters(next);
      if (elapsed < duration) raf = requestAnimationFrame(animate);
      else {
        const final = {};
        STATS.forEach((s) => final[s.key] = s.value);
        setCounters(final);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen rounded-b-3xl bg-foreground text-gray-900", children: [
      /* @__PURE__ */ jsx(Header, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("main", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative pt-40 pb-14 px-4 sm:px-6 lg:px-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-72 h-72 bg-indigo-100/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full", children: [
                /* @__PURE__ */ jsx("div", { className: "h-2 w-2 bg-indigo-500 rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Trusted Since 2012" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight", children: [
                  "Reliable Heating",
                  /* @__PURE__ */ jsx("span", { className: "block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600", children: "Solutions for London" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-1 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed max-w-xl", children: "For over a decade, MD Gas has been providing professional boiler services across Greater London with transparent pricing and reliable engineering." }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
                "✓ Gas Safe Registered & Certified",
                "✓ 24/7 Emergency Support Available",
                "✓ Fixed Pricing - No Hidden Fees",
                "✓ Same-Day Service When Needed"
              ].map((item, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold", children: "✓" }),
                    /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: item.split("✓ ")[1] })
                  ]
                },
                index
              )) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-6 pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "rounded-xl px-8 text-foreground bg-gradient-to-r from-dark via-dark/80 to-primary hover:from-gray-800 hover:to-gray-900 shadow-md hover:shadow-lg transition-all duration-300",
                    children: /* @__PURE__ */ jsx(Link, { href: "/book/quote", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                      "Book a Service",
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M13 7l5 5m0 0l-5 5m5-5H6"
                            }
                          )
                        }
                      )
                    ] }) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    variant: "outline",
                    className: "rounded-xl px-8 border-gray-300 bg-gray-50 hover:border-gray-400 transition-all",
                    children: /* @__PURE__ */ jsx(Link, { href: "/services", children: /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2", children: "View All Services" }) })
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl shadow-xl", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/professional-gas-engineer-working-on-boiler.jpg",
                    alt: "Professional gas engineer servicing boiler",
                    className: "w-full h-[420px] object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider", children: "Experience" }),
                  /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: "15+ Years" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 divide-x divide-gray-200", children: STATS.map((s) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "px-4 text-center",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: s.key === "support" ? "24/7" : `${s.value}${s.value >= 1e3 ? "+" : ""}` }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mt-1", children: s.label })
                  ]
                },
                s.key
              )) }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "py-16 lg:py-5", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 h-[600px] bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30 -z-10" }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-px w-8 bg-gradient-to-r from-indigo-500 to-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-indigo-600 uppercase tracking-wider", children: "Our Foundation" })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight", children: "Built on Core Values" }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed", children: "Safety, quality and customers-first — the foundation of every job we complete in Greater London." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-12 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8", children: VALUES.map((value) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 \n                   hover:shadow-lg hover:border-indigo-100 transition-all duration-300 \n                   hover:-translate-y-1",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 bg-gradient-to-br from-white to-indigo-50/30 opacity-0 \n                        group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "inline-flex items-center justify-center w-14 h-14 rounded-xl \n                        bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 \n                        group-hover:from-indigo-100 group-hover:to-blue-100 transition-all",
                      children: /* @__PURE__ */ jsx(value.icon, { className: "h-7 w-7 text-indigo-600" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors", children: value.title }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 text-gray-600 leading-relaxed", children: value.description })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover:bg-indigo-500 transition-colors" }),
                    "Learn more"
                  ] }) })
                ]
              },
              value.title
            )) }),
            /* @__PURE__ */ jsx("div", { className: "mt-16 pt-8 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 uppercase tracking-wider", children: "Why it matters" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mt-1", children: "Your safety and satisfaction come first" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: [
                {
                  value: "100%",
                  label: "Gas Safe Compliance"
                },
                {
                  value: "24/7",
                  label: "Support Available"
                },
                {
                  value: "0%",
                  label: "Hidden Fees"
                }
              ].map((item, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: item.value }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mt-1", children: item.label })
                  ]
                },
                index
              )) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "relative py-20 lg:py-24 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 w-64 h-64 bg-indigo-100/30 rounded-full -translate-y-1/2 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full w-full",
              style: {
                backgroundImage: `linear-gradient(to right, #9ca3af 1px, transparent 1px),
                        linear-gradient(to bottom, #9ca3af 1px, transparent 1px)`,
                backgroundSize: "60px 60px"
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gradient-to-r from-indigo-500 to-blue-500" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-indigo-600 uppercase tracking-widest", children: "Our Journey" })
                ] }),
                /* @__PURE__ */ jsxs("h2", { className: "text-4xl lg:text-5xl font-bold text-gray-900 leading-tight", children: [
                  "From a single van",
                  /* @__PURE__ */ jsx("span", { className: "block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600", children: "To London's trusted name" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-blue-300 to-transparent" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-8 pl-6", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute left-[-3px] w-2 h-2 rounded-full bg-indigo-600" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Started in 2012 with a simple mission: provide honest, reliable heating services at fair prices to London homeowners." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute left-[-3px] mt-2 w-2 h-2 rounded-full bg-blue-600" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Grew through word-of-mouth by consistently delivering quality workmanship and building lasting relationships." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute left-[-3px] mt-2 w-2 h-2 rounded-full bg-indigo-500" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Today, we're a team of certified engineers using advanced diagnostic tools while maintaining our founding principles." })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl shadow-lg border border-gray-100", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/images/engineers-image.jpg",
                      alt: "MD Gas professional engineer team",
                      className: "w-full h-[400px] object-cover",
                      loading: "lazy"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl px-4 py-3 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Since" }),
                    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: "2012" })
                  ] }) }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/70 to-transparent p-6 rounded-b-2xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-white font-semibold", children: "MD Gas Engineers" }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm mt-1", children: "Gas Safe Certified • London" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2", children: [
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-4 h-4 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium", children: "Certified" })
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl -z-10" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-indigo-50/30 border border-gray-100 shadow-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full opacity-5", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-64 h-64 border border-indigo-200 rounded-full -translate-x-1/2 -translate-y-1/2" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 border border-blue-200 rounded-full translate-x-1/3 translate-y-1/3" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative p-8 lg:p-12 bg-gradient-to-br from-indigo-600/10 to-blue-600/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-8", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 \n                          flex items-center justify-center shadow-lg",
                          children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              className: "w-6 h-6 text-white",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                }
                              )
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900", children: "Our Promise" }),
                        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Unchanging since day one" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-indigo-600" }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: "Integrity First" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Honest service, fair pricing" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-blue-600" }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: "Quality Craftsmanship" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Work that lasts" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-indigo-500" }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: "Customer Care" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Your peace of mind matters" })
                        ] })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-8 lg:p-12", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -left-2 text-5xl text-indigo-100 font-serif", children: '"' }),
                    /* @__PURE__ */ jsx("blockquote", { className: "text-xl lg:text-2xl text-gray-800 leading-relaxed font-light pl-6", children: "To deliver exceptional heating services with integrity, transparency, and craftsmanship that stands the test of time — ensuring every home we serve enjoys reliable warmth and peace of mind." }),
                    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 -right-2 text-5xl text-indigo-100 font-serif rotate-180", children: '"' })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-10 pt-8 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: "MD Gas Team" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Trusted since 2012" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: [1, 2, 3].map(
                      (_, i) => /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-2 h-2 rounded-full bg-indigo-400"
                        },
                        i
                      )
                    ) })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 right-6", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-r-2 border-b-2 border-indigo-300" }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 lg:py-3", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 lg:mb-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gradient-to-r from-indigo-500 to-blue-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-indigo-600 uppercase tracking-widest", children: "Professional Accreditations" }),
              /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gradient-to-r from-blue-500 to-indigo-500" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-gray-900 mb-4", children: "Certified Excellence" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Our professional certifications ensure the highest standards of safety and quality." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8", children: [
            {
              title: "Gas Safe Registered",
              description: "Fully certified and compliant with all UK gas safety regulations",
              icon: FaGasPump,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "OFTEC Certified",
              description: "Qualified for oil heating installations and servicing",
              icon: FaOilCan,
              color: "from-emerald-500 to-green-500"
            },
            {
              title: "Which? Trusted Trader",
              description: "Vetted and approved by the UK's leading consumer champion",
              icon: FaCheckCircle,
              color: "from-purple-500 to-indigo-500"
            },
            {
              title: "Checkatrade Verified",
              description: "Rated and reviewed by customers with proven track record",
              icon: FaStar,
              color: "from-amber-500 to-orange-500"
            }
          ].map((cert, index) => {
            const IconComponent = cert.icon;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 \n                     hover:border-indigo-200 hover:shadow-xl transition-all duration-300 \n                     hover:-translate-y-1",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-blue-50 transform rotate-45 translate-x-8 -translate-y-8" }) }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 \n                          text-white flex items-center justify-center text-sm font-bold shadow-md",
                      children: index + 1
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} 
                          flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`,
                      children: /* @__PURE__ */ jsx(IconComponent, { className: "h-7 w-7 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-3", children: cert.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: cert.description }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-100 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-indigo-600", children: "Verified & Certified" }),
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-4 h-4 text-green-500",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            fillRule: "evenodd",
                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                            clipRule: "evenodd"
                          }
                        )
                      }
                    )
                  ] })
                ]
              },
              cert.title
            );
          }) })
        ] }) }),
        /* @__PURE__ */ jsxs("section", { className: "relative py-16 overflow-hidden rounded-b-3xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative max-w-3xl mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white", children: "Ready to get started?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-white/90", children: "Book a free quote or request emergency service — we’ll be there." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "rounded-full bg-white text-indigo-600 hover:bg-gray-100 px-10 shadow-lg",
                  children: /* @__PURE__ */ jsx(Link, { href: "/book/quote", children: "Get a Quote" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  size: "lg",
                  className: "rounded-full border-white text-white hover:bg-white/10 px-10",
                  children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "tel:08001234567",
                      className: "inline-flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                        "0800 123 4567"
                      ]
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-sm text-white/80", children: "Trusted by thousands of homeowners across London" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
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
function ServiceCards() {
  const steps = [
    {
      title: "You answer",
      description: "Tell us a few simple details about your home and current boiler setup.",
      icon: MessageCircleMore,
      badge: "Start here",
      step: "STEP 01"
    },
    {
      title: "You pick",
      description: "Choose your preferred boiler and package from fixed, transparent pricing.",
      icon: Touchpad,
      badge: "Choose",
      step: "STEP 02"
    },
    {
      title: "We fit",
      description: "Your chosen boiler is installed by a trusted, local Gas Safe engineer.",
      icon: Hammer,
      badge: "Installation",
      step: "STEP 03"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden rounded-t-[45px] bg-gradient-to-b from-[#F4F7FB] via-[#F3F6FB] to-[#EEF3FA] py-16 sm:py-24", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-[#fde5cf] blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-0", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-[500] tracking-tight text-dark leading-10", children: [
            "Get a",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-bold font-marcellus text-primary text-[42px]", children: "fixed online price" }),
            ",",
            /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
            /* @__PURE__ */ jsx("span", { className: "inline-block", children: "without a salesperson in sight." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg text-dark/70", children: "Simple, transparent, and fully online — the way it should be." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-0 right-0 top-1/2 hidden h-[1px] -translate-y-1/2 bg-primary/70 sm:block" }),
          /* @__PURE__ */ jsx("div", { className: "relative grid gap-4 sm:grid-cols-3", children: steps.map((step) => {
            const Icon = step.icon;
            return /* @__PURE__ */ jsxs(
              "article",
              {
                className: "relative z-[1] flex h-full flex-col rounded-[24px] border border-white/70 bg-white/90 px-4 py-5 sm:px-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-white",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.55)]", children: /* @__PURE__ */ jsx(
                      Icon,
                      {
                        className: "h-5 w-5 text-white",
                        strokeWidth: 2.2
                      }
                    ) }) }),
                    /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500", children: step.badge })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "mt-4 text-[18px] font-semibold text-dark", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[14px] leading-relaxed text-dark/70", children: step.description }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-start gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-[5px] text-[11px] font-medium tracking-[0.16em] text-slate-600 uppercase", children: step.step }),
                    /* @__PURE__ */ jsx("span", { className: "h-[2px] w-16 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" })
                  ] })
                ]
              },
              step.title
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-full flex-col rounded-[30px] border border-dashed border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-primary" }),
          "Online, start to finish"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex h-full flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[15px] font-semibold uppercase tracking-[0.2em] text-dark/60", children: "Three simple steps" }),
            /* @__PURE__ */ jsx("p", { className: "text-[17px] leading-relaxed text-dark", children: "From first click to a fully-installed boiler, everything happens online with clear pricing and no pushy home visit." }),
            /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-[16px] text-dark", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" }),
                /* @__PURE__ */ jsx("span", { children: "Instant fixed-price quote." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/80" }),
                /* @__PURE__ */ jsx("span", { children: "Pick your boiler and date." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/60" }),
                /* @__PURE__ */ jsx("span", { children: "Gas Safe engineer fits it on-site." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 text-[15px] text-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-dark px-3.5 py-1.5", children: "No sales visit" }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-dark px-3.5 py-1.5", children: "Done in minutes" })
          ] })
        ] })
      ] }) })
    ] }) })
  ] });
}
const BENEFITS = [
  {
    title: "Trusted installer.",
    description: "Accredited by leading industry bodies so you know your installation is in safe hands.",
    icon: FiAward,
    iconColor: "text-sky-400"
  },
  {
    title: "All-inclusive aftercare.",
    description: "Every installation comes with our workmanship guarantee and dedicated support.",
    icon: FiHeart,
    iconColor: "text-blue-400"
  },
  {
    title: "Price promise.",
    description: "If you find a genuine like-for-like quote that’s cheaper, we’ll match it. Simple.",
    icon: FiTag,
    iconColor: "text-violet-400"
  },
  {
    title: "5 star reviews.",
    description: "Thousands of verified 5★ reviews across platforms like Trustpilot and Google.",
    icon: FiStar,
    iconColor: "text-emerald-400"
  },
  {
    title: "We give back.",
    description: "For every energy-saving installation, we donate to carefully chosen charities.",
    icon: FiShield,
    iconColor: "text-pink-400"
  },
  {
    title: "A safe choice.",
    description: "Gas Safe registered engineers and fully certified for boiler and heating work.",
    icon: FiZap,
    iconColor: "text-amber-400"
  }
];
function WhyChooseUs() {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-dark/90 py-16 sm:py-20", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-0", children: [
      /* @__PURE__ */ jsxs("header", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary bg-dark/30 px-3 py-1", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200", children: "Why choose us" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white", children: "Benefits that come as standard" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm sm:text-base text-slate-300/90", children: "Everything we do is built around peace of mind, clear pricing and long-term support." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-6 md:grid-cols-2 items-stretch", children: BENEFITS.map((item) => {
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          "article",
          {
            className: "\r\n                                    relative flex h-full items-center gap-4 \r\n                                    rounded-2xl border border-slate-800/80 \r\n                                    bg-background/20\r\n                                    p-5 sm:p-6 \r\n                                    shadow-[0_10px_30px_rgba(0,0,0,0.4)] \r\n                                    backdrop-blur-md \r\n                                    transition-colors duration-300 \r\n                                    hover:border-primary\r\n                                ",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "\r\n                                        pointer-events-none\r\n                                        absolute inset-y-2 left-0\r\n                                        w-[3px]\r\n                                        rounded-full \r\n                                        bg-primary\r\n                                        shadow-[0_0_8px_rgba(56,189,248,0.45)]\r\n                                    "
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900", children: /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950", children: /* @__PURE__ */ jsx(
                Icon,
                {
                  className: `h-6 w-6 ${item.iconColor}`
                }
              ) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-[15px] font-semibold text-white", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-[13px] sm:text-sm leading-relaxed text-slate-300/90", children: item.description }),
                /* @__PURE__ */ jsx("div", { className: "flex-1" })
              ] })
            ]
          },
          item.title
        );
      }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-10 text-center text-xl text-foreground/80", children: "…so, why wouldn't you choose us?" })
    ] })
  ] });
}
const services = [
  {
    id: "repair",
    title: "Boiler Repair",
    description: "Fast boiler repairs with fixed labour.",
    image: "/images/product_boiler.png",
    highlight: "From £75 Labour",
    href: "/book/quote?service=repair",
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
    href: "/book/quote?service=service",
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
    href: "/book",
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
    href: "/book/quote?service=powerflush",
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
function HeroServices() {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-4", children: services.map((service) => /* @__PURE__ */ jsxs(
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
  )) });
}
function Home$1() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Header,
      {}
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-20 px-4 rounded-b-[45px] overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(45deg,transparent_98%,#f1f5f9_98%)] bg-[length:40px_40px] opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-dark", children: "Upgrade Your" }),
            /* @__PURE__ */ jsx("span", { className: "block text-dark mt-2", children: "Boiler &" }),
            /* @__PURE__ */ jsx("span", { className: "block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2", children: "Win £5,000" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 leading-relaxed max-w-lg", children: "Book your installation before 19th December for automatic entry into our festive prize draw. No hidden fees, fixed pricing." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl opacity-50" }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-blue-100/50 p-8 md:p-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-dark mb-3", children: "Get Your Instant Quote" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Enter your postcode for an immediate price estimate" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -top-2 left-4 px-2 bg-white text-xs font-medium text-slate-500", children: "Postcode" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. SW1A 1AA",
                    className: "w-full px-5 py-4 rounded-xl border border-slate-300 text-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/book/quote?service=new",
                  className: "w-full flex justify-center items-center px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 shadow-lg shadow-[var(--primary)]/20",
                  children: "Get quote →"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-6 text-sm text-slate-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" }),
                /* @__PURE__ */ jsx("span", { children: "No obligation" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" }),
                /* @__PURE__ */ jsx("span", { children: "Instant quote" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" }),
                /* @__PURE__ */ jsx("span", { children: "Prize entry" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-10 right-10 w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-0 p-15 py-20 rounded-[45px]", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(HeroServices, {}) }) }),
    /* @__PURE__ */ jsx(WhyChooseUs, {}),
    /* @__PURE__ */ jsx(ServiceCards, {}),
    /* @__PURE__ */ jsx(Faq, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home$1
}, Symbol.toStringTag, { value: "Module" }));
function PageHeader() {
  const waHref = "https://wa.me/441234567890";
  const waNumber = "0330 113 1333";
  return /* @__PURE__ */ jsx("header", { className: "border border-b-dark/15", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 sm:px-8 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "flex h-[75px] items-center justify-between", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: "/",
        className: "flex items-center gap-3",
        "aria-label": "MD Gas home",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-10 w-10 rounded-md flex items-center justify-center shadow-sm",
              style: { backgroundColor: "var(--primary)" },
              children: /* @__PURE__ */ jsx(Flame, { className: "h-5 w-5 text-light-background" })
            }
          ),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-dark leading-none", children: "MD Gas" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: waHref,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "slim-bar relative inline-flex items-center rounded-md px-3 pr-8 py-1.5 gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,103,255,0.16)]",
        "aria-label": `Chat on WhatsApp ${waNumber}`,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "icon-square inline-flex items-center justify-center h-8 w-8 rounded-sm",
              style: {
                background: "rgba(0,103,255,0.06)",
                border: "1px solid rgba(0,103,255,0.06)"
              },
              children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "divider hidden sm:block", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-xs text-dark", children: "Chat" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-dark", children: waNumber }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "chev hidden sm:inline-flex items-center justify-center h-6 w-6 rounded-sm",
              "aria-hidden": true,
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-dark" })
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "status-blink",
              "aria-hidden": "true",
              title: "Online"
            }
          )
        ]
      }
    )
  ] }) }) });
}
function Stepper({
  title = "Boiler Repair Quote",
  steps = [],
  basePrice = 0,
  currency = "£",
  onSubmit
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = steps[index] || null;
  const displayOptions = useMemo(() => {
    if (!current?.options) return [];
    return current.options.map(
      (opt) => typeof opt === "string" ? { label: opt, price: 0 } : { label: opt.label, price: opt.price || 0 }
    );
  }, [current]);
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(
    answeredCount / Math.max(1, steps.length) * 100
  );
  const ICONS = [FiHome, FiTool, FiClock, FiStar];
  function choose(option) {
    if (!current) return;
    setAnswers((s) => ({ ...s, [current.id]: option }));
  }
  function next() {
    if (!answers[current?.id]) return;
    setIndex((i) => Math.min(steps.length - 1, i + 1));
  }
  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function restart() {
    setIndex(0);
    setAnswers({});
  }
  const pricing = useMemo(() => {
    let extras = 0;
    Object.values(answers).forEach((opt) => {
      if (opt?.price) extras += opt.price;
    });
    return {
      base: basePrice,
      extras,
      total: basePrice + extras
    };
  }, [answers, basePrice]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-light-grey -z-10" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-light-grey", children: [
      /* @__PURE__ */ jsx(PageHeader, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-10 py-16 px-4 sm:px-6 lg:px-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-dark tracking-tight", children: title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xl text-sm text-muted-foreground", children: "Answer a few quick questions to get a clear, fixed-price estimate." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group relative flex items-center gap-4 px-5 py-3 rounded-2xl bg-white border border-primary/50 shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary to-dark/90" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-lg bg-primary/80 text-foreground shrink-0", children: /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" }),
                  /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: "Certified Engineers" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-dark", children: "Gas Safe Registered" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch", children: [
          /* @__PURE__ */ jsxs("aside", { className: "md:col-span-4 glass-dark p-8 rounded-3xl overflow-hidden h-full flex flex-col relative", children: [
            /* @__PURE__ */ jsx("div", { className: "sheen absolute inset-0 pointer-events-none rounded-3xl" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-primary", children: "Why choose us" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: restart,
                  className: "inline-flex items-center gap-2 cursor-pointer text-xs bg-foreground text-dark px-3 py-1.5 rounded-full",
                  children: [
                    /* @__PURE__ */ jsx(FiRefreshCcw, {}),
                    " Reset"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-5 text-sm leading-relaxed text-foreground/90", children: [
              /* @__PURE__ */ jsx("li", { children: "✓ Certified & trusted engineers" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Transparent pricing" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Warranty included" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl bg-foreground p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Your price" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-3xl font-extrabold text-dark", children: [
                currency,
                pricing.total
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
                "Base ",
                currency,
                pricing.base,
                pricing.extras > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " ",
                  "• Extras +",
                  currency,
                  pricing.extras
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-8", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground/70 mb-2", children: "Progress" }),
              /* @__PURE__ */ jsx("div", { className: "progress-track w-full rounded-full", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "progress-fill",
                  style: { width: `${progress}%` }
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-foreground/60", children: [
                answeredCount,
                "/",
                steps.length,
                " answered •",
                " ",
                progress,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("section", { className: "md:col-span-8 h-full flex", children: /* @__PURE__ */ jsxs("div", { className: "glass-root p-8 rounded-3xl w-full flex flex-col relative", children: [
            /* @__PURE__ */ jsx("div", { className: "radial-highlight absolute inset-0 pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Question" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Step ",
                index + 1,
                " of ",
                steps.length
              ] })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-center text-dark mb-8", children: current?.question }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full", children: displayOptions.map((opt, i) => {
              const active = answers[current?.id]?.label === opt.label;
              const Icon = ICONS[i % ICONS.length];
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: `option-card ${active ? "option-active sheen" : "option-inactive"}`,
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "p-4 rounded-2xl w-full cursor-pointer",
                      onClick: () => choose(opt),
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `icon-wrap ${active ? "icon-active" : "icon-inactive"}`,
                            children: /* @__PURE__ */ jsx(Icon, {})
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-start", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-semibold text-dark", children: opt.label }),
                          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: active ? "Best choice for quick fix" : "Tap to select" })
                        ] }),
                        opt.price > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          "+",
                          currency,
                          opt.price
                        ] }),
                        active && /* @__PURE__ */ jsx(FiCheck, { className: "text-primary text-lg" })
                      ] })
                    }
                  )
                },
                opt.label
              );
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-10 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: answers[current?.id] ? `You chose: ${answers[current.id].label}` : "Please choose an option" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: back,
                    disabled: index === 0,
                    className: `btn-pill flex gap-1 items-center cursor-pointer ${index === 0 ? "btn-disabled" : ""}`,
                    children: [
                      /* @__PURE__ */ jsx(FiChevronLeft, {}),
                      " Back"
                    ]
                  }
                ),
                index < steps.length - 1 ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: next,
                    disabled: !answers[current?.id],
                    className: `btn-gloss flex gap-1 items-center cursor-pointer ${!answers[current?.id] ? "btn-disabled" : ""}`,
                    children: [
                      "Next ",
                      /* @__PURE__ */ jsx(FiChevronRight, {})
                    ]
                  }
                ) : /* @__PURE__ */ jsxs("button", { className: "btn-gloss flex gap-1 items-center cursor-pointer", children: [
                  "Get Estimate ",
                  /* @__PURE__ */ jsx(FiCheck, {})
                ] })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
const STEPS$3 = [
  {
    id: "property_type",
    question: "What type of property is the new boiler for?",
    options: ["Flat", "House (2–3 bed)", "House (4+ bed)", "Commercial"]
  },
  {
    id: "fuel",
    question: "Preferred fuel type?",
    options: ["Mains Gas", "LPG / Propane", "Electric", "Oil"]
  },
  {
    id: "heat_requirements",
    question: "Do you need central heating + hot water or hot water only?",
    options: ["Heating + Hot Water", "Hot Water only"]
  },
  {
    id: "budget",
    question: "Estimated budget for installation?",
    options: ["Under £1k", "£1k–£2.5k", "£2.5k+"]
  }
];
function NewBoilerQuote() {
  return /* @__PURE__ */ jsx(Stepper, { title: "New Boiler Quote", steps: STEPS$3 });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewBoilerQuote
}, Symbol.toStringTag, { value: "Module" }));
const STEPS$2 = [
  {
    id: "radiators",
    question: "Are your radiators cold at the bottom?",
    options: ["Yes", "No"]
  },
  {
    id: "noisy",
    question: "Do your radiators make noise?",
    options: ["Yes", "No"]
  },
  {
    id: "system_size",
    question: "How many radiators roughly?",
    options: ["1–5", "6–10", "10+"]
  }
];
function PowerflushQuote() {
  return /* @__PURE__ */ jsx(Stepper, { title: "Power Flush", basePrice: 180, steps: STEPS$2 });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PowerflushQuote
}, Symbol.toStringTag, { value: "Module" }));
function GoogleReview() {
  return /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm", children: [
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
  ] }) });
}
const pageTitle = "Get a Quote";
const SERVICE_KEYS = {
  REPAIR: "repair",
  NEW: "new",
  POWERFLUSH: "powerflush",
  SERVICE: "service"
};
const SERVICE_CONTENT = {
  [SERVICE_KEYS.REPAIR]: {
    slug: SERVICE_KEYS.REPAIR,
    heroTitle: "Fast boiler repair — same-day engineers, transparent pricing.",
    heroDesc: "Emergency diagnosis and on-site fixes. Fixed labour rates, clear parts pricing — we prioritise safety and speed.",
    badge: "Boiler Repair",
    sampleJobLabel: "Boiler Repair • £250",
    estimateLabel: "Typical fix",
    labour: "£120",
    parts: "£80",
    gaugeLabel: "Repair success",
    gaugeValueText: "82%",
    cta: "Get your personalised quote"
  },
  [SERVICE_KEYS.NEW]: {
    slug: SERVICE_KEYS.NEW,
    heroTitle: "New boiler installations — efficient, tested, guaranteed.",
    heroDesc: "Supply & install modern, high-efficiency boilers. Full removal, install, commissioning and certificates included.",
    badge: "New Boiler",
    sampleJobLabel: "New Boiler • From £1,200",
    estimateLabel: "Install estimate",
    labour: "£600",
    parts: "£600",
    gaugeLabel: "Install success",
    gaugeValueText: "95%",
    cta: "Get installation quote"
  },
  [SERVICE_KEYS.POWERFLUSH]: {
    slug: SERVICE_KEYS.POWERFLUSH,
    heroTitle: "Power flush — deep clean for radiators & pipework.",
    heroDesc: "Remove sludge and improve circulation to restore performance and reduce breakdowns. Ideal when radiators are cold or noisy.",
    badge: "Power Flush",
    sampleJobLabel: "Power Flush • From £180",
    estimateLabel: "System clean",
    labour: "£120",
    parts: "—",
    gaugeLabel: "Flow restored",
    gaugeValueText: "88%",
    cta: "Book a power flush"
  },
  [SERVICE_KEYS.SERVICE]: {
    slug: SERVICE_KEYS.SERVICE,
    heroTitle: "Annual boiler service — safety checks & reliability.",
    heroDesc: "Annual safety inspection, combustion check and preventative maintenance to keep your system efficient and safe.",
    badge: "Boiler Service",
    sampleJobLabel: "Boiler Service • From £65",
    estimateLabel: "Annual check",
    labour: "£65",
    parts: "—",
    gaugeLabel: "Pass rate",
    gaugeValueText: "99%",
    cta: "Schedule service"
  }
};
function getServiceFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("service");
    if (q) return q.toLowerCase();
    const hash = (window.location.hash || "").replace("#", "");
    if (hash) return hash.toLowerCase();
  } catch (e) {
  }
  return SERVICE_KEYS.REPAIR;
}
function QuotePage() {
  const radius = 14;
  const [serviceKey, setServiceKey] = useState(() => {
    const s = getServiceFromUrl();
    return Object.values(SERVICE_KEYS).includes(s) ? s : SERVICE_KEYS.REPAIR;
  });
  useEffect(() => {
    function handleChange() {
      const s = getServiceFromUrl();
      setServiceKey(
        Object.values(SERVICE_KEYS).includes(s) ? s : SERVICE_KEYS.REPAIR
      );
    }
    window.addEventListener("popstate", handleChange);
    window.addEventListener("hashchange", handleChange);
    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-page"]
    });
    return () => {
      window.removeEventListener("popstate", handleChange);
      window.removeEventListener("hashchange", handleChange);
      observer.disconnect();
    };
  }, []);
  const content = useMemo(
    () => SERVICE_CONTENT[serviceKey] || SERVICE_CONTENT[SERVICE_KEYS.REPAIR],
    [serviceKey]
  );
  const parseGaugePercent = (text) => {
    const n = parseInt(String(text || "").replace("%", ""), 10);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) / 100 : 0.7;
  };
  const gaugePercent = parseGaugePercent(content.gaugeValueText);
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * gaugePercent;
  const gap = Math.max(0, circumference - dash);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Get a Quote" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-dvh bg-gradient-to-b from-slate-50 to-white text-slate-900", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: pageTitle }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 mt-16", children: [
        /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl md:mx-0 mx-auto text-center md:text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-dark px-3 py-1 rounded-full text-xs font-medium mb-4", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "aria-hidden": true,
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3 12h18"
                    }
                  )
                }
              ),
              content.badge,
              " quote"
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl line-clamp-2", children: (() => {
              const words = content.heroTitle.split(" ");
              const firstTwo = words.slice(0, 2).join(" ");
              const rest = words.slice(2).join(" ");
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: firstTwo }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-dark", children: rest })
              ] });
            })() }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-base text-slate-600 max-w-prose", children: content.heroDesc }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route(
                    `book.quote.${content.slug}`
                  ),
                  className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary/80 via-primary/70 via-primary/40 to-secondary/20 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_8px_28px_rgba(23,42,68,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200",
                  "aria-label": content.cta,
                  children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "w-4 h-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M12 4v16m8-8H4"
                          }
                        )
                      }
                    ),
                    content.cta
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#contact-expert",
                  className: "inline-flex items-center justify-center rounded-full border border-dark/70 bg-white px-4 py-3 text-sm font-medium text-slate-900",
                  children: "Book a technician"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4", children: /* @__PURE__ */ jsx("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-3 gap-5", children: [
              {
                title: "Gas Safe certified",
                desc: "Qualified engineers for safe, compliant work."
              },
              {
                title: "Transparent invoices",
                desc: "Clear breakdown of labour & parts."
              },
              {
                title: "Parts warranty",
                desc: "Manufacturer-backed parts where applicable."
              }
            ].map((f, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex gap-3 items-start rounded-lg border border-dark/6  p-3",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "h-9 w-9 flex-none rounded-md bg-primary grid place-items-center text-foreground", children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "w-5 h-5",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeWidth: "1.4",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M5 13l4 4L19 7"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-slate-900", children: f.title }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 mt-1", children: f.desc })
                  ] })
                ]
              },
              i
            )) }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 p-6 shadow-[0_18px_40px_rgba(6,34,20,0.06)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-md bg-primary/10 p-2", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "w-5 h-5 text-primary",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": true,
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeWidth: "1.6",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3 12h18"
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-dark/60", children: content.estimateLabel }),
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-dark leading-tight", children: content.sampleJobLabel })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-dark/60", children: "Demo • No obligation" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-white p-3 border border-white/30 flex items-center justify-center", children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  viewBox: "0 0 220 140",
                  className: "w-full h-24",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": true,
                  children: [
                    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                      "linearGradient",
                      {
                        id: "accentGrad2",
                        x1: "0",
                        x2: "1",
                        children: [
                          /* @__PURE__ */ jsx(
                            "stop",
                            {
                              offset: "0",
                              stopColor: "#0067ff",
                              stopOpacity: "0.85"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "stop",
                            {
                              offset: "1",
                              stopColor: "#0067ff40",
                              stopOpacity: "0.65"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      "rect",
                      {
                        x: "20",
                        y: "62",
                        width: "180",
                        height: "44",
                        rx: "8",
                        fill: "#ffffff",
                        stroke: "#d9e2f1",
                        strokeWidth: "1"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M20 62 L110 20 L200 62 Z",
                        fill: "url(#accentGrad2)",
                        opacity: "0.95",
                        stroke: "#c7d8f5",
                        strokeWidth: "1"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center sm:justify-end", children: /* @__PURE__ */ jsx("div", { className: "w-28 h-28 flex items-center justify-center rounded-full bg-white/60 border border-white/30 p-2", children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "84",
                  height: "84",
                  viewBox: "0 0 36 36",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": true,
                  children: [
                    /* @__PURE__ */ jsx(
                      "circle",
                      {
                        cx: "18",
                        cy: "18",
                        r: radius,
                        fill: "none",
                        stroke: "#f6fdf8",
                        strokeWidth: "3"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "circle",
                      {
                        cx: "18",
                        cy: "18",
                        r: radius,
                        fill: "none",
                        stroke: "url(#g3)",
                        strokeWidth: "3",
                        strokeLinecap: "round",
                        strokeDasharray: `${dash.toFixed(
                          2
                        )} ${gap.toFixed(2)}`,
                        transform: "rotate(-90 18 18)"
                      }
                    ),
                    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                      "linearGradient",
                      {
                        id: "g3",
                        x1: "0",
                        x2: "1",
                        children: [
                          /* @__PURE__ */ jsx(
                            "stop",
                            {
                              offset: "0",
                              stopColor: "#0067ff"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "stop",
                            {
                              offset: "1",
                              stopColor: "#0067ff40"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: "18",
                        y: "16.6",
                        textAnchor: "middle",
                        fontSize: "5",
                        fill: "#065f46",
                        fontWeight: "700",
                        children: content.gaugeValueText
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: "18",
                        y: "21.4",
                        textAnchor: "middle",
                        fontSize: "4",
                        fill: "#065f46",
                        children: content.gaugeLabel
                      }
                    )
                  ]
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-white p-3 border border-gray-100 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: "Labour" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-slate-900", children: content.labour })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-white p-3 border border-gray-100 text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: "Parts" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-slate-900", children: content.parts })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    `book.quote.${content.slug}`
                  ),
                  className: "w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-primary/80 via-primary/70 via-primary/40 to-secondary/20 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(23,42,68,0.12)] focus:outline-none ",
                  children: content.cta
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-4 text-center text-xs text-slate-500", children: "No obligation — booking in 2 mins" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(GoogleReview, {})
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuotePage
}, Symbol.toStringTag, { value: "Module" }));
const STEPS$1 = [
  {
    id: "boiler_type",
    question: "What type of boiler do you have?",
    options: ["Combi", "System", "Heat Only"]
  },
  {
    id: "fault_type",
    question: "What issue are you experiencing?",
    options: [
      { label: "No heating", price: 0 },
      { label: "Leaking", price: 25 },
      { label: "Error code showing", price: 15 },
      { label: "Other", price: 0 }
    ]
  },
  {
    id: "boiler_age",
    question: "How old is your boiler?",
    options: [
      "Under 5 years",
      "5–10 years",
      "10–15 years",
      "15+ years / Not sure"
    ]
  },
  {
    id: "issue_start",
    question: "When did this problem start?",
    options: [
      "Today",
      "1–3 days ago",
      "1–2 weeks ago",
      "More than 2 weeks ago"
    ]
  },
  {
    id: "previous_work",
    question: "Has anyone worked on the boiler recently?",
    options: ["Yes", "No"]
  },
  {
    id: "access",
    question: "Where is your boiler located?",
    options: ["Easy access", "Inside a cupboard", "Loft", "Other"]
  }
];
function RepairQuote() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Stepper, { title: "Boiler Repair Quote", basePrice: 75, steps: STEPS$1 }),
    ";"
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RepairQuote
}, Symbol.toStringTag, { value: "Module" }));
const STEPS = [
  {
    id: "boiler_type",
    question: "What type of boiler do you have?",
    options: ["Combi", "System", "Heat Only"]
  },
  {
    id: "boiler_age",
    question: "How old is your boiler?",
    options: ["Under 5 years", "5–10 years", "10–15 years", "15+ years"]
  },
  {
    id: "access",
    question: "How easy is it to access your boiler?",
    options: ["Easy access", "Tight cupboard", "Loft"]
  },
  {
    id: "known_issues",
    question: "Are you aware of any issues with the boiler?",
    options: ["No issues", "Yes — something isn’t right"]
  }
];
function ServiceQuote() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Stepper,
    {
      title: "Annual Boiler Service",
      basePrice: 65,
      steps: STEPS
    }
  ) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ServiceQuote
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
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function HeroSection() {
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "services",
      className: "relative overflow-hidden py-20 rounded-b-[45px] bg-light-grey pt-40",
      children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-0", children: [
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
        /* @__PURE__ */ jsx(HeroServices, {}),
        /* @__PURE__ */ jsx(GoogleReview, {})
      ] })
    }
  );
}
const homeTypes = [
  {
    name: "Terrace",
    icon: Home$2,
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
  return /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 lg:flex lg:items-center lg:gap-16", children: [
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
function Home() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen", children: /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(HomeTypesStrip, {}),
    /* @__PURE__ */ jsx(ServiceCards, {}),
    /* @__PURE__ */ jsx(WhyChooseUs, {}),
    /* @__PURE__ */ jsx(Faq, {})
  ] }) });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const SECTIONS$1 = [
  { id: "overview", title: "Overview" },
  { id: "who-we-are", title: "1. Who we are" },
  { id: "contacting-us", title: "2. Contacting us" },
  { id: "what-we-collect", title: "3. What information we collect" },
  { id: "how-we-use", title: "4. How we use your information" },
  { id: "sharing", title: "5. Information sharing" },
  { id: "security", title: "6. Data security" },
  { id: "retention", title: "7. Data retention" },
  { id: "rights", title: "8. Your rights" },
  { id: "cookies", title: "9. Cookies" },
  { id: "children", title: "10. Children" },
  { id: "third-party", title: "11. Third-party services" },
  { id: "changes", title: "12. Changes to this policy" },
  { id: "contact", title: "Contact us" }
];
const getActiveIdFromHash$1 = () => {
  if (typeof window !== "undefined" && window.location.hash) {
    return window.location.hash.substring(1);
  }
  return null;
};
function PrivacyPolicyPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Privacy Policy";
  const lastUpdated = "12 December 2025";
  const [activeSectionId, setActiveSectionId] = useState(
    getActiveIdFromHash$1()
  );
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSectionId(getActiveIdFromHash$1());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen w-full bg-white text-gray-900 rounded-b-3xl", children: [
      /* @__PURE__ */ jsx(Header, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 py-16 pt-28 md:pt-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 md:mb-16 mt-6 flex flex-col items-center justify-center md:flex-row md:justify-between md:items-center gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-5xl font-extrabold leading-tight tracking-tighter text-center md:text-left", children: [
              "Data ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Trust" }),
              " ",
              "Policy"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg sm:text-xl w-full max-w-84 text-gray-700 font-light text-center md:text-left", children: "Everything you need to know about your personal data security." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
            "Last updated:",
            /* @__PURE__ */ jsx("br", { className: "md:flex" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: lastUpdated })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4", children: [
          /* @__PURE__ */ jsxs(
            "nav",
            {
              "aria-label": "Table of contents",
              className: "md:col-span-1",
              children: [
                /* @__PURE__ */ jsx("div", { className: "md:hidden mb-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar px-1 pb-2", children: SECTIONS$1.map((s) => {
                    const isActive = s.id === activeSectionId;
                    return /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `#${s.id}`,
                        className: `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
                                ${isActive ? "bg-primary text-white shadow-sm" : "bg-light-grey/80 text-dark hover:bg-light-grey"}`,
                        children: s.title
                      },
                      s.id
                    );
                  }) }),
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" }),
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "hidden md:block md:sticky md:top-10 self-start", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gray-50 border border-gray-200 p-5 shadow-md md:max-h-[calc(100vh-4rem)] md:overflow-y-auto", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-gray-700 mb-4 border-b pb-2 border-gray-200", children: "Navigation" }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-base", children: SECTIONS$1.map((s) => {
                    const isActive = s.id === activeSectionId;
                    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `#${s.id}`,
                        className: `block px-3 py-1.5 transition-all border-l-4
                                    ${isActive ? "border-primary text-primary font-bold" : "border-transparent text-gray-600 hover:text-primary hover:border-secondary/70"}`,
                        children: s.title
                      }
                    ) }, s.id);
                  }) })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("article", { className: "md:col-span-3 space-y-8 md:space-y-12 md:border-l md:border-gray-200 md:pl-8", children: [
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "overview",
                title: "Overview",
                isActive: activeSectionId === "overview",
                children: /* @__PURE__ */ jsxs("p", { children: [
                  "Our priority at ",
                  /* @__PURE__ */ jsx("strong", { children: "MD Gas" }),
                  " is keeping your data secure and treating it with respect. We aim to handle your data fairly and lawfully at all times. This statement explains how we collect, use, transfer and store personal data and outlines your rights under UK GDPR."
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "who-we-are",
                title: "1. Who we are",
                isActive: activeSectionId === "who-we-are",
                children: /* @__PURE__ */ jsx("p", { children: "MD Gas Limited (Glebe Business Park, Widnes, Cheshire, WA8 5SQ) is the data controller. We comply with the UK Data Protection Act 2018 and UK GDPR." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "contacting-us",
                title: "2. Contacting us",
                isActive: activeSectionId === "contacting-us",
                children: /* @__PURE__ */ jsx("p", { children: "You can reach our Data Protection Officer or customer support via the details provided in the **Contact us** section at the bottom of this policy." })
              }
            ),
            /* @__PURE__ */ jsxs(
              PolicyTimelineSection,
              {
                id: "what-we-collect",
                title: "3. What information we collect",
                isActive: activeSectionId === "what-we-collect",
                children: [
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-3 text-gray-700", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Personal data:" }),
                      " ",
                      "Name, address, email, phone, and date of birth."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Vulnerability info:" }),
                      " ",
                      "Health or disability information you choose to provide us for service accommodation."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Financial info:" }),
                      " ",
                      "Payment details and finance application history."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Property info:" }),
                      " ",
                      "House details and energy systems (boiler type, size) from quoting tools."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Communications:" }),
                      " ",
                      "Call recordings, emails, and webchat transcripts for quality and training purposes."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 border-l-4 border-gray-200 pl-4 text-sm text-gray-500 italic", children: "We do not store complete credit card details; they are processed securely by a PCI DSS compliant third-party payment provider." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              PolicyTimelineSection,
              {
                id: "how-we-use",
                title: "4. How we use your information",
                isActive: activeSectionId === "how-we-use",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "text-base text-gray-700", children: "We use data to: deliver requested services (installation/repair), provide accurate quotes, manage orders, register products for warranty, process secure payments, improve services, and send relevant marketing communications where consent has been given." }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 border-l-4 border-secondary bg-secondary/5 p-4 text-base text-primary rounded-r-lg", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Legal Basis:" }),
                    " Our primary legal basis for processing is the performance of a contract and legitimate interests."
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "sharing",
                title: "5. Information sharing",
                isActive: activeSectionId === "sharing",
                children: /* @__PURE__ */ jsx("p", { children: "We do not sell or rent your data. Sharing occurs only with trusted providers strictly as required to fulfill services or legal duties." })
              }
            ),
            /* @__PURE__ */ jsxs(
              PolicyTimelineSection,
              {
                id: "security",
                title: "6. Data security",
                isActive: activeSectionId === "security",
                children: [
                  /* @__PURE__ */ jsx("p", { children: "We maintain robust technical and organisational security measures including encryption, access controls, and staff training." }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 border-l-4 border-yellow-500 bg-yellow-50 p-4 text-base text-yellow-800 rounded-r-lg", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Security Note:" }),
                    " If you suspect a security issue, contact our DPO immediately."
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              PolicyTimelineSection,
              {
                id: "retention",
                title: "7. Data retention",
                isActive: activeSectionId === "retention",
                children: [
                  /* @__PURE__ */ jsx("p", { children: "Data is only kept as long as necessary." }),
                  /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-700", children: [
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Service records:" }),
                      " ",
                      "up to 6 years."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Financial records:" }),
                      " ",
                      "up to 7 years."
                    ] }),
                    /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Usage data:" }),
                      " ",
                      "12–24 months."
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "rights",
                title: "8. Your rights",
                isActive: activeSectionId === "rights",
                children: /* @__PURE__ */ jsx("p", { children: "Under GDPR, you have rights to access, correct, erase, restrict, port, and object to processing of your data." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "cookies",
                title: "9. Cookies",
                isActive: activeSectionId === "cookies",
                children: /* @__PURE__ */ jsx("p", { children: "We use cookies for functionality, analytics, and marketing. Details are available in our **Cookie Policy**." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "children",
                title: "10. Children",
                isActive: activeSectionId === "children",
                children: /* @__PURE__ */ jsx("p", { children: "Our services are not designed for children under 16." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "third-party",
                title: "11. Third-party services",
                isActive: activeSectionId === "third-party",
                children: /* @__PURE__ */ jsx("p", { children: "We are not responsible for third-party privacy practices." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "changes",
                title: "12. Changes to this policy",
                isActive: activeSectionId === "changes",
                children: /* @__PURE__ */ jsx("p", { children: "This policy is reviewed annually or as required by law." })
              }
            ),
            /* @__PURE__ */ jsx(
              PolicyTimelineSection,
              {
                id: "contact",
                title: "Contact us",
                isContact: true,
                isActive: activeSectionId === "contact",
                children: /* @__PURE__ */ jsxs("div", { className: "mt-4 p-5 rounded-lg border border-primary/60 bg-primary/5 space-y-3", children: [
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Email:" }),
                    " hello@MD Gas.co.uk"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "DPO:" }),
                    " privacy@MD Gas.co.uk"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
                    " 0330 113 1333"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Address:" }),
                    " MD Gas Limited, Glebe Business Park, Widnes, Cheshire, WA8 5SQ"
                  ] })
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PolicyTimelineSection = ({
  id,
  title,
  children,
  isContact = false,
  isActive = false
}) => /* @__PURE__ */ jsxs("section", { id, className: "relative", children: [
  /* @__PURE__ */ jsx(
    "div",
    {
      className: `hidden md:block absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 ${isActive ? "bg-primary border-secondary/60" : "bg-white border-gray-300"}`
    }
  ),
  /* @__PURE__ */ jsx(
    "h3",
    {
      className: `text-xl sm:text-2xl font-extrabold mb-4 ${isContact || isActive ? "text-primary" : "text-gray-900"}`,
      children: title
    }
  ),
  /* @__PURE__ */ jsx("div", { className: "space-y-4 text-base text-gray-700 leading-relaxed", children })
] });
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const SECTIONS = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "services", title: "2. Services" },
  { id: "bookings", title: "3. Bookings & Appointments" },
  { id: "pricing", title: "4. Pricing & Payment" },
  { id: "warranties", title: "5. Warranties & Guarantees" },
  { id: "liability", title: "6. Liability" },
  { id: "safety", title: "7. Safety Requirements" },
  { id: "complaints", title: "8. Complaints" },
  { id: "changes", title: "9. Changes to Terms" },
  { id: "contact", title: "10. Contact Information" }
];
const getActiveIdFromHash = () => {
  if (typeof window !== "undefined" && window.location.hash) {
    return window.location.hash.substring(1);
  }
  return null;
};
function TermsConditionsPage() {
  const { props } = usePage();
  const pageTitle2 = props.pageTitle ?? "Terms & Conditions";
  const lastUpdated = "12 December 2025";
  const [activeSectionId, setActiveSectionId] = useState(
    getActiveIdFromHash()
  );
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSectionId(getActiveIdFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    setActiveSectionId(getActiveIdFromHash());
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle2 }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen w-full bg-white text-gray-900 rounded-b-3xl", children: [
      /* @__PURE__ */ jsx(Header, { title: pageTitle2 }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 py-16 pt-28", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 md:mb-16 mt-6 flex flex-col items-center justify-center md:flex-row md:justify-between md:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-5xl font-extrabold leading-tight tracking-tighter text-center md:text-left", children: [
              "Terms &",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Conditions" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg sm:text-xl w-full max-w-84 text-gray-700 font-light text-center md:text-left", children: "The terms that govern your use of MD Gas services." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-gray-400", children: [
            "Last updated: ",
            /* @__PURE__ */ jsx("br", { className: "md:flex" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: lastUpdated })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden mb-10", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar px-1 pb-2", children: SECTIONS.map((s) => {
            const isActive = s.id === activeSectionId;
            return /* @__PURE__ */ jsx(
              "a",
              {
                href: `#${s.id}`,
                className: `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
                                                ${isActive ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: s.title
              },
              s.id
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12", children: [
          /* @__PURE__ */ jsx(
            "nav",
            {
              "aria-label": "Table of contents",
              className: "hidden md:block md:col-span-1 md:sticky md:top-10 self-start",
              children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gray-50 border border-gray-200 p-6 shadow-md max-h-[calc(100vh-4rem)] overflow-y-auto", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-gray-700 mb-4 border-b pb-2 border-gray-200", children: "Contents" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-base", children: SECTIONS.map((s) => {
                  const isActive = s.id === activeSectionId;
                  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `#${s.id}`,
                      className: `block px-3 py-1.5 transition-all border-l-4
                                                        ${isActive ? "border-primary text-primary font-semibold" : "border-transparent text-gray-600 hover:text-primary hover:border-secondary/70"}`,
                      children: s.title
                    }
                  ) }, s.id);
                }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("article", { className: "md:col-span-3 space-y-12 md:border-l md:border-gray-200 md:pl-8", children: [
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "agreement",
                title: "1. Agreement to Terms",
                isActive: activeSectionId === "agreement",
                children: /* @__PURE__ */ jsx("p", { children: 'By accessing or using the services provided by MD Gas ("Company", "we", "our", or "us"), you agree to be bound by these Terms & Conditions.' })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "services",
                title: "2. Services",
                isActive: activeSectionId === "services",
                children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Boiler Repairs:" }),
                    " Fixed £75 labour charge (parts extra)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Servicing:" }),
                    " Annual servicing from £75."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Installations:" }),
                    " Pricing varies."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Power Flush:" }),
                    " Price based on radiator count."
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "bookings",
                title: "3. Bookings & Appointments",
                isActive: activeSectionId === "bookings",
                children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Provide accurate booking details." }),
                  /* @__PURE__ */ jsx("li", { children: "An adult must be present." }),
                  /* @__PURE__ */ jsx("li", { children: "Ensure safe access." }),
                  /* @__PURE__ */ jsx("li", { children: "24h notice required." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "pricing",
                title: "4. Pricing & Payment",
                isActive: activeSectionId === "pricing",
                children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "Prices include VAT." }),
                  /* @__PURE__ */ jsx("li", { children: "Labour fixed, parts extra." }),
                  /* @__PURE__ */ jsx("li", { children: "Payment due on completion." }),
                  /* @__PURE__ */ jsx("li", { children: "Cash, card, bank transfer accepted." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "warranties",
                title: "5. Warranties & Guarantees",
                isActive: activeSectionId === "warranties",
                children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [
                  /* @__PURE__ */ jsx("li", { children: "12-month workmanship guarantee." }),
                  /* @__PURE__ */ jsx("li", { children: "Manufacturer warranties apply." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "liability",
                title: "6. Liability",
                isActive: activeSectionId === "liability",
                children: /* @__PURE__ */ jsx("p", { children: "Liability is limited to service cost and excludes pre-existing faults." })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "safety",
                title: "7. Safety Requirements",
                isActive: activeSectionId === "safety",
                children: /* @__PURE__ */ jsx("p", { children: "All work complies with Gas Safe regulations." })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "complaints",
                title: "8. Complaints",
                isActive: activeSectionId === "complaints",
                children: /* @__PURE__ */ jsx("p", { children: "Contact us within 14 days if unhappy with service." })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "changes",
                title: "9. Changes to Terms",
                isActive: activeSectionId === "changes",
                children: /* @__PURE__ */ jsx("p", { children: "Terms may be updated at any time." })
              }
            ),
            /* @__PURE__ */ jsx(
              TermsSection,
              {
                id: "contact",
                title: "10. Contact Information",
                isActive: activeSectionId === "contact",
                isContact: true,
                children: /* @__PURE__ */ jsxs("div", { className: "mt-4 p-5 rounded-lg border border-primary/60 bg-primary-5 space-y-3", children: [
                  /* @__PURE__ */ jsx("p", { children: "Email: info@mdgas.co.uk" }),
                  /* @__PURE__ */ jsx("p", { children: "Phone: 0800 123 4567" }),
                  /* @__PURE__ */ jsx("p", { children: "MD Gas Ltd, Greater London" })
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const TermsSection = ({
  id,
  title,
  children,
  isContact = false,
  isActive = false
}) => /* @__PURE__ */ jsxs("section", { id, className: "relative", children: [
  /* @__PURE__ */ jsx(
    "div",
    {
      className: `hidden md:block absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 ${isActive ? "bg-primary border-secondary/60" : "bg-white border-light-grey"}`
    }
  ),
  /* @__PURE__ */ jsx(
    "h3",
    {
      className: `text-xl sm:text-2xl font-extrabold mb-4 ${isContact || isActive ? "text-primary" : "text-gray-900"}`,
      children: title
    }
  ),
  /* @__PURE__ */ jsx("div", { className: "space-y-4 text-base text-gray-700 leading-relaxed", children })
] });
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About/AboutPage.jsx": __vite_glob_0_0, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_1, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_2, "./Pages/Auth/Login.jsx": __vite_glob_0_3, "./Pages/Auth/Register.jsx": __vite_glob_0_4, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_5, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_6, "./Pages/Book/Home.jsx": __vite_glob_0_7, "./Pages/Book/NewBoilerPage.jsx": __vite_glob_0_8, "./Pages/Book/PowerFlushPage.jsx": __vite_glob_0_9, "./Pages/Book/QuotePage.jsx": __vite_glob_0_10, "./Pages/Book/RepairPage.jsx": __vite_glob_0_11, "./Pages/Book/ServicePage.jsx": __vite_glob_0_12, "./Pages/Dashboard.jsx": __vite_glob_0_13, "./Pages/Home.jsx": __vite_glob_0_14, "./Pages/PrivacyPolicyPage.jsx": __vite_glob_0_15, "./Pages/Profile/Edit.jsx": __vite_glob_0_16, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_17, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_18, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_19, "./Pages/TermsConditionsPage.jsx": __vite_glob_0_20, "./Pages/Welcome.jsx": __vite_glob_0_21 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
