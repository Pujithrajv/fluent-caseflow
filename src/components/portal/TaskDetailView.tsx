import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, User, Users, FileText, AlertTriangle, Clock, CheckCircle } from "lucide-react";

interface TaskDetailProps {
  taskId: string;
  onBack: () => void;
}

// Mock case data based on TasksPlannerView structure
const mockCaseDetails = {
  '1': {
    id: '1',
    caseNumber: 'CASE-2024-001',
    primaryParty: 'Kirby Neroni',
    description: 'New case successfully created and saved to records.',
    complainant: { name: 'Kirby Neroni', attorney: 'John Smith', email: 'john.smith@law.com', phone: '(555) 123-4567' },
    defendant: { name: 'State Agency', attorney: 'Jane Doe', email: 'jane.doe@state.gov', phone: '(555) 987-6543' },
    submittedDate: '9/7/2025',
    acceptedDate: '9/9/2025',
    decisionDate: '9/15/2025',
    priority: 'Info',
    status: 'Active',
    caseType: 'Administrative Review',
    jurisdiction: 'State Administrative Court',
    assignedJudge: 'Hon. Patricia Williams',
    courtRoom: 'Room 205',
    estimatedDuration: '2-3 months',
    filingFee: '$250.00',
    documents: [
      { name: 'Initial Complaint', dateUploaded: '9/7/2025', status: 'Approved' },
      { name: 'Supporting Evidence', dateUploaded: '9/8/2025', status: 'Approved' },
      { name: 'Agency Response', dateUploaded: '9/12/2025', status: 'Pending Review' }
    ],
    timeline: [
      { date: '9/7/2025', event: 'Case submitted', status: 'completed' },
      { date: '9/9/2025', event: 'Case accepted and assigned', status: 'completed' },
      { date: '9/15/2025', event: 'Initial hearing scheduled', status: 'upcoming' },
      { date: '10/1/2025', event: 'Discovery deadline', status: 'upcoming' }
    ]
  },
  '2': {
    id: '2',
    caseNumber: 'CASE-2024-002',
    primaryParty: 'Sniders Group',
    description: 'Case returned for correction – missing/incorrect information or documents.',
    complainant: { name: 'Sniders Group', attorney: 'Mike Johnson', email: 'mike.johnson@law.com', phone: '(555) 234-5678' },
    defendant: { name: 'Regulatory Board', attorney: 'Sarah Wilson', email: 'sarah.wilson@regboard.gov', phone: '(555) 876-5432' },
    submittedDate: '10/4/2024',
    decisionDate: '12/26/2024',
    appealDue: '11/14/2024',
    priority: 'High',
    status: 'Correction Required',
    caseType: 'Regulatory Compliance',
    jurisdiction: 'Federal Administrative Court',
    assignedJudge: 'Hon. Michael Chen',
    courtRoom: 'Room 312',
    estimatedDuration: '4-6 months',
    filingFee: '$500.00',
    documents: [
      { name: 'Original Filing', dateUploaded: '10/4/2024', status: 'Needs Correction' },
      { name: 'Compliance Documents', dateUploaded: '10/5/2024', status: 'Needs Correction' }
    ],
    timeline: [
      { date: '10/4/2024', event: 'Case submitted', status: 'completed' },
      { date: '10/8/2024', event: 'Initial review completed', status: 'completed' },
      { date: '10/10/2024', event: 'Correction request sent', status: 'completed' },
      { date: '11/14/2024', event: 'Correction deadline', status: 'overdue' }
    ]
  },
  '3': {
    id: '3',
    caseNumber: 'DBE-2024-001-EC',
    primaryParty: 'North District Foods',
    description: 'Case Accepted – Case Number generated.',
    complainant: { name: 'North District Foods', attorney: 'Robert Lee', email: 'robert.lee@law.com', phone: '(555) 345-6789' },
    defendant: { name: 'Health Department', attorney: 'Lisa Chen', email: 'lisa.chen@health.gov', phone: '(555) 765-4321' },
    submittedDate: '9/17/2025',
    acceptedDate: '9/19/2025',
    decisionDate: '9/25/2025',
    priority: 'Normal',
    status: 'Accepted',
    caseType: 'Health Code Violation',
    jurisdiction: 'County Administrative Court',
    assignedJudge: 'Hon. Jennifer Rodriguez',
    courtRoom: 'Room 108',
    estimatedDuration: '1-2 months',
    filingFee: '$150.00',
    documents: [
      { name: 'Health Code Complaint', dateUploaded: '9/17/2025', status: 'Approved' },
      { name: 'Inspection Report', dateUploaded: '9/18/2025', status: 'Approved' },
      { name: 'Corrective Action Plan', dateUploaded: '9/20/2025', status: 'Approved' }
    ],
    timeline: [
      { date: '9/17/2025', event: 'Case submitted', status: 'completed' },
      { date: '9/19/2025', event: 'Case accepted', status: 'completed' },
      { date: '9/25/2025', event: 'Pre-hearing conference', status: 'upcoming' },
      { date: '10/5/2025', event: 'Final hearing', status: 'upcoming' }
    ]
  },
  '4': {
    id: '4',
    caseNumber: 'ABD-2024-001-EC',
    primaryParty: 'Valley Grain Solutions',
    description: 'Case Rejected – ALJ after checklist review.',
    complainant: { name: 'Valley Grain Solutions', attorney: 'David Kim', email: 'david.kim@law.com', phone: '(555) 456-7890' },
    defendant: { name: 'Agricultural Board', attorney: 'Maria Garcia', email: 'maria.garcia@agboard.gov', phone: '(555) 654-3210' },
    submittedDate: '8/24/2025',
    appealDue: '9/15/2025',
    priority: 'Critical',
    status: 'Rejected',
    caseType: 'Agricultural Permit',
    jurisdiction: 'State Agricultural Court',
    assignedJudge: 'Hon. Thomas Anderson',
    courtRoom: 'N/A',
    estimatedDuration: 'Case Closed',
    filingFee: '$300.00',
    documents: [
      { name: 'Permit Application', dateUploaded: '8/24/2025', status: 'Rejected' },
      { name: 'Environmental Impact', dateUploaded: '8/25/2025', status: 'Rejected' },
      { name: 'Rejection Notice', dateUploaded: '8/30/2025', status: 'Issued' }
    ],
    timeline: [
      { date: '8/24/2025', event: 'Case submitted', status: 'completed' },
      { date: '8/28/2025', event: 'Initial review', status: 'completed' },
      { date: '8/30/2025', event: 'Case rejected', status: 'completed' },
      { date: '9/15/2025', event: 'Appeal deadline passed', status: 'overdue' }
    ]
  }
};

