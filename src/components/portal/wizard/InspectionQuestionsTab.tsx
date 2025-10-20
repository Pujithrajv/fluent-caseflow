import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Trash2 } from "lucide-react";

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface InspectionQuestionsTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  isReadOnly?: boolean;
}

export function InspectionQuestionsTab({ 
  data, 
  onDataChange, 
  onValidationChange, 
  isReadOnly = false 
}: InspectionQuestionsTabProps) {
  const [formData, setFormData] = useState({
    whatToInspect: data.whatToInspect || '',
    inspectionPurpose: data.inspectionPurpose || '',
    whoControlsPersons: data.whoControlsPersons || [{ id: '1', name: '', phone: '', email: '' }],
    ...data
  });

  const updateFormData = (updates: any) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onDataChange(newData);
  };

  const validateForm = () => {
    const hasWhoControlsPersons = formData.whoControlsPersons.some((person: Person) => 
      person.name.trim() && person.phone.trim() && person.email.trim()
    );
    const isValid = formData.whatToInspect.trim().length > 0 &&
                   formData.inspectionPurpose.trim().length > 0 &&
                   hasWhoControlsPersons;
    
    if (onValidationChange) onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const addWhoControlsPerson = () => {
    const newPerson = { id: Date.now().toString(), name: '', phone: '', email: '' };
    updateFormData({ whoControlsPersons: [...formData.whoControlsPersons, newPerson] });
  };

  const removeWhoControlsPerson = (id: string) => {
    if (formData.whoControlsPersons.length > 1) {
      updateFormData({ 
        whoControlsPersons: formData.whoControlsPersons.filter((p: Person) => p.id !== id) 
      });
    }
  };

  const updateWhoControlsPerson = (id: string, field: keyof Person, value: string) => {
    updateFormData({
      whoControlsPersons: formData.whoControlsPersons.map((p: Person) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  return (
    <Card className="shadow-fluent-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-fluent">
          <Search className="h-5 w-5 text-primary" />
          <span>Inspection Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="whatToInspect" className="font-fluent">
            What is to be inspected? *
          </Label>
          <Textarea
            id="whatToInspect"
            placeholder="Describe what items, areas, or materials are to be inspected..."
            className="min-h-[100px] shadow-fluent-8 border-input-border"
            disabled={isReadOnly}
            value={formData.whatToInspect}
            onChange={(e) => updateFormData({ whatToInspect: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inspectionPurpose" className="font-fluent">
            What is the purpose of the inspection? *
          </Label>
          <Textarea
            id="inspectionPurpose"
            placeholder="Explain the purpose and objectives of the inspection..."
            className="min-h-[100px] shadow-fluent-8 border-input-border"
            disabled={isReadOnly}
            value={formData.inspectionPurpose}
            onChange={(e) => updateFormData({ inspectionPurpose: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="font-fluent">Who controls the inspection? *</Label>
            {!isReadOnly && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addWhoControlsPerson}
                className="shadow-fluent-8"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Person
              </Button>
            )}
          </div>
          <div className="border rounded-md shadow-fluent-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  {!isReadOnly && <TableHead className="w-[50px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.whoControlsPersons.map((person: Person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <Input
                        value={person.name}
                        onChange={(e) => updateWhoControlsPerson(person.id, 'name', e.target.value)}
                        placeholder="Enter name"
                        disabled={isReadOnly}
                        className="shadow-fluent-8 border-input-border"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={person.phone}
                        onChange={(e) => updateWhoControlsPerson(person.id, 'phone', e.target.value)}
                        placeholder="Enter phone"
                        disabled={isReadOnly}
                        className="shadow-fluent-8 border-input-border"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={person.email}
                        onChange={(e) => updateWhoControlsPerson(person.id, 'email', e.target.value)}
                        placeholder="Enter email"
                        disabled={isReadOnly}
                        className="shadow-fluent-8 border-input-border"
                      />
                    </TableCell>
                    {!isReadOnly && (
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeWhoControlsPerson(person.id)}
                          disabled={formData.whoControlsPersons.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}