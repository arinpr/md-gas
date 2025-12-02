import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { PageHeader } from "@/components/ui/page-header"
import { FormStepper } from "@/components/ui/form-stepper"
import { Button } from "@/components/ui/button"
import { FormField, FormTextarea } from "@/components/ui/form-field"
import { RadioGroupField } from "@/components/ui/radio-group-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Settings, CheckCircle2 } from "lucide-react"
import { Head } from "@inertiajs/react"

const steps = ["Boiler Info", "Access & Issues", "Your Details", "Schedule"]

const boilerTypes = [
  { value: "combi", label: "Combi" },
  { value: "system", label: "System" },
  { value: "heat-only", label: "Heat Only" },
]

const ageOptions = [
  { value: "under-5", label: "<5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15-plus", label: "15+ years" },
]

const accessOptions = [
  { value: "easy", label: "Easy access" },
  { value: "tight", label: "Tight cupboard" },
  { value: "loft", label: "Loft" },
]

export default function ServicePage() {
  const { props } = usePage()
  const pageTitle = props.pageTitle ?? "Book a Service"

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    boilerType: "",
    brand: "",
    model: "",
    age: "",
    accessSituation: "",
    knownIssues: "",
    issueDetails: "",
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

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!formData.boilerType) newErrors.boilerType = "Please select a boiler type"
      if (!formData.brand) newErrors.brand = "Please enter the brand"
      if (!formData.age) newErrors.age = "Please select boiler age"
    }

    if (step === 1) {
      if (!formData.accessSituation) newErrors.accessSituation = "Please select access"
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "Enter name"
      if (!formData.phone) newErrors.phone = "Enter phone"
      if (!formData.email) newErrors.email = "Enter email"
      if (!formData.postcode) newErrors.postcode = "Enter postcode"
    }

    if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = "Select date"
    }

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
    if (validateStep(currentStep)) {
      console.log("Service Submitted:", formData)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // SUCCESS PAGE
  if (isSubmitted) {
  
    
    return (
          <>

        <Head title= "Service Booked!" />
      <div className="min-h-screen bg-background">
        <PageHeader title="Booking Confirmed" />

        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold mb-3">Service Booked!</h1>

              <p className="text-muted-foreground mb-8">
                We will contact you shortly to confirm your appointment.
              </p>

              <Button onClick={() => router.visit("/")} className="gap-2">
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      </>
    )
  }

  // MAIN FORM PAGE
  return (
    <>
    <Head title={pageTitle}/>
    <div className="min-h-screen bg-background">
      <PageHeader title={pageTitle} />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Settings className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold">Book a Boiler Service</h1>
          <p className="text-muted-foreground">Annual service from £75</p>
        </div>

        <FormStepper steps={steps} currentStep={currentStep} className="mb-10" />

        <Card>
          <CardContent className="p-6 sm:p-8">

            {/* STEP 0 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Boiler Information</h2>

                <RadioGroupField
                  label="Boiler Type"
                  name="boilerType"
                  value={formData.boilerType}
                  onChange={(v) => updateField("boilerType", v)}
                  options={boilerTypes}
                  error={errors.boilerType}
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Brand"
                    value={formData.brand}
                    onChange={(e) => updateField("brand", e.target.value)}
                    error={errors.brand}
                    required
                  />
                  <FormField
                    label="Model"
                    value={formData.model}
                    onChange={(e) => updateField("model", e.target.value)}
                  />
                </div>

                <RadioGroupField
                  label="Boiler Age"
                  name="age"
                  value={formData.age}
                  onChange={(v) => updateField("age", v)}
                  options={ageOptions}
                  error={errors.age}
                  required
                />
              </div>
            )}

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Access & Known Issues</h2>

                <RadioGroupField
                  label="Access Situation"
                  name="accessSituation"
                  value={formData.accessSituation}
                  onChange={(v) => updateField("accessSituation", v)}
                  options={accessOptions}
                  error={errors.accessSituation}
                  required
                />

                <RadioGroupField
                  label="Any Known Issues?"
                  name="knownIssues"
                  value={formData.knownIssues}
                  onChange={(v) => updateField("knownIssues", v)}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />

                {formData.knownIssues === "yes" && (
                  <FormTextarea
                    label="Describe Issues"
                    value={formData.issueDetails}
                    onChange={(e) => updateField("issueDetails", e.target.value)}
                  />
                )}
              </div>
            )}

            {/* STEP 2 */}
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

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Schedule Your Service</h2>

                <div className="space-y-2">
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
                </div>

                <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
                  <h4 className="font-semibold">Service Cost</h4>
                  <p className="mt-2 text-3xl font-bold text-primary">From £75</p>
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
    </>
  )
}
