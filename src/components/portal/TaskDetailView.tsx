import { ArrowLeft, Calendar, User, Users, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskDetailViewProps {
  taskId: string;
  onBack: () => void;
}

interface CaseData {
  caseNumber: string;
  primaryParty: string;
  description: string;
  caseType: string;
  jurisdiction: string;
  filingFee: string;
  status: string;
  priority: string;
  submittedDate: string;
  acceptedDate?: string;
  decisionDate?: string;
  appealDue?: string;
  complainant: { name: string; attorney: string; email: string; phone: string };
  defendant: { name: string; attorney: string; email: string; phone: string };
  assignee: string;
}

// Mock data based on the case from planner view
const mockCaseData: Record<string, CaseData> = {
  '1': {
    caseNumber: 'CASE-2024-001',
    primaryParty: 'Kirby Neroni',
    description: 'New case successfully created and saved to records.',
    caseType: 'Administrative Hearing',
    jurisdiction: 'State Administrative Court',
    filingFee: '$350.00',
    status: 'Active',
    priority: 'Info',
    submittedDate: '9/7/2025',
    acceptedDate: '9/9/2025',
    decisionDate: '9/15/2025',
    complainant: { name: 'Kirby Neroni', attorney: 'John Smith', email: 'john.smith@law.com', phone: '(555) 123-4567' },
    defendant: { name: 'State Agency', attorney: 'Jane Doe', email: 'jane.doe@agency.gov', phone: '(555) 987-6543' },
    assignee: 'JD'
  },
  '2': {
    caseNumber: 'CASE-2024-002',
    primaryParty: 'Sniders Group',
    description: 'Case returned for correction – missing/incorrect information or documents.',
    caseType: 'Regulatory Dispute',
    jurisdiction: 'Federal Administrative Court',
    filingFee: '$500.00',
    status: 'Correction Required',
    priority: 'High',
    submittedDate: '10/4/2024',
    decisionDate: '12/26/2024',
    appealDue: '11/14/2024',
    complainant: { name: 'Sniders Group', attorney: 'Mike Johnson', email: 'mike.johnson@law.com', phone: '(555) 234-5678' },
    defendant: { name: 'Regulatory Board', attorney: 'Sarah Wilson', email: 'sarah.wilson@regboard.gov', phone: '(555) 876-5432' },
    assignee: 'SW'
  },
  '3': {
    caseNumber: 'DBE-2024-001-EC',
    primaryParty: 'North District Foods',
    description: 'Case Accepted – Case Number generated.',
    caseType: 'Health Code Violation',
    jurisdiction: 'Municipal Administrative Court',
    filingFee: '$275.00',
    status: 'Accepted',
    priority: 'Normal',
    submittedDate: '9/17/2025',
    acceptedDate: '9/19/2025',
    decisionDate: '9/25/2025',
    complainant: { name: 'North District Foods', attorney: 'Robert Lee', email: 'robert.lee@law.com', phone: '(555) 345-6789' },
    defendant: { name: 'Health Department', attorney: 'Lisa Chen', email: 'lisa.chen@health.gov', phone: '(555) 765-4321' },
    assignee: 'LC'
  },
  '4': {
    caseNumber: 'ABD-2024-001-EC',
    primaryParty: 'Valley Grain Solutions',
    description: 'Case Rejected – ALJ after checklist review.',
    caseType: 'Agricultural Compliance',
    jurisdiction: 'State Administrative Court',
    filingFee: '$425.00',
    status: 'Rejected',
    priority: 'Critical',
    submittedDate: '8/24/2025',
    appealDue: '9/15/2025',
    complainant: { name: 'Valley Grain Solutions', attorney: 'David Kim', email: 'david.kim@law.com', phone: '(555) 456-7890' },
    defendant: { name: 'Agricultural Board', attorney: 'Maria Garcia', email: 'maria.garcia@agboard.gov', phone: '(555) 654-3210' },
    assignee: 'MG'
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

const getPriorityBadgeStyle = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'normal':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'info':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function TaskDetailView({ taskId, onBack }: TaskDetailViewProps) {
  const caseData = mockCaseData[taskId];

  if (!caseData) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p>Case not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - Constant */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{caseData.caseNumber}</h1>
            <p className="text-lg text-muted-foreground">{caseData.primaryParty}</p>
            <p className="text-sm text-muted-foreground">{caseData.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs font-medium px-3 py-1.5 ${getPriorityBadgeStyle(caseData.priority)}`}
            >
              {caseData.priority}
            </Badge>
            <Badge 
              className={`text-xs font-medium px-3 py-1.5 ${getStatusBadgeStyle(caseData.status)}`}
            >
              {caseData.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="px-6">
        <Tabs defaultValue="task-details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="task-details">Task Details</TabsTrigger>
            <TabsTrigger value="participants2">Participants</TabsTrigger>
          </TabsList>
          
          <TabsContent value="task-details" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Case Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Case Number</label>
                    <p className="text-sm font-semibold">{caseData.caseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Case Type</label>
                    <p className="text-sm font-semibold">{caseData.caseType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Jurisdiction</label>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {caseData.jurisdiction}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Filing Fee</label>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {caseData.filingFee}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Task Description</label>
                  <p className="text-sm text-foreground mt-1">{caseData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Submitted Date:</span>
                  <span className="text-sm font-semibold">{caseData.submittedDate}</span>
                </div>
                
                {caseData.acceptedDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Accepted Date:</span>
                    <span className="text-sm font-semibold">{caseData.acceptedDate}</span>
                  </div>
                )}
                
                {caseData.decisionDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Decision Date:</span>
                    <span className="text-sm font-semibold">{caseData.decisionDate}</span>
                  </div>
                )}
                
                {caseData.appealDue && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Appeal Due:</span>
                    <span className="text-sm font-semibold text-orange-600">{caseData.appealDue}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="participants2" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    First Party
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-sm font-semibold">{caseData.complainant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Attorney</label>
                    <p className="text-sm font-semibold">{caseData.complainant.attorney}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm text-foreground">{caseData.complainant.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm text-foreground">{caseData.complainant.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Second Party
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-sm font-semibold">{caseData.defendant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Attorney</label>
                    <p className="text-sm font-semibold">{caseData.defendant.attorney}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm text-foreground">{caseData.defendant.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm text-foreground">{caseData.defendant.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Case Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned to</label>
                  <p className="text-sm font-semibold">{caseData.assignee}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}