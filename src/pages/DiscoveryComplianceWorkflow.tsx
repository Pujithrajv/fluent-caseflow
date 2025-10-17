import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, FileText, CheckCircle, Upload, Calendar, Clock, User, AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";

type Step = 
  | "dashboard"
  | "select-type"
  | "details"
  | "upload"
  | "confirm"
  | "submitted"
  | "certificate-form"
  | "certificate-submitted";

export default function DiscoveryComplianceWorkflow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("dashboard");
  const [selectedDiscoveryType, setSelectedDiscoveryType] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [referenceNumber, setReferenceNumber] = useState("");

  const discoveryTypes = [
    {
      id: "interrogatories",
      title: "Interrogatories",
      description: "Written questions requiring answers under oath"
    },
    {
      id: "document-production",
      title: "Document Production",
      description: "Request for production of documents or things"
    },
    {
      id: "deposition",
      title: "Deposition Notice",
      description: "Notice of intent to take oral testimony under oath"
    },
    {
      id: "inspection",
      title: "Inspection Request",
      description: "Request to inspect premises, property, or items"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        status: "Uploaded"
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleSubmitRequest = () => {
    const refNum = `DISC-2025-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    setReferenceNumber(refNum);
    setCurrentStep("submitted");
  };

  const handleSubmitCertificate = () => {
    const refNum = `COMP-2025-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    setReferenceNumber(refNum);
    setCurrentStep("certificate-submitted");
  };

  // Dashboard Screen
  if (currentStep === "dashboard") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/portal")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Case Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Case: ABC-2025-001 – Smith v. Department of Natural Resources
            </h1>
            
            {/* Discovery Order Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Discovery Order Active</h3>
                  <p className="text-sm text-blue-800">
                    Discovery Period: <strong>October 15 – October 31, 2025</strong>
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    Allowed Types: Interrogatories, Document Production
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card 
              className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => setCurrentStep("select-type")}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">File Discovery Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit interrogatories, document requests, deposition notices, or inspection requests
                </p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Start Request
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => setCurrentStep("certificate-form")}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-xl">File Certificate of Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Certify that you have responded to discovery requests
                </p>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  File Certificate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Discovery Activity</h2>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Interrogatories Submitted</p>
                        <p className="text-sm text-muted-foreground">DISC-2025-00038</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      October 20, 2025
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Certificate of Compliance Filed</p>
                        <p className="text-sm text-muted-foreground">COMP-2025-00015</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      October 18, 2025
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Select Type Screen
  if (currentStep === "select-type") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep("dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">File Discovery Request</h1>
              <p className="text-muted-foreground">Select the type of discovery you want to file</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Select Type", active: true },
                { num: 2, label: "Details", active: false },
                { num: 3, label: "Upload", active: false },
                { num: 4, label: "Confirm", active: false }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      {step.num}
                    </div>
                    <span className={`text-sm mt-2 ${step.active ? "text-blue-600 font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`h-1 flex-1 mx-2 ${step.active ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Discovery Type Selection */}
            <RadioGroup value={selectedDiscoveryType} onValueChange={setSelectedDiscoveryType}>
              <div className="grid gap-4">
                {discoveryTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      selectedDiscoveryType === type.id
                        ? "border-2 border-blue-500 bg-blue-50"
                        : "border-2 border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedDiscoveryType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={type.id} className="text-lg font-semibold cursor-pointer">
                            {type.title}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>

            {/* Actions */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep("dashboard")}>
                Cancel
              </Button>
              <Button 
                onClick={() => setCurrentStep("upload")}
                disabled={!selectedDiscoveryType}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Upload Screen
  if (currentStep === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep("select-type")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Interrogatories</h1>
              <p className="text-muted-foreground">Upload your discovery documents</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Select Type", complete: true },
                { num: 2, label: "Details", complete: true },
                { num: 3, label: "Upload", active: true },
                { num: 4, label: "Confirm", active: false }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step.complete ? "bg-green-500 text-white" :
                      step.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      {step.complete ? <Check className="h-5 w-5" /> : step.num}
                    </div>
                    <span className={`text-sm mt-2 ${
                      step.complete || step.active ? "text-blue-600 font-medium" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      step.complete ? "bg-green-500" : step.active ? "bg-blue-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <Card>
              <CardContent className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <label htmlFor="file-upload">
                    <Button variant="outline" asChild>
                      <span>Browse Files</span>
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                </div>

                {/* Uploaded Files Table */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Uploaded Files</h3>
                  {uploadedFiles.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No files uploaded yet
                    </p>
                  ) : (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">File Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Size</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {uploadedFiles.map((file, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm">{file.name}</td>
                              <td className="px-4 py-2 text-sm">{file.size}</td>
                              <td className="px-4 py-2 text-sm">
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  {file.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep("select-type")}>
                Back
              </Button>
              <Button 
                onClick={handleSubmitRequest}
                disabled={uploadedFiles.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Submitted Confirmation Screen
  if (currentStep === "submitted") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discovery Request Submitted
              </h1>
              <p className="text-lg text-muted-foreground">
                Your interrogatories have been filed successfully.
              </p>
            </div>

            {/* Summary Card */}
            <Card className="text-left">
              <CardHeader>
                <CardTitle>Request Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reference Number</p>
                    <p className="font-semibold">{referenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submission Date</p>
                    <p className="font-semibold">October 25, 2025, 2:45 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold">Interrogatories</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-semibold">Katie Johnson</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <strong>Notice of Discovery Filing</strong> has been generated and sent to all case participants.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button 
                onClick={() => setCurrentStep("dashboard")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Return to Discovery
              </Button>
              <Button variant="outline">
                View Case Docket
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Certificate of Compliance Form
  if (currentStep === "certificate-form") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep("dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Certificate of Compliance
              </h1>
              <p className="text-muted-foreground">
                Certify that you have responded to discovery requests
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="compliance-type">I am certifying compliance with</Label>
                  <Select>
                    <SelectTrigger id="compliance-type">
                      <SelectValue placeholder="Select response type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interrogatories">Answers to Interrogatories</SelectItem>
                      <SelectItem value="documents">Document Production</SelectItem>
                      <SelectItem value="deposition">Deposition</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-completed">Date Completed</Label>
                  <Input type="date" id="date-completed" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sent-to">Sent To</Label>
                  <Select>
                    <SelectTrigger id="sent-to">
                      <SelectValue placeholder="Choose recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dan">Dan Schuring</SelectItem>
                      <SelectItem value="katie">Katie Johnson</SelectItem>
                      <SelectItem value="john">John Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      <strong>No Document Upload Required</strong> – This certificate confirms you have sent your response directly to the requesting party.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep("dashboard")}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitCertificate}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Certificate Submitted Confirmation
  if (currentStep === "certificate-submitted") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Certificate of Compliance Submitted
              </h1>
              <p className="text-lg text-muted-foreground">
                Your compliance has been certified successfully.
              </p>
            </div>

            {/* Summary Card */}
            <Card className="text-left">
              <CardHeader>
                <CardTitle>Certificate Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reference Number</p>
                    <p className="font-semibold">{referenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submission Date</p>
                    <p className="font-semibold">October 25, 2025, 3:15 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compliance Type</p>
                    <p className="font-semibold">Answers to Interrogatories</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sent To</p>
                    <p className="font-semibold">Dan Schuring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-900">
                  <strong>Notice of Discovery Compliance</strong> has been generated and sent to all case participants.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button 
                onClick={() => setCurrentStep("dashboard")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Return to Discovery
              </Button>
              <Button variant="outline">
                View Case Docket
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
