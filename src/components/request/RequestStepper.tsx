import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestStepperProps {
  steps: string[];
  currentStep: number;
}

export function RequestStepper({ steps, currentStep }: RequestStepperProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-6">Request Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isActive && "bg-primary text-primary-foreground",
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
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-12 mt-2",
                      isCompleted ? "bg-green-600" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary",
                    isCompleted && "text-green-600",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
