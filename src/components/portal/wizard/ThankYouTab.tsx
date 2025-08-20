import { Card, CardContent } from "@/components/ui/card";
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
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold font-fluent text-foreground mb-4">
            Thank You
          </h2>
          <p className="text-lg font-fluent text-muted-foreground mb-6">
            Your case has been successfully created.
          </p>
          
          {/* Confirmation Number */}
          <div className="bg-background border border-border rounded-lg p-4 inline-block">
            <p className="text-sm font-fluent text-muted-foreground mb-1">
              Confirmation #:
            </p>
            <p className="text-xl font-bold font-fluent text-primary">
              {caseNumber || "2024-0004"}
            </p>
          </div>
          
          <p className="text-sm font-fluent text-muted-foreground mt-6 max-w-md mx-auto">
            You will receive an email confirmation shortly. You can track the progress of your case 
            through the portal dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}