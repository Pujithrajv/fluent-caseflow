import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface RequestDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function RequestDetailsTab({ onDataChange, data }: RequestDetailsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Request Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="requestGroup" className="font-fluent">Request Group *</Label>
              <Select>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select request group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requestType" className="font-fluent">Request Type *</Label>
              <Select>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document-review">Document Review</SelectItem>
                  <SelectItem value="impact-assessment">Impact Assessment</SelectItem>
                  <SelectItem value="compliance-check">Compliance Check</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="caseId" className="font-fluent">Case ID</Label>
              <Input 
                id="caseId"
                value="AUTO-GENERATED"
                disabled
                className="shadow-fluent-8 border-input-border bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="processStage" className="font-fluent">Process Stage</Label>
              <Input 
                id="processStage"
                value="Initial Review"
                disabled
                className="shadow-fluent-8 border-input-border bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestSummary" className="font-fluent">Request Summary *</Label>
            <Textarea 
              id="requestSummary"
              placeholder="Provide a detailed summary of your request..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}