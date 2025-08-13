import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AlertCircle, Building2 } from "lucide-react";
import { useState } from "react";

interface ExhibitDepartmentTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onNext: () => void;
}

export function ExhibitDepartmentTab({ onDataChange, data, onNext }: ExhibitDepartmentTabProps) {
  const [hasReadAndUnderstood, setHasReadAndUnderstood] = useState(data.hasReadRules || false);
  
  const handleCheckboxChange = (checked: boolean) => {
    setHasReadAndUnderstood(checked);
    onDataChange({ hasReadRules: checked });
  };

  const handleContinue = () => {
    if (hasReadAndUnderstood) {
      onNext();
    }
  };

  // Mock department data - in real implementation, this would come from the upload screen
  const identifiedDepartment = data.department || "Illinois Environmental Protection Agency";

  return (
    <div className="space-y-6">
      {/* Department Identification */}
      <Card className="shadow-fluent-8 border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Identified Department/Party</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="font-medium font-fluent text-foreground">{identifiedDepartment}</p>
            <p className="text-sm text-muted-foreground font-fluent mt-1">
              This department has been identified from your case information.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Information Message */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <AlertCircle className="h-5 w-5 text-warning" />
            <span>Rules and Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
            <p className="font-fluent text-sm text-foreground leading-relaxed">
              You are about to upload exhibits in connection with this case. Please review the Rules and Instructions for exhibit submission carefully. 
              Violation of these rules may result in suspension of your ability to upload exhibits in this case.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold font-fluent text-foreground">Key Requirements:</h4>
            <ul className="space-y-2 text-sm font-fluent text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>All exhibits must be relevant to the case</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Ensure all personally identifiable information is properly redacted</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Confidential information requires a protective order</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span>Physical items require special approval process</span>
              </li>
            </ul>
          </div>

          {/* Acknowledgment Checkbox */}
          <div className="border-t pt-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="rules-acknowledgment"
                checked={hasReadAndUnderstood}
                onCheckedChange={handleCheckboxChange}
                className="mt-1"
              />
              <label 
                htmlFor="rules-acknowledgment" 
                className="text-sm font-fluent text-foreground leading-relaxed cursor-pointer"
              >
                I have read and understand the Rule and Instructions for the uploading of Exhibits in connection with this Case. 
                I understand that violation of the Rules and Instructions may result in suspension of the ability to upload Exhibits in this Case.
              </label>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleContinue}
              disabled={!hasReadAndUnderstood}
              className="font-fluent"
            >
              Continue to Exhibit Type
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}