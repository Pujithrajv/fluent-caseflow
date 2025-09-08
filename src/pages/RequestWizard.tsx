import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequestSelectionTab } from "@/components/portal/wizard/RequestSelectionTab";
import { SelectedSubprocessDetailsTab } from "@/components/portal/wizard/SelectedSubprocessDetailsTab";
import { DocumentUploadTab } from "@/components/portal/wizard/DocumentUploadTab";
import { RequestReviewSubmitTab } from "@/components/portal/wizard/RequestReviewSubmitTab";

const requestTabs = [
  { id: 'request', title: 'Request', description: 'Request group and type' },
  { id: 'details', title: 'Selected Subprocess Details', description: 'Request specific details' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit request' }
];

const faqData = {
  "request": [
    {
      id: "req-1",
      question: "How do I select the correct request type?",
      answer: "Choose the request type that best matches your specific need. For example, select 'Discovery' for discovery requests, 'Motion' for motions."
    },
    {
      id: "req-2",
      question: "What should I include in the request summary?",
      answer: "Provide a clear, concise summary of what you're requesting and why. Include relevant dates, reference numbers, and the specific outcome you're seeking."
    }
  ],
  "details": [
    {
      id: "details-1",
      question: "Why do I need to provide specific details?",
      answer: "Different request types require specific information for proper processing. These details ensure we gather all necessary information for your particular request type."
    }
  ],
  "documents": [
    {
      id: "docs-1",
      question: "What types of documents can I upload?",
      answer: "You can upload PDFs, Word documents, images (JPEG, PNG), and other standard file formats. Each file should be under 10MB."
    },
    {
      id: "docs-2",
      question: "Are documents required for all requests?",
      answer: "Document requirements vary by request type. Some requests may not require any documents, while others may require specific supporting materials."
    }
  ],
  "review": [
    {
      id: "review-1",
      question: "What happens after I submit my request?",
      answer: "Your request will be reviewed and processed according to the type and priority. You'll receive confirmation and status updates through the system."
    },
    {
      id: "review-2",
      question: "Can I edit my request after submission?",
      answer: "Limited changes may be possible depending on the processing status. Contact the office if you need to make important corrections."
    }
  ]
};

interface RequestData {
  requestGroup?: string;
  requestType?: string;
  details?: any;
  documents?: any[];
}

const RequestWizard = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<RequestData>({});
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

  const handleSubmit = () => {
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully and will be reviewed.",
    });
    navigate(`/attorney/case/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header with Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
              alt="Illinois Bureau of Administrative Hearings" 
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-3xl font-semibold font-fluent text-foreground">New Request</h1>
              <p className="text-muted-foreground font-fluent">
                Complete all sections to create your request
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/attorney/case/${caseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="request" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80 bg-white">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {requestTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full justify-between px-4 py-3 min-h-[56px] rounded-lg transition-all duration-200 bg-background text-foreground border border-border hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-l-4 data-[state=active]:border-l-primary data-[state=active]:font-medium"
                      onClick={() => markTabCompleted(tab.id)}
                      aria-checked={isTabCompleted(tab.id) ? "true" : "false"}
                    >
                      <div className="text-left">
                        <div className="font-fluent font-medium">{tab.title}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <div className="bg-[#107C10] rounded-full w-5 h-5 flex items-center justify-center">
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
              {requestTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <Card className="shadow-fluent-16 bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="font-fluent font-semibold">{tab.title}</CardTitle>
                          <p className="text-muted-foreground font-fluent">{tab.description}</p>
                        </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-5 w-5" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>{tab.title} Help</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6">
                              <Accordion type="single" collapsible className="w-full">
                                {faqData[tab.id as keyof typeof faqData]?.map((faq) => (
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
                    <CardContent className="p-6 bg-white">
                      {tab.id === 'request' && (
                        <RequestSelectionTab
                          data={formData}
                          onDataChange={updateFormData}
                          onComplete={() => markTabCompleted('request')}
                        />
                      )}
                      {tab.id === 'details' && (
                        <SelectedSubprocessDetailsTab
                          data={formData}
                          onDataChange={updateFormData}
                          onComplete={() => markTabCompleted('details')}
                        />
                      )}
                      {tab.id === 'documents' && (
                        <DocumentUploadTab
                          data={formData}
                          onDataChange={updateFormData}
                        />
                      )}
                      {tab.id === 'review' && (
                        <RequestReviewSubmitTab
                          data={formData}
                          onSubmit={handleSubmit}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 pb-4">
          <Button variant="outline" onClick={() => navigate(`/attorney/case/${caseId}`)} className="font-fluent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="font-fluent">
              Save Draft
            </Button>
            <Button className="font-fluent" onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestWizard;