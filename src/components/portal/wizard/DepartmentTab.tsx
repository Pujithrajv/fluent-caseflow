import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users } from "lucide-react";

interface DepartmentTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function DepartmentTab({ onDataChange, data }: DepartmentTabProps) {
  return (
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
            <Label htmlFor="department" className="font-fluent">Department *</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="division" className="font-fluent">Division</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bureau" className="font-fluent">Bureau</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="caseType" className="font-fluent">Case Type *</Label>
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
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="deptRef" className="font-fluent">Department Reference Number</Label>
            <Input 
              id="deptRef"
              placeholder="Enter department reference number"
              className="shadow-fluent-8 border-input-border"
            />
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
  );
}