import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, Trash2, Edit, Search, Eye, HelpCircle, UserPlus } from "lucide-react";
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
  { id: 1, name: "John Smith", role: "Attorney", organization: "Smith & Associates", email: "john@smith.com" },
  { id: 2, name: "Sarah Johnson", role: "Paralegal", organization: "Legal Corp", email: "sarah@legal.com" },
  { id: 3, name: "Mike Davis", role: "Consultant", organization: "Davis Consulting", email: "mike@davis.com" },
];

export function InvolvedPartiesTab({ onDataChange, data }: InvolvedPartiesTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    role: "",
    organization: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateContact = () => {
    console.log("Creating new contact:", newContact);
    // Reset form
    setNewContact({
      firstName: "",
      lastName: "",
      role: "",
      organization: "",
      email: "",
      phone: "",
      address: "",
      notes: ""
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
          <div className="flex items-end justify-end">
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
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search parties" 
                className="pl-10"
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Related Party
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Related Party</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search Existing</TabsTrigger>
                    <TabsTrigger value="create">Create New</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search" className="space-y-4 mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search contacts..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {filteredContacts.map((contact) => (
                        <div key={contact.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-muted-foreground">{contact.role} at {contact.organization}</p>
                              <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                            <Button size="sm">Select</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="create" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName"
                          value={newContact.firstName}
                          onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          value={newContact.lastName}
                          onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="role">Role/Title</Label>
                      <Input 
                        id="role"
                        value={newContact.role}
                        onChange={(e) => setNewContact({...newContact, role: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input 
                        id="organization"
                        value={newContact.organization}
                        onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={newContact.email}
                          onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address"
                        value={newContact.address}
                        onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea 
                        id="notes"
                        value={newContact.notes}
                        onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleCreateContact} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Contact
                      </Button>
                    </div>
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