import { Check } from "lucide-react";

interface RequestStepperProps {
  steps: string[];
  currentStep: number;
}

const getStepDescription = (step: string): string => {
  const descriptions: Record<string, string> = {
    "Request Details": "Get started submitting your filings",
    "Request Documents": "Upload documents specific to this type of filing",
    "Review and Submit": "Verify and submit your filing",
    "Interrogatories": "Answer questions specific to this type of filing",
    "Document Production": "Answer questions specific to this type of filing",
    "Deposition": "Answer questions specific to this type of filing",
    "Inspection": "Answer questions specific to this type of filing",
  };
  return descriptions[step] || "Complete this step";
};

const getStepLabel = (step: string): string => {
  const labels: Record<string, string> = {
    "Request Details": "Filings Summary",
    "Request Documents": "Filings Documents",
    "Review and Submit": "Review & Submit",
    "Interrogatories": "Filing Type Question",
    "Document Production": "Filing Type Question",
    "Deposition": "Filing Type Question",
    "Inspection": "Filing Type Question",
  };
  return labels[step] || step;
};

export function RequestStepper({ steps, currentStep }: RequestStepperProps) {
  return (
    <div className="card border-0 shadow-sm sticky-top" style={{ top: "1.5rem" }}>
      <div className="card-body p-0">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className="d-flex align-items-stretch"
            >
              {/* Vertical progress line */}
              <div className="d-flex flex-column align-items-center" style={{ width: 4 }}>
                <div
                  className="flex-grow-1"
                  style={{
                    width: 4,
                    backgroundColor: isActive || isCompleted ? "#0B3A78" : "#dee2e6",
                    borderRadius: index === 0 ? "4px 4px 0 0" : index === steps.length - 1 ? "0 0 4px 4px" : 0,
                  }}
                />
              </div>

              {/* Step content */}
              <div
                className={`flex-grow-1 px-3 py-3 ${isActive ? "bg-light" : ""}`}
                style={{ cursor: "default" }}
              >
                <div className="fw-semibold text-dark" style={{ fontSize: "0.9rem" }}>
                  {getStepLabel(step)}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {getStepDescription(step)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}