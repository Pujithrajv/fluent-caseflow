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
      {/* First Row: Department Information and Primary Party Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Information */}
        {(data?.department || data?.division || data?.bureau) && (
          <Card className="shadow-fluent-8 aspect-square flex flex-col">
            <CardHeader className="flex-shrink-0">
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
            <CardContent className="space-y-0 flex-1 overflow-y-auto">
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
          <Card className="shadow-fluent-8 aspect-square flex flex-col">
            <CardHeader className="flex-shrink-0">
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
            <CardContent className="space-y-0 flex-1 overflow-y-auto">
              <InfoRow label="Party Type" value={data?.partyType} />
              <InfoRow label="Party Name" value={data?.partyName} />
              <InfoRow label="Email" value={data?.contactEmail} />
              <InfoRow label="Phone" value={data?.contactPhone} />
              <InfoRow label="Represented" value={data?.isRepresented ? "Yes" : "No"} />
              {data?.attorneyName && <InfoRow label="Attorney" value={data?.attorneyName} />}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Case Details - Full Width */}
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

      {/* Second Row: Abandon Well Questions and Requests Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Abandon Well Questions - Only show if relevant data exists */}
        {(data?.permitteeNumber || data?.permitNumber || data?.numberOfWells) && (
          <Card className="shadow-fluent-8 aspect-square flex flex-col">
            <CardHeader className="flex-shrink-0">
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
            <CardContent className="space-y-0 flex-1 overflow-y-auto">
              <InfoRow label="Permittee Number" value={data?.permitteeNumber} />
              <InfoRow label="Permit Number" value={data?.permitNumber} />
              <InfoRow label="Number of Wells" value={data?.numberOfWells?.toString()} />
              <InfoRow label="Reason for Case Initiation" value={data?.reasonForInitiation} />
            </CardContent>
          </Card>
        )}

        {/* Requests Overview */}
        <Card className="shadow-fluent-8 aspect-square flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold">Requests Overview</CardTitle>
                <p className="text-muted-foreground font-fluent text-sm">Case requests and their status</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick('requests')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
                >
                  <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {mockRequests.length > 0 ? (
              <div className="space-y-3">
                {mockRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleEditClick('requests')}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{request.group}</span>
                        <Badge variant="outline" className="text-xs">
                          {request.reference}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted: {format(new Date(request.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge 
                      variant={request.status === 'Submitted' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No requests have been submitted for this case.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold">Documents</CardTitle>
              <p className="text-muted-foreground font-fluent text-sm">
                {mockDocuments.length} uploaded document{mockDocuments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockDocuments.length > 0 ? (
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} • Uploaded {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No documents have been uploaded for this case.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}