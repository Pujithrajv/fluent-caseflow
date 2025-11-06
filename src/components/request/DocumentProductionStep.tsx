import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DocumentProductionStepProps {
  data: any;
  cutoffDate: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

interface Recipient {
  name: string;
  phone: string;
  email: string;
}

export function DocumentProductionStep({ data, cutoffDate, onNext, onBack }: DocumentProductionStepProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(data?.recipients || []);
  const [receiveDate, setReceiveDate] = useState(data?.receiveDate || "");
  const [productionDueDate, setProductionDueDate] = useState(data?.productionDueDate || "");

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", phone: "", email: "" }]);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const updateRecipient = (index: number, field: keyof Recipient, value: string) => {
    const updated = [...recipients];
    updated[index][field] = value;
    setRecipients(updated);
  };

  const handleReceiveDateChange = (date: string) => {
    setReceiveDate(date);
    if (date) {
      const receive = new Date(date);
      receive.setDate(receive.getDate() + 28);
      setProductionDueDate(receive.toISOString().split('T')[0]);
    }
  };

  const showCutoffWarning = productionDueDate && new Date(productionDueDate) > new Date(cutoffDate);

  const handleNext = () => {
    onNext({
      documentProductionData: {
        recipients,
        receiveDate,
        productionDueDate
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Production</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Recipients <span className="text-red-500">*</span></Label>
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
              {recipients.map((recipient, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={recipient.name}
                      onChange={(e) => updateRecipient(index, "name", e.target.value)}
                      placeholder="Name"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={recipient.phone}
                      onChange={(e) => updateRecipient(index, "phone", e.target.value)}
                      placeholder="Phone"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={recipient.email}
                      onChange={(e) => updateRecipient(index, "email", e.target.value)}
                      placeholder="Email"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRecipient(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" size="sm" onClick={addRecipient}>
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="receiveDate">
              When will they receive? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="receiveDate"
              type="date"
              value={receiveDate}
              onChange={(e) => handleReceiveDateChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productionDueDate">
              When is production due? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productionDueDate"
              type="date"
              value={productionDueDate}
              onChange={(e) => setProductionDueDate(e.target.value)}
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
