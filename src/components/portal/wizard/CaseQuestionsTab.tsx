import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, HelpCircle, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CaseQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

// Mock data tables
const caseTypeStatutes = {
  "abandon-wells": "Section 123.45 of the Environmental Protection Act",
  "water-rights": "Chapter 456.78 of the Water Resources Code",
  "default": "General Administrative Hearing Statute"
};

const caseTypeRegulations = {
  "abandon-wells": "Chapter 89 CFR 456.789 - Well Abandonment Procedures",
  "water-rights": "Chapter 90 CFR 123.456 - Water Rights Hearing Procedures", 
  "default": "General Administrative Hearing Regulations"
};

export function CaseQuestionsTab({ onDataChange, data }: CaseQuestionsTabProps) {
  const [caseType, setCaseType] = useState("abandon-wells");
  const [authorizingStatute, setAuthorizingStatute] = useState("");
  const [hearingRegulations, setHearingRegulations] = useState("");
  const [caseProperStatute, setCaseProperStatute] = useState("");
  const [caseProperRegulations, setCaseProperRegulations] = useState("");
  const [departmentalActionDate, setDepartmentalActionDate] = useState<Date | undefined>();
  const [responsiveDocumentDate, setResponsiveDocumentDate] = useState<Date | undefined>();
  const [daysBetween, setDaysBetween] = useState<number | null>(null);
  const [hearingRequestTimely, setHearingRequestTimely] = useState("");
  const [properNoticeGiven, setProperNoticeGiven] = useState("");
  const [jurisdictionalStanding, setJurisdictionalStanding] = useState("");
  const [jurisdictionalComment, setJurisdictionalComment] = useState("");
  const [proceduralRequirements, setProceduralRequirements] = useState("");
  const [proceduralComment, setProceduralComment] = useState("");
  const [legalBarriers, setLegalBarriers] = useState("");
  const [legalBarriersComment, setLegalBarriersComment] = useState("");
  const [readyToProceed, setReadyToProceed] = useState("");
  const [aljChanged, setAljChanged] = useState(false);
  const [showAljDialog, setShowAljDialog] = useState(false);

  // Update statute and regulations when case type changes
  useEffect(() => {
    setAuthorizingStatute(caseTypeStatutes[caseType] || caseTypeStatutes.default);
    setHearingRegulations(caseTypeRegulations[caseType] || caseTypeRegulations.default);
  }, [caseType]);

  // Calculate days between dates
  useEffect(() => {
    if (departmentalActionDate && responsiveDocumentDate) {
      const timeDiff = responsiveDocumentDate.getTime() - departmentalActionDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysBetween(daysDiff);
      
      // Auto-set hearing request timely if days > 30
      if (daysDiff > 30) {
        setHearingRequestTimely("no");
      }
    }
  }, [departmentalActionDate, responsiveDocumentDate]);

  // Calculate readiness to proceed
  useEffect(() => {
    if (caseProperStatute && caseProperRegulations && hearingRequestTimely && 
        properNoticeGiven && jurisdictionalStanding && proceduralRequirements && legalBarriers) {
      
      const conditions = [
        caseProperStatute === "no",
        caseProperRegulations === "no", 
        hearingRequestTimely === "no",
        properNoticeGiven === "no",
        jurisdictionalStanding === "no",
        proceduralRequirements === "no",
        legalBarriers === "yes"
      ];
      
      if (conditions.some(condition => condition)) {
        setReadyToProceed("no");
      } else {
        setReadyToProceed("yes");
      }
    }
  }, [caseProperStatute, caseProperRegulations, hearingRequestTimely, properNoticeGiven, 
      jurisdictionalStanding, proceduralRequirements, legalBarriers]);

  const handleAljChange = (field: string, value: string) => {
    setShowAljDialog(true);
    // Store the intended change for confirmation
    setTimeout(() => {
      if (field === "hearingRequestTimely") setHearingRequestTimely(value);
      if (field === "readyToProceed") setReadyToProceed(value);
      setAljChanged(true);
    }, 100);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Abandon Wells Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. Authorizing Statute */}
          <div className="space-y-2">
            <Label className="font-fluent">1. Authorizing Statute</Label>
            <Input 
              value={authorizingStatute}
              readOnly
              className="bg-muted shadow-fluent-8 border-input-border"
            />
          </div>

          {/* 2. Hearing Regulations */}
          <div className="space-y-2">
            <Label className="font-fluent">2. Hearing Regulations</Label>
            <Input 
              value={hearingRegulations}
              readOnly
              className="bg-muted shadow-fluent-8 border-input-border"
            />
          </div>

          {/* 3. Case is Proper pursuant to */}
          <div className="space-y-4">
            <Label className="font-fluent text-base">3. Case is Proper pursuant to:</Label>
            
            {/* 4. Statute Yes/No */}
            <div className="ml-4 space-y-2">
              <Label className="font-fluent">4. Statute:</Label>
              <RadioGroup value={caseProperStatute} onValueChange={setCaseProperStatute}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="statute-yes" />
                    <Label htmlFor="statute-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="statute-no" />
                    <Label htmlFor="statute-no">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* 5. Hearing Regulations Yes/No */}
            <div className="ml-4 space-y-2">
              <Label className="font-fluent">5. Hearing Regulations:</Label>
              <RadioGroup value={caseProperRegulations} onValueChange={setCaseProperRegulations}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="regulations-yes" />
                    <Label htmlFor="regulations-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="regulations-no" />
                    <Label htmlFor="regulations-no">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* 6. Departmental Action Date */}
          <div className="space-y-2">
            <Label className="font-fluent">6. Departmental Action Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !departmentalActionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departmentalActionDate ? format(departmentalActionDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departmentalActionDate}
                  onSelect={setDepartmentalActionDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 7. Responsive Document Date */}
          <div className="space-y-2">
            <Label className="font-fluent">7. Responsive Document Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                    !responsiveDocumentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {responsiveDocumentDate ? format(responsiveDocumentDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={responsiveDocumentDate}
                  onSelect={setResponsiveDocumentDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 8. Days Between Calculated */}
          <div className="space-y-2">
            <Label className="font-fluent">8. Days From Departmental Action to Responsive Document</Label>
            <div className="flex items-center space-x-2">
              <Input 
                value={daysBetween !== null ? daysBetween.toString() : ""}
                readOnly
                className="bg-muted shadow-fluent-8 border-input-border"
              />
              <Badge variant={daysBetween && daysBetween > 30 ? "destructive" : "secondary"}>
                {daysBetween && daysBetween > 30 ? "Over 30 days" : "Within 30 days"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Automatically calculated from dates above</p>
          </div>

          {/* 9. Hearing Request Timely Filed */}
          <div className="space-y-2">
            <Label className="font-fluent">9. Hearing Request Timely Filed</Label>
            <div className="flex items-center space-x-4">
              <RadioGroup value={hearingRequestTimely} onValueChange={setHearingRequestTimely}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="timely-yes" />
                    <Label htmlFor="timely-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="timely-no" />
                    <Label htmlFor="timely-no">No</Label>
                  </div>
                </div>
              </RadioGroup>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAljChange("hearingRequestTimely", hearingRequestTimely === "yes" ? "no" : "yes")}
              >
                ALJ Override
              </Button>
            </div>
            {daysBetween && daysBetween > 30 && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="font-fluent text-warning-foreground">
                  Auto-set to "No" because days between dates is greater than 30
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* 10. Proper Notice Given */}
          <div className="space-y-2">
            <Label className="font-fluent">10. Proper Notice Given (if Required)</Label>
            <RadioGroup value={properNoticeGiven} onValueChange={setProperNoticeGiven}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="notice-yes" />
                  <Label htmlFor="notice-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="notice-no" />
                  <Label htmlFor="notice-no">No</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* 11. Jurisdictional Standing */}
          <div className="space-y-2">
            <Label className="font-fluent">11. Jurisdictional standing confirmed?</Label>
            <RadioGroup value={jurisdictionalStanding} onValueChange={setJurisdictionalStanding}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="jurisdiction-yes" />
                  <Label htmlFor="jurisdiction-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="jurisdiction-no" />
                  <Label htmlFor="jurisdiction-no">No</Label>
                </div>
              </div>
            </RadioGroup>
            <Textarea
              placeholder="Add comment..."
              value={jurisdictionalComment}
              onChange={(e) => setJurisdictionalComment(e.target.value)}
              className="shadow-fluent-8 border-input-border"
            />
          </div>

          {/* 12. Procedural Requirements */}
          <div className="space-y-2">
            <Label className="font-fluent">12. Procedural requirements met?</Label>
            <RadioGroup value={proceduralRequirements} onValueChange={setProceduralRequirements}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="procedural-yes" />
                  <Label htmlFor="procedural-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="procedural-no" />
                  <Label htmlFor="procedural-no">No</Label>
                </div>
              </div>
            </RadioGroup>
            <Textarea
              placeholder="Add comment..."
              value={proceduralComment}
              onChange={(e) => setProceduralComment(e.target.value)}
              className="shadow-fluent-8 border-input-border"
            />
          </div>

          {/* 13. Legal Barriers */}
          <div className="space-y-2">
            <Label className="font-fluent">13. Any legal barriers identified?</Label>
            <RadioGroup value={legalBarriers} onValueChange={setLegalBarriers}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="barriers-yes" />
                  <Label htmlFor="barriers-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="barriers-no" />
                  <Label htmlFor="barriers-no">No</Label>
                </div>
              </div>
            </RadioGroup>
            <Textarea
              placeholder="Add comment..."
              value={legalBarriersComment}
              onChange={(e) => setLegalBarriersComment(e.target.value)}
              className="shadow-fluent-8 border-input-border"
            />
          </div>

          {/* 15. Ready to Proceed */}
          <div className="space-y-2">
            <Label className="font-fluent">15. Ready to proceed to pre-hearing or hearing phase?</Label>
            <div className="flex items-center space-x-4">
              <RadioGroup value={readyToProceed} onValueChange={setReadyToProceed}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="proceed-yes" />
                    <Label htmlFor="proceed-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="proceed-no" />
                    <Label htmlFor="proceed-no">No</Label>
                  </div>
                </div>
              </RadioGroup>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAljChange("readyToProceed", readyToProceed === "yes" ? "no" : "yes")}
              >
                ALJ Override
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically calculated based on questions 4, 5, 9, 10, 11, 12, and 13
            </p>
          </div>

          {aljChanged && (
            <Alert className="border-primary bg-primary/10">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <AlertDescription className="font-fluent">
                This field has been changed by ALJ override
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* ALJ Override Confirmation Dialog */}
      <AlertDialog open={showAljDialog} onOpenChange={setShowAljDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ALJ Override Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to override the automatically calculated value? This action will be logged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm Override</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}