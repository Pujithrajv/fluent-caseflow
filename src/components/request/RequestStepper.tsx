import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestStepperProps {
  steps: string[];
  currentStep: number;
}

const getStepDescription = (step: string): string => {
  const descriptions: Record<string, string> = {
    "Request": "Select request group and type",
    "Motion": "Provide motion details",
    "Exhibit": "Provide exhibit details",
    "Discovery": "Provide discovery details",
    "Interrogatories": "Provide interrogatories details",
    "Document Production": "Provide document production details",
    "Deposition": "Provide deposition details",
    "Inspection": "Provide inspection details",
    "Documents": "Upload required documents",
    "Review & Submit": "Review and submit your request"
  };
  return descriptions[step] || "Complete this step";
};

export function RequestStepper({ steps, currentStep }: RequestStepperProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-6">Request Steps</h3>
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div
              key={index}
              className={cn(
                "rounded-lg p-4 transition-all",
                isActive && "bg-primary border-2 border-primary"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors flex-shrink-0",
                    isActive && "bg-white text-primary",
                    isCompleted && "bg-green-600 text-white",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold leading-tight",
                      isActive && "text-white",
                      isCompleted && "text-foreground",
                      !isActive && !isCompleted && "text-foreground"
                    )}
                  >
                    {step}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-1 leading-tight",
                      isActive && "text-white/90",
                      isCompleted && "text-muted-foreground",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {getStepDescription(step)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
