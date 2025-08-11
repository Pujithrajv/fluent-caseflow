import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RequestDetailsTab } from "./wizard/RequestDetailsTab";
import { RequestTypeQuestionsTab } from "./wizard/RequestTypeQuestionsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const exhibitTabs = [
  { id: 'exhibit-details', title: 'Exhibit Details', description: 'Exhibit information and description' },
  { id: 'documents', title: 'Documents', description: 'Upload exhibit files' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit exhibit' }
];

const faqData = {
  "exhibit-details": [
    {
      id: "exhibit-1",
      question: "What is an exhibit?",
      answer: "An exhibit is a document, object, or other item presented as evidence in a legal proceeding."
    },
    {
      id: "exhibit-2",
      question: "How should I label my exhibit?",
      answer: "Exhibits should be clearly labeled with letters (A, B, C) or numbers (1, 2, 3) and include a brief description."
    }
  ],
  "exhibit-questions": [
    {
      id: "questions-1",
      question: "What type of exhibit am I submitting?",
      answer: "Specify whether it's a document, photograph, physical object, digital file, or other type of evidence."
    }
  ],
  documents: [
    {
      id: "docs-1",
      question: "What file formats are accepted for exhibits?",
      answer: "Most common formats are accepted including PDF, JPEG, PNG, TIFF for documents and images, and MP4 for video exhibits."
    }
  ],
  review: [
    {
      id: "review-1",
      question: "How will my exhibit be processed?",
      answer: "Your exhibit will be reviewed for relevance and admissibility, then marked and entered into the case record."
    }
  ]
};

interface ExhibitWizardProps {
  onBack?: () => void;
}

export function ExhibitWizard({ onBack }: ExhibitWizardProps) {
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
              <div>
                <h1 className="text-3xl font-semibold font-fluent text-foreground">New Exhibit</h1>
                <p className="text-muted-foreground font-fluent">
                  Complete all sections to submit your exhibit
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-6">

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="exhibit-details" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {exhibitTabs.map((tab) => (
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
              {exhibitTabs.map((tab) => (
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
                      {tab.id === 'exhibit-details' && <RequestDetailsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'documents' && <DocumentUploadTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'review' && <ReviewSubmitTab data={formData} />}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 pb-4">
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
              Submit Exhibit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}