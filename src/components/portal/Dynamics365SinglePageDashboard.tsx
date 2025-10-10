import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, FileDown, UserPlus, XCircle, Edit, Trash2, Eye } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  roles: string[];
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

interface Delegation {
  id: string;
  delegatee: string;
  startDate: string;
  endDate: string;
  rolesCovered: string[];
  status: "Active" | "Upcoming" | "Expired";
}

interface AuditEntry {
  id: string;
  date: string;
  modifiedBy: string;
  changeSummary: string;
}

export const Dynamics365SinglePageDashboard = () => {
  const [agencyStatus, setAgencyStatus] = useState<boolean>(true);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddDelegationOpen, setIsAddDelegationOpen] = useState(false);
  
  const [agencyInfo, setAgencyInfo] = useState({
    name: "Department of Agriculture",
    id: "AGR-2025-001",
    address: "123 Government Street",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    division: "Agricultural Compliance",
    primaryContact: "John Smith",
    phone: "(217) 555-0100",
    dateCreated: "2024-01-15",
    lastModified: "2025-10-08"
  });

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      roles: ["Agency Manager", "Case Manager"],
      email: "j.smith@agr.gov",
      phone: "(217) 555-0101",
      status: "Active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      roles: ["Case Manager"],
      email: "s.johnson@agr.gov",
      phone: "(217) 555-0102",
      status: "Active"
    },
    {
      id: "3",
      name: "Michael Davis",
      roles: ["Attorney"],
      email: "m.davis@agr.gov",
      phone: "(217) 555-0103",
      status: "Active"
    }
  ]);

  const [delegations, setDelegations] = useState<Delegation[]>([
    {
      id: "1",
      delegatee: "Sarah Johnson",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      rolesCovered: ["Agency Manager"],
      status: "Active"
    }
  ]);

  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([
    {
      id: "1",
      date: "2025-10-08 14:30",
      modifiedBy: "John Smith",
      changeSummary: "Updated agency phone number"
    },
    {
      id: "2",
      date: "2025-10-05 09:15",
      modifiedBy: "Sarah Johnson",
      changeSummary: "Added new contact: Michael Davis"
    },
    {
      id: "3",
      date: "2025-10-01 11:00",
      modifiedBy: "John Smith",
      changeSummary: "Created delegation for Sarah Johnson"
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    roles: [] as string[]
  });

  const [newDelegation, setNewDelegation] = useState({
    delegatee: "",
    startDate: "",
    endDate: "",
    rolesCovered: [] as string[]
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || newContact.roles.length === 0) {
      return;
    }
    
    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      roles: newContact.roles,
      email: newContact.email,
      phone: newContact.phone,
      status: "Active"
    };
    
    setContacts([...contacts, contact]);
    setNewContact({ name: "", email: "", phone: "", roles: [] });
    setIsAddContactOpen(false);
  };

  const handleAddDelegation = () => {
    if (!newDelegation.delegatee || !newDelegation.startDate || !newDelegation.endDate) {
      return;
    }

    const delegation: Delegation = {
      id: Date.now().toString(),
      delegatee: newDelegation.delegatee,
      startDate: newDelegation.startDate,
      endDate: newDelegation.endDate,
      rolesCovered: newDelegation.rolesCovered,
      status: "Upcoming"
    };

    setDelegations([...delegations, delegation]);
    setNewDelegation({ delegatee: "", startDate: "", endDate: "", rolesCovered: [] });
    setIsAddDelegationOpen(false);
  };

  const availableRoles = ["Agency Manager", "Case Manager", "Attorney", "FDM", "Agency User"];

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Inactive: "bg-gray-100 text-gray-800 border-gray-200",
      Upcoming: "bg-blue-100 text-blue-800 border-blue-200",
      Expired: "bg-red-100 text-red-800 border-red-200"
    };
    return variants[status as keyof typeof variants] || variants.Inactive;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Command Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <XCircle className="h-4 w-4 mr-2" />
                Deactivate
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsAddContactOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Audit Log
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Header Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  {agencyInfo.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Agency ID: {agencyInfo.id}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Label htmlFor="agency-status" className="text-sm font-medium">
                  Status
                </Label>
                <Switch
                  id="agency-status"
                  checked={agencyStatus}
                  onCheckedChange={setAgencyStatus}
                />
                <Badge className={agencyStatus ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {agencyStatus ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Agency Information Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Agency Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={agencyInfo.address}
                    onChange={(e) => setAgencyInfo({ ...agencyInfo, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={agencyInfo.city}
                      onChange={(e) => setAgencyInfo({ ...agencyInfo, city: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={agencyInfo.state}
                      onChange={(e) => setAgencyInfo({ ...agencyInfo, state: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    value={agencyInfo.zip}
                    onChange={(e) => setAgencyInfo({ ...agencyInfo, zip: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="division" className="text-sm font-medium text-gray-700">
                    Division / Department
                  </Label>
                  <Select value={agencyInfo.division} onValueChange={(value) => setAgencyInfo({ ...agencyInfo, division: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agricultural Compliance">Agricultural Compliance</SelectItem>
                      <SelectItem value="Environmental Services">Environmental Services</SelectItem>
                      <SelectItem value="Legal Affairs">Legal Affairs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="primary-contact" className="text-sm font-medium text-gray-700">
                    Primary Contact
                  </Label>
                  <Select value={agencyInfo.primaryContact} onValueChange={(value) => setAgencyInfo({ ...agencyInfo, primaryContact: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.name}>
                          {contact.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Agency Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={agencyInfo.phone}
                    onChange={(e) => setAgencyInfo({ ...agencyInfo, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Date Created</Label>
                    <p className="text-sm text-gray-500 mt-1">{agencyInfo.dateCreated}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Last Modified</Label>
                    <p className="text-sm text-gray-500 mt-1">{agencyInfo.lastModified}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Management Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Contacts Management</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsAddContactOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Contact
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm text-blue-800">
                ℹ️ You can only edit contacts within your agency.
              </p>
            </div>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Role(s)</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.roles.map((role, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(contact.status)}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
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

        {/* Delegation Management Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Delegation Management</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsAddDelegationOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Delegation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Assign a temporary delegate for managerial duties during your absence.
            </p>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Delegatee</TableHead>
                    <TableHead className="font-semibold">Start Date</TableHead>
                    <TableHead className="font-semibold">End Date</TableHead>
                    <TableHead className="font-semibold">Roles Covered</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delegations.map((delegation) => (
                    <TableRow key={delegation.id}>
                      <TableCell className="font-medium">{delegation.delegatee}</TableCell>
                      <TableCell>{delegation.startDate}</TableCell>
                      <TableCell>{delegation.endDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {delegation.rolesCovered.map((role, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(delegation.status)}>
                          {delegation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4">
              <p className="text-sm text-yellow-800">
                ⚠️ End Date must be after Start Date.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Audit Trail</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View modification history for this agency.
            </p>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Modified By</TableHead>
                    <TableHead className="font-semibold">Change Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrail.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.date}</TableCell>
                      <TableCell>{entry.modifiedBy}</TableCell>
                      <TableCell>{entry.changeSummary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Contact Modal */}
      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="contact-name" className="text-sm font-medium">
                Name <span className="text-red-600">*</span>
              </Label>
              <Input
                id="contact-name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-sm font-medium">
                Email <span className="text-red-600">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input
                id="contact-phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Roles <span className="text-red-600">*</span>
              </Label>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={newContact.roles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewContact({ ...newContact, roles: [...newContact.roles, role] });
                        } else {
                          setNewContact({ ...newContact, roles: newContact.roles.filter((r) => r !== role) });
                        }
                      }}
                    />
                    <Label htmlFor={`role-${role}`} className="text-sm font-normal">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContact}>
              Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Delegation Modal */}
      <Dialog open={isAddDelegationOpen} onOpenChange={setIsAddDelegationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Delegation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="delegatee" className="text-sm font-medium">
                Delegatee <span className="text-red-600">*</span>
              </Label>
              <Select value={newDelegation.delegatee} onValueChange={(value) => setNewDelegation({ ...newDelegation, delegatee: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.name}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date" className="text-sm font-medium">
                  Start Date <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={newDelegation.startDate}
                  onChange={(e) => setNewDelegation({ ...newDelegation, startDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-sm font-medium">
                  End Date <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newDelegation.endDate}
                  onChange={(e) => setNewDelegation({ ...newDelegation, endDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Roles Covered
              </Label>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`delegation-role-${role}`}
                      checked={newDelegation.rolesCovered.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewDelegation({ ...newDelegation, rolesCovered: [...newDelegation.rolesCovered, role] });
                        } else {
                          setNewDelegation({ ...newDelegation, rolesCovered: newDelegation.rolesCovered.filter((r) => r !== role) });
                        }
                      }}
                    />
                    <Label htmlFor={`delegation-role-${role}`} className="text-sm font-normal">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddDelegationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDelegation}>
              Create Delegation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
