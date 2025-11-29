"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function FormStepper({ steps, currentStep, className }) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Stepper */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Progress line background */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

          {/* Active progress line */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div key={step} className="flex flex-col items-center">
                  {/* Step circle */}
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                          ? "border-primary bg-background text-primary shadow-md shadow-primary/20"
                          : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium transition-colors duration-300",
                      isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-primary">{steps[currentStep]}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <span
              key={step}
              className={cn("transition-colors duration-300", index <= currentStep && "text-primary font-medium")}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
