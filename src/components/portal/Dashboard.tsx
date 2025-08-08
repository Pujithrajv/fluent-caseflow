import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, User, Shield, Car, Eye, HelpCircle, Settings, LogOut, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface CaseItem {
  id: string;
  name: string;
  description: string;
  caseNumber?: string;
  department: string;
  section: string;
  firstParty: string;
  secondParty: string;
  secondPartyType: string;
  represented?: string;
  status: "draft" | "submitted" | "accepted" | "complete" | "closed" | "archived";
  stage: string;
  icon: "shield" | "car" | "file";
  lastActionDate: string;
  lastWizardTab: "department" | "primary-party" | "case-details" | "case-questions" | "involved-parties" | "requests" | "review-submit";
}

const mockCases: CaseItem[] = [
  {
    id: "CASE-2024-001",
    name: "Weights & Measures Inspections for Sniders Group",
    description: "Weights & Measures Inspections",
    department: "Dept. of Agriculture • Assigned Attorney: Jaslyn Blom",
    section: "Weights & Measures Division",
    firstParty: "Petitionaire",
    secondParty: "Sniders Group",
    secondPartyType: "Corporate Entity",
    status: "submitted",
    stage: "Pending Case Acceptance",
    icon: "shield",
    lastActionDate: "2024-06-04",
    lastWizardTab: "review-submit"
  },
  {
    id: "CASE-2024-002",
    name: "Vending Inspection – Midtown",
    description: "Weights & Measures Inspections",
    department: "Dept. of Agriculture • Assigned Attorney: (not yet assigned)",
    section: "Weights & Measures Division",
    firstParty: "Petitionaire",
    secondParty: "Midtown Vending LLC",
    secondPartyType: "Corporate Entity",
    status: "draft",
    stage: "Intake",
    icon: "shield",
    lastActionDate: "",
    lastWizardTab: "department"
  },
  {
    id: "CASE-2024-003",
    name: "Food Safety – North District",
    description: "Food Safety",
    department: "Dept. of Public Health • Assigned Attorney: (not yet assigned)",
    section: "Food Safety Division",
    firstParty: "Petitionaire",
    secondParty: "North District Foods",
    secondPartyType: "Corporate Entity",
    status: "draft",
    stage: "Intake",
    icon: "file",
    lastActionDate: "",
    lastWizardTab: "primary-party"
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Case Review Meeting",
    description: "Review of DBE Certification Appeal",
    date: "2024-12-20",
    time: "10:00 AM",
    location: "Conference Room A",
    type: "meeting"
  },
  {
    id: 2,
    title: "Document Submission Deadline",
    description: "FOID Card Appeal Documents",
    date: "2024-12-22",
    time: "5:00 PM",
    location: "Online Submission",
    type: "deadline"
  },
  {
    id: 3,
    title: "Administrative Hearing",
    description: "Professional License Suspension",
    date: "2024-12-28",
    time: "2:00 PM",
    location: "Hearing Room 3",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "accepted": return "bg-success text-success-foreground";
    case "submitted": return "bg-warning text-warning-foreground";
    case "draft": return "bg-destructive text-destructive-foreground";
    case "complete": return "bg-success text-success-foreground";
    case "closed": return "bg-muted text-muted-foreground";
    case "archived": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

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

export function Dashboard({ onCreateCase, onViewCase, onEditCase }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cases");

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header - Full Width */}
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/a8ff40e4-1efe-4d80-9072-5c480ab49fa9.png" 
              alt="Illinois Bureau of Administrative Hearings" 
              className="h-16 w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Header Icons */}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-12 w-12" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-12 w-12" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Frequently Asked Questions</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
        </div>
      </div>

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
                          Participant/Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                         <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                           Last Action
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
                                 onClick={() => onViewCase(caseItem.id)}
                                 className="p-2"
                               >
                                 <Eye className="h-4 w-4" />
                               </Button>
                             </td>
                             <td className="px-4 py-4 align-top">
                                <div>
                                  {caseItem.caseNumber ? (
                                    <p className="text-sm font-medium text-foreground">
                                      {caseItem.caseNumber}
                                    </p>
                                  ) : (
                                    <p className="text-sm text-muted-foreground italic">—</p>
                                  )}
                                  <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                                </div>
                              </td>
                             <td className="px-4 py-4 align-top">
                              <div>
                                <p className="text-sm font-medium text-foreground">{caseItem.department}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  <span className="font-medium">First Party:</span> {caseItem.firstParty}
                                </p>
                              </div>
                            </td>
                             <td className="px-4 py-4 align-top">
                              <div>
                                <p className="text-sm font-medium text-foreground">{caseItem.secondParty}</p>
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Second Party:</span> {caseItem.secondPartyType}
                                </p>
                                {caseItem.represented && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    <span className="font-medium">Represented:</span> {caseItem.represented}
                                  </p>
                                )}
                              </div>
                            </td>
                             <td className="px-4 py-4 align-top">
                              <div className="space-y-2">
                                <Badge className={getStatusColor(caseItem.status)} variant="secondary">
                                  {caseItem.status}
                                </Badge>
                                 <p className="text-xs text-muted-foreground">
                                   {caseItem.status === "draft" ? "Pending Submission" : caseItem.stage}
                                 </p>
                                <p className="text-xs text-muted-foreground">
                                  <span className="font-medium">Stage:</span> {caseItem.stage}
                                </p>
                              </div>
                            </td>
                             <td className="px-4 py-4 align-top">
                               <div className="space-y-2">
                                 <div className="flex items-center space-x-2 text-sm text-foreground">
                                   <Calendar className="h-4 w-4 text-muted-foreground" />
                                   <span>{caseItem.lastActionDate ? new Date(caseItem.lastActionDate).toLocaleDateString() : "—"}</span>
                                 </div>
                                <div className="text-xs text-muted-foreground">
                                  Last worked on:{" "}
                                  <button
                                    onClick={() => onEditCase?.(caseItem.id, caseItem.lastWizardTab)}
                                    className="text-primary hover:underline font-medium"
                                  >
                                    {getTabDisplayName(caseItem.lastWizardTab)}
                                  </button>
                                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-primary pl-4 py-3 bg-muted/20 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
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
                <div className="space-y-4">
                  <div className="border-l-4 border-warning pl-4 py-3 bg-warning/10 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">Document Review Pending</h4>
                        <p className="text-xs text-muted-foreground mt-1">FOID Card Appeal - Abigayle Low</p>
                        <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Due: Dec 22, 2024</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-warning/20">
                        High Priority
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-3 bg-primary/10 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">Case Assignment Review</h4>
                        <p className="text-xs text-muted-foreground mt-1">Professional License Suspension Appeal</p>
                        <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Due: Dec 25, 2024</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Medium Priority
                      </Badge>
                    </div>
                  </div>

                  <div className="border-l-4 border-success pl-4 py-3 bg-success/10 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">Quarterly Report Preparation</h4>
                        <p className="text-xs text-muted-foreground mt-1">Administrative hearing statistics compilation</p>
                        <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Due: Dec 31, 2024</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-success/20">
                        Low Priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
