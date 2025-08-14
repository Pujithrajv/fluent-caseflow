import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Plus, Trash2, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface InterrogatoriesQuestionsTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  isReadOnly?: boolean;
}

export function InterrogatoriesQuestionsTab({ 
  data, 
  onDataChange, 
  onValidationChange, 
  isReadOnly = false 
}: InterrogatoriesQuestionsTabProps) {
  const [formData, setFormData] = useState({
    persons: data.persons || [{ id: '1', name: '', phone: '', email: '' }],
    receiveDate: data.receiveDate ? new Date(data.receiveDate) : undefined,
    replyDueDate: data.replyDueDate ? new Date(data.replyDueDate) : undefined,
    ...data
  });

  const updateFormData = (updates: any) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onDataChange(newData);
  };

  const validateForm = () => {
    const hasValidPersons = formData.persons.some((person: Person) => 
      person.name.trim() && person.phone.trim() && person.email.trim()
    );
    const hasReceiveDate = !!formData.receiveDate;
    const hasReplyDueDate = !!formData.replyDueDate;
    
    const isValid = hasValidPersons && hasReceiveDate && hasReplyDueDate;
    if (onValidationChange) onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const addPerson = () => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: '',
      phone: '',
      email: ''
    };
    updateFormData({
      persons: [...formData.persons, newPerson]
    });
  };

  const removePerson = (id: string) => {
    if (formData.persons.length > 1) {
      updateFormData({
        persons: formData.persons.filter((person: Person) => person.id !== id)
      });
    }
  };

  const updatePerson = (id: string, field: keyof Person, value: string) => {
    updateFormData({
      persons: formData.persons.map((person: Person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    });
  };

  return (
    <Card className="shadow-fluent-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-fluent">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Interrogatory Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Persons Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-fluent text-base font-medium">
              What persons to receive *
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPerson}
              disabled={isReadOnly}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Person</span>
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.persons.map((person: Person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <Input
                        value={person.name}
                        onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                        placeholder="Enter name"
                        disabled={isReadOnly}
                        className="border-none shadow-none focus:ring-0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={person.phone}
                        onChange={(e) => updatePerson(person.id, 'phone', e.target.value)}
                        placeholder="(XXX) XXX-XXXX"
                        disabled={isReadOnly}
                        className="border-none shadow-none focus:ring-0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={person.email}
                        onChange={(e) => updatePerson(person.id, 'email', e.target.value)}
                        placeholder="email@example.com"
                        type="email"
                        disabled={isReadOnly}
                        className="border-none shadow-none focus:ring-0"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePerson(person.id)}
                        disabled={isReadOnly || formData.persons.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-fluent">When will they receive *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isReadOnly}
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !formData.receiveDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.receiveDate ? format(formData.receiveDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.receiveDate}
                  onSelect={(date) => updateFormData({ receiveDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="font-fluent">When is reply due *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isReadOnly}
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !formData.replyDueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.replyDueDate ? format(formData.replyDueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.replyDueDate}
                  onSelect={(date) => updateFormData({ replyDueDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}