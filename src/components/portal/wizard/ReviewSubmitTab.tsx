import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";

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
  // Check completion status for each wizard step
  const isDepartmentComplete = !!(data.department && data.division && data.bureau);
  const isPrimaryPartyComplete = !!(data.partyType && (data.partyName || (data.firstName && data.lastName)) && data.email);
  const isCaseDetailsComplete = !!(data.caseName && data.caseType && data.caseDescription);
  const isCaseQuestionsComplete = !!(data.permitteeNumber && data.permitNumber); // Optional
  const isParticipantsComplete = true; // Primary party always counts as one participant
  const isDocumentsComplete = !!(data.uploadedFiles && data.uploadedFiles.length > 0);

  // Calculate if all required items are complete
  const allRequiredComplete = isDepartmentComplete && isPrimaryPartyComplete && isCaseDetailsComplete && isParticipantsComplete && isDocumentsComplete;

  const ChecklistItem = ({ icon: Icon, text, isComplete, isOptional = false }: { 
    icon: React.ComponentType<any>; 
    text: string; 
    isComplete: boolean; 
    isOptional?: boolean;
  }) => (
    <div className="flex items-center space-x-3 py-2">
      <Icon className={`h-5 w-5 ${isComplete ? 'text-green-600' : 'text-orange-500'}`} />
      <span className={`font-fluent ${isComplete ? 'text-green-600' : 'text-orange-500'}`}>
        {isOptional && !isComplete ? `Optional: ${text}` : text}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Submission Checklist */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="font-fluent">Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChecklistItem
            icon={isDepartmentComplete ? CheckCircle : AlertCircle}
            text="Department information completed"
            isComplete={isDepartmentComplete}
          />
          <ChecklistItem
            icon={isPrimaryPartyComplete ? CheckCircle : AlertCircle}
            text="Primary party information provided"
            isComplete={isPrimaryPartyComplete}
          />
          <ChecklistItem
            icon={isCaseDetailsComplete ? CheckCircle : AlertCircle}
            text="Case details completed"
            isComplete={isCaseDetailsComplete}
          />
          <ChecklistItem
            icon={isCaseQuestionsComplete ? CheckCircle : AlertCircle}
            text="Case type questions (incomplete)"
            isComplete={isCaseQuestionsComplete}
            isOptional={true}
          />
          <ChecklistItem
            icon={isParticipantsComplete ? CheckCircle : AlertCircle}
            text="Participants added"
            isComplete={isParticipantsComplete}
          />
          <ChecklistItem
            icon={isDocumentsComplete ? CheckCircle : AlertCircle}
            text="Required documents uploaded"
            isComplete={isDocumentsComplete}
          />
        </CardContent>
      </Card>

      {/* Ready to Submit Card */}
      <Card className="shadow-fluent-8 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold font-fluent text-foreground">Ready to Submit</h4>
              <p className="text-sm font-fluent text-muted-foreground mt-1">
                Once submitted, your case will be routed for review. You will receive a confirmation with your case ID 
                and can track progress through the portal dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" className="font-fluent">
          Previous
        </Button>
        <Button 
          className="font-fluent" 
          disabled={!allRequiredComplete}
        >
          Submit Case
        </Button>
      </div>
    </div>
  );
}