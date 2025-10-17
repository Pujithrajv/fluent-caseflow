import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Upload, Trash2, CheckCircle, Circle, AlertCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type WorkflowStep = 
  | "discovery-info"
  | "sub-processes"
  | "interrogatory"
  | "document-production"
  | "deposition"
  | "inspection"
  | "document-upload"
  | "review-submit"
  | "thank-you"
  | "certificate";

interface SubProcess {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  configured: boolean;
}

export default function DiscoveryWorkflow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("discovery-info");
  const [subProcesses, setSubProcesses] = useState<SubProcess[]>([
    { id: "interrogatory", title: "Interrogatories", description: "Requires Attention", status: "pending", configured: false },
    { id: "document-production", title: "Document Production", description: "Requires Attention", status: "pending", configured: false },
    { id: "deposition", title: "Deposition", description: "Requires Attention", status: "pending", configured: false },
    { id: "inspection", title: "Inspection", description: "Requires Attention", status: "pending", configured: false },
  ]);

  // Interrogatory state
  const [recipients, setRecipients] = useState<Array<{ id: number; name: string; phone: string; email: string }>>([]);
  const [isExpertToggled, setIsExpertToggled] = useState(false);
  const [inspectionEntries, setInspectionEntries] = useState<Array<{ id: number; what: string; purpose: string }>>([{ id: 1, what: "", purpose: "" }]);
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ id: number; name: string; type: string; visibility: string; status: string; flagged: boolean }>>([]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleConfigureProcess = (processId: string) => {
    setSubProcesses(prev => 
      prev.map(p => p.id === processId ? { ...p, configured: true, status: "completed" as const, description: "Completed" } : p)
    );
    
    if (processId === "interrogatory") setCurrentStep("interrogatory");
    else if (processId === "document-production") setCurrentStep("document-production");
    else if (processId === "deposition") setCurrentStep("deposition");
    else if (processId === "inspection") setCurrentStep("inspection");
  };

  const addRecipient = () => {
    setRecipients([...recipients, { id: Date.now(), name: "", phone: "", email: "" }]);
  };

  const deleteRecipient = (id: number) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const addInspectionEntry = () => {
    setInspectionEntries([...inspectionEntries, { id: Date.now(), what: "", purpose: "" }]);
  };

  const renderDiscoveryInfo = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Discovery Information</h1>
        <p className="text-muted-foreground mt-2">Complete the discovery information form for this case</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discovery Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Set Discovery Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Schedule</SelectItem>
                    <SelectItem value="expedited">Expedited Schedule</SelectItem>
                    <SelectItem value="extended">Extended Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type of Discovery Allowed</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="interrogatories" />
                    <label htmlFor="interrogatories" className="text-sm">Interrogatories</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="document-production" />
                    <label htmlFor="document-production" className="text-sm">Document Production</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="deposition" />
                    <label htmlFor="deposition" className="text-sm">Deposition</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inspection" />
                    <label htmlFor="inspection" className="text-sm">Inspection</label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discovery Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Discovery Cutoff Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Follow-Up Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Discovery Conference Date (Optional)</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Case ID</Label>
                <Input value="CASE-2024-001" disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Process Stage</Label>
                <Input value="Pre-Hearing" disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Related Motion</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select related motion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motion-1">Motion to Compel</SelectItem>
                    <SelectItem value="motion-2">Motion for Summary Judgment</SelectItem>
                    <SelectItem value="motion-3">Motion to Dismiss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="visible-opposing">Visible to Opposing Party?</Label>
                <Switch id="visible-opposing" />
              </div>

              <div className="space-y-2">
                <Label>Discovery Summary</Label>
                <Textarea rows={4} placeholder="Enter discovery summary..." />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Discovery Process Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">What is Discovery?</h4>
                <p className="text-muted-foreground">
                  Discovery is the pre-trial phase where parties exchange information and evidence relevant to the case.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Types of Discovery</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Interrogatories: Written questions</li>
                  <li>Document Production: Document requests</li>
                  <li>Depositions: Oral testimony</li>
                  <li>Inspections: Physical examinations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Important Dates</h4>
                <p className="text-muted-foreground">
                  Ensure all discovery deadlines are met to avoid sanctions or delays in your case.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
        <Button onClick={() => setCurrentStep("sub-processes")}>Continue to Sub-Processes</Button>
      </div>
    </div>
  );

  const renderSubProcesses = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("discovery-info")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery Information
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Discovery Sub-Processes</h1>
        <p className="text-muted-foreground mt-2">Configure the sub-processes for this discovery request</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subProcesses.map((process) => (
          <Card 
            key={process.id} 
            className={`transition-colors ${process.configured ? "bg-green-50 border-green-200" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {process.status === "completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <span>{process.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {process.id === "interrogatory" && "Written questions that require written responses under oath"}
                {process.id === "document-production" && "Formal request for documents and records"}
                {process.id === "deposition" && "Oral testimony taken under oath before trial"}
                {process.id === "inspection" && "Physical examination of property, documents, or things"}
              </p>
              <Button 
                variant={process.configured ? "outline" : "default"}
                className="w-full"
                onClick={() => handleConfigureProcess(process.id)}
              >
                {process.configured ? "Reconfigure" : "Configure"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("discovery-info")}>Back</Button>
        <Button onClick={() => setCurrentStep("document-upload")}>Continue to Documents</Button>
      </div>
    </div>
  );

  const renderInterrogatory = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("sub-processes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery Information
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Interrogatory Details</h1>
        <p className="text-muted-foreground mt-2">Enter recipient information and interrogatory details</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recipients</CardTitle>
            <Button size="sm" onClick={addRecipient}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Person
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No recipients added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  recipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>
                        <Input placeholder="Enter name" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Enter phone" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Enter email" type="email" />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRecipient(recipient.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <Label>When will they receive?</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>When is reply due?</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Interrogatory Set Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="share-opposing" />
              <label htmlFor="share-opposing" className="text-sm">Share with Opposing Party</label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("sub-processes")}>Back</Button>
        <Button onClick={() => setCurrentStep("sub-processes")}>Save & Return</Button>
      </div>
    </div>
  );

  const renderDocumentProduction = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("sub-processes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery Information
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Document Production Details</h1>
        <p className="text-muted-foreground mt-2">Enter recipient information and document production details</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recipients</CardTitle>
            <Button size="sm" onClick={addRecipient}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Person
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No recipients added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  recipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>
                        <Input placeholder="Enter name" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Enter phone" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Enter email" type="email" />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRecipient(recipient.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <Label>When will they receive?</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>When is production due?</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Document Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="privileged">Privileged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="flag-alj" />
              <label htmlFor="flag-alj" className="text-sm">Flag for ALJ Review</label>
            </div>

            <div className="space-y-2">
              <Label>Supporting Files</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload supporting documents</p>
                <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("sub-processes")}>Back</Button>
        <Button onClick={() => setCurrentStep("sub-processes")}>Save & Return</Button>
      </div>
    </div>
  );

  const renderDeposition = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("sub-processes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery Information
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Deposition Details</h1>
        <p className="text-muted-foreground mt-2">Configure deposition information and expert details</p>
      </div>

      <Collapsible>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-left">Expert Section</CardTitle>
              <ChevronDown className="h-5 w-5" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="expert-toggle">Is there an Expert?</Label>
                <Switch id="expert-toggle" checked={isExpertToggled} onCheckedChange={setIsExpertToggled} />
              </div>

              {isExpertToggled && (
                <div className="space-y-4 pt-4 border-t animate-fade-in">
                  <div className="space-y-2">
                    <Label>Expert Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expert" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expert-1">Dr. John Smith</SelectItem>
                        <SelectItem value="expert-2">Dr. Jane Doe</SelectItem>
                        <SelectItem value="expert-3">Prof. Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Area of Expertise</Label>
                    <Input placeholder="Enter area of expertise" />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Expert CV</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Upload CV file</p>
                      <Button variant="outline" size="sm" className="mt-2">Browse</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible defaultOpen>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-left">Deposition Information</CardTitle>
              <ChevronDown className="h-5 w-5" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Why is the deposition necessary?</Label>
                <Textarea rows={4} placeholder="Explain the necessity of the deposition..." />
              </div>

              <div className="space-y-2">
                <Label>If deposition allowed, date range for completion</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("sub-processes")}>Back</Button>
        <Button onClick={() => setCurrentStep("sub-processes")}>Save & Return</Button>
      </div>
    </div>
  );

  const renderInspection = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("sub-processes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discovery Information
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Inspection Questions</h1>
        <p className="text-muted-foreground mt-2">Define what needs to be inspected and why</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inspection Entries</CardTitle>
            <Button size="sm" onClick={addInspectionEntry}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Inspection
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {inspectionEntries.map((entry, index) => (
            <div key={entry.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Inspection {index + 1}</h4>
                {inspectionEntries.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setInspectionEntries(inspectionEntries.filter(e => e.id !== entry.id))}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>What is to be inspected?</Label>
                <Textarea rows={3} placeholder="Describe what needs to be inspected..." />
              </div>

              <div className="space-y-2">
                <Label>What is the purpose of the inspection?</Label>
                <Textarea rows={3} placeholder="Explain the purpose..." />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("sub-processes")}>Back</Button>
        <Button onClick={() => setCurrentStep("sub-processes")}>Save & Return</Button>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("sub-processes")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sub-Processes
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Document Upload</h1>
        <p className="text-muted-foreground mt-2">Upload supporting documents for this discovery request</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center bg-muted/20">
            <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Flag for ALJ Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedDocs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No documents uploaded yet
                    </TableCell>
                  </TableRow>
                ) : (
                  uploadedDocs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center gap-2">
                        {doc.flagged && <AlertCircle className="h-4 w-4 text-amber-600" />}
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.visibility}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Checkbox checked={doc.flagged} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("sub-processes")}>Back</Button>
        <Button onClick={() => setCurrentStep("review-submit")}>Continue to Review</Button>
      </div>
    </div>
  );

  const renderReviewSubmit = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("document-upload")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Document Upload
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Review & Submit</h1>
        <p className="text-muted-foreground mt-2">Review all information before submitting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Request Group</Label>
            <p className="font-medium">Discovery</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Request Type</Label>
            <p className="font-medium">General Discovery</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Reference Number</Label>
            <p className="font-medium">DISC-2024-001</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Submission Date</Label>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discovery Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Type</Label>
            <p className="font-medium">Standard Discovery Schedule</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Description</Label>
            <p className="font-medium">Comprehensive discovery request for case CASE-2024-001</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">Start Date</Label>
              <p className="font-medium">01/15/2024</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Cutoff Date</Label>
              <p className="font-medium">04/15/2024</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Follow-Up</Label>
              <p className="font-medium">05/01/2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Collapsible open={accordionOpen} onOpenChange={setAccordionOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle>Discovery Sub-Process Summary</CardTitle>
              {accordionOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-3">
                {subProcesses.map((process) => (
                  <div key={process.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {process.configured ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-medium">{process.title}</span>
                    </div>
                    <Badge variant={process.configured ? "default" : "outline"}>
                      {process.configured ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedDocs.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No documents uploaded</p>
          ) : (
            <div className="space-y-2">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
                  <Badge>{doc.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("document-upload")}>Back</Button>
        <Button onClick={() => setCurrentStep("thank-you")}>Submit Discovery Request</Button>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="max-w-2xl mx-auto space-y-6 py-12">
      <div className="text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">Discovery Request Submitted Successfully</h1>
        <p className="text-muted-foreground">
          The system has generated a Notice of Discovery Filing and sent notifications to all participants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Reference ID</Label>
              <p className="font-medium">DISC-2024-001</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Submission Date</Label>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <Button variant="link" className="p-0 h-auto">
              View in Case Portal →
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Button onClick={() => setCurrentStep("certificate")}>
          Create Certificate of Compliance
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  const renderCertificate = () => (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={() => setCurrentStep("thank-you")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Certificate of Compliance</h1>
        <p className="text-muted-foreground mt-2">Certify that discovery requirements have been completed</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Submission Type</Label>
            <Input value="Certificate of Compliance" disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Summary of what was done</Label>
            <Textarea 
              rows={5} 
              placeholder="Provide a detailed summary of all discovery activities completed..."
            />
          </div>

          <div className="space-y-2">
            <Label>Who it went to</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select contacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="party-1">Opposing Counsel</SelectItem>
                <SelectItem value="party-2">Administrative Law Judge</SelectItem>
                <SelectItem value="party-3">All Parties</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Completed</Label>
            <Input type="date" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Automated Notice Generation</h4>
              <p className="text-sm text-green-800 mt-1">
                Upon submission, the system will automatically generate a Notice of Compliance, 
                upload it to SharePoint, and notify all relevant participants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("thank-you")}>Cancel</Button>
        <Button onClick={() => {
          // Show success message
          alert("Notice of Compliance Generated Successfully");
          navigate("/dashboard");
        }}>
          Submit Certificate
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {currentStep === "discovery-info" && renderDiscoveryInfo()}
        {currentStep === "sub-processes" && renderSubProcesses()}
        {currentStep === "interrogatory" && renderInterrogatory()}
        {currentStep === "document-production" && renderDocumentProduction()}
        {currentStep === "deposition" && renderDeposition()}
        {currentStep === "inspection" && renderInspection()}
        {currentStep === "document-upload" && renderDocumentUpload()}
        {currentStep === "review-submit" && renderReviewSubmit()}
        {currentStep === "thank-you" && renderThankYou()}
        {currentStep === "certificate" && renderCertificate()}
      </div>
    </div>
  );
}
