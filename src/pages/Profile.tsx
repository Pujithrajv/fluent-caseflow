import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft, Info, HelpCircle, Edit, Trash2, Save, X, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Header } from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AgencyManagementDashboard } from "@/components/portal/AgencyManagementDashboard";
import { Dynamics365AgencyDashboard } from "@/components/portal/Dynamics365AgencyDashboard";
import { Dynamics365SinglePageDashboard } from "@/components/portal/Dynamics365SinglePageDashboard";
import { AgencyManagerScreen } from "@/components/portal/AgencyManagerScreen";
import { AgencyTestScreen } from "@/components/portal/AgencyTestScreen";
import { AgencyTest2Screen } from "@/components/portal/AgencyTest2Screen";
import { AgencyTest1Screen } from "@/components/portal/AgencyTest1Screen";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    salutation: "",
    suffix: "",
    pronouns: "",
    participationType: "",
    preferredLanguage: ""
  });

  // Address Information state
  const [addressInfo, setAddressInfo] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States"
  });

  // Contact Information state
  const [contactInfo, setContactInfo] = useState({
    email: "user@example.com", // Read-only from OKTA
    phoneHome: "",
    phoneMobile: "",
    phoneBusiness: "",
    phoneOther: "",
    preferredPhone: ""
  });

  const [accountProfile, setAccountProfile] = useState({
    organizationName: "",
    website: "",
    telephone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    participationType: ""
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Additional consent preferences
  const [emailCommunicationsConsent, setEmailCommunicationsConsent] = useState("allow");
  const [postalMailConsent, setPostalMailConsent] = useState("allow");
  const [smsNotificationsConsent, setSmsNotificationsConsent] = useState("do-not-allow");
  const [phoneCallsConsent, setPhoneCallsConsent] = useState("ask-each-time");
  const [marketingCommunicationsConsent, setMarketingCommunicationsConsent] = useState("do-not-allow");

  // Contacts state
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "j.smith@agr.gov",
      phone: "555-111-2222",
      role: "Attorney",
      lastUpdatedBy: "Case Manager Smith",
      lastUpdatedDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "j.doe@agr.gov",
      phone: "555-333-4444",
      role: "Case Manager",
      lastUpdatedBy: "Case Manager Johnson",
      lastUpdatedDate: "2024-01-10"
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@agr.gov",
      phone: "555-555-6666",
      role: "FDM (Final Decision Maker)",
      lastUpdatedBy: "Case Manager Davis",
      lastUpdatedDate: "2024-01-08"
    }
  ]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });
  const [editContact, setEditContact] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleAddressInfoChange = (field: string, value: string) => {
    setAddressInfo(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleAccountChange = (field: string, value: string) => {
    setAccountProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Validate required fields
    const requiredFieldsValid = personalInfo.firstName && personalInfo.lastName && 
      addressInfo.address1 && addressInfo.city && addressInfo.state && addressInfo.postalCode;
    
    if (!requiredFieldsValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save profile logic here
    setHasUnsavedChanges(false);
    toast({
      title: "Success",
      description: "Profile updated."
    });
  };

  const handleCancel = () => {
    navigate("/portal");
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const formatZip = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Attorney":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Case Manager":
        return "bg-green-100 text-green-800 border-green-200";
      case "FDM (Final Decision Maker)":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Paralegal":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Support Staff":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddContact = () => {
    setIsAddingContact(true);
    setNewContact({ name: "", email: "", phone: "", role: "" });
  };

  const handleSaveNewContact = () => {
    if (!newContact.name || !newContact.email || !newContact.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const contactToAdd = {
      id: Date.now().toString(),
      ...newContact,
      lastUpdatedBy: "Current Case Manager",
      lastUpdatedDate: new Date().toISOString().split('T')[0]
    };

    setContacts(prev => [...prev, contactToAdd]);
    setIsAddingContact(false);
    setNewContact({ name: "", email: "", phone: "", role: "" });
    toast({
      title: "Success",
      description: "Contact added successfully."
    });
  };

  const handleEditContact = (contact: any) => {
    setEditingContactId(contact.id);
    setEditContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      role: contact.role
    });
  };

  const handleSaveEditContact = (contactId: string) => {
    if (!editContact.name || !editContact.email || !editContact.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? {
            ...contact,
            ...editContact,
            lastUpdatedBy: "Current Case Manager",
            lastUpdatedDate: new Date().toISOString().split('T')[0]
          }
        : contact
    ));
    setEditingContactId(null);
    toast({
      title: "Success",
      description: "Contact updated successfully."
    });
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
    toast({
      title: "Success",
      description: "Contact deleted successfully."
    });
  };

  const handleRoleChange = (contactId: string, newRole: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? {
            ...contact,
            role: newRole,
            lastUpdatedBy: "Current Case Manager",
            lastUpdatedDate: new Date().toISOString().split('T')[0]
          }
        : contact
    ));
    toast({
      title: "Success",
      description: "Role updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/portal")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button variant="ghost" size="icon">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            My Profile Page
          </h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0">
            <TabsTrigger 
              value="profile" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              My Profile
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
            Organization
            </TabsTrigger>
            <TabsTrigger 
              value="consent" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Consent and Settings
            </TabsTrigger>
            <TabsTrigger 
              value="attorneys" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Attorneys
            </TabsTrigger>
            <TabsTrigger 
              value="testing" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Testing Tab
            </TabsTrigger>
            <TabsTrigger 
              value="agency-test" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Agency Test
            </TabsTrigger>
            <TabsTrigger 
              value="test2" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Test2
            </TabsTrigger>
            <TabsTrigger 
              value="test1" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Test1
            </TabsTrigger>
            <TabsTrigger 
              value="organization2" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Organization2
            </TabsTrigger>
          </TabsList>

          {/* My Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="max-w-screen-xl mx-auto space-y-6">
              {/* Page content with help icon */}
              <div className="flex items-center justify-between mb-6">
                <div></div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={personalInfo.firstName}
                          onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="middleInitial" className="text-sm font-medium">Middle Initial</Label>
                        <Input
                          id="middleInitial"
                          value={personalInfo.middleInitial}
                          onChange={(e) => handlePersonalInfoChange("middleInitial", e.target.value)}
                          className="mt-1"
                          maxLength={1}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={personalInfo.lastName}
                          onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="salutation" className="text-sm font-medium">Salutation</Label>
                        <Select value={personalInfo.salutation} onValueChange={(value) => handlePersonalInfoChange("salutation", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select salutation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                            <SelectItem value="prof">Prof.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="suffix" className="text-sm font-medium">Suffix</Label>
                        <Select value={personalInfo.suffix} onValueChange={(value) => handlePersonalInfoChange("suffix", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select suffix" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jr">Jr.</SelectItem>
                            <SelectItem value="sr">Sr.</SelectItem>
                            <SelectItem value="ii">II</SelectItem>
                            <SelectItem value="iii">III</SelectItem>
                            <SelectItem value="iv">IV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="pronouns" className="text-sm font-medium">Pronouns</Label>
                        <Select value={personalInfo.pronouns} onValueChange={(value) => handlePersonalInfoChange("pronouns", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select pronouns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="he-him">He/Him</SelectItem>
                            <SelectItem value="she-her">She/Her</SelectItem>
                            <SelectItem value="they-them">They/Them</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="participationType" className="text-sm font-medium">Participation Type</Label>
                        <Select value={personalInfo.participationType} onValueChange={(value) => handlePersonalInfoChange("participationType", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select participation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petitioner">Petitioner</SelectItem>
                            <SelectItem value="respondent">Respondent</SelectItem>
                            <SelectItem value="department-representative">Department Representative</SelectItem>
                            <SelectItem value="attorney">Attorney</SelectItem>
                            <SelectItem value="interpreter">Interpreter</SelectItem>
                            <SelectItem value="witness">Witness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="preferredLanguage" className="text-sm font-medium">Preferred Language</Label>
                        <Select value={personalInfo.preferredLanguage} onValueChange={(value) => handlePersonalInfoChange("preferredLanguage", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="cantonese">Cantonese</SelectItem>
                            <SelectItem value="mandarin">Mandarin</SelectItem>
                            <SelectItem value="polish">Polish</SelectItem>
                            <SelectItem value="arabic">Arabic</SelectItem>
                            <SelectItem value="gujarati">Gujarati</SelectItem>
                            <SelectItem value="korean">Korean</SelectItem>
                            <SelectItem value="russian">Russian</SelectItem>
                            <SelectItem value="tagalog">Tagalog</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                            <SelectItem value="ukrainian">Ukrainian</SelectItem>
                            <SelectItem value="vietnamese">Vietnamese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Address Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address1" className="text-sm font-medium">
                        Address Line 1 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address1"
                        value={addressInfo.address1}
                        onChange={(e) => handleAddressInfoChange("address1", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address2" className="text-sm font-medium">Address Line 2</Label>
                      <Input
                        id="address2"
                        value={addressInfo.address2}
                        onChange={(e) => handleAddressInfoChange("address2", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={addressInfo.city}
                        onChange={(e) => handleAddressInfoChange("city", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium">
                        State / Province <span className="text-destructive">*</span>
                      </Label>
                      <Select value={addressInfo.state} onValueChange={(value) => handleAddressInfoChange("state", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state/province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="il">Illinois</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="postalCode" className="text-sm font-medium">
                        Postal Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        value={addressInfo.postalCode}
                        onChange={(e) => handleAddressInfoChange("postalCode", e.target.value)}
                        className="mt-1"
                        placeholder="12345"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country <span className="text-destructive">*</span>
                      </Label>
                      <Select value={addressInfo.country} onValueChange={(value) => handleAddressInfoChange("country", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information Card - Full width */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        className="mt-1 bg-muted"
                        disabled
                        required
                      />
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Info className="h-3 w-3 mr-1" />
                        This email is managed by OKTA and cannot be edited here.
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneHome" className="text-sm font-medium">Home Phone</Label>
                      <Input
                        id="phoneHome"
                        value={contactInfo.phoneHome}
                        onChange={(e) => handleContactInfoChange("phoneHome", formatPhone(e.target.value))}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneMobile" className="text-sm font-medium">Mobile Phone</Label>
                      <Input
                        id="phoneMobile"
                        value={contactInfo.phoneMobile}
                        onChange={(e) => handleContactInfoChange("phoneMobile", formatPhone(e.target.value))}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneBusiness" className="text-sm font-medium">Business Phone</Label>
                      <Input
                        id="phoneBusiness"
                        value={contactInfo.phoneBusiness}
                        onChange={(e) => handleContactInfoChange("phoneBusiness", formatPhone(e.target.value))}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneOther" className="text-sm font-medium">Other Phone</Label>
                      <Input
                        id="phoneOther"
                        value={contactInfo.phoneOther}
                        onChange={(e) => handleContactInfoChange("phoneOther", formatPhone(e.target.value))}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="preferredPhone" className="text-sm font-medium">Preferred Phone</Label>
                      <Select value={contactInfo.preferredPhone} onValueChange={(value) => handleContactInfoChange("preferredPhone", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred phone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sticky Action Bar */}
              <div className="sticky bottom-0 bg-background border-t border-border p-4 mt-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button variant="outline" onClick={handleCancel} className="sm:w-auto">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={!hasUnsavedChanges}
                    className="sm:w-auto"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="account" className="mt-6">
            <div className="max-w-screen-xl mx-auto space-y-6">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organization Information Card */}
                <Card className="shadow-sm border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-foreground">Organization Information</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Your organization's contact details.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="organizationName" className="text-sm font-medium text-foreground">
                        Organization Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="organizationName"
                        value="Department of Natural Resources"
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-foreground">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value="https://dnr.illinois.gov"
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessPhone" className="text-sm font-medium text-foreground">Business Phone</Label>
                        <Input
                          id="businessPhone"
                          value=""
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="fax" className="text-sm font-medium text-foreground">Fax</Label>
                        <Input
                          id="fax"
                          value=""
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="businessForm" className="text-sm font-medium text-foreground">Business Form</Label>
                      <Input
                        id="businessForm"
                        value="Government"
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information Card */}
                <Card className="shadow-sm border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-foreground">Address Information</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Your organization's primary mailing location.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine1" className="text-sm font-medium text-foreground">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        value="100 Gold St"
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="addressLine2" className="text-sm font-medium text-foreground">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value=""
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium text-foreground">City</Label>
                        <Input
                          id="city"
                          value="New York"
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="county" className="text-sm font-medium text-foreground">County</Label>
                        <Input
                          id="county"
                          value=""
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium text-foreground">State/Province</Label>
                        <Input
                          id="state"
                          value="NY"
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode" className="text-sm font-medium text-foreground">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value="10038"
                          className="mt-1 bg-muted"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-foreground">Country</Label>
                      <Input
                        id="country"
                        value="United States"
                        className="mt-1 bg-muted"
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Consent and Settings Tab */}
          <TabsContent value="consent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms and Consent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Terms of Service Section */}
                <div className="mb-4">
                  <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                      <span className="font-medium text-foreground">Terms of Service</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 border border-border rounded-md bg-white">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Privacy Policy Section */}
                <div className="mb-6">
                  <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                      <span className="font-medium text-foreground">Privacy Policy Summary</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${privacyOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 border border-border rounded-md bg-white">
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>We collect minimal personal information necessary for service provision</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Your data is encrypted and stored securely using industry standards</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>We do not share your information with third parties without consent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>You have the right to access, modify, or delete your data at any time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Cookies are used only for essential functionality and analytics</span>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms-consent"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms-consent" className="text-sm text-foreground leading-relaxed">
                      I agree to the{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-primary hover:text-primary-hover underline">
                            Terms of Service
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Terms of Service</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              Full terms of service would be displayed here in a real application.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {" "}and{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-primary hover:text-primary-hover underline">
                            Privacy Policy
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              Full privacy policy would be displayed here in a real application.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      . <span className="text-destructive">*</span>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={(checked) => setEmailNotifications(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="email-notifications" className="text-sm text-foreground leading-relaxed">
                      I agree to receive email notifications about account activity and important updates. 
                      You can unsubscribe at any time.
                    </Label>
                  </div>
                </div>

                {/* Communication Consent Preferences */}
                <div className="space-y-6 border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground">Communication Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Communications */}
                    <div className="space-y-2">
                      <Label htmlFor="email-communications" className="text-sm font-medium">
                        Email Communications
                      </Label>
                      <Select value={emailCommunicationsConsent} onValueChange={setEmailCommunicationsConsent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="do-not-allow">Do Not Allow</SelectItem>
                          <SelectItem value="ask-each-time">Ask Each Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Receive case updates, notices, and administrative communications via email.
                      </p>
                    </div>

                    {/* Postal Mail Services */}
                    <div className="space-y-2">
                      <Label htmlFor="postal-mail" className="text-sm font-medium">
                        Postal Mail Services
                      </Label>
                      <Select value={postalMailConsent} onValueChange={setPostalMailConsent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="do-not-allow">Do Not Allow</SelectItem>
                          <SelectItem value="ask-each-time">Ask Each Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Receive official documents and notices via postal mail.
                      </p>
                    </div>

                    {/* SMS/Text Notifications */}
                    <div className="space-y-2">
                      <Label htmlFor="sms-notifications" className="text-sm font-medium">
                        SMS/Text Notifications
                      </Label>
                      <Select value={smsNotificationsConsent} onValueChange={setSmsNotificationsConsent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="do-not-allow">Do Not Allow</SelectItem>
                          <SelectItem value="ask-each-time">Ask Each Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Receive urgent notifications and reminders via text message.
                      </p>
                    </div>

                    {/* Phone Calls */}
                    <div className="space-y-2">
                      <Label htmlFor="phone-calls" className="text-sm font-medium">
                        Phone Calls
                      </Label>
                      <Select value={phoneCallsConsent} onValueChange={setPhoneCallsConsent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="do-not-allow">Do Not Allow</SelectItem>
                          <SelectItem value="ask-each-time">Ask Each Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Receive phone calls for urgent matters and scheduling.
                      </p>
                    </div>

                    {/* Marketing Communications */}
                    <div className="space-y-2">
                      <Label htmlFor="marketing-communications" className="text-sm font-medium">
                        Marketing Communications
                      </Label>
                      <Select value={marketingCommunicationsConsent} onValueChange={setMarketingCommunicationsConsent}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="do-not-allow">Do Not Allow</SelectItem>
                          <SelectItem value="ask-each-time">Ask Each Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Receive information about new services and updates.
                      </p>
                    </div>
                  </div>
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <Button
                    disabled={!termsAccepted}
                    className="w-full h-10"
                  >
                    Update Consent Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attorneys Tab */}
          <TabsContent value="attorneys" className="mt-6">
            <div className="max-w-screen-xl mx-auto space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">Attorney Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Access the attorney dashboard to view and manage accepted cases.
                  </p>
                  <Button onClick={() => navigate("/attorney/dashboard")}>
                    Go to Attorney Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>



          {/* Testing Tab - Dynamics 365 Single Page Style */}
          <TabsContent value="testing" className="mt-0 p-0">
            <Dynamics365SinglePageDashboard />
          </TabsContent>

          {/* Agency Test Tab - Agency Test Screen */}
          <TabsContent value="agency-test" className="mt-0 p-0">
            <AgencyTestScreen />
          </TabsContent>

          {/* Test2 Tab - Power Pages Style Agency Management */}
          <TabsContent value="test2" className="mt-0 p-0">
            <AgencyTest2Screen />
          </TabsContent>

          {/* Test1 Tab - Copy of Agency Test Screen */}
          <TabsContent value="test1" className="mt-0 p-0">
            <AgencyTest1Screen />
          </TabsContent>

          {/* Organization2 Tab - Merged with Test1 CRM Hierarchy */}
          <TabsContent value="organization2" className="mt-0 p-0">
            <AgencyTest1Screen />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;