import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface InspectionQuestionsTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  isReadOnly?: boolean;
}

export function InspectionQuestionsTab({ 
  data, 
  onDataChange, 
  onValidationChange, 
  isReadOnly = false 
}: InspectionQuestionsTabProps) {
  const [formData, setFormData] = useState({
    whatToInspect: data.whatToInspect || '',
    inspectionPurpose: data.inspectionPurpose || '',
    whoPresent: data.whoPresent || '',
    whoControls: data.whoControls || '',
    ...data
  });

  const updateFormData = (updates: any) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onDataChange(newData);
  };

  const validateForm = () => {
    const isValid = formData.whatToInspect.trim().length > 0 &&
                   formData.inspectionPurpose.trim().length > 0 &&
                   formData.whoPresent.trim().length > 0 &&
                   formData.whoControls.trim().length > 0;
    
    if (onValidationChange) onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <Card className="shadow-fluent-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-fluent">
          <Search className="h-5 w-5 text-primary" />
          <span>Inspection Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="whatToInspect" className="font-fluent">
            What is to be inspected? *
          </Label>
          <Textarea
            id="whatToInspect"
            placeholder="Describe what items, areas, or materials are to be inspected..."
            className="min-h-[100px] shadow-fluent-8 border-input-border"
            disabled={isReadOnly}
            value={formData.whatToInspect}
            onChange={(e) => updateFormData({ whatToInspect: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inspectionPurpose" className="font-fluent">
            What is the purpose of the inspection? *
          </Label>
          <Textarea
            id="inspectionPurpose"
            placeholder="Explain the purpose and objectives of the inspection..."
            className="min-h-[100px] shadow-fluent-8 border-input-border"
            disabled={isReadOnly}
            value={formData.inspectionPurpose}
            onChange={(e) => updateFormData({ inspectionPurpose: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}