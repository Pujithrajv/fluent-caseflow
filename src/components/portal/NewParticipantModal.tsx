import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
interface NewParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onParticipantCreated: (participant: any) => void;
}
interface FormData {
  firstName: string;
  lastName: string;
  roleTitle: string;
  organization: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}
interface FormErrors {
  firstName?: string;
  organization?: string;
  phone?: string;
  email?: string;
  address?: string;
  general?: string;
}
export function NewParticipantModal({
  isOpen,
  onClose,
  onParticipantCreated
}: NewParticipantModalProps) {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    roleTitle: "",
    organization: "",
    phone: "",
    email: "",
    address: "",
    notes: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return cleaned;
    }
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleInputChange = (field: keyof FormData, value: string) => {
    setIsDirty(true);
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // At least First Name OR Organization must be provided
    if (!formData.firstName.trim() && !formData.organization.trim()) {
      newErrors.general = "Either First Name or Organization must be provided";
    }

    // Email validation if provided
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Either Phone OR Address is required
    const hasPhone = formData.phone.trim();
    const hasAddress = formData.address.trim();
    if (!hasPhone && !hasAddress) {
      newErrors.phone = "Either phone or address is required";
      newErrors.address = "Either phone or address is required";
    }

    // If no email, address becomes required
    if (!formData.email.trim() && !hasAddress) {
      newErrors.address = "Address is required when no email is provided";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Create participant object that matches both interfaces
    const newParticipant = {
      id: Date.now().toString(),
      // Convert to string for AttorneyCaseView compatibility
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.roleTitle,
      organization: formData.organization,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      notes: formData.notes,
      // For ParticipantsTab compatibility
      party: `${formData.firstName} ${formData.lastName}`.trim() || formData.organization,
      roleTitle: formData.roleTitle,
      contact: [formData.phone && `P. ${formData.phone}`, formData.email && `E. ${formData.email}`].filter(Boolean).join('\n')
    };
    onParticipantCreated(newParticipant);
    toast({
      title: "Success",
      description: "Participant added successfully."
    });
    handleClose();
  };
  const handleClose = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        resetForm();
        onClose();
      }
    } else {
      resetForm();
      onClose();
    }
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      roleTitle: "",
      organization: "",
      phone: "",
      email: "",
      address: "",
      notes: ""
    });
    setErrors({});
    setIsDirty(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  return <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent onKeyDown={handleKeyDown} className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">New Participant</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6" aria-label="Close dialog">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={errors.firstName ? "border-red-500" : ""} />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} />
            </div>

            <div>
              <Label htmlFor="roleTitle">Role/Title</Label>
              <Input id="roleTitle" value={formData.roleTitle} onChange={e => handleInputChange('roleTitle', e.target.value)} />
            </div>

            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" value={formData.organization} onChange={e => handleInputChange('organization', e.target.value)} className={errors.organization ? "border-red-500" : ""} />
              {errors.organization && <p className="text-sm text-red-500 mt-1">{errors.organization}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="(555) 123-4567" className={errors.phone ? "border-red-500" : ""} />
              <p className="text-sm text-muted-foreground mt-1">
                Enter either phone or address
              </p>
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={errors.email ? "border-red-500" : ""} />
              <p className="text-sm text-muted-foreground mt-1">
                If no email is entered, address is required
              </p>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} rows={3} className={errors.address ? "border-red-500" : ""} />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} rows={3} />
            </div>
          </div>
        </div>

        {errors.general && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>}

        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
}