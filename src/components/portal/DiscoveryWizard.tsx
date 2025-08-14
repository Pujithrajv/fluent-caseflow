import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DiscoveryDetailsTab } from "./wizard/DiscoveryDetailsTab";
import { InterrogatoriesQuestionsTab } from "./wizard/InterrogatoriesQuestionsTab";

import { DocumentProductionQuestionsTab } from "./wizard/DocumentProductionQuestionsTab";
import { DepositionQuestionsTab } from "./wizard/DepositionQuestionsTab";
import { InspectionQuestionsTab } from "./wizard/InspectionQuestionsTab";
import { RequestTypeQuestionsTab } from "./wizard/RequestTypeQuestionsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const baseDiscoveryTabs = [
  { id: 'discovery-information', title: 'Discovery Information', description: 'Set discovery schedule and types' },
];

const discoveryTypeComponents = {
  'interrogatories': { component: InterrogatoriesQuestionsTab, title: 'Interrogatories Questions' },
  'document-production': { component: DocumentProductionQuestionsTab, title: 'Document Production Questions' },
  'deposition': { component: DepositionQuestionsTab, title: 'Deposition Questions' },
  'inspection': { component: InspectionQuestionsTab, title: 'Inspection Questions' }
};

const faqData = {
  "discovery-information": [
    {
      id: "discovery-1",
      question: "What types of discovery requests can I make?",
      answer: "You can request Interrogatories, depositions, document production, requests for admission, and requests for inspection."
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
  const [selectedDiscoveryTypes, setSelectedDiscoveryTypes] = useState<string[]>([]);

  // Generate dynamic tabs based on selected discovery types
  const discoveryTabs = [
    ...baseDiscoveryTabs,
    ...selectedDiscoveryTypes.map(type => {
      const componentInfo = discoveryTypeComponents[type as keyof typeof discoveryTypeComponents];
      return {
        id: `${type}-questions`,
        title: componentInfo?.title || `${type.charAt(0).toUpperCase() + type.slice(1)} Questions`,
        description: 'Type-specific questions'
      };
    })
  ];

  // Debug logs to track state changes
  useEffect(() => {
    console.log('Selected discovery types changed:', selectedDiscoveryTypes);
    console.log('Generated tabs:', discoveryTabs);
  }, [selectedDiscoveryTypes, discoveryTabs]);

  const updateFormData = (stepData: any) => {
    console.log('Updating form data:', stepData); // Debug log
    setFormData(prev => {
      const newData = { ...prev, ...stepData };
      
      // Update selected discovery types when they change
      if (stepData.discoveryTypes) {
        console.log('Setting discovery types:', stepData.discoveryTypes); // Debug log
        setSelectedDiscoveryTypes(stepData.discoveryTypes);
      }
      
      return newData;
    });
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
        
        {/* Dynamic Header Above Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">New Discovery Request</h1>
            <p className="text-muted-foreground font-fluent">Complete all sections to create a new case</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            Status: Draft
          </Badge>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue="discovery-information" className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {discoveryTabs.map((tab) => (
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
                      {tab.id === 'discovery-information' && <DiscoveryDetailsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'interrogatories-questions' && <InterrogatoriesQuestionsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'document-production-questions' && <DocumentProductionQuestionsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'deposition-questions' && <DepositionQuestionsTab onDataChange={updateFormData} data={formData} />}
                      {tab.id === 'inspection-questions' && <InspectionQuestionsTab onDataChange={updateFormData} data={formData} />}
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
              Submit Discovery Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}