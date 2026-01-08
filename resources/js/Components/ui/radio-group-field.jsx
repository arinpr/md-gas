"use client";

import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

export function RadioGroupField({
    label,
    name,
    value,
    onChange,
    options,
    error,
    required,
    className,
}) {
    return (
        <div className={cn("space-y-3", className)}>
            <Label className="text-sm font-medium text-foreground">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all",
                            value === option.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
