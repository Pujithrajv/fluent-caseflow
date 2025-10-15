import { useState } from "react";
import { Search, Building2, User, Mail, Phone, Link as LinkIcon, X, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Entity {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  fileNumber: string;
  status: "Active" | "NGS" | "Inactive";
  city: string;
  state: string;
  contactability: "Direct" | "Registered Agent" | "Attorney";
  address?: string;
  registeredAgent?: string;
}

interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
}

const mockEntities: Entity[] = [
  {
    id: "1",
    name: "Acme Corporation LLC",
    type: "LLC",
    jurisdiction: "Delaware",
    fileNumber: "DE-2024-001",
    status: "Active",
    city: "Wilmington",
    state: "DE",
    contactability: "Direct",
    address: "123 Main St, Wilmington, DE 19801"
  },
  {
    id: "2",
    name: "TechStart LP",
    type: "LP",
    jurisdiction: "California",
    fileNumber: "CA-2023-456",
    status: "NGS",
    city: "San Francisco",
    state: "CA",
    contactability: "Registered Agent"
  }
];

const mockPersons: Person[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    city: "New York",
    state: "NY"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 987-6543",
    city: "Boston",
    state: "MA"
  }
];

export const PrimaryFinalFinalTab = () => {
  const { toast } = useToast();
  const [viewType, setViewType] = useState<"entity" | "person">("entity");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  const [showAddEntityDrawer, setShowAddEntityDrawer] = useState(false);
  const [showAddPersonDrawer, setShowAddPersonDrawer] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Entity | Person | null>(null);

  // New Entity Form State
  const [newEntity, setNewEntity] = useState({
    name: "",
    type: "",
    jurisdiction: "",
    fileNumber: "",
    status: "Active" as "Active" | "NGS" | "Inactive",
    address: "",
    city: "",
    state: "",
    zip: "",
    registeredAgent: ""
  });

  // New Person Form State
  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  const filteredEntities = mockEntities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.fileNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPersons = mockPersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowSearchDrawer(true);
  };

  const handleSelectEntity = (entity: Entity) => {
    setSelectedParty(entity);
    setShowSearchDrawer(false);
    setSearchQuery("");
  };

  const handleSelectPerson = (person: Person) => {
    setSelectedParty(person);
    setShowSearchDrawer(false);
    setSearchQuery("");
  };

  const handleSaveEntity = () => {
    const entity: Entity = {
      id: Date.now().toString(),
      name: newEntity.name,
      type: newEntity.type,
      jurisdiction: newEntity.jurisdiction,
      fileNumber: newEntity.fileNumber,
      status: newEntity.status,
      city: newEntity.city,
      state: newEntity.state,
      address: newEntity.address,
      contactability: "Attorney",
      registeredAgent: newEntity.registeredAgent
    };
    
    setSelectedParty(entity);
    setShowAddEntityDrawer(false);
    setNewEntity({
      name: "",
      type: "",
      jurisdiction: "",
      fileNumber: "",
      status: "Active",
      address: "",
      city: "",
      state: "",
      zip: "",
      registeredAgent: ""
    });
    
    toast({
      title: "Success",
      description: "Entity created successfully and set as Primary Party"
    });
  };

  const handleSavePerson = () => {
    const person: Person = {
      id: Date.now().toString(),
      name: newPerson.name,
      email: newPerson.email,
      phone: newPerson.phone,
      address: newPerson.address,
      city: newPerson.city,
      state: newPerson.state
    };
    
    setSelectedParty(person);
    setShowAddPersonDrawer(false);
    setNewPerson({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: ""
    });
    
    toast({
      title: "Success",
      description: "Person created successfully and set as Primary Party"
    });
  };

  const getContactabilityColor = (type: string) => {
    switch (type) {
      case "Direct":
        return "bg-green-100 text-green-800";
      case "Registered Agent":
        return "bg-blue-100 text-blue-800";
      case "Attorney":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "NGS":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Step 2 of 6</div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Primary Party</h1>
          <p className="text-gray-600">Select or add an Entity or Person as the primary party for this case.</p>
        </div>

        {/* Segmented Toggle */}
        <div className="flex gap-2 p-1 bg-white rounded-xl border border-gray-200 w-fit">
          <button
            onClick={() => setViewType("entity")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              viewType === "entity"
                ? "bg-[#1E5EF0] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Entity
          </button>
          <button
            onClick={() => setViewType("person")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              viewType === "person"
                ? "bg-[#1E5EF0] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Person
          </button>
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            placeholder="Search by name, file number, city, or state..."
            className="pl-12 h-14 text-base rounded-xl border-gray-200 focus:border-[#1E5EF0] focus:ring-[#1E5EF0]"
          />
        </div>

        {/* Selected Party Summary Card */}
        {selectedParty && (
          <Card className="border-2 border-[#3DD598] rounded-xl shadow-sm animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#3DD598] bg-opacity-10 flex items-center justify-center">
                    {viewType === "entity" ? (
                      <Building2 className="h-6 w-6 text-[#3DD598]" />
                    ) : (
                      <User className="h-6 w-6 text-[#3DD598]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{selectedParty.name}</h3>
                    <p className="text-sm text-gray-500">Selected Primary Party</p>
                  </div>
                </div>
                <Badge className="bg-[#3DD598] text-white border-0">
                  <Check className="h-3 w-3 mr-1" />
                  Selected
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {viewType === "entity" && "type" in selectedParty && (
                  <>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Entity Type</div>
                      <div className="text-sm font-medium">{selectedParty.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Jurisdiction</div>
                      <div className="text-sm font-medium">{selectedParty.jurisdiction}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Status</div>
                      <Badge className={`text-xs ${getStatusColor(selectedParty.status)}`}>
                        {selectedParty.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Contactability</div>
                      <Badge className={`text-xs ${getContactabilityColor(selectedParty.contactability)}`}>
                        {selectedParty.contactability}
                      </Badge>
                    </div>
                  </>
                )}
                {viewType === "person" && "email" in selectedParty && (
                  <>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {selectedParty.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {selectedParty.phone}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full mt-6 bg-[#1E5EF0] hover:bg-[#1850d1] text-white h-12 rounded-lg">
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {!selectedParty && (
          <Card className="rounded-xl border-dashed border-2 border-gray-300">
            <CardContent className="p-12 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                {viewType === "entity" ? (
                  <Building2 className="h-8 w-8 text-gray-400" />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <p className="text-gray-500 mb-4">No primary party selected</p>
              <p className="text-sm text-gray-400">Search or add a new {viewType} to continue</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Results Drawer */}
      <Sheet open={showSearchDrawer} onOpenChange={setShowSearchDrawer}>
        <SheetContent side="right" className="w-full sm:w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Search {viewType === "entity" ? "Entities" : "Persons"}</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {viewType === "entity" ? (
              <>
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((entity) => (
                    <Card
                      key={entity.id}
                      className="cursor-pointer hover:shadow-md transition-shadow rounded-xl"
                      onClick={() => handleSelectEntity(entity)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1">{entity.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {entity.type} • {entity.city}, {entity.state}
                            </p>
                            <div className="flex gap-2">
                              <Badge className={`text-xs ${getStatusColor(entity.status)}`}>
                                {entity.status}
                              </Badge>
                              <Badge className={`text-xs ${getContactabilityColor(entity.contactability)}`}>
                                {entity.contactability}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">File #: {entity.fileNumber}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No matches found.</p>
                    <Button
                      onClick={() => {
                        setShowSearchDrawer(false);
                        setShowAddEntityDrawer(true);
                      }}
                      className="bg-[#1E5EF0] hover:bg-[#1850d1]"
                    >
                      Add New Entity
                    </Button>
                  </div>
                )}

                {filteredEntities.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-3">Can't find what you're looking for?</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowSearchDrawer(false);
                        setShowAddEntityDrawer(true);
                      }}
                      className="w-full"
                    >
                      Add New Entity
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredPersons.length > 0 ? (
                  filteredPersons.map((person) => (
                    <Card
                      key={person.id}
                      className="cursor-pointer hover:shadow-md transition-shadow rounded-xl"
                      onClick={() => handleSelectPerson(person)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1">{person.name}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                              <Mail className="h-3 w-3" />
                              {person.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {person.phone}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No matches found.</p>
                    <Button
                      onClick={() => {
                        setShowSearchDrawer(false);
                        setShowAddPersonDrawer(true);
                      }}
                      className="bg-[#1E5EF0] hover:bg-[#1850d1]"
                    >
                      Add New Person
                    </Button>
                  </div>
                )}

                {filteredPersons.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-3">Can't find what you're looking for?</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowSearchDrawer(false);
                        setShowAddPersonDrawer(true);
                      }}
                      className="w-full"
                    >
                      Add New Person
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Add New Entity Drawer */}
      <Sheet open={showAddEntityDrawer} onOpenChange={setShowAddEntityDrawer}>
        <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Entity</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Organization Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Organization Details</h3>
              
              <div>
                <Label>Legal Name *</Label>
                <Input
                  value={newEntity.name}
                  onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Entity Type *</Label>
                  <Select
                    value={newEntity.type}
                    onValueChange={(value) => setNewEntity({ ...newEntity, type: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LLC">LLC</SelectItem>
                      <SelectItem value="LP">LP</SelectItem>
                      <SelectItem value="Corporation">Corporation</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Jurisdiction</Label>
                  <Input
                    value={newEntity.jurisdiction}
                    onChange={(e) => setNewEntity({ ...newEntity, jurisdiction: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>File/ID Number</Label>
                  <Input
                    value={newEntity.fileNumber}
                    onChange={(e) => setNewEntity({ ...newEntity, fileNumber: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    value={newEntity.status}
                    onValueChange={(value: "Active" | "NGS" | "Inactive") =>
                      setNewEntity({ ...newEntity, status: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="NGS">NGS</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-gray-900">Address Information</h3>
              
              <div>
                <Label>Address</Label>
                <Input
                  value={newEntity.address}
                  onChange={(e) => setNewEntity({ ...newEntity, address: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    value={newEntity.city}
                    onChange={(e) => setNewEntity({ ...newEntity, city: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={newEntity.state}
                    onChange={(e) => setNewEntity({ ...newEntity, state: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Zip</Label>
                  <Input
                    value={newEntity.zip}
                    onChange={(e) => setNewEntity({ ...newEntity, zip: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Registered Agent */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-gray-900">Registered Agent</h3>
              
              <div>
                <Label>Registered Agent (Entity)</Label>
                <Input
                  value={newEntity.registeredAgent}
                  onChange={(e) => setNewEntity({ ...newEntity, registeredAgent: e.target.value })}
                  placeholder="Search for entity..."
                  className="mt-1"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 pt-4 border-t">
              <Badge className="bg-orange-100 text-orange-800">Attorney Required</Badge>
              <Badge className="bg-blue-100 text-blue-800">Contactability: via Registered Agent</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t sticky bottom-0 bg-white pb-6">
              <Button
                variant="outline"
                onClick={() => setShowAddEntityDrawer(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEntity}
                disabled={!newEntity.name || !newEntity.type}
                className="flex-1 bg-[#1E5EF0] hover:bg-[#1850d1]"
              >
                Save & Select
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add New Person Drawer */}
      <Sheet open={showAddPersonDrawer} onOpenChange={setShowAddPersonDrawer}>
        <SheetContent side="right" className="w-full sm:w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Add New Person</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newPerson.email}
                onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={newPerson.phone}
                onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={newPerson.address}
                onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  value={newPerson.city}
                  onChange={(e) => setNewPerson({ ...newPerson, city: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={newPerson.state}
                  onChange={(e) => setNewPerson({ ...newPerson, state: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Zip</Label>
                <Input
                  value={newPerson.zip}
                  onChange={(e) => setNewPerson({ ...newPerson, zip: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowAddPersonDrawer(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePerson}
                disabled={!newPerson.name}
                className="flex-1 bg-[#1E5EF0] hover:bg-[#1850d1]"
              >
                Save & Select
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
