import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { cn } from "@/lib/utils";

const AppointmentDateRangePicker = ({ value, onChange }) => {
    const [date, setDate] = useState(null);
    const [range, setRange] = useState(null);

    // 🔁 sync from parent (back / forward safety)
    useEffect(() => {
        if (value?.date) setDate(value.date);
        if (value?.range) setRange(value.range);
    }, [value]);

    // ✅ notify Stepper
    useEffect(() => {
        if (date && range) {
            onChange?.({ date, range });
        }
    }, [date, range, onChange]);

    const ranges = [
        { id: "morning", label: "10:00am to 11:30am" },
        { id: "noon", label: "12:00pm to 13:30pm" },
        { id: "afternoon", label: "1:00pm to 5:30pm" },
        { id: "evening", label: "6:00pm to 7:30pm" },
    ];

    return (
        <div className="max-w-5xl rounded-lg border bg-white">
            <div className="border-b px-6 py-4 font-semibold">
                Select a date and time
            </div>

            <div className="grid grid-cols-[1.2fr_1fr]">
                <div className="border-r p-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        weekStartsOn={1}
                        disabled={{ before: new Date() }}
                        className="w-full dark-calendar bg-foreground"
                        components={{
                            IconLeft: () => <ChevronLeft className="h-5 w-5" />,
                            IconRight: () => (
                                <ChevronRight className="h-5 w-5" />
                            ),
                        }}
                    />
                </div>

                <div className="p-6">
                    <h3 className="font-semibold mb-2">Available times</h3>

                    <p className="text-sm text-slate-600 mb-4">
                        {date ? format(date, "EEEE d MMMM") : "Select a date"}
                    </p>

                    <div className="space-y-3">
                        {ranges.map((r) => {
                            const active = range?.id === r.id;

                            return (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRange(r)}
                                    className={cn(
                                        "w-full flex items-center gap-3 rounded border px-4 py-3 text-left",
                                        active
                                            ? "border-blue-600"
                                            : "hover:bg-slate-50"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-5 w-5 rounded-full border flex items-center justify-center",
                                            active && "border-blue-600"
                                        )}
                                    >
                                        {active && (
                                            <span className="h-3 w-3 rounded-full bg-blue-600" />
                                        )}
                                    </span>

                                    <span className="font-medium">
                                        {r.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="border-t px-6 py-4 text-sm">
                {date && range ? (
                    <>
                        Your chosen appointment:{" "}
                        <strong>{format(date, "EEEE do MMMM")}</strong> between{" "}
                        <strong>{range.label}</strong>
                    </>
                ) : (
                    "Please select a date and time"
                )}
            </div>
        </div>
    );
};

export default AppointmentDateRangePicker;
