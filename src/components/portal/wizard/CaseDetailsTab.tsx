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
}

export function CaseDetailsTab({ onDataChange, data }: CaseDetailsTabProps) {
  const [initiatingActionDate, setInitiatingActionDate] = useState<Date>();
  const [responsiveActionDate, setResponsiveActionDate] = useState<Date>();
  const [selectedAccessibilityOptions, setSelectedAccessibilityOptions] = useState<string[]>([]);
  const [isAccessibilityDropdownOpen, setIsAccessibilityDropdownOpen] = useState(false);

  const accessibilityOptions = [
    { value: "interpreter", label: "Sign Language Interpreter" },
    { value: "wheelchair", label: "Wheelchair Accessible" },
    { value: "audio", label: "Audio Enhancement" },
    { value: "braille", label: "Braille Documents" },
    { value: "largeprint", label: "Large Print Documents" },
    { value: "assistive", label: "Assistive Technology Support" }
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allValues = accessibilityOptions.map(option => option.value);
      setSelectedAccessibilityOptions(allValues);
      onDataChange({ ...data, accessibilityOptions: allValues });
    } else {
      setSelectedAccessibilityOptions([]);
      onDataChange({ ...data, accessibilityOptions: [] });
    }
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
      {/* Expedited Badge */}
      <Card className="shadow-fluent-8 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Expedited Processing</p>
              <Badge variant="secondary">No</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Case Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  >
                    <div className="flex flex-wrap gap-1">
                      {selectedAccessibilityOptions.length === 0 ? (
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
                    <div className="flex items-center space-x-2 pb-2 border-b">
                      <Checkbox
                        id="select-all"
                        checked={selectedAccessibilityOptions.length === accessibilityOptions.length}
                        onCheckedChange={handleSelectAll}
                      />
                      <Label htmlFor="select-all" className="font-medium">
                        Select All
                      </Label>
                    </div>
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
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {initiatingActionDate ? format(initiatingActionDate, "PPP") : <span>Select date</span>}
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
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {responsiveActionDate ? format(responsiveActionDate, "PPP") : <span>Select date</span>}
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="captionNotation" className="font-fluent">Caption Notation</Label>
            <Textarea 
              id="captionNotation"
              placeholder="Enter caption notation"
              className="shadow-fluent-8 border-input-border min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}