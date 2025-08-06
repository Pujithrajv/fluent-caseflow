import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface InspectionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function InspectionQuestionsTab({ onDataChange, data }: InspectionQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Search className="h-5 w-5 text-primary" />
            <span>Inspection Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inspectionType" className="font-fluent">Type of Inspection *</Label>
              <Select>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select inspection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Property Inspection</SelectItem>
                  <SelectItem value="documents">Document Inspection</SelectItem>
                  <SelectItem value="equipment">Equipment Inspection</SelectItem>
                  <SelectItem value="premises">Premises Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="font-fluent">Preferred Inspection Date</Label>
              <Input 
                id="preferredDate"
                type="date"
                className="shadow-fluent-8 border-input-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionLocation" className="font-fluent">Location to be Inspected *</Label>
            <Textarea 
              id="inspectionLocation"
              placeholder="Provide detailed address or description of the location/items to be inspected..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionPurpose" className="font-fluent">Purpose of Inspection *</Label>
            <Textarea 
              id="inspectionPurpose"
              placeholder="Explain what you hope to discover or verify through this inspection..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionScope" className="font-fluent">Scope of Inspection</Label>
            <Textarea 
              id="inspectionScope"
              placeholder="Describe the specific areas, items, or aspects you want to inspect..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionDuration" className="font-fluent">Estimated Duration</Label>
            <Input 
              id="inspectionDuration"
              placeholder="e.g., 2 hours, half day"
              className="shadow-fluent-8 border-input-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialEquipment" className="font-fluent">Special Equipment or Personnel Needed</Label>
            <Textarea 
              id="specialEquipment"
              placeholder="List any special equipment, experts, or personnel required for the inspection..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}