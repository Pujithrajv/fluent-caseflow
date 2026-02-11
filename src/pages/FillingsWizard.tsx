import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Info,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  FileText,
  AlertTriangle,
  Shield,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type RequestGroup = "Motion" | "Exhibit" | "Discovery" | "Subpoena" | "";
type ExhibitType = "Document" | "Oversized or Voluminous Document" | "Photograph" | "Recording" | "Physical Item" | "";

interface ExhibitFormData {
  // Step 1
  requestGroup: RequestGroup;
  requestType: ExhibitType;
  summary: string;

  // Step 2 - Compliance (Digital)
  q1EmbarrassingContent: string; // yes/no
  q1aAction: string; // ok/skip
  q2PII: string; // yes/no
  q3Confidential: string; // yes/no
  q3aProtectiveOrder: string; // yes/no
  q3aExhibitId: string;

  // Step 2 - Physical Item
  itemName: string;
  itemDescription: string;
  estimatedSize: string;
  estimatedWeight: string;
  bioHazard: string;
  lithiumBattery: string;
  deliverableByCourier: string;
  specialHandling: string;
  specialHandlingDetails: string;
  justification: string;

  // Document info
  documentTitle: string;

  // Upload
  documents: File[];
  photoFile: File | null;

  // Completion
  hasAnotherUpload: string;
}

const initialFormData: ExhibitFormData = {
  requestGroup: "",
  requestType: "",
  summary: "",
  q1EmbarrassingContent: "",
  q1aAction: "",
  q2PII: "",
  q3Confidential: "",
  q3aProtectiveOrder: "",
  q3aExhibitId: "",
  itemName: "",
  itemDescription: "",
  estimatedSize: "",
  estimatedWeight: "",
  bioHazard: "",
  lithiumBattery: "",
  deliverableByCourier: "",
  specialHandling: "",
  specialHandlingDetails: "",
  justification: "",
  documentTitle: "",
  documents: [],
  photoFile: null,
  hasAnotherUpload: "",
};

const requestTypeOptions: Record<string, string[]> = {
  Motion: ["Motion to Dismiss", "Motion for Summary Judgment", "Motion to Compel", "Motion for Extension"],
  Exhibit: ["Document", "Oversized or Voluminous Document", "Photograph", "Recording", "Physical Item"],
  Discovery: ["Interrogatories", "Document Production", "Deposition", "Inspection"],
  Subpoena: ["Subpoena ad testificandum", "Subpoena duces tecum"],
};

