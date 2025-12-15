import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Save,
  FileText,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  FileUp,
  Download,
  Plus,
  User,
  Calendar,
  Edit,
  XCircle,
  RefreshCw,
  ChevronRight,
  Eye
} from "lucide-react";

// BPF Stage Component
const BPFStage = ({ 
  label, 
  isActive, 
  isCompleted,
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  isCompleted: boolean;
  onClick?: () => void;
}) => (
  <div 
    className={`flex-1 flex items-center cursor-pointer ${onClick ? 'hover:opacity-80' : ''}`}
    onClick={onClick}
  >
    <div className={`
      flex items-center justify-center w-full py-2 px-4 text-sm font-medium relative
      ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}
    `}>
      {isCompleted && <CheckCircle className="w-4 h-4 mr-2" />}
      {label}
    </div>
    <div className={`
      w-0 h-0 border-t-[20px] border-b-[20px] border-l-[12px]
      border-t-transparent border-b-transparent
      ${isActive ? 'border-l-blue-600' : isCompleted ? 'border-l-green-600' : 'border-l-gray-200'}
    `} />
  </div>
);

const RulingScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [bpfStage, setBpfStage] = useState(1);
  const [needsExtension, setNeedsExtension] = useState(false);
  const [meetsStatutory, setMeetsStatutory] = useState(true);
  const [readyForIssuance, setReadyForIssuance] = useState(false);
  const [recommendedVsFinal, setRecommendedVsFinal] = useState("");

  // Mock case data
  const caseData = {
    caseNumber: "DBE-2024-001-EC",
    caseName: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    primaryParty: "Kirby Neroni",
    assignedALJ: "Hon. Sarah Mitchell",
    backupALJ: "Hon. James Rivera",
    deputyDirector: "Dr. Patricia Williams",
    decisionDueDate: "2025-01-15",
    daysRemaining: 12,
    rulingStage: "Writing",
    statusReason: "In Progress"
  };

  const rulingDocuments = [
    { id: 1, name: "Ruling_Draft_v1.docx", type: "Word Document", version: "1.0", uploadedBy: "Hon. Sarah Mitchell", uploadedOn: "2024-12-10" },
    { id: 2, name: "Ruling_Draft_v2.docx", type: "Word Document", version: "2.0", uploadedBy: "Hon. James Rivera", uploadedOn: "2024-12-12" }
  ];

  const proofingTasks = [
    { id: 1, name: "Initial Proofreading", owner: "Hon. James Rivera", dueDate: "2024-12-18", status: "In Progress" },
    { id: 2, name: "Citation Verification", owner: "Hon. James Rivera", dueDate: "2024-12-19", status: "Pending" }
  ];

  const extensionRequests = [
    { id: 1, requestedBy: "Hon. Sarah Mitchell", requestedOn: "2024-12-05", reason: "Additional evidence review required", meetsStatutory: "Yes", decision: "Approved", decisionBy: "Dr. Patricia Williams", decisionDate: "2024-12-06" }
  ];

  const issuedDocuments = [
    { id: 1, name: "Recommended_Decision_Report.pdf", type: "System Generated", generatedOn: "2024-12-14", status: "Ready" }
  ];

  const timelineEvents = [
    { id: 1, type: "notification", text: "5-day deadline reminder sent to ALJ", date: "Dec 10, 2024 9:00 AM", icon: AlertCircle, color: "text-yellow-500" },
    { id: 2, type: "task", text: "Proofing task created for Backup ALJ", date: "Dec 11, 2024 10:30 AM", icon: FileText, color: "text-blue-500" },
    { id: 3, type: "document", text: "Draft v2 uploaded by Backup ALJ", date: "Dec 12, 2024 2:15 PM", icon: FileUp, color: "text-green-500" },
    { id: 4, type: "status", text: "Stage advanced to Proofing", date: "Dec 12, 2024 3:00 PM", icon: RefreshCw, color: "text-purple-500" },
    { id: 5, type: "notification", text: "2-day proofing deadline reminder", date: "Dec 16, 2024 9:00 AM", icon: Clock, color: "text-orange-500" }
  ];

  const bpfStages = [
    { label: "Writing", stage: 1 },
    { label: "Proofing", stage: 2 },
    { label: "ALJ Review", stage: 3 },
    { label: "Issuance", stage: 4 },
    { label: "Completed", stage: 5 }
  ];

  return (
    <div className="min-h-screen bg-[#f3f2f1] flex flex-col">
      {/* Dynamics 365 Style Header */}
      <header className="bg-[#002050] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/portal')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-px bg-white/30" />
          <span className="text-lg font-semibold">ALJ Case Management</span>
          <ChevronRight className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/80">Ruling</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium">
            SM
          </div>
        </div>
      </header>

      {/* Command Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center space-x-2 shadow-sm">
        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <FileText className="w-4 h-4 mr-2" />
          Create Ruling Report
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <Send className="w-4 h-4 mr-2" />
          Submit for Proofing
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <Clock className="w-4 h-4 mr-2" />
          Request Extension
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark Ready for Issuance
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <FileUp className="w-4 h-4 mr-2" />
          Issue Final Ruling
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-50">
          <Eye className="w-4 h-4 mr-2" />
          Mark as Recommended
        </Button>
      </div>

      {/* Business Process Flow */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center max-w-4xl">
          {bpfStages.map((stage, index) => (
            <BPFStage
              key={stage.stage}
              label={stage.label}
              isActive={bpfStage === stage.stage}
              isCompleted={bpfStage > stage.stage}
              onClick={() => setBpfStage(stage.stage)}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Record Header */}
          <div className="bg-white rounded border border-gray-200 p-4 mb-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{caseData.caseName}</h1>
                <p className="text-sm text-gray-500 mt-1">Case Number: {caseData.caseNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {caseData.rulingStage}
                </Badge>
                <Badge variant="outline" className={caseData.daysRemaining <= 5 ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}>
                  {caseData.daysRemaining} Days Remaining
                </Badge>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border border-gray-200 rounded-none p-0 h-auto">
              <TabsTrigger value="summary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3">
                Summary
              </TabsTrigger>
              <TabsTrigger value="ruling-draft" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3">
                Ruling Draft
              </TabsTrigger>
              <TabsTrigger value="proofing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3">
                Proofing
              </TabsTrigger>
              <TabsTrigger value="extensions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3">
                Extensions & Compliance
              </TabsTrigger>
              <TabsTrigger value="issuance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3">
                Issuance / Recommendation
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-0 bg-white border border-t-0 border-gray-200 p-6">
              <div className="grid grid-cols-2 gap-8">

                {/* Assignments */}
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="bg-gray-50 py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500">Assigned ALJ</Label>
                        <div className="flex items-center mt-1 p-2 bg-gray-50 rounded border">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{caseData.assignedALJ}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Backup ALJ</Label>
                        <div className="flex items-center mt-1 p-2 bg-gray-50 rounded border">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{caseData.backupALJ}</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs text-gray-500">Deputy Director / Bureau Chief</Label>
                        <div className="flex items-center mt-1 p-2 bg-gray-50 rounded border">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{caseData.deputyDirector}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deadlines */}
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="bg-gray-50 py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500">Decision Due Date</Label>
                        <div className="flex items-center mt-1 p-2 bg-gray-50 rounded border">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{caseData.decisionDueDate}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Days Remaining</Label>
                        <div className={`flex items-center mt-1 p-2 rounded border ${caseData.daysRemaining <= 5 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                          <Clock className={`w-4 h-4 mr-2 ${caseData.daysRemaining <= 5 ? 'text-red-500' : 'text-green-500'}`} />
                          <span className={`text-sm font-medium ${caseData.daysRemaining <= 5 ? 'text-red-700' : 'text-green-700'}`}>{caseData.daysRemaining} days</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Ruling Stage</Label>
                        <Select defaultValue={caseData.rulingStage}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Writing">Writing</SelectItem>
                            <SelectItem value="Proofing">Proofing</SelectItem>
                            <SelectItem value="ALJ Review">ALJ Review</SelectItem>
                            <SelectItem value="Issuance">Issuance</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Status Reason</Label>
                        <Select defaultValue={caseData.statusReason}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Pending Review">Pending Review</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* Ruling Draft Tab */}
            <TabsContent value="ruling-draft" className="mt-0 bg-white border border-t-0 border-gray-200 p-6">
              <Card className="border border-gray-200 shadow-none">
                <CardHeader className="bg-gray-50 py-3 px-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-700">Ruling Documents</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs">Document Name</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Version</TableHead>
                        <TableHead className="text-xs">Uploaded By</TableHead>
                        <TableHead className="text-xs">Uploaded On</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rulingDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="text-sm font-medium text-blue-600">{doc.name}</TableCell>
                          <TableCell className="text-sm">{doc.type}</TableCell>
                          <TableCell className="text-sm">{doc.version}</TableCell>
                          <TableCell className="text-sm">{doc.uploadedBy}</TableCell>
                          <TableCell className="text-sm">{doc.uploadedOn}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Proofing Tab */}
            <TabsContent value="proofing" className="mt-0 bg-white border border-t-0 border-gray-200 p-6">
              <Card className="border border-gray-200 shadow-none mb-6">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Proofing Status</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Proofing Due Date</Label>
                      <Input value="Dec 18, 2024" readOnly className="mt-1 bg-gray-50" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Proofing Status</Label>
                      <Select defaultValue="in-progress">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Proofing Completed
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-none">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Proofing Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs">Task Name</TableHead>
                        <TableHead className="text-xs">Owner (Backup ALJ)</TableHead>
                        <TableHead className="text-xs">Due Date</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proofingTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="text-sm font-medium text-blue-600">{task.name}</TableCell>
                          <TableCell className="text-sm">{task.owner}</TableCell>
                          <TableCell className="text-sm">{task.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              task.status === "In Progress" ? "bg-blue-50 text-blue-700" :
                              task.status === "Completed" ? "bg-green-50 text-green-700" :
                              "bg-gray-50 text-gray-700"
                            }>
                              {task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Extensions & Compliance Tab */}
            <TabsContent value="extensions" className="mt-0 bg-white border border-t-0 border-gray-200 p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="bg-gray-50 py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Extension Request Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Needs Extension?</Label>
                      <Switch checked={needsExtension} onCheckedChange={setNeedsExtension} />
                    </div>
                    {needsExtension && (
                      <div>
                        <Label className="text-xs text-gray-500">Extension Justification</Label>
                        <Textarea 
                          className="mt-1" 
                          placeholder="Provide justification for extension request..."
                          rows={4}
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-xs text-gray-500">New Ruling Due Date</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="bg-gray-50 py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Statutory Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Meets Statutory Requirements?</Label>
                      <Switch checked={meetsStatutory} onCheckedChange={setMeetsStatutory} />
                    </div>
                    {!meetsStatutory && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex items-center text-yellow-700">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Escalation Required</span>
                        </div>
                        <p className="text-xs text-yellow-600 mt-1">This case requires Deputy Director override for deadline modification.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-gray-200 shadow-none mb-6">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Extension Requests History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs">Requested By</TableHead>
                        <TableHead className="text-xs">Requested On</TableHead>
                        <TableHead className="text-xs">Reason</TableHead>
                        <TableHead className="text-xs">Meets Statutory</TableHead>
                        <TableHead className="text-xs">Decision</TableHead>
                        <TableHead className="text-xs">Decision By</TableHead>
                        <TableHead className="text-xs">Decision Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {extensionRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="text-sm">{req.requestedBy}</TableCell>
                          <TableCell className="text-sm">{req.requestedOn}</TableCell>
                          <TableCell className="text-sm">{req.reason}</TableCell>
                          <TableCell className="text-sm">{req.meetsStatutory}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">{req.decision}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{req.decisionBy}</TableCell>
                          <TableCell className="text-sm">{req.decisionDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-none">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Director Override</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Modify Ruling Deadline</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Reason</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select reason..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="complexity">Case Complexity</SelectItem>
                          <SelectItem value="evidence">Additional Evidence Required</SelectItem>
                          <SelectItem value="parties">Party Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Additional Notes</Label>
                      <Input className="mt-1" placeholder="Optional notes..." />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Apply Override
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Issuance Tab */}
            <TabsContent value="issuance" className="mt-0 bg-white border border-t-0 border-gray-200 p-6">
              <Card className="border border-gray-200 shadow-none mb-6">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Issuance Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <Label className="text-sm">Ready for Issuance</Label>
                      <Switch checked={readyForIssuance} onCheckedChange={setReadyForIssuance} />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Recommended vs Final</Label>
                      <Select value={recommendedVsFinal} onValueChange={setRecommendedVsFinal}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommended">Recommended Decision</SelectItem>
                          <SelectItem value="final">Final Ruling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end space-x-2">
                      {recommendedVsFinal === "recommended" && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Recommended Docs
                        </Button>
                      )}
                      {recommendedVsFinal === "final" && (
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Final Ruling
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-none">
                <CardHeader className="bg-gray-50 py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-700">Issued Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs">Document Name</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Generated On</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issuedDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="text-sm font-medium text-blue-600">{doc.name}</TableCell>
                          <TableCell className="text-sm">{doc.type}</TableCell>
                          <TableCell className="text-sm">{doc.generatedOn}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">{doc.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default RulingScreen;
