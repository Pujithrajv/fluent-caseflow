import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileText, ChevronDown, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CaseDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}

export function CaseDetailsTab({ onDataChange, data, isReadOnly = false, isSeededCase = false }: CaseDetailsTabProps) {
  const [initiatingActionDate, setInitiatingActionDate] = useState<Date>(
    data.initiatingActionDate ? new Date(data.initiatingActionDate) : undefined
  );
  const [responsiveActionDate, setResponsiveActionDate] = useState<Date>(
    data.responsiveActionDate ? new Date(data.responsiveActionDate) : undefined
  );
  const [selectedAccessibilityOptions, setSelectedAccessibilityOptions] = useState<string[]>(
    data.accessibilityOptions || []
  );
  const [isAccessibilityDropdownOpen, setIsAccessibilityDropdownOpen] = useState(false);

  const accessibilityOptions = [
    { value: "language-interpreter", label: "Language Interpreter" },
    { value: "sign-language-interpreter", label: "Sign Language Interpreter" },
    { value: "large-print", label: "Large Print Documents" },
    { value: "braille", label: "Braille Documents" },
    { value: "document-assistance", label: "Document Assistance" },
    { value: "sound-amplification", label: "Sound Amplification" },
    { value: "cart-transcription", label: "CART Transcription, TTY and TRS." },
    { value: "location-change", label: "Location Change" },
    { value: "special-scheduling", label: "Special Scheduling" },
    { value: "support-person", label: "Support Person" },
    { value: "support-animal", label: "Support Animal" },
    { value: "distraction-removal", label: "Distraction Removal" },
    { value: "frequent-breaks", label: "Frequent Breaks" },
    { value: "remote-proceeding", label: "Remote Proceeding" },
    { value: "mobility-device", label: "Mobility Device" },
    { value: "additional-time", label: "Additional Time" }
  ];

  const handleAccessibilityChange = (optionValue: string, checked: boolean) => {
    let newSelection: string[];
    if (checked) {
      newSelection = [...selectedAccessibilityOptions, optionValue];
    } else {
      newSelection = selectedAccessibilityOptions.filter(item => item !== optionValue);
    }
    setSelectedAccessibilityOptions(newSelection);
    onDataChange({ ...data, accessibilityOptions: newSelection });
  };


  const removeOption = (optionValue: string) => {
    const newSelection = selectedAccessibilityOptions.filter(item => item !== optionValue);
    setSelectedAccessibilityOptions(newSelection);
    onDataChange({ ...data, accessibilityOptions: newSelection });
  };

  const getSelectedLabels = () => {
    return selectedAccessibilityOptions.map(value => 
      accessibilityOptions.find(option => option.value === value)?.label
    ).filter(Boolean);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-fluent">Initiating Action Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !initiatingActionDate && "text-muted-foreground"
                    )}
                    disabled={isReadOnly || isSeededCase}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.initiatingActionDate || initiatingActionDate ? 
                      format(data.initiatingActionDate ? new Date(data.initiatingActionDate) : initiatingActionDate, "PPP") : 
                      <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={initiatingActionDate}
                    onSelect={setInitiatingActionDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-fluent">Responsive Action Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !responsiveActionDate && "text-muted-foreground"
                    )}
                    disabled={isReadOnly || isSeededCase}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.responsiveActionDate || responsiveActionDate ? 
                      format(data.responsiveActionDate ? new Date(data.responsiveActionDate) : responsiveActionDate, "PPP") : 
                      <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={responsiveActionDate}
                    onSelect={setResponsiveActionDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="font-fluent">Special Instructions</Label>
            <Textarea 
              id="specialInstructions"
              placeholder="Enter any special instructions or notes"
              className="shadow-fluent-8 border-input-border min-h-[100px]"
              disabled={isReadOnly || isSeededCase}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="captionNotation" className="font-fluent">Caption Notation</Label>
            <Textarea 
              id="captionNotation"
              placeholder="Enter caption notation"
              className="shadow-fluent-8 border-input-border min-h-[100px]"
              disabled={isReadOnly || isSeededCase}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-fluent">Accessibility Options</Label>
            <div className="relative">
              <Popover open={isAccessibilityDropdownOpen} onOpenChange={setIsAccessibilityDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal shadow-fluent-8 border-input-border h-auto min-h-[40px]",
                      selectedAccessibilityOptions.length === 0 && "text-muted-foreground"
                    )}
                    disabled={isReadOnly || isSeededCase}
                  >
                     <div className="flex flex-wrap gap-1">
                       {(data.accessibilityOptions?.length || selectedAccessibilityOptions.length) === 0 ? (
                         <span>Select accessibility options</span>
                       ) : (
                         getSelectedLabels().map((label, index) => (
                           <div
                             key={index}
                             className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                           >
                             <span>{label}</span>
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 const optionValue = accessibilityOptions.find(opt => opt.label === label)?.value;
                                 if (optionValue) removeOption(optionValue);
                               }}
                               className="hover:bg-primary/20 rounded-full p-0.5"
                             >
                               <X className="h-3 w-3" />
                             </button>
                           </div>
                         ))
                       )}
                     </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-50 bg-background border shadow-md" align="start">
                  <div className="p-3 space-y-3">
                    {accessibilityOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={selectedAccessibilityOptions.includes(option.value)}
                          onCheckedChange={(checked) => handleAccessibilityChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={option.value} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}