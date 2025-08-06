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

const discoveryTabs = [
  { id: 'discovery-details', title: 'Discovery Details', description: 'Discovery request information' },
  { id: 'discovery-questions', title: 'Discovery Questions', description: 'Type-specific questions' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit discovery' }
];

const faqData = {
  "discovery-details": [
    {
      id: "discovery-1",
      question: "What types of discovery requests can I make?",
      answer: "You can request interrogatories, depositions, document production, requests for admission, and requests for inspection."
    },
    {
      id: "discovery-2",
      question: "What should I include in my discovery request?",
      answer: "Be specific about what information or documents you're seeking. Include relevant time periods, parties involved, and the scope of your request."
    }
  ],
  "discovery-questions": [
    {
      id: "questions-1",
      question: "What type of discovery am I requesting?",
      answer: "Specify whether you're seeking documents, interrogatory responses, depositions, or other forms of discovery."
    }
  ],
  documents: [
    {
      id: "docs-1",
      question: "What documents support my discovery request?",
      answer: "Include any relevant correspondence, prior discovery responses, or documents that justify your discovery request."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "What happens after I submit my discovery request?",
      answer: "Your discovery request will be served on the opposing party, who typically has 30 days to respond unless otherwise specified by court rules."
    }
  ]
};

interface DiscoveryWizardProps {
  onBack?: () => void;
}

export function DiscoveryWizard({ onBack }: DiscoveryWizardProps) {
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
            <h1 className="text-3xl font-semibold font-fluent text-foreground">New Discovery Request</h1>
            <p className="text-muted-foreground font-fluent">
              Complete all sections to submit your discovery request
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="discovery-details" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {discoveryTabs.map((tab) => (
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
              {discoveryTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <Card className="shadow-fluent-16">
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
                    <CardContent className="p-6">
                      {tab.id === 'discovery-details' && <RequestDetailsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'discovery-questions' && <RequestTypeQuestionsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'documents' && <DocumentUploadTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'review' && <ReviewSubmitTab formData={formData} />}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
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
              Submit Discovery Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}