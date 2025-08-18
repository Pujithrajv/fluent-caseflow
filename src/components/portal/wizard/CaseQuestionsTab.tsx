import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, AlertTriangle } from "lucide-react";

interface CaseQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}


export function CaseQuestionsTab({ onDataChange, data, isReadOnly = false, isSeededCase = false }: CaseQuestionsTabProps) {
  const [permitteeNumber, setPermitteeNumber] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [numberOfWells, setNumberOfWells] = useState("");

  const validateInteger = (value: string, max: number) => {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num < max;
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardContent className="space-y-6">
          {/* Question 1: Permittee Number */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the permittee number?</Label>
            <Input
              type="number"
              value={data.permitteeNumber || permitteeNumber}
              onChange={(e) => {
                setPermitteeNumber(e.target.value);
                onDataChange({ ...data, permitteeNumber: e.target.value });
              }}
              placeholder="Enter permittee number"
              className="shadow-fluent-8 border-input-border"
              max={999999}
              readOnly={isReadOnly || isSeededCase}
            />
            {permitteeNumber && !validateInteger(permitteeNumber, 1000000) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 1,000,000
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Question 2: Permit Number (Optional) */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the Permit Number? <span className="text-muted-foreground">(Optional)</span></Label>
            <Input
              type="number"
              value={data.permitNumber || permitNumber}
              onChange={(e) => {
                setPermitNumber(e.target.value);
                onDataChange({ ...data, permitNumber: e.target.value });
              }}
              placeholder="Enter permit number"
              className="shadow-fluent-8 border-input-border"
              max={999999}
              readOnly={isReadOnly || isSeededCase}
            />
            {permitNumber && !validateInteger(permitNumber, 1000000) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 1,000,000
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Question 3: Number of Wells */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the number of wells addressed by this Case?</Label>
            <Input
              type="number"
              value={data.numberOfWells || numberOfWells}
              onChange={(e) => {
                setNumberOfWells(e.target.value);
                onDataChange({ ...data, numberOfWells: e.target.value });
              }}
              placeholder="Enter number of wells"
              className="shadow-fluent-8 border-input-border"
              max={499}
              readOnly={isReadOnly || isSeededCase}
            />
            {numberOfWells && !validateInteger(numberOfWells, 500) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 500
                </AlertDescription>
              </Alert>
            )}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
