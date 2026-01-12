import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RequestData } from "@/pages/DemoRequestWizard";

interface RequestStepProps {
  data: RequestData;
  onNext: (data: Partial<RequestData>) => void;
}

export function RequestStep({ data, onNext }: RequestStepProps) {
  const [requestGroup, setRequestGroup] = useState<RequestData["requestGroup"]>(data.requestGroup);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.selectedRequestTypes);
  const [summary, setSummary] = useState(data.summary);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!requestGroup) {
      newErrors.requestGroup = "Please select a Request Group";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      requestGroup,
      selectedRequestTypes: selectedTypes,
      summary
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Group */}
        <div className="space-y-2">
          <Label htmlFor="requestGroup">
            Request Group <span className="text-red-500">*</span>
          </Label>
          <Select
            value={requestGroup}
            onValueChange={(value: any) => {
              setRequestGroup(value);
              setErrors({});
            }}
          >
            <SelectTrigger id="requestGroup">
              <SelectValue placeholder="Select request group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Motion">Motion</SelectItem>
              <SelectItem value="Exhibit">Exhibit</SelectItem>
            </SelectContent>
          </Select>
          {errors.requestGroup && (
            <p className="text-sm text-red-600">{errors.requestGroup}</p>
          )}
        </div>


        {/* Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">Summary (Optional)</Label>
          <Textarea
            id="summary"
            placeholder="Enter a brief summary of this request..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
          />
        </div>

        {/* Selected Types Display */}
        {selectedTypes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <div
                key={type}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {type}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          <Button onClick={handleNext} size="lg">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
