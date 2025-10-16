import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Building2, User, CheckCircle2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface Account {
  id: string;
  name: string;
  website: string;
  phone: string;
  city: string;
  state: string;
  country: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  accountName: string;
  city: string;
  state: string;
}

const mockAccounts: Account[] = [
  { id: "1", name: "Aarens, Harrell and Van Kann", website: "www.hase.info", phone: "(773) 515-5157", city: "Chicago", state: "IL", country: "USA" },
  { id: "2", name: "Tech Solutions Inc", website: "www.techsolutions.com", phone: "(415) 555-0123", city: "San Francisco", state: "CA", country: "USA" },
  { id: "3", name: "Global Enterprises LLC", website: "www.globalent.com", phone: "(212) 555-0456", city: "New York", state: "NY", country: "USA" },
];

const mockContacts: Contact[] = [
  { id: "1", firstName: "John", lastName: "Doe", fullName: "John Doe", email: "john.doe@email.com", phone: "(312) 555-0100", accountName: "Aarens, Harrell and Van Kann", city: "Chicago", state: "IL" },
  { id: "2", firstName: "Jane", lastName: "Smith", fullName: "Jane Smith", email: "jane.smith@email.com", phone: "(415) 555-0200", accountName: "Tech Solutions Inc", city: "San Francisco", state: "CA" },
  { id: "3", firstName: "Robert", lastName: "Johnson", fullName: "Robert Johnson", email: "robert.j@email.com", phone: "(212) 555-0300", accountName: "Global Enterprises LLC", city: "New York", state: "NY" },
];

