import AppointmentDateRangePicker from "@/Components/extra/AppointmentDateTimePicker";
import { PageHeader } from "@/Components/ui/page-header";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function InstallPage({ booking }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [showAllIncludes, setShowAllIncludes] = useState(false);

    const titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Dr"];
    console.log("Install page booking →", booking);

    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
    });

    const handleBookInstallation = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select an installation date and time.");
            return;
        }

        router.post("/book/installation/confirm", {
            // booking data
            boiler_id: booking.boiler_id,
            brand: booking.brand,
            model: booking.model,
            kw: booking.kw,
            warrantyYears: booking.warrantyYears,
            price: booking.price,
            includes: booking.includes,
            images: booking.images,

            // appointment
            appointment_date: selectedDate,
            appointment_time: selectedTime,

            // customer form
            customer: {
                title: formData.title,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                notes: formData.notes,
            },
        });
    };

    const handleAppointmentChange = ({ date, time }) => {
        setSelectedDate(date);
        setSelectedTime(time);

        // OPTIONAL: auto-fill notes or hidden fields
        setFormData((prev) => ({
            ...prev,
            notes:
                date && time
                    ? `Preferred appointment: ${date} at ${time}`
                    : prev.notes,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((s) => ({ ...s, [name]: value }));
    };

    const includes = Array.isArray(booking?.includes) ? booking.includes : [];

    const visibleIncludes = showAllIncludes ? includes : includes.slice(0, 3);

    return (
        <>
            <Head title="Book Installation" />
            <PageHeader />
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-end gap-6 mb-8">
                        {/* Text-based Back Link with Slide Animation */}
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="group flex w-fit items-center gap-2 text-[14px] cursor-pointer font-bold uppercase tracking-wide text-slate-400 transition-colors hover:text-slate-900"
                        >
                            <span className="flex h-7 w-7 items-center justify-center  rounded-full bg-slate-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:bg-slate-200">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </span>
                            Go Back
                        </button>

                        {/* Header with decorative underline */}
                        <div className="relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Finalize Booking
                            </h2>
                            {/* Optional decorative underline */}
                            <div className="absolute -bottom-2 right-0 h-1 w-12 rounded-full bg-emerald-500"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <section className="relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
                                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
                                <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />
                                <div className="flex flex-col gap-1 border-b border-slate-100 p-8">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Select Installation Date
                                        </h2>
                                        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-primary">
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                            </span>
                                            Real-time Availability
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        Our engineers are available in your
                                        area.
                                    </p>
                                </div>

                                {/* Main Content Area */}
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Side: The Calendar Component */}
                                    {/* We give it padding but NO background/border so it blends perfectly */}
                                    <div className="flex-1 p-6 md:p-8">
                                        <div className="min-h-[300px]">
                                            <AppointmentDateRangePicker
                                                type="installation"
                                                value={{
                                                    date: selectedDate,
                                                    time: selectedTime,
                                                }}
                                                onChange={
                                                    handleAppointmentChange
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* STEP 2: Customer Details Form */}
                            <section className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-2xl backdrop-blur-2xl transition-all duration-500">
                                {/* Ambient Background Glows */}
                                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
                                <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />

                                {/* Header */}
                                <div className="relative border-b border-slate-200/50 px-8 py-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                                Personal Details
                                            </h2>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                                </span>
                                                <p className="text-sm font-medium text-slate-500">
                                                    Secure checkout active
                                                </p>
                                            </div>
                                        </div>
                                        {/* Icon Badge */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)] ring-1 ring-slate-100">
                                            <svg
                                                className="h-6 w-6 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="relative p-8 pt-6">
                                    <div className="space-y-7">
                                        {/* 1. Name Section */}
                                        <div className="group relative">
                                            <div className="flex gap-6">
                                                <div className="flex-grow ">
                                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-primary">
                                                        Who are we installing
                                                        for?
                                                    </h3>

                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1">
                                                            <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                                <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                    Title
                                                                </label>
                                                                <div className="relative">
                                                                    <select
                                                                        name="title"
                                                                        value={
                                                                            formData.title
                                                                        }
                                                                        onChange={
                                                                            handleInputChange
                                                                        }
                                                                        className="w-full appearance-none rounded-xl border-0 bg-slate-50/80 px-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                    >
                                                                        <option value="">
                                                                            --
                                                                        </option>
                                                                        {titleOptions.map(
                                                                            (
                                                                                t
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        t
                                                                                    }
                                                                                    value={
                                                                                        t
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        t
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                                        <svg
                                                                            className="h-3 w-3"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    3
                                                                                }
                                                                                d="M19 9l-7 7-7-7"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-3 grid grid-cols-2 gap-4">
                                                            <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                                <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                    First Name
                                                                </label>
                                                                <input
                                                                    name="firstName"
                                                                    placeholder="e.g. John"
                                                                    value={
                                                                        formData.firstName
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full rounded-xl border-0 bg-slate-50/80 px-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                />
                                                            </div>
                                                            <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                                <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                    Last Name
                                                                </label>
                                                                <input
                                                                    name="lastName"
                                                                    placeholder="e.g. Doe"
                                                                    value={
                                                                        formData.lastName
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full rounded-xl border-0 bg-slate-50/80 px-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Contact Section */}
                                        <div className="group relative">
                                            <div className="flex gap-6">
                                                <div className="flex-grow pt-1.5">
                                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-primary">
                                                        How can we reach you?
                                                    </h3>

                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                            <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                Email Address
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder="your@email.com"
                                                                    value={
                                                                        formData.email
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full rounded-xl border-0 bg-slate-50/80 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                />
                                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
                                                                    <svg
                                                                        className="w-5 h-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                            <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                Phone Number
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    name="phone"
                                                                    placeholder="07xxx xxxxxx"
                                                                    value={
                                                                        formData.phone
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full rounded-xl border-0 bg-slate-50/80 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                />
                                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
                                                                    <svg
                                                                        className="w-5 h-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. Address Section */}
                                        <div className="group relative">
                                            <div className="flex gap-6">
                                                <div className="flex-grow pt-1.5">
                                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-primary">
                                                        Where are we installing?
                                                    </h3>

                                                    <div className="space-y-5">
                                                        <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                            <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                Property Address
                                                            </label>
                                                            <div className="relative group/input">
                                                                <input
                                                                    name="address"
                                                                    placeholder="Start typing postcode or address..."
                                                                    value={
                                                                        formData.address
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full rounded-xl border-0 bg-slate-50/80 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
                                                                />
                                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-primary">
                                                                    <svg
                                                                        className="w-5 h-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                                                            <label className="mb-1.5 block text-[14px] font-semibold text-slate-600 ml-1">
                                                                Additional Notes{" "}
                                                                <span className="font-normal text-slate-400 ml-1 opacity-70">
                                                                    (Optional)
                                                                </span>
                                                            </label>
                                                            <textarea
                                                                name="notes"
                                                                rows={3}
                                                                placeholder="Any parking restrictions, access details, or special requests?"
                                                                value={
                                                                    formData.notes
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full rounded-xl border-0 bg-slate-50/80 px-4 py-3.5 text-sm font-medium text-slate-900 ring-1 ring-slate-200 transition-all placeholder:font-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/10 focus:outline-none resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN - Sticky Summary */}
                        <div className="lg:col-span-1">
                            <aside className="sticky top-6 filter drop-shadow-xl">
                                {/* The Receipt Container */}
                                <div
                                    className="relative bg-white text-slate-800 rounded-t-2xl"
                                    style={{
                                        // This creates the jagged "receipt" bottom edge
                                        clipPath:
                                            "polygon(0 0, 100% 0, 100% calc(100% - 12px), 95% 100%, 90% calc(100% - 12px), 85% 100%, 80% calc(100% - 12px), 75% 100%, 70% calc(100% - 12px), 65% 100%, 60% calc(100% - 12px), 55% 100%, 50% calc(100% - 12px), 45% 100%, 40% calc(100% - 12px), 35% 100%, 30% calc(100% - 12px), 25% 100%, 20% calc(100% - 12px), 15% 100%, 10% calc(100% - 12px), 5% 100%, 0 calc(100% - 12px))",
                                    }}
                                >
                                    {/* Decorative 'Hole Punch' circle at top */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-foreground shadow-inner border border-slate-200" />

                                    {/* Header */}
                                    <div className="bg-slate-50 p-6 pt-10 border-b-2 border-dashed border-dark/40 text-center rounded-t-2xl space-y-0.5">
                                        <h2 className="text-[12px] font-black font-mono font-mono uppercase tracking-widest text-dark/70 mt-2">
                                            Installation Summary
                                        </h2>
                                        <div className="">
                                            <span className="text-5xl font-bold tracking-tighter text-slate-900">
                                                £{booking.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* The Details List */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-2">
                                                <p className="font-bold text-[18px] text-slate-900">
                                                    {booking.model}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="bg-primary/10 text-primary text-[14px] px-2 py-0.5 rounded font-mono">
                                                        {booking.kw}
                                                        kW
                                                    </span>
                                                    <span className="bg-slate-100 text-slate-600 text-[14px] px-2 py-0.5 rounded font-mono">
                                                        {booking.warrantyYears}
                                                        Warranty
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-xl p-2">
                                                <img
                                                    // Use the first image from API or fallback
                                                    src={booking.images?.[0]}
                                                    // alt={`${product.brand} ${product.model}`}
                                                    // src="#"
                                                    className="h-full object-contain drop-shadow-2xl"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "/images/ideal-20logic.png";
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Dotted Line Divider */}
                                        <div className="w-full border-t-2 border-dashed border-dark/40" />

                                        {/* Itemized List */}
                                        <div className="space-y-3">
                                            <p className="text-[14px] font-bold uppercase text-dark/60 tracking-wider">
                                                What's Included
                                            </p>
                                            {includes.length > 0 && (
                                                <div className="space-y-3">
                                                    {/* Animated list container */}
                                                    <ul
                                                        className={`
                space-y-2 overflow-hidden transition-all duration-500 ease-in-out
                ${showAllIncludes ? "max-h-[600px]" : "max-h-[180px]"}
            `}
                                                    >
                                                        {visibleIncludes.map(
                                                            (item, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="flex justify-between items-center font-medium text-dark opacity-0 included-animation"
                                                                    style={{
                                                                        animationDelay: `${
                                                                            i *
                                                                            40
                                                                        }ms`,
                                                                    }}
                                                                >
                                                                    <span className="max-w-[90%] text-[15px] line-clamp-1">
                                                                        {item}
                                                                    </span>
                                                                    <span className="text-primary text-sm font-semibold">
                                                                        Included
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>

                                                    {/* Toggle button */}
                                                    {includes.length > 3 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowAllIncludes(
                                                                    (v) => !v
                                                                )
                                                            }
                                                            className="text-[14px] mt-3 border border-gray-200 cursor-pointer hover:border-primary px-3 py-2 uppercase tracking-wider font-semibold text-dark/80 hover:text-primary transition-colors"
                                                        >
                                                            {showAllIncludes
                                                                ? "- Hide full item"
                                                                : `+ See full item (${includes.length})`}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Total Section */}
                                        <div className="bg-slate-900 -mx-6 -mb-6 p-6 pb-12 mt-6 text-white">
                                            <button
                                                onClick={handleBookInstallation}
                                                disabled={
                                                    !selectedDate ||
                                                    !selectedTime
                                                }
                                                className={`w-full py-4 text-sm font-bold rounded-sm uppercase tracking-widest border-2 transition-all
        ${
            selectedDate && selectedTime
                ? "bg-primary border-primary text-foreground hover:text-dark hover:bg-foreground"
                : "bg-transparent border-slate-700 text-slate-500 cursor-not-allowed"
        }`}
                                            >
                                                Book Installation
                                            </button>

                                            {/* Payment Icons (Monochrome) */}
                                            <div className="mt-4 flex justify-center gap-3 opacity-30 grayscale">
                                                <div className="h-6 w-10 bg-white rounded-sm"></div>
                                                <div className="h-6 w-10 bg-white rounded-sm"></div>
                                                <div className="h-6 w-10 bg-white rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
