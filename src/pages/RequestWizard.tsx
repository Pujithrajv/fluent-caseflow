import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RequestSelectionTab } from "@/components/portal/wizard/RequestSelectionTab";
import { SelectedSubprocessDetailsTab } from "@/components/portal/wizard/SelectedSubprocessDetailsTab";
import { DocumentUploadTab } from "@/components/portal/wizard/DocumentUploadTab";
import { RequestReviewSubmitTab } from "@/components/portal/wizard/RequestReviewSubmitTab";

type WizardStep = "request" | "details" | "documents" | "review";

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
  
  const [currentStep, setCurrentStep] = useState<WizardStep>("request");
  const [requestData, setRequestData] = useState<RequestData>({});
  const [isComplete, setIsComplete] = useState({
    request: false,
    details: false,
    documents: false,
    review: false
  });

  const steps = [
    { id: "request", title: "Request", description: "Select request type" },
    { id: "details", title: "Selected Subprocess Details", description: "Provide details" },
    { id: "documents", title: "Documents", description: "Upload required documents" },
    { id: "review", title: "Review & Submit", description: "Review and submit" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleDataChange = (stepData: any) => {
    setRequestData(prev => ({ ...prev, ...stepData }));
  };

  const handleStepComplete = (stepId: string, completed: boolean) => {
    setIsComplete(prev => ({ ...prev, [stepId]: completed }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as WizardStep);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as WizardStep);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully and will be reviewed.",
    });
    navigate(`/attorney/case/${caseId}`);
  };

  const canContinue = () => {
    switch (currentStep) {
      case "request":
        return requestData.requestGroup && requestData.requestType;
      case "details":
        return true; // Always allow continuation from details
      case "documents":
        return true; // Assuming required documents are validated elsewhere
      case "review":
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "request":
        return (
          <RequestSelectionTab
            data={requestData}
            onDataChange={handleDataChange}
            onComplete={() => handleStepComplete("request", true)}
            onNext={handleNext}
          />
        );
      case "details":
        return (
          <SelectedSubprocessDetailsTab
            data={requestData}
            onDataChange={handleDataChange}
            onComplete={() => handleStepComplete("details", true)}
          />
        );
      case "documents":
        return (
          <DocumentUploadTab
            data={requestData}
            onDataChange={handleDataChange}
          />
        );
      case "review":
        return (
          <RequestReviewSubmitTab
            data={requestData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      {/* Header */}
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(`/attorney/case/${caseId}`)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar with Steps */}
        <div className="w-80 bg-white border-r border-border p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold font-fluent">Add Request</h2>
            <p className="text-sm text-muted-foreground">Complete the following steps</p>
          </div>
          
          <div className="mt-8 space-y-4">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = isComplete[step.id as keyof typeof isComplete];
              const isPast = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-start space-x-3">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : isPast || isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {isPast || isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="font-fluent">
                  {steps[currentStepIndex]?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                {currentStep !== "review" && (
                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStepIndex === 0}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canContinue()}
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestWizard;