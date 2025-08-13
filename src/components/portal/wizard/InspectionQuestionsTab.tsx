import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface InspectionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function InspectionQuestionsTab({ onDataChange, data }: InspectionQuestionsTabProps) {
  const [whatToInspect, setWhatToInspect] = useState(data?.whatToInspect || "");
  const [inspectionPurpose, setInspectionPurpose] = useState(data?.inspectionPurpose || "");
  const [whoPresent, setWhoPresent] = useState(data?.whoPresent || "");
  const [whoControls, setWhoControls] = useState(data?.whoControls || "");

  const handleFieldChange = (field: string, value: string) => {
    const updates = { [field]: value };
    onDataChange(updates);
  };

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
          <div className="space-y-2">
            <Label htmlFor="whatToInspect" className="font-fluent">What is to be inspected?</Label>
            <Textarea 
              id="whatToInspect"
              value={whatToInspect}
              onChange={(e) => {
                setWhatToInspect(e.target.value);
                handleFieldChange('whatToInspect', e.target.value);
              }}
              placeholder="Describe what is to be inspected..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionPurpose" className="font-fluent">What is the purpose of the inspection?</Label>
            <Textarea 
              id="inspectionPurpose"
              value={inspectionPurpose}
              onChange={(e) => {
                setInspectionPurpose(e.target.value);
                handleFieldChange('inspectionPurpose', e.target.value);
              }}
              placeholder="Explain the purpose of the inspection..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whoPresent" className="font-fluent">Who is to be present at the inspection?</Label>
            <Textarea 
              id="whoPresent"
              value={whoPresent}
              onChange={(e) => {
                setWhoPresent(e.target.value);
                handleFieldChange('whoPresent', e.target.value);
              }}
              placeholder="Describe who should be present during the inspection..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whoControls" className="font-fluent">Who controls the thing to be inspected?</Label>
            <Textarea 
              id="whoControls"
              value={whoControls}
              onChange={(e) => {
                setWhoControls(e.target.value);
                handleFieldChange('whoControls', e.target.value);
              }}
              placeholder="Identify who has control over the item/location to be inspected..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}