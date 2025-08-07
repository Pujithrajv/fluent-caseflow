import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, Plus, Trash2, AlertTriangle } from "lucide-react";

interface CaseQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

interface UnpaidFeeEntry {
  id: string;
  year: string;
  amount: string;
}

export function CaseQuestionsTab({ onDataChange, data }: CaseQuestionsTabProps) {
  const [permitteeNumber, setPermitteeNumber] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [numberOfWells, setNumberOfWells] = useState("");
  const [caseInitiatedReason, setCaseInitiatedReason] = useState("");
  
  // Unpaid Fees section
  const [unpaidFees, setUnpaidFees] = useState<UnpaidFeeEntry[]>([
    { id: "1", year: "", amount: "" }
  ]);
  
  // Leaking Wells section
  const [currentlyLeaking, setCurrentlyLeaking] = useState("");
  const [leakageEnteringWatercourse, setLeakageEnteringWatercourse] = useState("");
  const [immediateThreat, setImmediateThreat] = useState("");
  const [seekingInterimRelief, setSeekingInterimRelief] = useState("");
  
  // Inadequate Production section
  const [productionIssue, setProductionIssue] = useState("");
  
  // Other Issue section
  const [issueType, setIssueType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const validateInteger = (value: string, max: number) => {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num < max;
  };

  const addUnpaidFeeEntry = () => {
    const newEntry: UnpaidFeeEntry = {
      id: Date.now().toString(),
      year: "",
      amount: ""
    };
    setUnpaidFees([...unpaidFees, newEntry]);
  };

  const removeUnpaidFeeEntry = (id: string) => {
    if (unpaidFees.length > 1) {
      setUnpaidFees(unpaidFees.filter(entry => entry.id !== id));
    }
  };

  const updateUnpaidFeeEntry = (id: string, field: keyof UnpaidFeeEntry, value: string) => {
    setUnpaidFees(unpaidFees.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const renderConditionalSection = () => {
    switch (caseInitiatedReason) {
      case "unpaid-fees":
        return (
          <Card className="shadow-fluent-8 mt-6">
            <CardHeader>
              <CardTitle className="font-fluent">5. Unpaid Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="font-fluent">Please provide the Year and amount of unpaid fees:</Label>
              
              {/* Example table */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Example:</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Year</strong></div>
                  <div><strong>Amount</strong></div>
                  <div>2022</div>
                  <div>$1,750.00</div>
                  <div>2023</div>
                  <div>$1,925.00</div>
                  <div>2024</div>
                  <div>$2,117.50</div>
                </div>
              </div>

              {unpaidFees.map((entry, index) => (
                <div key={entry.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label className="font-fluent">Year</Label>
                    <Input
                      value={entry.year}
                      onChange={(e) => updateUnpaidFeeEntry(entry.id, "year", e.target.value)}
                      placeholder="2024"
                      className="shadow-fluent-8 border-input-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-fluent">Amount</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={entry.amount}
                        onChange={(e) => updateUnpaidFeeEntry(entry.id, "amount", e.target.value)}
                        placeholder="$1,750.00"
                        className="shadow-fluent-8 border-input-border"
                      />
                      {unpaidFees.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeUnpaidFeeEntry(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addUnpaidFeeEntry}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Entry
              </Button>
            </CardContent>
          </Card>
        );

      case "leaking-wells":
        return (
          <Card className="shadow-fluent-8 mt-6">
            <CardHeader>
              <CardTitle className="font-fluent">6. Leaking Wells</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-fluent">Are the wells currently leaking?</Label>
                <RadioGroup value={currentlyLeaking} onValueChange={setCurrentlyLeaking}>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="leaking-yes" />
                      <Label htmlFor="leaking-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="leaking-no" />
                      <Label htmlFor="leaking-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Is the leakage entering any watercourse?</Label>
                <RadioGroup value={leakageEnteringWatercourse} onValueChange={setLeakageEnteringWatercourse}>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="watercourse-yes" />
                      <Label htmlFor="watercourse-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="watercourse-no" />
                      <Label htmlFor="watercourse-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Does the leakage present an immediate threat to persons, animals or aquatic life?</Label>
                <RadioGroup value={immediateThreat} onValueChange={setImmediateThreat}>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="threat-yes" />
                      <Label htmlFor="threat-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="threat-no" />
                      <Label htmlFor="threat-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Is the Department seeking Interim Relief?</Label>
                <RadioGroup value={seekingInterimRelief} onValueChange={setSeekingInterimRelief}>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="relief-yes" />
                      <Label htmlFor="relief-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="relief-no" />
                      <Label htmlFor="relief-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case "inadequate-production":
        return (
          <Card className="shadow-fluent-8 mt-6">
            <CardHeader>
              <CardTitle className="font-fluent">7. Inadequate Production</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="font-fluent">Choose One:</Label>
              <RadioGroup value={productionIssue} onValueChange={setProductionIssue}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-production-24-months" id="no-production" />
                    <Label htmlFor="no-production">No production for 24 months or more</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inadequate-commercial" id="inadequate-commercial" />
                    <Label htmlFor="inadequate-commercial">Inadequate production in commercial quantities</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case "other-issue":
        return (
          <Card className="shadow-fluent-8 mt-6">
            <CardHeader>
              <CardTitle className="font-fluent">8. Other Issue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-fluent">This issue pertains to:</Label>
                <RadioGroup value={issueType} onValueChange={setIssueType}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oil-wells-pump-jacks" id="oil-wells" />
                      <Label htmlFor="oil-wells">One or more oil wells or pump jacks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gathering-equipment" id="gathering" />
                      <Label htmlFor="gathering">Gathering and collection equipment, including the Tank Battery and/or collection lines</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="operating-practice" id="operating" />
                      <Label htmlFor="operating">Operating practice of the Permittee</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="font-fluent">Provide a Description of the conditions complained of.</Label>
                <Textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe the conditions complained of..."
                  maxLength={500}
                  className="shadow-fluent-8 border-input-border min-h-24"
                />
                <p className="text-xs text-muted-foreground">
                  {issueDescription.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Abandon Well Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question 1: Permittee Number */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the permittee number?</Label>
            <Input
              type="number"
              value={permitteeNumber}
              onChange={(e) => setPermitteeNumber(e.target.value)}
              placeholder="Enter permittee number"
              className="shadow-fluent-8 border-input-border"
              max={999999}
            />
            {permitteeNumber && !validateInteger(permitteeNumber, 1000000) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 1,000,000
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Question 2: Permit Number (Optional) */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the Permit Number? <span className="text-muted-foreground">(Optional)</span></Label>
            <Input
              type="number"
              value={permitNumber}
              onChange={(e) => setPermitNumber(e.target.value)}
              placeholder="Enter permit number"
              className="shadow-fluent-8 border-input-border"
              max={999999}
            />
            {permitNumber && !validateInteger(permitNumber, 1000000) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 1,000,000
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Question 3: Number of Wells */}
          <div className="space-y-2">
            <Label className="font-fluent">What is the number of wells addressed by this Case?</Label>
            <Input
              type="number"
              value={numberOfWells}
              onChange={(e) => setNumberOfWells(e.target.value)}
              placeholder="Enter number of wells"
              className="shadow-fluent-8 border-input-border"
              max={499}
            />
            {numberOfWells && !validateInteger(numberOfWells, 500) && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Must be an integer less than 500
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Question 4: Case Initiated Reason (Dropdown) */}
          <div className="space-y-2">
            <Label className="font-fluent">This Case is initiated because of:</Label>
            <Select value={caseInitiatedReason} onValueChange={setCaseInitiatedReason}>
              <SelectTrigger className="shadow-fluent-8 border-input-border bg-background">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="unpaid-fees">Unpaid Fees</SelectItem>
                <SelectItem value="leaking-wells">Leaking well(s)</SelectItem>
                <SelectItem value="inadequate-production">Inadequate Production</SelectItem>
                <SelectItem value="other-issue">Other issue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Conditional sections based on dropdown selection */}
      {renderConditionalSection()}
    </div>
  );
}
