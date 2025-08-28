import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, Shield, Car, Eye, Clock, MapPin, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";

interface CaseItem {
  id: string;
  name: string;
  description: string;
  caseNumber?: string;
  confirmationNumber?: string;
  deptRefNumber?: string;
  caseType: string;
  department: string;
  departmentParticipationType: string;
  section: string;
  primaryPartyName: string;
  primaryPartyType: string;
  primaryPartyCategory: string;
  represented?: string;
  attorneyName?: string;
  status: "draft" | "submitted" | "accepted" | "complete" | "closed" | "archived";
  externalStatus: string;
  stage: "Intake" | "Pre-Hearing" | "Hearing" | "Post-Hearing";
  icon: "shield" | "car" | "file";
  lastActionDate: string;
  lastWizardTab: "department" | "primary-party" | "case-details" | "case-questions" | "involved-parties" | "requests" | "review-submit";
  assignedAttorney?: string;
  nextEvent?: {
    name: string;
    date: string;
    time: string;
  };
  deadlines?: Array<{
    name: string;
    date: string;
    priority: number;
  }>;
}

const mockCases: CaseItem[] = [
  {
    id: "DBE-2024-001-EC",
    name: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    description: "Grain Dealer and Warehouse Licensing",
    caseNumber: "DBE-2024-001-EC",
    deptRefNumber: "AGR-2024-0892",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    departmentParticipationType: "Complainant",
    section: "Division of Agricultural Industry Regulation",
    primaryPartyName: "Kirby Neroni",
    primaryPartyType: "Respondent",
    primaryPartyCategory: "Individual",
    represented: "No",
    status: "accepted",
    externalStatus: "Accepted",
    stage: "Pre-Hearing",
    icon: "shield",
    lastActionDate: "2025-08-11",
    lastWizardTab: "review-submit",
    assignedAttorney: "Greg Miles",
    nextEvent: {
      name: "Pre-hearing Conference",
      date: "2024-12-28",
      time: "2:00 PM"
    },
    deadlines: [
      { name: "Response to Motion due", date: "2024-12-22", priority: 1 },
      { name: "Discovery cutoff", date: "2024-12-30", priority: 2 }
    ]
  },
  {
    id: "CASE-2024-001",
    name: "Weights & Measures Inspections for Sniders Group",
    description: "Weights & Measures Inspections",
    confirmationNumber: "2024-0001",
    deptRefNumber: "WM-2024-0456",
    caseType: "Weights & Measures Inspections",
    department: "Department of Agriculture",
    departmentParticipationType: "Petitioner",
    section: "Weights & Measures Division",
    primaryPartyName: "Sniders Group",
    primaryPartyType: "Respondent",
    primaryPartyCategory: "Corporate Entity",
    status: "submitted",
    externalStatus: "Submitted",
    stage: "Intake",
    icon: "shield",
    lastActionDate: "2024-06-04",
    lastWizardTab: "review-submit",
    assignedAttorney: "Jaslyn Blom",
    deadlines: [
      { name: "Initial Response due", date: "2024-12-25", priority: 1 }
    ]
  },
  {
    id: "CASE-2024-002",
    name: "Vending Inspection – Midtown",
    description: "Weights & Measures Inspections",
    confirmationNumber: "2024-0002",
    caseType: "Weights & Measures Inspections",
    department: "Department of Agriculture",
    departmentParticipationType: "Petitioner",
    section: "Weights & Measures Division",
    primaryPartyName: "Midtown Vending LLC",
    primaryPartyType: "Respondent",
    primaryPartyCategory: "Corporate Entity",
    status: "draft",
    externalStatus: "Draft",
    stage: "Intake",
    icon: "shield",
    lastActionDate: "2025-07-28",
    lastWizardTab: "department"
  },
  {
    id: "CASE-2024-003",
    name: "Food Safety – North District",
    description: "Food Safety",
    confirmationNumber: "2024-0003",
    deptRefNumber: "FS-2024-0123",
    caseType: "Food Safety",
    department: "Department of Public Health",
    departmentParticipationType: "Complainant",
    section: "Food Safety Division",
    primaryPartyName: "North District Foods",
    primaryPartyType: "Respondent",
    primaryPartyCategory: "Corporate Entity",
    status: "draft",
    externalStatus: "Draft",
    stage: "Intake",
    icon: "file",
    lastActionDate: "2025-07-28",
    lastWizardTab: "primary-party"
  },
];

