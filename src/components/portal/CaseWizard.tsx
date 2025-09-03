import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DepartmentTab } from "./wizard/DepartmentTab";
import { PrimaryPartyTab } from "./wizard/PrimaryPartyTab";
import { CaseDetailsTab } from "./wizard/CaseDetailsTab";
import { CaseQuestionsTab } from "./wizard/CaseQuestionsTab";
import { ParticipantsTab } from "./wizard/ParticipantsTab";
import { RequestWizardTab } from "./wizard/RequestWizardTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";
import { ThankYouTab } from "./wizard/ThankYouTab";
import { RequestWizard } from "./RequestWizard";
import { MotionWizard } from "./MotionWizard";
import { ExhibitWizard } from "./ExhibitWizard";
import { DiscoveryWizard } from "./DiscoveryWizard";
import { CertificatesWizard } from "./CertificatesWizard";
import { DocumentsWizard } from "./DocumentsWizard";
import { PleadingsWizard } from "./PleadingsWizard";
import { NoticesWizard } from "./NoticesWizard";
import { RequestsWizard } from "./RequestsWizard";
import { CaseSummaryTab } from "./wizard/CaseSummaryTab";


const createNewCaseTabs = [
  { id: 'department', title: 'Department', description: 'Agency structure and personnel' },
  { id: 'primary-party', title: 'Primary Party', description: 'Party information' },
  { id: 'case-details', title: 'Case Details', description: 'Case name and details' },
  { id: 'case-questions', title: 'Abandon Well Questions', description: 'Case type specific questions' },
  { id: 'involved-parties', title: 'Participants', description: 'Additional parties' },
  { id: 'document-upload', title: 'Initial Documents', description: 'Upload case documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit case' },
  { id: 'thank-you', title: 'Thank You', description: 'Confirmation and next steps' }
];

const viewEditSubmittedTabs = [
  { id: 'department', title: 'Department', description: 'Agency structure and personnel' },
  { id: 'primary-party', title: 'Primary Party', description: 'Party information' },
  { id: 'case-details', title: 'Case Details', description: 'Case name and details' },
  { id: 'case-questions', title: 'Abandon Well Questions', description: 'Case type specific questions' },
  { id: 'involved-parties', title: 'Participants', description: 'Additional parties' },
  { id: 'document-upload', title: 'Initial Documents', description: 'Uploaded case documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit case' }
];

const viewEditAcceptedTabs = [
  { id: 'case-summary', title: 'Case Summary', description: 'Combined case information' },
  { id: 'involved-parties', title: 'Participants', description: 'Additional parties' },
  { id: 'requests', title: 'Requests', description: 'Associated requests' }
];

