import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, HelpCircle } from "lucide-react";
import { useState } from "react";

interface ExhibitQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onNext: () => void;
  onRedirectToMotions: () => void;
}

export function ExhibitQuestionsTab({ onDataChange, data, onNext, onRedirectToMotions }: ExhibitQuestionsTabProps) {
  const [hasInappropriateContent, setHasInappropriateContent] = useState(data.hasInappropriateContent || "");
  const [hasPII, setHasPII] = useState(data.hasPII || "");
  const [hasConfidentialInfo, setHasConfidentialInfo] = useState(data.hasConfidentialInfo || "");
  const [hasProtectiveOrder, setHasProtectiveOrder] = useState(data.hasProtectiveOrder || "");
  const [exhibitIdNumber, setExhibitIdNumber] = useState(data.exhibitIdNumber || "");

  const handleInappropriateContentChange = (value: string) => {
    setHasInappropriateContent(value);
    onDataChange({ hasInappropriateContent: value });
  };

  const handlePIIChange = (value: string) => {
    setHasPII(value);
    onDataChange({ hasPII: value });
  };

  const handleConfidentialInfoChange = (value: string) => {
    setHasConfidentialInfo(value);
    onDataChange({ hasConfidentialInfo: value });
  };

  const handleProtectiveOrderChange = (value: string) => {
    setHasProtectiveOrder(value);
    onDataChange({ hasProtectiveOrder: value });
  };

  const handleExhibitIdChange = (value: string) => {
    setExhibitIdNumber(value);
    onDataChange({ exhibitIdNumber: value });
  };

  const canContinue = () => {
    // Must answer the inappropriate content question
    if (!hasInappropriateContent) return false;
    
    // If has inappropriate content, cannot continue
    if (hasInappropriateContent === "yes") return false;
    
    // Must answer PII question
    if (!hasPII) return false;
    
    // If has PII, cannot continue (needs redaction)
    if (hasPII === "yes") return false;
    
    // Must answer confidential info question
    if (!hasConfidentialInfo) return false;
    
    // If has confidential info, must have protective order and exhibit ID
    if (hasConfidentialInfo === "yes") {
      if (!hasProtectiveOrder) return false;
      if (hasProtectiveOrder === "no") return false;
      if (hasProtectiveOrder === "yes" && !exhibitIdNumber.trim()) return false;
    }
    
    return true;
  };

  const handleContinue = () => {
    if (hasConfidentialInfo === "yes" && hasProtectiveOrder === "no") {
      onRedirectToMotions();
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Question 1: Inappropriate Content */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Content Review Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="font-fluent font-medium text-foreground">
              Does the item contain any depiction of persons/places that is embarrassing/inappropriate/not suitable for public viewing? *
            </Label>
            <RadioGroup 
              value={hasInappropriateContent} 
              onValueChange={handleInappropriateContentChange}
              className="mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="inappropriate-no" />
                <Label htmlFor="inappropriate-no" className="font-fluent">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="inappropriate-yes" />
                <Label htmlFor="inappropriate-yes" className="font-fluent">Yes</Label>
              </div>
            </RadioGroup>
            
            {hasInappropriateContent === "yes" && (
              <div className="mt-4 bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium font-fluent text-destructive">Cannot Proceed</p>
                    <p className="text-sm font-fluent text-destructive/80 mt-1">
                      Items containing inappropriate content cannot be submitted as exhibits. 
                      Please review your submission and select appropriate materials.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question 2: PII */}
      {hasInappropriateContent === "no" && (
        <Card className="shadow-fluent-8">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="font-fluent font-medium text-foreground">
                Does the item contain Personally Identifiable Information (PII)? *
              </Label>
              <p className="text-sm text-muted-foreground font-fluent mt-1">
                PII includes Social Security numbers, driver's license numbers, account numbers, addresses, phone numbers, etc.
              </p>
              <RadioGroup 
                value={hasPII} 
                onValueChange={handlePIIChange}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pii-no" />
                  <Label htmlFor="pii-no" className="font-fluent">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pii-yes" />
                  <Label htmlFor="pii-yes" className="font-fluent">Yes</Label>
                </div>
              </RadioGroup>
              
              {hasPII === "yes" && (
                <div className="mt-4 bg-warning/10 border border-warning/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium font-fluent text-foreground">Redaction Required</p>
                      <p className="text-sm font-fluent text-muted-foreground mt-1">
                        This item cannot be uploaded without first REDACTING all such information. 
                        Please REDACT all Personally Identifiable Information and re-submit.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question 3: Confidential Information */}
      {hasInappropriateContent === "no" && hasPII === "no" && (
        <Card className="shadow-fluent-8">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="font-fluent font-medium text-foreground">
                Does the item contain confidential or privileged information (Attorney-Client, Doctor-Patient, Trade Secret, etc.)? *
              </Label>
              <RadioGroup 
                value={hasConfidentialInfo} 
                onValueChange={handleConfidentialInfoChange}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="confidential-no" />
                  <Label htmlFor="confidential-no" className="font-fluent">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="confidential-yes" />
                  <Label htmlFor="confidential-yes" className="font-fluent">Yes</Label>
                </div>
              </RadioGroup>
              
              {hasConfidentialInfo === "yes" && (
                <div className="mt-4 space-y-4">
                  <div className="bg-info/10 border border-info/20 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium font-fluent text-foreground">Protective Order Required</p>
                        <p className="text-sm font-fluent text-muted-foreground mt-1">
                          In order for this document to be submitted as an exhibit, a Protective Order must be issued.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-fluent font-medium text-foreground">
                      Has a Protective Order been issued? *
                    </Label>
                    <RadioGroup 
                      value={hasProtectiveOrder} 
                      onValueChange={handleProtectiveOrderChange}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="protective-yes" />
                        <Label htmlFor="protective-yes" className="font-fluent">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="protective-no" />
                        <Label htmlFor="protective-no" className="font-fluent">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {hasProtectiveOrder === "yes" && (
                    <div>
                      <Label htmlFor="exhibit-id" className="font-fluent font-medium">Enter Exhibit ID Number *</Label>
                      <Input
                        id="exhibit-id"
                        value={exhibitIdNumber}
                        onChange={(e) => handleExhibitIdChange(e.target.value)}
                        placeholder="Enter the exhibit ID from the protective order"
                        className="mt-2 shadow-fluent-8 border-input-border"
                      />
                    </div>
                  )}
                  
                  {hasProtectiveOrder === "no" && (
                    <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <p className="font-medium font-fluent text-foreground">Motion Required</p>
                          <p className="text-sm font-fluent text-muted-foreground mt-1">
                            You will be redirected to the Motions page to file a "Motion for Protective Order" 
                            before you can submit this exhibit.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!canContinue()}
          className="font-fluent"
        >
          {hasConfidentialInfo === "yes" && hasProtectiveOrder === "no" 
            ? "Go to Motions Page" 
            : "Continue to Upload"}
        </Button>
      </div>
    </div>
  );
}