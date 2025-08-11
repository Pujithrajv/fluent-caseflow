import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Building2, Users } from "lucide-react";
import { ContactPicker } from "@/components/shared/ContactPicker";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DepartmentTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  isPartiallyEditable?: boolean;
}

export function DepartmentTab({ onDataChange, data, isReadOnly = false, isPartiallyEditable = false }: DepartmentTabProps) {
  const [caseCoordinator, setCaseCoordinator] = useState(null);
  const [assignedAttorney, setAssignedAttorney] = useState(null);
  const [finalDecisionMaker, setFinalDecisionMaker] = useState(null);
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
                <Select>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning Department</SelectItem>
                    <SelectItem value="environmental">Environmental Services</SelectItem>
                    <SelectItem value="legal">Legal Department</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="agriculture">Department of Agriculture</SelectItem>
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
                <Select>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoning">Zoning Division</SelectItem>
                    <SelectItem value="permits">Permits Division</SelectItem>
                    <SelectItem value="compliance">Compliance Division</SelectItem>
                    <SelectItem value="animal-health-welfare">Animal Health & Welfare</SelectItem>
                    <SelectItem value="weights-measures">Bureau of Weights and Measures</SelectItem>
                    <SelectItem value="agricultural-regulation">Division of Agricultural Industry Regulation</SelectItem>
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
                <Select>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select Bureau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Bureau</SelectItem>
                    <SelectItem value="commercial">Commercial Bureau</SelectItem>
                    <SelectItem value="industrial">Industrial Bureau</SelectItem>
                    <SelectItem value="adult-protective">Adult Protective Services</SelectItem>
                    <SelectItem value="animal-health-bureau">Animal Health & Welfare</SelectItem>
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
                <Select>
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
                    <SelectItem value="environment-protection">Environment Protection</SelectItem>
                    <SelectItem value="grain-dealer">Grain Dealer and Warehouse Licensing</SelectItem>
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
          <div className="space-y-2">
            <Label htmlFor="coordinator" className="font-fluent">Case Coordinator *</Label>
            <ContactPicker
              value={caseCoordinator}
              onChange={setCaseCoordinator}
              placeholder="Select or search coordinator"
              helperText="Search to link an existing contact or add a new one."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attorney" className="font-fluent">Assigned Attorney</Label>
            <ContactPicker
              value={assignedAttorney}
              onChange={setAssignedAttorney}
              placeholder="Select or search attorney"
              helperText="Search to link an existing contact or add a new one."
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="representative" className="font-fluent">Final Decision Maker</Label>
            <ContactPicker
              value={finalDecisionMaker}
              onChange={setFinalDecisionMaker}
              placeholder="Select or search final decision maker"
              helperText="Search to link an existing contact or add a new one."
            />
          </div>
        </CardContent>
      </Card>
      </div>
    </TooltipProvider>
  );
}