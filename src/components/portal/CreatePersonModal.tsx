import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (personData: PersonData) => void;
}

interface PersonData {
  // Personal Information tab
  firstName: string;
  middleInitial?: string;
  lastName: string;
  salutation?: string;
  suffix?: string;
  pronouns?: string;
  jobTitle?: string;
  entityRole?: string;
  
  // Address tab
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  
  // Contact tab
  email: string;
  homePhone?: string;
  mobilePhone?: string;
  businessPhone?: string;
  otherPhone?: string;
  preferredPhone?: string;
}

const salutations = [
  "Mr.",
  "Mrs.",
  "Ms.",
  "Dr.",
  "Prof.",
  "Rev.",
  "Hon."
];

const suffixes = [
  "Jr.",
  "Sr.",
  "II",
  "III",
  "IV",
  "PhD",
  "MD",
  "Esq."
];

const pronounOptions = [
  "He/Him",
  "She/Her",
  "They/Them",
  "Other"
];

const entityRoles = [
  "Principal",
  "Representative",
  "Agent",
  "Authorized Officer",
  "Other"
];

const phoneTypes = [
  { value: "home", label: "Home" },
  { value: "mobile", label: "Mobile" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" }
];

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" }
];

export function CreatePersonModal({ isOpen, onClose, onSave }: CreatePersonModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PersonData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "US"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return value;
  };

  const validateZip = (zip: string) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Format validation
    if (formData.postalCode && !validateZip(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid ZIP code (12345 or 12345-6789)";
    }

    // Middle initial validation
    if (formData.middleInitial && formData.middleInitial.length > 1) {
      newErrors.middleInitial = "Middle initial should be a single character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof PersonData, value: string) => {
    let processedValue = value;
    
    // Format phone numbers
    if (field.includes('Phone')) {
      processedValue = formatPhone(value);
    }
    
    // Limit middle initial to 1 character
    if (field === 'middleInitial') {
      processedValue = value.slice(0, 1).toUpperCase();
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Focus on first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(formData);
      toast({
        title: "Success",
        description: "Contact saved.",
      });
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      country: "US"
    });
    setErrors({});
    setActiveTab("personal");
    onClose();
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (Object.values(formData).some(val => val && val !== "US")) {
        if (confirm("Discard unsaved changes?")) {
          handleClose();
        }
      } else {
        handleClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onKeyDown={(e) => handleEscapeKey(e as any)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Contact
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleFieldChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="middleInitial">MI</Label>
                    <Input
                      id="middleInitial"
                      value={formData.middleInitial || ""}
                      onChange={(e) => handleFieldChange("middleInitial", e.target.value)}
                      className={errors.middleInitial ? "border-red-500" : ""}
                      placeholder="M"
                      maxLength={1}
                    />
                    {errors.middleInitial && <p className="text-sm text-red-500 mt-1">{errors.middleInitial}</p>}
                  </div>

                  <div className="col-span-3">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleFieldChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="salutation">Salutation</Label>
                    <Select value={formData.salutation} onValueChange={(value) => handleFieldChange("salutation", value)}>
                      <SelectTrigger id="salutation">
                        <SelectValue placeholder="Select salutation" />
                      </SelectTrigger>
                      <SelectContent>
                        {salutations.map((salutation) => (
                          <SelectItem key={salutation} value={salutation}>{salutation}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="suffix">Suffix</Label>
                    <Select value={formData.suffix} onValueChange={(value) => handleFieldChange("suffix", value)}>
                      <SelectTrigger id="suffix">
                        <SelectValue placeholder="Select suffix" />
                      </SelectTrigger>
                      <SelectContent>
                        {suffixes.map((suffix) => (
                          <SelectItem key={suffix} value={suffix}>{suffix}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pronouns">Pronouns</Label>
                    <Select value={formData.pronouns} onValueChange={(value) => handleFieldChange("pronouns", value)}>
                      <SelectTrigger id="pronouns">
                        <SelectValue placeholder="Select pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        {pronounOptions.map((pronoun) => (
                          <SelectItem key={pronoun} value={pronoun}>{pronoun}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle || ""}
                      onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
                      placeholder="Job title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="entityRole">Entity Role</Label>
                    <Select value={formData.entityRole} onValueChange={(value) => handleFieldChange("entityRole", value)}>
                      <SelectTrigger id="entityRole">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {entityRoles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Address Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please provide a valid US mailing location for your home address.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1 || ""}
                      onChange={(e) => handleFieldChange("addressLine1", e.target.value)}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2 || ""}
                      onChange={(e) => handleFieldChange("addressLine2", e.target.value)}
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city || ""}
                      onChange={(e) => handleFieldChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stateProvince">State/Province</Label>
                    <Input
                      id="stateProvince"
                      value={formData.stateProvince || ""}
                      onChange={(e) => handleFieldChange("stateProvince", e.target.value)}
                      placeholder="State or Province"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode || ""}
                      onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                      className={errors.postalCode ? "border-red-500" : ""}
                      placeholder="12345 or 12345-6789"
                    />
                    {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleFieldChange("country", value)}>
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please provide your updated contact details.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Update: ILogin</p>
                  </div>

                  <div>
                    <Label htmlFor="homePhone">Home Phone</Label>
                    <Input
                      id="homePhone"
                      value={formData.homePhone || ""}
                      onChange={(e) => handleFieldChange("homePhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobilePhone">Mobile Phone</Label>
                    <Input
                      id="mobilePhone"
                      value={formData.mobilePhone || ""}
                      onChange={(e) => handleFieldChange("mobilePhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessPhone">Business Phone</Label>
                    <Input
                      id="businessPhone"
                      value={formData.businessPhone || ""}
                      onChange={(e) => handleFieldChange("businessPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="otherPhone">Other Phone</Label>
                    <Input
                      id="otherPhone"
                      value={formData.otherPhone || ""}
                      onChange={(e) => handleFieldChange("otherPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="preferredPhone">Preferred Phone</Label>
                    <Select value={formData.preferredPhone} onValueChange={(value) => handleFieldChange("preferredPhone", value)}>
                      <SelectTrigger id="preferredPhone">
                        <SelectValue placeholder="Select preferred phone type" />
                      </SelectTrigger>
                      <SelectContent>
                        {phoneTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}