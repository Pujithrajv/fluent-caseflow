import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Plus, Trash2, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface DepositionQuestionsTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  isReadOnly?: boolean;
}

export function DepositionQuestionsTab({ 
  data, 
  onDataChange, 
  onValidationChange, 
  isReadOnly = false 
}: DepositionQuestionsTabProps) {
  const [formData, setFormData] = useState({
    hasExpert: data.hasExpert || false,
    expertPersons: data.expertPersons || [{ id: '1', name: '', phone: '', email: '' }],
    expertSubjectMatter: data.expertSubjectMatter || '',
    hasWrittenReport: data.hasWrittenReport || false,
    expertDepositionDate: data.expertDepositionDate ? new Date(data.expertDepositionDate) : undefined,
    depositionPersons: data.depositionPersons || [{ id: '1', name: '', phone: '', email: '' }],
    depositionNecessaryReason: data.depositionNecessaryReason || '',
    interrogatoriesText: data.interrogatoriesText || '',
    completionDate: data.completionDate ? new Date(data.completionDate) : undefined,
    whoToBeDeposed: data.whoToBeDeposed || '',
    testimonyFromInterrogatories: data.testimonyFromInterrogatories || false,
    ...data
  });

  const updateFormData = (updates: any) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onDataChange(newData);
  };

  const validateForm = () => {
    let isValid = true;
    if (formData.hasExpert) {
      const hasValidExpertPersons = formData.expertPersons.some((person: Person) => 
        person.name.trim() && person.phone.trim() && person.email.trim()
      );
      const hasExpertSubjectMatter = formData.expertSubjectMatter.trim().length > 0;
      const hasExpertDate = !!formData.expertDepositionDate;
      if (!hasValidExpertPersons || !hasExpertSubjectMatter || !hasExpertDate) {
        isValid = false;
      }
    }
    const hasValidDepositionPersons = formData.depositionPersons.some((person: Person) => 
      person.name.trim() && person.phone.trim() && person.email.trim()
    );
    const hasNecessaryReason = formData.depositionNecessaryReason.trim().length > 0;
    const hasInterrogatoriesText = formData.interrogatoriesText.trim().length > 0;
    const hasCompletionDate = !!formData.completionDate;
    const hasWhoToBeDeposed = formData.whoToBeDeposed.trim().length > 0;
    if (!hasValidDepositionPersons || !hasNecessaryReason || !hasInterrogatoriesText || !hasCompletionDate || !hasWhoToBeDeposed) {
      isValid = false;
    }
    if (onValidationChange) onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Expert Section</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <Switch
              id="hasExpert"
              checked={formData.hasExpert}
              onCheckedChange={(checked) => updateFormData({ hasExpert: checked })}
              disabled={isReadOnly}
            />
            <Label htmlFor="hasExpert" className="font-fluent text-base font-medium">
              Is there an Expert?
            </Label>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Deposition Info Section</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="whoToBeDeposed" className="font-fluent">
              Who to be deposed? *
            </Label>
            <Textarea
              id="whoToBeDeposed"
              placeholder="Enter who will be deposed..."
              className="min-h-[80px] shadow-fluent-8 border-input-border"
              disabled={isReadOnly}
              value={formData.whoToBeDeposed}
              onChange={(e) => updateFormData({ whoToBeDeposed: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositionNecessaryReason" className="font-fluent">
              Why is their deposition necessary *
            </Label>
            <Textarea
              id="depositionNecessaryReason"
              placeholder="Explain why the deposition is necessary..."
              className="min-h-[80px] shadow-fluent-8 border-input-border"
              disabled={isReadOnly}
              value={formData.depositionNecessaryReason}
              onChange={(e) => updateFormData({ depositionNecessaryReason: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="testimonyFromInterrogatories"
              checked={formData.testimonyFromInterrogatories}
              onCheckedChange={(checked) => updateFormData({ testimonyFromInterrogatories: checked })}
              disabled={isReadOnly}
            />
            <Label htmlFor="testimonyFromInterrogatories" className="font-fluent text-base">
              Are the testimony available from interrogatories?
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="font-fluent">If deposition allowed, date range for completion *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isReadOnly}
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !formData.completionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.completionDate ? format(formData.completionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.completionDate}
                  onSelect={(date) => updateFormData({ completionDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}