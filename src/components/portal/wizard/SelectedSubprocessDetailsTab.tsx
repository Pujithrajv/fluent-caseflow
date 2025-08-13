import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, Upload, AlertTriangle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SelectedSubprocessDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onComplete: () => void;
}

const physicalItemCategories = [
  "Tools and Equipment",
  "Samples and Specimens", 
  "Documents and Records",
  "Electronic Devices",
  "Personal Items",
  "Industrial Equipment",
  "Other"
];

export function SelectedSubprocessDetailsTab({ onDataChange, data, onComplete }: SelectedSubprocessDetailsTabProps) {
  // Motion-specific states
  const [consultOtherSide, setConsultOtherSide] = useState(data.consultOtherSide || false);
  const [outcome, setOutcome] = useState(data.outcome || "");

  // Exhibit-specific states
  const [documentTitle, setDocumentTitle] = useState(data.documentTitle || "");
  const [hasInappropriateContent, setHasInappropriateContent] = useState(data.hasInappropriateContent || "");
  const [hasPII, setHasPII] = useState(data.hasPII || "");
  const [hasConfidentialInfo, setHasConfidentialInfo] = useState(data.hasConfidentialInfo || "");
  const [hasProtectiveOrder, setHasProtectiveOrder] = useState(data.hasProtectiveOrder || "");
  const [exhibitIdNumber, setExhibitIdNumber] = useState(data.exhibitIdNumber || "");

  // Physical item states
  const [physicalItemCategory, setPhysicalItemCategory] = useState(data.physicalItemCategory || "");
  const [itemName, setItemName] = useState(data.itemName || "");
  const [itemDescription, setItemDescription] = useState(data.itemDescription || "");
  const [estimatedSize, setEstimatedSize] = useState(data.estimatedSize || "");
  const [estimatedWeight, setEstimatedWeight] = useState(data.estimatedWeight || "");
  const [hasBiologicalHazard, setHasBiologicalHazard] = useState(data.hasBiologicalHazard || "");
  const [hasChemicalHazard, setHasChemicalHazard] = useState(data.hasChemicalHazard || "");
  const [hasRadiationHazard, setHasRadiationHazard] = useState(data.hasRadiationHazard || "");
  const [hasLithiumBattery, setHasLithiumBattery] = useState(data.hasLithiumBattery || "");
  const [deliverableByCarrier, setDeliverableByCarrier] = useState(data.deliverableByCarrier || "");
  const [specialHandling, setSpecialHandling] = useState(data.specialHandling || "");
  const [specialHandlingDescription, setSpecialHandlingDescription] = useState(data.specialHandlingDescription || "");
  const [evidenceJustification, setEvidenceJustification] = useState(data.evidenceJustification || "");
  const [itemPhoto, setItemPhoto] = useState(data.itemPhoto || null);

  // General states for other request types
  const [description, setDescription] = useState(data.description || "");

  const { requestGroup, requestType } = data;

  // Update parent data when local state changes
  useEffect(() => {
    const updatedData = {
      consultOtherSide,
      outcome,
      documentTitle,
      hasInappropriateContent,
      hasPII,
      hasConfidentialInfo,
      hasProtectiveOrder,
      exhibitIdNumber,
      physicalItemCategory,
      itemName,
      itemDescription,
      estimatedSize,
      estimatedWeight,
      hasBiologicalHazard,
      hasChemicalHazard,
      hasRadiationHazard,
      hasLithiumBattery,
      deliverableByCarrier,
      specialHandling,
      specialHandlingDescription,
      evidenceJustification,
      itemPhoto,
      description
    };
    onDataChange(updatedData);
  }, [
    consultOtherSide, outcome, documentTitle, hasInappropriateContent, hasPII, hasConfidentialInfo,
    hasProtectiveOrder, exhibitIdNumber, physicalItemCategory, itemName, itemDescription,
    estimatedSize, estimatedWeight, hasBiologicalHazard, hasChemicalHazard, hasRadiationHazard,
    hasLithiumBattery, deliverableByCarrier, specialHandling, specialHandlingDescription,
    evidenceJustification, itemPhoto, description, onDataChange
  ]);

  // Validation logic
  const canContinue = () => {
    if (requestGroup === "motion") {
      return outcome.trim() !== "";
    }
    
    if (requestGroup === "exhibit") {
      if (requestType === "Document" || requestType === "Oversized/Voluminous Document") {
        if (requestType === "Oversized/Voluminous Document" && !documentTitle.trim()) return false;
        return hasInappropriateContent && hasPII && hasConfidentialInfo && 
               (hasConfidentialInfo !== "yes" || hasProtectiveOrder) &&
               (hasConfidentialInfo !== "yes" || hasProtectiveOrder !== "no" || exhibitIdNumber.trim());
      }
      
      if (requestType === "Physical Item") {
        return physicalItemCategory && itemName.trim() && itemDescription.trim() && 
               estimatedSize.trim() && estimatedWeight.trim() && 
               hasBiologicalHazard && hasChemicalHazard && hasRadiationHazard &&
               hasLithiumBattery && deliverableByCarrier && specialHandling &&
               (specialHandling !== "yes" || specialHandlingDescription.trim()) &&
               evidenceJustification.trim() && itemPhoto;
      }
      
      // For Photograph and Recording
      return hasInappropriateContent && hasPII && hasConfidentialInfo &&
             (hasConfidentialInfo !== "yes" || hasProtectiveOrder) &&
             (hasConfidentialInfo !== "yes" || hasProtectiveOrder !== "no" || exhibitIdNumber.trim());
    }
    
    // For discovery, certificate, pleading, notices
    return description.trim() !== "";
  };

  useEffect(() => {
    if (canContinue()) {
      onComplete();
    }
  }, [canContinue, onComplete]);

  const renderMotionDetails = () => (
    <Card className="shadow-fluent-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-fluent">
          <HelpCircle className="h-5 w-5 text-primary" />
          <span>Motion Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          {/* Consult Other Side */}
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <Label htmlFor="consultOtherSide" className="font-fluent font-semibold text-sm">Consult other side? *</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Did you consult with the opposing party before filing this motion?</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="relative">
                <button
                  type="button"
                  role="switch"
                  aria-checked={consultOtherSide}
                  onClick={() => setConsultOtherSide(!consultOtherSide)}
                  className={cn(
                    "relative inline-flex h-11 w-24 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:ring-offset-2",
                    "hover:brightness-[0.92]",
                    consultOtherSide ? "bg-[#107C10]" : "bg-[#8A8886]"
                  )}
                >
                  <span className={cn(
                    "absolute inset-0 flex items-center justify-center text-xs font-medium text-white transition-opacity duration-200",
                    consultOtherSide ? "opacity-100" : "opacity-0"
                  )}>
                    Yes
                  </span>
                  <span className={cn(
                    "absolute inset-0 flex items-center justify-center text-xs font-medium text-white transition-opacity duration-200",
                    !consultOtherSide ? "opacity-100" : "opacity-0"
                  )}>
                    No
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="outcome" className="font-fluent font-semibold text-sm">What was the outcome? *</Label>
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
        </TooltipProvider>
      </CardContent>
    </Card>
  );

  const renderExhibitQuestions = () => (
    <Card className="shadow-fluent-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-fluent">
          <HelpCircle className="h-5 w-5 text-primary" />
          <span>Exhibit Type Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Document Title for Oversized/Voluminous Documents */}
        {requestType === "Oversized/Voluminous Document" && (
          <div className="space-y-2">
            <Label className="font-fluent font-semibold text-sm">Document Title *</Label>
            <Input 
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Enter document title"
              className="shadow-fluent-8 border-input-border"
            />
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                An "Oversized or Voluminous Document" email will be sent automatically after submission.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Physical Item Details */}
        {requestType === "Physical Item" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Category of Physical Item *</Label>
                <Select value={physicalItemCategory} onValueChange={setPhysicalItemCategory}>
                  <SelectTrigger className="shadow-fluent-8 border-input-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {physicalItemCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Name of Item *</Label>
                <Input 
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="shadow-fluent-8 border-input-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-fluent font-semibold text-sm">Description *</Label>
              <Textarea 
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Describe the physical item"
                className="shadow-fluent-8 border-input-border min-h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Estimated Size *</Label>
                <Input 
                  value={estimatedSize}
                  onChange={(e) => setEstimatedSize(e.target.value)}
                  placeholder="e.g., 12 x 8 x 6 inches"
                  className="shadow-fluent-8 border-input-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="font-fluent font-semibold text-sm">Estimated Weight *</Label>
                <Input 
                  value={estimatedWeight}
                  onChange={(e) => setEstimatedWeight(e.target.value)}
                  placeholder="e.g., 5 lbs"
                  className="shadow-fluent-8 border-input-border"
                />
              </div>
            </div>

            {/* Hazard Questions */}
            <div className="space-y-4">
              <h4 className="font-fluent font-semibold">Safety Questions *</h4>
              
              {[
                { state: hasBiologicalHazard, setter: setHasBiologicalHazard, label: "Biological hazard?" },
                { state: hasChemicalHazard, setter: setHasChemicalHazard, label: "Chemical hazard?" },
                { state: hasRadiationHazard, setter: setHasRadiationHazard, label: "Radiation hazard?" },
                { state: hasLithiumBattery, setter: setHasLithiumBattery, label: "Permanently mounted lithium battery?" },
                { state: deliverableByCarrier, setter: setDeliverableByCarrier, label: "Deliverable by common carrier?" },
                { state: specialHandling, setter: setSpecialHandling, label: "Special handling required?" }
              ].map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label className="font-fluent font-medium">{question.label}</Label>
                  <RadioGroup value={question.state} onValueChange={question.setter} className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${index}-yes`} />
                      <Label htmlFor={`${index}-yes`} className="font-fluent">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${index}-no`} />
                      <Label htmlFor={`${index}-no`} className="font-fluent">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}

              {specialHandling === "yes" && (
                <div className="space-y-2">
                  <Label className="font-fluent font-semibold text-sm">Describe Special Handling *</Label>
                  <Textarea 
                    value={specialHandlingDescription}
                    onChange={(e) => setSpecialHandlingDescription(e.target.value)}
                    placeholder="Describe the special handling requirements"
                    className="shadow-fluent-8 border-input-border min-h-20"
                  />
                </div>
              )}
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="font-fluent font-semibold text-sm">Upload one photograph of the item *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop a photo here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>

            {/* Evidence Justification */}
            <div className="space-y-2">
              <Label className="font-fluent font-semibold text-sm">
                Please explain why the Physical Item should be used as evidence at the Administrative Hearing instead of one or more photographs of it. *
              </Label>
              <Textarea 
                value={evidenceJustification}
                onChange={(e) => setEvidenceJustification(e.target.value)}
                placeholder="Provide justification for using the physical item as evidence..."
                className="shadow-fluent-8 border-input-border min-h-24"
              />
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your request to submit a Physical Item has been saved and referred to the ALJ. They will rule on your request promptly.
              </AlertDescription>
            </Alert>
          </>
        )}

        {/* Standard Content Questions for all exhibit types */}
        {(requestType === "Document" || requestType === "Oversized/Voluminous Document" || requestType === "Photograph" || requestType === "Recording") && (
          <>
            {/* Public Viewing Question */}
            <div className="space-y-4 p-4 border border-input-border rounded-lg bg-background/50">
              <div className="space-y-2">
                <Label className="font-fluent font-medium text-base">Is this content appropriate for public viewing? *</Label>
                <p className="text-sm text-muted-foreground font-fluent">Consider if the content contains sensitive or inappropriate material</p>
              </div>
              
              <RadioGroup value={hasInappropriateContent} onValueChange={setHasInappropriateContent} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="appropriate-yes" />
                  <Label htmlFor="appropriate-yes" className="font-fluent">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="appropriate-no" />
                  <Label htmlFor="appropriate-no" className="font-fluent">No</Label>
                </div>
              </RadioGroup>

              {hasInappropriateContent === "no" && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    In Camera inspection required. 
                    <Button variant="outline" size="sm" className="ml-2">
                      Complete In Camera Inspection
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* PII Question */}
            <div className="space-y-4 p-4 border border-input-border rounded-lg bg-background/50">
              <div className="space-y-2">
                <Label className="font-fluent font-medium text-base">Does this content contain Personally Identifiable Information (PII)? *</Label>
                <p className="text-sm text-muted-foreground font-fluent">PII includes names, addresses, social security numbers, etc.</p>
              </div>
              
              <RadioGroup value={hasPII} onValueChange={setHasPII} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pii-yes" />
                  <Label htmlFor="pii-yes" className="font-fluent">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pii-no" />
                  <Label htmlFor="pii-no" className="font-fluent">No</Label>
                </div>
              </RadioGroup>

              {hasPII === "yes" && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>REDACT and re-submit.</strong> Documents containing PII must be redacted before submission.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Confidential Information Question */}
            <div className="space-y-4 p-4 border border-input-border rounded-lg bg-background/50">
              <div className="space-y-2">
                <Label className="font-fluent font-medium text-base">Does this content contain confidential, privileged, or trade secret information? *</Label>
                <p className="text-sm text-muted-foreground font-fluent">Consider if the content requires special protection</p>
              </div>
              
              <RadioGroup value={hasConfidentialInfo} onValueChange={setHasConfidentialInfo} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="confidential-yes" />
                  <Label htmlFor="confidential-yes" className="font-fluent">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="confidential-no" />
                  <Label htmlFor="confidential-no" className="font-fluent">No</Label>
                </div>
              </RadioGroup>

              {hasConfidentialInfo === "yes" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-fluent font-medium text-base">Is there a protective order in place? *</Label>
                    <RadioGroup value={hasProtectiveOrder} onValueChange={setHasProtectiveOrder} className="flex space-x-6">
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
                    <div className="space-y-2">
                      <Label className="font-fluent font-semibold text-sm">Exhibit ID Number *</Label>
                      <Input 
                        value={exhibitIdNumber}
                        onChange={(e) => setExhibitIdNumber(e.target.value)}
                        placeholder="Enter exhibit ID number"
                        className="shadow-fluent-8 border-input-border"
                      />
                    </div>
                  )}

                  {hasProtectiveOrder === "no" && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        You must obtain a protective order first. 
                        <Button variant="outline" size="sm" className="ml-2">
                          Go to Motions Page → Motion for Protective Order
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderOtherDetails = () => {
    const title = requestGroup === "discovery" ? "Discovery Details" :
                  requestGroup === "certificate" ? "Certificate Details" :
                  requestGroup === "pleading" ? "Pleading Details" : "Notice Details";

    return (
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="font-fluent font-semibold text-sm">Description *</Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Describe your ${requestGroup} request...`}
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderContent = () => {
    if (requestGroup === "motion") {
      return renderMotionDetails();
    }
    
    if (requestGroup === "exhibit") {
      return renderExhibitQuestions();
    }
    
    return renderOtherDetails();
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Previous
        </Button>
        <Button 
          disabled={!canContinue()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}