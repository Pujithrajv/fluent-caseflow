import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, Shield, Car, Eye, Clock, MapPin, ArrowUpDown, Video, ExternalLink, FolderOpen, X, Users, User, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { TasksPlannerView } from "./TasksPlannerView";
import { TasksJiraView } from "./TasksJiraView";
import { TasksKanbanView } from "./TasksKanbanView";
import { TasksNewApproach2View } from "./TasksNewApproach2View";
import { Tasks2View } from "./Tasks2View";
import { NewTaskView } from "./NewTaskView";

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
    title: "Initial Case Management Conference",
    subtitle: "Notice of Initial Case Management Conference",
    date: "2025-08-25",
    time: "1:00 PM",
    endDate: "2025-08-25",
    endTime: "2:00 PM",
    location: "Microsoft Teams Meeting",
    meetingId: "392 671 125 846",
    type: "Conference",
    eventType: "meeting",
    isTeamsEvent: true,
    hasCase: true,
    caseNumber: "DBE-2024-001-EC",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    departmentRole: "Complainant",
    primaryParty: "Kirby Neroni",
    primaryPartyRole: "Respondent",
    timezone: "CST"
  },
  {
    id: 2,
    title: "Case Management Continuance",
    subtitle: "Web-based session",
    date: "2025-09-14",
    time: "10:00 AM",
    endDate: "2025-09-14",
    endTime: "11:00 AM",
    location: "Microsoft Teams Meeting",
    meetingId: "855 123 456 789",
    type: "Meeting",
    eventType: "meeting",
    isTeamsEvent: true,
    hasCase: true,
    caseNumber: "CASE-2024-001",
    caseType: "Weights & Measures Inspections",
    department: "Department of Agriculture",
    departmentRole: "Petitioner",
    primaryParty: "Sniders Group",
    primaryPartyRole: "Respondent",
    timezone: "CST"
  },
  {
    id: 3,
    title: "Pre-hearing Conference",
    subtitle: "Web-based session",
    date: "2025-09-14",
    time: "2:00 PM",
    endDate: "2025-09-14",
    endTime: "3:00 PM",
    location: "Microsoft Teams Meeting",
    meetingId: "123 987 654 321",
    type: "Conference",
    eventType: "meeting",
    isTeamsEvent: true,
    hasCase: true,
    caseNumber: "CASE-2024-002",
    caseType: "Weights & Measures Inspections",
    department: "Department of Agriculture",
    departmentRole: "Petitioner",
    primaryParty: "Midtown Vending LLC",
    primaryPartyRole: "Respondent",
    timezone: "CST"
  },
  {
    id: 4,
    title: "Administrative Hearing",
    subtitle: "Professional Hearing Session",
    date: "2025-09-19",
    time: "1:00 PM",
    endDate: "2025-09-19",
    endTime: "3:00 PM",
    location: "502 William G. Stratton Building\n401 South Spring Street\nSpringfield, IL 62706-4000",
    type: "Hearing",
    eventType: "hearing",
    isTeamsEvent: false,
    hasCase: true,
    caseNumber: "CASE-2024-003",
    caseType: "Food Safety",
    department: "Department of Public Health",
    departmentRole: "Complainant",
    primaryParty: "North District Foods",
    primaryPartyRole: "Respondent",
    timezone: "CST",
    aljAssigned: "Daniel Schuering"
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
    id: "CASE-2024-001",
    caseNumber: "CASE-2024-001",
    title: "New Case Created",
    description: "New case successfully created and saved to records.",
    primaryParty: "Kirby Neroni",
    priority: "Informational",
    dueDate: "2025-09-17",
    priorityClass: "bg-muted text-muted-foreground border-muted",
    type: "alert"
  },
  {
    id: "CASE-2024-002",
    caseNumber: "CASE-2024-002",
    title: "Case Returned for Correction",
    description: "Case returned for correction – missing/incorrect information or documents.",
    primaryParty: "Sniders Group",
    priority: "High Priority",
    dueDate: "2024-12-28",
    priorityClass: "bg-yellow-100 text-yellow-800 border-yellow-300",
    type: "alert"
  },
  {
    id: "DBE-2024-001-EC",
    caseNumber: "DBE-2024-001-EC",
    title: "Case Accepted",
    description: "Case Accepted – Case Number generated.",
    primaryParty: "North District Foods",
    priority: "Normal",
    dueDate: "2025-09-27",
    priorityClass: "bg-blue-100 text-blue-800 border-blue-300",
    type: "alert"
  },
  {
    id: "CASE-2024-004",
    caseNumber: "CASE-2024-004",
    title: "Case Rejected - Soft Reject (Clerk)",
    description: "Case Rejected – due to incomplete information or wrong document upload.",
    primaryParty: "Metro Agricultural Corp",
    priority: "Alert",
    dueDate: "2024-12-30",
    priorityClass: "bg-orange-100 text-orange-800 border-orange-300",
    type: "alert"
  },
  {
    id: "ABD-2024-001-EC",
    caseNumber: "ABD-2024-001-EC",
    title: "Case Rejected - Hard Reject (ALJ)",
    description: "Case Rejected – ALJ after checklist review.",
    primaryParty: "Valley Grain Solutions",
    priority: "Critical Alert",
    dueDate: "2025-09-17",
    priorityClass: "bg-red-100 text-red-800 border-red-300",
    type: "alert"
  }
];

