import { useState } from "react";
import { Search, Building2, User, Phone, Globe, Mail, MapPin, Edit2, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const mockOrganizations = [
  { id: 1, name: "Aarens, Harrell and Van Kann", city: "Chicago", state: "IL", phone: "(773) 515-5157", website: "www.hase.info" },
  { id: 2, name: "Abatangelo Inc and Sons", city: "Peoria", state: "IL", phone: "(312) 544-5447", website: "www.orosz.com" },
];

const mockContacts = [
  { id: 1, name: "Abbey Higgins", email: "abbey.higgins@royce.com", phone: "(480) 796-707", organization: "Royce Partners" },
  { id: 2, name: "Aaron Mitchell", email: "aaron.m@example.com", phone: "(555) 123-4567", organization: "Mitchell & Associates" },
];

export const PrimaryPartyTest3Tab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [represented, setRepresented] = useState("no");
  
  const [orgForm, setOrgForm] = useState({
    name: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const filteredOrgs = mockOrganizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredOrgs.length > 0 || filteredContacts.length > 0;

  const handleSelectOrg = (org: any) => {
    setSelectedParty({ ...org, type: "organization" });
    setSearchQuery(org.name);
    setShowDropdown(false);
    setCurrentStep(3);
  };

  const handleSelectContact = (contact: any) => {
    setSelectedParty({ ...contact, type: "contact" });
    setSearchQuery(contact.name);
    setShowDropdown(false);
    setRepresented("yes");
    setCurrentStep(3);
  };

  const handleCreateOrgClick = () => {
    setIsCreatingOrg(true);
    setIsCreatingContact(false);
    setCurrentStep(2);
    setShowDropdown(false);
  };

  const handleCreateContactClick = () => {
    setIsCreatingContact(true);
    setIsCreatingOrg(false);
    setCurrentStep(2);
    setShowDropdown(false);
  };

  const handleSaveNew = () => {
    if (isCreatingOrg) {
      setSelectedParty({
        ...orgForm,
        type: "organization",
        contact: addContact ? contactForm : null,
      });
    } else {
      setSelectedParty({
        ...contactForm,
        name: `${contactForm.firstName} ${contactForm.lastName}`,
        type: "contact",
      });
      setRepresented("yes");
    }
    setCurrentStep(3);
  };

  const handleEdit = (section: string) => {
    setCurrentStep(2);
  };

  const steps = [
    { number: 1, label: "Search", completed: currentStep > 1 },
    { number: 2, label: "Details", completed: currentStep > 2 },
    { number: 3, label: "Review", completed: currentStep > 3 },
    { number: 4, label: "Confirmation", completed: currentStep > 4 },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Primary Party</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of 4
          </span>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step.completed
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.number
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.completed ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors hidden sm:block",
                    currentStep === step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors",
                    step.completed ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {/* Step 1: Search */}
        {currentStep === 1 && (
          <Card className="p-8 animate-fade-in" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-xl font-semibold mb-2">Let's find or create your Primary Party</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Search for an existing organization or contact, or create a new one.
            </p>

            <div className="relative">
              <Label className="mb-2 block">Search Organization or Contact name</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
                  placeholder="Type a name (e.g., Aarens, Harrell and Van Kann)"
                  className="pl-10"
                />
              </div>

              {/* Smart Dropdown */}
              {showDropdown && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-scale-in">
                  {hasResults ? (
                    <>
                      {filteredOrgs.length > 0 && (
                        <div>
                          <div className="px-4 py-2 bg-muted/50 text-xs font-medium text-muted-foreground flex items-center gap-2">
                            <Building2 className="h-3 w-3" />
                            Organizations
                          </div>
                          {filteredOrgs.map((org) => (
                            <button
                              key={org.id}
                              onClick={() => handleSelectOrg(org)}
                              className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors flex items-center justify-between group"
                            >
                              <div>
                                <div className="font-medium text-sm flex items-center gap-2">
                                  {org.name}
                                  <Badge variant="secondary" className="text-xs">Org</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {org.city}, {org.state} • {org.phone}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>
                          ))}
                        </div>
                      )}

                      {filteredContacts.length > 0 && (
                        <div>
                          <div className="px-4 py-2 bg-muted/50 text-xs font-medium text-muted-foreground flex items-center gap-2 border-t border-border">
                            <User className="h-3 w-3" />
                            Contacts
                          </div>
                          {filteredContacts.map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => handleSelectContact(contact)}
                              className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors flex items-center justify-between group"
                            >
                              <div>
                                <div className="font-medium text-sm flex items-center gap-2">
                                  {contact.name}
                                  <Badge variant="secondary" className="text-xs">Contact</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {contact.email} • {contact.organization}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-6" style={{ backgroundColor: "#F3F4F6" }}>
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        No match found. Would you like to create new?
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={handleCreateOrgClick}
                          className="w-full"
                          style={{ backgroundColor: "#0B5FFF" }}
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          Create New Organization
                        </Button>
                        <Button
                          onClick={handleCreateContactClick}
                          variant="outline"
                          className="w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Create New Contact
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 2: Create New */}
        {currentStep === 2 && (
          <Card className="p-8 animate-fade-in" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-xl font-semibold mb-2">
              {isCreatingOrg ? "Create New Organization" : "Create New Contact"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in the details below to create a new {isCreatingOrg ? "organization" : "contact"}.
            </p>

            {isCreatingOrg ? (
              <div className="space-y-4">
                <div>
                  <Label>Organization Name *</Label>
                  <Input
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Website</Label>
                    <Input
                      value={orgForm.website}
                      onChange={(e) => setOrgForm({ ...orgForm, website: e.target.value })}
                      placeholder="www.example.com"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={orgForm.phone}
                      onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    value={orgForm.address}
                    onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input
                      value={orgForm.city}
                      onChange={(e) => setOrgForm({ ...orgForm, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input
                      value={orgForm.state}
                      onChange={(e) => setOrgForm({ ...orgForm, state: e.target.value })}
                      placeholder="IL"
                    />
                  </div>
                  <div>
                    <Label>Zip</Label>
                    <Input
                      value={orgForm.zip}
                      onChange={(e) => setOrgForm({ ...orgForm, zip: e.target.value })}
                      placeholder="12345"
                    />
                  </div>
                </div>

                {/* Add Contact Toggle */}
                <div className="border-t border-border pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-base">Add Primary Contact?</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Include a primary contact person for this organization
                      </p>
                    </div>
                    <Switch checked={addContact} onCheckedChange={setAddContact} />
                  </div>

                  {addContact && (
                    <div className="space-y-4 animate-accordion-down">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={contactForm.firstName}
                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Email *</Label>
                          <Input
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name *</Label>
                    <Input
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button onClick={handleSaveNew} style={{ backgroundColor: "#0B5FFF" }}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && selectedParty && (
          <Card className="p-8 animate-fade-in" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-xl font-semibold mb-2">Review Information</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Please review the primary party information below.
            </p>

            <div className="space-y-4">
              {/* Organization/Contact Info */}
              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {selectedParty.type === "organization" ? (
                        <Building2 className="h-5 w-5 text-primary" />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedParty.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {selectedParty.type === "organization" ? "Organization" : "Contact"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit("main")}
                    className="hover-scale"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {selectedParty.type === "organization" ? (
                    <>
                      {selectedParty.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {selectedParty.phone}
                        </div>
                      )}
                      {selectedParty.website && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {selectedParty.website}
                        </div>
                      )}
                      {selectedParty.address && (
                        <div className="flex items-start gap-2 text-muted-foreground col-span-2">
                          <MapPin className="h-3 w-3 mt-0.5" />
                          <span>
                            {selectedParty.address}
                            {selectedParty.city && `, ${selectedParty.city}`}
                            {selectedParty.state && `, ${selectedParty.state}`}
                            {selectedParty.zip && ` ${selectedParty.zip}`}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedParty.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {selectedParty.email}
                        </div>
                      )}
                      {selectedParty.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {selectedParty.phone}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Contact Info (if added with org) */}
              {selectedParty.contact && (
                <div className="p-4 rounded-lg border border-border bg-muted/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {selectedParty.contact.firstName} {selectedParty.contact.lastName}
                        </h3>
                        <Badge variant="secondary" className="text-xs mt-1">Primary Contact</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit("contact")}
                      className="hover-scale"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {selectedParty.contact.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {selectedParty.contact.email}
                      </div>
                    )}
                    {selectedParty.contact.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {selectedParty.contact.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Start Over
              </Button>
              <Button onClick={() => setCurrentStep(4)} style={{ backgroundColor: "#0B5FFF" }}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card className="p-8 animate-fade-in" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-xl font-semibold mb-2">Representation Confirmation</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Please confirm whether the primary party is represented.
            </p>

            <div className="p-6 rounded-lg" style={{ backgroundColor: "#F3F4F6" }}>
              <Label className="text-base mb-4 block">Is the primary party represented?</Label>
              <RadioGroup value={represented} onValueChange={setRepresented}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="yes" id="yes-rep" />
                    <Label htmlFor="yes-rep" className="cursor-pointer flex-1">
                      <div className="font-medium">Yes</div>
                      <div className="text-xs text-muted-foreground">The party has legal representation</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="no" id="no-rep" />
                    <Label htmlFor="no-rep" className="cursor-pointer flex-1">
                      <div className="font-medium">No</div>
                      <div className="text-xs text-muted-foreground">The party is self-represented</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {selectedParty?.type === "contact" && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    ℹ️ Since a contact was selected, "Yes" is automatically recommended.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Back
              </Button>
              <Button style={{ backgroundColor: "#0B5FFF" }}>
                Complete & Continue
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
