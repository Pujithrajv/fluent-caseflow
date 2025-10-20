import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Building2, Edit, ExternalLink, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
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
  const [selectedBureau, setSelectedBureau] = useState<string | null>(null);
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set());
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);
  const [editingBureau, setEditingBureau] = useState<Bureau | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Mock data
  const [divisions, setDivisions] = useState<Division[]>([
    {
      id: "div-1",
      name: "Office of Forestry",
      address: "465 Conservation Dr., Springfield, IL 62701",
      phone: "(217) 555-2100",
      primaryContact: "Rachel Evans",
      bureausCount: 3
    },
    {
      id: "div-2",
      name: "Office of Oil & Gas Resource Management",
      address: "12 Energy Way, Springfield, IL 62702",
      phone: "(217) 555-2200",
      primaryContact: "Tom Reyes",
      bureausCount: 2
    },
    {
      id: "div-3",
      name: "Office of Water Resources",
      address: "77 River Rd, Springfield, IL 62703",
      phone: "(217) 555-2300",
      primaryContact: "Priya Nair",
      bureausCount: 2
    }
  ]);

  const [bureaus, setBureaus] = useState<Bureau[]>([
    // Office of Forestry bureaus
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
    // Office of Oil & Gas bureaus
    {
      id: "bur-4",
      divisionId: "div-2",
      name: "Bureau of Drilling Oversight",
      address: "22 Rig Rd, Springfield, IL",
      phone: "(217) 555-3211",
      primaryContact: "Carla Jenkins"
    },
    {
      id: "bur-5",
      divisionId: "div-2",
      name: "Bureau of Energy Safety",
      address: "40 Pipeline Dr, Springfield, IL",
      phone: "(217) 555-3222",
      primaryContact: "Nathan Yates"
    },
    // Office of Water Resources bureaus
    {
      id: "bur-6",
      divisionId: "div-3",
      name: "Bureau of Flood Management",
      address: "90 Basin Blvd, Springfield, IL",
      phone: "(217) 555-3311",
      primaryContact: "Jacob Miller"
    },
    {
      id: "bur-7",
      divisionId: "div-3",
      name: "Bureau of Irrigation",
      address: "101 Canal St, Springfield, IL",
      phone: "(217) 555-3322",
      primaryContact: "Sophia Clark"
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    // Department level contacts
    {
      id: "c-dept-1",
      name: "Laura Chen",
      role: "Agency Manager",
      level: "department",
      levelName: "Department",
      email: "l.chen@dnr.gov",
      phone: "(217) 555-1111"
    },
    {
      id: "c-dept-2",
      name: "Peter Morales",
      role: "Case Manager",
      level: "department",
      levelName: "Department",
      email: "p.morales@dnr.gov",
      phone: "(217) 555-1112"
    },
    
    // Office of Forestry (Division) contacts
    {
      id: "c-div1-1",
      name: "Rachel Evans",
      role: "Bureau Manager",
      level: "division",
      levelName: "Office of Forestry",
      email: "r.evans@dnr.gov",
      phone: "(217) 555-2222"
    },
    {
      id: "c-div1-2",
      name: "Samuel Green",
      role: "Senior Analyst",
      level: "division",
      levelName: "Office of Forestry",
      email: "s.green@dnr.gov",
      phone: "(217) 555-2223"
    },
    {
      id: "c-div1-3",
      name: "Lisa Park",
      role: "Administrative Staff",
      level: "division",
      levelName: "Office of Forestry",
      email: "l.park@dnr.gov",
      phone: "(217) 555-2224"
    },
    
    // Bureau of Timber Licensing contacts
    {
      id: "c-bur1-1",
      name: "Alan Brooks",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Timber Licensing",
      email: "a.brooks@dnr.gov",
      phone: "(217) 555-3111"
    },
    {
      id: "c-bur1-2",
      name: "Chloe Matthews",
      role: "Licensing Officer",
      level: "bureau",
      levelName: "Bureau of Timber Licensing",
      email: "c.matthews@dnr.gov",
      phone: "(217) 555-3112"
    },
    {
      id: "c-bur1-3",
      name: "Ian Wallace",
      role: "Compliance Clerk",
      level: "bureau",
      levelName: "Bureau of Timber Licensing",
      email: "i.wallace@dnr.gov",
      phone: "(217) 555-3113"
    },
    
    // Bureau of Wildlife contacts
    {
      id: "c-bur2-1",
      name: "Dana West",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Wildlife",
      email: "d.west@dnr.gov",
      phone: "(217) 555-3121"
    },
    {
      id: "c-bur2-2",
      name: "Olivia Tran",
      role: "Field Biologist",
      level: "bureau",
      levelName: "Bureau of Wildlife",
      email: "o.tran@dnr.gov",
      phone: "(217) 555-3122"
    },
    {
      id: "c-bur2-3",
      name: "Ethan Reid",
      role: "Support Specialist",
      level: "bureau",
      levelName: "Bureau of Wildlife",
      email: "e.reid@dnr.gov",
      phone: "(217) 555-3123"
    },
    
    // Bureau of Conservation Services contacts
    {
      id: "c-bur3-1",
      name: "Maria Stone",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Conservation Services",
      email: "m.stone@dnr.gov",
      phone: "(217) 555-3131"
    },
    {
      id: "c-bur3-2",
      name: "Kevin Hughes",
      role: "Policy Analyst",
      level: "bureau",
      levelName: "Bureau of Conservation Services",
      email: "k.hughes@dnr.gov",
      phone: "(217) 555-3132"
    },
    {
      id: "c-bur3-3",
      name: "Amy Patel",
      role: "Records Officer",
      level: "bureau",
      levelName: "Bureau of Conservation Services",
      email: "a.patel@dnr.gov",
      phone: "(217) 555-3133"
    },
    
    // Office of Oil & Gas Resource Management (Division) contacts
    {
      id: "c-div2-1",
      name: "Tom Reyes",
      role: "Bureau Manager",
      level: "division",
      levelName: "Office of Oil & Gas Resource Management",
      email: "t.reyes@dnr.gov",
      phone: "(217) 555-2201"
    },
    {
      id: "c-div2-2",
      name: "Zoe Kim",
      role: "Environmental Engineer",
      level: "division",
      levelName: "Office of Oil & Gas Resource Management",
      email: "z.kim@dnr.gov",
      phone: "(217) 555-2202"
    },
    {
      id: "c-div2-3",
      name: "Liam Foster",
      role: "Policy Advisor",
      level: "division",
      levelName: "Office of Oil & Gas Resource Management",
      email: "l.foster@dnr.gov",
      phone: "(217) 555-2203"
    },
    
    // Bureau of Drilling Oversight contacts
    {
      id: "c-bur4-1",
      name: "Carla Jenkins",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Drilling Oversight",
      email: "c.jenkins@dnr.gov",
      phone: "(217) 555-3211"
    },
    {
      id: "c-bur4-2",
      name: "Derek Hall",
      role: "Safety Inspector",
      level: "bureau",
      levelName: "Bureau of Drilling Oversight",
      email: "d.hall@dnr.gov",
      phone: "(217) 555-3212"
    },
    {
      id: "c-bur4-3",
      name: "Emily Wu",
      role: "Geology Analyst",
      level: "bureau",
      levelName: "Bureau of Drilling Oversight",
      email: "e.wu@dnr.gov",
      phone: "(217) 555-3213"
    },
    
    // Bureau of Energy Safety contacts
    {
      id: "c-bur5-1",
      name: "Nathan Yates",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Energy Safety",
      email: "n.yates@dnr.gov",
      phone: "(217) 555-3221"
    },
    {
      id: "c-bur5-2",
      name: "Marcus Grant",
      role: "Energy Compliance Officer",
      level: "bureau",
      levelName: "Bureau of Energy Safety",
      email: "m.grant@dnr.gov",
      phone: "(217) 555-3222"
    },
    {
      id: "c-bur5-3",
      name: "Sarah Owens",
      role: "Technical Coordinator",
      level: "bureau",
      levelName: "Bureau of Energy Safety",
      email: "s.owens@dnr.gov",
      phone: "(217) 555-3223"
    },
    
    // Office of Water Resources (Division) contacts
    {
      id: "c-div3-1",
      name: "Priya Nair",
      role: "Bureau Manager",
      level: "division",
      levelName: "Office of Water Resources",
      email: "p.nair@dnr.gov",
      phone: "(217) 555-2301"
    },
    {
      id: "c-div3-2",
      name: "Henry Scott",
      role: "Hydrologist",
      level: "division",
      levelName: "Office of Water Resources",
      email: "h.scott@dnr.gov",
      phone: "(217) 555-2302"
    },
    {
      id: "c-div3-3",
      name: "Grace Lee",
      role: "Environmental Analyst",
      level: "division",
      levelName: "Office of Water Resources",
      email: "g.lee@dnr.gov",
      phone: "(217) 555-2303"
    },
    
    // Bureau of Flood Management contacts
    {
      id: "c-bur6-1",
      name: "Jacob Miller",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Flood Management",
      email: "j.miller@dnr.gov",
      phone: "(217) 555-3311"
    },
    {
      id: "c-bur6-2",
      name: "Natalie Brooks",
      role: "Civil Engineer",
      level: "bureau",
      levelName: "Bureau of Flood Management",
      email: "n.brooks@dnr.gov",
      phone: "(217) 555-3312"
    },
    {
      id: "c-bur6-3",
      name: "Victor Chang",
      role: "GIS Specialist",
      level: "bureau",
      levelName: "Bureau of Flood Management",
      email: "v.chang@dnr.gov",
      phone: "(217) 555-3313"
    },
    
    // Bureau of Irrigation contacts
    {
      id: "c-bur7-1",
      name: "Sophia Clark",
      role: "Bureau Manager",
      level: "bureau",
      levelName: "Bureau of Irrigation",
      email: "s.clark@dnr.gov",
      phone: "(217) 555-3321"
    },
    {
      id: "c-bur7-2",
      name: "Daniel Ross",
      role: "Field Technician",
      level: "bureau",
      levelName: "Bureau of Irrigation",
      email: "d.ross@dnr.gov",
      phone: "(217) 555-3322"
    },
    {
      id: "c-bur7-3",
      name: "Emma Price",
      role: "Data Analyst",
      level: "bureau",
      levelName: "Bureau of Irrigation",
      email: "e.price@dnr.gov",
      phone: "(217) 555-3323"
    }
  ]);

  const departmentInfo = {
    name: "Department of Natural Resources",
    agencyId: "DNR-2025-001",
    address: "465 Conservation Drive, Springfield, IL 62701",
    phone: "(217) 555-1000",
    primaryContact: "Laura Chen",
    totalDivisions: 3,
    totalContacts: 25
  };

  const toggleDivision = (divisionId: string) => {
    const newExpanded = new Set(expandedDivisions);
    if (newExpanded.has(divisionId)) {
      newExpanded.delete(divisionId);
      if (selectedDivision === divisionId) {
        setSelectedDivision(null);
        setSelectedBureau(null);
      }
    } else {
      newExpanded.add(divisionId);
    }
    setExpandedDivisions(newExpanded);
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

  const getContactsForLevel = () => {
    if (selectedBureau) {
      const bureau = bureaus.find(b => b.id === selectedBureau);
      return contacts.filter(c => c.level === "bureau" && c.levelName === bureau?.name);
    }
    if (selectedDivision) {
      const division = divisions.find(d => d.id === selectedDivision);
      return contacts.filter(c => c.level === "division" && c.levelName === division?.name);
    }
    return contacts.filter(c => c.level === "department");
  };

  const filteredContacts = getContactsForLevel();
  const selectedDivisionBureaus = selectedDivision
    ? bureaus.filter(b => b.divisionId === selectedDivision)
    : [];

  const getContactCount = (level: "department" | "division" | "bureau", id?: string) => {
    if (level === "department") return contacts.filter(c => c.level === "department").length;
    if (level === "division" && id) {
      const division = divisions.find(d => d.id === id);
      return contacts.filter(c => c.level === "division" && c.levelName === division?.name).length;
    }
    if (level === "bureau" && id) {
      const bureau = bureaus.find(b => b.id === id);
      return contacts.filter(c => c.level === "bureau" && c.levelName === bureau?.name).length;
    }
    return 0;
  };

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

  const getCurrentLevelName = () => {
    if (selectedBureau) {
      const bureau = bureaus.find(b => b.id === selectedBureau);
      return `Bureau: ${bureau?.name}`;
    }
    if (selectedDivision) {
      const division = divisions.find(d => d.id === selectedDivision);
      return `Division: ${division?.name}`;
    }
    return "Department";
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
            Agency ID: {departmentInfo.agencyId} • <Button variant="link" className="p-0 h-auto text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              View in CRM
            </Button>
          </p>
        </div>
      </div>

      {/* Two-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left pane: Organization */}
        <div className="space-y-6">
          {/* Department Card */}
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Address</Label>
                  <p className="text-sm mt-1">{departmentInfo.address}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Phone</Label>
                  <p className="text-sm mt-1">{departmentInfo.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Primary Contact</Label>
                  <p className="text-sm mt-1">{departmentInfo.primaryContact}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Total Divisions</Label>
                  <p className="text-sm mt-1">{departmentInfo.totalDivisions}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Total Contacts</Label>
                  <p className="text-sm mt-1">{departmentInfo.totalContacts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Divisions & Bureaus Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Department Structure</CardTitle>
              <CardDescription>Divisions and Bureaus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {divisions.map(division => (
                <div key={division.id} className="space-y-2">
                  {/* Division Row */}
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDivision === division.id && !selectedBureau
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setSelectedDivision(division.id);
                      setSelectedBureau(null);
                      toggleDivision(division.id);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {expandedDivisions.has(division.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div>
                          <p className="font-semibold text-sm">{division.name}</p>
                          <p className="text-xs text-muted-foreground">{division.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {getContactCount("division", division.id)} contacts
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bureaus.filter(b => b.divisionId === division.id).length} bureaus
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingDivision(division);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Bureaus (nested) */}
                  {expandedDivisions.has(division.id) && (
                    <div className="ml-6 space-y-2">
                      {bureaus
                        .filter(b => b.divisionId === division.id)
                        .map(bureau => (
                          <div
                            key={bureau.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedBureau === bureau.id
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => {
                              setSelectedBureau(bureau.id);
                              setSelectedDivision(division.id);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{bureau.name}</p>
                                <p className="text-xs text-muted-foreground">{bureau.address}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {getContactCount("bureau", bureau.id)} contacts
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingBureau(bureau);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right pane: Contacts & Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Contacts & Roles</CardTitle>
            <CardDescription>
              Viewing: <span className="font-semibold">{getCurrentLevelName()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role rules alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Agency Manager and Case Manager roles are restricted to the Department level only.</strong>
                {(selectedDivision || selectedBureau) && (
                  <span className="block mt-1 text-xs">
                    Contacts at this level can only be assigned: Bureau Manager, Staff, Contact Person
                  </span>
                )}
              </AlertDescription>
            </Alert>

            {/* Contacts table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(contact.level)}>
                            {contact.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline text-sm">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">{contact.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </TableCell>
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No contacts assigned to this level
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <Button variant="outline" className="w-full">
              + Add Contact to {getCurrentLevelName()}
            </Button>
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
