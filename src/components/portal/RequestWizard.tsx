import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequestDetailsTab } from "./wizard/RequestDetailsTab";
import { RequestTypeQuestionsTab } from "./wizard/RequestTypeQuestionsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const requestTabs = [
  { id: 'request-details', title: 'Request Details', description: 'Request information and summary' },
  { id: 'request-questions', title: 'Request Type Questions', description: 'Type-specific questions' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit request' }
];

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
}

export function RequestWizard({ onBack }: RequestWizardProps) {
  const [formData, setFormData] = useState({});
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">Add New Request</h1>
            <p className="text-muted-foreground font-fluent">
              Complete all sections to submit your request
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="request-details" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {requestTabs.map((tab) => (
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
              <TabsContent value="request-details" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-fluent font-semibold">Request Details</CardTitle>
                        <p className="text-muted-foreground font-fluent">Request information and summary</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Request Details Help</SheetTitle>
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
                  <CardContent className="p-6">
                    <RequestDetailsTab onDataChange={updateFormData} data={formData} />
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
                  <CardContent className="p-6">
                    <DocumentUploadTab onDataChange={updateFormData} data={formData} />
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
                  <CardContent className="p-6">
                    <ReviewSubmitTab formData={formData} />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="font-fluent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="fluent" className="font-fluent">
              Save Draft
            </Button>
            <Button className="font-fluent" onClick={onBack}>
              <Check className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}