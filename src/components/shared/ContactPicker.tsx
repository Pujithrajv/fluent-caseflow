import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search, Plus, X } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  role?: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Jaslyn Blom", email: "jaslyn.blom@ag.state.il.us", phone: "(217) 555-0123", organization: "Dept. of Agriculture", role: "Attorney" },
  { id: "2", name: "Sarah Johnson", email: "sarah.johnson@ag.state.il.us", phone: "(217) 555-0124", organization: "Dept. of Agriculture", role: "Case Coordinator" },
  { id: "3", name: "Mike Wilson", email: "mike.wilson@health.state.il.us", phone: "(217) 555-0125", organization: "Dept. of Public Health", role: "Decision Maker" },
  { id: "4", name: "Lisa Brown", email: "lisa.brown@ag.state.il.us", phone: "(217) 555-0126", organization: "Dept. of Agriculture", role: "Attorney" },
  { id: "5", name: "David Clark", email: "david.clark@health.state.il.us", phone: "(217) 555-0127", organization: "Dept. of Public Health", role: "Attorney" },
];

interface ContactPickerProps {
  value?: Contact;
  onChange: (contact: Contact | null) => void;
  placeholder: string;
  helperText?: string;
  disabled?: boolean;
}

export function ContactPicker({ value, onChange, placeholder, helperText, disabled = false }: ContactPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newContact, setNewContact] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    notes: ""
  });

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    onChange(contact);
    setIsOpen(false);
  };

  const handleCreateContact = () => {
    const contact: Contact = {
      id: Math.random().toString(),
      name: `${newContact.firstName} ${newContact.middleName} ${newContact.lastName}`.trim(),
      email: newContact.email,
      phone: newContact.phone,
      organization: newContact.organization,
      role: newContact.role
    };
    
    onChange(contact);
    setIsOpen(false);
    
    // Reset form
    setNewContact({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      notes: ""
    });
  };

  const handleClear = () => {
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={value ? value.name : ""}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="pr-20"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
          {value && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                title="Search contacts"
                disabled={disabled}
              >
                <Search className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Select Contact</DialogTitle>
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
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto border rounded-md">
                    <table className="w-full">
                      <thead className="bg-muted/30 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Organization</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredContacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-muted/50">
                            <td className="px-4 py-2 text-sm">{contact.name}</td>
                            <td className="px-4 py-2 text-sm">{contact.email}</td>
                            <td className="px-4 py-2 text-sm">{contact.phone}</td>
                            <td className="px-4 py-2 text-sm">{contact.organization}</td>
                            <td className="px-4 py-2">
                              <Button
                                size="sm"
                                onClick={() => handleSelectContact(contact)}
                              >
                                Select
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="create" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={newContact.firstName}
                        onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={newContact.middleName}
                        onChange={(e) => setNewContact({ ...newContact, middleName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={newContact.lastName}
                        onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={newContact.organization}
                        onChange={(e) => setNewContact({ ...newContact, organization: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={newContact.role}
                        onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      value={newContact.notes}
                      onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                      className="w-full min-h-20 px-3 py-2 border border-input rounded-md text-sm"
                      placeholder="Additional notes..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateContact}
                      disabled={!newContact.firstName || !newContact.lastName || !newContact.email}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Contact
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            title="Add new contact"
            disabled={disabled}
            onClick={() => {
              setIsOpen(true);
              // Auto-switch to create tab when clicking add icon
              setTimeout(() => {
                const createTab = document.querySelector('[data-value="create"]') as HTMLElement;
                createTab?.click();
              }, 100);
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}