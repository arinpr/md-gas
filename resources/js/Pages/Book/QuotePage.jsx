import { useState, useMemo } from "react"
import { Head } from "@inertiajs/react"
import { PageHeader } from "@/components/ui/page-header"
import { FormStepper } from "@/components/ui/form-stepper"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { RadioGroupField } from "@/components/ui/radio-group-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  CheckCircle2,
  Calculator,
  Check
} from "lucide-react"

const steps = ["Boiler Type", "System Details", "Add-ons", "Your Details"]

 const pageTitle = "Get a Quote "; 

const boilerTypes = [
  {
    value: "combi",
    label: "Combi Boiler",
    description: "Best for smaller homes with up to 20 radiators",
    image: "/images/baxi-20-20any.webp",
  },
  {
    value: "system",
    label: "System Boiler",
    description: "Great for larger homes with higher hot water demand",
    image: "/images/ideal-20atlantic.webp",
  },
  {
    value: "heat-only",
    label: "Heat Only",
    description: "Traditional setup with separate hot water cylinder",
    image: "/images/ideal-20logic.png",
  },
]

const addOnImages = {
  verticalFlue: "/images/vertical-20flue-20option.png",
  trv: "/images/trv-20upgrade.png",
  smartThermostat: "/images/smart-20thermostat-20upgrade.jpg",
  filter: "/images/standard-20included-20filter.webp",
}

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    postcode: "",
  })

  const [errors, setErrors] = useState({})

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const radiatorOptions = useMemo(() => {
    const baseOptions = [
      { value: "up-to-6", label: "Up to 6" },
      { value: "7-12", label: "7-12" },
      { value: "13-20", label: "13-20" },
    ]
    if (formData.boilerType !== "combi") {
      baseOptions.push({ value: "21-plus", label: "21+" })
    }
    return baseOptions
  }, [formData.boilerType])

  const bathroomOptions = useMemo(() => {
    const baseOptions = [
      { value: "1", label: "1" },
      { value: "1.5", label: "1.5" },
      { value: "2", label: "2" },
    ]
    if (formData.boilerType !== "combi") {
      baseOptions.push({ value: "3-plus", label: "3+" })
    }
    return baseOptions
  }, [formData.boilerType])

  const priceBreakdown = useMemo(() => {
    const items = []
    let total = 0

    if (!formData.boilerType || !formData.radiatorRange) {
      return { items: [], total: 0 }
    }

    if (formData.boilerType === "combi") {
      let basePrice = 2200
      if (formData.radiatorRange === "7-12") basePrice = 2500
      if (formData.radiatorRange === "13-20") basePrice = 2800

      items.push({ label: `Combi Boiler (${formData.radiatorRange} rads)`, price: basePrice })
      total = basePrice
    } else {
      const basePrice = 2750
      items.push({
        label: `${formData.boilerType === "system" ? "System" : "Heat Only"} Boiler`,
        price: basePrice,
      })
      total = basePrice

      if (formData.flueType === "vertical") {
        items.push({ label: "Vertical Flue", price: 150 })
        total += 150
      }

      if (formData.trvRequired === "yes" && formData.trvCount > 0) {
        const trvCost = formData.trvCount * 25
        items.push({ label: `TRVs x${formData.trvCount}`, price: trvCost })
        total += trvCost
      }

      if (formData.thermostat === "smart") {
        items.push({ label: "Smart Thermostat", price: 100 })
        total += 100
      }
    }

    return { items, total }
  }, [formData])

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0 && !formData.boilerType) newErrors.boilerType = "Please select a boiler type"
    if (step === 1) {
      if (!formData.radiatorRange) newErrors.radiatorRange = "Required"
      if (!formData.bathrooms) newErrors.bathrooms = "Required"
    }
    if (step === 3) {
      if (!formData.name) newErrors.name = "Required"
      if (!formData.phone) newErrors.phone = "Required"
      if (!formData.email) newErrors.email = "Required"
      if (!formData.postcode) newErrors.postcode = "Required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && formData.boilerType === "combi") {
        setCurrentStep(3)
      } else {
        setCurrentStep((prev) => prev + 1)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep === 3 && formData.boilerType === "combi") {
      setCurrentStep(1)
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 0))
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // SUCCESS PAGE
  if (isSubmitted) {
    return (
      <>
       <Head title="Quote Submitted" />
     
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Quote Submitted" />

        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold mb-3">Quote Submitted!</h1>

              <div className="rounded-lg bg-primary/5 border-2 border-primary p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-1">Your Estimated Quote</p>
                <p className="text-4xl font-bold text-primary">
                  £{priceBreakdown.total.toLocaleString()}
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
       </>
    )
  }

  // MAIN QUOTE PAGE
