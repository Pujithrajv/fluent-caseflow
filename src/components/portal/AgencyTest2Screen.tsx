import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, Plus, Edit, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  parentEntity: string;
  parentEntityType: "department" | "division" | "bureau";
  email: string;
  phone: string;
  status: string;
}

interface Bureau {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  primaryContact: string;
  divisionId: string;
}

interface Division {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  primaryContact: string;
}

type ViewType = "department" | "division" | "bureau";

export function AgencyTest2Screen() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewType>("department");
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedBureauId, setSelectedBureauId] = useState<string | null>(null);
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);
  const [isEditingEntity, setIsEditingEntity] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);

  const [departmentForm, setDepartmentForm] = useState({
    address: "465 Conservation Drive",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    phone: "(217) 555-1000",
    primaryContact: "Laura Chen"
  });

  const departmentInfo = {
    name: "Department of Natural Resources",
    agencyId: "DNR-2025-001"
  };

  const divisions: Division[] = [
    { id: "div-1", name: "Office of Forestry", address: "465 Conservation Dr", city: "Springfield", state: "IL", zip: "62701", phone: "(217) 555-2100", primaryContact: "Rachel Evans" },
    { id: "div-2", name: "Office of Oil & Gas Resource Management", address: "12 Energy Way", city: "Springfield", state: "IL", zip: "62702", phone: "(217) 555-2200", primaryContact: "Tom Reyes" },
    { id: "div-3", name: "Office of Water Resources", address: "77 River Rd", city: "Springfield", state: "IL", zip: "62703", phone: "(217) 555-2300", primaryContact: "Priya Nair" }
  ];

  const bureaus: Bureau[] = [
    { id: "bur-1", divisionId: "div-1", name: "Bureau of Timber Licensing", address: "101 Pine St", city: "Springfield", state: "IL", zip: "62701", phone: "(217) 555-3111", primaryContact: "Alan Brooks" },
    { id: "bur-2", divisionId: "div-1", name: "Bureau of Wildlife", address: "55 Habitat Ln", city: "Springfield", state: "IL", zip: "62701", phone: "(217) 555-3121", primaryContact: "Dana West" },
    { id: "bur-3", divisionId: "div-1", name: "Bureau of Conservation Services", address: "9 Preserve Ct", city: "Springfield", state: "IL", zip: "62701", phone: "(217) 555-3131", primaryContact: "Maria Stone" },
    { id: "bur-4", divisionId: "div-2", name: "Bureau of Drilling Oversight", address: "22 Rig Rd", city: "Springfield", state: "IL", zip: "62702", phone: "(217) 555-3211", primaryContact: "Carla Jenkins" },
    { id: "bur-5", divisionId: "div-2", name: "Bureau of Energy Safety", address: "40 Pipeline Dr", city: "Springfield", state: "IL", zip: "62702", phone: "(217) 555-3222", primaryContact: "Nathan Yates" },
    { id: "bur-6", divisionId: "div-3", name: "Bureau of Flood Management", address: "90 Basin Blvd", city: "Springfield", state: "IL", zip: "62703", phone: "(217) 555-3311", primaryContact: "Jacob Miller" },
    { id: "bur-7", divisionId: "div-3", name: "Bureau of Irrigation", address: "101 Canal St", city: "Springfield", state: "IL", zip: "62703", phone: "(217) 555-3322", primaryContact: "Sophia Clark" }
  ];

  const [contacts] = useState<Contact[]>([
    { id: "c1", firstName: "Laura", lastName: "Chen", role: "Agency Manager", parentEntity: "department", parentEntityType: "department", email: "l.chen@dnr.gov", phone: "(217) 555-1111", status: "Active" },
    { id: "c2", firstName: "Peter", lastName: "Morales", role: "Case Manager", parentEntity: "department", parentEntityType: "department", email: "p.morales@dnr.gov", phone: "(217) 555-1112", status: "Active" },
    { id: "c3", firstName: "Kelly", lastName: "Zhou", role: "Attorney", parentEntity: "department", parentEntityType: "department", email: "k.zhou@dnr.gov", phone: "(217) 555-1113", status: "Active" },
    { id: "c4", firstName: "Rachel", lastName: "Evans", role: "Bureau Manager", parentEntity: "div-1", parentEntityType: "division", email: "r.evans@dnr.gov", phone: "(217) 555-2222", status: "Active" },
    { id: "c5", firstName: "Samuel", lastName: "Green", role: "Staff", parentEntity: "div-1", parentEntityType: "division", email: "s.green@dnr.gov", phone: "(217) 555-2223", status: "Active" },
    { id: "c6", firstName: "Lisa", lastName: "Park", role: "Contact Person", parentEntity: "div-1", parentEntityType: "division", email: "l.park@dnr.gov", phone: "(217) 555-2224", status: "Active" },
    { id: "c7", firstName: "Alan", lastName: "Brooks", role: "Bureau Manager", parentEntity: "bur-1", parentEntityType: "bureau", email: "a.brooks@dnr.gov", phone: "(217) 555-3111", status: "Active" },
    { id: "c8", firstName: "Chloe", lastName: "Matthews", role: "Staff", parentEntity: "bur-1", parentEntityType: "bureau", email: "c.matthews@dnr.gov", phone: "(217) 555-3112", status: "Active" },
    { id: "c9", firstName: "Ian", lastName: "Wallace", role: "Contact Person", parentEntity: "bur-1", parentEntityType: "bureau", email: "i.wallace@dnr.gov", phone: "(217) 555-3113", status: "Active" }
  ]);

  const navigateToDivision = (divisionId: string) => {
    setSelectedDivisionId(divisionId);
    setCurrentView("division");
  };

  const navigateToBureau = (bureauId: string) => {
    setSelectedBureauId(bureauId);
    setCurrentView("bureau");
  };

  const navigateToOverview = () => {
    setCurrentView("department");
    setSelectedDivisionId(null);
    setSelectedBureauId(null);
  };

  const getContactsForCurrentView = () => {
    if (currentView === "department") {
      return contacts.filter(c => c.parentEntityType === "department");
    } else if (currentView === "division" && selectedDivisionId) {
      return contacts.filter(c => c.parentEntity === selectedDivisionId);
    } else if (currentView === "bureau" && selectedBureauId) {
      return contacts.filter(c => c.parentEntity === selectedBureauId);
    }
    return [];
  };

  const getCurrentDivision = () => divisions.find(d => d.id === selectedDivisionId);
  const getCurrentBureau = () => bureaus.find(b => b.id === selectedBureauId);
  const getBureausForDivision = (divId: string) => bureaus.filter(b => b.divisionId === divId);

  const handleSaveDepartment = () => {
    toast({ title: "Success", description: "Department details saved successfully." });
    setIsEditingDepartment(false);
  };

  const handleDeactivateContact = () => {
    toast({ title: "Success", description: "Contact has been deactivated." });
  };

  // Department Overview View
  if (currentView === "department") {
    return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{departmentInfo.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Agency ID: {departmentInfo.agencyId}</p>
        </div>

        {/* Department Details Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Department Details</CardTitle>
              {!isEditingDepartment && (
                <Button variant="outline" size="sm" onClick={() => setIsEditingDepartment(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Address (Address 1 Street)</Label>
                <Input value={departmentForm.address} onChange={(e) => setDepartmentForm({...departmentForm, address: e.target.value})} disabled={!isEditingDepartment} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={departmentForm.city} onChange={(e) => setDepartmentForm({...departmentForm, city: e.target.value})} disabled={!isEditingDepartment} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={departmentForm.state} onChange={(e) => setDepartmentForm({...departmentForm, state: e.target.value})} disabled={!isEditingDepartment} />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input value={departmentForm.zip} onChange={(e) => setDepartmentForm({...departmentForm, zip: e.target.value})} disabled={!isEditingDepartment} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={departmentForm.phone} onChange={(e) => setDepartmentForm({...departmentForm, phone: e.target.value})} disabled={!isEditingDepartment} />
              </div>
              <div>
                <Label>Primary Contact (lookup to Contact)</Label>
                <Input value={departmentForm.primaryContact} onChange={(e) => setDepartmentForm({...departmentForm, primaryContact: e.target.value})} disabled={!isEditingDepartment} />
              </div>
            </div>
            {isEditingDepartment && (
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveDepartment}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingDepartment(false)}>Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Divisions List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Divisions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Create New</Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" size="sm">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Division Name</TableHead>
                  <TableHead>Address (City)</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {divisions.map((div) => (
                  <TableRow key={div.id}>
                    <TableCell className="font-medium">{div.name}</TableCell>
                    <TableCell>{div.city}</TableCell>
                    <TableCell>{div.phone}</TableCell>
                    <TableCell>{div.primaryContact}</TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" onClick={() => navigateToDivision(div.id)}>
                        Open Division Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Department Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setIsAddingContact(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" size="sm">Deactivate</Button>
              </div>
            </div>
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Only department-level contacts can be assigned "Agency Manager" or "Case Manager."
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Role (Choice)</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary">{contact.role}</Badge></TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell><Badge>{contact.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Division Details View
  if (currentView === "division" && selectedDivisionId) {
    const division = getCurrentDivision();
    if (!division) return null;

    return (
      <div className="space-y-6 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={navigateToOverview} className="hover:text-foreground">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={navigateToOverview} className="hover:text-foreground">{departmentInfo.name}</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{division.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground">{division.name}</h1>

        {/* Division Details Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Division Details</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditingEntity(!isEditingEntity)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Division Name</Label>
                <Input value={division.name} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Address (Address 1 Street)</Label>
                <Input value={division.address} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={division.city} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={division.state} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input value={division.zip} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={division.phone} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Primary Contact (lookup to Contact)</Label>
                <Input value={division.primaryContact} disabled={!isEditingEntity} />
              </div>
            </div>
            {isEditingEntity && (
              <div className="flex gap-2 mt-4">
                <Button onClick={() => { toast({ title: "Success", description: "Division saved." }); setIsEditingEntity(false); }}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingEntity(false)}>Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bureaus List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bureaus in this Division</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Create New</Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" size="sm">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bureau Name</TableHead>
                  <TableHead>Address (City)</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getBureausForDivision(selectedDivisionId).map((bureau) => (
                  <TableRow key={bureau.id}>
                    <TableCell className="font-medium">{bureau.name}</TableCell>
                    <TableCell>{bureau.city}</TableCell>
                    <TableCell>{bureau.phone}</TableCell>
                    <TableCell>{bureau.primaryContact}</TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" onClick={() => navigateToBureau(bureau.id)}>
                        Open Bureau Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Division Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Division Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Create New</Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" size="sm">Deactivate</Button>
              </div>
            </div>
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Division/Bureau contacts cannot be assigned "Agency Manager" or "Case Manager."
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary">{contact.role}</Badge></TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell><Badge>{contact.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Bureau Details View
  if (currentView === "bureau" && selectedBureauId) {
    const bureau = getCurrentBureau();
    const division = getCurrentDivision();
    if (!bureau || !division) return null;

    return (
      <div className="space-y-6 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={navigateToOverview} className="hover:text-foreground">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={navigateToOverview} className="hover:text-foreground">{departmentInfo.name}</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => navigateToDivision(division.id)} className="hover:text-foreground">{division.name}</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{bureau.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground">{bureau.name}</h1>

        {/* Bureau Details Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bureau Details</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditingEntity(!isEditingEntity)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Bureau Name</Label>
                <Input value={bureau.name} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Address (Address 1 Street)</Label>
                <Input value={bureau.address} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={bureau.city} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={bureau.state} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input value={bureau.zip} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={bureau.phone} disabled={!isEditingEntity} />
              </div>
              <div>
                <Label>Primary Contact (lookup to Contact)</Label>
                <Input value={bureau.primaryContact} disabled={!isEditingEntity} />
              </div>
            </div>
            {isEditingEntity && (
              <div className="flex gap-2 mt-4">
                <Button onClick={() => { toast({ title: "Success", description: "Bureau saved." }); setIsEditingEntity(false); }}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingEntity(false)}>Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bureau Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bureau Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Create New</Button>
                <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" size="sm">Deactivate</Button>
              </div>
            </div>
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Roles available at Bureau: Bureau Manager, Staff, Contact Person (not Agency/Case Manager).
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary">{contact.role}</Badge></TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell><Badge>{contact.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