const faqData = {
  "case-summary": [
    {
      id: "summary-1",
      question: "What information is included in the Case Summary?",
      answer: "The Case Summary combines information from Department, Primary Party, Case Details, and Abandon Well Questions sections into a single overview for easy review."
    },
    {
      id: "summary-2",
      question: "Can I edit information in the Case Summary?",
      answer: "You can edit individual sections by clicking the edit icon on each card. This will allow you to modify specific information while maintaining the organized summary view."
    },
    {
      id: "summary-3",
      question: "Why is the information grouped this way?",
      answer: "Grouping related information makes it easier to review your case details at a glance and ensures all essential information is captured before proceeding with requests and final submission."
    }
  ],
  department: [
    {
      id: "dept-1",
      question: "How do I select the correct department?",
      answer: "Choose the department that has jurisdiction over your case type. For example, select 'Department of Agriculture' for animal health or environmental issues, 'Department of Transportation' for vehicle-related matters."
    },
    {
      id: "dept-2", 
      question: "What if I don't know my case coordinator?",
      answer: "If you're unsure about the case coordinator, you can leave this field blank initially. The department will assign a coordinator once your case is submitted."
    },
    {
      id: "dept-3",
      question: "What is a department reference number?",
      answer: "This is an internal tracking number used by the department. If you don't have one, you can leave this field empty - one will be assigned to your case."
    }
  ],
  "primary-party": [
    {
      id: "party-1",
      question: "Who is considered the primary party?",
      answer: "The primary party is typically the person or entity who is initiating the case or the main subject of the administrative action."
    },
    {
      id: "party-2",
      question: "What if I'm representing someone else?",
      answer: "If you're an attorney or representative, enter your client's information as the primary party and indicate your role in the representation section."
    },
    {
      id: "party-3",
      question: "How do I format the contact information?",
      answer: "Use standard formatting: phone numbers as (XXX) XXX-XXXX, addresses with complete street, city, state, and ZIP code."
    }
  ],
  "case-details": [
    {
      id: "details-1",
      question: "How should I write the case name?",
      answer: "Use a descriptive but concise name that clearly identifies the case, such as 'License Appeal for John Smith' or 'Environmental Violation Review - ABC Company'."
    },
    {
      id: "details-2",
      question: "What level of detail should I include in the description?",
      answer: "Provide a clear, factual summary of the issue. Include key dates, relevant regulations, and the specific relief you're seeking."
    },
    {
      id: "details-3",
      question: "What if my case involves multiple issues?",
      answer: "List all related issues in your description, but focus on the primary matter. You can provide additional details in later sections."
    }
  ],
  "case-questions": [
    {
      id: "questions-1",
      question: "Why are these questions case-type specific?",
      answer: "Different case types require different information for proper processing. These questions help gather the specific details needed for your type of case."
    },
    {
      id: "questions-2",
      question: "What if a question doesn't apply to my situation?",
      answer: "If a question isn't relevant, you can mark it as 'Not Applicable' or leave it blank if optional. Required fields must be completed."
    },
    {
      id: "questions-3",
      question: "Can I provide additional information not covered by these questions?",
      answer: "Yes, there will be opportunities in later sections to provide additional context and supporting information."
    }
  ],
  "involved-parties": [
    {
      id: "involved-1",
      question: "Who should I list as involved parties?",
      answer: "Include any individuals, organizations, or entities that are directly affected by or have a stake in the outcome of your case."
    },
    {
      id: "involved-2",
      question: "Do I need to include government agencies?",
      answer: "Only include government agencies if they are directly involved in the dispute or have taken specific actions related to your case."
    },
    {
      id: "involved-3",
      question: "What if I don't have complete contact information for all parties?",
      answer: "Provide as much information as possible. The hearing office may help locate missing parties or determine if their participation is necessary."
    }
  ],
  requests: [
    {
      id: "requests-1",
      question: "What types of requests can I make?",
      answer: "You can request various forms of relief such as license reinstatement, fine reduction, permit approval, or reversal of administrative decisions."
    },
    {
      id: "requests-2",
      question: "How specific should my requests be?",
      answer: "Be as specific as possible about what you want the hearing officer to do. Include deadlines, amounts, or specific actions you're seeking."
    },
    {
      id: "requests-3",
      question: "Can I add multiple requests to one case?",
      answer: "Yes, you can include multiple related requests in a single case. Each request should be clearly stated and justified."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "What happens after I submit my case?",
      answer: "Your case will be reviewed by the administrative hearing office. You'll receive confirmation and updates on the status through the system."
    },
    {
      id: "review-2",
      question: "Can I edit my case after submission?",
      answer: "Limited changes may be possible depending on the case status. Contact the hearing office if you need to make important corrections."
    },
    {
      id: "review-3",
      question: "How long does the review process take?",
      answer: "Review times vary by case type and complexity. You'll receive status updates and estimated timelines through the system."
    }
  ]
};

interface CaseWizardProps {
  onBack?: () => void;
  initialTab?: string;
  mode?: 'create' | 'view-edit';
  caseStatus?: 'draft' | 'submitted' | 'accepted';
  caseId?: string;
}

