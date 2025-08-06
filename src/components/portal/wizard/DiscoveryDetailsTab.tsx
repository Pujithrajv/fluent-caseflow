import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, X, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DiscoveryDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const discoveryTypes = [
  { id: "interrogatories", label: "Interrogatories" },
  { id: "document-production", label: "Document Production" },
  { id: "deposition", label: "Deposition" },
  { id: "inspection", label: "Inspection" }
];

export function DiscoveryDetailsTab({ onDataChange, data }: DiscoveryDetailsTabProps) {
  const [selectedDiscoveryTypes, setSelectedDiscoveryTypes] = useState<string[]>(data.discoveryTypes || []);
  const [discoverySchedule, setDiscoverySchedule] = useState(data.discoverySchedule || "");
  const [discoveryStartDate, setDiscoveryStartDate] = useState<Date | undefined>(data.discoveryStartDate);
  const [discoveryCutoffDate, setDiscoveryCutoffDate] = useState<Date | undefined>(data.discoveryCutoffDate);
  const [discoveryConferenceDate, setDiscoveryConferenceDate] = useState<Date | undefined>(data.discoveryConferenceDate);

  const handleDiscoveryTypeChange = (typeId: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...selectedDiscoveryTypes, typeId]
      : selectedDiscoveryTypes.filter(id => id !== typeId);
    
    setSelectedDiscoveryTypes(updatedTypes);
    onDataChange({ discoveryTypes: updatedTypes });
  };

  const removeDiscoveryType = (typeId: string) => {
    const updatedTypes = selectedDiscoveryTypes.filter(id => id !== typeId);
    setSelectedDiscoveryTypes(updatedTypes);
    onDataChange({ discoveryTypes: updatedTypes });
  };

  const handleScheduleChange = (value: string) => {
    setDiscoverySchedule(value);
    onDataChange({ discoverySchedule: value });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setDiscoveryStartDate(date);
    onDataChange({ discoveryStartDate: date });
  };

  const handleCutoffDateChange = (date: Date | undefined) => {
    setDiscoveryCutoffDate(date);
    onDataChange({ discoveryCutoffDate: date });
  };

  const handleConferenceDateChange = (date: Date | undefined) => {
    setDiscoveryConferenceDate(date);
    onDataChange({ discoveryConferenceDate: date });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Discovery Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="discoverySchedule" className="font-fluent">Set Discovery Schedule *</Label>
              <Select value={discoverySchedule} onValueChange={handleScheduleChange}>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select discovery schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="by-alj-order">By ALJ Order</SelectItem>
                  <SelectItem value="by-agreed-order">By Agreed Order</SelectItem>
                  <SelectItem value="at-pre-hearing-conference">At Pre-Hearing Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-fluent">Type of Discovery Allowed *</Label>
              <div className="space-y-3">
                {discoveryTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedDiscoveryTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleDiscoveryTypeChange(type.id, checked as boolean)}
                    />
                    <Label htmlFor={type.id} className="font-fluent cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
              
              {selectedDiscoveryTypes.length > 0 && (
                <div className="mt-3">
                  <Label className="font-fluent text-sm text-muted-foreground">Selected Discovery Types:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedDiscoveryTypes.map((typeId) => {
                      const type = discoveryTypes.find(t => t.id === typeId);
                      return (
                        <Badge key={typeId} variant="secondary" className="flex items-center gap-1">
                          {type?.label}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeDiscoveryType(typeId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-fluent">Discovery Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryStartDate ? format(discoveryStartDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryStartDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-fluent">Discovery Cutoff Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryCutoffDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryCutoffDate ? format(discoveryCutoffDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryCutoffDate}
                    onSelect={handleCutoffDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-fluent">Date for Discovery Conference to monitor progress of discovery</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryConferenceDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryConferenceDate ? format(discoveryConferenceDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryConferenceDate}
                    onSelect={handleConferenceDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="caseId" className="font-fluent">Case ID</Label>
              <Input 
                id="caseId"
                value="AUTO-GENERATED"
                disabled
                className="shadow-fluent-8 border-input-border bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="processStage" className="font-fluent">Process Stage</Label>
              <Input 
                id="processStage"
                value="Initial Review"
                disabled
                className="shadow-fluent-8 border-input-border bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discoverySummary" className="font-fluent">Discovery Summary *</Label>
            <Textarea 
              id="discoverySummary"
              placeholder="Provide a detailed summary of your discovery request..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}