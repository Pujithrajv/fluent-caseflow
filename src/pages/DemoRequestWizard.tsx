import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { RequestStep } from "@/components/request/RequestStep";
import { InterrogatoriesStep } from "@/components/request/InterrogatoriesStep";
import { DocumentProductionStep } from "@/components/request/DocumentProductionStep";
import { DepositionStep } from "@/components/request/DepositionStep";
import { InspectionStep } from "@/components/request/InspectionStep";
import { ReviewSubmitStep } from "@/components/request/ReviewSubmitStep";
import { RequestStepper } from "@/components/request/RequestStepper";
import { HelpCircle } from "lucide-react";

export interface RequestData {
  requestGroup: "Motion" | "Exhibit" | "Discovery" | "Subpoenas" | "";
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
    discoveryData: { startDate: "2024-01-15", cutoffDate: "2024-06-30", conferenceDate: "2024-02-01", caseId: "CASE-2024-001", processStage: "Discovery Active", discoverySummary: "" },
    interrogatoriesData: null,
    documentProductionData: null,
    depositionData: null,
    inspectionData: null,
    documents: []
  });

  const generateSteps = () => {
    const steps = ["Request Details"];
    if ((requestData.requestGroup === "Discovery" || requestData.requestGroup === "Subpoenas") && requestData.selectedRequestTypes.length > 0) {
      steps.push(...requestData.selectedRequestTypes);
    }
    steps.push("Request Documents");
    steps.push("Review and Submit");
    return steps;
  };

  const steps = generateSteps();

  const handleNext = (data: Partial<RequestData>) => {
    setRequestData({ ...requestData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    const stepName = steps[currentStep];
    switch (stepName) {
      case "Request Details": return <RequestStep data={requestData} onNext={handleNext} />;
      case "Interrogatories": return <InterrogatoriesStep data={requestData.interrogatoriesData} cutoffDate={requestData.discoveryData.cutoffDate} onNext={handleNext} onBack={handleBack} />;
      case "Document Production": return <DocumentProductionStep data={requestData.documentProductionData} cutoffDate={requestData.discoveryData.cutoffDate} onNext={handleNext} onBack={handleBack} />;
      case "Deposition": return <DepositionStep data={requestData.depositionData} cutoffDate={requestData.discoveryData.cutoffDate} onNext={handleNext} onBack={handleBack} />;
      case "Inspection": return <InspectionStep data={requestData.inspectionData} cutoffDate={requestData.discoveryData.cutoffDate} onNext={handleNext} onBack={handleBack} />;
      case "Review and Submit": return <ReviewSubmitStep data={requestData} onBack={handleBack} />;
      default: return null;
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <div className="container-xl px-4 py-4 flex-grow-1">
        {/* Title row with breadcrumb and requesting party */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: "1.5rem" }}>Filing: New Filing</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: "0.85rem" }}>
                <li className="breadcrumb-item"><a href="#" className="text-primary text-decoration-none">Cases</a></li>
                <li className="breadcrumb-item"><a href="#" className="text-primary text-decoration-none">DBE-EC-2026-004</a></li>
                <li className="breadcrumb-item"><a href="#" className="text-primary text-decoration-none">Filings</a></li>
                <li className="breadcrumb-item text-muted">New Filing</li>
              </ol>
            </nav>
          </div>
          <div className="d-flex align-items-start gap-3">
            <div className="text-end border-end pe-3">
              <div className="fw-bold text-dark" style={{ fontSize: "0.85rem" }}>First Party: Complainant</div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Department of Natural Resources</div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Dept#: S14-7311-0025</div>
            </div>
            <div className="text-end">
              <div className="fw-bold text-dark" style={{ fontSize: "0.85rem" }}>Second Party: Respondent</div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Tommy Welldorf</div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Attorney: Dell Spington</div>
            </div>
            <button className="btn btn-outline-primary rounded-circle p-1" style={{ width: 32, height: 32 }}>
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* Full-width warning banner */}
        <div
          className="d-flex align-items-center gap-2 py-2 px-3 mb-4"
          style={{
            backgroundColor: "#e8d44d",
            color: "#333",
            fontSize: "0.9rem",
          }}
        >
          <strong>Warning:</strong>
          <span>Do you need some help understanding what type of filing you need to select? <a href="#" className="fw-semibold" style={{ color: "#333", textDecoration: "underline" }}>Click Here</a> for more instructions.</span>
        </div>

        {/* Wizard layout */}
        <div className="row g-4">
          <div className="col-md-3">
            <RequestStepper steps={steps} currentStep={currentStep} />
          </div>
          <div className="col-md-9">
            {renderStep()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}