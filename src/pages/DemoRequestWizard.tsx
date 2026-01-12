import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { RequestStep } from "@/components/request/RequestStep";
import { RequestGroupStep } from "@/components/request/RequestGroupStep";
import { InterrogatoriesStep } from "@/components/request/InterrogatoriesStep";
import { DocumentProductionStep } from "@/components/request/DocumentProductionStep";
import { DepositionStep } from "@/components/request/DepositionStep";
import { InspectionStep } from "@/components/request/InspectionStep";
import { DocumentsStep } from "@/components/request/DocumentsStep";
import { ReviewSubmitStep } from "@/components/request/ReviewSubmitStep";
import { RequestStepper } from "@/components/request/RequestStepper";

export interface RequestData {
  requestGroup: "Motion" | "Exhibit" | "Discovery" | "";
  selectedRequestTypes: string[];
  summary: string;
  discoveryData: {
    startDate: string;
    cutoffDate: string;
    conferenceDate: string;
    caseId: string;
    processStage: string;
    discoverySummary: string;
  };
  interrogatoriesData: any;
  documentProductionData: any;
  depositionData: any;
  inspectionData: any;
  documents: File[];
}

export default function DemoRequestWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [requestData, setRequestData] = useState<RequestData>({
    requestGroup: "",
    selectedRequestTypes: [],
    summary: "",
    discoveryData: {
      startDate: "2024-01-15",
      cutoffDate: "2024-06-30",
      conferenceDate: "2024-02-01",
      caseId: "CASE-2024-001",
      processStage: "Discovery Active",
      discoverySummary: ""
    },
    interrogatoriesData: null,
    documentProductionData: null,
    depositionData: null,
    inspectionData: null,
    documents: []
  });

  const generateSteps = () => {
    const steps = ["Request"];
    
    if (requestData.requestGroup) {
      steps.push(requestData.requestGroup);
      
      if (requestData.requestGroup === "Discovery" && requestData.selectedRequestTypes.length > 0) {
        steps.push(...requestData.selectedRequestTypes);
      }
    }
    
    steps.push("Documents");
    steps.push("Review & Submit");
    
    return steps;
  };

  const steps = generateSteps();

  const handleNext = (data: Partial<RequestData>) => {
    setRequestData({ ...requestData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    const stepName = steps[currentStep];

    switch (stepName) {
      case "Request":
        return (
          <RequestStep
            data={requestData}
            onNext={handleNext}
          />
        );
      case "Motion":
      case "Exhibit":
      case "Discovery":
        return (
          <RequestGroupStep
            requestGroup={requestData.requestGroup}
            data={requestData.discoveryData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Interrogatories":
        return (
          <InterrogatoriesStep
            data={requestData.interrogatoriesData}
            cutoffDate={requestData.discoveryData.cutoffDate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Document Production":
        return (
          <DocumentProductionStep
            data={requestData.documentProductionData}
            cutoffDate={requestData.discoveryData.cutoffDate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Deposition":
        return (
          <DepositionStep
            data={requestData.depositionData}
            cutoffDate={requestData.discoveryData.cutoffDate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Inspection":
        return (
          <InspectionStep
            data={requestData.inspectionData}
            cutoffDate={requestData.discoveryData.cutoffDate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Documents":
        return (
          <DocumentsStep
            data={requestData.documents}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Review & Submit":
        return (
          <ReviewSubmitStep
            data={requestData}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Stepper */}
          <div className="col-span-3">
            <RequestStepper steps={steps} currentStep={currentStep} />
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
