import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, AlertTriangle } from "lucide-react";
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

export function AgencyTest1Screen() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewType>("department");
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedBureauId, setSelectedBureauId] = useState<string | null>(null);
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);
  const [isEditingEntity, setIsEditingEntity] = useState(false);

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
    agencyId: "DNR-2025-001",
    totalDivisions: 3,
    totalBureaus: 7,
    totalContacts: 25
  };

  const divisions: Division[] = [
    { id: "div-1", name: "Office of Forestry", address: "465 Conservation Dr", city: "Springfield", state: "IL", zip: "62701", phone: "(217) 555-2100", primaryContact: "Rachel Evans" },
    { id: "div-2", name: "Office of Oil & Gas Management", address: "12 Energy Way", city: "Springfield", state: "IL", zip: "62702", phone: "(217) 555-2200", primaryContact: "Tom Reyes" },
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
    { id: "c1", firstName: "Laura", lastName: "Chen", role: "Agency Manager", parentEntity: "department", parentEntityType: "department", email: "l.chen@dnr.gov", phone: "(217) 555-1111" },
    { id: "c2", firstName: "Peter", lastName: "Morales", role: "Case Manager", parentEntity: "department", parentEntityType: "department", email: "p.morales@dnr.gov", phone: "(217) 555-1112" },
    { id: "c3", firstName: "Kelly", lastName: "Zhou", role: "Attorney", parentEntity: "department", parentEntityType: "department", email: "k.zhou@dnr.gov", phone: "(217) 555-1113" },
    { id: "c4", firstName: "Rachel", lastName: "Evans", role: "Bureau Manager", parentEntity: "div-1", parentEntityType: "division", email: "r.evans@dnr.gov", phone: "(217) 555-2222" },
    { id: "c5", firstName: "Samuel", lastName: "Green", role: "Staff", parentEntity: "div-1", parentEntityType: "division", email: "s.green@dnr.gov", phone: "(217) 555-2223" },
    { id: "c6", firstName: "Lisa", lastName: "Park", role: "Contact Person", parentEntity: "div-1", parentEntityType: "division", email: "l.park@dnr.gov", phone: "(217) 555-2224" },
    { id: "c7", firstName: "Alan", lastName: "Brooks", role: "Bureau Manager", parentEntity: "bur-1", parentEntityType: "bureau", email: "a.brooks@dnr.gov", phone: "(217) 555-3111" },
    { id: "c8", firstName: "Chloe", lastName: "Matthews", role: "Staff", parentEntity: "bur-1", parentEntityType: "bureau", email: "c.matthews@dnr.gov", phone: "(217) 555-3112" },
    { id: "c9", firstName: "Ian", lastName: "Wallace", role: "Contact Person", parentEntity: "bur-1", parentEntityType: "bureau", email: "i.wallace@dnr.gov", phone: "(217) 555-3113" }
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

  // Department Overview View
  if (currentView === "department") {
    return (
      <div className="space-y-6 p-6 bg-gray-50">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-semibold text-gray-900">{departmentInfo.name}</h1>
          <p className="text-sm text-gray-600 mt-1">Agency ID: {departmentInfo.agencyId}</p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Department Details Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold">Department Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address (Line 1)</Label>
                    <Input 
                      value={departmentForm.address} 
                      onChange={(e) => setDepartmentForm({...departmentForm, address: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">City</Label>
                    <Input 
                      value={departmentForm.city} 
                      onChange={(e) => setDepartmentForm({...departmentForm, city: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">State</Label>
                    <Input 
                      value={departmentForm.state} 
                      onChange={(e) => setDepartmentForm({...departmentForm, state: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ZIP</Label>
                    <Input 
                      value={departmentForm.zip} 
                      onChange={(e) => setDepartmentForm({...departmentForm, zip: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    <Input 
                      value={departmentForm.phone} 
                      onChange={(e) => setDepartmentForm({...departmentForm, phone: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Primary Contact (lookup)</Label>
                    <Input 
                      value={departmentForm.primaryContact} 
                      onChange={(e) => setDepartmentForm({...departmentForm, primaryContact: e.target.value})} 
                      disabled={!isEditingDepartment}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  {!isEditingDepartment ? (
                    <Button onClick={() => setIsEditingDepartment(true)} className="bg-[#0078D4] hover:bg-[#106EBE]">
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSaveDepartment} className="bg-[#0078D4] hover:bg-[#106EBE]">
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditingDepartment(false)}>
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">Department record managed through Dynamics 365.</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Key Metrics */}
          <div>
            <Card className="shadow-sm border">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-sm font-medium text-gray-700">Total Divisions</span>
                    <span className="text-2xl font-bold text-gray-900">{departmentInfo.totalDivisions}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-sm font-medium text-gray-700">Total Bureaus</span>
                    <span className="text-2xl font-bold text-gray-900">{departmentInfo.totalBureaus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Contacts</span>
                    <span className="text-2xl font-bold text-gray-900">{departmentInfo.totalContacts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Divisions List */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Divisions</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#0078D4] hover:bg-[#106EBE]">Create New</Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Division Name</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Primary Contact</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {divisions.map((div) => (
                  <TableRow key={div.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{div.name}</TableCell>
                    <TableCell>{div.city}</TableCell>
                    <TableCell>{div.phone}</TableCell>
                    <TableCell>{div.primaryContact}</TableCell>
                    <TableCell>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => navigateToDivision(div.id)}
                        className="text-[#0078D4] hover:text-[#106EBE]"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department-Level Contacts */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Department-Level Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#0078D4] hover:bg-[#106EBE]">Create New</Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Alert className="m-4 bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Only Department-level contacts can be assigned Agency Manager or Case Manager roles.
              </AlertDescription>
            </Alert>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-blue-100 text-blue-800">{contact.role}</Badge></TableCell>
                    <TableCell className="text-[#0078D4]">{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
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
      <div className="space-y-6 p-6 bg-gray-50">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm border">
          <button onClick={navigateToOverview} className="hover:text-[#0078D4] hover:underline">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={navigateToOverview} className="hover:text-[#0078D4] hover:underline">{departmentInfo.name}</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{division.name}</span>
        </div>

        {/* Division Form */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-semibold">Division Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Input value={division.name} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Address (Address 1)</Label>
                <Input value={division.address} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">City</Label>
                <Input value={division.city} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">State</Label>
                <Input value={division.state} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">ZIP</Label>
                <Input value={division.zip} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                <Input value={division.phone} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Primary Contact (lookup)</Label>
                <Input value={division.primaryContact} disabled={!isEditingEntity} className="mt-1" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {!isEditingEntity ? (
                <Button onClick={() => setIsEditingEntity(true)} className="bg-[#0078D4] hover:bg-[#106EBE]">Edit</Button>
              ) : (
                <>
                  <Button onClick={() => { toast({ title: "Success", description: "Division saved." }); setIsEditingEntity(false); }} className="bg-[#0078D4] hover:bg-[#106EBE]">Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingEntity(false)}>Cancel</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bureaus List */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Bureaus in this Division</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#0078D4] hover:bg-[#106EBE]">Create New</Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Bureau Name</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Primary Contact</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getBureausForDivision(selectedDivisionId).map((bureau) => (
                  <TableRow key={bureau.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{bureau.name}</TableCell>
                    <TableCell>{bureau.city}</TableCell>
                    <TableCell>{bureau.phone}</TableCell>
                    <TableCell>{bureau.primaryContact}</TableCell>
                    <TableCell>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => navigateToBureau(bureau.id)}
                        className="text-[#0078D4] hover:text-[#106EBE]"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Division Contacts */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Division Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#0078D4] hover:bg-[#106EBE]">Create New</Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Alert className="m-4 bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Division/Bureau contacts cannot be assigned Agency Manager or Case Manager.
              </AlertDescription>
            </Alert>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">{contact.role}</Badge></TableCell>
                    <TableCell className="text-[#0078D4]">{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
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
      <div className="space-y-6 p-6 bg-gray-50">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm border">
          <button onClick={navigateToOverview} className="hover:text-[#0078D4] hover:underline">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={navigateToOverview} className="hover:text-[#0078D4] hover:underline">{departmentInfo.name}</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => navigateToDivision(division.id)} className="hover:text-[#0078D4] hover:underline">{division.name}</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{bureau.name}</span>
        </div>

        {/* Bureau Form */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-semibold">Bureau Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Bureau Name</Label>
                <Input value={bureau.name} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Address (Address 1)</Label>
                <Input value={bureau.address} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">City</Label>
                <Input value={bureau.city} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">State</Label>
                <Input value={bureau.state} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">ZIP</Label>
                <Input value={bureau.zip} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                <Input value={bureau.phone} disabled={!isEditingEntity} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Primary Contact (lookup)</Label>
                <Input value={bureau.primaryContact} disabled={!isEditingEntity} className="mt-1" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {!isEditingEntity ? (
                <Button onClick={() => setIsEditingEntity(true)} className="bg-[#0078D4] hover:bg-[#106EBE]">Edit</Button>
              ) : (
                <>
                  <Button onClick={() => { toast({ title: "Success", description: "Bureau saved." }); setIsEditingEntity(false); }} className="bg-[#0078D4] hover:bg-[#106EBE]">Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingEntity(false)}>Cancel</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bureau Contacts */}
        <Card className="shadow-sm border">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Bureau Contacts</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#0078D4] hover:bg-[#106EBE]">Create New</Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Deactivate</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Alert className="m-4 bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Roles available at Bureau: Bureau Manager, Staff, Contact Person.
              </AlertDescription>
            </Alert>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getContactsForCurrentView().map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-purple-100 text-purple-800">{contact.role}</Badge></TableCell>
                    <TableCell className="text-[#0078D4]">{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
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
