import { useState } from "react"
import { router, Link } from "@inertiajs/react"
import { Head } from '@inertiajs/react';
import { PageHeader } from "@/components/ui/page-header"
import { FormStepper } from "@/components/ui/form-stepper"
import { Button } from "@/components/ui/button"
import { FormField, FormTextarea } from "@/components/ui/form-field"
import { RadioGroupField } from "@/components/ui/radio-group-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

import { Upload, X, ArrowLeft, ArrowRight, Wrench, CheckCircle2 } from "lucide-react"

const steps = ["Boiler Info", "Issue Details", "Your Details", "Schedule"]

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

const faultCategories = [
  { value: "no-heating", label: "No heating" },
  { value: "no-hot-water", label: "No hot water" },
  { value: "both", label: "Both heating and hot water" },
  { value: "leaking", label: "Leaking" },
  { value: "error-code", label: "Error code" },
  { value: "strange-noise", label: "Strange noise" },
  { value: "low-pressure", label: "Low pressure" },
  { value: "other", label: "Other" },
]

const issueStarted = [
  { value: "today", label: "Today" },
  { value: "1-3-days", label: "1-3 days ago" },
  { value: "1-2-weeks", label: "1-2 weeks ago" },
  { value: "2-plus-weeks", label: "More than 2 weeks ago" },
]

const accessTypes = [
  { value: "easy", label: "Easy access" },
  { value: "cupboard", label: "Cupboard/boxed in" },
  { value: "loft", label: "Loft" },
  { value: "other", label: "Other" },
]

const timeSlots = [
  { value: "am", label: "AM (8am-12pm)" },
  { value: "pm", label: "PM (12pm-5pm)" },
]

export default function RepairPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    boilerType: "",
    brand: "",
    model: "",
    age: "",
    faultCategory: "",
    errorCode: "",
    otherDescription: "",
    issueStarted: "",
    priorWork: "",
    priorWorkDetails: "",
    files: [],
    accessType: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    preferredDate: "",
    timeSlot: "",
  })

  const [errors, setErrors] = useState({})

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...uploaded].slice(0, 5),
    }))
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!formData.boilerType) newErrors.boilerType = "Required"
      if (!formData.brand) newErrors.brand = "Required"
      if (!formData.age) newErrors.age = "Required"
    }

    if (step === 1) {
      if (!formData.faultCategory) newErrors.faultCategory = "Required"
      if (formData.faultCategory === "error-code" && !formData.errorCode)
        newErrors.errorCode = "Required"
      if (formData.faultCategory === "other" && !formData.otherDescription)
        newErrors.otherDescription = "Required"
      if (!formData.issueStarted) newErrors.issueStarted = "Required"
      if (!formData.accessType) newErrors.accessType = "Required"
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "Required"
      if (!formData.phone) newErrors.phone = "Required"
      if (!formData.email) newErrors.email = "Required"
      if (!formData.postcode) newErrors.postcode = "Required"
    }

    if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = "Required"
      if (!formData.timeSlot) newErrors.timeSlot = "Required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0 })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo({ top: 0 })
  }

  const handleSubmit = () => {
    if (!validateStep(3)) return

    const payload = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "files") {
        value.forEach((file) => payload.append("files[]", file))
      } else {
        payload.append(key, value)
      }
    })

    router.post("/repair/submit", payload, {
      onSuccess: () => setIsSubmitted(true),
    })
  }
   const pageTitle = "Book a Boiler Repair"; 

  // ==========================
  // AFTER SUBMIT THANK YOU
  // ==========================
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

              <h1 className="text-2xl font-bold">Booking Submitted!</h1>
              <p className="text-muted-foreground my-4">
                We’ll contact you shortly to confirm your boiler repair appointment.
              </p>

              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }


  return (
          <>
            <Head title={pageTitle} />
    <div className="min-h-screen bg-background">
      <PageHeader title={pageTitle} />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center">
          <div className="h-14 w-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Wrench className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold">Book a Boiler Repair</h1>
          <p className="text-muted-foreground mt-2">Fixed £75 labour charge</p>
        </div>

        <FormStepper steps={steps} currentStep={currentStep} className="mb-10" />

        <Card>
          <CardContent className="p-6 sm:p-8">

            {/* STEP 0 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="font-bold text-lg">Boiler Information</h2>

                <RadioGroupField
                  label="Boiler Type"
                  name="boilerType"
                  value={formData.boilerType}
                  onChange={(v) => updateField("boilerType", v)}
                  options={boilerTypes}
                  error={errors.boilerType}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-4">
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
                <h2 className="font-bold text-lg">Issue Details</h2>

                <div className="space-y-2">
                  <Label>Fault Category *</Label>
                  <Select
                    value={formData.faultCategory}
                    onValueChange={(v) => updateField("faultCategory", v)}
                  >
                    <SelectTrigger className={errors.faultCategory ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {faultCategories.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.faultCategory && (
                    <p className="text-xs text-destructive">{errors.faultCategory}</p>
                  )}
                </div>

                {formData.faultCategory === "error-code" && (
                  <FormField
                    label="Error Code"
                    value={formData.errorCode}
                    onChange={(e) => updateField("errorCode", e.target.value)}
                    error={errors.errorCode}
                    required
                  />
                )}

                {formData.faultCategory === "other" && (
                  <FormTextarea
                    label="Describe the issue"
                    value={formData.otherDescription}
                    onChange={(e) => updateField("otherDescription", e.target.value)}
                    error={errors.otherDescription}
                  />
                )}

                <RadioGroupField
                  label="When did the issue start?"
                  value={formData.issueStarted}
                  onChange={(v) => updateField("issueStarted", v)}
                  options={issueStarted}
                  error={errors.issueStarted}
                  required
                />

                <RadioGroupField
                  label="Access Type"
                  value={formData.accessType}
                  onChange={(v) => updateField("accessType", v)}
                  options={accessTypes}
                  error={errors.accessType}
                  required
                />

                {/* FILE UPLOAD */}
                <div className="space-y-3">
                  <Label>Upload Photos (optional)</Label>

                  <div className="border border-dashed p-5 rounded-xl text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm">Click to upload</p>
                    </label>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg"
                        >
                          <span className="truncate max-w-[120px]">{file.name}</span>
                          <button onClick={() => removeFile(index)}>
                            <X className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-bold text-lg">Your Details</h2>

                <FormField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={errors.name}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-4">
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

                <FormTextarea
                  label="Address (optional)"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-bold text-lg">Schedule</h2>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateField("preferredDate", e.target.value)}
                    className={errors.preferredDate ? "border-destructive" : ""}
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-destructive">{errors.preferredDate}</p>
                  )}
                </div>

                <RadioGroupField
                  label="Preferred Time"
                  value={formData.timeSlot}
                  onChange={(v) => updateField("timeSlot", v)}
                  options={timeSlots}
                  error={errors.timeSlot}
                  required
                />

                <div className="p-4 rounded-xl border bg-primary/5 border-primary">
                  <h3 className="font-bold">Repair Cost</h3>
                  <p className="text-3xl font-bold text-primary mt-2">£75</p>
                  <p className="text-muted-foreground text-sm">Labour only, parts extra</p>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-8 flex justify-between border-t pt-6">
              {currentStep > 0 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep}>
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
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
