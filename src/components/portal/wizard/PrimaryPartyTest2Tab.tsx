import { useState } from "react";
import { Search, Building2, User, Phone, Globe, Mail, MapPin, ArrowLeft, Edit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const mockOrganizations = [
  { 
    id: 1, 
    name: "Aarens, Harrell and Van Kann", 
    city: "Chicago", 
    state: "IL", 
    phone: "(773) 515-5157", 
    website: "www.hase.info",
    address: "123 Michigan Ave, Suite 400",
    zip: "60601"
  },
  { 
    id: 2, 
    name: "Abatangelo Inc and Sons", 
    city: "Peoria", 
    state: "IL", 
    phone: "(312) 544-5447", 
    website: "www.orosz.com",
    address: "456 Main Street",
    zip: "61602"
  },
  { 
    id: 3, 
    name: "Springfield Law Associates", 
    city: "Springfield", 
    state: "IL", 
    phone: "(217) 555-0123", 
    website: "www.springfieldlaw.com",
    address: "789 Capitol Ave",
    zip: "62701"
  },
];

const mockContacts = [
  { 
    id: 1, 
    name: "Abbey Higgins", 
    email: "abbey.higgins@royce.com", 
    phone: "(480) 796-7077", 
    organization: "Royce Partners",
    city: "Phoenix",
    state: "AZ"
  },
  { 
    id: 2, 
    name: "Aaron Mitchell", 
    email: "aaron.m@example.com", 
    phone: "(555) 123-4567", 
    organization: "Mitchell & Associates",
    city: "Chicago",
    state: "IL"
  },
  { 
    id: 3, 
    name: "Sarah Johnson", 
    email: "sarah.j@legal.com", 
    phone: "(312) 555-9876", 
    organization: "Johnson Legal Group",
    city: "Chicago",
    state: "IL"
  },
];

export const PrimaryPartyTest2Tab = () => {
  const [activeTab, setActiveTab] = useState<"organizations" | "contacts">("organizations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  
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
    organization: "",
  });

  const filteredOrgs = mockOrganizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecord = (record: any) => {
    setSelectedRecord({ ...record, type: activeTab === "organizations" ? "organization" : "contact" });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedRecord(null);
  };

  const handleSave = () => {
    if (activeTab === "organizations") {
      const newOrg = { ...orgForm, id: Date.now(), type: "organization" };
      setSelectedRecord(newOrg);
    } else {
      const newContact = { 
        ...contactForm, 
        name: `${contactForm.firstName} ${contactForm.lastName}`,
        id: Date.now(), 
        type: "contact" 
      };
      setSelectedRecord(newContact);
    }
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setOrgForm({ name: "", website: "", phone: "", address: "", city: "", state: "", zip: "" });
    setContactForm({ firstName: "", lastName: "", email: "", phone: "", organization: "" });
  };

  const currentList = activeTab === "organizations" ? filteredOrgs : filteredContacts;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Primary Party Selection</h1>
          <p className="text-sm text-muted-foreground">Search and select or create a new organization or contact</p>
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Panel - 40% */}
        <div className="col-span-2 space-y-4">
          <Card className="p-4">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "organizations" | "contacts")} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="organizations" className="rounded-full">
                  <Building2 className="h-4 w-4 mr-2" />
                  Organizations
                </TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  Contacts
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === "organizations" ? "Organization" : "Contact"} name...`}
                className="pl-10"
              />
            </div>

            {/* Create New Button */}
            <Button 
              onClick={handleCreateNew}
              variant="outline" 
              className="w-full mb-4"
            >
              + Create New {activeTab === "organizations" ? "Organization" : "Contact"}
            </Button>

            {/* Results List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {currentList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No results found
                </div>
              ) : (
                currentList.map((record) => (
                  <Card
                    key={record.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
                      selectedRecord?.id === record.id && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleSelectRecord(record)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm truncate">{record.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {activeTab === "organizations" ? "Org" : "Contact"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {activeTab === "organizations" 
                            ? `${record.city}, ${record.state} • ${record.phone}`
                            : `${record.email} • ${record.organization}`
                          }
                        </p>
                      </div>
                      {selectedRecord?.id === record.id && (
                        <Button size="sm" className="ml-2 rounded-full" style={{ backgroundColor: "#0B5FFF" }}>
                          Selected
                        </Button>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Panel - 60% */}
        <div className="col-span-3">
          <Card className="p-6 min-h-[600px]">
            {!selectedRecord && !isCreating ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="bg-muted/50 p-6 rounded-full mb-4">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Record Selected</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Select a record from the left panel to view details or click "Create New" to add a new {activeTab === "organizations" ? "organization" : "contact"}.
                </p>
              </div>
            ) : isCreating ? (
              // Creation Form
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Create New {activeTab === "organizations" ? "Organization" : "Contact"}
                </h2>
                
                {activeTab === "organizations" ? (
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
                        <Label>Zip Code</Label>
                        <Input
                          value={orgForm.zip}
                          onChange={(e) => setOrgForm({ ...orgForm, zip: e.target.value })}
                          placeholder="12345"
                        />
                      </div>
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
                        type="email"
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
                    <div>
                      <Label>Organization (lookup)</Label>
                      <Input
                        value={contactForm.organization}
                        onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                        placeholder="Search organization..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                  <Button 
                    onClick={handleSave}
                    className="rounded-full"
                    style={{ backgroundColor: "#0B5FFF" }}
                  >
                    Save
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // Details View
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      {selectedRecord.type === "organization" ? (
                        <Building2 className="h-8 w-8 text-primary" />
                      ) : (
                        <User className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold mb-1">{selectedRecord.name}</h2>
                      <Badge className="text-xs">
                        {selectedRecord.type === "organization" ? "Organization" : "Contact"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Edit className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-6">
                  {selectedRecord.type === "organization" ? (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground uppercase">Phone</Label>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {selectedRecord.phone}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground uppercase">Website</Label>
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            {selectedRecord.website}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Address</Label>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <div>{selectedRecord.address}</div>
                            <div>{selectedRecord.city}, {selectedRecord.state} {selectedRecord.zip}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground uppercase">Email</Label>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {selectedRecord.email}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground uppercase">Phone</Label>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {selectedRecord.phone}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Organization</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {selectedRecord.organization}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Location</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedRecord.city}, {selectedRecord.state}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    className="w-full rounded-full"
                    style={{ backgroundColor: "#0B5FFF" }}
                  >
                    Select as Primary Party
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
