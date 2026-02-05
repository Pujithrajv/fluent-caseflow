 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { Header } from "@/components/shared/Header";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Checkbox } from "@/components/ui/checkbox";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Info, ChevronRight, Check, Upload, FileText } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 type RequestGroup = "Motion" | "Exhibit" | "Discovery" | "Subpoena" | "";
 
 interface FillingData {
   requestGroup: RequestGroup;
   requestType: string;
   requestSummary: string;
   responseRequiredFrom: string;
   useOwnDocuments: boolean;
   documents: File[];
 }
 
 const requestTypeOptions: Record<string, string[]> = {
   Motion: ["Motion to Dismiss", "Motion for Summary Judgment", "Motion to Compel", "Motion for Extension"],
   Exhibit: ["Physical Exhibit", "Documentary Exhibit", "Electronic Exhibit", "Demonstrative Exhibit"],
   Discovery: ["Interrogatories", "Document Production", "Deposition", "Inspection"],
   Subpoena: ["Subpoena ad testificandum", "Subpoena duces tecum"],
 };
 
 const responseFromOptions = [
   "Respondent",
   "Petitioner",
   "Third Party",
   "All Parties",
 ];
 
 export default function FillingsWizard() {
   const navigate = useNavigate();
   const [currentStep, setCurrentStep] = useState(0);
   const [fillingData, setFillingData] = useState<FillingData>({
     requestGroup: "",
     requestType: "",
     requestSummary: "",
     responseRequiredFrom: "",
     useOwnDocuments: false,
     documents: [],
   });
 
   const steps = ["Request Details", "Request Documents", "Review and Submit"];
 
   const isStep1Valid = () => {
     return (
       fillingData.requestGroup !== "" &&
       fillingData.requestType !== "" &&
       fillingData.requestSummary.trim() !== "" &&
       fillingData.responseRequiredFrom !== ""
     );
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
     // Handle submission logic here
     console.log("Submitting filing:", fillingData);
     navigate("/dashboard");
   };
 
   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files) {
       const newFiles = Array.from(e.target.files);
       setFillingData({
         ...fillingData,
         documents: [...fillingData.documents, ...newFiles],
       });
     }
   };
 
   const removeDocument = (index: number) => {
     setFillingData({
       ...fillingData,
       documents: fillingData.documents.filter((_, i) => i !== index),
     });
   };
 
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
           <Label htmlFor="requestGroup" className="text-sm font-medium">
             Request Group <span className="text-destructive">*</span>
           </Label>
           <Select
             value={fillingData.requestGroup}
             onValueChange={(value: RequestGroup) => {
               setFillingData({
                 ...fillingData,
                 requestGroup: value,
                 requestType: "", // Reset request type when group changes
               });
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
           <Label htmlFor="requestType" className="text-sm font-medium">
             Request Type <span className="text-destructive">*</span>
           </Label>
           <Select
             value={fillingData.requestType}
             onValueChange={(value) =>
               setFillingData({ ...fillingData, requestType: value })
             }
             disabled={!fillingData.requestGroup}
           >
             <SelectTrigger
               className={cn(
                 "w-full h-11 bg-background border-input",
                 !fillingData.requestGroup && "opacity-50 cursor-not-allowed"
               )}
             >
               <SelectValue placeholder="Select" />
             </SelectTrigger>
             <SelectContent className="bg-background border border-border z-50">
               {fillingData.requestGroup &&
                 requestTypeOptions[fillingData.requestGroup]?.map((type) => (
                   <SelectItem key={type} value={type}>
                     {type}
                   </SelectItem>
                 ))}
             </SelectContent>
           </Select>
           {!fillingData.requestGroup && (
             <p className="text-xs text-muted-foreground">
               Please select a Request Group first
             </p>
           )}
         </div>
 
         {/* Request Summary */}
         <div className="space-y-2">
           <Label htmlFor="requestSummary" className="text-sm font-medium">
             Request Summary <span className="text-destructive">*</span>
           </Label>
           <Textarea
             id="requestSummary"
             placeholder="Briefly describe the nature and purpose of this request..."
             className="min-h-[120px] bg-background border-input resize-none"
             value={fillingData.requestSummary}
             onChange={(e) =>
               setFillingData({ ...fillingData, requestSummary: e.target.value })
             }
           />
         </div>
 
         {/* Response Required From */}
         <div className="space-y-2">
           <Label htmlFor="responseFrom" className="text-sm font-medium">
             Response Required From <span className="text-destructive">*</span>
           </Label>
           <Select
             value={fillingData.responseRequiredFrom}
             onValueChange={(value) =>
               setFillingData({ ...fillingData, responseRequiredFrom: value })
             }
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
                   checked={fillingData.useOwnDocuments}
                   onCheckedChange={(checked) =>
                     setFillingData({
                       ...fillingData,
                       useOwnDocuments: checked as boolean,
                     })
                   }
                 />
                 <label
                   htmlFor="useOwnDocs"
                   className="text-sm font-medium text-blue-900 cursor-pointer"
                 >
                   I will use my own documents
                 </label>
               </div>
             </div>
           </div>
         </div>
 
         {/* Next Button */}
         <div className="flex justify-end pt-4">
           <Button
             onClick={handleNext}
             disabled={!isStep1Valid()}
             className="bg-primary hover:bg-primary/90 text-primary-foreground"
           >
             Next
             <ChevronRight className="ml-2 h-4 w-4" />
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 
   const renderRequestDocuments = () => (
     <Card className="shadow-sm border border-border">
       <CardHeader className="pb-4">
         <CardTitle className="text-xl font-semibold text-foreground">
           Request Documents
         </CardTitle>
       </CardHeader>
       <CardContent className="space-y-6">
         <p className="text-sm text-muted-foreground">
           Upload any supporting documents for your request. Accepted formats: PDF,
           DOC, DOCX, JPG, PNG.
         </p>
 
         {/* Upload Area */}
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
             <p className="text-sm font-medium text-foreground">
               Click to upload or drag and drop
             </p>
             <p className="text-xs text-muted-foreground mt-1">
               PDF, DOC, DOCX, JPG, PNG (max 10MB each)
             </p>
           </label>
         </div>
 
         {/* Uploaded Files List */}
         {fillingData.documents.length > 0 && (
           <div className="space-y-2">
             <Label className="text-sm font-medium">Uploaded Documents</Label>
             <div className="space-y-2">
               {fillingData.documents.map((file, index) => (
                 <div
                   key={index}
                   className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                 >
                   <div className="flex items-center gap-3">
                     <FileText className="h-5 w-5 text-primary" />
                     <span className="text-sm font-medium">{file.name}</span>
                     <span className="text-xs text-muted-foreground">
                       ({(file.size / 1024).toFixed(1)} KB)
                     </span>
                   </div>
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => removeDocument(index)}
                     className="text-destructive hover:text-destructive/80"
                   >
                     Remove
                   </Button>
                 </div>
               ))}
             </div>
           </div>
         )}
 
         {/* Navigation Buttons */}
         <div className="flex justify-between pt-4">
           <Button variant="outline" onClick={handleBack}>
             Back
           </Button>
           <Button
             onClick={handleNext}
             className="bg-primary hover:bg-primary/90 text-primary-foreground"
           >
             Next
             <ChevronRight className="ml-2 h-4 w-4" />
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 
   const renderReviewSubmit = () => (
     <Card className="shadow-sm border border-border">
       <CardHeader className="pb-4">
         <CardTitle className="text-xl font-semibold text-foreground">
           Review and Submit
         </CardTitle>
       </CardHeader>
       <CardContent className="space-y-6">
         <p className="text-sm text-muted-foreground">
           Please review your request details before submitting.
         </p>
 
         {/* Summary */}
         <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <Label className="text-xs text-muted-foreground">Request Group</Label>
               <p className="text-sm font-medium">{fillingData.requestGroup}</p>
             </div>
             <div className="space-y-1">
               <Label className="text-xs text-muted-foreground">Request Type</Label>
               <p className="text-sm font-medium">{fillingData.requestType}</p>
             </div>
             <div className="space-y-1">
               <Label className="text-xs text-muted-foreground">
                 Response Required From
               </Label>
               <p className="text-sm font-medium">
                 {fillingData.responseRequiredFrom}
               </p>
             </div>
             <div className="space-y-1">
               <Label className="text-xs text-muted-foreground">
                 Using Own Documents
               </Label>
               <p className="text-sm font-medium">
                 {fillingData.useOwnDocuments ? "Yes" : "No"}
               </p>
             </div>
           </div>
 
           <div className="space-y-1">
             <Label className="text-xs text-muted-foreground">Request Summary</Label>
             <p className="text-sm bg-muted/50 p-3 rounded-lg">
               {fillingData.requestSummary}
             </p>
           </div>
 
           {fillingData.documents.length > 0 && (
             <div className="space-y-2">
               <Label className="text-xs text-muted-foreground">
                 Attached Documents ({fillingData.documents.length})
               </Label>
               <div className="flex flex-wrap gap-2">
                 {fillingData.documents.map((file, index) => (
                   <div
                     key={index}
                     className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full text-sm"
                   >
                     <FileText className="h-4 w-4" />
                     {file.name}
                   </div>
                 ))}
               </div>
             </div>
           )}
         </div>
 
         {/* Navigation Buttons */}
         <div className="flex justify-between pt-4">
           <Button variant="outline" onClick={handleBack}>
             Back
           </Button>
           <Button
             onClick={handleSubmit}
             className="bg-primary hover:bg-primary/90 text-primary-foreground"
           >
             Submit Request
             <Check className="ml-2 h-4 w-4" />
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 
   const renderStep = () => {
     switch (currentStep) {
       case 0:
         return renderRequestDetails();
       case 1:
         return renderRequestDocuments();
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
             <span className="hover:text-foreground cursor-pointer">Cases</span>
             <span className="mx-2">/</span>
             <span className="hover:text-foreground cursor-pointer">Case Summary</span>
             <span className="mx-2">/</span>
             <span className="text-foreground font-medium">Request</span>
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
                     key={step}
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
                       {currentStep > index ? (
                         <Check className="h-4 w-4" />
                       ) : (
                         index + 1
                       )}
                     </div>
                     <span
                       className={cn(
                         "text-sm font-medium",
                         currentStep === index && "text-primary"
                       )}
                     >
                       {step}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
 
           {/* Main Content */}
           <div className="col-span-9">{renderStep()}</div>
         </div>
       </div>
     </div>
   );
 }