const mockEvents = [
  {
    id: 1,
    title: "AGR vs. – Notices – Notice of Initial Case Management Conference",
    description: "Web-based session",
    date: "2025-08-26",
    time: "1:00 PM",
    endDate: "2025-08-27",
    endTime: "1:00 PM",
    meeting: "Teams (web-based)",
    type: "meeting"
  },
  {
    id: 2,
    title: "Case Management Continuance",
    description: "Web-based session",
    date: "2025-09-15",
    time: "10:00 AM",
    endDate: "2025-09-15",
    endTime: "11:00 AM",
    meeting: "Teams (web-based)",
    type: "meeting"
  },
  {
    id: 3,
    title: "Pre-hearing Conference",
    description: "Web-based session",
    date: "2025-09-15",
    time: "10:00 AM",
    endDate: "2025-09-15",
    endTime: "11:00 AM",
    meeting: "Teams (web-based)",
    type: "meeting"
  },
  {
    id: 4,
    title: "Hearing Conference",
    description: "Professional Hearing Session",
    date: "2025-09-20",
    time: "1:00 PM",
    endDate: "2025-09-20",
    endTime: "3:00 PM",
    meeting: "Stratton Office Building\n502 William G. Stratton Building\n401 South Spring Street\nSpringfield, IL 62706-4000",
    type: "hearing"
  }
];

const faqData = [
  {
    id: "faq-1",
    question: "How do I create a new case?",
    answer: "Click on the 'Create New Case' button in the top right corner of the dashboard. This will open the case wizard where you can enter all the required information step by step."
  },
  {
    id: "faq-2",
    question: "What information do I need to start a case?",
    answer: "You'll need department information, party details, case description, and any relevant documents. The wizard will guide you through each required field."
  },
  {
    id: "faq-3",
    question: "How can I track the status of my case?",
    answer: "All your cases are displayed on the main dashboard with their current status. You can also click 'View' on any case to see detailed progress information."
  },
  {
    id: "faq-4",
    question: "Can I edit a case after submission?",
    answer: "Draft cases can be edited freely. Once submitted, cases enter the review process and may have limited editing capabilities depending on the current stage."
  },
  {
    id: "faq-5",
    question: "How do I upload documents?",
    answer: "In the case wizard, there's a dedicated 'Documents' tab where you can upload all required files. Supported formats include PDF, DOC, DOCX, and image files."
  }
];

const getCaseIcon = (iconType: string) => {
  switch (iconType) {
    case "shield": return Shield;
    case "car": return Car;
    default: return FileText;
  }
};

interface DashboardProps {
  onCreateCase: () => void;
  onViewCase: (caseId: string) => void;
  onEditCase?: (caseId: string, tab: string) => void;
}

