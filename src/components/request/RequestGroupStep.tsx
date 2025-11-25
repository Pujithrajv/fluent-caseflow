import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface RequestGroupStepProps {
  requestGroup: string;
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function RequestGroupStep({ requestGroup, data, onNext, onBack }: RequestGroupStepProps) {
  const [discoverySummary, setDiscoverySummary] = useState(data.discoverySummary || "");

  const handleNext = () => {
    onNext({
      discoveryData: {
        ...data,
        discoverySummary
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {requestGroup === "Discovery" 
            ? "Discovery Information ( this is only for CRM)" 
            : `${requestGroup} Information`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {requestGroup === "Discovery" && (
          <>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Dates are established by the ALJ's Discovery Order and cannot be changed in the portal.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discovery Start Date</Label>
                <Input value={data.startDate} readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Discovery Cutoff Date</Label>
                <Input value={data.cutoffDate} readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Date for Discovery Conference / Monitor</Label>
                <Input value={data.conferenceDate} readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Case ID</Label>
                <Input value={data.caseId} readOnly className="bg-muted" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Process Stage</Label>
              <Input value={data.processStage} readOnly className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label>Discovery Summary (Optional)</Label>
              <Textarea
                placeholder="Enter additional discovery summary..."
                value={discoverySummary}
                onChange={(e) => setDiscoverySummary(e.target.value)}
                rows={4}
              />
            </div>
          </>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
