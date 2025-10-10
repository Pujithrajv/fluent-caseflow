import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Save, 
  Plus, 
  FileDown, 
  Building2, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Shield,
  Clock,
  Power
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string[];
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

interface AuditLog {
  id: string;
  action: string;
  modifiedBy: string;
  modifiedDate: string;
  details: string;
}

export const Dynamics365AgencyDashboard = () => {
  const [isActive, setIsActive] = useState(true);
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
    }
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      action: "Role Assignment",
      modifiedBy: "System Administrator",
      modifiedDate: "2024-03-15 10:30 AM",
      details: "Assigned Case Manager role to Sarah Johnson"
    },
    {
      id: "2",
      action: "Contact Updated",
      modifiedBy: "John Smith",
      modifiedDate: "2024-03-14 02:15 PM",
      details: "Updated phone number for Michael Chen"
    },
    {
      id: "3",
      action: "Status Changed",
      modifiedBy: "System Administrator",
      modifiedDate: "2024-03-13 09:00 AM",
      details: "Agency activated"
    }
  ]);

  const [agencyInfo, setAgencyInfo] = useState({
    name: "Department of Agriculture",
    id: "AGY-001234",
    address1: "500 S 2nd Street",
    address2: "Suite 100",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    division: "Agricultural Services",
    contactPhone: "(217) 785-1234"
  });

  return (
    <div className="space-y-0 bg-muted/20">
      {/* Command Bar - Dynamics 365 Style */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Building2 className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {agencyInfo.name}
              </h1>
              <p className="text-sm text-muted-foreground">ID: {agencyInfo.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Power className="h-4 w-4" />
              Deactivate
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content - Dynamics 365 Style Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <div className="bg-background border-b border-border">
          <TabsList className="h-auto p-0 bg-transparent border-none rounded-none justify-start px-6">
            <TabsTrigger 
              value="info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Agency Information
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger 
              value="roles" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Role Assignment
            </TabsTrigger>
            <TabsTrigger 
              value="delegation" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Delegation
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Agency Information Tab */}
        <TabsContent value="info" className="m-0 p-6">
          <div className="max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">General Information</CardTitle>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="active-toggle" className="text-sm font-medium">
                      Active
                    </Label>
                    <Switch
                      id="active-toggle"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Agency Name
                      </Label>
                      <Input 
                        value={agencyInfo.name}
                        onChange={(e) => setAgencyInfo({...agencyInfo, name: e.target.value})}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Agency ID
                      </Label>
                      <Input 
                        value={agencyInfo.id}
                        disabled
                        className="h-9 bg-muted"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Division
                      </Label>
                      <Select value={agencyInfo.division}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Agricultural Services">Agricultural Services</SelectItem>
                          <SelectItem value="Environmental Services">Environmental Services</SelectItem>
                          <SelectItem value="Public Safety">Public Safety</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Contact Phone
                      </Label>
                      <Input 
                        value={agencyInfo.contactPhone}
                        onChange={(e) => setAgencyInfo({...agencyInfo, contactPhone: e.target.value})}
                        className="h-9"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Address Line 1
                      </Label>
                      <Input 
                        value={agencyInfo.address1}
                        onChange={(e) => setAgencyInfo({...agencyInfo, address1: e.target.value})}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Address Line 2
                      </Label>
                      <Input 
                        value={agencyInfo.address2}
                        onChange={(e) => setAgencyInfo({...agencyInfo, address2: e.target.value})}
                        className="h-9"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                          City
                        </Label>
                        <Input 
                          value={agencyInfo.city}
                          onChange={(e) => setAgencyInfo({...agencyInfo, city: e.target.value})}
                          className="h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                          State
                        </Label>
                        <Input 
                          value={agencyInfo.state}
                          onChange={(e) => setAgencyInfo({...agencyInfo, state: e.target.value})}
                          className="h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                          Zip Code
                        </Label>
                        <Input 
                          value={agencyInfo.zipCode}
                          onChange={(e) => setAgencyInfo({...agencyInfo, zipCode: e.target.value})}
                          className="h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contacts Subgrid */}
        <TabsContent value="contacts" className="m-0 p-6">
          <div className="max-w-full mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Agency Contacts</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Role(s)</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Phone</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id} className="hover:bg-muted/50">
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
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>
                            <Badge
                              variant={contact.status === "Active" ? "default" : "secondary"}
                              className={contact.status === "Active" ? "bg-green-500" : ""}
                            >
                              {contact.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Role Assignment Subgrid */}
        <TabsContent value="roles" className="m-0 p-6">
          <div className="max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-lg">Role Assignment</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-semibold">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${contact.id}-case-manager`}
                              checked={contact.role.includes("Case Manager")}
                            />
                            <Label 
                              htmlFor={`${contact.id}-case-manager`}
                              className="font-normal cursor-pointer"
                            >
                              Case Manager
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${contact.id}-agency-manager`}
                              checked={contact.role.includes("Agency Manager")}
                            />
                            <Label 
                              htmlFor={`${contact.id}-agency-manager`}
                              className="font-normal cursor-pointer"
                            >
                              Agency Manager
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`${contact.id}-agency-user`} />
                            <Label 
                              htmlFor={`${contact.id}-agency-user`}
                              className="font-normal cursor-pointer"
                            >
                              Agency User
                            </Label>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`${contact.id}-fdm`} />
                            <Label 
                              htmlFor={`${contact.id}-fdm`}
                              className="font-normal cursor-pointer"
                            >
                              FDM
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`${contact.id}-attorney`} />
                            <Label 
                              htmlFor={`${contact.id}-attorney`}
                              className="font-normal cursor-pointer"
                            >
                              Attorney
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Delegation Panel */}
        <TabsContent value="delegation" className="m-0 p-6">
          <div className="max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Role Delegation Management</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Delegation
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        User (Delegator)
                      </Label>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select user" />
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
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                        Delegate To (Delegatee)
                      </Label>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select delegate" />
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
                  </div>

                  <div>
                    <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                      Role Being Delegated
                    </Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="case-manager">Case Manager</SelectItem>
                        <SelectItem value="agency-manager">Agency Manager</SelectItem>
                        <SelectItem value="agency-user">Agency User</SelectItem>
                        <SelectItem value="fdm">FDM</SelectItem>
                        <SelectItem value="attorney">Attorney</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Start Date
                      </Label>
                      <Input type="date" className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        End Date
                      </Label>
                      <Input type="date" className="h-9" />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                    <div className="flex gap-2">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Delegation Note</p>
                        <p className="text-xs text-blue-700 mt-1">
                          During the specified period, the delegatee will have full access to perform all duties associated with the selected role.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Log Subgrid */}
        <TabsContent value="audit" className="m-0 p-6">
          <div className="max-w-full mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Audit Log</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Read-only history of all changes and modifications
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold">Action</TableHead>
                        <TableHead className="font-semibold">Modified By</TableHead>
                        <TableHead className="font-semibold">Modified Date</TableHead>
                        <TableHead className="font-semibold">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id} className="bg-muted/20">
                          <TableCell>
                            <Badge variant="outline">{log.action}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{log.modifiedBy}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {log.modifiedDate}
                          </TableCell>
                          <TableCell className="text-sm">{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
