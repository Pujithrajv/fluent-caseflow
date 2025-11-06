import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RequestData } from "@/pages/DemoRequestWizard";

interface ReviewSubmitStepProps {
  data: RequestData;
  onBack: () => void;
}

export function ReviewSubmitStep({ data, onBack }: ReviewSubmitStepProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    general: true,
    discovery: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  const handleSubmit = () => {
    if (!confirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that the information provided is true and correct.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Request Submitted",
      description: "Your discovery request has been submitted successfully. Request ID: REQ-2024-001",
    });

    setTimeout(() => {
      navigate("/portal");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Information */}
        <Collapsible open={openSections.general}>
          <CollapsibleTrigger
            onClick={() => toggleSection("general")}
            className="flex items-center justify-between w-full p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold">General Information</h3>
            {openSections.general ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3 pl-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Request Group</p>
                <p className="font-medium">{data.requestGroup}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case ID</p>
                <p className="font-medium">{data.discoveryData.caseId}</p>
              </div>
            </div>
            {data.summary && (
              <div>
                <p className="text-sm text-muted-foreground">Summary</p>
                <p className="font-medium">{data.summary}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected Request Types</p>
              <div className="flex flex-wrap gap-2">
                {data.selectedRequestTypes.map((type) => (
                  <Badge key={type}>{type}</Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Discovery Information */}
        <Collapsible open={openSections.discovery}>
          <CollapsibleTrigger
            onClick={() => toggleSection("discovery")}
            className="flex items-center justify-between w-full p-4 bg-muted rounded-lg"
          >
            <h3 className="font-semibold">Discovery Information</h3>
            {openSections.discovery ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3 pl-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Discovery Start Date</p>
                <p className="font-medium">{data.discoveryData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discovery Cutoff Date</p>
                <p className="font-medium">{data.discoveryData.cutoffDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conference Date</p>
                <p className="font-medium">{data.discoveryData.conferenceDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Process Stage</p>
                <p className="font-medium">{data.discoveryData.processStage}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Documents */}
        {data.documents.length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Attached Documents</h3>
            <p className="text-sm text-muted-foreground">{data.documents.length} file(s) attached</p>
          </div>
        )}

        {/* Confirmation */}
        <div className="flex items-start space-x-2 p-4 border border-border rounded-lg">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="confirm" className="cursor-pointer font-medium">
              I confirm the information provided is true and correct <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              By checking this box, you acknowledge that all information provided is accurate.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleSubmit} size="lg" disabled={!confirmed}>
            Submit Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