export default function FillingsWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ExhibitFormData>(initialFormData);
  const [exhibitCount, setExhibitCount] = useState(0);
  const [complianceBlocked, setComplianceBlocked] = useState(false);
  const [showMotionRedirect, setShowMotionRedirect] = useState(false);
  const [showPhysicalItemResult, setShowPhysicalItemResult] = useState(false);

  const isDigitalType = ["Document", "Oversized or Voluminous Document", "Photograph", "Recording"].includes(formData.requestType);
  const isPhysicalItem = formData.requestType === "Physical Item";
  const isOversized = formData.requestType === "Oversized or Voluminous Document";

  const getStepLabel = (index: number) => {
    switch (index) {
      case 0: return "Request Setup";
      case 1: return formData.requestType ? `Exhibit – ${formData.requestType}` : "Exhibit Details";
      case 2: return "Confirmation";
      default: return "";
    }
  };

  const steps = [0, 1, 2];

  const isStep1Valid = () => {
    return formData.requestGroup !== "" && formData.requestType !== "" && formData.summary.trim() !== "";
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setComplianceBlocked(false);
      setShowMotionRedirect(false);
      setShowPhysicalItemResult(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({ ...formData, documents: [...formData.documents, ...newFiles] });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photoFile: e.target.files[0] });
    }
  };

  const removeDocument = (index: number) => {
    setFormData({ ...formData, documents: formData.documents.filter((_, i) => i !== index) });
  };

  const handleSubmitExhibit = () => {
    const newCount = exhibitCount + 1;
    setExhibitCount(newCount);

    if (isOversized) {
      toast({
        title: "Notification Sent",
        description: "Oversized or Voluminous Document Notification has been sent. This document may require special handling.",
      });
    }

    setCurrentStep(2);
  };

  const handlePhysicalItemSubmit = () => {
    setShowPhysicalItemResult(true);
    setCurrentStep(2);
  };

  const handleUploadAnother = () => {
    setFormData({
      ...formData,
      documentTitle: "",
      q1EmbarrassingContent: "",
      q1aAction: "",
      q2PII: "",
      q3Confidential: "",
      q3aProtectiveOrder: "",
      q3aExhibitId: "",
      documents: [],
      hasAnotherUpload: "",
    });
    setComplianceBlocked(false);
    setShowMotionRedirect(false);
    setCurrentStep(1);
  };

  // ======== STEP 1 – Request Setup ========
  const renderStep1 = () => (
    <Card className="shadow-sm border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">Request Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Group */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Request Group <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.requestGroup}
            onValueChange={(value: RequestGroup) => {
              setFormData({ ...formData, requestGroup: value, requestType: "" });
            }}
          >
            <SelectTrigger className="w-full h-11 bg-background border-input">
              <SelectValue placeholder="Select request group" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              <SelectItem value="Motion">Motion</SelectItem>
              <SelectItem value="Exhibit">Exhibit</SelectItem>
              <SelectItem value="Discovery">Discovery</SelectItem>
              <SelectItem value="Subpoena">Subpoena</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Request Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Request Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.requestType}
            onValueChange={(value) => setFormData({ ...formData, requestType: value as ExhibitType })}
            disabled={!formData.requestGroup}
          >
            <SelectTrigger className={cn("w-full h-11 bg-background border-input", !formData.requestGroup && "opacity-50 cursor-not-allowed")}>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {formData.requestGroup && requestTypeOptions[formData.requestGroup]?.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!formData.requestGroup && (
            <p className="text-xs text-muted-foreground">Please select a Request Group first</p>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Summary <span className="text-destructive">*</span>
          </Label>
          <Textarea
            placeholder="Provide a brief summary of this request."
            className="min-h-[120px] bg-background border-input resize-none"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} disabled={!isStep1Valid()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // ======== STEP 2 – Digital Exhibit (Document / Photograph / Recording / Oversized) ========
  const renderDigitalExhibitStep = () => (
    <Card className="shadow-sm border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Exhibit – {formData.requestType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section A – Basic Info */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
            Section A – Basic Information
          </h3>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Document Title <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Enter document title"
              value={formData.documentTitle}
              onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
              className="h-11 bg-background border-input"
            />
          </div>
        </div>

        {/* Section B – Compliance Questions */}
        {!complianceBlocked && !showMotionRedirect && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
              Section B – Compliance Questions
            </h3>

            {/* Q1 */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
              <Label className="text-sm font-medium">
                Q1: Does the item contain any depiction that may be embarrassing, inappropriate, or not suitable for public viewing?
              </Label>
              <RadioGroup
                value={formData.q1EmbarrassingContent}
                onValueChange={(value) => setFormData({ ...formData, q1EmbarrassingContent: value, q1aAction: "" })}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q1-yes" />
                  <label htmlFor="q1-yes" className="text-sm cursor-pointer">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q1-no" />
                  <label htmlFor="q1-no" className="text-sm cursor-pointer">No</label>
                </div>
              </RadioGroup>

              {/* Q1A */}
              {formData.q1EmbarrassingContent === "yes" && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-300 rounded-lg space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">In Camera Inspection Required</p>
                      <p className="text-sm text-amber-700 mt-1">
                        This item requires an In Camera Inspection by the ALJ before it can be admitted. A "Request for In Camera Inspection" will be created and routed through the Motion subprocess.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => {
                        setFormData({ ...formData, q1aAction: "ok" });
                        setShowMotionRedirect(true);
                        toast({
                          title: "Motion Created",
                          description: "Request for In Camera Inspection has been created and routed to the Motion subprocess.",
                        });
                      }}
                    >
                      OK – Create Motion
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFormData({ ...formData, q1aAction: "skip" });
                        setComplianceBlocked(true);
                      }}
                    >
                      Skip – Return to Upload
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Q2 */}
            {formData.q1EmbarrassingContent === "no" && (
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                <Label className="text-sm font-medium">
                  Q2: Does the item contain personally identifiable information (PII)?
                </Label>
                <RadioGroup
                  value={formData.q2PII}
                  onValueChange={(value) => setFormData({ ...formData, q2PII: value })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q2-yes" />
                    <label htmlFor="q2-yes" className="text-sm cursor-pointer">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q2-no" />
                    <label htmlFor="q2-no" className="text-sm cursor-pointer">No</label>
                  </div>
                </RadioGroup>

                {formData.q2PII === "yes" && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg space-y-3">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Redaction Required</p>
                        <p className="text-sm text-red-700 mt-1">
                          All personally identifiable information must be redacted before this exhibit can be submitted. Please ensure all PII has been properly redacted from the document.
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => setComplianceBlocked(true)}
                    >
                      OK – I Understand
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Q3 */}
            {formData.q1EmbarrassingContent === "no" && formData.q2PII === "no" && (
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                <Label className="text-sm font-medium">
                  Q3: Does the item contain confidential or privileged information?
                </Label>
                <RadioGroup
                  value={formData.q3Confidential}
                  onValueChange={(value) => setFormData({ ...formData, q3Confidential: value, q3aProtectiveOrder: "", q3aExhibitId: "" })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q3-yes" />
                    <label htmlFor="q3-yes" className="text-sm cursor-pointer">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q3-no" />
                    <label htmlFor="q3-no" className="text-sm cursor-pointer">No</label>
                  </div>
                </RadioGroup>

                {/* Q3 = No → redirect to Motion for Protective Order */}
                {formData.q3Confidential === "no" && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        No confidential information — you may proceed to upload.
                      </p>
                    </div>
                  </div>
                )}

                {/* Q3A */}
                {formData.q3Confidential === "yes" && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-amber-300">
                    <Label className="text-sm font-medium">
                      Q3A: Has a Protective Order been issued for this case?
                    </Label>
                    <RadioGroup
                      value={formData.q3aProtectiveOrder}
                      onValueChange={(value) => setFormData({ ...formData, q3aProtectiveOrder: value })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="q3a-yes" />
                        <label htmlFor="q3a-yes" className="text-sm cursor-pointer">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="q3a-no" />
                        <label htmlFor="q3a-no" className="text-sm cursor-pointer">No</label>
                      </div>
                    </RadioGroup>

                    {formData.q3aProtectiveOrder === "no" && (
                      <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg space-y-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-900">Protective Order Required</p>
                            <p className="text-sm text-amber-700 mt-1">
                              A Motion for Protective Order must be filed before this exhibit can be submitted. You will be redirected to the Motion subprocess.
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={() => {
                            setShowMotionRedirect(true);
                            toast({
                              title: "Motion Created",
                              description: "Motion for Protective Order has been created and routed.",
                            });
                          }}
                        >
                          File Motion for Protective Order
                        </Button>
                      </div>
                    )}

                    {formData.q3aProtectiveOrder === "yes" && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Enter Exhibit ID Number</Label>
                        <Input
                          placeholder="e.g., EXH-2024-0001"
                          value={formData.q3aExhibitId}
                          onChange={(e) => setFormData({ ...formData, q3aExhibitId: e.target.value })}
                          className="h-11 bg-background border-input max-w-sm"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Motion Redirect Notice */}
        {showMotionRedirect && (
          <div className="p-6 bg-amber-50 border border-amber-300 rounded-lg text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-600 mx-auto" />
            <h4 className="text-lg font-semibold text-amber-900">Motion Routing in Progress</h4>
            <p className="text-sm text-amber-700">
              Your request has been routed through the Motion subprocess. The process has ended for this exhibit.
            </p>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        )}

        {/* Compliance blocked – return to upload */}
        {complianceBlocked && !showMotionRedirect && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center space-y-3">
            <Info className="h-8 w-8 text-blue-600 mx-auto" />
            <p className="text-sm text-blue-700">Compliance review noted. You may proceed to upload your document.</p>
          </div>
        )}

        {/* Section C – Upload (shown when compliance passes or is blocked/skipped) */}
        {!showMotionRedirect && canShowUpload() && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
              Section C – Upload
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload your exhibit file. It will be saved to Case File → Exhibits → Submitted.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="exhibitUpload"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.mp4,.wav"
                onChange={handleFileUpload}
              />
              <label htmlFor="exhibitUpload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG, PNG, MP3, MP4 (max 10MB each)</p>
              </label>
            </div>
            {formData.documents.length > 0 && (
              <div className="space-y-2">
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeDocument(index)} className="text-destructive hover:text-destructive/80">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {isOversized && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    <strong>Note:</strong> This document may require special handling. An "Oversized or Voluminous Document Notification" will be sent upon submission.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {!showMotionRedirect && (
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {canShowUpload() && (
              <Button
                onClick={handleSubmitExhibit}
                disabled={formData.documents.length === 0 || !formData.documentTitle}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Exhibit <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  function canShowUpload(): boolean {
    if (complianceBlocked) return true;
    // All compliance questions answered with "no" path
    if (formData.q1EmbarrassingContent === "no" && formData.q2PII === "no") {
      if (formData.q3Confidential === "no") return true;
      if (formData.q3Confidential === "yes" && formData.q3aProtectiveOrder === "yes" && formData.q3aExhibitId) return true;
    }
    return false;
  }

  // ======== STEP 2 – Physical Item ========
  const renderPhysicalItemStep = () => (
    <Card className="shadow-sm border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Package className="h-5 w-5" />
          Exhibit – Physical Item
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {!showPhysicalItemResult && (
          <>
            {/* Section A – Physical Item Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                Section A – Physical Item Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Name of Item <span className="text-destructive">*</span></Label>
                  <Input value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} placeholder="Enter item name" className="h-11 bg-background border-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Physical Item Description <span className="text-destructive">*</span></Label>
                  <Input value={formData.itemDescription} onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })} placeholder="Describe the item" className="h-11 bg-background border-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estimated Size <span className="text-destructive">*</span></Label>
                  <Input value={formData.estimatedSize} onChange={(e) => setFormData({ ...formData, estimatedSize: e.target.value })} placeholder="e.g., 12in x 8in x 4in" className="h-11 bg-background border-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estimated Weight <span className="text-destructive">*</span></Label>
                  <Input value={formData.estimatedWeight} onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })} placeholder="e.g., 5 lbs" className="h-11 bg-background border-input" />
                </div>
              </div>
            </div>

            {/* Section B – Safety Screening */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                Section B – Safety Screening
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Biological, Chemical, or Radiation Hazard?", key: "bioHazard" as const },
                  { label: "Permanently Mounted Lithium Battery?", key: "lithiumBattery" as const },
                  { label: "Deliverable by Courier?", key: "deliverableByCourier" as const },
                ].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                    <Label className="text-sm font-medium">{label}</Label>
                    <RadioGroup
                      value={formData[key]}
                      onValueChange={(value) => setFormData({ ...formData, [key]: value })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${key}-yes`} />
                        <label htmlFor={`${key}-yes`} className="text-sm cursor-pointer">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${key}-no`} />
                        <label htmlFor={`${key}-no`} className="text-sm cursor-pointer">No</label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}

                <div className="p-3 bg-muted/30 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Special Handling Required?</Label>
                    <RadioGroup
                      value={formData.specialHandling}
                      onValueChange={(value) => setFormData({ ...formData, specialHandling: value })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="sh-yes" />
                        <label htmlFor="sh-yes" className="text-sm cursor-pointer">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="sh-no" />
                        <label htmlFor="sh-no" className="text-sm cursor-pointer">No</label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.specialHandling === "yes" && (
                    <Input
                      placeholder="Describe special handling requirements"
                      value={formData.specialHandlingDetails}
                      onChange={(e) => setFormData({ ...formData, specialHandlingDetails: e.target.value })}
                      className="h-11 bg-background border-input"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Section C – Photo Upload */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                Section C – Photo of Item
              </h3>
              <p className="text-sm text-muted-foreground">Upload one photograph of the physical item.</p>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input type="file" id="photoUpload" className="hidden" accept=".jpg,.jpeg,.png" onChange={handlePhotoUpload} />
                <label htmlFor="photoUpload" className="cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Upload photograph</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG (max 10MB)</p>
                </label>
              </div>
              {formData.photoFile && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{formData.photoFile.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setFormData({ ...formData, photoFile: null })} className="text-destructive hover:text-destructive/80 ml-auto">
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Section D – Justification */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                Section D – Justification
              </h3>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Explain why this physical item should be used instead of photographs <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  placeholder="Provide justification for submitting this physical item..."
                  className="min-h-[120px] bg-background border-input resize-none"
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handlePhysicalItemSubmit}
                disabled={!formData.itemName || !formData.itemDescription || !formData.estimatedSize || !formData.estimatedWeight || !formData.justification}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Request <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  // ======== STEP 3 – Confirmation ========
  const renderConfirmation = () => (
    <Card className="shadow-sm border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isPhysicalItem ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Request Submitted for ALJ Review</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your request to submit this physical item has been referred to the ALJ for ruling.
              A "Request to Submit Physical Item" document has been generated and routed through the Motion subprocess.
            </p>
            <p className="text-xs text-muted-foreground">No Exhibit ID has been assigned yet.</p>
          </div>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Exhibit Uploaded Successfully</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You have uploaded <strong>{exhibitCount}</strong> exhibit{exhibitCount !== 1 ? "s" : ""}. A confirmation will be sent by email.
            </p>
            {isOversized && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-amber-700">
                  <strong>Oversized Document:</strong> A notification has been sent regarding special handling requirements.
                </p>
              </div>
            )}

            {/* Another upload? */}
            <div className="pt-4 space-y-3">
              <Label className="text-sm font-medium">Do you have another upload?</Label>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleUploadAnother}>
                  Yes – Upload Another
                </Button>
                <Button onClick={() => navigate("/dashboard")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  No – Finish
                </Button>
              </div>
            </div>
          </div>
        )}

        {isPhysicalItem && (
          <div className="flex justify-center pt-4">
            <Button onClick={() => navigate("/dashboard")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Return to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        if (isDigitalType) return renderDigitalExhibitStep();
        if (isPhysicalItem) return renderPhysicalItemStep();
        return renderStep1(); // fallback
      case 2:
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <nav className="text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Fillings</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Stepper */}
          <div className="col-span-3">
            <div className="bg-background rounded-lg border border-border p-4 shadow-sm">
              <div className="space-y-1">
                {steps.map((stepIndex) => (
                  <div
                    key={stepIndex}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      currentStep === stepIndex
                        ? "bg-blue-50 text-primary"
                        : currentStep > stepIndex
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                        currentStep === stepIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : currentStep > stepIndex
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted-foreground/30 bg-background text-muted-foreground"
                      )}
                    >
                      {currentStep > stepIndex ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        stepIndex + 1
                      )}
                    </div>
                    <span className="text-sm font-medium">{getStepLabel(stepIndex)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-9">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}