import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { DepartmentTab } from "./wizard/DepartmentTab";
import { PrimaryPartyTab } from "./wizard/PrimaryPartyTab";
import { CaseDetailsTab } from "./wizard/CaseDetailsTab";
import { CaseQuestionsTab } from "./wizard/CaseQuestionsTab";
import { InvolvedPartiesTab } from "./wizard/InvolvedPartiesTab";
import { RequestWizardTab } from "./wizard/RequestWizardTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";

const wizardSteps = [
  { id: 'department', title: 'Department', description: 'Agency structure and personnel' },
  { id: 'primary-party', title: 'Primary Party', description: 'Party information' },
  { id: 'case-details', title: 'Case Details', description: 'Case name and details' },
  { id: 'case-questions', title: 'Case Questions', description: 'Case type specific questions' },
  { id: 'involved-parties', title: 'Involved Parties', description: 'Additional parties' },
  { id: 'requests', title: 'Requests', description: 'Associated requests' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit case' }
];

export function CaseWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (wizardSteps[currentStep].id) {
      case 'department':
        return <DepartmentTab onDataChange={updateFormData} data={formData} />;
      case 'primary-party':
        return <PrimaryPartyTab onDataChange={updateFormData} data={formData} />;
      case 'case-details':
        return <CaseDetailsTab onDataChange={updateFormData} data={formData} />;
      case 'case-questions':
        return <CaseQuestionsTab onDataChange={updateFormData} data={formData} />;
      case 'involved-parties':
        return <InvolvedPartiesTab onDataChange={updateFormData} data={formData} />;
      case 'requests':
        return <RequestWizardTab onDataChange={updateFormData} data={formData} />;
      case 'documents':
        return <DocumentUploadTab onDataChange={updateFormData} data={formData} />;
      case 'review':
        return <ReviewSubmitTab formData={formData} />;
      default:
        return <DepartmentTab onDataChange={updateFormData} data={formData} />;
    }
  };

  const progressPercentage = ((currentStep + 1) / wizardSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">Create New Case</h1>
            <p className="text-muted-foreground font-fluent">
              Step {currentStep + 1} of {wizardSteps.length}: {wizardSteps[currentStep].title}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
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
              {wizardSteps.map((step, index) => (
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
            <CardTitle className="font-fluent font-semibold">{wizardSteps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground font-fluent">{wizardSteps[currentStep].description}</p>
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
            {currentStep === wizardSteps.length - 1 ? (
              <Button className="font-fluent">
                <Check className="mr-2 h-4 w-4" />
                Submit Case
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