const getTabDisplayName = (tab: string) => {
  switch (tab) {
    case "department": return "Department";
    case "primary-party": return "Primary Party";
    case "case-details": return "Case Details";
    case "case-questions": return "Abandon Well Questions";
    case "involved-parties": return "Involved Parties";
    case "requests": return "Requests";
    case "review-submit": return "Review & Submit";
    default: return tab;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const mockTasks = [
  {
    id: "FOID-2024-001",
    caseNumber: "FOID-2024-001",
    title: "Document Review Pending",
    description: "FOID Card Appeal - Abigayle Low",
    priority: "High Priority",
    dueDate: "2024-12-22",
    priorityClass: "bg-warning/20 border-warning",
    type: "task"
  },
  {
    id: "AGR-BEP-EP--25-00001",
    caseNumber: "AGR-BEP-EP--25-00001",
    title: "Action Required: Conference report is required",
    description: "Conference report submission required for case",
    priority: "High Priority",
    dueDate: "2024-12-20",
    priorityClass: "bg-warning/20 border-warning",
    type: "task"
  },
  {
    id: "EEC-GBA--25-00001",
    caseNumber: "EEC-GBA--25-00001",
    title: "Case Rejected – Conflict of Interest",
    description: "This case has been rejected by the assigned ALJ due to a conflict of interest.",
    priority: "Alert",
    dueDate: "2025-07-17",
    priorityClass: "bg-destructive/20 border-destructive",
    type: "alert",
    action: "View Case"
  },
  {
    id: "2025-0008",
    caseNumber: "2025-0008",
    title: "Case Rejected – Initial Review",
    description: "Test 6 Decision Date - Clerk rejected the case during initial review.",
    priority: "Alert",
    dueDate: "2025-07-17",
    priorityClass: "bg-destructive/20 border-destructive",
    type: "alert",
    action: "View Case",
    status: "Rejected"
  }
];

export function Dashboard({ onCreateCase, onViewCase, onEditCase }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cases");
  const [tasks, setTasks] = useState(mockTasks);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  // Sort events by start time (ascending)
  const sortedEvents = [...mockEvents].sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0">
            <TabsTrigger 
              value="cases" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Cases
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Tasks & Alerts
            </TabsTrigger>
          </TabsList>

          {/* Cases Tab Content */}
          <TabsContent value="cases" className="mt-6">
            {/* Filter and Create Button Row */}
            <div className="flex items-center justify-between mb-6">
              <Select defaultValue="active">
                <SelectTrigger className="w-[200px] h-11 border-gray-400 bg-gray-50 focus:ring-primary">
                  <SelectValue placeholder="Filter cases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active Cases</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="inactive">Inactive Cases</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search cases..." 
                    className="pl-10 w-64 h-11 font-fluent border-gray-400 bg-gray-50 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="font-fluent" onClick={onCreateCase}>
                  <Plus className="mr-2 h-5 w-5" />
                  Create New Case
                </Button>
              </div>
            </div>

            {/* Cases Table */}
            <div className="w-full">
              <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-16">
                          
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Case #
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Primary Party
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Important Dates
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockCases.map((caseItem) => {
                        const IconComponent = getCaseIcon(caseItem.icon);
                        return (
                          <tr key={caseItem.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-4 align-top">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (caseItem.status === 'draft') {
                                    onEditCase?.(caseItem.id, caseItem.lastWizardTab);
                                  } else {
                                    onViewCase(caseItem.id);
                                  }
                                }}
                                className="p-2"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                            
                            {/* Case # Column */}
                            <td className="px-4 py-4 align-top">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">
                                  {caseItem.status === 'accepted' || caseItem.status === 'complete' || caseItem.status === 'closed' ? (
                                    caseItem.caseNumber ? `Case #: ${caseItem.caseNumber}` : '—'
                                  ) : (
                                    caseItem.confirmationNumber ? `Confirmation #: ${caseItem.confirmationNumber}` : '—'
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">{caseItem.caseType}</p>
                                <p className="text-xs text-muted-foreground">
                                  Dept. Ref #: {caseItem.deptRefNumber || '—'}
                                </p>
                              </div>
                            </td>

                            {/* Department Column */}
                            <td className="px-4 py-4 align-top">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">{caseItem.department}</p>
                                <p className="text-sm text-muted-foreground">{caseItem.departmentParticipationType}</p>
                                <p className="text-xs text-muted-foreground">
                                  {caseItem.assignedAttorney || "(not yet assigned)"}
                                </p>
                              </div>
                            </td>

                            {/* Primary Party Column */}
                            <td className="px-4 py-4 align-top">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">{caseItem.primaryPartyName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {caseItem.primaryPartyType} – {caseItem.primaryPartyCategory}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {caseItem.attorneyName ? `Attorney: ${caseItem.attorneyName}` : `Represented: ${caseItem.represented || 'No'}`}
                                </p>
                              </div>
                            </td>

                            {/* Status Column */}
                            <td className="px-4 py-4 align-top">
                              <div className="space-y-2">
                                <StatusBadge status={caseItem.status as "draft" | "submitted" | "accepted" | "rejected" | "in-progress" | "completed"}>
                                  {caseItem.externalStatus}
                                </StatusBadge>
                                <p className="text-xs text-muted-foreground">
                                  Stage: {caseItem.stage}
                                </p>
                              </div>
                            </td>

                            {/* Important Dates Column */}
                            <td className="px-4 py-4 align-top">
                              <div className="space-y-2">
                                {/* Next Event */}
                                {caseItem.nextEvent ? (
                                  <div className="text-xs">
                                    <p className="font-medium text-foreground">{caseItem.nextEvent.name}</p>
                                    <p className="text-muted-foreground">
                                      {formatDate(caseItem.nextEvent.date)} at {caseItem.nextEvent.time}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-xs text-muted-foreground">No events scheduled</p>
                                )}

                                {/* Deadlines (top 2) */}
                                {caseItem.deadlines?.slice(0, 2).map((deadline, index) => (
                                  <div key={index} className="text-xs text-muted-foreground">
                                    <p>{deadline.name} — {formatDate(deadline.date)}</p>
                                  </div>
                                ))}

                                {/* Draft specific content */}
                                {caseItem.status === "draft" && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-muted-foreground">
                                      Draft saved — {formatDate(caseItem.lastActionDate)}
                                    </div>
                                    {onEditCase && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => onEditCase(caseItem.id, caseItem.lastWizardTab)}
                                        className="text-xs h-7 px-2"
                                      >
                                        Continue Editing
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Upcoming Events Tab Content */}
          <TabsContent value="events" className="mt-6">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-fluent">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="group relative bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      tabIndex={0}
                      role="article"
                      aria-label={`Event: ${event.title}`}
                      title={`Starts ${formatDate(event.date)} ${event.time} • Ends ${formatDate(event.endDate)} ${event.endTime}`}
                    >
                      {/* Vertical accent bar */}
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
                      
                      <div className="p-6 pl-8">
                        {/* Title and badge row */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 pr-3">
                            <h3 className="font-semibold text-base text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">
                              {event.title}
                            </h3>
                            {event.description && event.description !== "—" && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {event.description}
                              </p>
                            )}
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full shrink-0"
                            aria-label={`Event type: ${event.type}`}
                          >
                            {event.type}
                          </Badge>
                        </div>
                        
                        {/* Date and time row */}
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        
                        {/* Location row */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                          <span>{event.meeting}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks and Alerts Tab Content */}
          <TabsContent value="tasks" className="mt-6">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-fluent">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Tasks and Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Case Number</TableHead>
                        <TableHead className="w-1/2">Description</TableHead>
                        <TableHead className="w-1/4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleSortByDate}
                            className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                          >
                            Priority & Due Date
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.caseNumber}</TableCell>
                          <TableCell>
                            <div>
                              <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge variant="outline" className={`text-xs ${task.priorityClass}`}>
                                {task.priority}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Due: {formatDate(task.dueDate)}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
