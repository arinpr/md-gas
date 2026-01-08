import { Head, Link, router } from "@inertiajs/react";
import { PageHeader } from "@/Components/ui/page-header";
import {
    FiArrowLeft,
    FiChevronDown,
    FiCheck,
    FiInfo,
    FiCalendar,
    FiClock,
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiEdit2,
} from "react-icons/fi";
import { useState } from "react";
import AppointmentDateRangePicker from "@/Components/extra/AppointmentDateTimePicker";

export default function InstallPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Dr"];

    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
    });

    const timeSlots = [
        "8:00 AM - 10:00 AM",
        "10:00 AM - 12:00 PM",
        "12:00 PM - 2:00 PM",
        "2:00 PM - 4:00 PM",
    ];
    const inputClass =
        "w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:outline-none";
    const textareaClass =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:outline-none";

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const fullDate = new Date(year, month, i);
            fullDate.setHours(0, 0, 0, 0);

            const isPast = fullDate < today;
            const isToday = fullDate.getTime() === today.getTime();
            const isSelected =
                selectedDate && fullDate.getTime() === selectedDate.getTime();

            days.push({
                date: i,
                fullDate,
                isPast,
                isToday,
                isSelected,
                isAvailable: !isPast && fullDate.getDay() !== 0,
            });
        }

        return days;
    };

    const monthYear = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedDate, selectedTime, formData });
    };

    return (
        <>
            <Head title="Book Installation" />
            <PageHeader />

            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <section className="relative rounded-3xl p-6 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 shadow-xl space-y-6 overflow-hidden">
                            {/* subtle background glow */}
                            <div className="absolute -top-20 -right-20 h-56 w-56 bg-emerald-200/25 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-56 w-56 bg-indigo-200/25 rounded-full blur-3xl" />

                            {/* Header */}
                            <h2 className="relative text-base font-semibold text-slate-900">
                                Your details
                            </h2>

                            {/* Form */}
                            <div className="relative space-y-5">
                                {/* Title */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Title *
                                    </label>
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm shadow-sm transition
                           focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                    >
                                        <option value="">
                                            Select an option…
                                        </option>
                                        {titleOptions.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        {
                                            name: "firstName",
                                            label: "First name *",
                                            placeholder: "e.g. Sam",
                                        },
                                        {
                                            name: "lastName",
                                            label: "Last name *",
                                            placeholder: "e.g. Doe",
                                        },
                                    ].map((field) => (
                                        <div
                                            key={field.name}
                                            className="rounded-2xl bg-white p-4 shadow-sm"
                                        >
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                                {field.label}
                                            </label>
                                            <input
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                onChange={handleInputChange}
                                                className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm shadow-sm transition
                                   focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Email address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="e.g. hello@example.com"
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm shadow-sm transition
                           focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Contact number *
                                    </label>
                                    <input
                                        name="phone"
                                        placeholder="e.g. 07234 123456"
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm shadow-sm transition
                           focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Install address *
                                    </label>
                                    <input
                                        name="address"
                                        placeholder="Search for the install address..."
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm shadow-sm transition
                           focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 text-sm font-medium text-emerald-600 hover:underline"
                                    >
                                        Can’t find the address? Enter it
                                        manually
                                    </button>
                                </div>

                                {/* Notes */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Notes or comments
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows={4}
                                        placeholder="e.g. My property has..."
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm shadow-sm transition
                                         focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                                    />
                                </div>

                                {/* CTA */}
                            </div>
                        </section>

                        <aside className="relative rounded-3xl p-6 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 shadow-xl h-fit space-y-7 overflow-hidden">
                            {/* subtle background glow */}
                            <div className="absolute -top-20 -right-20 h-56 w-56 bg-emerald-200/25 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-56 w-56 bg-indigo-200/25 rounded-full blur-3xl" />

                            {/* Header */}
                            <div className="relative flex items-center justify-between">
                                <h2 className="text-base font-semibold text-slate-900">
                                    Install total
                                </h2>
                                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                    Got a discount code?
                                </button>
                            </div>

                            {/* Price card */}
                            <div className="relative rounded-2xl bg-white p-5 shadow-sm space-y-3">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                                            Fixed price (inc. VAT)
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 leading-tight">
                                            £2,630
                                        </p>
                                        <p className="text-sm text-slate-400 line-through">
                                            £2,940
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-slate-500">
                                            Monthly from
                                        </p>
                                        <p className="text-lg font-semibold text-indigo-600">
                                            £36.66
                                        </p>
                                    </div>
                                </div>

                                <button className="text-sm font-medium text-emerald-600 hover:underline">
                                    What’s included in my installation?
                                </button>
                            </div>

                            <button
                                disabled={!selectedDate || !selectedTime}
                                className={`w-full py-4 rounded-xl text-sm font-semibold transition
                                         ${
                                             selectedDate && selectedTime
                                                 ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                                                 : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                         }`}
                            >
                                Book install
                            </button>

                            {/* Finance methods */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-2xl bg-emerald-100 text-emerald-800 px-3 py-4 flex flex-col items-center gap-2 text-xs font-semibold">
                                    <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                        %
                                    </div>
                                    Low rate
                                </div>

                                <div className="rounded-2xl bg-pink-100 text-pink-800 px-3 py-4 flex flex-col items-center gap-2 text-xs font-semibold">
                                    <div className="h-9 w-9 rounded-full bg-pink-500 text-white flex items-center justify-center">
                                        K
                                    </div>
                                    Klarna
                                </div>

                                <div className="rounded-2xl bg-indigo-100 text-indigo-800 px-3 py-4 flex flex-col items-center gap-2 text-xs font-semibold">
                                    <div className="h-9 w-9 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                                        💳
                                    </div>
                                    Cards
                                </div>
                            </div>

                            {/* Package */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        Your package
                                    </h3>
                                </div>

                                <div className="rounded-2xl bg-white p-4 flex gap-4 shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-500 text-white flex items-center justify-center">
                                        🔧
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-slate-900">
                                            Worcester Bosch Greenstar 4000 25kW
                                        </p>
                                        <p className="text-slate-500">
                                            10 years warranty
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Installation */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Your installation
                                </h3>

                                {[
                                    {
                                        title: "System Flush",
                                        desc: "Chemical system flush with inhibitor protection",
                                    },
                                    {
                                        title: "Magnetic Filter",
                                        desc: "Protects boiler from sludge and debris",
                                    },
                                    {
                                        title: "Smart Controls",
                                        desc: "Wireless programmable thermostat",
                                    },
                                    {
                                        title: "Carbon Monoxide Alarm",
                                        desc: "Alerts when levels are unsafe",
                                    },
                                    {
                                        title: "Gas Safe Installation",
                                        desc: "Removal & replacement of boiler",
                                    },
                                    {
                                        title: "Horizontal Flue",
                                        desc: "New horizontal flue installation",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm"
                                    >
                                        <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-600">
                                            ✓
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-slate-900">
                                                {item.title}
                                            </p>
                                            <p className="text-slate-500 text-xs">
                                                {item.desc}
                                            </p>
                                        </div>
                                        <FiInfo className="text-slate-400 mt-1" />
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                    <section className="bg-white rounded-2xl border p-6 mt-10">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FiCalendar className="text-emerald-600" />
                            Select date
                        </h2>

                        <AppointmentDateRangePicker />
                    </section>
                </div>
            </div>
        </>
    );
}
