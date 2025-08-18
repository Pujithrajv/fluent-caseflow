import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Search } from "lucide-react";
import { useState } from "react";
import { ContactLookupModal } from "../ContactLookupModal";
import { CreateContactRecordModal } from "../CreateContactRecordModal";

interface PrimaryPartyTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization: string;
}

interface ContactRecord {
  prefix?: string
  firstName?: string
  middleInitial?: string
  lastName?: string
  suffix?: string
  salutation?: string
  title?: string
  organization?: string
  participationType: string
  email?: string
  businessPhone?: string
  mobilePhone?: string
  street1?: string
  city?: string
  stateProvince?: string
  postalCode?: string
}

interface PrimaryPartyData {
  partyName?: string;
  represented?: "yes" | "no";
  attorneyName?: string;
  selectedContact?: Contact;
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

export function PrimaryPartyTab({ onDataChange, data, isReadOnly = false, isSeededCase = false }: PrimaryPartyTabProps) {
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAttorneySearchModalOpen, setIsAttorneySearchModalOpen] = useState(false);
  const [attorneySearchQuery, setAttorneySearchQuery] = useState("");
  const [pendingNewContact, setPendingNewContact] = useState<Contact | null>(null);
  const filteredAttorneys = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(attorneySearchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(attorneySearchQuery.toLowerCase())
  );

  const handlePartyNameChange = (value: string) => {
    onDataChange({ ...data, partyName: value });
  };

  const handleContactSelect = (contact: Contact) => {
    onDataChange({ 
      ...data, 
      partyName: contact.name,
      selectedContact: contact 
    });
    setIsLookupModalOpen(false);
    setPendingNewContact(null);
  };

  const handleCreateContact = (contactRecord: ContactRecord) => {
    // Create a Contact object from the ContactRecord
    const newContact: Contact = {
      id: Date.now(), // Simple ID generation
      name: contactRecord.organization || `${contactRecord.firstName || ""} ${contactRecord.lastName || ""}`.trim(),
      email: contactRecord.email || "",
      phone: contactRecord.businessPhone || contactRecord.mobilePhone || "",
      organization: contactRecord.organization || ""
    };
    
    // Store the new contact for pre-selection in lookup modal
    setPendingNewContact(newContact);
    setIsCreateModalOpen(false);
    setIsLookupModalOpen(true);
  };

  const handleOpenLookup = () => {
    setIsLookupModalOpen(true);
  };

  const handleCreateNew = () => {
    setIsLookupModalOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleRemoveValue = () => {
    onDataChange({ 
      ...data, 
      partyName: "",
      selectedContact: undefined 
    });
    setIsLookupModalOpen(false);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
    setIsLookupModalOpen(true);
  };

  const handleRepresentedChange = (value: "yes" | "no") => {
    onDataChange({ ...data, represented: value, attorneyName: value === "no" ? undefined : data?.attorneyName });
  };

  const handleAttorneyNameChange = (value: string) => {
    onDataChange({ ...data, attorneyName: value });
  };

  const handleSearchAttorney = () => {
    setIsAttorneySearchModalOpen(true);
  };

  const handleSelectAttorney = (contact: any) => {
    onDataChange({ ...data, attorneyName: contact.name });
    setIsAttorneySearchModalOpen(false);
    setAttorneySearchQuery("");
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
                  placeholder="Search or select party"
                  value={data?.partyName || ""}
                  onChange={(e) => handlePartyNameChange(e.target.value)}
                  className="shadow-fluent-8 border-input-border pr-10"
                  disabled={isReadOnly || isSeededCase}
                />
                {!isReadOnly && !isSeededCase && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleOpenLookup}
                      className="h-7 w-7 p-0"
                    >
                      <Search className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                )}
              </div>
          </div>
          
          <div className="space-y-4">
            <Label className="font-fluent">Represented *</Label>
            <RadioGroup 
              value={data?.represented || "no"} 
              onValueChange={handleRepresentedChange}
              className="flex space-x-6"
              disabled={isReadOnly || isSeededCase}
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
                  placeholder="Search or select attorney"
                  value={data?.attorneyName || ""}
                  onChange={(e) => handleAttorneyNameChange(e.target.value)}
                  className="shadow-fluent-8 border-input-border pr-20"
                  disabled={isReadOnly}
                />
                {!isReadOnly && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSearchAttorney}
                      className="h-7 w-7 p-0"
                    >
                      <Search className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ContactLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        onSelect={handleContactSelect}
        onCreateNew={handleCreateNew}
        currentValue={data?.selectedContact}
        onRemoveValue={handleRemoveValue}
        pendingNewContact={pendingNewContact}
      />

      <CreateContactRecordModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateContact}
        onCancel={handleCreateModalCancel}
      />

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
    </div>
  );
}