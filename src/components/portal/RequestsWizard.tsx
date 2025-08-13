import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequestSelectionTab } from "./wizard/RequestSelectionTab";
import { SelectedSubprocessDetailsTab } from "./wizard/SelectedSubprocessDetailsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const requestSteps = [
  { id: 'request', title: 'Request', description: 'Select request group and type' },
  { id: 'details', title: 'Selected Subprocess Details', description: 'Provide specific details for your request' },
  { id: 'documents', title: 'Documents', description: 'Upload required documents' },
  { id: 'review', title: 'Review & Submit', description: 'Review and submit your request' }
];

const faqData = {
  "request": [
    {
      id: "request-1",
      question: "What request groups are available?",
      answer: "You can select from Motion, Exhibit, Discovery, Certificate, Pleading, or Notices. Each group has specific types available."
    },
    {
      id: "request-2",
      question: "How do I choose the right request type?",
      answer: "First select your request group, then choose the specific type from the dropdown. The available types will change based on your group selection."
    }
  ],
  "details": [
    {
      id: "details-1",
      question: "What information is required in this step?",
      answer: "The required information depends on your selected request type. Motion requests require details about consultation and outcomes, while exhibits require content review questions."
    },
    {
      id: "details-2",
      question: "Can I save my progress?",
      answer: "Yes, your progress is automatically saved as you complete each section. You can return to finish your request later."
    }
  ],
  documents: [
    {
      id: "docs-1",
      question: "What documents are required?",
      answer: "Required documents vary by request type and case type. You'll see a list of required documents that must be uploaded before submission."
    },
    {
      id: "docs-2",
      question: "What file formats are supported?",
      answer: "Supported formats include PDF, DOC, DOCX, XLS, XLSX, JPG, and PNG files. Maximum file size is 10MB per file."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "What happens after I submit my request?",
      answer: "Your request will be reviewed and processed according to the administrative hearing procedures. You'll receive updates on the status of your request."
    }
  ]
};

interface RequestsWizardProps {
  onBack?: () => void;
  caseData?: any;
}

export function RequestsWizard({ onBack, caseData }: RequestsWizardProps) {
  const defaultCaseData = { caseType: 'Abandoned Well', ...caseData };
  const [currentTab, setCurrentTab] = useState("request");
  const [formData, setFormData] = useState<any>({});
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

  // Navigation functions
  const goToNextTab = () => {
    const currentIndex = requestSteps.findIndex(step => step.id === currentTab);
    if (currentIndex < requestSteps.length - 1) {
      setCurrentTab(requestSteps[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = requestSteps.findIndex(step => step.id === currentTab);
    if (currentIndex > 0) {
      setCurrentTab(requestSteps[currentIndex - 1].id);
    }
  };

  // Check if we can proceed to next step
  const canProceedToDetails = () => {
    return formData.requestGroup && formData.requestType;
  };

  const canProceedToDocuments = () => {
    // Basic validation - specific validation depends on request type
    return formData.requestGroup && formData.requestType;
  };

  const canSubmit = () => {
    // Check if all required documents are uploaded
    return formData.allRequiredDocumentsUploaded;
  };

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
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Dynamic Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-2xl font-semibold text-foreground font-fluent">
              Requests
            </h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 font-fluent">
              In Progress
            </Badge>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left Navigation */}
          <div className="lg:w-80 shrink-0">
            <Card className="sticky top-8 shadow-fluent-8">
              <CardHeader>
                <CardTitle className="font-fluent text-lg">Request Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs orientation="vertical" value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-rows-4 h-auto bg-transparent p-0">
                    {requestSteps.map((step, index) => (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        className={`
                          w-full justify-start px-4 py-4 text-left data-[state=active]:bg-accent rounded-none
                          ${index !== requestSteps.length - 1 ? 'border-b border-border' : ''}
                          ${step.id === 'details' && !canProceedToDetails() ? 'opacity-50 cursor-not-allowed' : ''}
                          ${step.id === 'documents' && !canProceedToDocuments() ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={
                          (step.id === 'details' && !canProceedToDetails()) ||
                          (step.id === 'documents' && !canProceedToDocuments()) ||
                          (step.id === 'review' && !canProceedToDocuments())
                        }
                      >
                        <div className="flex items-start space-x-3 w-full">
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0
                            ${isTabCompleted(step.id) 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-muted-foreground/30 text-muted-foreground'
                            }
                          `}>
                            {isTabCompleted(step.id) ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <span className="text-xs font-medium">{index + 1}</span>
                            )}
                          </div>
                          <div className="text-left min-w-0 flex-1">
                            <div className="font-medium text-sm font-fluent leading-tight">
                              {step.title}
                            </div>
                            <div className="text-xs text-muted-foreground font-fluent mt-1 leading-tight">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
              <div className="space-y-6">
                <Tabs orientation="vertical" value={currentTab} onValueChange={setCurrentTab} className="w-full">
                
                {/* Request Selection */}
                <TabsContent value="request" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold font-fluent">Request</h2>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Request Help</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <Accordion type="single" collapsible className="w-full">
                            {faqData.request.map((faq) => (
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
                  <RequestSelectionTab 
                    onDataChange={updateFormData} 
                    data={formData}
                    onComplete={() => markTabCompleted('request')}
                    onNext={goToNextTab}
                  />
                </TabsContent>

                {/* Selected Subprocess Details */}
                <TabsContent value="details" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold font-fluent">Selected Subprocess Details</h2>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Details Help</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <Accordion type="single" collapsible className="w-full">
                            {faqData.details.map((faq) => (
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
                  <SelectedSubprocessDetailsTab 
                    onDataChange={updateFormData} 
                    data={formData}
                    onComplete={() => markTabCompleted('details')}
                    onNext={goToNextTab}
                    onPrevious={goToPreviousTab}
                  />
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold font-fluent">Document Upload</h2>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Document Upload Help</SheetTitle>
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
                  <DocumentUploadTab 
                    onDataChange={updateFormData} 
                    data={{...defaultCaseData, ...formData}}
                    onNext={goToNextTab}
                    onPrevious={goToPreviousTab}
                  />
                </TabsContent>

                {/* Review & Submit */}
                <TabsContent value="review" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold font-fluent">Review & Submit</h2>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
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
                  <ReviewSubmitTab 
                    data={formData}
                  />
                </TabsContent>

              </Tabs>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!canSubmit()}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}