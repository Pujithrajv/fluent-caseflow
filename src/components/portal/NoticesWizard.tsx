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

const noticesTabs = [
  { id: 'notices-details', title: 'Notice Details', description: 'Notice filing information' },
  { id: 'notices-questions', title: 'Notice Questions', description: 'Type-specific questions' },
  { id: 'documents', title: 'Documents', description: 'Upload notice documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit notice' }
];

const faqData = {
  "notices-details": [
    {
      id: "notice-1",
      question: "What types of notices can I file?",
      answer: "You can file notices of appearance, notices of hearing, notices of appeal, notices of withdrawal, and other procedural notices."
    },
    {
      id: "notice-2",
      question: "What information should be included in a notice?",
      answer: "Include all relevant dates, parties to be notified, the subject matter of the notice, and any required legal citations or references."
    }
  ],
  "notices-questions": [
    {
      id: "questions-1",
      question: "What type of notice am I filing?",
      answer: "Specify the exact type of notice and its purpose - this ensures proper processing and distribution to the correct parties."
    }
  ],
  documents: [
    {
      id: "docs-1",
      question: "What documents should accompany a notice?",
      answer: "Include the notice document itself, any supporting materials, and proof of service if required by court rules."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "How is my notice distributed?",
      answer: "Your notice will be filed with the court and served on all required parties according to the applicable rules of service."
    }
  ]
};

interface NoticesWizardProps {
  onBack?: () => void;
}

export function NoticesWizard({ onBack }: NoticesWizardProps) {
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
        {/* Header with Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
              alt="Illinois Bureau of Administrative Hearings" 
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-3xl font-semibold font-fluent text-foreground">New Notice Filing</h1>
              <p className="text-muted-foreground font-fluent">
                Complete all sections to submit your notice
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="notices-details" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {noticesTabs.map((tab) => (
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
              {noticesTabs.map((tab) => (
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
                      {tab.id === 'notices-details' && <RequestDetailsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'notices-questions' && <RequestTypeQuestionsTab onDataChange={updateFormData} data={formData} />}
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
              Submit Notice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}