import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Plus, Trash2, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DepositionStepProps {
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

export function DepositionStep({ data, cutoffDate, onNext, onBack }: DepositionStepProps) {
  const [persons, setPersons] = useState<Person[]>(data?.persons || []);
  const [reason, setReason] = useState(data?.reason || "");
  const [canUseInterrogatories, setCanUseInterrogatories] = useState(data?.canUseInterrogatories || "");
  const [dateRangeStart, setDateRangeStart] = useState(data?.dateRangeStart || "");
  const [dateRangeEnd, setDateRangeEnd] = useState(data?.dateRangeEnd || "");

  const addPerson = () => {
    setPersons([...persons, { name: "", phone: "", email: "" }]);
  };

  const removePerson = (index: number) => {
    setPersons(persons.filter((_, i) => i !== index));
  };

  const updatePerson = (index: number, field: keyof Person, value: string) => {
    const updated = [...persons];
    updated[index][field] = value;
    setPersons(updated);
  };

  const showCutoffWarning = dateRangeEnd && new Date(dateRangeEnd) > new Date(cutoffDate);

  const handleNext = () => {
    onNext({
      depositionData: {
        persons,
        reason,
        canUseInterrogatories,
        dateRangeStart,
        dateRangeEnd
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Depositions must be coordinated within 7 days and completed before the discovery cutoff.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label>Who to be deposed? <span className="text-red-500">*</span></Label>
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
              {persons.map((person, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={person.name}
                      onChange={(e) => updatePerson(index, "name", e.target.value)}
                      placeholder="Name"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={person.phone}
                      onChange={(e) => updatePerson(index, "phone", e.target.value)}
                      placeholder="Phone"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={person.email}
                      onChange={(e) => updatePerson(index, "email", e.target.value)}
                      placeholder="Email"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePerson(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" size="sm" onClick={addPerson}>
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">
            Why is their deposition necessary? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this deposition is necessary..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Can testimony be gotten by interrogatories? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={canUseInterrogatories} onValueChange={setCanUseInterrogatories}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="font-normal">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="font-normal">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Date range for completion <span className="text-red-500">*</span></Label>
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
