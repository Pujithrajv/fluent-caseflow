import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, Upload, AlertTriangle, Info, FileText, X, CalendarIcon, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterrogatoriesQuestionsTab } from "./InterrogatoriesQuestionsTab";
import { DocumentProductionQuestionsTab } from "./DocumentProductionQuestionsTab";
import { DepositionQuestionsTab } from "./DepositionQuestionsTab";
import { InspectionQuestionsTab } from "./InspectionQuestionsTab";

interface SelectedSubprocessDetailsTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
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

const discoveryTypes = [
  { id: "interrogatories", label: "Interrogatories" },
  { id: "document-production", label: "Document Production" },
  { id: "deposition", label: "Deposition" },
  { id: "inspection", label: "Inspection" }
];

export function SelectedSubprocessDetailsTab({ onDataChange, data, onComplete, onNext, onPrevious }: SelectedSubprocessDetailsTabProps) {
  // Discovery-specific states for sub-tabs
  const [currentDiscoverySubTab, setCurrentDiscoverySubTab] = useState<string | null>(null);
  const [discoverySubTabData, setDiscoverySubTabData] = useState<any>({});
  const [discoverySubTabValidation, setDiscoverySubTabValidation] = useState<{[key: string]: boolean}>({});
  
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

  // Discovery-specific states
  const [selectedDiscoveryTypes, setSelectedDiscoveryTypes] = useState<string[]>(data.discoveryTypes || []);
  const [discoverySchedule, setDiscoverySchedule] = useState(data.discoverySchedule || "");
  const [discoveryStartDate, setDiscoveryStartDate] = useState<Date | undefined>(data.discoveryStartDate);
  const [discoveryCutoffDate, setDiscoveryCutoffDate] = useState<Date | undefined>(data.discoveryCutoffDate);
  const [discoveryConferenceDate, setDiscoveryConferenceDate] = useState<Date | undefined>(data.discoveryConferenceDate);
  const [discoverySummary, setDiscoverySummary] = useState(data.discoverySummary || "");

  // General states for other request types
  const [description, setDescription] = useState(data.description || "");

  const { requestGroup, requestType } = data;

  // Discovery helper functions
  const updateDiscoverySubTabData = (subTab: string, newData: any) => {
    setDiscoverySubTabData(prev => ({
      ...prev,
      [subTab]: { ...(prev[subTab] || {}), ...newData }
    }));
  };

  const updateDiscoverySubTabValidation = (subTab: string, isValid: boolean) => {
    setDiscoverySubTabValidation(prev => ({
      ...prev,
      [subTab]: isValid
    }));
  };

  const handleDiscoveryTypeChange = (typeId: string, checked: boolean) => {
    let updatedTypes;
    if (checked) {
      updatedTypes = [...selectedDiscoveryTypes, typeId];
    } else {
      updatedTypes = selectedDiscoveryTypes.filter(id => id !== typeId);
      // Clear data for removed type
      setDiscoverySubTabData(prev => {
        const newData = { ...prev };
        delete newData[typeId];
        return newData;
      });
      // Clear validation for removed type
      setDiscoverySubTabValidation(prev => {
        const newValidation = { ...prev };
        delete newValidation[typeId];
        return newValidation;
      });
    }
    setSelectedDiscoveryTypes(updatedTypes);
  };

  const getDiscoverySubTabs = () => {
    const subTabs = [];
    if (selectedDiscoveryTypes.includes('interrogatories')) {
      subTabs.push({ id: 'interrogatories', title: 'Interrogatories Questions' });
    }
    if (selectedDiscoveryTypes.includes('document-production')) {
      subTabs.push({ id: 'document-production', title: 'Document Production Questions' });
    }
    if (selectedDiscoveryTypes.includes('deposition')) {
      subTabs.push({ id: 'deposition', title: 'Deposition Questions' });
    }
    if (selectedDiscoveryTypes.includes('inspection')) {
      subTabs.push({ id: 'inspection', title: 'Inspection Questions' });
    }
    return subTabs;
  };

  const areAllDiscoverySubTabsValid = () => {
    const requiredSubTabs = selectedDiscoveryTypes;
    return requiredSubTabs.every(subTab => discoverySubTabValidation[subTab] === true);
  };

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
      selectedDiscoveryTypes,
      discoveryTypes: selectedDiscoveryTypes, // Also pass as discoveryTypes for backward compatibility
      discoverySchedule,
      discoveryStartDate,
      discoveryCutoffDate,
      discoveryConferenceDate,
      discoverySummary,
      description,
      discoverySubTabData,
      currentDiscoverySubTab
    };
    onDataChange(updatedData);
  }, [
    consultOtherSide, outcome, documentTitle, hasInappropriateContent, hasPII, hasConfidentialInfo,
    hasProtectiveOrder, exhibitIdNumber, physicalItemCategory, itemName, itemDescription,
    estimatedSize, estimatedWeight, hasBiologicalHazard, hasChemicalHazard, hasRadiationHazard,
    hasLithiumBattery, deliverableByCarrier, specialHandling, specialHandlingDescription,
    evidenceJustification, itemPhoto, selectedDiscoveryTypes, discoverySchedule, discoveryStartDate,
    discoveryCutoffDate, discoveryConferenceDate, discoverySummary, description, onDataChange,
    discoverySubTabData, currentDiscoverySubTab
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
    
    if (requestGroup === "discovery") {
      const mainFormValid = selectedDiscoveryTypes.length > 0 && discoverySchedule && 
                           discoveryStartDate && discoveryCutoffDate && discoverySummary.trim() !== "";
      return mainFormValid && areAllDiscoverySubTabsValid();
    }
    
    // For certificate, pleading, notices
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
                <Label className="font-fluent font-medium text-base">Does the item contain any depiction of any persons or places which, if disclosed, would be considered to be embarrassing, inappropriate, or otherwise not suitable for public viewing?</Label>
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

              {hasInappropriateContent === "yes" && (
                <Alert className="bg-orange-50 border-orange-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This exhibit may contain material that is not suitable for public viewing. The submission will be flagged for administrative review.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* PII Question */}
            <div className="space-y-4 p-4 border border-input-border rounded-lg bg-background/50">
              <div className="space-y-2">
                <Label className="font-fluent font-medium text-base">Does the item contain any Personally Identifiable Information (PII) such as names, addresses, phone numbers, Social Security number, Driver's License Number, or any other identification number? *</Label>
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
                    <Label className="font-fluent font-medium text-base">In order for this document to be submitted as an exhibit, a Protective Order must be issued. Has a Protective Order for this document been issued? *</Label>
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
                      <Label className="font-fluent font-semibold text-sm">Enter the Protective Order ID Number. *</Label>
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

  const removeDiscoveryType = (typeId: string) => {
    const updatedTypes = selectedDiscoveryTypes.filter(id => id !== typeId);
    setSelectedDiscoveryTypes(updatedTypes);
  };

  const renderDiscoveryWithSubTabs = () => {
    const subTabs = getDiscoverySubTabs();
    
    // If in a sub-tab view, render the sub-tab
    if (currentDiscoverySubTab) {
      const renderSubTab = () => {
        switch (currentDiscoverySubTab) {
          case 'interrogatories':
            return (
              <InterrogatoriesQuestionsTab
                data={discoverySubTabData.interrogatories || {}}
                onDataChange={(data) => updateDiscoverySubTabData('interrogatories', data)}
                onValidationChange={(isValid) => updateDiscoverySubTabValidation('interrogatories', isValid)}
                isReadOnly={false}
              />
            );
          case 'document-production':
            return (
              <DocumentProductionQuestionsTab
                data={discoverySubTabData['document-production'] || {}}
                onDataChange={(data) => updateDiscoverySubTabData('document-production', data)}
                onValidationChange={(isValid) => updateDiscoverySubTabValidation('document-production', isValid)}
                isReadOnly={false}
              />
            );
          case 'deposition':
            return (
              <DepositionQuestionsTab
                data={discoverySubTabData.deposition || {}}
                onDataChange={(data) => updateDiscoverySubTabData('deposition', data)}
                onValidationChange={(isValid) => updateDiscoverySubTabValidation('deposition', isValid)}
                isReadOnly={false}
              />
            );
          case 'inspection':
            return (
              <InspectionQuestionsTab
                data={discoverySubTabData.inspection || {}}
                onDataChange={(data) => updateDiscoverySubTabData('inspection', data)}
                onValidationChange={(isValid) => updateDiscoverySubTabValidation('inspection', isValid)}
                isReadOnly={false}
              />
            );
          default:
            return null;
        }
      };

      return (
        <div className="space-y-6">
          {/* Sub-tab header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentDiscoverySubTab(null)}
              className="flex items-center gap-2"
            >
              ← Back to Discovery Information
            </Button>
          </div>
          
          {/* Sub-tab content */}
          {renderSubTab()}
        </div>
      );
    }

    // Main Discovery form
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
                <Select value={discoverySchedule} onValueChange={setDiscoverySchedule}>
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
                      onSelect={setDiscoveryStartDate}
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
                      onSelect={setDiscoveryCutoffDate}
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
                      onSelect={setDiscoveryConferenceDate}
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
                value={discoverySummary}
                onChange={(e) => setDiscoverySummary(e.target.value)}
                placeholder="Provide a detailed summary of your discovery request..."
                className="shadow-fluent-8 border-input-border min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sub-tabs cards */}
        {subTabs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-fluent">Discovery Sub-Processes</h3>
            <div className="grid gap-4">
              {subTabs.map((subTab) => (
                <Card key={subTab.id} className="shadow-fluent-8">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center",
                          discoverySubTabValidation[subTab.id] ? "bg-green-500" : "bg-gray-300"
                        )}>
                          {discoverySubTabValidation[subTab.id] && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium font-fluent">{subTab.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {discoverySubTabValidation[subTab.id] ? "Completed" : "Requires attention"}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentDiscoverySubTab(subTab.id)}
                      >
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOtherDetails = () => {
    const title = requestGroup === "certificate" ? "Certificate Details" :
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
    
    if (requestGroup === "discovery") {
      return renderDiscoveryWithSubTabs();
    }
    
    return renderOtherDetails();
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      {/* Navigation - only show if not in a discovery sub-tab */}
      {!(requestGroup === "discovery" && currentDiscoverySubTab) && (
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button 
            disabled={!canContinue()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
