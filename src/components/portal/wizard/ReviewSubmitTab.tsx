import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit, Eye, AlertCircle } from "lucide-react";
import { format } from "date-fns";

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
  // Generate reference number and current date
  const referenceNumber = caseNumber || "DBE-2024-001-EC";
  const submissionDate = format(new Date(), "PPP");

  // Helper function to get display value
  const getDisplayValue = (value: any) => {
    if (!value || value === '') return 'Not provided';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object' && value.name) return value.name;
    return value;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards - Organized by Wizard Flow */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Department Information */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Department Information</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(0)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Department</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.department)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Division</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.division)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Bureau</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.bureau)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Type</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.caseType)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Reference Number</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.departmentReferenceNumber)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Coordinator</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.caseCoordinator)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Assigned Attorney</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.assignedAttorney)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Final Decision Maker</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.finalDecisionMaker)}</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Primary Party */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Primary Party</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(1)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Party Type</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.partyType)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Party Name</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.partyName || (data.firstName && data.lastName ? data.firstName + ' ' + data.lastName : ''))}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Email</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.email)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Phone</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.phone)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Represented</p>
              <Badge variant="secondary">{getDisplayValue(data.isRepresented)}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 3. Case Details */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Case Details</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(2)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Reference Number</p>
              <p className="font-medium font-fluent">{referenceNumber}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Submission Date</p>
              <p className="font-medium font-fluent">{submissionDate}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Name</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.caseName)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Type</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.caseType)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Description</p>
              <p className="font-medium font-fluent text-sm">{getDisplayValue(data.caseDescription)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Initiating Action Date</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.initiatingActionDate)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Responsive Action Date</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.responsiveActionDate)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Special Instructions</p>
              <p className="font-medium font-fluent text-sm">{getDisplayValue(data.specialInstructions)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Caption Notation</p>
              <p className="font-medium font-fluent text-sm">{getDisplayValue(data.captionNotation)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Participant Hearing Resources</p>
              <p className="font-medium font-fluent">{Array.isArray(data.accessibilityOptions) ? data.accessibilityOptions.join(', ') : getDisplayValue(data.accessibilityOptions)}</p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Abandon Well Questions */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Abandon Well Questions</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(3)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Permittee Number</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.permitteeNumber)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Permit Number</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.permitNumber)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Number of Wells</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.numberOfWells)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Initiated Reason</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.caseInitiatedReason)}</p>
            </div>
            {data.productionIssue && (
              <div>
                <p className="text-sm font-fluent text-muted-foreground">Production Issue</p>
                <p className="font-medium font-fluent">{getDisplayValue(data.productionIssue)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 5. Participants */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Participants</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(4)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.involvedParties && data.involvedParties.length > 0 ? (
              <>
                {data.involvedParties.map((party: any, index: number) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p className="text-sm font-fluent text-muted-foreground">Participant {index + 2}</p>
                    <p className="font-medium font-fluent">{getDisplayValue(party.name || (party.firstName && party.lastName ? party.firstName + ' ' + party.lastName : ''))}</p>
                    <p className="text-xs text-muted-foreground">{getDisplayValue(party.role)}</p>
                  </div>
                ))}
                <div>
                  <p className="text-sm font-fluent text-muted-foreground">Total Participants</p>
                  <Badge variant="secondary">{data.involvedParties.length + 1} Participants</Badge>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm font-fluent text-muted-foreground">Additional Participants</p>
                <p className="font-medium font-fluent">No additional participants added</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 6. Initial Documents */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Initial Documents</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(5)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden border border-border rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Document Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-medium font-fluent text-foreground">Notice of Violation</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Yes</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Official notice documenting the violation</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-medium font-fluent text-foreground">Well Inspection Report</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Yes</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Technical inspection documentation</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-medium font-fluent text-foreground">Well Records of the Inspector</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Yes</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Historical records and documentation</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Full-Width Sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* 7. Associated Requests */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Associated Requests</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(6)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.requests && data.requests.length > 0 ? (
              <>
                <div>
                  <p className="text-sm font-fluent text-muted-foreground">Total Requests</p>
                  <p className="font-medium font-fluent">{data.requests.length} Request{data.requests.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="space-y-3">
                  {data.requests.map((request: any, index: number) => (
                    <div key={index} className="border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium font-fluent text-sm">{getDisplayValue(request.title || request.name)}</p>
                          <p className="text-xs text-muted-foreground">Request Type: {getDisplayValue(request.type)}</p>
                        </div>
                        <Badge variant="secondary">{getDisplayValue(request.status || 'Draft')}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm font-fluent text-muted-foreground">Associated Requests</p>
                <p className="font-medium font-fluent">No requests added</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 8. Documents */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Documents</CardTitle>
              {!isReadOnly && onEditTab && (
                <Button variant="ghost" size="sm" onClick={() => onEditTab(7)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Total Files</p>
              <p className="font-medium font-fluent">{data?.uploadedFiles?.length || 0} documents uploaded</p>
            </div>
            <div className="space-y-2">
              {data?.uploadedFiles && data.uploadedFiles.length > 0 ? (
                data.uploadedFiles.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-fluent">{file.name || `Document_${index + 1}.pdf`}</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-fluent">Environmental_Report_2024.pdf</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-fluent">Site_Plans.dwg</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-fluent">Legal_Notice.pdf</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-fluent">Stakeholder_Comments.docx</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Submission Notice */}
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
    </div>
  );
}