export function CaseWizard({ onBack, initialTab = "department", mode = 'create', caseStatus = 'draft', caseId }: CaseWizardProps) {
  // Seeded data for DBE-2024-001-EC
  const getSeededData = () => {
    if (caseId === "DBE-2024-001-EC") {
      return {
        department: "Department of Natural Resources",
        division: "Office of Oil and Gas Resource Management", 
        bureau: "Plugging and Restoration",
        caseType: "Abandoned Well",
        caseCoordinator: { name: "Jaslyn Blom", email: "jblom@illinois.gov" },
        assignedAttorney: { name: "Sarah Johnson", email: "sjohnson@illinois.gov" },
        finalDecisionMaker: { name: "Jaslyn Blom", email: "jblom@illinois.gov" },
        partyName: "Kirby Neroni",
        isRepresented: "No",
        accessibilityOptions: ["All options"],
        initiatingActionDate: "2025-08-11",
        responsiveActionDate: "2025-08-14",
        permitteeNumber: "5",
        permitNumber: "123",
        numberOfWells: "56",
        caseInitiatedReason: "Inadequate Production",
        productionIssue: "No production for 24 months or more"
      };
    }

    if (caseId === "CASE-2024-001") {
      return {
        department: "Department of Agriculture",
        division: "Animal Health & Welfare", 
        bureau: "Adult Protective Services",
        caseType: "Environment Protection",
        caseCoordinator: { name: "Jaslyn Blom", email: "jblom@illinois.gov" },
        assignedAttorney: { name: "Sarah Johnson", email: "sjohnson@illinois.gov" },
        finalDecisionMaker: { name: "Jaslyn Blom", email: "jblom@illinois.gov" },
        partyName: "Sniders Group",
        isRepresented: "No",
        accessibilityOptions: ["All options"],
        initiatingActionDate: "2024-06-04",
        responsiveActionDate: "2024-06-10",
        permitteeNumber: "8",
        permitNumber: "456",
        numberOfWells: "0",
        caseInitiatedReason: "Routine Inspection",
        productionIssue: "Equipment calibration verification required"
      };
    }

    return {};
  };

  const [formData, setFormData] = useState(getSeededData());
  const [showRequestWizard, setShowRequestWizard] = useState(false);
  const [currentRequestType, setCurrentRequestType] = useState<string | null>(null);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState(caseStatus === 'accepted' ? 'case-summary' : initialTab);
  const [discoverySubTabs, setDiscoverySubTabs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionCaseNumber, setSubmissionCaseNumber] = useState<string | null>(null);

  const isReadOnly = mode === 'view-edit' && caseStatus === 'submitted';
  const isCreateMode = mode === 'create';
  const isPartiallyEditable = mode === 'view-edit' && caseStatus === 'accepted';
  const isSeededCase = caseId === "DBE-2024-001-EC" || caseId === "CASE-2024-001";
  
  // Generate case number format: DBE-YYYY-###-EC (only for accepted cases)
  const generateCaseNumber = () => {
    if (caseStatus === 'accepted') {
      const year = new Date().getFullYear();
      const number = Math.floor(Math.random() * 999) + 1;
      return `DBE-${year}-${number.toString().padStart(3, '0')}-EC`;
    }
    return null;
  };
  
  let wizardTabs;
  if (isCreateMode) {
    wizardTabs = createNewCaseTabs;
  } else if (caseStatus === 'submitted') {
    wizardTabs = viewEditSubmittedTabs;
  } else {
    wizardTabs = viewEditAcceptedTabs;
  }

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const markTabCompleted = (tabId: string) => {
    setCompletedTabs(prev => prev.includes(tabId) ? prev : [...prev, tabId]);
  };

  const isTabCompleted = (tabId: string) => {
    return completedTabs.includes(tabId);
  };

  const getCurrentTabIndex = () => {
    return wizardTabs.findIndex(tab => tab.id === currentTab);
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setCurrentTab(wizardTabs[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < wizardTabs.length - 1) {
      setCurrentTab(wizardTabs[currentIndex + 1].id);
    }
  };

  const isFirstTab = getCurrentTabIndex() === 0;
  const isLastTab = getCurrentTabIndex() === wizardTabs.length - 1;

  const handleSubmitCase = () => {
    // Generate confirmation number
    const year = new Date().getFullYear();
    const number = Math.floor(Math.random() * 9999) + 1;
    const confirmationNumber = `${year}-${number.toString().padStart(4, '0')}`;
    
    setIsSubmitted(true);
    setSubmissionCaseNumber(confirmationNumber);
    setCurrentTab('thank-you');
    markTabCompleted('review');
  };

  const handleAddNewRequest = (type: string) => {
    setCurrentRequestType(type);
    setShowRequestWizard(true);
  };

  const handleRequestWizardBack = () => {
    setShowRequestWizard(false);
    setCurrentRequestType(null);
  };

  if (showRequestWizard && currentRequestType) {
    switch (currentRequestType) {
      case 'requests':
        return <RequestsWizard onBack={handleRequestWizardBack} caseData={formData} />;
      case 'motion':
        return <MotionWizard onBack={handleRequestWizardBack} caseData={formData} />;
      case 'exhibit':
        return <ExhibitWizard onBack={handleRequestWizardBack} />;
      case 'discovery':
        return <DiscoveryWizard onBack={handleRequestWizardBack} />;
      case 'certificates':
        return <CertificatesWizard onBack={handleRequestWizardBack} />;
      case 'documents':
        return <DocumentsWizard onBack={handleRequestWizardBack} />;
      case 'pleadings':
        return <PleadingsWizard onBack={handleRequestWizardBack} />;
      case 'notices':
        return <NoticesWizard onBack={handleRequestWizardBack} />;
      default:
        return <RequestWizard onBack={handleRequestWizardBack} />;
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header - Full Width */}
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        
        {/* Page Header Above Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">
              {isCreateMode ? "Create New Case" : caseId === "DBE-2024-001-EC" ? "Case - DBE-2024-001-EC" : `Case ${caseId || 'Details'}`}
            </h1>
            <p className="text-muted-foreground font-fluent">
              {isCreateMode ? "Complete all sections to create a new case" : "View and edit case information"}
            </p>
          </div>
          {caseId === "DBE-2024-001-EC" ? (
            <div className="flex flex-col gap-2">
              {/* Top row: Accepted + Confidential */}
              <div className="flex items-center gap-2">
                <Badge className="bg-[#4CAF50] text-white text-sm px-3 py-1 rounded-full">
                  Accepted
                </Badge>
                <Badge className="bg-[#6A1B9A] text-white text-sm px-3 py-1 rounded-full">
                  Confidential
                </Badge>
              </div>
              {/* Bottom row: Expedited + Complex */}
              <div className="flex items-center gap-2">
                <Badge className="bg-[#D32F2F] text-white text-sm px-3 py-1 rounded-full">
                  Expedited
                </Badge>
                <Badge className="bg-[#F57C00] text-white text-sm px-3 py-1 rounded-full">
                  Complex
                </Badge>
              </div>
            </div>
          ) : (
            <Badge variant="outline" className="text-sm px-3 py-1">
              Status: {caseStatus === 'draft' ? 'Draft' : caseStatus === 'submitted' ? 'Submitted' : 'Accepted'}
            </Badge>
          )}
        </div>

        {/* Tabs Layout */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full" orientation={isPartiallyEditable ? "horizontal" : "vertical"}>
          <div className={isPartiallyEditable ? "flex flex-col gap-6" : "flex gap-6"}>
            {/* Vertical Tab List */}
            <Card className={isPartiallyEditable ? "shadow-fluent-8 w-full" : "shadow-fluent-8 w-80"}>
              <CardContent className="p-4">
                <TabsList className={isPartiallyEditable ? "justify-start bg-transparent border-b border-border h-14 rounded-none p-0" : "flex flex-col h-auto w-full bg-transparent space-y-2"}>
                  {wizardTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={
                        isPartiallyEditable
                          ? "font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted/50 px-6 py-4 transition-colors"
                          : "w-full justify-between px-4 py-3 min-h-[56px] rounded-lg transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-l-4 data-[state=active]:border-l-primary data-[state=active]:font-medium"
                      }
                      onClick={() => markTabCompleted(tab.id)}
                      aria-current={tab.id === currentTab ? "step" : undefined}
                      aria-checked={isTabCompleted(tab.id) ? "true" : "false"}
                    >
                      {isPartiallyEditable ? (
                        <span className="font-fluent">{tab.title}</span>
                      ) : (
                        <>
                          <div className="text-left">
                            <div className="font-fluent font-medium">{tab.title}</div>
                            <div className="text-xs opacity-75">{tab.description}</div>
                          </div>
                          {isTabCompleted(tab.id) && (
                            <div className="bg-[#107C10] rounded-full w-5 h-5 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="flex-1">
              <TabsContent value="case-summary" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Case Summary</CardTitle>
                         <p className="text-muted-foreground font-fluent">Combined case information</p>
                       </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                              <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Case Summary Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["case-summary"].map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                     <CaseSummaryTab 
                       onDataChange={updateFormData} 
                       data={formData} 
                       isReadOnly={isReadOnly}
                       isSeededCase={isSeededCase}
                     />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="department" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Department</CardTitle>
                         <p className="text-muted-foreground font-fluent">Agency structure and personnel</p>
                       </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                              <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Department Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData.department.map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                     <DepartmentTab 
                       onDataChange={updateFormData} 
                       data={formData} 
                       isReadOnly={isReadOnly}
                       isPartiallyEditable={isPartiallyEditable}
                       isSeededCase={isSeededCase}
                     />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="primary-party" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Primary Party</CardTitle>
                        <p className="text-muted-foreground font-fluent">Party information</p>
                      </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                              <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Primary Party Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["primary-party"].map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                      <PrimaryPartyTab 
                        onDataChange={updateFormData} 
                        data={formData}
                        isReadOnly={isReadOnly}
                        isSeededCase={isSeededCase}
                      />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="case-details" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Case Details</CardTitle>
                        <p className="text-muted-foreground font-fluent">Case name and details</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Case Details Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["case-details"].map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                      <CaseDetailsTab 
                        onDataChange={updateFormData} 
                        data={formData}
                        isReadOnly={isReadOnly}
                        isSeededCase={isSeededCase}
                      />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="case-questions" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Abandon Well Questions</CardTitle>
                        <p className="text-muted-foreground font-fluent">Case type specific questions</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Abandon Well Questions Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["case-questions"].map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                     <CaseQuestionsTab 
                       onDataChange={updateFormData} 
                       data={formData}
                       isReadOnly={isReadOnly}
                       isSeededCase={isSeededCase}
                     />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="involved-parties" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                         <CardTitle className="font-fluent font-semibold">Participants</CardTitle>
                         <p className="text-muted-foreground font-fluent">Additional parties</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Participants Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["involved-parties"].map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                       <ParticipantsTab 
                         onDataChange={updateFormData} 
                         data={formData}
                         isReadOnly={isReadOnly}
                       />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="document-upload" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Document Upload</CardTitle>
                        <p className="text-muted-foreground font-fluent">Upload case documents</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Document Upload Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="doc-1">
                                <AccordionTrigger className="text-left">
                                  What documents should I upload?
                                </AccordionTrigger>
                                <AccordionContent>
                                  Upload any supporting documents relevant to your case, such as contracts, correspondence, permits, or evidence.
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardHeader>
                   <CardContent className="p-6">
                     <DocumentUploadTab 
                       onDataChange={updateFormData} 
                       data={formData}
                       isReadOnly={isReadOnly}
                     />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Requests</CardTitle>
                        <p className="text-muted-foreground font-fluent">Associated requests</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Requests Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData.requests.map((faq) => (
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
                  </CardHeader>
                   <CardContent className="p-6">
                     <RequestWizardTab 
                       onAddNewRequest={handleAddNewRequest} 
                       data={formData}
                       isReadOnly={isReadOnly}
                       isPartiallyEditable={isPartiallyEditable}
                     />
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevious}
                          disabled={isFirstTab}
                        >
                          Previous
                        </Button>
                        <Button onClick={handleNext} disabled={isLastTab}>
                          Next
                        </Button>
                      </div>
                   </CardContent>
                </Card>
               </TabsContent>


               <TabsContent value="review" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Review & Submit</CardTitle>
                        <p className="text-muted-foreground font-fluent">Verify and submit case</p>
                      </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" className="hover:bg-muted/80 focus:bg-muted/80 transition-colors">
                             <HelpCircle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                           </Button>
                         </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Review & Submit Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData.review.map((faq) => (
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
                  </CardHeader>
                  <CardContent className="p-6">
                      <ReviewSubmitTab 
                        data={formData} 
                        isLastTab={isLastTab}
                        mode={mode}
                        caseStatus={caseStatus}
                        caseNumber={generateCaseNumber()}
                        isReadOnly={isReadOnly}
                      />
                     {/* Navigation Buttons */}
                     <div className="flex justify-between pt-6 border-t mt-6">
                       <Button 
                         variant="outline" 
                         onClick={handlePrevious}
                         disabled={isFirstTab}
                       >
                         Previous
                       </Button>
                        {isCreateMode && !isSubmitted ? (
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={handleSubmitCase}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Submit Case
                          </Button>
                        ) : null}
                     </div>
                  </CardContent>
                 </Card>
               </TabsContent>

               <TabsContent value="thank-you" className="mt-0">
                 <Card className="shadow-fluent-16">
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Thank You</CardTitle>
                         <p className="text-muted-foreground font-fluent">Confirmation and next steps</p>
                       </div>
                     </div>
                   </CardHeader>
                   <CardContent className="p-6">
                     <ThankYouTab caseNumber={submissionCaseNumber} />
                   </CardContent>
                 </Card>
               </TabsContent>
             </div>
           </div>
         </Tabs>

      </div>
    </div>
  );
}