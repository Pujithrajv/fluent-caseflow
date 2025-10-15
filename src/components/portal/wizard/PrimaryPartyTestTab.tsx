import { useState } from "react";
import { Search, Building2, User, Phone, Globe, CheckCircle2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockOrganizations = [
  { id: 1, name: "Aarens, Harrell and Van Kann", city: "Chicago", state: "IL", phone: "(773) 515-5157", website: "www.hase.info" },
  { id: 2, name: "Abatangelo Inc and Sons", city: "Peoria", state: "IL", phone: "(312) 544-5447", website: "www.orosz.com" },
];

const mockContacts = [
  { id: 1, name: "Abbey Higgins", email: "abbey.higgins@royce.com", phone: "(480) 796-707", organization: "Royce Partners" },
  { id: 2, name: "Aaron Mitchell", email: "aaron.m@example.com", phone: "(555) 123-4567", organization: "Mitchell & Associates" },
];

const steps = [
  { label: "Request", active: false },
  { label: "Parties", active: true },
  { label: "Documents", active: false },
  { label: "Review & Submit", active: false },
];

export const PrimaryPartyTestTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [represented, setRepresented] = useState("no");
  
  const [orgForm, setOrgForm] = useState({
    name: "",
    website: "",
    phone: "",
    fax: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
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
    setShowCreateOrg(false);
  };

  const handleSelectContact = (contact: any) => {
    setSelectedParty({ ...contact, type: "contact" });
    setSearchQuery(contact.name);
    setShowDropdown(false);
    setShowCreateOrg(false);
    setRepresented("yes");
  };

  const handleSaveOrganization = () => {
    const newOrg = {
      name: orgForm.name,
      city: orgForm.city,
      state: orgForm.state,
      phone: orgForm.phone,
      website: orgForm.website,
      type: "organization",
    };
    setSelectedParty(newOrg);
    setSearchQuery(orgForm.name);
    setShowCreateOrg(false);
    setShowDropdown(false);
  };

  return (
    <div className="flex gap-8">
      {/* Left Stepper */}
      <div className="w-64 flex-shrink-0">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  step.active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 max-w-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Primary Party</h2>
          <p className="text-sm text-muted-foreground">
            Search and link an existing organization or create a new one.
          </p>
        </div>

        <Card className="p-6 rounded-[20px] shadow-sm">
          {/* Search Field */}
          <div className="mb-6 relative">
            <Label className="mb-2 block text-sm font-medium">
              Search Organization or Contact Name
            </Label>
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
              <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
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
                            className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors"
                          >
                            <div className="font-medium text-sm">{org.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {org.city}, {org.state} • {org.phone}
                            </div>
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
                            className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors"
                          >
                            <div className="font-medium text-sm">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {contact.email} • {contact.organization}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      No existing records found. Would you like to create a new one?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setShowCreateOrg(true);
                          setShowDropdown(false);
                        }}
                        className="rounded-full"
                      >
                        Create New Organization
                      </Button>
                      <Button variant="secondary" className="rounded-full">
                        Create New Contact
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Create New Organization Form (Inline Expandable) */}
          {showCreateOrg && (
            <Card className="p-6 mb-6 bg-muted/30 border-2 border-primary/20 rounded-[20px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create New Organization</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateOrg(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2">
                  <Label>Organization Name *</Label>
                  <Input
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    value={orgForm.website}
                    onChange={(e) => setOrgForm({ ...orgForm, website: e.target.value })}
                    placeholder="www.example.com"
                  />
                </div>
                <div>
                  <Label>Business Phone</Label>
                  <Input
                    value={orgForm.phone}
                    onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label>Fax</Label>
                  <Input
                    value={orgForm.fax}
                    onChange={(e) => setOrgForm({ ...orgForm, fax: e.target.value })}
                    placeholder="(555) 123-4568"
                  />
                </div>
                <div>
                  <Label>Address Line 1</Label>
                  <Input
                    value={orgForm.address1}
                    onChange={(e) => setOrgForm({ ...orgForm, address1: e.target.value })}
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <Label>Address Line 2</Label>
                  <Input
                    value={orgForm.address2}
                    onChange={(e) => setOrgForm({ ...orgForm, address2: e.target.value })}
                    placeholder="Suite, unit, etc."
                  />
                </div>
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
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <Input
                    value={orgForm.zip}
                    onChange={(e) => setOrgForm({ ...orgForm, zip: e.target.value })}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={orgForm.country}
                    onChange={(e) => setOrgForm({ ...orgForm, country: e.target.value })}
                  />
                </div>
              </div>

              {/* Add Primary Contact Section */}
              <div className="border-t border-border pt-4 mb-4">
                {!showAddContact ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowAddContact(true)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Primary Contact
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Primary Contact</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAddContact(false)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input
                          value={contactForm.firstName}
                          onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          value={contactForm.lastName}
                          onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                          placeholder="Last name"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label>Mobile Phone</Label>
                        <Input
                          value={contactForm.mobile}
                          onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveOrganization} className="rounded-full">
                  Save Organization
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateOrg(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Success Banner & Confirmation */}
          {selectedParty && (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  {selectedParty.type === "organization" ? "Organization" : "Contact"} linked successfully
                </span>
              </div>

              <Card className="p-6 bg-primary/5 border-primary/20 rounded-[20px]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    {selectedParty.type === "organization" ? (
                      <Building2 className="h-6 w-6 text-primary" />
                    ) : (
                      <User className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Primary Party: {selectedParty.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {selectedParty.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {selectedParty.phone}
                        </div>
                      )}
                      {selectedParty.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {selectedParty.website}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="mb-3 block text-sm font-medium">Represented?</Label>
                  <RadioGroup value={represented} onValueChange={setRepresented}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="cursor-pointer">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </Card>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="secondary" className="rounded-full">
            Previous
          </Button>
          <Button className="rounded-full" disabled={!selectedParty}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
