import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Trash2, Edit, Search, Eye, HelpCircle } from "lucide-react";
import { useState } from "react";

interface InvolvedPartiesTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const mockParties = [
  {
    id: 1,
    party: "Kirby Neroni\nChief Counsel\nDepartment General Counsel",
    contact: "P. 630-308-4387\nE. kirby.neroni@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 2,
    party: "Batsheva English\nExecutive Assistant\nDepartment Representative",
    contact: "P. 217-786-3028\nE. batsheva.english@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 3,
    party: "Aafjes-Soriano\nPrinciple\nAppellee",
    contact: "",
    organization: "Sunny Day Schools\nSt. Charles, IL"
  },
  {
    id: 4,
    party: "Abbey Higgins\nAttorney at Law\nParty Counsel",
    contact: "P. 480-796-1707\nE. abbey.higgins@royce.com",
    organization: "Royce Partners, LLC\nChicago, IL"
  }
];

const mockContacts = [
  { id: 1, name: "John Smith", title: "Attorney", organization: "Smith & Associates", phone: "555-123-4567", email: "john@smithlaw.com", address: "123 Main St, Chicago, IL" },
  { id: 2, name: "Sarah Johnson", title: "Paralegal", organization: "Legal Services Inc", phone: "555-987-6543", email: "sarah@legalservices.com", address: "456 Oak Ave, Springfield, IL" },
  { id: 3, name: "Michael Brown", title: "Legal Counsel", organization: "Brown Law Firm", phone: "555-555-0123", email: "mbrown@brownlaw.com", address: "789 Pine St, Peoria, IL" },
  { id: 4, name: "Emily Davis", title: "Chief Legal Officer", organization: "Corporate Legal", phone: "555-444-7890", email: "emily@corplaw.com", address: "321 Elm St, Rockford, IL" },
];

export function InvolvedPartiesTab({ onDataChange, data }: InvolvedPartiesTabProps) {
  const [createPartyModalOpen, setCreatePartyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    setCreatePartyModalOpen(false);
    // Add logic to add the selected contact as a related party
  };

  const handleAddNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatePartyModalOpen(false);
    // Add logic to create new contact and add as related party
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground mb-1">
                Involved Parties
              </CardTitle>
              <p className="text-sm text-muted-foreground">Associated parties</p>
            </div>
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <Select defaultValue="active">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Parties</SelectItem>
                <SelectItem value="all">All Parties</SelectItem>
                <SelectItem value="stakeholder">Stakeholders</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={createPartyModalOpen} onOpenChange={setCreatePartyModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Related Party
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Related Party</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search Existing</TabsTrigger>
                    <TabsTrigger value="create">Create New</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search" className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, organization, or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                          onClick={() => handleContactSelect(contact)}
                        >
                          <div className="font-semibold">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.title}</div>
                          <div className="text-sm text-muted-foreground">{contact.organization}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="create" className="space-y-4">
                    <form onSubmit={handleAddNewContact} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input id="organization" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" rows={3} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setCreatePartyModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Add Contact</Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Party</div>
                <div>Contact</div>
                <div>Organization</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {mockParties.map((party) => (
                <div key={party.id} className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div>
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.party}</div>
                    </div>
                    
                    <div className="text-sm text-gray-900 whitespace-pre-line">
                      {party.contact || "—"}
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.organization}</div>
                      <div className="flex ml-4">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit className="h-3 w-3 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {mockParties.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-muted-foreground">No involved parties added yet</p>
              <Button variant="outline" size="sm" className="mt-4 font-fluent">
                <Plus className="mr-2 h-4 w-4" />
                Add First Party
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}