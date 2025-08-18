import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Building2, Users } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContactLookupModal } from "@/components/portal/ContactLookupModal";
import { CreateContactRecordModal } from "@/components/portal/CreateContactRecordModal";

interface DepartmentTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  isPartiallyEditable?: boolean;
  isSeededCase?: boolean;
}

export function DepartmentTab({ onDataChange, data, isReadOnly = false, isPartiallyEditable = false, isSeededCase = false }: DepartmentTabProps) {
  // Modal states
  const [lookupModal, setLookupModal] = useState({ isOpen: false, role: "", title: "" });
  const [createModal, setCreateModal] = useState({ isOpen: false, role: "", title: "" });
  const [pendingNewContact, setPendingNewContact] = useState(null);
  
  // Modal handlers
  const openLookupModal = (role: string, title: string) => {
    setLookupModal({ isOpen: true, role, title });
  };

  const closeLookupModal = () => {
    setLookupModal({ isOpen: false, role: "", title: "" });
    setPendingNewContact(null);
  };

  const openCreateModal = (role: string, title: string) => {
    setCreateModal({ isOpen: true, role, title });
    closeLookupModal();
  };

  const closeCreateModal = () => {
    setCreateModal({ isOpen: false, role: "", title: "" });
    openLookupModal(lookupModal.role, lookupModal.title);
  };

  const handleContactSelect = (contact: any) => {
    const roleField = lookupModal.role;
    onDataChange({ [roleField]: contact });
    closeLookupModal();
  };

  const handleCreateContact = (newContact: any) => {
    setPendingNewContact(newContact);
    setCreateModal({ isOpen: false, role: "", title: "" });
    openLookupModal(createModal.role, createModal.title);
  };

  const handleRemoveContact = (role: string) => {
    onDataChange({ [role]: null });
    closeLookupModal();
  };

  const getContactDisplayName = (contact: any) => {
    if (!contact) return "";
    return `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || contact.name || "";
  };

  const shouldLockField = (fieldName: string) => {
    if (isReadOnly) return true;
    if (isSeededCase) {
      // All fields are locked for seeded case
      return true;
    }
    if (isPartiallyEditable) {
      // Only these fields are editable in partially editable mode
      return !['departmentRefNumber', 'caseCoordinator', 'assignedAttorney', 'finalDecisionMaker'].includes(fieldName);
    }
    return false;
  };
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Agency Structure */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Agency Structure</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor="department" className="font-fluent cursor-help">Department *</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Select the agency department responsible for the case. Required.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select disabled={shouldLockField('department')} value={data.department || ""} onValueChange={(value) => onDataChange({ department: value })}>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning Department</SelectItem>
                    <SelectItem value="environmental">Environmental Services</SelectItem>
                    <SelectItem value="legal">Legal Department</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="Department of Natural Resources">Department of Natural Resources</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Select the agency department responsible for the case. Required.
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor="division" className="font-fluent cursor-help">Division</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Optional. Choose the specific division within the department.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select disabled={shouldLockField('division')} value={data.division || ""} onValueChange={(value) => onDataChange({ division: value })}>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoning">Zoning Division</SelectItem>
                    <SelectItem value="permits">Permits Division</SelectItem>
                    <SelectItem value="compliance">Compliance Division</SelectItem>
                    <SelectItem value="Animal Health & Welfare">Animal Health & Welfare</SelectItem>
                    <SelectItem value="weights-measures">Bureau of Weights and Measures</SelectItem>
                    <SelectItem value="Office of Oil and Gas Resource Management">Office of Oil and Gas Resource Management</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Optional. Choose the specific division within the department.
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor="bureau" className="font-fluent cursor-help">Bureau</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Optional. Select the bureau handling the case, if applicable.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select disabled={shouldLockField('bureau')} value={data.bureau || ""} onValueChange={(value) => onDataChange({ bureau: value })}>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Bureau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Bureau</SelectItem>
                    <SelectItem value="commercial">Commercial Bureau</SelectItem>
                    <SelectItem value="industrial">Industrial Bureau</SelectItem>
                    <SelectItem value="Adult Protective Services">Adult Protective Services</SelectItem>
                    <SelectItem value="Plugging and Restoration">Plugging and Restoration</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Optional. Select the bureau handling the case, if applicable.
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor="caseType" className="font-fluent cursor-help">Case Type *</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Select the applicable case type for correct routing. Required.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select disabled={shouldLockField('caseType')} value={data.caseType || ""} onValueChange={(value) => onDataChange({ caseType: value })}>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Case Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental Review</SelectItem>
                    <SelectItem value="zoning">Zoning Variance</SelectItem>
                    <SelectItem value="permit">Permit Application</SelectItem>
                    <SelectItem value="foia">FOIA Request</SelectItem>
                    <SelectItem value="animal-health">Animal Health</SelectItem>
                    <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                    <SelectItem value="Environment Protection">Environment Protection</SelectItem>
                    <SelectItem value="Abandoned Well">Abandoned Well</SelectItem>
                    <SelectItem value="inspection-appeal">Inspection Notice of Fine Appeal</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Select the applicable case type for correct routing. Required.
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor="deptRef" className="font-fluent cursor-help">Department Reference Number</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Enter the department's internal reference number, if available.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input 
                  id="deptRef"
                  placeholder="Enter department reference number"
                  className="shadow-fluent-8 border-input-border"
                  disabled={shouldLockField('departmentRefNumber')}
                  value={data.departmentRefNumber || ""}
                  onChange={(e) => onDataChange({ departmentRefNumber: e.target.value })}
                />
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-[#EDEBE9] text-[#201F1E] font-normal text-xs shadow-lg border border-gray-200"
                style={{ fontFamily: 'Segoe UI, sans-serif' }}
              >
                Enter the department's internal reference number, if available.
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Department Personnel */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Department Personnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Case Coordinator */}
          <div className="space-y-2">
            <Label htmlFor="coordinator" className="font-fluent">Case Coordinator *</Label>
            <div className="relative">
              <Input
                id="coordinator"
                placeholder="Search or add Case Coordinator"
                value={getContactDisplayName(data.caseCoordinator)}
                readOnly
                className="shadow-fluent-8 border-input-border pr-10 cursor-pointer"
                disabled={shouldLockField('caseCoordinator')}
                onClick={() => !shouldLockField('caseCoordinator') && openLookupModal('caseCoordinator', 'Case Coordinator')}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                disabled={shouldLockField('caseCoordinator')}
                onClick={() => openLookupModal('caseCoordinator', 'Case Coordinator')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Assigned Attorney */}
          <div className="space-y-2">
            <Label htmlFor="attorney" className="font-fluent">Assigned Attorney</Label>
            <div className="relative">
              <Input
                id="attorney"
                placeholder="Search or add Assigned Attorney"
                value={getContactDisplayName(data.assignedAttorney)}
                readOnly
                className="shadow-fluent-8 border-input-border pr-10 cursor-pointer"
                disabled={shouldLockField('assignedAttorney')}
                onClick={() => !shouldLockField('assignedAttorney') && openLookupModal('assignedAttorney', 'Assigned Attorney')}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                disabled={shouldLockField('assignedAttorney')}
                onClick={() => openLookupModal('assignedAttorney', 'Assigned Attorney')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Final Decision Maker */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="decisionMaker" className="font-fluent">Final Decision Maker</Label>
            <div className="relative">
              <Input
                id="decisionMaker"
                placeholder="Search or add Final Decision Maker"
                value={getContactDisplayName(data.finalDecisionMaker)}
                readOnly
                className="shadow-fluent-8 border-input-border pr-10 cursor-pointer"
                disabled={shouldLockField('finalDecisionMaker')}
                onClick={() => !shouldLockField('finalDecisionMaker') && openLookupModal('finalDecisionMaker', 'Final Decision Maker')}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                disabled={shouldLockField('finalDecisionMaker')}
                onClick={() => openLookupModal('finalDecisionMaker', 'Final Decision Maker')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Contact Lookup Modal */}
      <ContactLookupModal
        isOpen={lookupModal.isOpen}
        onClose={closeLookupModal}
        onSelect={handleContactSelect}
        onCreateNew={() => openCreateModal(lookupModal.role, lookupModal.title)}
        currentValue={lookupModal.role ? data[lookupModal.role] : null}
        onRemoveValue={() => handleRemoveContact(lookupModal.role)}
        pendingNewContact={pendingNewContact}
      />

      {/* Create Contact Record Modal */}
      <CreateContactRecordModal
        isOpen={createModal.isOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateContact}
        onCancel={closeCreateModal}
      />
    </TooltipProvider>
  );
}