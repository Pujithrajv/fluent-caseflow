import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CaseDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function CaseDetailsTab({ onDataChange, data }: CaseDetailsTabProps) {
  const [notifiedDate, setNotifiedDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Case Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="caseName" className="font-fluent">Case Name *</Label>
            <Input 
              id="caseName"
              placeholder="Enter case name"
              className="shadow-fluent-8 border-input-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accessibility" className="font-fluent">Accessibility Options</Label>
            <Select>
              <SelectTrigger className="shadow-fluent-8 border-input-border">
                <SelectValue placeholder="Select accessibility options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None Required</SelectItem>
                <SelectItem value="interpreter">Sign Language Interpreter</SelectItem>
                <SelectItem value="wheelchair">Wheelchair Accessible</SelectItem>
                <SelectItem value="audio">Audio Enhancement</SelectItem>
                <SelectItem value="braille">Braille Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label className="font-fluent">Expedited Processing *</Label>
            <RadioGroup defaultValue="no" className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="expedited-yes" />
                <Label htmlFor="expedited-yes" className="font-fluent">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="expedited-no" />
                <Label htmlFor="expedited-no" className="font-fluent">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label className="font-fluent">Notified Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !notifiedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {notifiedDate ? format(notifiedDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={notifiedDate}
                  onSelect={setNotifiedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="font-fluent">Special Instructions</Label>
            <Textarea 
              id="specialInstructions"
              placeholder="Enter any special instructions or notes"
              className="shadow-fluent-8 border-input-border min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="captionNotation" className="font-fluent">Caption Notation</Label>
            <Input 
              id="captionNotation"
              placeholder="Enter caption notation"
              className="shadow-fluent-8 border-input-border"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}