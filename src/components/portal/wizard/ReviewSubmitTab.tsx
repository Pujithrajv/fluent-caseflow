import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit, Eye, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ReviewSubmitTabProps {
  formData: any;
}

export function ReviewSubmitTab({ formData }: ReviewSubmitTabProps) {
  // Generate reference number and current date
  const referenceNumber = "CASE-000001";
  const submissionDate = format(new Date(), "PPP");

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
              <p className="font-medium font-fluent">Planning Department</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Division</p>
              <p className="font-medium font-fluent">Zoning Division</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Coordinator</p>
              <p className="font-medium font-fluent">John Smith</p>
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
              <p className="font-medium font-fluent">Environmental Impact Assessment</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Case Type</p>
              <p className="font-medium font-fluent">Environmental Review</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Expedited</p>
              <Badge variant="secondary">No</Badge>
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
              <p className="text-sm font-fluent text-muted-foreground">Party Name</p>
              <p className="font-medium font-fluent">City Planning Department</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Represented</p>
              <Badge variant="secondary">No</Badge>
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
              <p className="text-sm font-fluent text-muted-foreground">Case Type</p>
              <p className="font-medium font-fluent">Environmental Review</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Environmental Impact</p>
              <p className="font-medium font-fluent">Yes - Moderate Impact</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Timeline Requirements</p>
              <p className="font-medium font-fluent">Standard Processing</p>
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
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Second Party</p>
              <p className="font-medium font-fluent">Green Valley Development Corp.</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Third Party</p>
              <p className="font-medium font-fluent">Local Environmental Group</p>
            </div>
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Total Parties</p>
              <Badge variant="secondary">3 Parties</Badge>
            </div>
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
            <div>
              <p className="text-sm font-fluent text-muted-foreground">Total Requests</p>
              <p className="font-medium font-fluent">2 Active Requests</p>
            </div>
            <div className="space-y-3">
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium font-fluent text-sm">Environmental Impact Review</p>
                    <p className="text-xs text-muted-foreground">Request Type: Review Request</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium font-fluent text-sm">Site Inspection Request</p>
                    <p className="text-xs text-muted-foreground">Request Type: Inspection Request</p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
            </div>
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