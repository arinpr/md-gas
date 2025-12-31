import { Head, Link, router } from "@inertiajs/react";
import { PageHeader } from "@/components/ui/page-header";
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

export default function InstallPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");

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

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
                    {/* LEFT */}
                    <section className="bg-white rounded-2xl border p-6 sm:p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <FiCalendar className="text-emerald-600" />
                            Select Date & Time
                        </h2>

                        {/* Calendar header */}
                        <div className="flex justify-between mb-6">
                            <span className="font-semibold">{monthYear}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setCurrentDate(
                                            new Date(
                                                currentDate.getFullYear(),
                                                currentDate.getMonth() - 1,
                                                1
                                            )
                                        )
                                    }
                                    className="h-9 w-9 border rounded-full"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentDate(
                                            new Date(
                                                currentDate.getFullYear(),
                                                currentDate.getMonth() + 1,
                                                1
                                            )
                                        )
                                    }
                                    className="h-9 w-9 border rounded-full"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {getDaysInMonth().map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        day?.isAvailable &&
                                        setSelectedDate(day.fullDate)
                                    }
                                    disabled={!day?.isAvailable}
                                    className={`
                                        h-12 rounded-xl text-sm transition
                                        ${!day ? "invisible" : ""}
                                        ${
                                            day?.isPast
                                                ? "text-slate-300 cursor-not-allowed"
                                                : ""
                                        }
                                        ${
                                            day?.isToday && !day?.isSelected
                                                ? "border-2 border-emerald-500"
                                                : ""
                                        }
                                        ${
                                            day?.isSelected
                                                ? "bg-emerald-600 text-white shadow"
                                                : ""
                                        }
                                        ${
                                            !day?.isSelected &&
                                            !day?.isPast &&
                                            day?.isAvailable
                                                ? "hover:bg-slate-100"
                                                : ""
                                        }
                                    `}
                                >
                                    {day?.date}
                                </button>
                            ))}
                        </div>

                        {/* Time slots */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <FiClock className="text-emerald-600" />
                                Time Slot
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {timeSlots.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTime(t)}
                                        className={`py-3 rounded-xl border ${
                                            selectedTime === t
                                                ? "border-emerald-500 bg-emerald-50"
                                                : ""
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* RIGHT */}
                    <aside className="bg-white rounded-2xl border p-6">
                        <div className="text-3xl font-bold mb-6">£2,730</div>

                        {(selectedDate || selectedTime) && (
                            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
                                {selectedDate && (
                                    <div className="text-sm flex items-center gap-2">
                                        <FiCalendar />
                                        {selectedDate.toLocaleDateString()}
                                    </div>
                                )}
                                {selectedTime && (
                                    <div className="text-sm flex items-center gap-2">
                                        <FiClock />
                                        {selectedTime}
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={!selectedDate || !selectedTime}
                            className={`w-full py-4 rounded-xl text-white font-bold ${
                                selectedDate && selectedTime
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-slate-300 cursor-not-allowed"
                            }`}
                        >
                            Book Installation
                        </button>
                    </aside>
                </div>
            </div>
        </>
    );
}
