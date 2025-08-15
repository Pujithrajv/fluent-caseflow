import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

interface AddNewContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (contact: ContactData) => void
  contactType?: "Party" | "Attorney" | "Coordinator" | "Witness"
  title?: string
}

interface ContactData {
  prefix?: string
  firstName: string
  middleInitial?: string
  lastName: string
  suffix?: string
  salutation?: string
  title?: string
  organization?: string
  phone?: string
  email?: string
  address1?: string
  address2?: string
  city?: string
  stateProvince?: string
  postalCode?: string
  country: string
  contactType: string
  ardcNumber?: string
  emailConsent?: boolean
}

const prefixOptions = ["Mr.", "Ms.", "Mx.", "Dr.", "Prof.", "Hon.", "Rev."]
const suffixOptions = ["Jr.", "Sr.", "II", "III", "IV", "Esq.", "CPA", "MD", "PhD", "JD", "RN", "Trustee", "Executor"]
const salutationOptions = ["Mr.", "Ms.", "Mx.", "Dr.", "Prof.", "Hon.", "Rev."]
const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]
const countryOptions = [
  "United States", "Canada", "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Belgium", "Brazil",
  "Bulgaria", "Cambodia", "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland",
  "France", "Germany", "Greece", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan",
  "Jordan", "Kenya", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Norway", "Pakistan", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Thailand", "Turkey", "Ukraine", "United Kingdom", "Vietnam"
]

export function AddNewContactModal({ 
  isOpen, 
  onClose, 
  onSave, 
  contactType = "Party",
  title 
}: AddNewContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<ContactData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "United States",
      contactType: contactType
    }
  })

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const validateForm = (data: ContactData) => {
    const errors: string[] = []
    
    if (!data.firstName?.trim()) errors.push("First Name is required")
    if (!data.lastName?.trim()) errors.push("Last Name is required")
    
    const hasEmail = data.email?.trim()
    const hasAddress = data.address1?.trim() && data.city?.trim() && data.stateProvince?.trim() && data.postalCode?.trim()
    
    if (!hasEmail && !hasAddress) {
      errors.push("Provide an email or a mailing address so we can send notices.")
    }
    
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Please enter a valid email address")
    }
    
    return errors
  }

  const onSubmit = async (data: ContactData) => {
    const errors = validateForm(data)
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(". "),
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Process the data
      const processedData = {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        middleInitial: data.middleInitial?.trim().slice(0, 1) || undefined,
        email: data.email?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
        emailConsent: data.email?.trim() ? undefined : false,
        contactType
      }

      onSave(processedData)
      
      toast({
        title: "Success",
        description: "Contact added and selected."
      })
      
      form.reset()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    form.setValue("phone", formatted)
  }

  const modalTitle = title || `Add New ${contactType}`
  const isAttorney = contactType === "Attorney"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        aria-labelledby="add-contact-title"
      >
        <DialogHeader>
          <DialogTitle id="add-contact-title">{modalTitle}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefix</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select prefix" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {prefixOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleInitial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Initial</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          maxLength={1}
                          onChange={(e) => field.onChange(e.target.value.slice(0, 1))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="suffix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suffix</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select suffix" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suffixOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salutation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salutation</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select salutation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {salutationOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Job title" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {isAttorney && (
                  <FormField
                    control={form.control}
                    name="ardcNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ARDC Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Attorney registration number"
                            maxLength={20}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Company or organization name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="(555) 123-4567"
                          onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormDescription>
                        If no email is entered, a mailing address is required.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stateProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateOptions.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip / Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Contact"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}