"use client";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";

export function FormField({
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
    return (
        <div className={cn("space-y-2", className)}>
            <Label
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    error && "border-destructive focus-visible:ring-destructive"
                )}
                {...props}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}

export function FormTextarea({
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
    return (
        <div className={cn("space-y-2", className)}>
            <Label
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={cn(
                    error && "border-destructive focus-visible:ring-destructive"
                )}
                {...props}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
