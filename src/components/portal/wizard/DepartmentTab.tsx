import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Building2, Users } from "lucide-react";

interface DepartmentTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function DepartmentTab({ onDataChange, data }: DepartmentTabProps) {
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
          <Badge variant="destructive" className="px-4 py-1 text-xs font-fluent mt-2">
            Expedited
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="coordinator" className="font-fluent">Case Coordinator *</Label>
            <Select>
              <SelectTrigger className="shadow-fluent-8 border-input-border">
                <SelectValue placeholder="Select Coordinator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-smith">John Smith</SelectItem>
                <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attorney" className="font-fluent">Assigned Attorney</Label>
            <Select>
              <SelectTrigger className="shadow-fluent-8 border-input-border">
                <SelectValue placeholder="Select Attorney" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lisa-brown">Lisa Brown</SelectItem>
                <SelectItem value="david-clark">David Clark</SelectItem>
                <SelectItem value="jennifer-davis">Jennifer Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="representative" className="font-fluent">Final Decision Maker</Label>
            <Select>
              <SelectTrigger className="shadow-fluent-8 border-input-border">
                <SelectValue placeholder="Select Final Decision Maker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-smith">John Smith</SelectItem>
                <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                <SelectItem value="lisa-brown">Lisa Brown</SelectItem>
                <SelectItem value="david-clark">David Clark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      </div>
    </TooltipProvider>
  );
}