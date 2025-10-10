import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, FileDown, Building2, Phone, Mail, MapPin } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string[];
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

interface RoleDelegation {
  id: string;
  substituteName: string;
  role: string;
  startDate: string;
  endDate: string;
}

export const AgencyManagementDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: ["Agency Manager", "Case Manager"],
      email: "s.johnson@agr.gov",
      phone: "(555) 123-4567",
      status: "Active"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: ["Case Manager"],
      email: "m.chen@agr.gov",
      phone: "(555) 234-5678",
      status: "Active"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: ["Agency User", "FDM"],
      email: "e.rodriguez@agr.gov",
      phone: "(555) 345-6789",
      status: "Inactive"
    }
  ]);

  const [delegations, setDelegations] = useState<RoleDelegation[]>([
    {
      id: "1",
      substituteName: "John Smith",
      role: "Case Manager",
      startDate: "2024-03-01",
      endDate: "2024-03-15"
    }
  ]);

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isDelegationOpen, setIsDelegationOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    phoneMobile: "",
    roles: {
      caseManager: false,
      agencyManager: false,
      agencyUser: false,
      fdm: false,
      attorney: false
    }
  });

  const handleAddContact = () => {
    const selectedRoles = Object.entries(newContact.roles)
      .filter(([_, selected]) => selected)
      .map(([role, _]) => 
        role.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      );

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      role: selectedRoles,
      email: newContact.email,
      phone: newContact.phone,
      status: "Active"
    };

    setContacts([...contacts, contact]);
    setIsAddContactOpen(false);
    setNewContact({
      name: "",
      email: "",
      phone: "",
      phoneMobile: "",
      roles: {
        caseManager: false,
        agencyManager: false,
        agencyUser: false,
        fdm: false,
        attorney: false
      }
    });
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsAddContactOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Department of Agriculture</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Agency Info
          </Button>
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="email@agency.gov"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneMobile">Mobile Phone</Label>
                    <Input
                      id="phoneMobile"
                      value={newContact.phoneMobile}
                      onChange={(e) => setNewContact({ ...newContact, phoneMobile: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block">Roles *</Label>
                  <div className="space-y-2">
                    {[
                      { key: "caseManager", label: "Case Manager" },
                      { key: "agencyManager", label: "Agency Manager" },
                      { key: "agencyUser", label: "Agency User" },
                      { key: "fdm", label: "FDM" },
                      { key: "attorney", label: "Attorney" }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={newContact.roles[key as keyof typeof newContact.roles]}
                          onCheckedChange={(checked) =>
                            setNewContact({
                              ...newContact,
                              roles: { ...newContact.roles, [key]: checked === true }
                            })
                          }
                        />
                        <Label htmlFor={key} className="font-normal cursor-pointer">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact}>Add Contact</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
      </div>

      {/* Summary Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Agency Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm mt-1">500 S 2nd Street</p>
                <p className="text-sm">Springfield, IL 62701</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-sm mt-1">(217) 785-1234</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Division</p>
                <p className="text-sm mt-1">Agricultural Services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 mt-0.5">
                <div className="h-3 w-3 rounded-full bg-green-500 mt-1" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant="default" className="mt-1 bg-green-500">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role(s)</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.role.map((role, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {contact.email}
                    </div>
                  </TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={contact.status === "Active" ? "default" : "secondary"}
                      className={contact.status === "Active" ? "bg-green-500" : ""}
                    >
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditContact(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Delegation Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Role Delegation</CardTitle>
          <Dialog open={isDelegationOpen} onOpenChange={setIsDelegationOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Delegation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Temporary Substitute</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="substitute">Substitute Contact</Label>
                  <Select>
                    <SelectTrigger id="substitute">
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="delegatedRole">Role to Delegate</Label>
                  <Select>
                    <SelectTrigger id="delegatedRole">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="case-manager">Case Manager</SelectItem>
                      <SelectItem value="agency-manager">Agency Manager</SelectItem>
                      <SelectItem value="fdm">FDM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                  <p className="font-medium">Validation Notice</p>
                  <p className="text-xs mt-1">Cannot assign role outside this agency scope</p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDelegationOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Assign Delegation</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Substitute Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delegations.map((delegation) => (
                <TableRow key={delegation.id}>
                  <TableCell className="font-medium">{delegation.substituteName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{delegation.role}</Badge>
                  </TableCell>
                  <TableCell>{delegation.startDate}</TableCell>
                  <TableCell>{delegation.endDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
