import { useState, useEffect, useMemo, useRef } from "react";
import {
    format,
    addMonths,
    startOfMonth,
    startOfDay,
    isSameDay,
} from "date-fns";
import { Clock, CalendarDays } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { cn } from "@/lib/utils";
import axios from "axios";

const AppointmentDateRangePicker = ({ type, value, onChange }) => {
    // accept string OR { key }
    const serviceKey = useMemo(() => {
        if (!type) return null;
        if (typeof type === "string") return type;
        return type.key || null;
    }, [type]);

    const today = useMemo(() => startOfDay(new Date()), []);
    const maxDate = useMemo(() => addMonths(today, 2), [today]);
    const fromMonth = useMemo(() => startOfMonth(today), [today]);
    const toMonth = useMemo(() => startOfMonth(maxDate), [maxDate]);

    const [date, setDate] = useState(value?.date ? new Date(value.date) : null);
    const [time, setTime] = useState(value?.time || null);

    // Calendar view month
    const [month, setMonth] = useState(() => startOfMonth(date || today));

    const [loading, setLoading] = useState(false);
    const [slotsByDay, setSlotsByDay] = useState({});
    const [error, setError] = useState(null);

    // prevent parent prop thrash from overwriting local selection
    const lastAppliedRef = useRef({ date: null, time: null });

    const monthKey = useMemo(() => format(month, "yyyy-MM"), [month]);

    // fetch availability for viewed month
    useEffect(() => {
        if (!serviceKey) return;

        let cancelled = false;
        setLoading(true);
        setError(null);

        axios
            .get("/appointments/availability", {
                params: { type: serviceKey, month: monthKey },
            })
            .then((res) => {
                if (cancelled) return;
                setSlotsByDay(res.data?.data?.days || {});
            })
            .catch(() => {
                if (cancelled) return;
                setError("Unable to load availability. Please try again.");
                setSlotsByDay({});
            })
            .finally(() => {
                if (cancelled) return;
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [serviceKey, monthKey]);

    const dayKey = date ? format(date, "yyyy-MM-dd") : null;
    const daySlots = dayKey ? slotsByDay[dayKey] || [] : [];

    // sync from parent safely
    useEffect(() => {
        const incomingDateStr = value?.date || null;
        const incomingTime = value?.time || null;

        const last = lastAppliedRef.current;
        if (incomingDateStr !== last.date || incomingTime !== last.time) {
            lastAppliedRef.current = {
                date: incomingDateStr,
                time: incomingTime,
            };

            const nextDate = incomingDateStr ? new Date(incomingDateStr) : null;
            setDate(nextDate);
            setTime(incomingTime || null);
            if (nextDate) setMonth(startOfMonth(nextDate));
        }
    }, [value?.date, value?.time]);

    const emit = (d, t) => {
        onChange?.({
            date: d ? format(d, "yyyy-MM-dd") : null,
            time: t || null,
        });
    };

    // disable past days + beyond 2 months
    const disabled = useMemo(
        () => ({ before: today, after: maxDate }),
        [today, maxDate]
    );

    const selectDate = (d) => {
        if (!d) return;
        if (d < today || d > maxDate) return;
        if (date && isSameDay(d, date)) return;

        setDate(d);
        setTime(null);
        emit(d, null);
    };

    const selectTime = (t) => {
        if (!date) return;
        setTime(t);
        emit(date, t);
    };

    return (
        <div className="w-full max-w-6xl rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden lg:h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-slate-200">
                <div>
                    <div className="text-base font-semibold text-slate-900 line-clamp-1">
                        Select a date and time
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-1">
                        Choose an available slot to confirm your appointment.
                    </div>
                </div>

                {serviceKey ? (
                    <span className="inline-flex items-center rounded-full border text-center border-slate-200 bg-slate-50 px-3 py-1 text-[10px] lg:text-xs font-medium text-slate-700 whitespace-nowrap">
                        {String(serviceKey).replaceAll("_", " ").toUpperCase()}
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                        Select service type first
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch h-full">
                {/* Left: Calendar */}
                <div className="border-b lg:border-b-0 lg:border-r border-slate-200 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarDays className="h-4 w-4 text-slate-700" />
                        <div className="text-sm font-semibold text-slate-900">
                            Calendar
                        </div>
                        <div className="text-xs text-slate-500">
                            Next 2 months only
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white p-0 md:p-3">
                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={setMonth}
                            fromMonth={fromMonth}
                            toMonth={toMonth}
                            selected={date}
                            onSelect={selectDate}
                            weekStartsOn={1}
                            disabled={disabled}
                            className="w-full"
                            classNames={{
                                disabled: "text-muted-foreground opacity-50",
                            }}
                        />
                    </div>
                    {/* Fixed summary */}
                    <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        {date && time ? (
                            <div className="text-sm text-slate-800">
                                Your chosen appointment:{" "}
                                <span className="font-semibold text-slate-900">
                                    {format(date, "EEEE do MMMM")}
                                </span>{" "}
                                at{" "}
                                <span className="font-semibold text-slate-900">
                                    {time}
                                </span>
                            </div>
                        ) : (
                            <div className="text-sm text-slate-700">
                                Please select a date and time to continue.
                            </div>
                        )}
                    </div>

                    {/* <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            You can book from{" "}
            <span className="font-semibold">{format(today, "d MMM yyyy")}</span>{" "}
            up to{" "}
            <span className="font-semibold">
              {format(maxDate, "d MMM yyyy")}
            </span>
            .
          </div> */}
                </div>

                {/* Right: Slots */}
                <div className="p-5 sm:p-6 flex flex-col max-h-[510px] overflow-y-auto">
                    {/* Fixed header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-700" />
                            <div className="text-sm font-semibold text-slate-900">
                                Available times
                            </div>
                        </div>

                        {date ? (
                            <div className="text-xs text-slate-600">
                                {format(date, "EEEE, d MMM yyyy")}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500">
                                No date selected
                            </div>
                        )}
                    </div>

                    {/* Scrollable middle */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                        {!serviceKey ? (
                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <div className="text-sm font-medium text-slate-900">
                                    Service type required
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                    Select a service type to load availability.
                                </div>
                            </div>
                        ) : loading ? (
                            <div className="space-y-3">
                                <div className="h-4 w-44 bg-slate-100 rounded" />
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-12 bg-slate-100 rounded-lg" />
                                    <div className="h-12 bg-slate-100 rounded-lg" />
                                    <div className="h-12 bg-slate-100 rounded-lg" />
                                    <div className="h-12 bg-slate-100 rounded-lg" />
                                </div>
                                <div className="text-xs text-slate-500">
                                    Loading availability…
                                </div>
                            </div>
                        ) : error ? (
                            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                                <div className="text-sm font-medium text-rose-900">
                                    Something went wrong
                                </div>
                                <div className="text-sm text-rose-800 mt-1">
                                    {error}
                                </div>
                            </div>
                        ) : !date ? (
                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <div className="text-sm font-medium text-slate-900">
                                    Select a date
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                    Choose a date to see available time slots.
                                </div>
                            </div>
                        ) : daySlots.length === 0 ? (
                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <div className="text-sm font-medium text-slate-900">
                                    No slots available
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                    Try another day to find an open slot.
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {daySlots.map((t) => {
                                    const active = time === t;

                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => selectTime(t)}
                                            aria-pressed={active}
                                            className={cn(
                                                "rounded-lg border px-4 py-3 text-left transition-all",
                                                "bg-white hover:bg-slate-50",

                                                active
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900">
                                                        {t}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {active
                                                            ? "Chosen slot"
                                                            : "Tap to choose"}
                                                    </span>
                                                </div>

                                                <span
                                                    className={cn(
                                                        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
                                                        active
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-green-500 text-white"
                                                    )}
                                                >
                                                    {active
                                                        ? "Selected"
                                                        : "Available"}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDateRangePicker;
