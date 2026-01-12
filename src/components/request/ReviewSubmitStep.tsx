import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RequestData } from "@/pages/DemoRequestWizard";

interface ReviewSubmitStepProps {
  data: RequestData;
  onBack: () => void;
}

export function ReviewSubmitStep({ data, onBack }: ReviewSubmitStepProps) {
  const [complianceStatus, setComplianceStatus] = useState<string>("");
  const [explanation, setExplanation] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const CHARACTER_LIMIT = 1000;

  const needsExplanation = complianceStatus === "partial" || complianceStatus === "not-complied";
  
  const canSubmit = complianceStatus !== "" && confirmed;

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({
        title: "Incomplete Form",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Certification Submitted",
      description: "Your discovery compliance certification has been submitted successfully.",
    });

    setTimeout(() => {
      navigate("/portal");
    }, 2000);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">Review & Submit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Discovery Compliance Certification Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Discovery Compliance Certification</h3>
          </div>

          {/* Certification Statement */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-foreground leading-relaxed">
              "I certify that, to the best of my knowledge, discovery for this case has been addressed in accordance with applicable orders and deadlines."
            </p>
          </div>

          {/* Compliance Status Radio Buttons */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Discovery Compliance Status <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={complianceStatus}
              onValueChange={setComplianceStatus}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="fully-complied" id="fully-complied" />
                <Label htmlFor="fully-complied" className="cursor-pointer text-sm font-normal flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Discovery fully complied with
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="cursor-pointer text-sm font-normal">
                  Discovery partially complied with
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="not-complied" id="not-complied" />
                <Label htmlFor="not-complied" className="cursor-pointer text-sm font-normal">
                  Discovery not complied with
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Explanation Field */}
          {needsExplanation && (
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <Label htmlFor="explanation" className="text-sm font-medium text-foreground">
                Please briefly explain the current status of discovery compliance.
              </Label>
              <Textarea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value.slice(0, CHARACTER_LIMIT))}
                placeholder="Enter your explanation here..."
                className="min-h-[120px] resize-none"
                maxLength={CHARACTER_LIMIT}
              />
              <p className="text-xs text-muted-foreground text-right">
                {explanation.length} / {CHARACTER_LIMIT} characters
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Confirmation Checkbox */}
        <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            className="mt-0.5"
          />
          <div className="space-y-1">
            <Label htmlFor="confirm" className="cursor-pointer text-sm font-medium text-foreground">
              By submitting this certification, you acknowledge that the information provided is accurate to the best of your knowledge. <span className="text-destructive">*</span>
            </Label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!canSubmit}
            className="min-w-[120px]"
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
