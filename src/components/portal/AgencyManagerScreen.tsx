import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronRight, Building2, FolderTree, Folder, Plus, Edit, Trash2, ExternalLink, Phone, Mail, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  role: string;
  divisionBureau: string;
  email: string;
  phone: string;
  status: string;
  level: "department" | "division" | "bureau";
}

interface Bureau {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  primaryContact?: string;
  totalEmployees?: number;
}

interface Division {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  primaryContact?: string;
  totalEmployees?: number;
  bureaus: Bureau[];
}

export function AgencyManagerScreen() {
  const { toast } = useToast();
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>(["div-1"]);
  const [selectedEntity, setSelectedEntity] = useState<{ type: "department" | "division" | "bureau"; id: string; name: string }>({
    type: "department",
    id: "dept-1",
    name: "Department of Natural Resources"
  });
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    divisionBureau: "",
    email: "",
    phone: "",
    level: "department" as "department" | "division" | "bureau"
  });

  // Mock data
  const departmentInfo = {
    name: "Department of Natural Resources",
    agencyId: "DNR-2025-001",
    address: "465 Conservation Drive, Springfield, IL 62701",
    primaryContact: "Laura Chen",
    phone: "(217) 555-1000",
    totalDivisions: 3,
    totalContacts: 25
  };

  const divisions: Division[] = [
    {
      id: "div-1",
      name: "Office of Forestry",
      address: "100 Forest Lane, Springfield, IL 62701",
      phone: "(217) 555-1100",
      primaryContact: "Mark Johnson",
      totalEmployees: 45,
      bureaus: [
        { id: "bur-1", name: "Bureau of Timber Licensing", phone: "(217) 555-1110", primaryContact: "Sarah Williams", totalEmployees: 15 },
        { id: "bur-2", name: "Bureau of Wildlife", phone: "(217) 555-1120", primaryContact: "David Brown", totalEmployees: 18 },
        { id: "bur-3", name: "Bureau of Conservation Services", phone: "(217) 555-1130", primaryContact: "Emily Davis", totalEmployees: 12 }
      ]
    },
    {
      id: "div-2",
      name: "Office of Oil & Gas Resource Management",
      address: "200 Energy Blvd, Springfield, IL 62702",
      phone: "(217) 555-1200",
      primaryContact: "James Wilson",
      totalEmployees: 38,
      bureaus: [
        { id: "bur-4", name: "Bureau of Drilling Oversight", phone: "(217) 555-1210", primaryContact: "Michael Lee", totalEmployees: 20 },
        { id: "bur-5", name: "Bureau of Energy Safety", phone: "(217) 555-1220", primaryContact: "Jennifer Taylor", totalEmployees: 18 }
      ]
    },
    {
      id: "div-3",
      name: "Office of Water Resources",
      address: "300 River Road, Springfield, IL 62703",
      phone: "(217) 555-1300",
      primaryContact: "Patricia Martinez",
      totalEmployees: 42,
      bureaus: [
        { id: "bur-6", name: "Bureau of Flood Management", phone: "(217) 555-1310", primaryContact: "Robert Anderson", totalEmployees: 22 },
        { id: "bur-7", name: "Bureau of Irrigation", phone: "(217) 555-1320", primaryContact: "Linda Thomas", totalEmployees: 20 }
      ]
    }
  ];

  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Laura Chen", role: "Agency Manager", divisionBureau: "Department", email: "l.chen@dnr.gov", phone: "(217) 555-1001", status: "Active", level: "department" },
    { id: "2", name: "Mark Johnson", role: "Division Director", divisionBureau: "Office of Forestry", email: "m.johnson@dnr.gov", phone: "(217) 555-1100", status: "Active", level: "division" },
    { id: "3", name: "Sarah Williams", role: "Bureau Manager", divisionBureau: "Bureau of Timber Licensing", email: "s.williams@dnr.gov", phone: "(217) 555-1110", status: "Active", level: "bureau" },
    { id: "4", name: "David Brown", role: "Contact Person", divisionBureau: "Bureau of Wildlife", email: "d.brown@dnr.gov", phone: "(217) 555-1120", status: "Active", level: "bureau" },
    { id: "5", name: "John Smith", role: "Case Manager", divisionBureau: "Department", email: "j.smith@dnr.gov", phone: "(217) 555-1002", status: "Active", level: "department" }
  ]);

  const toggleDivision = (divisionId: string) => {
    setExpandedDivisions(prev =>
      prev.includes(divisionId)
        ? prev.filter(id => id !== divisionId)
        : [...prev, divisionId]
    );
  };

  const getRoleBadgeColor = (role: string, level: "department" | "division" | "bureau") => {
    if (level === "department") return "bg-blue-100 text-blue-800 border-blue-200";
    if (level === "division") return "bg-green-100 text-green-800 border-green-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleAddContact = () => {
    setIsAddingContact(true);
    setNewContact({ name: "", role: "", divisionBureau: "", email: "", phone: "", level: "department" });
  };

  const handleSaveNewContact = () => {
    if (!newContact.name || !newContact.email || !newContact.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate role and level match
    const departmentRoles = ["Agency Manager", "Case Manager"];
    const bureauRoles = ["Bureau Manager", "Contact Person"];

    if (departmentRoles.includes(newContact.role) && newContact.level !== "department") {
      toast({
        title: "Role Assignment Error",
        description: "⚠️ This role can only be assigned at the Department level.",
        variant: "destructive"
      });
      return;
    }

    if (bureauRoles.includes(newContact.role) && newContact.level === "department") {
      toast({
        title: "Role Assignment Error",
        description: "⚠️ This role can only be assigned at the Division or Bureau level.",
        variant: "destructive"
      });
      return;
    }

    const contactToAdd: Contact = {
      id: Date.now().toString(),
      ...newContact,
      status: "Active"
    };

    setContacts(prev => [...prev, contactToAdd]);
    setIsAddingContact(false);
    toast({ title: "Success", description: "Contact added successfully." });
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
    toast({ title: "Success", description: "Contact deleted successfully." });
  };

  const filteredContacts = contacts.filter(contact => {
    if (filterLevel === "all") return true;
    return contact.level === filterLevel;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            {departmentInfo.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Agency ID: {departmentInfo.agencyId}</p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View in CRM
        </Button>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm text-foreground">{departmentInfo.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Primary Contact</p>
                <p className="text-sm text-foreground">{departmentInfo.primaryContact}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Department Phone</p>
                <p className="text-sm text-foreground">{departmentInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FolderTree className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Divisions</p>
                <p className="text-sm text-foreground">{departmentInfo.totalDivisions}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-sm text-foreground">{departmentInfo.totalContacts}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Division & Bureau Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle>Division & Bureau Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Department Level */}
            <div className="flex items-center gap-2 p-3 rounded-md bg-blue-50 border border-blue-200">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">{departmentInfo.name}</span>
            </div>

            {/* Divisions */}
            {divisions.map(division => (
              <div key={division.id} className="ml-4 space-y-2">
                <Collapsible
                  open={expandedDivisions.includes(division.id)}
                  onOpenChange={() => toggleDivision(division.id)}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 p-3 rounded-md bg-green-50 border border-green-200 hover:bg-green-100 transition-colors w-full">
                    {expandedDivisions.includes(division.id) ? (
                      <ChevronDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-green-600" />
                    )}
                    <FolderTree className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">{division.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {division.bureaus.length} bureaus
                    </Badge>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="ml-6 space-y-1 mt-2">
                    {division.bureaus.map(bureau => (
                      <div
                        key={bureau.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <Folder className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-900">{bureau.name}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contacts & Roles Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contacts & Roles Management</CardTitle>
            <div className="flex items-center gap-4">
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Show All Contacts</SelectItem>
                  <SelectItem value="department">Department Only</SelectItem>
                  <SelectItem value="division">Division Only</SelectItem>
                  <SelectItem value="bureau">Bureau Only</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddContact} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Contact
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            ⚠️ Role and access changes must be made manually by department administrators.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role(s)</TableHead>
                <TableHead>Division/Bureau</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(contact.role, contact.level)}>
                      {contact.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{contact.divisionBureau}</TableCell>
                  <TableCell>
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline text-sm">
                      {contact.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-sm">{contact.phone}</TableCell>
                  <TableCell>
                    <Badge variant={contact.status === "Active" ? "default" : "secondary"}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this contact? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteContact(contact.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Contact Dialog */}
      <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@dnr.gov"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(217) 555-0000"
                />
              </div>
              <div>
                <Label htmlFor="level">Level *</Label>
                <Select value={newContact.level} onValueChange={(value: any) => setNewContact(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="division">Division</SelectItem>
                    <SelectItem value="bureau">Bureau</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={newContact.role} onValueChange={(value) => setNewContact(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agency Manager">Agency Manager</SelectItem>
                    <SelectItem value="Case Manager">Case Manager</SelectItem>
                    <SelectItem value="Bureau Manager">Bureau Manager</SelectItem>
                    <SelectItem value="Contact Person">Contact Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="divisionBureau">Division/Bureau *</Label>
                <Input
                  id="divisionBureau"
                  value={newContact.divisionBureau}
                  onChange={(e) => setNewContact(prev => ({ ...prev, divisionBureau: e.target.value }))}
                  placeholder="e.g., Office of Forestry"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingContact(false)}>Cancel</Button>
              <Button onClick={handleSaveNewContact}>Save Contact</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
