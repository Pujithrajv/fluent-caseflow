import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateContactRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (contact: ContactRecord) => void
  onCancel: () => void
}

interface ContactRecord {
  prefix?: string
  firstName?: string
  middleInitial?: string
  lastName?: string
  suffix?: string
  salutation?: string
  title?: string
  organization?: string
  participationType: string
  email?: string
  businessPhone?: string
  mobilePhone?: string
  street1?: string
  city?: string
  stateProvince?: string
  postalCode?: string
}

const participationTypes = [
  "Plaintiff",
  "Defendant", 
  "Witness",
  "Expert Witness",
  "Attorney",
  "Representative",
  "Third Party"
]

const prefixOptions = [
  "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Rev."
]

const suffixOptions = [
  "Jr.", "Sr.", "II", "III", "IV", "V", "Esq.", "Ph.D.", "M.D."
]

const salutationOptions = [
  "Dear", "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Rev."
]

const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

export function CreateContactRecordModal({
  isOpen,
  onClose,
  onSubmit,
  onCancel
}: CreateContactRecordModalProps) {
  const [formData, setFormData] = useState<ContactRecord>({
    prefix: "",
    firstName: "",
    middleInitial: "",
    lastName: "",
    suffix: "",
    salutation: "",
    title: "",
    organization: "",
    participationType: "",
    email: "",
    businessPhone: "",
    mobilePhone: "",
    street1: "",
    city: "",
    stateProvince: "",
    postalCode: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handleInputChange = (field: keyof ContactRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handlePhoneChange = (field: "businessPhone" | "mobilePhone", value: string) => {
    const formatted = formatPhone(value)
    handleInputChange(field, formatted)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Person vs Organization validation
    const hasPersonName = formData.firstName?.trim() || formData.lastName?.trim()
    const hasOrganization = formData.organization?.trim()

    if (!hasPersonName && !hasOrganization) {
      newErrors.firstName = "Provide either a person name (First or Last) or an Organization"
      newErrors.lastName = "Provide either a person name (First or Last) or an Organization"
      newErrors.organization = "Provide either a person name (First or Last) or an Organization"
    }

    // Participation Type is always required
    if (!formData.participationType) {
      newErrors.participationType = "Participation Type is required"
    }

    // Middle Initial validation (1 character max)
    if (formData.middleInitial && formData.middleInitial.length > 1) {
      newErrors.middleInitial = "Middle Initial should be 1 character"
    }

    // Email or address required
    const hasEmail = formData.email?.trim()
    const hasCompleteAddress = formData.street1?.trim() && formData.city?.trim() && formData.stateProvince && formData.postalCode?.trim()

    if (!hasEmail && !hasCompleteAddress) {
      if (!hasEmail) {
        newErrors.email = "Email is required if no address is provided"
      }
      if (!formData.street1?.trim()) {
        newErrors.street1 = "Street address is required if no email is provided"
      }
      if (!formData.city?.trim()) {
        newErrors.city = "City is required if no email is provided"
      }
      if (!formData.stateProvince) {
        newErrors.stateProvince = "State is required if no email is provided"
      }
      if (!formData.postalCode?.trim()) {
        newErrors.postalCode = "Postal code is required if no email is provided"
      }
    }

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before submitting.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Process the data
      const processedData = {
        ...formData,
        prefix: formData.prefix?.trim() || undefined,
        firstName: formData.firstName?.trim() || undefined,
        middleInitial: formData.middleInitial?.trim() || undefined,
        lastName: formData.lastName?.trim() || undefined,
        suffix: formData.suffix?.trim() || undefined,
        salutation: formData.salutation?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        organization: formData.organization?.trim() || undefined,
        email: formData.email?.trim() || undefined,
        businessPhone: formData.businessPhone?.trim() || undefined,
        mobilePhone: formData.mobilePhone?.trim() || undefined,
        street1: formData.street1?.trim() || undefined,
        city: formData.city?.trim() || undefined,
        postalCode: formData.postalCode?.trim() || undefined
      }

      // Set email consent to No if no email provided
      if (!processedData.email) {
        // In a real implementation, you would set email consent to "No" here
        console.log("Email consent set to No - will send notices by mail")
      }

      onSubmit(processedData)
      
      toast({
        title: "Success",
        description: "Contact created successfully."
      })

      // Reset form
      setFormData({
        prefix: "",
        firstName: "",
        middleInitial: "",
        lastName: "",
        suffix: "",
        salutation: "",
        title: "",
        organization: "",
        participationType: "",
        email: "",
        businessPhone: "",
        mobilePhone: "",
        street1: "",
        city: "",
        stateProvince: "",
        postalCode: ""
      })
      setErrors({})
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create contact. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        aria-labelledby="create-contact-title"
      >
        <DialogHeader>
          <DialogTitle id="create-contact-title">Create a new record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact</h3>
            <p className="text-sm text-gray-600">
              Provide either a <strong>person name</strong> (First or Last) <strong>or</strong> an <strong>Organization</strong>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix</Label>
                <Select 
                  value={formData.prefix || ""} 
                  onValueChange={(value) => handleInputChange("prefix", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent>
                    {prefixOptions.map((prefix) => (
                      <SelectItem key={prefix} value={prefix}>{prefix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleInitial">Middle Initial</Label>
                <Input
                  id="middleInitial"
                  value={formData.middleInitial || ""}
                  onChange={(e) => handleInputChange("middleInitial", e.target.value)}
                  className={errors.middleInitial ? "border-red-500" : ""}
                  maxLength={1}
                  placeholder="M"
                />
                {errors.middleInitial && (
                  <p className="text-sm text-red-500">{errors.middleInitial}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Select 
                  value={formData.suffix || ""} 
                  onValueChange={(value) => handleInputChange("suffix", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select suffix" />
                  </SelectTrigger>
                  <SelectContent>
                    {suffixOptions.map((suffix) => (
                      <SelectItem key={suffix} value={suffix}>{suffix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salutation">Salutation</Label>
                <Select 
                  value={formData.salutation || ""} 
                  onValueChange={(value) => handleInputChange("salutation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select salutation" />
                  </SelectTrigger>
                  <SelectContent>
                    {salutationOptions.map((salutation) => (
                      <SelectItem key={salutation} value={salutation}>{salutation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <div className="relative">
                  <Input
                    id="organization"
                    value={formData.organization || ""}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    className={`pr-10 ${errors.organization ? "border-red-500" : ""}`}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                {errors.organization && (
                  <p className="text-sm text-red-500">{errors.organization}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="participationType">Participation Type *</Label>
                <Select 
                  value={formData.participationType} 
                  onValueChange={(value) => handleInputChange("participationType", value)}
                >
                  <SelectTrigger className={errors.participationType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select participation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {participationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.participationType && (
                  <p className="text-sm text-red-500">{errors.participationType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                <p className="text-sm text-gray-500">
                  If no email is entered, a mailing address is required.
                </p>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  value={formData.businessPhone || ""}
                  onChange={(e) => handlePhoneChange("businessPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobilePhone">Mobile Phone</Label>
                <Input
                  id="mobilePhone"
                  value={formData.mobilePhone || ""}
                  onChange={(e) => handlePhoneChange("mobilePhone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street1">Street 1</Label>
                <Input
                  id="street1"
                  value={formData.street1 || ""}
                  onChange={(e) => handleInputChange("street1", e.target.value)}
                  className={errors.street1 ? "border-red-500" : ""}
                />
                {errors.street1 && (
                  <p className="text-sm text-red-500">{errors.street1}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stateProvince">State / Province</Label>
                <Select 
                  value={formData.stateProvince || ""} 
                  onValueChange={(value) => handleInputChange("stateProvince", value)}
                >
                  <SelectTrigger className={errors.stateProvince ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stateProvince && (
                  <p className="text-sm text-red-500">{errors.stateProvince}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Zip / Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode || ""}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  className={errors.postalCode ? "border-red-500" : ""}
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}