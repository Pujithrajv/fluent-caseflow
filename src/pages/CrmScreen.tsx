import { ChevronLeft, ChevronRight, Search, X, ArrowLeft, ChevronDown, ChevronUp, Upload, Calendar, FileText, ClipboardList, Filter, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CrmScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("General");
  const [isOrderIssued, setIsOrderIssued] = useState(false);
  
  // Discovery form state
  const [discoveryData, setDiscoveryData] = useState({
    status: "Inactive",
    activationType: "",
    activationSource: "",
    startDate: "",
    cutoffDate: "",
    monitorDate: "",
    suspendTimeline: false,
    alj: "Pujith Raj (Available)",
    clerk: "Pujith Raj (Available)"
  });

  // Expert Discovery state
  const [expertDiscovery, setExpertDiscovery] = useState({
    enabled: false,
    identityDate: "",
    reportRequired: false,
    reportDate: "",
    depositionDate: "",
    vitae: null as File | null,
    subjectMatter: ""
  });

  // Discovery Types state
  const [discoveryTypes, setDiscoveryTypes] = useState([
    { type: "Interrogatories", allowed: true, daysToRespond: 28 },
    { type: "Document Production", allowed: true, daysToRespond: 28 },
    { type: "Deposition", allowed: true, daysToRespond: 7 },
    { type: "Inspection", allowed: true, daysToRespond: 7 }
  ]);

  // Mock data for Card D tabs
  const [conferences] = useState([
    { id: 1, type: "Monitoring", date: "2025-12-15", time: "10:00 AM", outcome: "Parties on track", createdBy: "Pujith Raj" },
    { id: 2, type: "Final", date: "2026-01-10", time: "2:00 PM", outcome: "Pending", createdBy: "Pujith Raj" }
  ]);

  const [motions] = useState([
    { id: "MOT-2025-001", type: "Extend", filedBy: "Primary Party", status: "Granted", decisionDate: "2025-11-20", linkedRequest: "REQ-001" },
    { id: "MOT-2025-002", type: "Compel", filedBy: "Department", status: "Pending", decisionDate: "", linkedRequest: "REQ-003" }
  ]);

  const [requests] = useState([
    { id: "REQ-001", type: "Interrogatories", filedBy: "Primary Party", filedOn: "2025-10-15", due: "2025-11-12", certificateFiled: true, certificateDate: "2025-11-10", status: "Completed", daysOverdue: 0 },
    { id: "REQ-002", type: "Document Production", filedBy: "Department", filedOn: "2025-10-20", due: "2025-11-17", certificateFiled: false, certificateDate: "", status: "Open", daysOverdue: 0 },
    { id: "REQ-003", type: "Deposition", filedBy: "Primary Party", filedOn: "2025-11-01", due: "2025-11-08", certificateFiled: false, certificateDate: "", status: "Open", daysOverdue: 5 },
    { id: "REQ-004", type: "Inspection", filedBy: "3rd Party", filedOn: "2025-11-05", due: "2025-11-19", certificateFiled: false, certificateDate: "", status: "Open", daysOverdue: 0 }
  ]);

  const [trackerFilter, setTrackerFilter] = useState({
    type: "all",
    status: "all",
    party: "all",
    lateOnly: false
  });

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!discoveryData.cutoffDate) return "—";
    const today = new Date();
    const cutoff = new Date(discoveryData.cutoffDate);
    const diff = Math.ceil((cutoff.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} days` : `${Math.abs(diff)} days overdue`;
  };

  // Handler to issue discovery order
  const handleIssueOrder = () => {
    // Validate required fields
    if (!discoveryData.startDate || !discoveryData.cutoffDate) {
      toast({
        title: "Validation Error",
        description: "Start Date and Cutoff Date are required to issue the order.",
        variant: "destructive"
      });
      return;
    }

    // Check for validation errors
    const validationError = validateDiscoveryDates();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    // Lock dates and activate discovery
    setIsOrderIssued(true);
    setDiscoveryData({...discoveryData, status: "Active"});
    
    // Simulate PDF generation
    toast({
      title: "Discovery Order Issued",
      description: "Discovery order has been generated and dates are now locked. PDF summary is being prepared.",
    });

    // Simulate PDF download after 2 seconds
    setTimeout(() => {
      toast({
        title: "PDF Generated",
        description: "Discovery order summary is ready for download.",
      });
    }, 2000);
  };

  // Validation
  const validateDiscoveryDates = () => {
    if (discoveryData.startDate && discoveryData.cutoffDate) {
      if (new Date(discoveryData.startDate) > new Date(discoveryData.cutoffDate)) {
        return "Start Date must be before or equal to Cutoff Date";
      }
    }
    if (discoveryData.monitorDate && discoveryData.cutoffDate) {
      if (new Date(discoveryData.monitorDate) > new Date(discoveryData.cutoffDate)) {
        return "Monitor Date must be before or equal to Cutoff Date";
      }
    }
    // Expert dates validation
    if (expertDiscovery.enabled && discoveryData.cutoffDate) {
      if (expertDiscovery.identityDate && new Date(expertDiscovery.identityDate) > new Date(discoveryData.cutoffDate)) {
        return "Expert Identity Date must be before or equal to Cutoff Date";
      }
      if (expertDiscovery.reportDate && new Date(expertDiscovery.reportDate) > new Date(discoveryData.cutoffDate)) {
        return "Expert Report Date must be before or equal to Cutoff Date";
      }
      if (expertDiscovery.depositionDate && new Date(expertDiscovery.depositionDate) > new Date(discoveryData.cutoffDate)) {
        return "Expert Deposition Date must be before or equal to Cutoff Date";
      }
    }
    return null;
  };

  const updateDiscoveryType = (index: number, field: 'allowed' | 'daysToRespond', value: boolean | number) => {
    const updated = [...discoveryTypes];
    updated[index] = { ...updated[index], [field]: value };
    setDiscoveryTypes(updated);
  };

  // Filter requests based on tracker filters
  const filteredRequests = requests.filter(req => {
    if (trackerFilter.type !== "all" && req.type !== trackerFilter.type) return false;
    if (trackerFilter.status !== "all" && req.status !== trackerFilter.status) return false;
    if (trackerFilter.party !== "all" && req.filedBy !== trackerFilter.party) return false;
    if (trackerFilter.lateOnly && req.daysOverdue <= 0) return false;
    return true;
  });

  // Calculate KPIs
  const kpis = {
    total: requests.length,
    completed: requests.filter(r => r.status === "Completed").length,
    open: requests.filter(r => r.status === "Open").length,
    openPastDue: requests.filter(r => r.status === "Open" && r.daysOverdue > 0).length
  };

  // Determine row color for tracker
  const getRowColor = (request: typeof requests[0]) => {
    if (request.status === "Completed") return "bg-green-50";
    if (request.daysOverdue > 0) return "bg-red-50";
    const dueDate = new Date(request.due);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue <= 7 && daysUntilDue >= 0) return "bg-yellow-50";
    return "";
  };

  const tabs = ["General", "Intake", "Pre-Hearing", "Discovery", "Post Hearing", "Participants", "Requests", "Schedule", "Timeline / Docket", "Case Type", "Related"];
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex">
      {/* Left Sidebar */}
      <div className="w-48 bg-[#f3f2f1] border-r border-[#edebe9] flex flex-col">
        <div className="p-3 border-b border-[#edebe9]">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 bg-[#0078d4] text-white flex items-center justify-center text-xs font-semibold">
              CM
            </div>
            <span className="font-semibold text-[#323130]">Case Management</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="py-2">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">My Work</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏠</span> Home
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🕐</span> Recent
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📌</span> Pinned
            </a>
            <div className="px-3 py-2 text-sm text-[#323130] font-semibold">Dashboards</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📊</span> Activities
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Core Records</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📋</span> Cases
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📝</span> Requests
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📄</span> Citations
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Scheduling</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">📅</span> Event Calendar
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Entity</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏛️</span> State Entities
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">⚖️</span> Law Firms
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🏢</span> Corporate Entities
            </a>
          </div>

          <div className="py-2 border-t border-[#edebe9]">
            <div className="px-3 py-1 text-xs font-semibold text-[#605e5c]">Contacts</div>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">👤</span> State Entity Personnel
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">👥</span> Legal Service Contacts
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">💼</span> Corporate Personnel
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-[#323130] hover:bg-[#edebe9]">
              <span className="mr-2">🧑</span> Others / Individuals
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-[#edebe9] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => navigate('/portal')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-semibold text-[#323130]">Sub-Contract Dispute</h1>
                  <span className="text-sm text-[#605e5c]">- Saved</span>
                </div>
                <div className="text-xs text-[#605e5c]">Case</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-semibold text-[#323130]">CMS-BEP-SCD--25-00001</div>
                <div className="text-xs text-[#605e5c]">Case Number</div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-[#0078d4]">Pujith Raj</div>
                  <div className="text-xs text-[#605e5c]">Owner</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#323130]">Discovery</div>
                <div className="text-xs text-[#605e5c]">Status Reason</div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b border-[#edebe9] px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#edebe9]" style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }}></div>
            
            {[
              { label: "Case Processing", sublabel: "Active for 3 months", active: true, filled: true },
              { label: "Intake", sublabel: "", active: false, filled: true },
              { label: "Pre-Hearing (10 D)", sublabel: "", active: false, filled: false },
              { label: "Hearing", sublabel: "", active: false, filled: false },
              { label: "Post Hearing", sublabel: "", active: false, filled: false },
              { label: "Decision", sublabel: "", active: false, filled: false },
              { label: "Post Decision", sublabel: "", active: false, filled: false },
              { label: "Close", sublabel: "", active: false, filled: false }
            ].map((stage, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stage.active ? 'bg-[#0078d4] border-2 border-[#0078d4]' : 
                  stage.filled ? 'bg-[#107c10] border-2 border-[#107c10]' : 
                  'bg-white border-2 border-[#d2d0ce]'
                }`}>
                  {stage.filled && <span className="text-white text-xl">✓</span>}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-semibold ${stage.active ? 'text-[#323130]' : 'text-[#605e5c]'}`}>
                    {stage.label}
                  </div>
                  {stage.sublabel && (
                    <div className="text-xs text-[#605e5c] bg-[#0078d4] text-white px-2 py-0.5 rounded mt-1">
                      {stage.sublabel}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#edebe9] px-4">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-semibold border-b-2 whitespace-nowrap ${
                  activeTab === tab ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-[#605e5c] hover:text-[#323130]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto bg-[#faf9f8] p-6">
          {activeTab === "General" && (
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
            {/* Left Column - DETAILS */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DETAILS</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Name <span className="text-red-600">*</span></Label>
                    <Input value="Sub-Contract Dispute" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Case Type <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Sub-Contract Dispute</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Department ID</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Department <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Central Management Services</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Division</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Business Enterprise Program</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Bureau</Label>
                    <Input value="" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DEPARTMENT STAFF</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Case Coordinator <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Eneida Dirckens</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Department Attorney <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Gula Habicht</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Final Decision Maker <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Deena Vankov</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">SUMMARY</h3>
                </div>
                <div className="p-4">
                  <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" readOnly />
                </div>
              </div>
            </div>

            {/* Middle Column - PRIMARY PARTY & 3RD PARTY */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">PRIMARY PARTY</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Party <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Matilde Lowe</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Represented</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch checked className="data-[state=checked]:bg-[#0078d4]" />
                      <span className="text-sm text-[#323130]">Yes</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Party Attorney <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Abbey Higgins</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">3RD PARTY</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">3rd Party</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Additional Party</Label>
                    <div className="flex items-center mt-1">
                      <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" />
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Third Party Represented</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Third Party Attorney</Label>
                    <div className="flex items-center mt-1">
                      <Input value="---" className="bg-[#f3f2f1] border-[#8a8886]" />
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DETAILS</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Initiating Date <span className="text-red-600">*</span></Label>
                    <Input type="date" value="2025-10-01" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Responsive Date</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Caption Notation</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - INTERNAL STAFF, EXPEDITED, REFERRAL SOURCE */}
            <div className="space-y-6">
              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">INTERNAL STAFF</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Clerk</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Primary ALJ <span className="text-red-600">*</span></Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Backup ALJ</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#0078d4]">Pujith Raj (Available)</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Fact Finder Term</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-sm text-[#0078d4]">🔗 Administrative Law Judge</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">EXPEDITED</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Complex Case</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Confidential</Label>
                    <Input value="---" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Expedited</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#edebe9] rounded">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">REFERRAL SOURCE</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-[#323130]">Alternative Referral Method</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <Switch className="data-[state=unchecked]:bg-[#c8c6c4]" />
                      <span className="text-sm text-[#323130]">No</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-[#323130]">Referral Method Source</Label>
                    <Input value="Portal" className="mt-1 bg-[#f3f2f1] border-[#8a8886]" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Pre-Hearing Tab */}
          {activeTab === "Pre-Hearing" && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Discovery Cross-References Card */}
                  <div className="bg-white border border-[#edebe9] rounded">
                    <div className="px-4 py-3 border-b border-[#edebe9]">
                      <h3 className="text-sm font-semibold text-[#323130]">DISCOVERY STATUS (CROSS-REFERENCE)</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-800 mb-2">ℹ️ These fields are automatically synced from the Discovery tab</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Discovery Status</Label>
                        <div className="mt-1 p-2 bg-[#f3f2f1] border border-[#8a8886] rounded flex items-center">
                          {discoveryData.status === "Active" && (
                            <Badge className="bg-blue-600 text-white">Active</Badge>
                          )}
                          {discoveryData.status === "Inactive" && (
                            <Badge variant="secondary" className="bg-gray-200 text-gray-700">Inactive</Badge>
                          )}
                          {discoveryData.status === "Closed" && (
                            <Badge className="bg-green-600 text-white">Closed</Badge>
                          )}
                        </div>
                        <p className="text-xs text-[#605e5c] mt-1">Read-only from Discovery tab</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Discovery Cutoff Date</Label>
                        <Input 
                          type="date"
                          value={discoveryData.cutoffDate}
                          readOnly
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886] cursor-not-allowed"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">Read-only from Discovery tab</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Discovery Start Date</Label>
                        <Input 
                          type="date"
                          value={discoveryData.startDate}
                          readOnly
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886] cursor-not-allowed"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">Read-only from Discovery tab</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Timeline Status</Label>
                        <div className="mt-1 p-3 bg-[#f3f2f1] border border-[#8a8886] rounded">
                          <p className="text-sm font-semibold text-[#323130]">
                            {discoveryData.suspendTimeline ? "⏸️ Suspended" : "▶️ Active"}
                          </p>
                        </div>
                        <p className="text-xs text-[#605e5c] mt-1">Main case timeline status</p>
                      </div>

                      {discoveryData.cutoffDate && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-[#605e5c]">Days Until Discovery Cutoff</p>
                              <p className="text-2xl font-bold text-[#323130] mt-1">{calculateDaysRemaining()}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-yellow-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pre-Hearing Details Card */}
                  <div className="bg-white border border-[#edebe9] rounded">
                    <div className="px-4 py-3 border-b border-[#edebe9]">
                      <h3 className="text-sm font-semibold text-[#323130]">PRE-HEARING DETAILS</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className="text-xs text-[#323130]">Pre-Hearing Conference Status</Label>
                        <Select defaultValue="not-scheduled">
                          <SelectTrigger className="w-full bg-[#f3f2f1] border-[#8a8886] mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-scheduled">Not Scheduled</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Conference Date</Label>
                        <Input 
                          type="date"
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Pre-Hearing Briefs Due</Label>
                        <Input 
                          type="date"
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Witness List Due</Label>
                        <Input 
                          type="date"
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Exhibit List Due</Label>
                        <Input 
                          type="date"
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Hearing Preparation Card */}
                  <div className="bg-white border border-[#edebe9] rounded">
                    <div className="px-4 py-3 border-b border-[#edebe9]">
                      <h3 className="text-sm font-semibold text-[#323130]">HEARING PREPARATION</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className="text-xs text-[#323130]">Hearing Date (Estimated)</Label>
                        <Input 
                          type="date"
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">Tentative hearing date</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Hearing Location</Label>
                        <Select defaultValue="not-set">
                          <SelectTrigger className="w-full bg-[#f3f2f1] border-[#8a8886] mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-set">Not Set</SelectItem>
                            <SelectItem value="in-person">In Person</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Estimated Duration (Days)</Label>
                        <Input 
                          type="number"
                          placeholder="Enter number of days..."
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Number of Witnesses</Label>
                        <Input 
                          type="number"
                          placeholder="Expected witnesses..."
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Stipulations Filed</Label>
                        <div className="flex items-center mt-2 space-x-2">
                          <Switch className="data-[state=checked]:bg-[#0078d4]" />
                          <span className="text-sm text-[#323130]">No</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settlement Status Card */}
                  <div className="bg-white border border-[#edebe9] rounded">
                    <div className="px-4 py-3 border-b border-[#edebe9]">
                      <h3 className="text-sm font-semibold text-[#323130]">SETTLEMENT STATUS</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className="text-xs text-[#323130]">Settlement Discussions</Label>
                        <Select defaultValue="none">
                          <SelectTrigger className="w-full bg-[#f3f2f1] border-[#8a8886] mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="stalled">Stalled</SelectItem>
                            <SelectItem value="near-agreement">Near Agreement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Mediation Scheduled</Label>
                        <div className="flex items-center mt-2 space-x-2">
                          <Switch className="data-[state=checked]:bg-[#0078d4]" />
                          <span className="text-sm text-[#323130]">No</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Mediator</Label>
                        <div className="flex items-center mt-1 space-x-2">
                          <Input 
                            placeholder="Search mediator..."
                            className="bg-[#f3f2f1] border-[#8a8886]"
                          />
                          <Button variant="ghost" size="sm">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-white border border-[#edebe9] rounded">
                    <div className="px-4 py-3 border-b border-[#edebe9]">
                      <h3 className="text-sm font-semibold text-[#323130]">QUICK ACTIONS</h3>
                    </div>
                    <div className="p-6 space-y-3">
                      <Button variant="outline" className="w-full justify-start border-[#8a8886]">
                        <FileText className="mr-2 h-4 w-4" />
                        View Discovery Tab
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-[#8a8886]">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Pre-Hearing Conference
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-[#8a8886]">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Pre-Hearing Documents
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discovery Tab */}
          {activeTab === "Discovery" && (
            <div className="max-w-7xl mx-auto">
              {/* Validation Error Display */}
              {validateDiscoveryDates() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  ⚠️ {validateDiscoveryDates()}
                </div>
              )}

              {/* Card A - Discovery Summary */}
              <div className="bg-white border border-[#edebe9] rounded mb-6">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">DISCOVERY SUMMARY</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-[#323130] mb-2 block">Discovery Status <span className="text-red-600">*</span></Label>
                        <Select 
                          value={discoveryData.status}
                          onValueChange={(value) => setDiscoveryData({...discoveryData, status: value})}
                        >
                          <SelectTrigger className="w-full bg-[#f3f2f1] border-[#8a8886]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inactive">
                              <Badge variant="secondary" className="bg-gray-200 text-gray-700">Inactive</Badge>
                            </SelectItem>
                            <SelectItem value="Active">
                              <Badge className="bg-blue-600 text-white">Active</Badge>
                            </SelectItem>
                            <SelectItem value="Closed">
                              <Badge className="bg-green-600 text-white">Closed</Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Activation Type</Label>
                        <Select 
                          value={discoveryData.activationType}
                          onValueChange={(value) => setDiscoveryData({...discoveryData, activationType: value})}
                          disabled={discoveryData.status === "Active"}
                        >
                          <SelectTrigger className="w-full bg-[#f3f2f1] border-[#8a8886] mt-1">
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALJ Order">ALJ Order</SelectItem>
                            <SelectItem value="Agreed Plan">Agreed Plan</SelectItem>
                          </SelectContent>
                        </Select>
                        {discoveryData.status === "Active" && (
                          <p className="text-xs text-[#605e5c] mt-1">Read-only once issued</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Activation Source</Label>
                        <div className="flex items-center mt-1">
                          <Input 
                            value={discoveryData.activationSource}
                            onChange={(e) => setDiscoveryData({...discoveryData, activationSource: e.target.value})}
                            placeholder="Order/Motion ID..."
                            className="bg-[#f3f2f1] border-[#8a8886]"
                          />
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-[#0078d4] mt-1 cursor-pointer hover:underline">🔗 Link to Order/Motion</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Start Date <span className="text-red-600">*</span></Label>
                        <Input 
                          type="date"
                          value={discoveryData.startDate}
                          onChange={(e) => setDiscoveryData({...discoveryData, startDate: e.target.value})}
                          disabled={isOrderIssued}
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">{isOrderIssued ? "Locked after order issued" : "Required before issuing order"}</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Cutoff Date <span className="text-red-600">*</span></Label>
                        <Input 
                          type="date"
                          value={discoveryData.cutoffDate}
                          onChange={(e) => setDiscoveryData({...discoveryData, cutoffDate: e.target.value})}
                          disabled={isOrderIssued}
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">{isOrderIssued ? "Locked after order issued (ALJ can override)" : "Editable by ALJ; updates Portal"}</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Monitor/Warning Date</Label>
                        <Input 
                          type="date"
                          value={discoveryData.monitorDate}
                          onChange={(e) => setDiscoveryData({...discoveryData, monitorDate: e.target.value})}
                          disabled={isOrderIssued}
                          className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                        />
                        <p className="text-xs text-[#605e5c] mt-1">{isOrderIssued ? "Locked after order issued" : "Optional monitoring checkpoint"}</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Suspend Main Timeline</Label>
                        <div className="flex items-center mt-2 space-x-2">
                          <Switch 
                            checked={discoveryData.suspendTimeline}
                            onCheckedChange={(checked) => setDiscoveryData({...discoveryData, suspendTimeline: checked})}
                            className="data-[state=checked]:bg-[#0078d4]"
                          />
                          <span className="text-sm text-[#323130]">{discoveryData.suspendTimeline ? "Yes" : "No"}</span>
                        </div>
                        <p className="text-xs text-[#605e5c] mt-1">Pause case timeline during discovery</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-[#323130]">ALJ</Label>
                        <div className="flex items-center mt-1 space-x-2 p-2 bg-[#f3f2f1] border border-[#8a8886] rounded">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-[#0078d4]">{discoveryData.alj}</span>
                        </div>
                        <p className="text-xs text-[#605e5c] mt-1">Read-only from case</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Clerk</Label>
                        <div className="flex items-center mt-1 space-x-2 p-2 bg-[#f3f2f1] border border-[#8a8886] rounded">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#d13438] text-white text-xs">PR</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-[#0078d4]">{discoveryData.clerk}</span>
                        </div>
                        <p className="text-xs text-[#605e5c] mt-1">Read-only from case</p>
                      </div>

                      <div>
                        <Label className="text-xs text-[#323130]">Days Remaining</Label>
                        <div className="mt-1 p-3 bg-[#fff4ce] border border-[#ffb900] rounded">
                          <p className="text-2xl font-semibold text-[#323130]">{calculateDaysRemaining()}</p>
                          <p className="text-xs text-[#605e5c] mt-1">Until cutoff date</p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                        <h4 className="text-sm font-semibold text-[#323130] mb-2">📋 Quick Info</h4>
                        <ul className="text-xs text-[#605e5c] space-y-1">
                          <li>• Status: <strong>{discoveryData.status}</strong></li>
                          <li>• Type: <strong>{discoveryData.activationType || "Not set"}</strong></li>
                          <li>• Timeline: <strong>{discoveryData.suspendTimeline ? "Suspended" : "Active"}</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Issue Discovery Order Button */}
                  {!isOrderIssued && (
                    <div className="mt-6 pt-6 border-t border-[#edebe9] flex justify-end">
                      <Button 
                        onClick={handleIssueOrder}
                        className="bg-[#0078d4] hover:bg-[#106ebe] text-white"
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        Issue Discovery Order
                      </Button>
                    </div>
                  )}

                  {isOrderIssued && (
                    <div className="mt-6 pt-6 border-t border-[#edebe9]">
                      <div className="p-3 bg-green-50 border border-green-200 rounded flex items-center">
                        <FileCheck className="mr-2 h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-green-800">Discovery Order Issued</p>
                          <p className="text-xs text-green-700">Dates are locked. Discovery is now active.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card B - Expert Discovery */}
              <div className="bg-white border border-[#edebe9] rounded mb-6">
                <button
                  onClick={() => setExpertDiscovery({...expertDiscovery, enabled: !expertDiscovery.enabled})}
                  className="w-full px-4 py-3 border-b border-[#edebe9] flex items-center justify-between hover:bg-[#f3f2f1] transition-colors"
                >
                  <h3 className="text-sm font-semibold text-[#323130]">EXPERT DISCOVERY</h3>
                  {expertDiscovery.enabled ? (
                    <ChevronUp className="h-4 w-4 text-[#605e5c]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#605e5c]" />
                  )}
                </button>
                
                {expertDiscovery.enabled && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded">
                      <input
                        type="checkbox"
                        checked={expertDiscovery.enabled}
                        onChange={(e) => setExpertDiscovery({...expertDiscovery, enabled: e.target.checked})}
                        className="h-4 w-4 text-[#0078d4] rounded"
                      />
                      <Label className="text-sm text-[#323130]">Include Expert Discovery?</Label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-[#323130]">Expert Identity Disclosure Date <span className="text-red-600">*</span></Label>
                          <Input 
                            type="date"
                            value={expertDiscovery.identityDate}
                            onChange={(e) => setExpertDiscovery({...expertDiscovery, identityDate: e.target.value})}
                            className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                          />
                          <p className="text-xs text-[#605e5c] mt-1">Required if expert discovery enabled</p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              checked={expertDiscovery.reportRequired}
                              onChange={(e) => setExpertDiscovery({...expertDiscovery, reportRequired: e.target.checked})}
                              className="h-4 w-4 text-[#0078d4] rounded"
                            />
                            <Label className="text-xs text-[#323130]">Expert Report Required?</Label>
                          </div>
                          {expertDiscovery.reportRequired && (
                            <>
                              <Label className="text-xs text-[#323130]">Report Disclosure Date <span className="text-red-600">*</span></Label>
                              <Input 
                                type="date"
                                value={expertDiscovery.reportDate}
                                onChange={(e) => setExpertDiscovery({...expertDiscovery, reportDate: e.target.value})}
                                className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                              />
                            </>
                          )}
                        </div>

                        <div>
                          <Label className="text-xs text-[#323130]">Expert Deposition Date</Label>
                          <Input 
                            type="date"
                            value={expertDiscovery.depositionDate}
                            onChange={(e) => setExpertDiscovery({...expertDiscovery, depositionDate: e.target.value})}
                            className="mt-1 bg-[#f3f2f1] border-[#8a8886]"
                          />
                          <p className="text-xs text-[#605e5c] mt-1">Optional</p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-[#323130]">Expert Vitae / CV</Label>
                          <div className="mt-1 border-2 border-dashed border-[#8a8886] rounded p-4 text-center hover:border-[#0078d4] transition-colors cursor-pointer">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => setExpertDiscovery({...expertDiscovery, vitae: e.target.files?.[0] || null})}
                              className="hidden"
                              id="vitae-upload"
                            />
                            <label htmlFor="vitae-upload" className="cursor-pointer">
                              <Upload className="h-8 w-8 mx-auto text-[#605e5c] mb-2" />
                              <p className="text-xs text-[#605e5c]">
                                {expertDiscovery.vitae ? expertDiscovery.vitae.name : "Click to upload CV (PDF, DOC)"}
                              </p>
                            </label>
                          </div>
                          <p className="text-xs text-[#605e5c] mt-1">Optional file upload</p>
                        </div>

                        <div>
                          <Label className="text-xs text-[#323130]">Subject Matter / Scope</Label>
                          <textarea
                            value={expertDiscovery.subjectMatter}
                            onChange={(e) => setExpertDiscovery({...expertDiscovery, subjectMatter: e.target.value})}
                            className="mt-1 w-full h-24 px-3 py-2 bg-[#f3f2f1] border border-[#8a8886] rounded text-sm resize-none"
                            placeholder="Describe the expert's subject matter area..."
                          />
                        </div>

                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-xs text-[#605e5c]">
                            ⚠️ All expert dates must be on or before the Discovery Cutoff Date
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card C - Allowed Discovery Types & Durations */}
              <div className="bg-white border border-[#edebe9] rounded mb-6">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">ALLOWED DISCOVERY TYPES & DURATIONS</h3>
                  <p className="text-xs text-[#605e5c] mt-1">Configure which discovery types are allowed and response timeframes</p>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#edebe9]">
                          <th className="text-left py-3 px-4 text-xs font-semibold text-[#323130] bg-[#f3f2f1]">Discovery Type</th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-[#323130] bg-[#f3f2f1]">Allowed</th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-[#323130] bg-[#f3f2f1]">Days to Respond/Coordinate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discoveryTypes.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#edebe9] hover:bg-[#faf9f8]">
                            <td className="py-3 px-4 text-sm text-[#323130] font-medium">{item.type}</td>
                            <td className="py-3 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={item.allowed}
                                onChange={(e) => updateDiscoveryType(idx, 'allowed', e.target.checked)}
                                className="h-5 w-5 text-[#0078d4] rounded"
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Input
                                type="number"
                                min="1"
                                max="90"
                                value={item.daysToRespond}
                                onChange={(e) => updateDiscoveryType(idx, 'daysToRespond', parseInt(e.target.value) || 0)}
                                disabled={!item.allowed}
                                className="w-20 mx-auto text-center bg-[#f3f2f1] border-[#8a8886]"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-[#605e5c]">
                      💡 <strong>Note:</strong> These values will be pushed to the Portal to set due-date defaults and enable/disable request types for parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card D - Conferences • Motions • Tracker */}
              <div className="bg-white border border-[#edebe9] rounded mb-6">
                <div className="px-4 py-3 border-b border-[#edebe9]">
                  <h3 className="text-sm font-semibold text-[#323130]">CONFERENCES • MOTIONS • TRACKER</h3>
                  <p className="text-xs text-[#605e5c] mt-1">Monitor discovery activities, motions, and request compliance</p>
                </div>
                <div className="p-6">
                  <Tabs defaultValue="tracker" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#f3f2f1]">
                      <TabsTrigger value="conferences" className="data-[state=active]:bg-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Conferences
                      </TabsTrigger>
                      <TabsTrigger value="motions" className="data-[state=active]:bg-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Motions
                      </TabsTrigger>
                      <TabsTrigger value="tracker" className="data-[state=active]:bg-white">
                        <ClipboardList className="h-4 w-4 mr-2" />
                        Requests & Certificates
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Conferences */}
                    <TabsContent value="conferences" className="mt-4">
                      <div className="mb-4 flex justify-between items-center">
                        <p className="text-xs text-[#605e5c]">Discovery-related appointments and conferences</p>
                        <Button size="sm" className="bg-[#0078d4] hover:bg-[#106ebe] text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Conference
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-[#edebe9] bg-[#f3f2f1]">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Type</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Date</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Time</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Outcome/Notes</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Created By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {conferences.map((conf) => (
                              <tr key={conf.id} className="border-b border-[#edebe9] hover:bg-[#faf9f8]">
                                <td className="py-2 px-3 text-sm text-[#323130]">
                                  <Badge variant={conf.type === "Monitoring" ? "secondary" : "default"}>
                                    {conf.type}
                                  </Badge>
                                </td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{conf.date}</td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{conf.time}</td>
                                <td className="py-2 px-3 text-sm text-[#605e5c]">{conf.outcome}</td>
                                <td className="py-2 px-3 text-sm text-[#0078d4]">{conf.createdBy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-[#605e5c]">
                          📅 <strong>Reminder:</strong> 5-day pre-conference alerts sent to ALJ/Clerk automatically
                        </p>
                      </div>
                    </TabsContent>

                    {/* Tab 2: Motions */}
                    <TabsContent value="motions" className="mt-4">
                      <div className="mb-4">
                        <p className="text-xs text-[#605e5c]">Discovery-related motions (Extend, Compel, Approve Plan)</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-[#edebe9] bg-[#f3f2f1]">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Motion ID</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Type</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Filed By</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Status</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Decision Date</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Linked Request</th>
                            </tr>
                          </thead>
                          <tbody>
                            {motions.map((motion) => (
                              <tr key={motion.id} className="border-b border-[#edebe9] hover:bg-[#faf9f8]">
                                <td className="py-2 px-3 text-sm text-[#0078d4] cursor-pointer hover:underline">
                                  🔗 {motion.id}
                                </td>
                                <td className="py-2 px-3 text-sm text-[#323130]">
                                  <Badge variant="outline">{motion.type}</Badge>
                                </td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{motion.filedBy}</td>
                                <td className="py-2 px-3 text-sm">
                                  <Badge variant={motion.status === "Granted" ? "default" : "secondary"}>
                                    {motion.status}
                                  </Badge>
                                </td>
                                <td className="py-2 px-3 text-sm text-[#323130]">
                                  {motion.decisionDate || "Pending"}
                                </td>
                                <td className="py-2 px-3 text-sm text-[#0078d4] cursor-pointer hover:underline">
                                  {motion.linkedRequest ? `🔗 ${motion.linkedRequest}` : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-[#605e5c]">
                          ⚖️ <strong>Extend Motion Granted?</strong> Update Cutoff Date inline to notify Portal automatically
                        </p>
                      </div>
                    </TabsContent>

                    {/* Tab 3: Requests & Certificates Tracker */}
                    <TabsContent value="tracker" className="mt-4">
                      {/* Filters */}
                      <div className="mb-4 p-3 bg-[#f3f2f1] rounded border border-[#edebe9]">
                        <div className="flex items-center space-x-4 flex-wrap gap-2">
                          <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-[#605e5c]" />
                            <span className="text-xs font-semibold text-[#323130]">Filters:</span>
                          </div>
                          <Select value={trackerFilter.type} onValueChange={(val) => setTrackerFilter({...trackerFilter, type: val})}>
                            <SelectTrigger className="w-40 h-8 text-xs bg-white">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="Interrogatories">Interrogatories</SelectItem>
                              <SelectItem value="Document Production">Document Production</SelectItem>
                              <SelectItem value="Deposition">Deposition</SelectItem>
                              <SelectItem value="Inspection">Inspection</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={trackerFilter.status} onValueChange={(val) => setTrackerFilter({...trackerFilter, status: val})}>
                            <SelectTrigger className="w-32 h-8 text-xs bg-white">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={trackerFilter.party} onValueChange={(val) => setTrackerFilter({...trackerFilter, party: val})}>
                            <SelectTrigger className="w-40 h-8 text-xs bg-white">
                              <SelectValue placeholder="Party" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-50">
                              <SelectItem value="all">All Parties</SelectItem>
                              <SelectItem value="Primary Party">Primary Party</SelectItem>
                              <SelectItem value="Department">Department</SelectItem>
                              <SelectItem value="3rd Party">3rd Party</SelectItem>
                            </SelectContent>
                          </Select>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={trackerFilter.lateOnly}
                              onChange={(e) => setTrackerFilter({...trackerFilter, lateOnly: e.target.checked})}
                              className="h-4 w-4 text-[#0078d4] rounded"
                            />
                            <span className="text-xs text-[#323130]">Late Only</span>
                          </label>
                        </div>
                      </div>

                      {/* Tracker Grid */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-[#edebe9] bg-[#f3f2f1]">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Request ID</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Type</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Filed By</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Filed On</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Due/Target</th>
                              <th className="text-center py-2 px-3 text-xs font-semibold text-[#323130]">Certificate Filed</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Certificate Date</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-[#323130]">Status</th>
                              <th className="text-center py-2 px-3 text-xs font-semibold text-[#323130]">Days Past Due</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRequests.map((req) => (
                              <tr key={req.id} className={`border-b border-[#edebe9] hover:opacity-80 ${getRowColor(req)}`}>
                                <td className="py-2 px-3 text-sm text-[#0078d4] cursor-pointer hover:underline">
                                  🔗 {req.id}
                                </td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{req.type}</td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{req.filedBy}</td>
                                <td className="py-2 px-3 text-sm text-[#605e5c]">{req.filedOn}</td>
                                <td className="py-2 px-3 text-sm text-[#323130]">{req.due}</td>
                                <td className="py-2 px-3 text-center">
                                  {req.certificateFiled ? (
                                    <Badge className="bg-green-600 text-white">Yes</Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </td>
                                <td className="py-2 px-3 text-sm text-[#605e5c]">{req.certificateDate || "—"}</td>
                                <td className="py-2 px-3 text-sm">
                                  <Badge variant={req.status === "Completed" ? "default" : "outline"}>
                                    {req.status}
                                  </Badge>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  {req.daysOverdue > 0 ? (
                                    <span className="text-sm font-semibold text-red-600">{req.daysOverdue}</span>
                                  ) : (
                                    <span className="text-sm text-[#605e5c]">—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* KPI Footer */}
                      <div className="mt-4 grid grid-cols-4 gap-4">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-center">
                          <p className="text-2xl font-bold text-[#323130]">{kpis.total}</p>
                          <p className="text-xs text-[#605e5c]">Total Requests</p>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                          <p className="text-2xl font-bold text-green-700">{kpis.completed}</p>
                          <p className="text-xs text-[#605e5c]">Completed</p>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-center">
                          <p className="text-2xl font-bold text-yellow-700">{kpis.open}</p>
                          <p className="text-xs text-[#605e5c]">Open</p>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded text-center">
                          <p className="text-2xl font-bold text-red-700">{kpis.openPastDue}</p>
                          <p className="text-xs text-[#605e5c]">Open Past Due</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-50 border border-green-200"></div>
                            <span className="text-[#605e5c]">Completed</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-yellow-50 border border-yellow-200"></div>
                            <span className="text-[#605e5c]">Due ≤ 7 days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-50 border border-red-200"></div>
                            <span className="text-[#605e5c]">Overdue</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-[#8a8886]">
                          Export Tracker
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between bg-white border border-[#edebe9] rounded p-4">
                <div className="text-xs text-[#605e5c]">
                  Phase 3 Complete: Discovery Summary + Expert Discovery + Discovery Types + Conferences • Motions • Tracker
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="border-[#8a8886]"
                    disabled={discoveryData.status === "Active"}
                  >
                    Save Draft
                  </Button>
                  <Button 
                    className="bg-[#0078d4] hover:bg-[#106ebe] text-white"
                    disabled={!discoveryData.startDate || !discoveryData.cutoffDate || validateDiscoveryDates() !== null}
                  >
                    Issue Discovery Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrmScreen;