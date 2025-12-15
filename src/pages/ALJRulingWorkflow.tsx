import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Clock, FileText, CheckCircle, XCircle, Upload, Calendar, User, AlertCircle, Edit3, Eye, Send, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ALJRulingWorkflow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("writing");
  
  // Case data
  const [caseData] = useState({
    caseId: "CASE-2024-00847",
    caseName: "Sub-Contract Dispute - ABC Corp v. State",
    caseType: "Sub-Contract Dispute",
    alj: "Hon. Sarah Mitchell",
    backupAlj: "Hon. James Crawford",
    decisionDueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "Writing",
    filingDate: "2024-09-15",
    hearingDate: "2024-11-20"
  });

  // Writing tab state
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [extensionNeeded, setExtensionNeeded] = useState<string | null>(null);
  const [statutoryCompliant, setStatutoryCompliant] = useState<string | null>(null);
  const [extensionJustification, setExtensionJustification] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [draftStatus, setDraftStatus] = useState<"none" | "drafting" | "saved">("none");
  const [rulingDraft, setRulingDraft] = useState("");

  // Proofing tab state
  const [proofingStatus, setProofingStatus] = useState<"pending" | "in-progress" | "completed">("pending");
  const [proofingComments, setProofingComments] = useState("");

  // Ruling Complete state
  const [changesAccepted, setChangesAccepted] = useState<boolean | null>(null);
  const [finalComments, setFinalComments] = useState("");
  const [rulingIssued, setRulingIssued] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  // Director escalation state
  const [isEscalated, setIsEscalated] = useState(false);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");
  const [deadlineReason, setDeadlineReason] = useState("");

  // Process log
  const [processLog, setProcessLog] = useState([
    { timestamp: "2024-12-10 09:15 AM", action: "Case assigned to ALJ", actor: "System", details: "Assigned to Hon. Sarah Mitchell" },
    { timestamp: "2024-12-10 09:30 AM", action: "Ruling drafting started", actor: "Hon. Sarah Mitchell", details: "Template: Standard Ruling Report" },
    { timestamp: "2024-12-12 02:45 PM", action: "Draft saved", actor: "Hon. Sarah Mitchell", details: "Version 1.0" },
  ]);

  const calculateDaysRemaining = () => {
    const today = new Date();
    const diff = caseData.decisionDueDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining();
  const isOverdue = daysRemaining < 0;
  const isWarning = daysRemaining <= 5 && daysRemaining >= 0;

  const handleCreateRuling = () => {
    if (!selectedTemplate) {
      toast({ title: "Select Template", description: "Please select a ruling template first.", variant: "destructive" });
      return;
    }
    setDraftStatus("drafting");
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "Ruling draft created",
      actor: "Hon. Sarah Mitchell",
      details: `Template: ${selectedTemplate}`
    }]);
    toast({ title: "Draft Created", description: "Ruling report draft has been created." });
  };

  const handleSaveDraft = () => {
    setDraftStatus("saved");
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "Draft saved",
      actor: "Hon. Sarah Mitchell",
      details: "Draft saved successfully"
    }]);
    toast({ title: "Draft Saved", description: "Your ruling draft has been saved." });
  };

  const handleExtensionSubmit = () => {
    if (extensionNeeded === "no") {
      setShowExtensionModal(false);
      return;
    }
    
    if (statutoryCompliant === "yes") {
      setProcessLog(prev => [...prev, {
        timestamp: new Date().toLocaleString(),
        action: "Extension requested - Statutory Exception",
        actor: "Hon. Sarah Mitchell",
        details: extensionJustification
      }]);
      toast({ title: "Extension Flagged", description: "Case flagged with Late – Statutory Exception." });
      setShowExtensionModal(false);
    } else {
      setIsEscalated(true);
      setProcessLog(prev => [...prev, {
        timestamp: new Date().toLocaleString(),
        action: "Escalated to Deputy Director",
        actor: "System",
        details: "Extension does not meet statutory requirements"
      }]);
      toast({ title: "Escalated", description: "Case has been escalated to Deputy Director.", variant: "destructive" });
      setShowExtensionModal(false);
    }
  };

  const handleRouteToProofing = () => {
    setActiveTab("proofing");
    setProofingStatus("in-progress");
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "Routed to Backup ALJ for proofing",
      actor: "System",
      details: `Assigned to ${caseData.backupAlj}`
    }]);
    toast({ title: "Routed", description: "Case routed to Backup ALJ for proofing." });
  };

  const handleCompleteProofing = () => {
    setProofingStatus("completed");
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "Proofing completed",
      actor: caseData.backupAlj,
      details: proofingComments || "No comments"
    }]);
    toast({ title: "Proofing Complete", description: "Proofing has been completed." });
  };

  const handleAcceptChanges = () => {
    setChangesAccepted(true);
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "ALJ accepted proofing changes",
      actor: caseData.alj,
      details: "Changes accepted, ready for issuance"
    }]);
    toast({ title: "Changes Accepted", description: "Proofing changes have been accepted." });
  };

  const handleRejectChanges = () => {
    setChangesAccepted(false);
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "ALJ rejected proofing changes",
      actor: caseData.alj,
      details: "Changes rejected, original draft maintained"
    }]);
    toast({ title: "Changes Rejected", description: "Proofing changes have been rejected." });
  };

  const handleIssueRuling = (asRecommended: boolean) => {
    setRulingIssued(true);
    setIsRecommended(asRecommended);
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: asRecommended ? "Marked as Recommended Decision" : "Final Ruling Issued",
      actor: caseData.alj,
      details: finalComments || "No additional comments"
    }]);
    toast({ 
      title: asRecommended ? "Recommended Decision" : "Ruling Issued", 
      description: asRecommended ? "Decision marked as recommended." : "Final ruling has been issued." 
    });
  };

  const handleModifyDeadline = () => {
    if (!newDeadline || !deadlineReason) {
      toast({ title: "Required Fields", description: "Please provide new deadline and reason.", variant: "destructive" });
      return;
    }
    setIsEscalated(false);
    setProcessLog(prev => [...prev, {
      timestamp: new Date().toLocaleString(),
      action: "Deadline modified by Director",
      actor: "Deputy Director",
      details: `New deadline: ${newDeadline}. Reason: ${deadlineReason}`
    }]);
    toast({ title: "Deadline Updated", description: "Ruling deadline has been modified." });
    setShowDeadlineModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-[#323130]">ALJ Ruling & Decision Workflow</h1>
              <p className="text-sm text-[#605e5c]">{caseData.caseId} • {caseData.caseName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isOverdue ? "destructive" : isWarning ? "secondary" : "outline"} className={isWarning && !isOverdue ? "bg-yellow-100 text-yellow-800" : ""}>
              {isOverdue ? "OVERDUE" : isWarning ? "DUE SOON" : caseData.status.toUpperCase()}
            </Badge>
            {isEscalated && (
              <Badge variant="destructive" className="bg-orange-500">
                ESCALATED TO DIRECTOR
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Decision Due Card */}
      <div className="px-6 py-4">
        <Card className={`border-l-4 ${isOverdue ? "border-l-red-500 bg-red-50" : isWarning ? "border-l-yellow-500 bg-yellow-50" : "border-l-blue-500"}`}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {(isOverdue || isWarning) && <AlertTriangle className={`h-6 w-6 ${isOverdue ? "text-red-500" : "text-yellow-500"}`} />}
                <div>
                  <p className="text-sm font-medium text-[#323130]">Decision Due Date</p>
                  <p className="text-lg font-semibold">{caseData.decisionDueDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#605e5c]">Days Remaining</p>
                <p className={`text-2xl font-bold ${isOverdue ? "text-red-600" : isWarning ? "text-yellow-600" : "text-[#323130]"}`}>
                  {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-[#e5e5e5] mb-4">
            <TabsTrigger value="writing" className="data-[state=active]:bg-[#0078d4] data-[state=active]:text-white">
              <Edit3 className="h-4 w-4 mr-2" />
              Writing
            </TabsTrigger>
            <TabsTrigger value="proofing" className="data-[state=active]:bg-[#0078d4] data-[state=active]:text-white">
              <Eye className="h-4 w-4 mr-2" />
              Proofing
            </TabsTrigger>
            <TabsTrigger value="ruling-complete" className="data-[state=active]:bg-[#0078d4] data-[state=active]:text-white">
              <FileCheck className="h-4 w-4 mr-2" />
              Ruling Complete
            </TabsTrigger>
            <TabsTrigger value="process-log" className="data-[state=active]:bg-[#0078d4] data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Process Log
            </TabsTrigger>
          </TabsList>

          {/* WRITING TAB */}
          <TabsContent value="writing" className="space-y-4">
            {isEscalated && (
              <Card className="border-orange-500 bg-orange-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-orange-800">Case Escalated to Deputy Director</p>
                      <p className="text-sm text-orange-700">Editing is locked pending Director review.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Create Ruling Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create Ruling Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Select Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate} disabled={isEscalated}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard-ruling">Standard Ruling Report</SelectItem>
                        <SelectItem value="summary-judgment">Summary Judgment Template</SelectItem>
                        <SelectItem value="contract-dispute">Contract Dispute Template</SelectItem>
                        <SelectItem value="administrative-review">Administrative Review Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {draftStatus === "none" && (
                    <Button onClick={handleCreateRuling} disabled={isEscalated} className="w-full bg-[#0078d4] hover:bg-[#106ebe]">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Ruling Report
                    </Button>
                  )}

                  {draftStatus !== "none" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#f3f2f1] rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Ruling Draft</span>
                          <Badge variant="outline" className={draftStatus === "saved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {draftStatus === "saved" ? "Saved" : "Drafting"}
                          </Badge>
                        </div>
                        <Textarea 
                          placeholder="Enter ruling content..."
                          value={rulingDraft}
                          onChange={(e) => setRulingDraft(e.target.value)}
                          className="min-h-[150px]"
                          disabled={isEscalated}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveDraft} disabled={isEscalated} variant="outline" className="flex-1">
                          Save Draft
                        </Button>
                        <Button disabled={isEscalated} variant="outline" className="flex-1">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Revised
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Case Info & Actions */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Case Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#605e5c]">Case Type:</span>
                      <span className="font-medium">{caseData.caseType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#605e5c]">ALJ:</span>
                      <span className="font-medium">{caseData.alj}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#605e5c]">Backup ALJ:</span>
                      <span className="font-medium">{caseData.backupAlj}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#605e5c]">Hearing Date:</span>
                      <span className="font-medium">{caseData.hearingDate}</span>
                    </div>
                  </CardContent>
                </Card>

                {daysRemaining <= 2 && daysRemaining >= 0 && !isEscalated && (
                  <Card className="border-yellow-500">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2 text-yellow-700">
                        <AlertTriangle className="h-5 w-5" />
                        Extension Required?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#605e5c] mb-3">
                        Deadline is approaching. Do you need an extension?
                      </p>
                      <Button onClick={() => setShowExtensionModal(true)} variant="outline" className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50">
                        Request Extension
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {draftStatus === "saved" && !isEscalated && (
                  <Card className="border-green-500">
                    <CardContent className="py-4">
                      <Button onClick={handleRouteToProofing} className="w-full bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Route to Backup ALJ for Proofing
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Director Section */}
            {isEscalated && (
              <Card className="border-orange-500">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Deputy Director Action Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#605e5c] mb-3">
                    Extension request does not meet statutory requirements. Director intervention needed.
                  </p>
                  <Button onClick={() => setShowDeadlineModal(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Modify Ruling Deadline
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PROOFING TAB */}
          <TabsContent value="proofing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Proofing Assignment
                  </span>
                  <Badge variant={proofingStatus === "completed" ? "default" : proofingStatus === "in-progress" ? "secondary" : "outline"}
                    className={proofingStatus === "completed" ? "bg-green-500" : proofingStatus === "in-progress" ? "bg-blue-100 text-blue-800" : ""}>
                    {proofingStatus === "completed" ? "Completed" : proofingStatus === "in-progress" ? "In Progress" : "Pending"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-3 bg-[#f3f2f1] rounded">
                  <div>
                    <p className="text-xs text-[#605e5c]">Case ID</p>
                    <p className="font-medium">{caseData.caseId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#605e5c]">Original ALJ</p>
                    <p className="font-medium">{caseData.alj}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#605e5c]">Due Date</p>
                    <p className="font-medium">{caseData.decisionDueDate.toLocaleDateString()}</p>
                  </div>
                </div>

                {proofingStatus !== "pending" && (
                  <>
                    <div>
                      <Label>Ruling Draft (Editable)</Label>
                      <Textarea 
                        className="mt-1 min-h-[200px]"
                        placeholder="Ruling draft content for review..."
                        value={rulingDraft}
                        onChange={(e) => setRulingDraft(e.target.value)}
                        disabled={proofingStatus === "completed"}
                      />
                    </div>

                    <div>
                      <Label>Proofing Comments</Label>
                      <Textarea 
                        className="mt-1"
                        placeholder="Add comments or notes about changes made..."
                        value={proofingComments}
                        onChange={(e) => setProofingComments(e.target.value)}
                        disabled={proofingStatus === "completed"}
                      />
                    </div>

                    {proofingStatus === "in-progress" && (
                      <Button onClick={handleCompleteProofing} className="w-full bg-[#0078d4] hover:bg-[#106ebe]">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Proofing
                      </Button>
                    )}
                  </>
                )}

                {proofingStatus === "pending" && (
                  <div className="text-center py-8 text-[#605e5c]">
                    <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Waiting for ruling draft to be routed for proofing.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* RULING COMPLETE TAB */}
          <TabsContent value="ruling-complete" className="space-y-4">
            {proofingStatus !== "completed" ? (
              <Card>
                <CardContent className="py-8 text-center text-[#605e5c]">
                  <FileCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Proofing must be completed before ruling can be finalized.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {changesAccepted === null && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Review Proofing Changes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-[#f3f2f1] rounded">
                        <p className="text-sm font-medium mb-2">Proofing Comments from {caseData.backupAlj}:</p>
                        <p className="text-sm text-[#605e5c]">{proofingComments || "No comments provided."}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAcceptChanges} className="flex-1 bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Changes
                        </Button>
                        <Button onClick={handleRejectChanges} variant="outline" className="flex-1 border-red-500 text-red-600 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {changesAccepted !== null && !rulingIssued && (
                  <Card className="border-green-500">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <CardTitle className="text-base">Ruling Ready for Issuance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Badge variant="outline" className={changesAccepted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {changesAccepted ? "Changes Accepted" : "Changes Rejected - Original Draft Used"}
                      </Badge>

                      <div>
                        <Label>Final Comments (Optional)</Label>
                        <Textarea 
                          className="mt-1"
                          placeholder="Add any final comments before issuance..."
                          value={finalComments}
                          onChange={(e) => setFinalComments(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => handleIssueRuling(false)} className="flex-1 bg-[#0078d4] hover:bg-[#106ebe]">
                          <Send className="h-4 w-4 mr-2" />
                          Issue Final Ruling
                        </Button>
                        <Button onClick={() => handleIssueRuling(true)} variant="outline" className="flex-1">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Mark as Recommended Decision
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {rulingIssued && (
                  <Card className="border-green-500 bg-green-50">
                    <CardContent className="py-6 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800">
                        {isRecommended ? "Recommended Decision Submitted" : "Final Ruling Issued"}
                      </h3>
                      <p className="text-sm text-green-700 mt-2">
                        {isRecommended 
                          ? "The decision has been marked as recommended and sent for final review."
                          : "The final ruling has been issued and parties will be notified."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* PROCESS LOG TAB */}
          <TabsContent value="process-log">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Process Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5e5e5]" />
                  <div className="space-y-4">
                    {processLog.map((entry, index) => (
                      <div key={index} className="relative pl-10">
                        <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#0078d4] border-2 border-white" />
                        <div className="p-3 bg-[#f3f2f1] rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{entry.action}</span>
                            <span className="text-xs text-[#605e5c]">{entry.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#605e5c]">By: {entry.actor}</p>
                          {entry.details && <p className="text-sm mt-1">{entry.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Extension Modal */}
      <Dialog open={showExtensionModal} onOpenChange={setShowExtensionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extension Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Do you need an extension?</Label>
              <RadioGroup value={extensionNeeded || ""} onValueChange={setExtensionNeeded} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ext-yes" />
                  <Label htmlFor="ext-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ext-no" />
                  <Label htmlFor="ext-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {extensionNeeded === "yes" && (
              <>
                <div>
                  <Label>Does this meet statutory requirements?</Label>
                  <RadioGroup value={statutoryCompliant || ""} onValueChange={setStatutoryCompliant} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="stat-yes" />
                      <Label htmlFor="stat-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="stat-no" />
                      <Label htmlFor="stat-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {statutoryCompliant === "yes" && (
                  <div>
                    <Label>Justification</Label>
                    <Textarea 
                      className="mt-1"
                      placeholder="Provide justification for statutory exception..."
                      value={extensionJustification}
                      onChange={(e) => setExtensionJustification(e.target.value)}
                    />
                  </div>
                )}

                {statutoryCompliant === "no" && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-sm text-orange-800">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      This will escalate the case to the Deputy Director and lock ALJ editing.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExtensionModal(false)}>Cancel</Button>
            <Button onClick={handleExtensionSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deadline Modification Modal */}
      <Dialog open={showDeadlineModal} onOpenChange={setShowDeadlineModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Ruling Deadline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>New Due Date</Label>
              <Input 
                type="date"
                className="mt-1"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label>Reason for Extension</Label>
              <Textarea 
                className="mt-1"
                placeholder="Provide reason for deadline modification..."
                value={deadlineReason}
                onChange={(e) => setDeadlineReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeadlineModal(false)}>Cancel</Button>
            <Button onClick={handleModifyDeadline} className="bg-orange-500 hover:bg-orange-600">Update Deadline</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ALJRulingWorkflow;
