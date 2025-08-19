import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info, AlertCircle } from "lucide-react";

interface ReviewSubmitTabProps {
  data: any;
  isLastTab?: boolean;
  mode?: 'create' | 'view-edit';
  caseStatus?: 'draft' | 'submitted' | 'accepted';
  caseNumber?: string;
  isReadOnly?: boolean;
  onEditTab?: (tabIndex: number) => void;
}

export function ReviewSubmitTab({ data, isLastTab, mode = 'create', caseStatus = 'draft', caseNumber, isReadOnly = false, onEditTab }: ReviewSubmitTabProps) {
  // Define checklist items with completion status
  const checklistItems = [
    {
      id: 'department',
      label: 'Department Information',
      required: true,
      completed: !!(data.department && data.division && data.bureau)
    },
    {
      id: 'primaryParty',
      label: 'Primary Party Details',
      required: true,
      completed: !!(data.partyType && (data.partyName || (data.firstName && data.lastName)) && data.email)
    },
    {
      id: 'caseDetails',
      label: 'Case Details',
      required: true,
      completed: !!(data.caseName && data.caseType && data.caseDescription)
    },
    {
      id: 'abandonWell',
      label: 'Abandon Well Questions',
      required: true,
      completed: !!(data.permitteeNumber && data.permitNumber && data.numberOfWells)
    },
    {
      id: 'requiredDocuments',
      label: 'Required Documents Upload',
      required: true,
      completed: !!(data.uploadedFiles && data.uploadedFiles.length >= 3) // Assuming 3 required docs
    },
    {
      id: 'participants',
      label: 'Additional Participants',
      required: false,
      completed: true // Optional, so always considered complete
    },
    {
      id: 'associatedRequests',
      label: 'Associated Requests',
      required: false,
      completed: true // Optional, so always considered complete
    },
    {
      id: 'additionalDocuments',
      label: 'Additional Supporting Documents',
      required: false,
      completed: true // Optional, so always considered complete
    }
  ];

  const requiredItems = checklistItems.filter(item => item.required);
  const optionalItems = checklistItems.filter(item => !item.required);
  const allRequiredCompleted = requiredItems.every(item => item.completed);

  const handleSubmit = () => {
    if (allRequiredCompleted) {
      // Generate case ID and show confirmation
      const newCaseId = `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
      alert(`Case submitted successfully! Case ID: ${newCaseId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Submission Checklist Card */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="font-fluent">Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Required Items */}
          <div>
            <h4 className="font-medium font-fluent text-sm text-foreground mb-3">Required Items</h4>
            <div className="space-y-2">
              {requiredItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-fluent ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Items */}
          <div>
            <h4 className="font-medium font-fluent text-sm text-foreground mb-3">Optional Items</h4>
            <div className="space-y-2">
              {optionalItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-fluent text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ready to Submit Card */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="font-fluent flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-600" />
            <span>Ready to Submit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-fluent text-foreground">
              Once you submit your case, it will be routed to the appropriate department for review and processing.
            </p>
            <p className="text-sm font-fluent text-muted-foreground">
              You will receive a confirmation email with your case ID and tracking information. The review process typically takes 3-5 business days.
            </p>
            {!allRequiredCompleted && (
              <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Please complete all required items before submitting your case.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" onClick={() => onEditTab && onEditTab(-1)}>
          Previous
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!allRequiredCompleted}
          className="ml-auto"
        >
          Submit Case
        </Button>
      </div>
    </div>
  );
}