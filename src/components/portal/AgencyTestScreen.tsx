import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Building2, Edit, ExternalLink, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Bureau {
  id: string;
  name: string;
  address: string;
  phone: string;
  primaryContact: string;
  divisionId: string;
}

interface Division {
  id: string;
  name: string;
  address: string;
  phone: string;
  primaryContact: string;
  bureausCount: number;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  level: "department" | "division" | "bureau";
  levelName: string;
  email: string;
  phone: string;
}

export function AgencyTestScreen() {
  const { toast } = useToast();
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [contactLevel, setContactLevel] = useState<"department" | "division" | "bureau">("department");
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);
  const [editingBureau, setEditingBureau] = useState<Bureau | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Mock data
  const [divisions, setDivisions] = useState<Division[]>([
    {
      id: "div-1",
      name: "Office of Forestry",
      address: "465 Conservation Dr, Springfield, IL",
      phone: "(217) 555-2100",
      primaryContact: "Rachel Evans",
      bureausCount: 3
    },
    {
      id: "div-2",
      name: "Office of Oil & Gas Resource Mgmt",
      address: "12 Energy Way, Springfield, IL",
      phone: "(217) 555-2200",
      primaryContact: "Tom Reyes",
      bureausCount: 2
    },
    {
      id: "div-3",
      name: "Office of Water Resources",
      address: "77 River Rd, Springfield, IL",
      phone: "(217) 555-2300",
      primaryContact: "Priya Nair",
      bureausCount: 2
    }
  ]);

  const [bureaus, setBureaus] = useState<Bureau[]>([
    {
      id: "bur-1",
      divisionId: "div-1",
      name: "Bureau of Timber Licensing",
      address: "101 Pine St, Springfield, IL",
      phone: "(217) 555-3111",
      primaryContact: "Alan Brooks"
    },
    {
      id: "bur-2",
      divisionId: "div-1",
      name: "Bureau of Wildlife",
      address: "55 Habitat Ln, Springfield, IL",
      phone: "(217) 555-3112",
      primaryContact: "Dana West"
    },
    {
      id: "bur-3",
      divisionId: "div-1",
      name: "Bureau of Conservation Services",
      address: "9 Preserve Ct, Springfield, IL",
      phone: "(217) 555-3113",
      primaryContact: "Maria Stone"
    },
    {
      id: "bur-4",
      divisionId: "div-2",
      name: "Bureau of Drilling Oversight",
      address: "20 Oil Rd, Springfield, IL",
      phone: "(217) 555-3211",
      primaryContact: "Kevin Hart"
    },
    {
      id: "bur-5",
      divisionId: "div-2",
      name: "Bureau of Energy Safety",
      address: "30 Gas Ave, Springfield, IL",
      phone: "(217) 555-3212",
      primaryContact: "Lisa Chang"
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "c-1",
      name: "Laura Chen",
      role: "Agency Manager",
      level: "department",
      levelName: "Department",
      email: "l.chen@dnr.gov",
      phone: "(217) 555-1111"
    },
    {
      id: "c-2",
      name: "Peter Morales",
      role: "Case Manager",
      level: "department",
      levelName: "Department",
      email: "p.morales@dnr.gov",
      phone: "(217) 555-1112"
    },
    {
      id: "c-3",
      name: "Rachel Evans",
      role: "Bureau Manager",
      level: "division",
      levelName: "Office of Forestry",
      email: "r.evans@dnr.gov",
      phone: "(217) 555-2222"
    }
  ]);

  const departmentInfo = {
    name: "Department of Natural Resources",
    agencyId: "DNR-2025-001"
  };

  const handleSaveDivision = () => {
    if (!editingDivision) return;
    setDivisions(prev =>
      prev.map(d => d.id === editingDivision.id ? editingDivision : d)
    );
    setEditingDivision(null);
    toast({ title: "Success", description: "Division updated successfully." });
  };

  const handleSaveBureau = () => {
    if (!editingBureau) return;
    setBureaus(prev =>
      prev.map(b => b.id === editingBureau.id ? editingBureau : b)
    );
    setEditingBureau(null);
    toast({ title: "Success", description: "Bureau updated successfully." });
  };

  const handleSaveContact = () => {
    if (!editingContact) return;

    // Validate role assignment rules
    const isDeptLevel = editingContact.level === "department";
    const isDeptRole = ["Agency Manager", "Case Manager"].includes(editingContact.role);

    if (!isDeptLevel && isDeptRole) {
      toast({
        title: "Role Assignment Error",
        description: "⚠️ Agency Manager and Case Manager can only be assigned at the Department level.",
        variant: "destructive"
      });
      return;
    }

    setContacts(prev =>
      prev.map(c => c.id === editingContact.id ? editingContact : c)
    );
    setEditingContact(null);
    toast({ title: "Success", description: "Contact updated successfully." });
  };

  const filteredContacts = contacts.filter(c => c.level === contactLevel);
  const selectedDivisionBureaus = selectedDivision
    ? bureaus.filter(b => b.divisionId === selectedDivision)
    : [];

  const getRoleOptions = (level: "department" | "division" | "bureau") => {
    if (level === "department") {
      return ["Agency Manager", "Case Manager", "Attorney", "Staff"];
    }
    return ["Bureau Manager", "Staff", "Contact Person"];
  };

  const getRoleBadgeColor = (level: "department" | "division" | "bureau") => {
    if (level === "department") return "bg-blue-100 text-blue-800 border-blue-200";
    if (level === "division") return "bg-green-100 text-green-800 border-green-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            {departmentInfo.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Agency ID: {departmentInfo.agencyId} • <Button variant="link" className="p-0 h-auto">
              <ExternalLink className="h-3 w-3 mr-1" />
              View in CRM
            </Button>
          </p>
        </div>
      </div>

      {/* Two-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left pane: Organization */}
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Divisions Table */}
            <div>
              <h3 className="font-semibold mb-3">Divisions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Division Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>Bureaus</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {divisions.map(division => (
                    <TableRow key={division.id}>
                      <TableCell className="font-medium">{division.name}</TableCell>
                      <TableCell className="text-sm">{division.address}</TableCell>
                      <TableCell className="text-sm">{division.phone}</TableCell>
                      <TableCell className="text-sm">{division.primaryContact}</TableCell>
                      <TableCell>{division.bureausCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedDivision(division.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingDivision(division)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Bureaus Table (contextual) */}
            {selectedDivision && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">
                    Bureaus - {divisions.find(d => d.id === selectedDivision)?.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDivision(null)}
                  >
                    Close
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bureau Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Primary Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDivisionBureaus.map(bureau => (
                      <TableRow key={bureau.id}>
                        <TableCell className="font-medium">{bureau.name}</TableCell>
                        <TableCell className="text-sm">{bureau.address}</TableCell>
                        <TableCell className="text-sm">{bureau.phone}</TableCell>
                        <TableCell className="text-sm">{bureau.primaryContact}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingBureau(bureau)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right pane: Contacts & Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Contacts & Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={contactLevel} onValueChange={(v: any) => setContactLevel(v)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="department">Department</TabsTrigger>
                <TabsTrigger value="division">Division</TabsTrigger>
                <TabsTrigger value="bureau">Bureau</TabsTrigger>
              </TabsList>

              <TabsContent value={contactLevel} className="space-y-4">
                {/* Alert for role rules */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {contactLevel === "department"
                      ? "Department-only roles: Agency Manager, Case Manager."
                      : "Agency Manager and Case Manager cannot be assigned at this level."}
                  </AlertDescription>
                </Alert>

                {/* Contacts table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Role(s)</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map(contact => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(contact.level)}>
                            {contact.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{contact.levelName}</TableCell>
                        <TableCell>
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline text-sm">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">{contact.phone}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingContact(contact)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Edit Division Sheet */}
      <Sheet open={!!editingDivision} onOpenChange={() => setEditingDivision(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Division</SheetTitle>
          </SheetHeader>
          {editingDivision && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Division Name</Label>
                <Input
                  value={editingDivision.name}
                  onChange={(e) => setEditingDivision({ ...editingDivision, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={editingDivision.address}
                  onChange={(e) => setEditingDivision({ ...editingDivision, address: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editingDivision.phone}
                  onChange={(e) => setEditingDivision({ ...editingDivision, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Primary Contact</Label>
                <Input
                  value={editingDivision.primaryContact}
                  onChange={(e) => setEditingDivision({ ...editingDivision, primaryContact: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveDivision}>Save</Button>
                <Button variant="outline" onClick={() => setEditingDivision(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Bureau Sheet */}
      <Sheet open={!!editingBureau} onOpenChange={() => setEditingBureau(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Bureau</SheetTitle>
          </SheetHeader>
          {editingBureau && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Bureau Name</Label>
                <Input
                  value={editingBureau.name}
                  onChange={(e) => setEditingBureau({ ...editingBureau, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={editingBureau.address}
                  onChange={(e) => setEditingBureau({ ...editingBureau, address: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editingBureau.phone}
                  onChange={(e) => setEditingBureau({ ...editingBureau, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Primary Contact</Label>
                <Input
                  value={editingBureau.primaryContact}
                  onChange={(e) => setEditingBureau({ ...editingBureau, primaryContact: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveBureau}>Save</Button>
                <Button variant="outline" onClick={() => setEditingBureau(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Contact Dialog */}
      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  value={editingContact.role}
                  onValueChange={(value) => setEditingContact({ ...editingContact, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getRoleOptions(editingContact.level).map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveContact}>Save</Button>
                <Button variant="outline" onClick={() => setEditingContact(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