return (
          <>
            <Head title={pageTitle} />

  <div className="min-h-screen bg-background">
      <PageHeader title={pageTitle} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Get Your Instant Quote</h1>
          <p className="mt-2 text-muted-foreground">Competitive pricing with transparent breakdown</p>
        </div>

        <FormStepper steps={steps} currentStep={currentStep} className="mb-10" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 sm:p-8">
              
              {/* STEP 0 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">Select Boiler Type</h2>
                    <p className="text-sm text-muted-foreground mb-6">Choose the type of boiler you need</p>
                  </div>

                  <div className="grid gap-4">
                    {boilerTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          updateField("boilerType", type.value)
                          updateField("radiatorRange", "")
                          updateField("bathrooms", "")
                        }}
                        className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                          formData.boilerType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {/* UPDATED FROM <Image> TO <img> */}
                        <div className="shrink-0 w-20 h-20 rounded-lg bg-muted/50 overflow-hidden">
                          <img
                            src={type.image}
                            alt={type.label}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{type.label}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                            formData.boilerType === type.value
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {formData.boilerType === type.value && (
                            <Check className="h-4 w-4 text-primary-foreground" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {errors.boilerType && (
                    <p className="text-xs text-destructive">{errors.boilerType}</p>
                  )}
                </div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">System Details</h2>
                    <p className="text-sm text-muted-foreground mb-6">Tell us about your heating system</p>
                  </div>

                  <RadioGroupField
                    label="Number of Radiators"
                    name="radiatorRange"
                    value={formData.radiatorRange}
                    onChange={(v) => updateField("radiatorRange", v)}
                    options={radiatorOptions}
                    error={errors.radiatorRange}
                    required
                  />

                  <RadioGroupField
                    label="Number of Bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={(v) => updateField("bathrooms", v)}
                    options={bathroomOptions}
                    error={errors.bathrooms}
                    required
                  />
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && formData.boilerType !== "combi" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">Optional Add-ons</h2>
                    <p className="text-sm text-muted-foreground mb-6">Customize your installation</p>
                  </div>

                  {/* FLUE TYPE */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">Flue Type</Label>
                    <div className="grid gap-3 sm:grid-cols-2">

                      {/* HORIZONTAL */}
                      <button
                        type="button"
                        onClick={() => updateField("flueType", "horizontal")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.flueType === "horizontal"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                          ↔
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">Horizontal</p>
                          <p className="text-sm text-primary font-semibold">Included</p>
                        </div>
                      </button>

                      {/* VERTICAL */}
                      <button
                        type="button"
                        onClick={() => updateField("flueType", "vertical")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.flueType === "vertical"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 overflow-hidden">
                          <img
                            src={addOnImages.verticalFlue}
                            alt="Vertical Flue"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">Vertical</p>
                          <p className="text-sm text-primary font-semibold">+£150</p>
                        </div>
                      </button>

                    </div>
                  </div>

                  {/* TRVs */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">TRVs Required?</Label>
                    <div className="grid gap-3 sm:grid-cols-2">

                      {/* NO TRV */}
                      <button
                        type="button"
                        onClick={() => updateField("trvRequired", "no")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.trvRequired === "no"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                          ✕
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">No TRVs</p>
                          <p className="text-sm text-muted-foreground">Not required</p>
                        </div>
                      </button>

                      {/* YES TRV */}
                      <button
                        type="button"
                        onClick={() => updateField("trvRequired", "yes")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.trvRequired === "yes"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 overflow-hidden">
                          <img
                            src={addOnImages.trv}
                            alt="TRV Valve"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">Yes, add TRVs</p>
                          <p className="text-sm text-primary font-semibold">+£25 each</p>
                        </div>
                      </button>

                    </div>
                  </div>

                  {formData.trvRequired === "yes" && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      <Label className="text-sm font-medium text-foreground">
                        Number of TRVs (1-13)
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        max={13}
                        value={formData.trvCount || ""}
                        onChange={(e) =>
                          updateField(
                            "trvCount",
                            Math.min(13, Math.max(0, Number(e.target.value) || 0))
                          )
                        }
                        className="w-32"
                      />
                    </div>
                  )}

                  {/* THERMOSTAT */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">Thermostat</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      
                      {/* BASIC */}
                      <button
                        type="button"
                        onClick={() => updateField("thermostat", "basic")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.thermostat === "basic"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                          🌡️
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">Basic</p>
                          <p className="text-sm text-primary font-semibold">Included</p>
                        </div>
                      </button>

                      {/* SMART */}
                      <button
                        type="button"
                        onClick={() => updateField("thermostat", "smart")}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                          formData.thermostat === "smart"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/50 overflow-hidden">
                          <img
                            src={addOnImages.smartThermostat}
                            alt="Smart Thermostat"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">Smart</p>
                          <p className="text-sm text-primary font-semibold">+£100</p>
                        </div>
                      </button>

                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">Your Details</h2>
                    <p className="text-sm text-muted-foreground mb-6">How can we contact you?</p>
                  </div>

                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="John Smith"
                    error={errors.name}
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="07123 456789"
                      error={errors.phone}
                      required
                    />

                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="john@example.com"
                      error={errors.email}
                      required
                    />
                  </div>

                  <FormField
                    label="Postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={(e) => updateField("postcode", e.target.value)}
                    placeholder="SW1A 1AA"
                    error={errors.postcode}
                    required
                  />

                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex justify-between gap-4 pt-6 border-t border-border">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={prevStep} className="gap-2 bg-transparent">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length - 1 ? (
                  <Button onClick={nextStep} className="gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} size="lg">
                    Submit Quote Request
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>

          {/* PRICE BREAKDOWN */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Live Quote</h3>
                </div>

                {priceBreakdown.total > 0 ? (
                  <>
                    <div className="space-y-3 mb-4">
                      {priceBreakdown.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            <span>{item.label}</span>
                          </span>
                          <span className="font-medium text-foreground">
                            £{item.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          £{priceBreakdown.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-3">
                        Included with installation:
                      </p>

                      {/* FINAL UPDATED <img> */}
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <img
                          src={addOnImages.filter}
                          alt="MagnaClean Filter"
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <p className="text-xs font-medium text-foreground">MagnaClean Filter</p>
                          <p className="text-xs text-muted-foreground">System protection included</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select options to see your live quote
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
  </div>
  </>
)

}
