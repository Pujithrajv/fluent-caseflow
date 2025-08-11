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
}

export function ReviewSubmitTab({ data, isLastTab, mode = 'create', caseStatus = 'draft', caseNumber }: ReviewSubmitTabProps) {
  // Generate reference number and current date
  const referenceNumber = caseNumber || "DBE-2024-001-EC";
  const submissionDate = format(new Date(), "PPP");

  // Helper function to get display value
  const getDisplayValue = (value: any) => {
    if (!value || value === '') return 'Not provided';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Department Information */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Department Information</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Department</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.department)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Section</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.section)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Reference Number</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.referenceNumber)}</p>
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

        {/* Case Details */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Case Details</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
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
          </CardContent>
        </Card>

        {/* Primary Party */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Primary Party</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
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

        {/* Case Questions */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Abandon Well Questions</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Well Location Description</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.wellLocation)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Well Type</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.wellType)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Environmental Impact</p>
              <p className="font-medium font-fluent">{getDisplayValue(data.environmentalImpact)}</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Additional Comments</p>
              <p className="font-medium font-fluent text-sm">{getDisplayValue(data.additionalComments)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Involved Parties */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Involved Parties</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.involvedParties && data.involvedParties.length > 0 ? (
              <>
                {data.involvedParties.map((party: any, index: number) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p className="text-sm font-fluent text-muted-foreground">Party {index + 2}</p>
                    <p className="font-medium font-fluent">{getDisplayValue(party.name || (party.firstName && party.lastName ? party.firstName + ' ' + party.lastName : ''))}</p>
                    <p className="text-xs text-muted-foreground">{getDisplayValue(party.role)}</p>
                  </div>
                ))}
                <div>
                  <p className="text-sm font-fluent text-muted-foreground">Total Parties</p>
                  <Badge variant="secondary">{data.involvedParties.length + 1} Parties</Badge>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm font-fluent text-muted-foreground">Additional Parties</p>
                <p className="font-medium font-fluent">No additional parties added</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* Requests */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Associated Requests</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
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

        {/* Documents */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-fluent">Documents</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Total Files</p>
              <p className="font-medium font-fluent">4 documents uploaded</p>
            </div>
            <div className="space-y-2">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Checklist */}
      <Card className="shadow-fluent-16">
        <CardHeader>
          <CardTitle className="font-fluent">Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-fluent text-foreground">Department information completed</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-fluent text-foreground">Primary party information provided</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-fluent text-foreground">Case details completed</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-fluent text-foreground">Required documents uploaded</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span className="font-fluent text-foreground">Optional: Case type questions (incomplete)</span>
            </div>
          </div>
        </CardContent>
      </Card>

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