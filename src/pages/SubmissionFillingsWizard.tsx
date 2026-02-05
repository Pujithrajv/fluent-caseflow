 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { Header } from "@/components/shared/Header";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Label } from "@/components/ui/label";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Checkbox } from "@/components/ui/checkbox";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Info, ChevronRight, ChevronLeft, Check, Upload, FileText, User, Building, Scale } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 type RequestGroup = "Motion" | "Exhibit" | "Discovery" | "Subpoena" | "";
 
 interface SubpoenaTarget {
   name: string;
   role: string;
   address: string;
   email: string;
   phone: string;
 }
 
 interface SubmissionData {
   requestGroup: RequestGroup;
   requestType: string;
   requestSummary: string;
   responseRequiredFrom: string;
   useOwnDocuments: boolean;
   documents: File[];
   // Subpoena specific fields
   subpoenaTarget: SubpoenaTarget;
   reasonForRequest: string;
   availableElsewhere: string;
   elsewhereExplanation: string;
   // Ad Testificandum fields
   purposeOfTestimony: string;
   testimonyBasis: string[];
   witnessObserved: string;
   witnessDecisionMaking: string;
   witnessExpert: string;
   appearanceMethod: string;
   testimonyLocation: string;
   estimatedDuration: string;
   accommodationsRequired: string;
   accommodationsDetails: string;
   // Duces Tecum fields
   requestedMaterials: string;
   materialTypes: string[];
   // Legal confirmations
   relevantToCase: string;
   reasonableScope: string;
   avoidsPrivileged: string;
   attemptedInformal: string;
   // Certification
   certifyGoodFaith: boolean;
   acknowledgePenalties: boolean;
   electronicSignature: string;
   submissionDate: string;
 }
 
 const requestTypeOptions: Record<string, string[]> = {
   Motion: ["Motion to Dismiss", "Motion for Summary Judgment", "Motion to Compel", "Motion for Extension"],
   Exhibit: ["Physical Exhibit", "Documentary Exhibit", "Electronic Exhibit", "Demonstrative Exhibit"],
   Discovery: ["Interrogatories", "Document Production", "Deposition", "Inspection"],
   Subpoena: ["Subpoena ad testificandum", "Subpoena duces tecum"],
 };
 
 const responseFromOptions = ["Respondent", "Petitioner", "Third Party", "All Parties"];
 
 const testimonyBasisOptions = [
   "Direct observation",
   "Professional involvement",
   "Expert knowledge",
   "Record creation or review",
 ];
 
 const materialTypeOptions = [
   "Emails",
   "Reports",
   "Logs",
   "Records",
   "Audio / video",
   "Photographs",
   "Electronic data",
   "Physical items",
 ];
 
 export default function SubmissionFillingsWizard() {
   const navigate = useNavigate();
   const [currentStep, setCurrentStep] = useState(0);
   const [formData, setFormData] = useState<SubmissionData>({
     requestGroup: "",
     requestType: "",
     requestSummary: "",
     responseRequiredFrom: "",
     useOwnDocuments: false,
     documents: [],
     subpoenaTarget: { name: "", role: "", address: "", email: "", phone: "" },
     reasonForRequest: "",
     availableElsewhere: "",
     elsewhereExplanation: "",
     purposeOfTestimony: "",
     testimonyBasis: [],
     witnessObserved: "",
     witnessDecisionMaking: "",
     witnessExpert: "",
     appearanceMethod: "",
     testimonyLocation: "",
     estimatedDuration: "",
     accommodationsRequired: "",
     accommodationsDetails: "",
     requestedMaterials: "",
     materialTypes: [],
     relevantToCase: "",
     reasonableScope: "",
     avoidsPrivileged: "",
     attemptedInformal: "",
     certifyGoodFaith: false,
     acknowledgePenalties: false,
     electronicSignature: "",
     submissionDate: new Date().toISOString().split("T")[0],
   });
 
   // Dynamic step names based on request type
   const getStepLabel = (stepIndex: number) => {
     if (stepIndex === 1) {
       if (formData.requestType === "Subpoena ad testificandum") {
         return "Subpoena – Ad Testificandum";
       } else if (formData.requestType === "Subpoena duces tecum") {
         return "Subpoena – Duces Tecum";
       } else if (formData.requestType) {
         return formData.requestType;
       }
       return "Request Documents";
     }
     if (stepIndex === 0) return "Request Details";
     if (stepIndex === 2) return "Review and Submit";
     return "";
   };
 
   const steps = [getStepLabel(0), getStepLabel(1), getStepLabel(2)];
 
   const isStep1Valid = () => {
     return (
       formData.requestGroup !== "" &&
       formData.requestType !== "" &&
       formData.requestSummary.trim() !== "" &&
       formData.responseRequiredFrom !== ""
     );
   };
 
   const isStep2Valid = () => {
     if (formData.requestGroup === "Subpoena") {
       const targetValid =
         formData.subpoenaTarget.name.trim() !== "" &&
         formData.subpoenaTarget.address.trim() !== "" &&
         formData.reasonForRequest.trim() !== "";
       
       if (formData.requestType === "Subpoena ad testificandum") {
         return targetValid && formData.purposeOfTestimony.trim() !== "";
       } else if (formData.requestType === "Subpoena duces tecum") {
         return targetValid && formData.requestedMaterials.trim() !== "";
       }
     }
     return true;
   };
 
   const isStep3Valid = () => {
     if (formData.requestGroup === "Subpoena") {
       return (
         formData.certifyGoodFaith &&
         formData.acknowledgePenalties &&
         formData.electronicSignature.trim() !== ""
       );
     }
     return true;
   };
 
   const handleNext = () => {
     if (currentStep < steps.length - 1) {
       setCurrentStep(currentStep + 1);
     }
   };
 
   const handleBack = () => {
     if (currentStep > 0) {
       setCurrentStep(currentStep - 1);
     }
   };
 
   const handleSubmit = () => {
     console.log("Submitting:", formData);
     navigate("/dashboard");
   };
 
   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files) {
       const newFiles = Array.from(e.target.files);
       setFormData({ ...formData, documents: [...formData.documents, ...newFiles] });
     }
   };
 
   const removeDocument = (index: number) => {
     setFormData({
       ...formData,
       documents: formData.documents.filter((_, i) => i !== index),
     });
   };
 
   const updateTarget = (field: keyof SubpoenaTarget, value: string) => {
     setFormData({
       ...formData,
       subpoenaTarget: { ...formData.subpoenaTarget, [field]: value },
     });
   };
 
   const toggleTestimonyBasis = (value: string) => {
     const current = formData.testimonyBasis;
     const updated = current.includes(value)
       ? current.filter((v) => v !== value)
       : [...current, value];
     setFormData({ ...formData, testimonyBasis: updated });
   };
 
   const toggleMaterialType = (value: string) => {
     const current = formData.materialTypes;
     const updated = current.includes(value)
       ? current.filter((v) => v !== value)
       : [...current, value];
     setFormData({ ...formData, materialTypes: updated });
   };
 
   // ========== STEP 1: Request Details ==========
   const renderRequestDetails = () => (
     <Card className="shadow-sm border border-border">
       <CardHeader className="pb-4">
         <CardTitle className="text-xl font-semibold text-foreground">
           Request Details
         </CardTitle>
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
               <SelectValue placeholder="Select" />
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
             onValueChange={(value) => setFormData({ ...formData, requestType: value })}
             disabled={!formData.requestGroup}
           >
             <SelectTrigger
               className={cn(
                 "w-full h-11 bg-background border-input",
                 !formData.requestGroup && "opacity-50 cursor-not-allowed"
               )}
             >
               <SelectValue placeholder="Select" />
             </SelectTrigger>
             <SelectContent className="bg-background border border-border z-50">
               {formData.requestGroup &&
                 requestTypeOptions[formData.requestGroup]?.map((type) => (
                   <SelectItem key={type} value={type}>
                     {type}
                   </SelectItem>
                 ))}
             </SelectContent>
           </Select>
           {!formData.requestGroup && (
             <p className="text-xs text-muted-foreground">Please select a Request Group first</p>
           )}
         </div>
 
         {/* Request Summary */}
         <div className="space-y-2">
           <Label className="text-sm font-medium">
             Request Summary <span className="text-destructive">*</span>
           </Label>
           <Textarea
             placeholder="Briefly describe the nature and purpose of this request..."
             className="min-h-[120px] bg-background border-input resize-none"
             value={formData.requestSummary}
             onChange={(e) => setFormData({ ...formData, requestSummary: e.target.value })}
           />
         </div>
 
         {/* Response Required From */}
         <div className="space-y-2">
           <Label className="text-sm font-medium">
             Response Required From <span className="text-destructive">*</span>
           </Label>
           <Select
             value={formData.responseRequiredFrom}
             onValueChange={(value) => setFormData({ ...formData, responseRequiredFrom: value })}
           >
             <SelectTrigger className="w-full h-11 bg-background border-input">
               <SelectValue placeholder="Select" />
             </SelectTrigger>
             <SelectContent className="bg-background border border-border z-50">
               {responseFromOptions.map((option) => (
                 <SelectItem key={option} value={option}>
                   {option}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
 
         {/* Info Card */}
         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
           <div className="flex items-start gap-3">
             <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
             <div className="space-y-3">
               <div>
                 <h4 className="font-medium text-blue-900">Use My Own Documents</h4>
                 <p className="text-sm text-blue-700 mt-1">
                   Attorneys may upload their own versions of required documentation
                   instead of using system-generated templates.
                 </p>
               </div>
               <div className="flex items-center space-x-2">
                 <Checkbox
                   id="useOwnDocs"
                   checked={formData.useOwnDocuments}
                   onCheckedChange={(checked) =>
                     setFormData({ ...formData, useOwnDocuments: checked as boolean })
                   }
                 />
                 <label htmlFor="useOwnDocs" className="text-sm font-medium text-blue-900 cursor-pointer">
                   I will use my own documents
                 </label>
               </div>
             </div>
           </div>
         </div>
 
         <div className="flex justify-end pt-4">
           <Button onClick={handleNext} disabled={!isStep1Valid()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
             Next
             <ChevronRight className="ml-2 h-4 w-4" />
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 
   // ========== STEP 2: Dynamic Content Based on Request Type ==========
   const renderSubpoenaTarget = () => (
     <div className="space-y-6">
       {/* Section Header */}
       <div className="flex items-center gap-3 pb-2 border-b border-border">
         <User className="h-5 w-5 text-primary" />
         <h3 className="text-lg font-semibold text-foreground">Subpoena Target</h3>
       </div>
 
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
           <Label className="text-sm font-medium">
             Name <span className="text-destructive">*</span>
           </Label>
           <Input
             placeholder="Name of individual or organization"
             value={formData.subpoenaTarget.name}
             onChange={(e) => updateTarget("name", e.target.value)}
             className="bg-background border-input"
           />
         </div>
         <div className="space-y-2">
           <Label className="text-sm font-medium">Role in Relation to Case</Label>
           <Input
             placeholder="e.g., Witness, Custodian of Records"
             value={formData.subpoenaTarget.role}
             onChange={(e) => updateTarget("role", e.target.value)}
             className="bg-background border-input"
           />
         </div>
         <div className="md:col-span-2 space-y-2">
           <Label className="text-sm font-medium">
             Address for Service <span className="text-destructive">*</span>
           </Label>
           <Input
             placeholder="Full address"
             value={formData.subpoenaTarget.address}
             onChange={(e) => updateTarget("address", e.target.value)}
             className="bg-background border-input"
           />
         </div>
         <div className="space-y-2">
           <Label className="text-sm font-medium">Email Address</Label>
           <Input
             type="email"
             placeholder="email@example.com"
             value={formData.subpoenaTarget.email}
             onChange={(e) => updateTarget("email", e.target.value)}
             className="bg-background border-input"
           />
         </div>
         <div className="space-y-2">
           <Label className="text-sm font-medium">Phone Number (Optional)</Label>
           <Input
             type="tel"
             placeholder="(555) 555-5555"
             value={formData.subpoenaTarget.phone}
             onChange={(e) => updateTarget("phone", e.target.value)}
             className="bg-background border-input"
           />
         </div>
       </div>
 
       {/* Reason for Request */}
       <div className="space-y-2">
         <Label className="text-sm font-medium">
           Reason for Request <span className="text-destructive">*</span>
         </Label>
         <Textarea
           placeholder="Explain why this subpoena is necessary for the case and how the person/entity is relevant to the proceeding..."
           className="min-h-[100px] bg-background border-input resize-none"
           value={formData.reasonForRequest}
           onChange={(e) => setFormData({ ...formData, reasonForRequest: e.target.value })}
         />
       </div>
 
       {/* Available Elsewhere */}
       <div className="space-y-3">
         <Label className="text-sm font-medium">Is this information available from another source?</Label>
         <RadioGroup
           value={formData.availableElsewhere}
           onValueChange={(value) => setFormData({ ...formData, availableElsewhere: value })}
           className="flex gap-6"
         >
           <div className="flex items-center space-x-2">
             <RadioGroupItem value="yes" id="elsewhere-yes" />
             <Label htmlFor="elsewhere-yes" className="font-normal cursor-pointer">Yes</Label>
           </div>
           <div className="flex items-center space-x-2">
             <RadioGroupItem value="no" id="elsewhere-no" />
             <Label htmlFor="elsewhere-no" className="font-normal cursor-pointer">No</Label>
           </div>
         </RadioGroup>
         {formData.availableElsewhere === "yes" && (
           <Textarea
             placeholder="Explain why the subpoena is still required..."
             className="min-h-[80px] bg-background border-input resize-none mt-2"
             value={formData.elsewhereExplanation}
             onChange={(e) => setFormData({ ...formData, elsewhereExplanation: e.target.value })}
           />
         )}
       </div>
     </div>
   );
 
   const renderAdTestificandum = () => (
     <div className="space-y-6">
       {/* Purpose of Testimony */}
       <div className="flex items-center gap-3 pb-2 border-b border-border">
         <Scale className="h-5 w-5 text-primary" />
         <h3 className="text-lg font-semibold text-foreground">Testimony Details</h3>
       </div>
 
       <div className="space-y-2">
         <Label className="text-sm font-medium">
           Purpose of Testimony <span className="text-destructive">*</span>
         </Label>
         <Textarea
           placeholder="What testimony are you requesting from this witness?"
           className="min-h-[100px] bg-background border-input resize-none"
           value={formData.purposeOfTestimony}
           onChange={(e) => setFormData({ ...formData, purposeOfTestimony: e.target.value })}
         />
       </div>
 
       {/* Testimony Basis */}
       <div className="space-y-3">
         <Label className="text-sm font-medium">The testimony is based on (select all that apply)</Label>
         <div className="grid grid-cols-2 gap-3">
           {testimonyBasisOptions.map((option) => (
             <div key={option} className="flex items-center space-x-2">
               <Checkbox
                 id={`basis-${option}`}
                 checked={formData.testimonyBasis.includes(option)}
                 onCheckedChange={() => toggleTestimonyBasis(option)}
               />
               <label htmlFor={`basis-${option}`} className="text-sm cursor-pointer">
                 {option}
               </label>
             </div>
           ))}
         </div>
       </div>
 
       {/* Witness Details */}
       <div className="space-y-4">
         <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Witness Details</h4>
         
         <div className="space-y-3">
           <Label className="text-sm font-medium">Did the witness directly observe the incident?</Label>
           <RadioGroup
             value={formData.witnessObserved}
             onValueChange={(value) => setFormData({ ...formData, witnessObserved: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="observed-yes" />
               <Label htmlFor="observed-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="observed-no" />
               <Label htmlFor="observed-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Was the witness involved in decision-making?</Label>
           <RadioGroup
             value={formData.witnessDecisionMaking}
             onValueChange={(value) => setFormData({ ...formData, witnessDecisionMaking: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="decision-yes" />
               <Label htmlFor="decision-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="decision-no" />
               <Label htmlFor="decision-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Is the witness a subject-matter expert?</Label>
           <RadioGroup
             value={formData.witnessExpert}
             onValueChange={(value) => setFormData({ ...formData, witnessExpert: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="expert-yes" />
               <Label htmlFor="expert-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="expert-no" />
               <Label htmlFor="expert-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
       </div>
 
       {/* Appearance Details */}
       <div className="space-y-4">
         <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Appearance Details</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-2">
             <Label className="text-sm font-medium">Method of Appearance</Label>
             <Select
               value={formData.appearanceMethod}
               onValueChange={(value) => setFormData({ ...formData, appearanceMethod: value })}
             >
               <SelectTrigger className="bg-background border-input">
                 <SelectValue placeholder="Select" />
               </SelectTrigger>
               <SelectContent className="bg-background border border-border z-50">
                 <SelectItem value="in-person">In Person</SelectItem>
                 <SelectItem value="virtual">Virtual / Remote</SelectItem>
               </SelectContent>
             </Select>
           </div>
           <div className="space-y-2">
             <Label className="text-sm font-medium">Location of Testimony</Label>
             <Input
               placeholder="Courtroom / Hearing Office"
               value={formData.testimonyLocation}
               onChange={(e) => setFormData({ ...formData, testimonyLocation: e.target.value })}
               className="bg-background border-input"
             />
           </div>
           <div className="space-y-2">
             <Label className="text-sm font-medium">Estimated Duration</Label>
             <Input
               placeholder="e.g., 2 hours"
               value={formData.estimatedDuration}
               onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
               className="bg-background border-input"
             />
           </div>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Are accommodations required?</Label>
           <RadioGroup
             value={formData.accommodationsRequired}
             onValueChange={(value) => setFormData({ ...formData, accommodationsRequired: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="accom-yes" />
               <Label htmlFor="accom-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="accom-no" />
               <Label htmlFor="accom-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
           {formData.accommodationsRequired === "yes" && (
             <Input
               placeholder="Specify accommodations..."
               value={formData.accommodationsDetails}
               onChange={(e) => setFormData({ ...formData, accommodationsDetails: e.target.value })}
               className="bg-background border-input mt-2"
             />
           )}
         </div>
       </div>
     </div>
   );
 
   const renderDucesTecum = () => (
     <div className="space-y-6">
       <div className="flex items-center gap-3 pb-2 border-b border-border">
         <FileText className="h-5 w-5 text-primary" />
         <h3 className="text-lg font-semibold text-foreground">Requested Materials</h3>
       </div>
 
       <div className="space-y-2">
         <Label className="text-sm font-medium">
           What documents or items are being requested? <span className="text-destructive">*</span>
         </Label>
         <Textarea
           placeholder="Describe the specific documents, records, or physical items you are requesting..."
           className="min-h-[120px] bg-background border-input resize-none"
           value={formData.requestedMaterials}
           onChange={(e) => setFormData({ ...formData, requestedMaterials: e.target.value })}
         />
       </div>
 
       <div className="space-y-3">
         <Label className="text-sm font-medium">Type of Materials (select all that apply)</Label>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
           {materialTypeOptions.map((option) => (
             <div key={option} className="flex items-center space-x-2">
               <Checkbox
                 id={`material-${option}`}
                 checked={formData.materialTypes.includes(option)}
                 onCheckedChange={() => toggleMaterialType(option)}
               />
               <label htmlFor={`material-${option}`} className="text-sm cursor-pointer">
                 {option}
               </label>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 
   const renderLegalConfirmations = () => (
     <div className="space-y-6 pt-6 border-t border-border">
       <div className="flex items-center gap-3 pb-2">
         <Scale className="h-5 w-5 text-primary" />
         <h3 className="text-lg font-semibold text-foreground">Legal & Compliance Confirmations</h3>
       </div>
 
       <div className="space-y-4">
         <div className="space-y-3">
           <Label className="text-sm font-medium">
             Do you believe the requested {formData.requestType === "Subpoena ad testificandum" ? "testimony" : "documents"} are relevant to the case?
           </Label>
           <RadioGroup
             value={formData.relevantToCase}
             onValueChange={(value) => setFormData({ ...formData, relevantToCase: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="relevant-yes" />
               <Label htmlFor="relevant-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="relevant-no" />
               <Label htmlFor="relevant-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Are the requests reasonable in scope?</Label>
           <RadioGroup
             value={formData.reasonableScope}
             onValueChange={(value) => setFormData({ ...formData, reasonableScope: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="scope-yes" />
               <Label htmlFor="scope-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="scope-no" />
               <Label htmlFor="scope-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Does the request avoid privileged or confidential information?</Label>
           <RadioGroup
             value={formData.avoidsPrivileged}
             onValueChange={(value) => setFormData({ ...formData, avoidsPrivileged: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="privileged-yes" />
               <Label htmlFor="privileged-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="privileged-no" />
               <Label htmlFor="privileged-no" className="font-normal cursor-pointer">No</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="not-sure" id="privileged-unsure" />
               <Label htmlFor="privileged-unsure" className="font-normal cursor-pointer">Not Sure</Label>
             </div>
           </RadioGroup>
         </div>
 
         <div className="space-y-3">
           <Label className="text-sm font-medium">Have you attempted informal requests before issuing this subpoena?</Label>
           <RadioGroup
             value={formData.attemptedInformal}
             onValueChange={(value) => setFormData({ ...formData, attemptedInformal: value })}
             className="flex gap-6"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="yes" id="informal-yes" />
               <Label htmlFor="informal-yes" className="font-normal cursor-pointer">Yes</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="no" id="informal-no" />
               <Label htmlFor="informal-no" className="font-normal cursor-pointer">No</Label>
             </div>
           </RadioGroup>
         </div>
       </div>
     </div>
   );
 
   const renderGenericDocuments = () => (
     <div className="space-y-6">
       <p className="text-sm text-muted-foreground">
         Upload any supporting documents for your request. Accepted formats: PDF, DOC, DOCX, JPG, PNG.
       </p>
 
       <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
         <input
           type="file"
           id="fileUpload"
           className="hidden"
           multiple
           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
           onChange={handleFileUpload}
         />
         <label htmlFor="fileUpload" className="cursor-pointer">
           <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
           <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
           <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG, PNG (max 10MB each)</p>
         </label>
       </div>
 
       {formData.documents.length > 0 && (
         <div className="space-y-2">
           <Label className="text-sm font-medium">Uploaded Documents</Label>
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
         </div>
       )}
     </div>
   );
 
   const renderStep2Content = () => {
     const isSubpoena = formData.requestGroup === "Subpoena";
     const isAdTestificandum = formData.requestType === "Subpoena ad testificandum";
     const isDucesTecum = formData.requestType === "Subpoena duces tecum";
 
     return (
       <Card className="shadow-sm border border-border">
         <CardHeader className="pb-4">
           <CardTitle className="text-xl font-semibold text-foreground">
             {getStepLabel(1)}
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
           {isSubpoena ? (
             <>
               {renderSubpoenaTarget()}
               {isAdTestificandum && renderAdTestificandum()}
               {isDucesTecum && renderDucesTecum()}
               {renderLegalConfirmations()}
             </>
           ) : (
             renderGenericDocuments()
           )}
 
           <div className="flex justify-between pt-4">
             <Button variant="outline" onClick={handleBack}>
               <ChevronLeft className="mr-2 h-4 w-4" />
               Back
             </Button>
             <Button onClick={handleNext} disabled={!isStep2Valid()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
               Next
               <ChevronRight className="ml-2 h-4 w-4" />
             </Button>
           </div>
         </CardContent>
       </Card>
     );
   };
 
   // ========== STEP 3: Review and Submit ==========
   const renderReviewSubmit = () => {
     const isSubpoena = formData.requestGroup === "Subpoena";
 
     return (
       <Card className="shadow-sm border border-border">
         <CardHeader className="pb-4">
           <CardTitle className="text-xl font-semibold text-foreground">Review and Submit</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
           <p className="text-sm text-muted-foreground">Please review your request details before submitting.</p>
 
           {/* Summary Grid */}
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Request Group</Label>
                 <p className="text-sm font-medium">{formData.requestGroup}</p>
               </div>
               <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Request Type</Label>
                 <p className="text-sm font-medium">{formData.requestType}</p>
               </div>
               <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Response Required From</Label>
                 <p className="text-sm font-medium">{formData.responseRequiredFrom}</p>
               </div>
               <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Using Own Documents</Label>
                 <p className="text-sm font-medium">{formData.useOwnDocuments ? "Yes" : "No"}</p>
               </div>
             </div>
 
             <div className="space-y-1">
               <Label className="text-xs text-muted-foreground">Request Summary</Label>
               <p className="text-sm bg-muted/50 p-3 rounded-lg">{formData.requestSummary}</p>
             </div>
 
             {isSubpoena && (
               <>
                 <div className="space-y-1">
                   <Label className="text-xs text-muted-foreground">Subpoena Target</Label>
                   <p className="text-sm font-medium">{formData.subpoenaTarget.name}</p>
                   <p className="text-xs text-muted-foreground">{formData.subpoenaTarget.address}</p>
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs text-muted-foreground">Reason for Request</Label>
                   <p className="text-sm bg-muted/50 p-3 rounded-lg">{formData.reasonForRequest}</p>
                 </div>
               </>
             )}
 
             {formData.documents.length > 0 && (
               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground">Attached Documents ({formData.documents.length})</Label>
                 <div className="flex flex-wrap gap-2">
                   {formData.documents.map((file, index) => (
                     <div key={index} className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full text-sm">
                       <FileText className="h-4 w-4" />
                       {file.name}
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </div>
 
           {/* Certification Section for Subpoenas */}
           {isSubpoena && (
             <div className="space-y-4 pt-4 border-t border-border">
               <h4 className="font-semibold text-foreground">Certification & Submission</h4>
               
               <div className="flex items-start space-x-3">
                 <Checkbox
                   id="certify"
                   checked={formData.certifyGoodFaith}
                   onCheckedChange={(checked) => setFormData({ ...formData, certifyGoodFaith: checked as boolean })}
                 />
                 <label htmlFor="certify" className="text-sm cursor-pointer leading-relaxed">
                   I certify that this request is made in good faith and is necessary for the proceedings.
                 </label>
               </div>
 
               <div className="flex items-start space-x-3">
                 <Checkbox
                   id="acknowledge"
                   checked={formData.acknowledgePenalties}
                   onCheckedChange={(checked) => setFormData({ ...formData, acknowledgePenalties: checked as boolean })}
                 />
                 <label htmlFor="acknowledge" className="text-sm cursor-pointer leading-relaxed">
                   I acknowledge that misuse of subpoenas may result in sanctions or penalties.
                 </label>
               </div>
 
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label className="text-sm font-medium">
                     Electronic Signature <span className="text-destructive">*</span>
                   </Label>
                   <Input
                     placeholder="Type your full legal name"
                     value={formData.electronicSignature}
                     onChange={(e) => setFormData({ ...formData, electronicSignature: e.target.value })}
                     className="bg-background border-input"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label className="text-sm font-medium">Date of Submission</Label>
                   <Input
                     type="date"
                     value={formData.submissionDate}
                     onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
                     className="bg-background border-input"
                   />
                 </div>
               </div>
             </div>
           )}
 
           <div className="flex justify-between pt-4">
             <Button variant="outline" onClick={handleBack}>
               <ChevronLeft className="mr-2 h-4 w-4" />
               Back
             </Button>
             <Button
               onClick={handleSubmit}
               disabled={isSubpoena && !isStep3Valid()}
               className="bg-primary hover:bg-primary/90 text-primary-foreground"
             >
               Submit Request
               <Check className="ml-2 h-4 w-4" />
             </Button>
           </div>
         </CardContent>
       </Card>
     );
   };
 
   const renderStep = () => {
     switch (currentStep) {
       case 0:
         return renderRequestDetails();
       case 1:
         return renderStep2Content();
       case 2:
         return renderReviewSubmit();
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
             <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/dashboard")}>Cases</span>
             <span className="mx-2">/</span>
             <span className="hover:text-foreground cursor-pointer">Case Summary</span>
             <span className="mx-2">/</span>
             <span className="text-foreground font-medium">Submission & Fillings</span>
           </nav>
         </div>
       </div>
 
       <div className="mx-auto max-w-7xl px-6 py-8">
         <div className="grid grid-cols-12 gap-8">
           {/* Left Stepper */}
           <div className="col-span-3">
             <div className="bg-background rounded-lg border border-border p-4 shadow-sm">
               <div className="space-y-1">
                 {steps.map((step, index) => (
                   <div
                     key={index}
                     className={cn(
                       "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                       currentStep === index
                         ? "bg-blue-50 text-primary"
                         : currentStep > index
                         ? "text-muted-foreground"
                         : "text-muted-foreground"
                     )}
                   >
                     <div
                       className={cn(
                         "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                         currentStep === index
                           ? "bg-primary text-primary-foreground"
                           : currentStep > index
                           ? "bg-green-500 text-white"
                           : "bg-muted text-muted-foreground"
                       )}
                     >
                       {currentStep > index ? <Check className="h-4 w-4" /> : index + 1}
                     </div>
                     <span className={cn("text-sm font-medium", currentStep === index && "text-primary")}>
                       {step}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
 
           {/* Right Content */}
           <div className="col-span-9">{renderStep()}</div>
         </div>
       </div>
 
       {/* Footer */}
       <footer className="bg-[#0B3A78] text-white py-4 mt-8">
         <div className="mx-auto max-w-7xl px-6 text-center text-sm">
           © {new Date().getFullYear()} Illinois Department of Central Management Services. All rights reserved.
         </div>
       </footer>
     </div>
   );
 }