import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, CalendarIcon, Plus, Trash2, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RequestDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  requestType?: string;
}

interface CustomQuestion {
  id: string;
  question: string;
  answer: boolean;
}

export function RequestDetailsTab({ onDataChange, data, requestType = "motion" }: RequestDetailsTabProps) {
  const [motionType, setMotionType] = useState("");
  const [consultOtherSide, setConsultOtherSide] = useState(false);
  const [outcome, setOutcome] = useState("");
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");

  const motionTypeOptions = [
    "Motion for In Camera Inspection",
    "Motion for Protective Order",
    "Motion for Recusal",
    "Motion for Substitution of Counsel",
    "Motion to Amend Pleadings",
    "Motion to Continue",
    "Motion to Dismiss",
    "Motion to Withdraw as Counsel",
    "Motion to Withdraw Case",
    "Motions Otherwise Not Classified",
    "Motion to Compel Discovery",
    "Motion to Issue a Subpoena",
    "Motion to Quash a Subpoena",
    "Motion to Exclude",
    "Motion to Leave to Correct the Record",
    "Motion to Object to Exhibit Admission",
    "Motion to Re-Open the Record",
    "Motion to Take Judicial Notice",
    "Motion for Reconsideration",
    "Motion for Rehearing",
    "Motion for Change of Venue",
    "Motion for Default Judgment",
    "Motion for Expedited Consideration",
    "Motion for Substitution of ALJ",
    "Motion for Summary Judgement",
    "Motion in Limine",
    "Motion to Advance a Court Date",
    "Motion to Consolidate",
    "Motion to Dismiss on Legal Grounds"
  ];

  const addCustomQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion: CustomQuestion = {
        id: `custom-${Date.now()}`,
        question: newQuestionText.trim(),
        answer: false
      };
      setCustomQuestions([...customQuestions, newQuestion]);
      setNewQuestionText("");
    }
  };

  const removeCustomQuestion = (id: string) => {
    setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  const updateCustomQuestionAnswer = (id: string, answer: boolean) => {
    setCustomQuestions(customQuestions.map(q => 
      q.id === id ? { ...q, answer } : q
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>
              {requestType === "exhibit" ? "Exhibit Details" : 
               requestType === "pleadings" ? "Pleading Details" :
               requestType === "certificate" ? "Certificate Details" : 
               "Motion Details"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TooltipProvider>
            {/* Only show motion-specific fields for motion requests */}
            {requestType === "motion" && (
              <>
                {/* Type of Motion */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="motionType" className="font-fluent font-semibold text-sm">Type of Motion *</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the specific type of motion you are filing</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={motionType} onValueChange={setMotionType}>
                    <SelectTrigger className="shadow-fluent-8 border-input-border">
                      <SelectValue placeholder="Select motion type" />
                    </SelectTrigger>
                    <SelectContent>
                      {motionTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Consult Other Side */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="consultOtherSide" className="font-fluent font-semibold text-sm">Consult other side?</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Did you consult with the opposing party before filing this motion?</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="consultOtherSide"
                      checked={consultOtherSide}
                      onCheckedChange={setConsultOtherSide}
                    />
                    <Label htmlFor="consultOtherSide" className="text-sm">
                      {consultOtherSide ? "Yes" : "No"}
                    </Label>
                  </div>
                </div>

                {/* What was the outcome */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="outcome" className="font-fluent font-semibold text-sm">What was the outcome?</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Describe the outcome of consulting with the other side or why consultation was not possible</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Textarea 
                    id="outcome"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    placeholder="Describe the outcome or explain why consultation was not possible..."
                    className="shadow-fluent-8 border-input-border min-h-24"
                  />
                </div>
              </>
            )}

            {/* Exhibit-specific fields can be added here for exhibit requests */}
            {requestType === "exhibit" && (
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Exhibit Description *</Label>
                <Textarea 
                  placeholder="Describe the exhibit you are submitting..."
                  className="shadow-fluent-8 border-input-border min-h-24"
                />
              </div>
            )}

            {/* Pleadings-specific fields */}
            {requestType === "pleadings" && (
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Pleading Description *</Label>
                <Textarea 
                  placeholder="Describe the pleading you are submitting..."
                  className="shadow-fluent-8 border-input-border min-h-24"
                />
              </div>
            )}

            {/* Certificate requests - no specific fields needed */}
            {requestType === "certificate" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Certificate details will be collected in the documents section.</p>
              </div>
            )}

            {/* Custom Questions Section */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h3 className="font-fluent font-semibold text-base">Custom Questions</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCustomQuestion}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Custom Question</span>
                </Button>
              </div>

              {/* Add new question input */}
              <div className="flex space-x-2">
                <Input
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Enter your custom question..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addCustomQuestion}
                  disabled={!newQuestionText.trim()}
                  size="sm"
                >
                  Add
                </Button>
              </div>

              {/* Display custom questions */}
              {customQuestions.length > 0 && (
                <div className="space-y-3">
                  {customQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-sm font-medium">{question.question}</span>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={question.answer}
                            onCheckedChange={(checked) => updateCustomQuestionAnswer(question.id, checked)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {question.answer ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomQuestion(question.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}