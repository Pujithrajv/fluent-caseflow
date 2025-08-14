import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { RequestSelectionTab } from "./wizard/RequestSelectionTab";
import { SelectedSubprocessDetailsTab } from "./wizard/SelectedSubprocessDetailsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { RequestReviewSubmitTab } from "./wizard/RequestReviewSubmitTab";

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
        <div className="mb-8">
          <div className="flex items-center justify-end mb-4">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 font-fluent">
              In Progress
            </Badge>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left Navigation */}
          <div className="lg:w-80 shrink-0">
            <Card className="sticky top-8 shadow-fluent-8">
              <CardHeader className="pb-4">
                <CardTitle className="font-fluent text-lg">Request Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {requestSteps.map((step, index) => {
                  const isCurrentStep = step.id === currentTab;
                  const isCompleted = isTabCompleted(step.id);
                  const isDisabled = 
                    (step.id === 'details' && !canProceedToDetails()) ||
                    (step.id === 'documents' && !canProceedToDocuments()) ||
                    (step.id === 'review' && !canProceedToDocuments());

                  return (
                    <button
                      key={step.id}
                      onClick={() => !isDisabled && setCurrentTab(step.id)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full rounded-lg border-l-4 p-3.5 text-left transition-all duration-200 group relative",
                        "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        isCurrentStep
                          ? "bg-blue-600 border-l-blue-800 text-white shadow-sm"
                          : isCompleted
                          ? "bg-white border-l-transparent text-gray-900 hover:border-l-gray-200 hover:shadow-sm"
                          : isDisabled
                          ? "bg-white border-l-transparent text-gray-400 cursor-not-allowed"
                          : "bg-white border-l-transparent text-gray-900 hover:border-l-gray-200 hover:shadow-sm cursor-pointer"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          {/* Step number or check */}
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-medium",
                            isCurrentStep
                              ? "bg-white border-white text-blue-600"
                              : isCompleted
                              ? "hidden" // Hide when completed, show check on right instead
                              : "bg-gray-50 border-gray-300 text-gray-500"
                          )}>
                            {!isCompleted && (index + 1)}
                          </div>
                          
                          {/* Step content */}
                          <div className="min-w-0 flex-1">
                            <div className={cn(
                              "font-semibold text-base leading-6 truncate",
                              isCurrentStep ? "text-white" : "text-gray-900"
                            )}>
                              {step.title}
                            </div>
                            <div className={cn(
                              "text-sm leading-5 truncate",
                              isCurrentStep ? "text-blue-100" : "text-gray-500"
                            )}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                        
                        {/* Completed check */}
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-white stroke-2" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
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
                  <RequestReviewSubmitTab 
                    data={formData}
                    onPrevious={goToPreviousTab}
                    onSubmit={() => {
                      // Handle submission logic here
                      console.log('Submitting request:', formData);
                    }}
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