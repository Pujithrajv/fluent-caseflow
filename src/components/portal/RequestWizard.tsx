import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RequestDetailsTab } from "./wizard/RequestDetailsTab";
import { RequestTypeQuestionsTab } from "./wizard/RequestTypeQuestionsTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const requestSteps = [
  { id: 'request-details', title: 'Request Details', description: 'Request information and summary' },
  { id: 'request-questions', title: 'Request Type Questions', description: 'Type-specific questions' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit request' }
];

interface RequestWizardProps {
  onBack?: () => void;
}

export function RequestWizard({ onBack }: RequestWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < requestSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (requestSteps[currentStep].id) {
      case 'request-details':
        return <RequestDetailsTab onDataChange={updateFormData} data={formData} />;
      case 'request-questions':
        return <RequestTypeQuestionsTab onDataChange={updateFormData} data={formData} />;
      case 'documents':
        return <DocumentUploadTab onDataChange={updateFormData} data={formData} />;
      case 'review':
        return <ReviewSubmitTab formData={formData} />;
      default:
        return <RequestDetailsTab onDataChange={updateFormData} data={formData} />;
    }
  };

  const progressPercentage = ((currentStep + 1) / requestSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">Add New Request</h1>
            <p className="text-muted-foreground font-fluent">
              Step {currentStep + 1} of {requestSteps.length}: {requestSteps[currentStep].title}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
        </div>

        {/* Progress */}
        <Card className="shadow-fluent-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-fluent text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Step Navigation */}
        <Card className="shadow-fluent-8">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {requestSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-fluent transition-colors ${
                    index === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : index < currentStep 
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="shadow-fluent-16">
          <CardHeader>
            <CardTitle className="font-fluent font-semibold">{requestSteps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground font-fluent">{requestSteps[currentStep].description}</p>
          </CardHeader>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="font-fluent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="fluent" className="font-fluent">
              Save Draft
            </Button>
            {currentStep === requestSteps.length - 1 ? (
              <Button className="font-fluent" onClick={onBack}>
                <Check className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            ) : (
              <Button onClick={nextStep} className="font-fluent">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}