export function Dashboard({ onCreateCase, onViewCase, onEditCase }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cases");
  const [tasks, setTasks] = useState(mockTasks);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [primaryPartyData, setPrimaryPartyData] = useState<any>({});
  const [eventsSearchQuery, setEventsSearchQuery] = useState("");
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("");
  const [showPhysicalLocation, setShowPhysicalLocation] = useState<Record<number, boolean>>({});
  const [activeLocationTab, setActiveLocationTab] = useState<Record<number, 'online' | 'location'>>({});
  const [accordionOpen, setAccordionOpen] = useState<Record<number, boolean>>({ 7: true }); // Option C open by default
  const navigate = useNavigate();

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...mockEvents];

    // Apply text search filter
    if (eventsSearchQuery.trim()) {
      const query = eventsSearchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.caseNumber.toLowerCase().includes(query) ||
        event.caseType.toLowerCase().includes(query) ||
        event.department.toLowerCase().includes(query) ||
        event.primaryParty.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.date.includes(query) ||
        event.time.toLowerCase().includes(query) ||
        (event.meetingId && event.meetingId.includes(query))
      );
    }

    // Apply type filters
    if (selectedTypeFilters.length > 0) {
      filtered = filtered.filter(event => 
        selectedTypeFilters.includes(event.type)
      );
    }

    // Apply date filters
    if (selectedDateFilter) {
      const now = new Date();
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        
        switch (selectedDateFilter) {
          case "this-week":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
          
          case "next-30-days":
            const thirtyDaysFromNow = new Date(now);
            thirtyDaysFromNow.setDate(now.getDate() + 30);
            return eventDate >= now && eventDate <= thirtyDaysFromNow;
          
          case "past-events":
            return eventDate < now;
          
          default:
            return true;
        }
      });
    }

    // Sort by date and time
    return filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`);
      const dateTimeB = new Date(`${b.date} ${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  }, [eventsSearchQuery, selectedTypeFilters, selectedDateFilter]);

  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleClearEventsSearch = () => {
    setEventsSearchQuery("");
    setSelectedTypeFilters([]);
    setSelectedDateFilter("");
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypeFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      const searchInput = document.getElementById('events-search');
      searchInput?.focus();
    }
    if (e.key === 'Escape') {
      setEventsSearchQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  }, []);

  const uniqueEventTypes = [...new Set(mockEvents.map(event => event.type))];
  const hasActiveFilters = eventsSearchQuery || selectedTypeFilters.length > 0 || selectedDateFilter;

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
              value="new-task" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              New Task
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
            {/* Events Grid or Empty State */}
            {filteredAndSortedEvents.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                <p className="text-muted-foreground mt-2">
                  No upcoming events scheduled.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {filteredAndSortedEvents.map((event) => {
                  const getBadgeColor = (type: string) => {
                    switch (type.toLowerCase()) {
                      case 'conference':
                        return 'bg-cyan-500 text-white';
                      case 'hearing':
                        return 'bg-red-500 text-white';
                      default:
                        return 'bg-blue-500 text-white';
                    }
                  };

                  return (
                    <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow duration-200 bg-white rounded-lg border border-gray-200">
                      <CardContent className="p-5">
                        {/* Header with title and badge */}
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-base font-semibold text-gray-900 leading-tight pr-2">
                            {event.title}
                          </h3>
                          <Badge 
                            className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${getBadgeColor(event.type)}`}
                          >
                            {event.type}
                          </Badge>
                        </div>

                        {/* Case & Party Information */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {event.caseNumber}: {event.caseType}
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Shield className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {event.department} ({event.departmentRole})
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <User className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {event.primaryParty} ({event.primaryPartyRole})
                            </span>
                          </div>
                        </div>

                        {/* Date and Time */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {event.time} {event.timezone}
                            </span>
                          </div>
                        </div>

                        {/* Location Information */}
                        <div className="mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-700">
                              {event.isTeamsEvent ? (
                                <div>
                                  <div>{event.location}</div>
                                  <div className="text-gray-600 mt-1">
                                    Meeting ID: {event.meetingId}
                                  </div>
                                </div>
                              ) : (
                                <div className="whitespace-pre-line">{event.location}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          {event.isTeamsEvent && (
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                              <Users className="h-4 w-4 mr-2" />
                              Join Teams
                            </Button>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="text-sm font-medium">
                              <FileText className="h-4 w-4 mr-1" />
                              Open Case
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm font-medium"
                              onClick={() => navigate(`/appointment/${event.id}`)}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Open Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>



          {/* New Task Tab Content */}
          <TabsContent value="new-task" className="mt-6">
            <NewTaskView 
              tasks={tasks} 
              onViewTask={(taskId) => console.log('View task:', taskId)}
            />
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
}
