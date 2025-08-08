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
import { InvolvedPartiesTab } from "./wizard/InvolvedPartiesTab";
import { RequestWizardTab } from "./wizard/RequestWizardTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";
import { RequestWizard } from "./RequestWizard";
import { MotionWizard } from "./MotionWizard";
import { ExhibitWizard } from "./ExhibitWizard";
import { DiscoveryWizard } from "./DiscoveryWizard";
import { CertificatesWizard } from "./CertificatesWizard";
import { DocumentsWizard } from "./DocumentsWizard";
import { NoticesWizard } from "./NoticesWizard";

const wizardTabs = [
  { id: 'department', title: 'Department', description: 'Agency structure and personnel' },
  { id: 'primary-party', title: 'Primary Party', description: 'Party information' },
  { id: 'case-details', title: 'Case Details', description: 'Case name and details' },
  { id: 'case-questions', title: 'Abandon Well Questions', description: 'Case type specific questions' },
  { id: 'involved-parties', title: 'Involved Parties', description: 'Additional parties' },
  { id: 'requests', title: 'Requests', description: 'Associated requests' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit case' }
];

const faqData = {
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
  readOnly?: boolean;
}

export function CaseWizard({ onBack, initialTab = "department", readOnly = false }: CaseWizardProps) {
  const [formData, setFormData] = useState({});
  const [showRequestWizard, setShowRequestWizard] = useState(false);
  const [currentRequestType, setCurrentRequestType] = useState<string | null>(null);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const markTabCompleted = (tabId: string) => {
    setCompletedTabs(prev => prev.includes(tabId) ? prev : [...prev, tabId]);
  };

  const isTabCompleted = (tabId: string) => {
    return completedTabs.includes(tabId);
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
      case 'motion':
        return <MotionWizard onBack={handleRequestWizardBack} />;
      case 'exhibit':
        return <ExhibitWizard onBack={handleRequestWizardBack} />;
      case 'discovery':
        return <DiscoveryWizard onBack={handleRequestWizardBack} />;
      case 'certificates':
        return <CertificatesWizard onBack={handleRequestWizardBack} />;
      case 'documents':
        return <DocumentsWizard onBack={handleRequestWizardBack} />;
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
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                  alt="Illinois Bureau of Administrative Hearings" 
                  className="h-16 w-auto object-contain"
                />
                <div>
                  <h1 className="text-3xl font-semibold font-fluent text-foreground">
                    {readOnly ? "" : "Create New Case"}
                  </h1>
                  <p className="text-muted-foreground font-fluent">
                    Complete all sections to create a new case
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Status: Draft
                </Badge>
              </div>
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

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue={initialTab} className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {wizardTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full justify-between px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => markTabCompleted(tab.id)}
                    >
                      <div className="text-left">
                        <div className="font-fluent font-medium">{tab.title}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <Check className="h-4 w-4 text-success" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="flex-1">
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
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
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
                    <DepartmentTab onDataChange={updateFormData} data={formData} />
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
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
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
                    <PrimaryPartyTab onDataChange={updateFormData} data={formData} />
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
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
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
                    <CaseDetailsTab onDataChange={updateFormData} data={formData} />
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
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
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
                    <CaseQuestionsTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="involved-parties" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Involved Parties</CardTitle>
                        <p className="text-muted-foreground font-fluent">Additional parties</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Involved Parties Help</SheetTitle>
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
                    <InvolvedPartiesTab onDataChange={updateFormData} data={formData} />
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
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
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
                      onDataChange={updateFormData} 
                      data={formData} 
                      onAddNewRequest={handleAddNewRequest}
                    />
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
                        <Badge variant="destructive" className="px-4 py-1 text-xs font-fluent mt-2">
                          Expedited
                        </Badge>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
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
                    <ReviewSubmitTab formData={formData} />
                    {/* Submit Case Button - Only on Review & Submit */}
                    {!readOnly && (
                      <div className="flex justify-between pt-6 border-t mt-6">
                        <Button variant="outline">
                          Previous
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Check className="mr-2 h-4 w-4" />
                          Submit Case
                        </Button>
                      </div>
                    )}
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