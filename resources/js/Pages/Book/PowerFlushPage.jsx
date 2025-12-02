import { useState, useMemo } from "react"
import { router, usePage } from "@inertiajs/react"
import { PageHeader } from "@/components/ui/page-header"
import { FormStepper } from "@/components/ui/form-stepper"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { RadioGroupField } from "@/components/ui/radio-group-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Droplets, CheckCircle2 } from "lucide-react"

const steps = ["Radiator Count", "System Info", "Your Details", "Schedule"]

const radiatorOptions = [
  { value: "5-or-less", label: "≤5 radiators", price: 400 },
  { value: "6-8", label: "6-8 radiators", price: 500 },
  { value: "9-12", label: "9-12 radiators", price: 600 },
  { value: "13-15", label: "13-15 radiators", price: 700 },
  { value: "16-20", label: "16-20 radiators", price: 800 },
  { value: "21-plus", label: "21+ radiators", price: 900 },
]

const systemTypes = [
  { value: "combi", label: "Combi" },
  { value: "system", label: "System" },
  { value: "heat-only", label: "Heat Only" },
]

const flushHistory = [
  { value: "never", label: "Never" },
  { value: "1-3-years", label: "1-3 years ago" },
  { value: "3-5-years", label: "3-5 years ago" },
  { value: "5-plus-years", label: "5+ years ago" },
]

const accessOptions = [
  { value: "easy", label: "Easy access" },
  { value: "tight", label: "Tight space" },
  { value: "loft", label: "Loft" },
]

export default function PowerFlushPage() {
  const { props } = usePage()
  const pageTitle = props.pageTitle ?? "Book Power Flush"

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    radiatorCount: "",
    systemType: "",
    coldSpots: "",
    sludgeWater: "",
    previousFlush: "",
    leaksPresent: "",
    accessType: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    preferredDate: "",
  })

  const [errors, setErrors] = useState({})

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const selectedPrice = useMemo(() => {
    const option = radiatorOptions.find((opt) => opt.value === formData.radiatorCount)
    return option ? option.price : null
  }, [formData.radiatorCount])

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0 && !formData.radiatorCount)
      newErrors.radiatorCount = "Please select radiator count"

    if (step === 1) {
      if (!formData.systemType) newErrors.systemType = "Please select system type"
      if (!formData.coldSpots) newErrors.coldSpots = "This field is required"
      if (!formData.sludgeWater) newErrors.sludgeWater = "This field is required"
      if (!formData.previousFlush) newErrors.previousFlush = "Please select an option"
      if (!formData.leaksPresent) newErrors.leaksPresent = "This field is required"
      if (!formData.accessType) newErrors.accessType = "Select access type"
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "Enter name"
      if (!formData.phone) newErrors.phone = "Enter phone"
      if (!formData.email) newErrors.email = "Enter email"
      if (!formData.postcode) newErrors.postcode = "Enter postcode"
    }

    if (step === 3 && !formData.preferredDate)
      newErrors.preferredDate = "Choose a date"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = () => {
    if (!validateStep(currentStep)) return

    console.log("Power flush form submitted:", formData, "Price:", selectedPrice)

    setIsSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Booking Confirmed" />

        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold mb-3">Power Flush Booked!</h1>
              <p className="text-muted-foreground mb-8">
                We will contact you shortly to confirm your appointment.
              </p>

              <div className="rounded-lg bg-muted/50 p-4 mb-8 text-left">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <p><strong>Service:</strong> Power Flush</p>
                <p><strong>Date:</strong> {formData.preferredDate}</p>
                <p><strong>Cost:</strong> £{selectedPrice}{formData.radiatorCount === "21-plus" ? "+" : ""}</p>
              </div>

              <Button onClick={() => router.visit("/")} className="gap-2">
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // MAIN FORM
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={pageTitle} />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Droplets className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Book a Power Flush</h1>
          <p className="text-muted-foreground">Restore system efficiency</p>
        </div>

        <FormStepper steps={steps} currentStep={currentStep} className="mb-10" />

        <Card>
          <CardContent className="p-6 sm:p-8">

            {/* STEP 1 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Select Radiator Count</h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {radiatorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("radiatorCount", option.value)}
                      className={`rounded-xl border-2 p-4 transition-all ${
                        formData.radiatorCount === option.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="mt-2 text-xl font-bold text-primary">
                        £{option.price}{option.value === "21-plus" && "+"}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedPrice && (
                  <div className="flex items-center gap-4 rounded-xl bg-primary/10 p-5">
                    <Droplets className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Your Price</p>
                      <p className="text-2xl font-bold text-primary">
                        £{selectedPrice}{formData.radiatorCount === "21-plus" && "+"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">System Information</h2>

                <RadioGroupField
                  label="System Type"
                  name="systemType"
                  value={formData.systemType}
                  onChange={(v) => updateField("systemType", v)}
                  options={systemTypes}
                  error={errors.systemType}
                  required
                />

                <RadioGroupField
                  label="Cold spots in radiators?"
                  name="coldSpots"
                  value={formData.coldSpots}
                  onChange={(v) => updateField("coldSpots", v)}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  error={errors.coldSpots}
                  required
                />

                <RadioGroupField
                  label="Sludge/dirty water?"
                  name="sludgeWater"
                  value={formData.sludgeWater}
                  onChange={(v) => updateField("sludgeWater", v)}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  error={errors.sludgeWater}
                  required
                />

                <RadioGroupField
                  label="Previous Flush"
                  name="previousFlush"
                  value={formData.previousFlush}
                  onChange={(v) => updateField("previousFlush", v)}
                  options={flushHistory}
                  error={errors.previousFlush}
                  required
                />

                <RadioGroupField
                  label="Any leaks present?"
                  name="leaksPresent"
                  value={formData.leaksPresent}
                  onChange={(v) => updateField("leaksPresent", v)}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  error={errors.leaksPresent}
                  required
                />

                <RadioGroupField
                  label="Access Type"
                  name="accessType"
                  value={formData.accessType}
                  onChange={(v) => updateField("accessType", v)}
                  options={accessOptions}
                  error={errors.accessType}
                  required
                />
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Your Details</h2>

                <FormField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={errors.name}
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    error={errors.phone}
                    required
                  />
                  <FormField
                    label="Email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={errors.email}
                    required
                  />
                </div>

                <FormField
                  label="Postcode"
                  value={formData.postcode}
                  onChange={(e) => updateField("postcode", e.target.value)}
                  error={errors.postcode}
                  required
                />
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Schedule Your Visit</h2>

                <Label>Preferred Date *</Label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateField("preferredDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={errors.preferredDate ? "border-destructive" : ""}
                />
                {errors.preferredDate && (
                  <p className="text-xs text-destructive">{errors.preferredDate}</p>
                )}

                <div className="rounded-xl border border-primary p-6 bg-primary/5">
                  <h4 className="font-semibold">Estimated Cost</h4>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    £{selectedPrice}{formData.radiatorCount === "21-plus" && "+"}
                  </p>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-8 flex justify-between gap-4 pt-6 border-t">
              {currentStep > 0 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleSubmit}>
                  Submit Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
