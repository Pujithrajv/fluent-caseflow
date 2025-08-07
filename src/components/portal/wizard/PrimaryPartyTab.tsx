import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Search, Plus, Eye } from "lucide-react";
import { useState } from "react";

interface PrimaryPartyTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

interface PrimaryPartyData {
  partyName?: string;
  represented?: "yes" | "no";
  attorneyName?: string;
}

const mockContacts = [
  {
    id: 1,
    name: "Kirby Neroni",
    title: "Chief Counsel",
    organization: "Board of Higher Education",
    phone: "630-308-4387",
    email: "kirby.neroni@il.gov"
  },
  {
    id: 2,
    name: "Batsheva English",
    title: "Executive Assistant",
    organization: "Board of Higher Education",
    phone: "217-786-3028",
    email: "batsheva.english@il.gov"
  },
  {
    id: 3,
    name: "Abbey Higgins",
    title: "Attorney at Law",
    organization: "Royce Partners, LLC",
    phone: "480-796-1707",
    email: "abbey.higgins@royce.com"
  },
  {
    id: 4,
    name: "Aafjes-Soriano",
    title: "Principle",
    organization: "Sunny Day Schools",
    phone: "",
    email: ""
  }
];

export function PrimaryPartyTab({ onDataChange, data }: PrimaryPartyTabProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAttorneySearchModalOpen, setIsAttorneySearchModalOpen] = useState(false);
  const [isAttorneyAddModalOpen, setIsAttorneyAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [attorneySearchQuery, setAttorneySearchQuery] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    organization: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [newAttorney, setNewAttorney] = useState({
    name: "",
    title: "",
    organization: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  
  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAttorneys = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(attorneySearchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(attorneySearchQuery.toLowerCase())
  );
  const handlePartyNameChange = (value: string) => {
    onDataChange({ ...data, partyName: value });
  };

  const handleRepresentedChange = (value: "yes" | "no") => {
    onDataChange({ ...data, represented: value, attorneyName: value === "no" ? undefined : data?.attorneyName });
  };

  const handleAttorneyNameChange = (value: string) => {
    onDataChange({ ...data, attorneyName: value });
  };

  const handleSearchParty = () => {
    setIsSearchModalOpen(true);
  };

  const handleSelectContact = (contact: any) => {
    handlePartyNameChange(contact.name);
    setIsSearchModalOpen(false);
    setSearchQuery("");
  };

  const handleAddParty = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewContact = () => {
    if (!newContact.name.trim()) return;
    
    // Add the new contact to the party name field
    handlePartyNameChange(newContact.name);
    
    // Reset form and close modal
    setNewContact({
      name: "",
      title: "",
      organization: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    });
    setIsAddModalOpen(false);
  };

  const handleNewContactChange = (field: string, value: string) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchAttorney = () => {
    setIsAttorneySearchModalOpen(true);
  };

  const handleSelectAttorney = (contact: any) => {
    handleAttorneyNameChange(contact.name);
    setIsAttorneySearchModalOpen(false);
    setAttorneySearchQuery("");
  };

  const handleAddAttorney = () => {
    setIsAttorneyAddModalOpen(true);
  };

  const handleSaveNewAttorney = () => {
    if (!newAttorney.name.trim()) return;
    
    // Add the new attorney to the attorney name field
    handleAttorneyNameChange(newAttorney.name);
    
    // Reset form and close modal
    setNewAttorney({
      name: "",
      title: "",
      organization: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    });
    setIsAttorneyAddModalOpen(false);
  };

  const handleNewAttorneyChange = (field: string, value: string) => {
    setNewAttorney(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <User className="h-5 w-5 text-primary" />
            <span>Primary Party Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="partyName" className="font-fluent">Party Name *</Label>
            <div className="relative">
              <Input 
                id="partyName"
                placeholder="Enter party name"
                value={data?.partyName || ""}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                className="shadow-fluent-8 border-input-border pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSearchParty}
                  className="h-7 w-7 p-0"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleAddParty}
                  className="h-7 w-7 p-0"
                >
                  <Plus className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="font-fluent">Represented *</Label>
            <RadioGroup 
              value={data?.represented || "no"} 
              onValueChange={handleRepresentedChange}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="represented-yes" />
                <Label htmlFor="represented-yes" className="font-fluent">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="represented-no" />
                <Label htmlFor="represented-no" className="font-fluent">No</Label>
              </div>
            </RadioGroup>
          </div>

          {data?.represented === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="attorneyName" className="font-fluent">Attorney Name</Label>
              <div className="relative">
                <Input 
                  id="attorneyName"
                  placeholder="Enter attorney name"
                  value={data?.attorneyName || ""}
                  onChange={(e) => handleAttorneyNameChange(e.target.value)}
                  className="shadow-fluent-8 border-input-border pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSearchAttorney}
                    className="h-7 w-7 p-0"
                  >
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleAddAttorney}
                    className="h-7 w-7 p-0"
                  >
                    <Plus className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Search Contacts</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or organization" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                  <div>Name</div>
                  <div>Title</div>
                  <div>Organization</div>
                  <div>Contact</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-900">{contact.title}</div>
                      <div className="text-sm text-gray-900">{contact.organization}</div>
                      <div className="text-sm text-gray-500">
                        {contact.phone && <div>P. {contact.phone}</div>}
                        {contact.email && <div>E. {contact.email}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No contacts found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newContactName">Name *</Label>
                <Input 
                  id="newContactName"
                  placeholder="Enter full name"
                  value={newContact.name}
                  onChange={(e) => handleNewContactChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newContactTitle">Title</Label>
                <Input 
                  id="newContactTitle"
                  placeholder="Job title"
                  value={newContact.title}
                  onChange={(e) => handleNewContactChange("title", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newContactOrganization">Organization</Label>
              <Input 
                id="newContactOrganization"
                placeholder="Company or organization name"
                value={newContact.organization}
                onChange={(e) => handleNewContactChange("organization", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newContactPhone">Phone</Label>
                <Input 
                  id="newContactPhone"
                  placeholder="Phone number"
                  value={newContact.phone}
                  onChange={(e) => handleNewContactChange("phone", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newContactEmail">Email</Label>
                <Input 
                  id="newContactEmail"
                  type="email"
                  placeholder="Email address"
                  value={newContact.email}
                  onChange={(e) => handleNewContactChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newContactAddress">Address</Label>
              <Input 
                id="newContactAddress"
                placeholder="Street address"
                value={newContact.address}
                onChange={(e) => handleNewContactChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newContactCity">City</Label>
                <Input 
                  id="newContactCity"
                  placeholder="City"
                  value={newContact.city}
                  onChange={(e) => handleNewContactChange("city", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newContactState">State</Label>
                <Input 
                  id="newContactState"
                  placeholder="State"
                  value={newContact.state}
                  onChange={(e) => handleNewContactChange("state", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newContactZip">Zip Code</Label>
                <Input 
                  id="newContactZip"
                  placeholder="Zip code"
                  value={newContact.zipCode}
                  onChange={(e) => handleNewContactChange("zipCode", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNewContact}
                disabled={!newContact.name.trim()}
              >
                Save Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAttorneySearchModalOpen} onOpenChange={setIsAttorneySearchModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Search Attorneys</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or organization" 
                className="pl-10"
                value={attorneySearchQuery}
                onChange={(e) => setAttorneySearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                  <div>Name</div>
                  <div>Title</div>
                  <div>Organization</div>
                  <div>Contact</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredAttorneys.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleSelectAttorney(contact)}
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-900">{contact.title}</div>
                      <div className="text-sm text-gray-900">{contact.organization}</div>
                      <div className="text-sm text-gray-500">
                        {contact.phone && <div>P. {contact.phone}</div>}
                        {contact.email && <div>E. {contact.email}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredAttorneys.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No attorneys found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAttorneyAddModalOpen} onOpenChange={setIsAttorneyAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Attorney</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newAttorneyName">Name *</Label>
                <Input 
                  id="newAttorneyName"
                  placeholder="Enter full name"
                  value={newAttorney.name}
                  onChange={(e) => handleNewAttorneyChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newAttorneyTitle">Title</Label>
                <Input 
                  id="newAttorneyTitle"
                  placeholder="Job title"
                  value={newAttorney.title}
                  onChange={(e) => handleNewAttorneyChange("title", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newAttorneyOrganization">Organization</Label>
              <Input 
                id="newAttorneyOrganization"
                placeholder="Law firm or organization name"
                value={newAttorney.organization}
                onChange={(e) => handleNewAttorneyChange("organization", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newAttorneyPhone">Phone</Label>
                <Input 
                  id="newAttorneyPhone"
                  placeholder="Phone number"
                  value={newAttorney.phone}
                  onChange={(e) => handleNewAttorneyChange("phone", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newAttorneyEmail">Email</Label>
                <Input 
                  id="newAttorneyEmail"
                  type="email"
                  placeholder="Email address"
                  value={newAttorney.email}
                  onChange={(e) => handleNewAttorneyChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newAttorneyAddress">Address</Label>
              <Input 
                id="newAttorneyAddress"
                placeholder="Street address"
                value={newAttorney.address}
                onChange={(e) => handleNewAttorneyChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newAttorneyCity">City</Label>
                <Input 
                  id="newAttorneyCity"
                  placeholder="City"
                  value={newAttorney.city}
                  onChange={(e) => handleNewAttorneyChange("city", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newAttorneyState">State</Label>
                <Input 
                  id="newAttorneyState"
                  placeholder="State"
                  value={newAttorney.state}
                  onChange={(e) => handleNewAttorneyChange("state", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newAttorneyZip">Zip Code</Label>
                <Input 
                  id="newAttorneyZip"
                  placeholder="Zip code"
                  value={newAttorney.zipCode}
                  onChange={(e) => handleNewAttorneyChange("zipCode", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAttorneyAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNewAttorney}
                disabled={!newAttorney.name.trim()}
              >
                Save Attorney
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}