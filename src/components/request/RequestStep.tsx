import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";
import { RequestData } from "@/pages/DemoRequestWizard";

interface RequestStepProps {
  data: RequestData;
  onNext: (data: Partial<RequestData>) => void;
}

const discoveryTypes = [
  { id: "Interrogatories", label: "Interrogatories" },
  { id: "Document Production (Request to Produce)", label: "Document Production (Request to Produce)" },
  { id: "Deposition", label: "Deposition" },
  { id: "Inspection", label: "Inspection" }
];

export function RequestStep({ data, onNext }: RequestStepProps) {
  const [requestGroup, setRequestGroup] = useState<RequestData["requestGroup"]>(data.requestGroup);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.selectedRequestTypes);
  const [summary, setSummary] = useState(data.summary);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discoveryEnabled = true; // Would come from CRM

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!requestGroup) {
      newErrors.requestGroup = "Please select a Request Group";
    }

    if (requestGroup === "Discovery" && !discoveryEnabled) {
      newErrors.discovery = "Discovery has not been authorized for this case";
      setErrors(newErrors);
      return;
    }

    if (requestGroup === "Discovery" && selectedTypes.length === 0) {
      newErrors.requestTypes = "Select at least one Discovery Type";
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
              if (value !== "Discovery") {
                setSelectedTypes([]);
              }
              setErrors({});
            }}
          >
            <SelectTrigger id="requestGroup">
              <SelectValue placeholder="Select request group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Motion">Motion</SelectItem>
              <SelectItem value="Exhibit">Exhibit</SelectItem>
              <SelectItem value="Discovery">Discovery</SelectItem>
            </SelectContent>
          </Select>
          {errors.requestGroup && (
            <p className="text-sm text-red-600">{errors.requestGroup}</p>
          )}
        </div>

        {/* Discovery Type Multi-Select */}
        {requestGroup === "Discovery" && (
          <>
            {!discoveryEnabled && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Discovery has not been authorized for this case.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>
                Request Type <span className="text-red-500">*</span>
              </Label>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Only the Discovery types authorized by the ALJ for this case are selectable.
                </AlertDescription>
              </Alert>
              <div className="space-y-3 mt-3">
                {discoveryTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => handleTypeToggle(type.id)}
                    />
                    <Label
                      htmlFor={type.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.requestTypes && (
                <p className="text-sm text-red-600">{errors.requestTypes}</p>
              )}
            </div>
          </>
        )}

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
