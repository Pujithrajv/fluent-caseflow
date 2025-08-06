import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, User, Shield, Car, Eye, Bell, HelpCircle, Settings, LogOut, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Returned";
  stage: string;
  icon: "shield" | "car" | "file";
  caseAcceptedDate?: string;
}

const mockCases: CaseItem[] = [
  {
    id: "CASE-2024-001",
    name: "DBE Certification Appeal for Eki Carver",
    description: "Good Faith Effort Appeals",
    caseNumber: "DBE-2024-001-EC",
    department: "Department of Transportation",
    section: "DBE Certification Section",
    firstParty: "Petitionaire",
    secondParty: "Eki Carver",
    secondPartyType: "Litigant",
    represented: "Todd Litgard, Attorney at Law",
    status: "Draft",
    stage: "Intake",
    icon: "shield"
  },
  {
    id: "CASE-2024-002", 
    name: "FOID Card Denial for Abigayle Low",
    description: "Card Denial",
    caseNumber: "DNR-GA-FRR-SL-2025-00001",
    department: "Department of State Police",
    section: "Firearms Owners Identification Card",
    firstParty: "Petitionaire",
    secondParty: "Abigayle Low",
    secondPartyType: "Respondant",
    status: "Submitted",
    stage: "Pending Case Acceptance",
    icon: "car",
    caseAcceptedDate: "2024-12-15"
  },
  {
    id: "CASE-2024-003",
    name: "Professional License Suspension Appeal",
    description: "Healthcare Provider License Review",
    caseNumber: "IDFPR-HC-2025-00047",
    department: "Department of Financial and Professional Regulation",
    section: "Professional Regulation Division",
    firstParty: "Petitionaire",
    secondParty: "Dr. Sarah Martinez",
    secondPartyType: "Licensed Professional",
    represented: "Law Offices of Johnson & Associates",
    status: "Under Review",
    stage: "Administrative Review",
    icon: "file",
    caseAcceptedDate: "2024-11-28"
  },
  {
    id: "CASE-2024-004",
    name: "Environmental Violation Appeal",
    description: "Air Quality Standards Compliance",
    caseNumber: "EPA-AQ-2025-00123",
    department: "Environmental Protection Agency",
    section: "Air Quality Division",
    firstParty: "Petitionaire",
    secondParty: "Midwest Manufacturing LLC",
    secondPartyType: "Corporate Entity",
    status: "Approved",
    stage: "Final Decision Issued",
    icon: "shield",
    caseAcceptedDate: "2024-10-05"
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
    case "Approved": return "bg-success text-success-foreground";
    case "Under Review": return "bg-warning text-warning-foreground";
    case "Submitted": return "bg-success text-success-foreground";
    case "Draft": return "bg-destructive text-destructive-foreground";
    case "Returned": return "bg-destructive text-destructive-foreground";
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
}

export function Dashboard({ onCreateCase, onViewCase }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background p-6 relative">
      {/* Watermark Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src="/lovable-uploads/ed443ced-22f0-4bb1-91d8-924f4ac238ac.png" 
          alt="Watermark" 
          className="w-96 h-96 object-contain opacity-60"
        />
      </div>
      <div className="mx-auto max-w-7xl space-y-6 relative z-10">
        {/* Header */}
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
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
                  <HelpCircle className="h-5 w-5" />
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

        {/* Second Row - Filter and Create Button */}
        <div className="flex items-center justify-between">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter cases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          
          <Button size="lg" className="font-fluent" onClick={onCreateCase}>
            <Plus className="mr-2 h-5 w-5" />
            Create New Case
          </Button>
        </div>

        {/* Main Content - Full Width Cases Table */}
        <div className="w-full">
          <div className="w-full">
            <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Case
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Dept/Bureau
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Participant/Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Case Accepted/Rejected Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Read Only
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockCases.map((caseItem) => {
                      const IconComponent = getCaseIcon(caseItem.icon);
                      return (
                        <tr key={caseItem.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-primary hover:underline cursor-pointer">
                                  {caseItem.name}
                                </p>
                                <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                                {caseItem.caseNumber && (
                                  <p className="text-xs text-muted-foreground">
                                    Case #: {caseItem.caseNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{caseItem.department}</p>
                              <p className="text-sm text-muted-foreground">{caseItem.section}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="font-medium">First Party:</span> {caseItem.firstParty}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
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
                          <td className="px-4 py-4">
                            <div className="space-y-2">
                              <Badge className={getStatusColor(caseItem.status)} variant="secondary">
                                {caseItem.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                {caseItem.status === "Draft" ? "Pending Submission" : caseItem.stage}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Stage:</span> {caseItem.stage}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-foreground">
                              {caseItem.caseAcceptedDate ? (
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(caseItem.caseAcceptedDate).toLocaleDateString()}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground italic">Pending</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onViewCase(caseItem.id)}
                              className="flex items-center space-x-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