const getPriorityBadgeStyle = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Normal':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Info':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-blue-600 text-white';
    case 'correction required':
      return 'bg-orange-600 text-white';
    case 'accepted':
      return 'bg-green-600 text-white';
    case 'rejected':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const getTimelineIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'upcoming':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'overdue':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

export function TaskDetailView({ taskId, onBack }: TaskDetailProps) {
  const caseDetail = mockCaseDetails[taskId as keyof typeof mockCaseDetails];

  if (!caseDetail) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-primary hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Planner View
          </Button>
        </div>
        <p>Case not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button and Case Info */}
      <div className="space-y-4">
        <Button onClick={onBack} variant="ghost" className="text-primary hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Planner View
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {caseDetail.caseNumber}
                </CardTitle>
                <p className="text-lg text-muted-foreground mt-1">
                  {caseDetail.primaryParty}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {caseDetail.description}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className={`text-sm font-medium px-3 py-1.5 rounded ${getPriorityBadgeStyle(caseDetail.priority)}`}
                >
                  {caseDetail.priority} Priority
                </Badge>
                <Badge 
                  className={`text-sm font-medium px-3 py-1.5 rounded ${getStatusBadgeStyle(caseDetail.status)}`}
                >
                  {caseDetail.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parties">Parties</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Case Details Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Case Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Case Type</p>
                    <p className="font-semibold">{caseDetail.caseType}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Jurisdiction</p>
                    <p className="font-semibold">{caseDetail.jurisdiction}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Filing Fee</p>
                    <p className="font-semibold">{caseDetail.filingFee}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Status</p>
                    <Badge className={`text-sm font-medium px-3 py-1.5 rounded ${getStatusBadgeStyle(caseDetail.status)}`}>
                      {caseDetail.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Case Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Assigned Judge</p>
                    <p className="font-semibold">{caseDetail.assignedJudge}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Court Room</p>
                    <p className="font-semibold">{caseDetail.courtRoom}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Estimated Duration</p>
                    <p className="font-semibold">{caseDetail.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Filing Fee</p>
                    <p className="font-semibold">{caseDetail.filingFee}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="font-medium text-muted-foreground">Important Dates</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>Submitted: {caseDetail.submittedDate}</span>
                    </div>
                    {'acceptedDate' in caseDetail && caseDetail.acceptedDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Accepted: {caseDetail.acceptedDate}</span>
                      </div>
                    )}
                    {'decisionDate' in caseDetail && caseDetail.decisionDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Decision: {caseDetail.decisionDate}</span>
                      </div>
                    )}
                    {'appealDue' in caseDetail && caseDetail.appealDue && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Appeal Due: {caseDetail.appealDue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Parties Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Complainant</span>
                </div>
                <p className="font-medium">{caseDetail.complainant.name}</p>
                <div className="text-sm text-muted-foreground mt-2">
                  <p><strong>Attorney:</strong> {caseDetail.complainant.attorney}</p>
                  <p><strong>Email:</strong> {caseDetail.complainant.email}</p>
                  <p><strong>Phone:</strong> {caseDetail.complainant.phone}</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold text-orange-800">Defendant</span>
                </div>
                <p className="font-medium">{caseDetail.defendant.name}</p>
                <div className="text-sm text-muted-foreground mt-2">
                  <p><strong>Attorney:</strong> {caseDetail.defendant.attorney}</p>
                  <p><strong>Email:</strong> {caseDetail.defendant.email}</p>
                  <p><strong>Phone:</strong> {caseDetail.defendant.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseDetail.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Uploaded: {doc.dateUploaded}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        doc.status === 'Approved' ? 'text-green-700 bg-green-50 border-green-200' :
                        doc.status === 'Pending Review' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                        doc.status === 'Needs Correction' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                        doc.status === 'Rejected' ? 'text-red-700 bg-red-50 border-red-200' :
                        'text-blue-700 bg-blue-50 border-blue-200'
                      }`}
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Case Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseDetail.timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getTimelineIcon(item.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.event}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.status === 'completed' ? 'text-green-700 bg-green-50 border-green-200' :
                        item.status === 'upcoming' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                        item.status === 'overdue' ? 'text-red-700 bg-red-50 border-red-200' :
                        'text-gray-700 bg-gray-50 border-gray-200'
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}