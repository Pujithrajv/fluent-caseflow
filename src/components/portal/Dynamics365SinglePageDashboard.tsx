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
import { Save, FileDown, UserPlus, XCircle, Edit, Trash2, Eye, Loader2 } from "lucide-react";

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
  const [selectedDepartment, setSelectedDepartment] = useState("Department of Agriculture");
  const [isLoading, setIsLoading] = useState(false);
  const [agencyStatus, setAgencyStatus] = useState<boolean>(true);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddDelegationOpen, setIsAddDelegationOpen] = useState(false);

  // Department-specific data
  const departmentData: Record<string, any> = {
    "Department of Agriculture": {
      info: {
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
      },
      contacts: [
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
      ],
      delegations: [
        {
          id: "1",
          delegatee: "Sarah Johnson",
          startDate: "2025-10-01",
          endDate: "2025-10-31",
          rolesCovered: ["Agency Manager"],
          status: "Active"
        }
      ],
      auditTrail: [
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
      ]
    },
    "Department of Natural Resources": {
      info: {
        name: "Department of Natural Resources",
        id: "DNR-2025-002",
        address: "456 Conservation Drive",
        city: "Springfield",
        state: "IL",
        zip: "62702",
        division: "Wildlife & Parks",
        primaryContact: "Laura Chen",
        phone: "(217) 555-0200",
        dateCreated: "2024-02-20",
        lastModified: "2025-10-09"
      },
      contacts: [
        {
          id: "1",
          name: "Laura Chen",
          roles: ["Agency Manager", "FDM"],
          email: "l.chen@dnr.gov",
          phone: "(217) 555-0201",
          status: "Active"
        },
        {
          id: "2",
          name: "Peter Morales",
          roles: ["Case Manager", "Attorney"],
          email: "p.morales@dnr.gov",
          phone: "(217) 555-0202",
          status: "Active"
        }
      ],
      delegations: [
        {
          id: "1",
          delegatee: "Peter Morales",
          startDate: "2025-10-15",
          endDate: "2025-11-15",
          rolesCovered: ["Agency Manager"],
          status: "Upcoming"
        }
      ],
      auditTrail: [
        {
          id: "1",
          date: "2025-10-09 10:15",
          modifiedBy: "Laura Chen",
          changeSummary: "Updated division information"
        },
        {
          id: "2",
          date: "2025-10-07 14:20",
          modifiedBy: "Peter Morales",
          changeSummary: "Modified contact roles"
        }
      ]
    },
    "Environmental Permit & Violation Division": {
      info: {
        name: "Environmental Permit & Violation Division",
        id: "EPV-2025-003",
        address: "789 Compliance Boulevard",
        city: "Springfield",
        state: "IL",
        zip: "62703",
        division: "Permit Enforcement",
        primaryContact: "Greg Holt",
        phone: "(217) 555-0300",
        dateCreated: "2024-03-10",
        lastModified: "2025-10-07"
      },
      contacts: [
        {
          id: "1",
          name: "Greg Holt",
          roles: ["Agency Manager"],
          email: "g.holt@epv.gov",
          phone: "(217) 555-0301",
          status: "Active"
        },
        {
          id: "2",
          name: "Nina Reyes",
          roles: ["Case Manager", "Attorney"],
          email: "n.reyes@epv.gov",
          phone: "(217) 555-0302",
          status: "Active"
        },
        {
          id: "3",
          name: "Tom Bradley",
          roles: ["Agency User"],
          email: "t.bradley@epv.gov",
          phone: "(217) 555-0303",
          status: "Inactive"
        }
      ],
      delegations: [],
      auditTrail: [
        {
          id: "1",
          date: "2025-10-07 16:45",
          modifiedBy: "Greg Holt",
          changeSummary: "Deactivated user: Tom Bradley"
        },
        {
          id: "2",
          date: "2025-10-05 11:30",
          modifiedBy: "Nina Reyes",
          changeSummary: "Updated phone directory"
        }
      ]
    },
    "Department of Public Safety": {
      info: {
        name: "Department of Public Safety",
        id: "DPS-2025-004",
        address: "321 Safety Plaza",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        division: "Emergency Services",
        primaryContact: "Robert Kim",
        phone: "(217) 555-0400",
        dateCreated: "2024-01-05",
        lastModified: "2025-10-10"
      },
      contacts: [
        {
          id: "1",
          name: "Robert Kim",
          roles: ["Agency Manager", "FDM"],
          email: "r.kim@dps.gov",
          phone: "(217) 555-0401",
          status: "Active"
        },
        {
          id: "2",
          name: "Jessica Wu",
          roles: ["Case Manager"],
          email: "j.wu@dps.gov",
          phone: "(217) 555-0402",
          status: "Active"
        }
      ],
      delegations: [
        {
          id: "1",
          delegatee: "Jessica Wu",
          startDate: "2025-09-15",
          endDate: "2025-09-30",
          rolesCovered: ["FDM"],
          status: "Expired"
        }
      ],
      auditTrail: [
        {
          id: "1",
          date: "2025-10-10 08:00",
          modifiedBy: "Robert Kim",
          changeSummary: "Updated emergency contact protocols"
        }
      ]
    },
    "Wildlife Conservation Agency": {
      info: {
        name: "Wildlife Conservation Agency",
        id: "WCA-2025-005",
        address: "555 Nature Way",
        city: "Springfield",
        state: "IL",
        zip: "62705",
        division: "Species Protection",
        primaryContact: "Amanda Foster",
        phone: "(217) 555-0500",
        dateCreated: "2024-04-12",
        lastModified: "2025-10-06"
      },
      contacts: [
        {
          id: "1",
          name: "Amanda Foster",
          roles: ["Agency Manager"],
          email: "a.foster@wca.gov",
          phone: "(217) 555-0501",
          status: "Active"
        },
        {
          id: "2",
          name: "David Park",
          roles: ["Attorney", "Case Manager"],
          email: "d.park@wca.gov",
          phone: "(217) 555-0502",
          status: "Active"
        },
        {
          id: "3",
          name: "Maria Santos",
          roles: ["Agency User"],
          email: "m.santos@wca.gov",
          phone: "(217) 555-0503",
          status: "Active"
        }
      ],
      delegations: [
        {
          id: "1",
          delegatee: "David Park",
          startDate: "2025-10-20",
          endDate: "2025-11-05",
          rolesCovered: ["Agency Manager"],
          status: "Upcoming"
        }
      ],
      auditTrail: [
        {
          id: "1",
          date: "2025-10-06 13:25",
          modifiedBy: "Amanda Foster",
          changeSummary: "Added new contact: Maria Santos"
        },
        {
          id: "2",
          date: "2025-10-03 09:40",
          modifiedBy: "David Park",
          changeSummary: "Updated conservation protocols"
        }
      ]
    }
  };

  const currentDepartmentData = departmentData[selectedDepartment];
  
  const [agencyInfo, setAgencyInfo] = useState(currentDepartmentData.info);
  const [contacts, setContacts] = useState<Contact[]>(currentDepartmentData.contacts);
  const [delegations, setDelegations] = useState<Delegation[]>(currentDepartmentData.delegations);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(currentDepartmentData.auditTrail);

  const handleDepartmentChange = (department: string) => {
    setIsLoading(true);
    setSelectedDepartment(department);
    
    // Simulate loading delay
    setTimeout(() => {
      const newData = departmentData[department];
      setAgencyInfo(newData.info);
      setContacts(newData.contacts);
      setDelegations(newData.delegations);
      setAuditTrail(newData.auditTrail);
      setIsLoading(false);
    }, 800);
  };

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
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Department Selector */}
        <Card className="shadow-sm border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="department-select" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Select Department / Agency
                </Label>
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                  <SelectTrigger 
                    id="department-select"
                    className="w-full md:w-2/3 lg:w-1/2 h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="Department of Agriculture">Department of Agriculture</SelectItem>
                    <SelectItem value="Department of Natural Resources">Department of Natural Resources</SelectItem>
                    <SelectItem value="Environmental Permit & Violation Division">Environmental Permit & Violation Division</SelectItem>
                    <SelectItem value="Department of Public Safety">Department of Public Safety</SelectItem>
                    <SelectItem value="Wildlife Conservation Agency">Wildlife Conservation Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Currently Viewing Display */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Currently viewing:</span>
                <span className="text-sm font-bold text-blue-700">{selectedDepartment}</span>
              </div>

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center space-x-2 text-blue-600 animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Refreshing data for selected department...</span>
                </div>
              )}
            </div>
          </CardContent>
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
            </div>
          </CardHeader>
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
