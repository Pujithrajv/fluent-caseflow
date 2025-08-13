import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExhibitDepartmentTab } from "./wizard/ExhibitDepartmentTab";
import { ExhibitTypeTab } from "./wizard/ExhibitTypeTab";
import { ExhibitQuestionsTab } from "./wizard/ExhibitQuestionsTab";
import { ExhibitUploadTab } from "./wizard/ExhibitUploadTab";
import { ExhibitConfirmationTab } from "./wizard/ExhibitConfirmationTab";

const exhibitTabs = [
  { id: 'department', title: 'Department & Rules', description: 'Department identification and rules acknowledgment' },
  { id: 'exhibit-type', title: 'Exhibit Type', description: 'Select type and provide details' },
  { id: 'questions', title: 'Content Review', description: 'Answer content and privacy questions' },
  { id: 'upload', title: 'Upload', description: 'Upload exhibit files' },
  { id: 'confirmation', title: 'Confirmation', description: 'Review submission confirmation' }
];

const faqData = {
  "department": [
    {
      id: "dept-1",
      question: "What are the rules for exhibit submission?",
      answer: "All exhibits must be relevant, properly formatted, and free of inappropriate content. PII must be redacted and confidential information requires protective orders."
    }
  ],
  "exhibit-type": [
    {
      id: "type-1",
      question: "What's the difference between document types?",
      answer: "Regular documents can be uploaded directly. Oversized documents require special handling. Physical items need approval and have specific requirements."
    }
  ],
  questions: [
    {
      id: "questions-1",
      question: "What is considered inappropriate content?",
      answer: "Content that is embarrassing, not suitable for public viewing, or contains inappropriate depictions of persons or places."
    }
  ],
  upload: [
    {
      id: "upload-1",
      question: "What file formats are accepted?",
      answer: "PDF, DOC, DOCX, JPG, PNG, MP4 and other common formats up to 25MB."
    }
  ],
  confirmation: [
    {
      id: "confirm-1",
      question: "What happens after I submit?",
      answer: "You'll receive email confirmation and exhibits will be reviewed for admissibility before being entered into the case record."
    }
  ]
};

interface ExhibitWizardProps {
  onBack?: () => void;
}

export function ExhibitWizard({ onBack }: ExhibitWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
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

  const goToNextStep = () => {
    if (currentStep < exhibitTabs.length - 1) {
      const currentTabId = exhibitTabs[currentStep].id;
      markTabCompleted(currentTabId);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const skipToUpload = () => {
    markTabCompleted(exhibitTabs[currentStep].id);
    setCurrentStep(3); // Upload tab
  };

  const skipToEnd = () => {
    markTabCompleted(exhibitTabs[currentStep].id);
    setCurrentStep(4); // Confirmation tab
  };

  const restartFlow = () => {
    setCurrentStep(1); // Go back to exhibit type selection
  };

  const redirectToMotions = () => {
    // In a real implementation, this would navigate to the motions page
    alert("Redirecting to Motions page to file Motion for Protective Order");
  };

  const currentTabId = exhibitTabs[currentStep]?.id;

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
            <h1 className="text-3xl font-semibold font-fluent text-foreground">New Exhibit</h1>
            <p className="text-muted-foreground font-fluent">Complete all sections to create a new case</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            Status: Draft
          </Badge>
        </div>

        {/* Step-based Layout */}
        <div className="flex gap-6">
          {/* Vertical Step List */}
          <Card className="shadow-fluent-8 w-80">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                {exhibitTabs.map((tab, index) => (
                  <div
                    key={tab.id}
                    className={`w-full justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      currentStep === index 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep > index 
                          ? 'bg-success/10 text-success border border-success/20' 
                          : 'bg-muted/50 text-muted-foreground'
                    }`}
                    onClick={() => currentStep > index ? goToStep(index) : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-fluent font-medium">{tab.title}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <div className="flex-1">
            <Card className="shadow-fluent-16">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-fluent font-semibold">{exhibitTabs[currentStep]?.title}</CardTitle>
                    <p className="text-muted-foreground font-fluent">{exhibitTabs[currentStep]?.description}</p>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>{exhibitTabs[currentStep]?.title} Help</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <Accordion type="single" collapsible className="w-full">
                          {faqData[currentTabId as keyof typeof faqData]?.map((faq) => (
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
                {currentTabId === 'department' && (
                  <ExhibitDepartmentTab 
                    onDataChange={updateFormData} 
                    data={formData} 
                    onNext={goToNextStep} 
                  />
                )}
                {currentTabId === 'exhibit-type' && (
                  <ExhibitTypeTab 
                    onDataChange={updateFormData} 
                    data={formData} 
                    onNext={goToNextStep}
                    onSkipToUpload={skipToUpload}
                    onSkipToEnd={skipToEnd}
                  />
                )}
                {currentTabId === 'questions' && (
                  <ExhibitQuestionsTab 
                    onDataChange={updateFormData} 
                    data={formData} 
                    onNext={goToNextStep}
                    onRedirectToMotions={redirectToMotions}
                  />
                )}
                {currentTabId === 'upload' && (
                  <ExhibitUploadTab 
                    onDataChange={updateFormData} 
                    data={formData} 
                    onNext={goToNextStep}
                    onUploadAnother={restartFlow}
                  />
                )}
                {currentTabId === 'confirmation' && (
                  <ExhibitConfirmationTab 
                    onDataChange={updateFormData} 
                    data={formData} 
                    onFinish={onBack}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons - Only show on certain steps */}
        {currentTabId !== 'confirmation' && (
          <div className="flex justify-between pt-6 pb-4">
            <Button variant="outline" onClick={onBack} className="font-fluent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Button>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="font-fluent">
                Save Draft
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}