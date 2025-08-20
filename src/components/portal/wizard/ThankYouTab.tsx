import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ThankYouTabProps {
  caseNumber?: string;
}

export function ThankYouTab({ caseNumber }: ThankYouTabProps) {
  return (
    <div className="space-y-6">
      {/* Thank You Message */}
      <Card className="shadow-fluent-16 border-green-200 bg-green-50/50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold font-fluent text-foreground mb-6">
            Successful Case Submission
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg font-fluent text-muted-foreground">
              Your case has been submitted to the Bureau of Administrative Hearings.
            </p>
            
            {/* Confirmation Number */}
            <div className="bg-background border border-border rounded-lg p-4 inline-block">
              <p className="text-sm font-fluent text-muted-foreground mb-1">
                Confirmation No:
              </p>
              <p className="text-xl font-bold font-fluent text-primary">
                {caseNumber || "2024-0003"}
              </p>
            </div>
            
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <p className="text-base font-fluent text-muted-foreground">
                Once your case is reviewed and accepted by the Bureau of Administrative Hearings, it will be assigned a case number.
              </p>
              <p className="text-base font-fluent text-muted-foreground">
                You can check the status of your submission anytime on your portal dashboard.
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center">
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="font-fluent"
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}