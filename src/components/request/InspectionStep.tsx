import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InspectionStepProps {
  data: any;
  cutoffDate: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

interface Person {
  name: string;
  phone: string;
  email: string;
}

export function InspectionStep({ data, cutoffDate, onNext, onBack }: InspectionStepProps) {
  const [whatToInspect, setWhatToInspect] = useState(data?.whatToInspect || "");
  const [purpose, setPurpose] = useState(data?.purpose || "");
  const [controllers, setControllers] = useState<Person[]>(data?.controllers || []);
  const [dateRangeStart, setDateRangeStart] = useState(data?.dateRangeStart || "");
  const [dateRangeEnd, setDateRangeEnd] = useState(data?.dateRangeEnd || "");

  const addController = () => {
    setControllers([...controllers, { name: "", phone: "", email: "" }]);
  };

  const removeController = (index: number) => {
    setControllers(controllers.filter((_, i) => i !== index));
  };

  const updateController = (index: number, field: keyof Person, value: string) => {
    const updated = [...controllers];
    updated[index][field] = value;
    setControllers(updated);
  };

  const showCutoffWarning = dateRangeEnd && new Date(dateRangeEnd) > new Date(cutoffDate);

  const handleNext = () => {
    onNext({
      inspectionData: {
        whatToInspect,
        purpose,
        controllers,
        dateRangeStart,
        dateRangeEnd
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="whatToInspect">
            What is to be inspected? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="whatToInspect"
            value={whatToInspect}
            onChange={(e) => setWhatToInspect(e.target.value)}
            placeholder="Describe what needs to be inspected..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">
            What is the purpose of the inspection? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Explain the purpose..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Who controls the inspection? <span className="text-red-500">*</span></Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controllers.map((controller, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={controller.name}
                      onChange={(e) => updateController(index, "name", e.target.value)}
                      placeholder="Name"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={controller.phone}
                      onChange={(e) => updateController(index, "phone", e.target.value)}
                      placeholder="Phone"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={controller.email}
                      onChange={(e) => updateController(index, "email", e.target.value)}
                      placeholder="Email"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeController(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" size="sm" onClick={addController}>
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Date or date range for inspection <span className="text-red-500">*</span></Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={dateRangeStart}
              onChange={(e) => setDateRangeStart(e.target.value)}
              placeholder="Start date"
            />
            <Input
              type="date"
              value={dateRangeEnd}
              onChange={(e) => setDateRangeEnd(e.target.value)}
              placeholder="End date"
            />
          </div>
        </div>

        {showCutoffWarning && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This request may not be completed before the discovery cutoff ({cutoffDate}). Consider filing a Motion to Extend Discovery Deadline.
            </AlertDescription>
          </Alert>
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
