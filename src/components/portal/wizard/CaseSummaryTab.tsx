import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Download, Eye, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CaseSummaryTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onEditTab?: (tabId: string) => void;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}

export function CaseSummaryTab({ 
  data, 
  onDataChange, 
  onEditTab, 
  isReadOnly = true,
  isSeededCase = false 
}: CaseSummaryTabProps) {
  
  const handleEditClick = (tabId: string) => {
    if (onEditTab) {
      onEditTab(tabId);
    }
  };

  // Mock data for demonstration - replace with actual data from props
  const mockRequests = [
    { id: 1, group: "Motion", type: "Motion to Dismiss", reference: "REQ-2024-001", date: "2024-01-15", status: "Draft" },
    { id: 2, group: "Discovery", type: "Document Production", reference: "REQ-2024-002", date: "2024-01-12", status: "Submitted" }
  ];

  const mockDocuments = [
    { id: 1, name: "Initial_Complaint.pdf", size: "2.4 MB", uploadDate: "2024-01-15" },
    { id: 2, name: "Supporting_Evidence.docx", size: "856 KB", uploadDate: "2024-01-14" }
  ];

  const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border last:border-b-0">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-fluent">{value}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Department Information */}
      {(data?.department || data?.division || data?.bureau) && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold">Department Information</CardTitle>
                <p className="text-muted-foreground font-fluent text-sm">Agency structure and personnel</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick('department')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
                >
                  <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow label="Department" value={data?.department} />
            <InfoRow label="Division" value={data?.division} />
            <InfoRow label="Bureau" value={data?.bureau} />
            <InfoRow label="Case Type" value={data?.caseType} />
            <InfoRow label="Case Reference Number" value={data?.referenceNumber} />
          </CardContent>
        </Card>
      )}

      {/* Primary Party Information */}
      {(data?.partyName || data?.partyType) && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold">Primary Party Information</CardTitle>
                <p className="text-muted-foreground font-fluent text-sm">Party details and representation</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick('primary-party')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
                >
                  <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow label="Party Type" value={data?.partyType} />
            <InfoRow label="Party Name" value={data?.partyName} />
            <InfoRow label="Email" value={data?.contactEmail} />
            <InfoRow label="Phone" value={data?.contactPhone} />
            <InfoRow label="Represented" value={data?.isRepresented ? "Yes" : "No"} />
            {data?.attorneyName && <InfoRow label="Attorney" value={data?.attorneyName} />}
          </CardContent>
        </Card>
      )}

      {/* Case Details */}
      {(data?.caseName || data?.caseDescription) && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold">Case Details</CardTitle>
                <p className="text-muted-foreground font-fluent text-sm">Case information and timeline</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick('case-details')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
                >
                  <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow label="Case Name" value={data?.caseName} />
            <InfoRow label="Description" value={data?.caseDescription} />
            <InfoRow label="Special Instructions" value={data?.specialInstructions} />
            <InfoRow label="Caption Notation" value={data?.captionNotation} />
            <InfoRow label="Initiating Action Date" value={data?.initiatingActionDate ? format(new Date(data.initiatingActionDate), 'MMM dd, yyyy') : undefined} />
            <InfoRow label="Responsive Action Date" value={data?.responsiveActionDate ? format(new Date(data.responsiveActionDate), 'MMM dd, yyyy') : undefined} />
            {data?.selectedAccessibilityOptions && data.selectedAccessibilityOptions.length > 0 && (
              <InfoRow label="Hearing Resources" value={data.selectedAccessibilityOptions.join(', ')} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Abandon Well Questions - Only show if relevant data exists */}
      {(data?.permitteeNumber || data?.permitNumber || data?.numberOfWells) && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold">Abandon Well Questions</CardTitle>
                <p className="text-muted-foreground font-fluent text-sm">Case type specific information</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick('case-questions')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
                >
                  <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow label="Permittee Number" value={data?.permitteeNumber} />
            <InfoRow label="Permit Number" value={data?.permitNumber} />
            <InfoRow label="Number of Wells" value={data?.numberOfWells?.toString()} />
            <InfoRow label="Reason for Case Initiation" value={data?.reasonForInitiation} />
          </CardContent>
        </Card>
      )}

    </div>
  );
}