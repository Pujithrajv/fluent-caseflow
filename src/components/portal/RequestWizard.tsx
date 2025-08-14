import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequestSelectionTab } from "./wizard/RequestSelectionTab";
import { RequestTypeQuestionsTab } from "./wizard/RequestTypeQuestionsTab";
import { SelectedSubprocessDetailsTab } from "./wizard/SelectedSubprocessDetailsTab";
import { InterrogatoriesQuestionsTab } from "./wizard/InterrogatoriesQuestionsTab";
import { DocumentProductionQuestionsTab } from "./wizard/DocumentProductionQuestionsTab";
import { DepositionQuestionsTab } from "./wizard/DepositionQuestionsTab";
import { InspectionQuestionsTab } from "./wizard/InspectionQuestionsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { RequestReviewSubmitTab } from "./wizard/RequestReviewSubmitTab";

const getRequestTabs = (formData: any) => {
  // All request types start with Request step and Selected Subprocess Details
  const tabs = [
    { id: 'request', title: 'Request', description: 'Request group and type' },
    { id: 'selected-subprocess-details', title: 'Selected Subprocess Details', description: 'Request specific details' }
  ];

  // Add dynamic discovery sub-tabs based on selected types for Discovery requests
  if (formData.requestGroup === 'discovery') {
    if (formData.selectedDiscoveryTypes?.includes('interrogatories')) {
      tabs.push({ id: 'interrogatories-questions', title: 'Interrogatories Questions', description: 'Interrogatories details' });
    }
    if (formData.selectedDiscoveryTypes?.includes('document-production')) {
      tabs.push({ id: 'document-production-questions', title: 'Document Production Questions', description: 'Document production details' });
    }
    if (formData.selectedDiscoveryTypes?.includes('deposition')) {
      tabs.push({ id: 'deposition-questions', title: 'Deposition Questions', description: 'Deposition scheduling and details' });
    }
    if (formData.selectedDiscoveryTypes?.includes('inspection')) {
      tabs.push({ id: 'inspection-questions', title: 'Inspection Questions', description: 'Inspection requirements and details' });
    }
  }

  // Add final steps
  tabs.push(
    { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
    { id: 'review', title: 'Review & Submit', description: 'Verify and submit request' }
  );

  return tabs;
};

const faqData = {
  "request-details": [
    {
      id: "req-1",
      question: "How do I select the correct request type?",
      answer: "Choose the request type that best matches your specific need. For example, select 'License Application' for new licenses, 'Appeal Request' for challenging decisions."
    },
    {
      id: "req-2",
      question: "What should I include in the request summary?",
      answer: "Provide a clear, concise summary of what you're requesting and why. Include relevant dates, reference numbers, and the specific outcome you're seeking."
    },
    {
      id: "req-3",
      question: "What if I don't have a case ID yet?",
      answer: "If you're creating a new request without an existing case, leave the case ID field empty - one will be assigned automatically."
    }
  ],
  "request-questions": [
    {
      id: "questions-1",
      question: "Why do I need to answer type-specific questions?",
      answer: "Different request types require specific information for proper processing. These questions ensure we gather all necessary details for your particular request type."
    },
    {
      id: "questions-2",
      question: "What if a question doesn't apply to my request?",
      answer: "If a question isn't relevant to your situation, you can mark it as 'Not Applicable' or leave it blank if it's optional."
    },
    {
      id: "questions-3",
      question: "Can I provide additional information?",
      answer: "Yes, there are text areas where you can provide additional context or clarification for your responses."
    }
  ],
  documents: [
    {
      id: "docs-1",
      question: "What types of documents can I upload?",
      answer: "You can upload PDFs, Word documents, images (JPEG, PNG), and other standard file formats. Each file should be under 10MB."
    },
    {
      id: "docs-2",
      question: "Are documents required for all requests?",
      answer: "Document requirements vary by request type. Some requests may not require any documents, while others may require specific supporting materials."
    },
    {
      id: "docs-3",
      question: "How do I organize multiple documents?",
      answer: "Use clear, descriptive file names and group related documents together. You can add descriptions to help explain each document's purpose."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "What happens after I submit my request?",
      answer: "Your request will be reviewed and processed according to the type and priority. You'll receive confirmation and status updates through the system."
    },
    {
      id: "review-2",
      question: "Can I edit my request after submission?",
      answer: "Limited changes may be possible depending on the processing status. Contact the office if you need to make important corrections."
    },
    {
      id: "review-3",
      question: "How long does processing take?",
      answer: "Processing times vary by request type and complexity. You'll receive estimated timelines and status updates through the system."
    }
  ]
};

interface RequestWizardProps {
  onBack?: () => void;
  requestType?: string;
  status?: "draft" | "submitted" | "accepted" | "rejected" | "in-progress" | "completed";
}

export function RequestWizard({ onBack, requestType, status = "draft" }: RequestWizardProps) {
  const [formData, setFormData] = useState({ 
    requestGroup: requestType === 'discovery' ? 'discovery' : '',
    requestType: requestType === 'discovery' ? 'discovery' : ''
  });
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('request');
  
  const requestTabs = getRequestTabs(formData);

  const getRequestTitle = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'motion': case 'motions': return 'New Motion';
      case 'exhibit': return 'New Exhibit';
      case 'discovery': return 'New Discovery Request';
      case 'certificates': case 'certificate': return 'New Certificate Request';
      case 'pleadings': case 'documents': return 'New Pleading Submission';
      case 'notices': case 'notice': return 'New Notice Filing';
      default: return 'Add New Request';
    }
  };

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
    return requestTabs.findIndex(tab => tab.id === currentTab);
  };

  const goToNextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < requestTabs.length - 1) {
      setCurrentTab(requestTabs[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setCurrentTab(requestTabs[currentIndex - 1].id);
    }
  };

  const isFirstTab = getCurrentTabIndex() === 0;
  const isLastTab = getCurrentTabIndex() === requestTabs.length - 1;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Dynamic Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">{getRequestTitle(requestType)}</h1>
            <p className="text-muted-foreground font-fluent">
              Complete all sections to create a new case.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={status} />
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case
            </Button>
          </div>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardHeader>
                <CardTitle className="font-fluent text-lg">Request Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {requestTabs.map((tab, index) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full justify-between px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      disabled={index > getCurrentTabIndex() + 1}
                    >
                      <div className="text-left">
                        <div className="font-fluent font-medium">{tab.title}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="flex-1">
              <TabsContent value="request" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Request</CardTitle>
                        <p className="text-muted-foreground font-fluent">Select request group and type</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Request Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["request-details"].map((faq) => (
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
                  <CardContent className="space-y-6">
                    <RequestSelectionTab 
                      onDataChange={updateFormData} 
                      data={formData} 
                      onComplete={() => markTabCompleted('request')}
                      onNext={goToNextTab}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="request-questions" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Request Type Questions</CardTitle>
                        <p className="text-muted-foreground font-fluent">Type-specific questions</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Request Type Questions Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData["request-questions"].map((faq) => (
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
                     <RequestTypeQuestionsTab onDataChange={updateFormData} data={formData} />
                   </CardContent>
                 </Card>
               </TabsContent>

                <TabsContent value="selected-subprocess-details" className="mt-0">
                  <Card className="shadow-fluent-16">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="font-fluent font-semibold">
                            {formData.requestGroup === 'motion' ? 'Motion Details' :
                             formData.requestGroup === 'exhibit' ? 'Exhibit Type Questions' :
                             formData.requestGroup === 'discovery' ? 'Discovery Information' :
                             'Request Details'}
                          </CardTitle>
                          <p className="text-muted-foreground font-fluent">
                            {formData.requestGroup === 'discovery' ? 'Discovery details and configuration' : 'Request specific details'}
                          </p>
                        </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-5 w-5" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>
                                {formData.requestGroup === 'discovery' ? 'Discovery Information Help' : 'Request Details Help'}
                              </SheetTitle>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </CardHeader>
                     <CardContent className="space-y-6">
                       <SelectedSubprocessDetailsTab 
                         onDataChange={updateFormData} 
                         data={formData} 
                         onComplete={() => markTabCompleted('selected-subprocess-details')}
                         onPrevious={goToPreviousTab}
                         onNext={goToNextTab}
                       />
                     </CardContent>
                  </Card>
                </TabsContent>

               <TabsContent value="interrogatories-questions" className="mt-0">
                 <Card className="shadow-fluent-16">
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Interrogatories Questions</CardTitle>
                         <p className="text-muted-foreground font-fluent">Interrogatories questions and details</p>
                       </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
                           </Button>
                         </SheetTrigger>
                         <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                           <SheetHeader>
                             <SheetTitle>Interrogatories Help</SheetTitle>
                           </SheetHeader>
                         </SheetContent>
                       </Sheet>
                     </div>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <InterrogatoriesQuestionsTab onDataChange={updateFormData} data={formData} />
                     <div className="flex justify-between pt-4">
                       <Button variant="outline" onClick={goToPreviousTab} disabled={isFirstTab}>
                         Previous
                       </Button>
                       <Button onClick={goToNextTab} disabled={isLastTab}>
                         Next
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </TabsContent>

               <TabsContent value="document-production-questions" className="mt-0">
                 <Card className="shadow-fluent-16">
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Document Production Questions</CardTitle>
                         <p className="text-muted-foreground font-fluent">Document production details</p>
                       </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
                           </Button>
                         </SheetTrigger>
                         <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                           <SheetHeader>
                             <SheetTitle>Document Production Help</SheetTitle>
                           </SheetHeader>
                         </SheetContent>
                       </Sheet>
                     </div>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <DocumentProductionQuestionsTab onDataChange={updateFormData} data={formData} />
                     <div className="flex justify-between pt-4">
                       <Button variant="outline" onClick={goToPreviousTab} disabled={isFirstTab}>
                         Previous
                       </Button>
                       <Button onClick={goToNextTab} disabled={isLastTab}>
                         Next
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </TabsContent>

               <TabsContent value="deposition-questions" className="mt-0">
                 <Card className="shadow-fluent-16">
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Deposition Questions</CardTitle>
                         <p className="text-muted-foreground font-fluent">Deposition scheduling and details</p>
                       </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
                           </Button>
                         </SheetTrigger>
                         <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                           <SheetHeader>
                             <SheetTitle>Deposition Help</SheetTitle>
                           </SheetHeader>
                         </SheetContent>
                       </Sheet>
                     </div>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <DepositionQuestionsTab onDataChange={updateFormData} data={formData} />
                     <div className="flex justify-between pt-4">
                       <Button variant="outline" onClick={goToPreviousTab} disabled={isFirstTab}>
                         Previous
                       </Button>
                       <Button onClick={goToNextTab} disabled={isLastTab}>
                         Next
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </TabsContent>

               <TabsContent value="inspection-questions" className="mt-0">
                 <Card className="shadow-fluent-16">
                   <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="font-fluent font-semibold">Inspection Questions</CardTitle>
                         <p className="text-muted-foreground font-fluent">Inspection requirements and details</p>
                       </div>
                       <Sheet>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon">
                             <HelpCircle className="h-5 w-5" />
                           </Button>
                         </SheetTrigger>
                         <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                           <SheetHeader>
                             <SheetTitle>Inspection Help</SheetTitle>
                           </SheetHeader>
                         </SheetContent>
                       </Sheet>
                     </div>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <InspectionQuestionsTab onDataChange={updateFormData} data={formData} />
                     <div className="flex justify-between pt-4">
                       <Button variant="outline" onClick={goToPreviousTab} disabled={isFirstTab}>
                         Previous
                       </Button>
                       <Button onClick={goToNextTab} disabled={isLastTab}>
                         Next
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Documents</CardTitle>
                        <p className="text-muted-foreground font-fluent">Upload supporting documents</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Documents Help</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <Accordion type="single" collapsible className="w-full">
                              {faqData.documents.map((faq) => (
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
                  <CardContent className="space-y-6">
                    <DocumentUploadTab onDataChange={updateFormData} data={formData} />
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousTab} disabled={isFirstTab}>
                        Previous
                      </Button>
                      <Button onClick={goToNextTab} disabled={isLastTab}>
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
                        <p className="text-muted-foreground font-fluent">Verify and submit request</p>
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
                  <CardContent className="space-y-6">
                    <RequestReviewSubmitTab 
                      data={formData} 
                      onPrevious={goToPreviousTab}
                      onSubmit={() => console.log('Submit Discovery Request')}
                    />
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