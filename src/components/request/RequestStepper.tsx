import { Check } from "lucide-react";

interface RequestStepperProps {
  steps: string[];
  currentStep: number;
}

const getStepDescription = (step: string): string => {
  const descriptions: Record<string, string> = {
    "Request Details": "Select request group and type",
    "Request Documents": "Upload required documents",
    "Review and Submit": "Verify and submit your request",
    "Interrogatories": "Provide interrogatories details",
    "Document Production": "Provide document production details",
    "Deposition": "Provide deposition details",
    "Inspection": "Provide inspection details",
  };
  return descriptions[step] || "Complete this step";
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
                    backgroundColor: isActive ? "#0B3A78" : isCompleted ? "#0B3A78" : "#dee2e6",
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
                  {step}
                </div>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>
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
