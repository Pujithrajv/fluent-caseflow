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
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
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
    // TODO: Implement add party functionality
    console.log("Add party functionality to be implemented");
  };

  const handleSearchAttorney = () => {
    // TODO: Implement attorney search functionality
    console.log("Search attorney functionality to be implemented");
  };

  const handleAddAttorney = () => {
    // TODO: Implement add attorney functionality
    console.log("Add attorney functionality to be implemented");
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
    </div>
  );
}