export const PrimaryFinalTab = () => {
  const { toast } = useToast();
  const [lookupOpen, setLookupOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [createContactOpen, setCreateContactOpen] = useState(false);
  const [lookupSearch, setLookupSearch] = useState("");
  const [lookupView, setLookupView] = useState<"account" | "contact">("account");
  const [selectedParty, setSelectedParty] = useState<Account | Contact | null>(null);
  const [represented, setRepresented] = useState<string>("");

  // Account form states
  const [accountName, setAccountName] = useState("");
  const [website, setWebsite] = useState("");
  const [mainPhone, setMainPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("USA");
  const [primaryContactSearch, setPrimaryContactSearch] = useState("");
  const [selectedPrimaryContact, setSelectedPrimaryContact] = useState<Contact | null>(null);

  // Contact form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");

  const filteredAccounts = useMemo(() => {
    return mockAccounts.filter(acc =>
      acc.name.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      acc.city.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      acc.state.toLowerCase().includes(lookupSearch.toLowerCase())
    );
  }, [lookupSearch]);

  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact =>
      contact.fullName.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      contact.email.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      contact.accountName.toLowerCase().includes(lookupSearch.toLowerCase())
    );
  }, [lookupSearch]);

  const filteredPrimaryContacts = useMemo(() => {
    return mockContacts.filter(contact =>
      contact.fullName.toLowerCase().includes(primaryContactSearch.toLowerCase()) ||
      contact.email.toLowerCase().includes(primaryContactSearch.toLowerCase())
    );
  }, [primaryContactSearch]);

  const handleSelectAccount = (account: Account) => {
    setSelectedParty(account);
    setLookupOpen(false);
    toast({
      title: "Primary Party Selected",
      description: `${account.name} has been set as the Primary Party.`,
    });
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedParty(contact);
    setLookupOpen(false);
    toast({
      title: "Primary Party Selected",
      description: `${contact.fullName} has been set as the Primary Party.`,
    });
  };

  const handleSaveAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      name: accountName,
      website: website,
      phone: mainPhone,
      city: city,
      state: state,
      country: country,
    };
    
    setSelectedParty(newAccount);
    setCreateAccountOpen(false);
    setLookupOpen(false);
    
    toast({
      title: "Success",
      description: "✅ Record successfully created and linked as Primary Party.",
    });

    // Reset form
    setAccountName("");
    setWebsite("");
    setMainPhone("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setZip("");
    setCountry("USA");
    setPrimaryContactSearch("");
    setSelectedPrimaryContact(null);
  };

  const handleSaveContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      email: email,
      phone: businessPhone,
      accountName: accountName || "",
      city: "",
      state: "",
    };
    
    if (createAccountOpen) {
      // If creating from account form, set as primary contact
      setSelectedPrimaryContact(newContact);
      setCreateContactOpen(false);
      toast({
        title: "Contact Created",
        description: `${newContact.fullName} has been created and set as Primary Contact.`,
      });
    } else {
      // If creating standalone, set as primary party
      setSelectedParty(newContact);
      setCreateContactOpen(false);
      setLookupOpen(false);
      toast({
        title: "Success",
        description: "✅ Record successfully created and linked as Primary Party.",
      });
    }

    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setBusinessPhone("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="bg-[#F3F2F1] border-b">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="h-5 w-5" style={{ color: "#0B5FFF" }} />
            Primary Party
          </CardTitle>
          <CardDescription>
            Select or create the organization or individual for this case.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Party Name Lookup */}
          <div className="space-y-2">
            <Label htmlFor="partyName" className="text-sm font-semibold text-foreground">
              Party Name *
            </Label>
            <p className="text-xs text-muted-foreground mb-2">
              Search by name, city, or email
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="partyName"
                value={selectedParty ? ("fullName" in selectedParty ? selectedParty.fullName : selectedParty.name) : ""}
                onClick={() => setLookupOpen(true)}
                readOnly
                placeholder="Click to search..."
                className="pl-9 cursor-pointer bg-background"
              />
            </div>
          </div>

          {/* Represented Radio Buttons */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">
              Represented? *
            </Label>
            <RadioGroup value={represented} onValueChange={setRepresented}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Selected Party Confirmation */}
          {selectedParty && (
            <div className="p-4 rounded-lg border-2 bg-muted/30" style={{ borderColor: "#0B5FFF20" }}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5" style={{ color: "#0B5FFF" }} />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Selected Primary Party</h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {"fullName" in selectedParty ? selectedParty.fullName : selectedParty.name}
                    </p>
                    {"email" in selectedParty ? (
                      <>
                        <p className="text-muted-foreground">{selectedParty.email}</p>
                        <p className="text-muted-foreground">{selectedParty.phone}</p>
                        <p className="text-muted-foreground">{selectedParty.accountName}</p>
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
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" className="px-6">
              Previous
            </Button>
            <Button 
              disabled={!selectedParty || !represented}
              className="px-6"
              style={{ backgroundColor: selectedParty && represented ? "#0B5FFF" : undefined }}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lookup Modal Dialog */}
      <Dialog open={lookupOpen} onOpenChange={setLookupOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Primary Party</DialogTitle>
            <DialogDescription>
              Search and select an existing record or create a new one
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={lookupSearch}
                onChange={(e) => setLookupSearch(e.target.value)}
                placeholder="Search records..."
                className="pl-9"
              />
            </div>

            {/* View Switcher Tabs */}
            <Tabs value={lookupView} onValueChange={(v) => setLookupView(v as "account" | "contact")} className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="account">Account Lookup View</TabsTrigger>
                  <TabsTrigger value="contact">Contact Lookup View</TabsTrigger>
                </TabsList>
                <Button
                  size="sm"
                  onClick={() => {
                    if (lookupView === "account") {
                      setCreateAccountOpen(true);
                    } else {
                      setCreateContactOpen(true);
                    }
                  }}
                  style={{ backgroundColor: "#0B5FFF" }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Record
                </Button>
              </div>

              <TabsContent value="account" className="flex-1 overflow-auto mt-4">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAccounts.map((account) => (
                          <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell>{account.city}</TableCell>
                            <TableCell>{account.state}</TableCell>
                            <TableCell>{account.phone}</TableCell>
                            <TableCell>{account.website}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSelectAccount(account)}
                                style={{ color: "#0B5FFF" }}
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

              <TabsContent value="contact" className="flex-1 overflow-auto mt-4">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContacts.map((contact) => (
                          <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{contact.fullName}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.accountName}</TableCell>
                            <TableCell>{contact.city}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSelectContact(contact)}
                                style={{ color: "#0B5FFF" }}
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLookupOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Account Modal */}
      <Dialog open={createAccountOpen} onOpenChange={setCreateAccountOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Create New Organization</DialogTitle>
            <DialogDescription>
              Add organization details and primary contact information
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6 py-4">
            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organization Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="accountName">Organization Name *</Label>
                  <Input
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="mainPhone">Main Phone</Label>
                  <Input
                    id="mainPhone"
                    value={mainPhone}
                    onChange={(e) => setMainPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-4">
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
                <div className="md:col-span-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Apartment, suite, etc."
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

            <Separator />

            {/* Primary Contact */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Primary Contact
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCreateContactOpen(true)}
                  style={{ color: "#0B5FFF" }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create New Record
                </Button>
              </div>
              
              {selectedPrimaryContact ? (
                <div className="p-3 bg-muted/30 rounded-lg border">
                  <p className="text-sm font-medium">{selectedPrimaryContact.fullName}</p>
                  <p className="text-xs text-muted-foreground">{selectedPrimaryContact.email}</p>
                  <p className="text-xs text-muted-foreground">{selectedPrimaryContact.phone}</p>
                </div>
              ) : (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={primaryContactSearch}
                    onChange={(e) => setPrimaryContactSearch(e.target.value)}
                    placeholder="Search for contact..."
                    className="pl-9"
                  />
                  {primaryContactSearch && filteredPrimaryContacts.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
                      {filteredPrimaryContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="p-2 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            setSelectedPrimaryContact(contact);
                            setPrimaryContactSearch("");
                          }}
                        >
                          <p className="text-sm font-medium">{contact.fullName}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setCreateAccountOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveAccount}
              disabled={!accountName}
              style={{ backgroundColor: accountName ? "#0B5FFF" : undefined }}
            >
              Save & Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Contact Modal */}
      <Dialog open={createContactOpen} onOpenChange={setCreateContactOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Contact</DialogTitle>
            <DialogDescription>
              Add contact information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateContactOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveContact}
              disabled={!firstName || !lastName}
              style={{ backgroundColor: firstName && lastName ? "#0B5FFF" : undefined }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
