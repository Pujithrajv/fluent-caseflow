import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Trash2, Plus, Upload, CheckCircle2, AlertCircle, Edit } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Screen = 
  | "discovery-info"
  | "subprocess-dashboard"
  | "interrogatory"
  | "document-production"
  | "deposition"
  | "inspection"
  | "document-upload"
  | "review-submit"
  | "thank-you"
  | "certificate";

const DiscoveryWorkflow = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<Screen>("discovery-info");
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  
  // Discovery Information State
  const [discoverySchedule, setDiscoverySchedule] = useState("");
  const [discoveryTypes, setDiscoveryTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [cutoffDate, setCutoffDate] = useState<Date>();
  const [followUpDate, setFollowUpDate] = useState<Date>();
  const [conferenceDate, setConferenceDate] = useState<Date>();
  const [visibleToOpposing, setVisibleToOpposing] = useState(false);
  const [discoverySummary, setDiscoverySummary] = useState("");

  // Subprocess completion status
  const [processStatus, setProcessStatus] = useState<Record<string, boolean>>({
    interrogatories: false,
    "document-production": false,
    deposition: false,
    inspection: false
  });

  // Recipients data
  const [recipients, setRecipients] = useState<Array<{id: string, name: string, phone: string, email: string}>>([]);

  const handleBack = () => {
    if (currentScreen === "discovery-info") {
      navigate(`/case/${caseId}`);
    } else if (currentScreen === "subprocess-dashboard") {
      setCurrentScreen("discovery-info");
    } else {
      setCurrentScreen("subprocess-dashboard");
    }
  };

  const toggleDiscoveryType = (type: string) => {
    setDiscoveryTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleConfigureProcess = (processType: string) => {
    switch(processType) {
      case "interrogatories":
        setCurrentScreen("interrogatory");
        break;
      case "document-production":
        setCurrentScreen("document-production");
        break;
      case "deposition":
        setCurrentScreen("deposition");
        break;
      case "inspection":
        setCurrentScreen("inspection");
        break;
    }
  };

  const markProcessComplete = (processType: string) => {
    setProcessStatus(prev => ({ ...prev, [processType]: true }));
    setCurrentScreen("subprocess-dashboard");
  };

  const addRecipient = () => {
    setRecipients([...recipients, { id: Date.now().toString(), name: "", phone: "", email: "" }]);
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case "discovery-info":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discovery Information</CardTitle>
                <CardDescription>Configure the discovery process for this case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Set Discovery Schedule</Label>
                    <Select value={discoverySchedule} onValueChange={setDiscoverySchedule}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Schedule</SelectItem>
                        <SelectItem value="expedited">Expedited Schedule</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Case ID</Label>
                    <Input value={caseId} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Discovery Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Discovery Cutoff Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !cutoffDate && "text-muted-foreground")}>
                          {cutoffDate ? format(cutoffDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={cutoffDate} onSelect={setCutoffDate} initialFocus className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Follow-Up Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !followUpDate && "text-muted-foreground")}>
                          {followUpDate ? format(followUpDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={followUpDate} onSelect={setFollowUpDate} initialFocus className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Discovery Conference Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !conferenceDate && "text-muted-foreground")}>
                          {conferenceDate ? format(conferenceDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={conferenceDate} onSelect={setConferenceDate} initialFocus className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Type of Discovery Allowed</Label>
                  <div className="space-y-2">
                    {["Interrogatories", "Document Production", "Deposition", "Inspection"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={discoveryTypes.includes(type.toLowerCase())}
                          onCheckedChange={() => toggleDiscoveryType(type.toLowerCase())}
                        />
                        <label className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch checked={visibleToOpposing} onCheckedChange={setVisibleToOpposing} />
                  <Label>Visible to Opposing Party?</Label>
                </div>

                <div className="space-y-2">
                  <Label>Discovery Summary</Label>
                  <Textarea 
                    placeholder="Enter a summary of the discovery process..."
                    value={discoverySummary}
                    onChange={(e) => setDiscoverySummary(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button onClick={() => setCurrentScreen("subprocess-dashboard")} size="lg">
                  Continue to Sub-Processes
                </Button>
              </CardContent>
            </Card>

            {/* Info Panel */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">About Discovery Process</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800 space-y-2">
                <p>Discovery is the pre-trial phase where parties exchange information relevant to the case.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Interrogatories: Written questions requiring written answers under oath</li>
                  <li>Document Production: Requests for relevant documents and records</li>
                  <li>Depositions: Oral testimony taken under oath</li>
                  <li>Inspections: Physical examination of property or evidence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case "subprocess-dashboard":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discovery Sub-Processes</CardTitle>
                <CardDescription>Configure each discovery process type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "interrogatories", title: "Interrogatories", description: processStatus.interrogatories ? "Completed" : "Requires Attention" },
                    { id: "document-production", title: "Document Production", description: processStatus["document-production"] ? "Completed" : "Requires Attention" },
                    { id: "deposition", title: "Deposition", description: processStatus.deposition ? "Completed" : "Requires Attention" },
                    { id: "inspection", title: "Inspection", description: processStatus.inspection ? "Completed" : "Requires Attention" }
                  ].map((process) => (
                    <Card key={process.id} className={cn("relative", processStatus[process.id] && "bg-green-50 border-green-200")}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-3 h-3 rounded-full", processStatus[process.id] ? "bg-green-500" : "bg-gray-300")} />
                            <CardTitle className="text-lg">{process.title}</CardTitle>
                          </div>
                          {processStatus[process.id] && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        </div>
                        <CardDescription>{process.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant={processStatus[process.id] ? "outline" : "default"}
                          onClick={() => handleConfigureProcess(process.id)}
                          className="w-full"
                        >
                          {processStatus[process.id] ? "Edit" : "Configure"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={() => setCurrentScreen("document-upload")} size="lg">
                    Continue to Document Upload
                  </Button>
                  <Button onClick={() => setCurrentScreen("review-submit")} variant="outline" size="lg">
                    Skip to Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "interrogatory":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Interrogatory Details</CardTitle>
              <CardDescription>Enter recipient information and interrogatory details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label>Recipients</Label>
                  <Button onClick={addRecipient} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Person
                  </Button>
                </div>
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
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>
                          <Input placeholder="Name" className="min-w-[150px]" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Phone" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Email" />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => removeRecipient(recipient.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>When will they receive?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        Pick a date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>When is reply due?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        Pick a date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

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
                <Checkbox />
                <label className="text-sm">Share with Opposing Party</label>
              </div>

              <Button onClick={() => markProcessComplete("interrogatories")} size="lg">
                Save & Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        );

      case "document-production":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Document Production Details</CardTitle>
              <CardDescription>Configure document production requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label>Recipients</Label>
                  <Button onClick={addRecipient} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Person
                  </Button>
                </div>
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
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>
                          <Input placeholder="Name" className="min-w-[150px]" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Phone" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Email" />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => removeRecipient(recipient.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>When will they receive?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        Pick a date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>When is production due?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        Pick a date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

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
                <Checkbox />
                <label className="text-sm">Flag for ALJ Review</label>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload supporting files</p>
                <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
              </div>

              <Button onClick={() => markProcessComplete("document-production")} size="lg">
                Save & Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        );

      case "deposition":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Deposition Details</CardTitle>
              <CardDescription>Configure deposition requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="expert">
                  <AccordionTrigger>Expert Section</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Is there an Expert?</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Expert Name</Label>
                      <Input placeholder="Search for expert..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Area of Expertise</Label>
                      <Input placeholder="Enter area of expertise" />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Expert CV</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                        <Button variant="outline" size="sm">Browse Files</Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deposition-info">
                  <AccordionTrigger>Deposition Information</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Why is the deposition necessary?</Label>
                      <Textarea placeholder="Explain the necessity..." rows={4} />
                    </div>

                    <div className="space-y-2">
                      <Label>If deposition allowed, date range for completion</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              Start date
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus className="pointer-events-auto" />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              End date
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus className="pointer-events-auto" />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button onClick={() => markProcessComplete("deposition")} size="lg">
                Save & Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        );

      case "inspection":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Inspection Questions</CardTitle>
              <CardDescription>Provide inspection details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>What is to be inspected?</Label>
                <Textarea placeholder="Describe what needs to be inspected..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label>What is the purpose of the inspection?</Label>
                <Textarea placeholder="Explain the purpose..." rows={4} />
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add New Inspection
              </Button>

              <Button onClick={() => markProcessComplete("inspection")} size="lg">
                Save & Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        );

      case "document-upload":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>Upload all relevant discovery documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-gray-50">
                <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                <p className="text-sm text-muted-foreground mb-4">or</p>
                <Button>Browse Files</Button>
              </div>

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
                  <TableRow>
                    <TableCell className="font-medium">Sample Document.pdf</TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>
                      <Badge variant="outline">Public</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Uploaded</Badge>
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button onClick={() => setCurrentScreen("review-submit")} size="lg">
                Continue to Review
              </Button>
            </CardContent>
          </Card>
        );

      case "review-submit":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Review all discovery information before submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    Request Information
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Request Group</p>
                      <p className="font-medium">Discovery Request</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Request Type</p>
                      <p className="font-medium">Comprehensive Discovery</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reference Number</p>
                      <p className="font-medium">{caseId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Submission Date</p>
                      <p className="font-medium">{format(new Date(), "PPP")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    Discovery Details
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{discoveryTypes.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Description</p>
                      <p className="font-medium">{discoverySummary || "No description provided"}</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="subprocess">
                    <AccordionTrigger>Discovery Sub-Process Summary</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {Object.entries(processStatus).map(([key, completed]) => (
                          <div key={key} className="flex items-center justify-between p-3 border rounded">
                            <span className="capitalize">{key.replace("-", " ")}</span>
                            {completed ? (
                              <Badge className="bg-green-500">Completed</Badge>
                            ) : (
                              <Badge variant="outline">Not Configured</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Uploaded Documents</h3>
                  <p className="text-sm text-muted-foreground">0 documents uploaded</p>
                </div>

                <Button onClick={() => setCurrentScreen("thank-you")} size="lg" className="w-full">
                  Submit Discovery Request
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "thank-you":
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-6 py-12">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Discovery Request Submitted Successfully</h2>
                  <p className="text-muted-foreground">
                    The system has generated a Notice of Discovery Filing and sent notifications to all participants.
                  </p>
                </div>

                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6 space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Reference ID</p>
                      <p className="font-medium">{caseId}-DISC-001</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submission Date</p>
                      <p className="font-medium">{format(new Date(), "PPP")}</p>
                    </div>
                    <Button variant="link" onClick={() => navigate(`/case/${caseId}`)}>
                      View in Case Portal →
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setCurrentScreen("certificate")} variant="outline">
                    File Certificate of Compliance
                  </Button>
                  <Button onClick={() => navigate(`/case/${caseId}`)}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "certificate":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Certificate of Compliance</CardTitle>
              <CardDescription>Document discovery completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Submission Type</Label>
                <Input value="Certificate of Compliance" disabled />
              </div>

              <div className="space-y-2">
                <Label>Summary of what was done</Label>
                <Textarea placeholder="Describe the completed discovery activities..." rows={6} />
              </div>

              <div className="space-y-2">
                <Label>Who it went to</Label>
                <Input placeholder="Select contacts..." />
              </div>

              <div className="space-y-2">
                <Label>Date Completed</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      Pick a date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <p className="font-medium text-green-900">Notice of Compliance Generated Successfully</p>
                <p className="text-sm text-green-700 mt-1">Document uploaded to SharePoint and participants notified</p>
              </div>

              <Button onClick={() => navigate(`/case/${caseId}`)} size="lg" className="w-full">
                Return to Case
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {renderScreen()}
      </div>
    </div>
  );
};

export default DiscoveryWorkflow;
