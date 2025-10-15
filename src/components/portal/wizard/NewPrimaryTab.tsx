import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Search, Plus, Building2, User, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Organization {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  website: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  city: string;
  state: string;
}

const mockOrganizations: Organization[] = [
  { id: "1", name: "Aarens, Harrell and Van Kann", city: "Chicago", state: "IL", phone: "(773) 515-5157", website: "www.hase.info" },
  { id: "2", name: "Tech Solutions Inc", city: "San Francisco", state: "CA", phone: "(415) 555-0123", website: "www.techsolutions.com" },
  { id: "3", name: "Global Enterprises LLC", city: "New York", state: "NY", phone: "(212) 555-0456", website: "www.globalent.com" },
];

const mockContacts: Contact[] = [
  { id: "1", name: "John Doe", email: "john.doe@email.com", phone: "(312) 555-0100", organization: "Aarens, Harrell and Van Kann", city: "Chicago", state: "IL" },
  { id: "2", name: "Jane Smith", email: "jane.smith@email.com", phone: "(415) 555-0200", organization: "Tech Solutions Inc", city: "San Francisco", state: "CA" },
  { id: "3", name: "Robert Johnson", email: "robert.j@email.com", phone: "(212) 555-0300", organization: "Global Enterprises LLC", city: "New York", state: "NY" },
];

export const NewPrimaryTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState<Organization | Contact | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Form states
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgPhone, setOrgPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("USA");
  const [contactSearch, setContactSearch] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const filteredOrganizations = useMemo(() => {
    return mockOrganizations.filter(org =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSaveOrganization = () => {
    // Simulate saving organization
    const newOrg: Organization = {
      id: Date.now().toString(),
      name: orgName,
      city: city,
      state: state,
      phone: orgPhone,
      website: orgWebsite,
    };
    
    setSelectedParty(newOrg);
    setDrawerOpen(false);
    
    toast({
      title: "Success",
      description: "Organization created successfully and set as Primary Party.",
    });

    // Reset form
    setOrgName("");
    setOrgWebsite("");
    setOrgPhone("");
    setAddress1("");
    setCity("");
    setState("");
    setZip("");
    setContactSearch("");
    setShowContactForm(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactPhone("");
  };

  const handleSelectOrganization = (org: Organization) => {
    setSelectedParty(org);
    toast({
      title: "Primary Party Selected",
      description: `${org.name} has been set as the Primary Party.`,
    });
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedParty(contact);
    toast({
      title: "Primary Party Selected",
      description: `${contact.name} has been set as the Primary Party.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Primary Party
          </CardTitle>
          <CardDescription>
            Select or Create a Primary Party
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Organizations and Contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button className="bg-[#0B5FFF] hover:bg-[#0B5FFF]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <DrawerHeader>
                  <DrawerTitle>Create New Organization</DrawerTitle>
                  <DrawerDescription>
                    Add organization details and primary contact information
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="overflow-y-auto px-4 pb-4">
                  <div className="space-y-6 max-w-2xl mx-auto">
                    {/* Organization Details */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-foreground">Organization Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="orgName">Organization Name *</Label>
                          <Input
                            id="orgName"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="Enter organization name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={orgWebsite}
                            onChange={(e) => setOrgWebsite(e.target.value)}
                            placeholder="www.example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="orgPhone">Phone</Label>
                          <Input
                            id="orgPhone"
                            value={orgPhone}
                            onChange={(e) => setOrgPhone(e.target.value)}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-sm font-semibold text-foreground">Address Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address1">Address Line 1</Label>
                          <Input
                            id="address1"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            placeholder="Street address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input
                            id="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="12345"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="USA"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Primary Contact */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">Primary Contact</h3>
                        {!showContactForm && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowContactForm(true)}
                            className="text-[#0B5FFF] hover:text-[#0B5FFF]/90"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Create New Contact
                          </Button>
                        )}
                      </div>
                      
                      {!showContactForm ? (
                        <div>
                          <Label htmlFor="contactSearch">Search Contact</Label>
                          <Input
                            id="contactSearch"
                            value={contactSearch}
                            onChange={(e) => setContactSearch(e.target.value)}
                            placeholder="Search for existing contact..."
                          />
                        </div>
                      ) : (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactPhone">Phone</Label>
                              <Input
                                id="contactPhone"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                placeholder="(123) 456-7890"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowContactForm(false)}
                            className="text-muted-foreground"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <DrawerFooter className="border-t">
                  <div className="flex gap-3 max-w-2xl mx-auto w-full">
                    <DrawerClose asChild>
                      <Button variant="outline" className="flex-1">Cancel</Button>
                    </DrawerClose>
                    <Button 
                      onClick={handleSaveOrganization}
                      disabled={!orgName}
                      className="flex-1 bg-[#0B5FFF] hover:bg-[#0B5FFF]/90"
                    >
                      Save Organization
                    </Button>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Tabs with Tables */}
          <Tabs defaultValue="organizations" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organizations" className="mt-4">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganizations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No organizations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrganizations.map((org) => (
                        <TableRow key={org.id}>
                          <TableCell className="font-medium">{org.name}</TableCell>
                          <TableCell>{org.city}</TableCell>
                          <TableCell>{org.state}</TableCell>
                          <TableCell>{org.phone}</TableCell>
                          <TableCell>{org.website}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSelectOrganization(org)}
                              className="text-[#0B5FFF] hover:text-[#0B5FFF]/90"
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-4">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          No contacts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.organization}</TableCell>
                          <TableCell>{contact.city}</TableCell>
                          <TableCell>{contact.state}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSelectContact(contact)}
                              className="text-[#0B5FFF] hover:text-[#0B5FFF]/90"
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {/* Selected Primary Party Confirmation */}
          {selectedParty && (
            <div className="p-4 bg-muted/30 rounded-lg border-2 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Selected Primary Party</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {selectedParty.name}
                    </p>
                    {"email" in selectedParty ? (
                      <>
                        <p className="text-muted-foreground">{selectedParty.email}</p>
                        <p className="text-muted-foreground">{selectedParty.phone}</p>
                        <p className="text-muted-foreground">{selectedParty.organization}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-muted-foreground">{selectedParty.phone}</p>
                        <p className="text-muted-foreground">{selectedParty.website}</p>
                        <p className="text-muted-foreground">{selectedParty.city}, {selectedParty.state}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-[#0B5FFF] hover:bg-[#0B5FFF]/90">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
