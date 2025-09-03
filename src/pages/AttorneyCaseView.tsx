import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Eye, Edit, UserPlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { NewParticipantModal } from "@/components/portal/NewParticipantModal";

interface Request {
  id: string;
  requestGroup: string;
  requestType: string;
  status: "draft" | "submitted" | "approved" | "denied";
  submissionDate: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  organization: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const mockRequests: Request[] = [
  {
    id: "REQ-001",
    requestGroup: "Motion",
    requestType: "Motion to Compel",
    status: "submitted",
    submissionDate: "2024-11-15"
  },
  {
    id: "REQ-002", 
    requestGroup: "Discovery",
    requestType: "Document Request",
    status: "approved",
    submissionDate: "2024-11-10"
  }
];

const AttorneyCaseView = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [requests] = useState<Request[]>(mockRequests);
  const [showNewParticipantModal, setShowNewParticipantModal] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      firstName: "Kirby",
      lastName: "Neroni",
      role: "Respondent",
      organization: "",
      phone: "",
      email: "kirby.neroni@example.com",
      address: "",
      notes: ""
    },
    {
      id: "2",
      firstName: "",
      lastName: "",
      role: "Complainant",
      organization: "Department of Agriculture",
      phone: "(217) 555-0123",
      email: "legal@agriculture.illinois.gov",
      address: "",
      notes: ""
    }
  ]);

  const mockCaseData = {
    id: caseId,
    caseNumber: "DBE-2024-001-EC",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    primaryPartyName: "Kirby Neroni",
    primaryPartyType: "Respondent",
    status: "accepted" as const,
    stage: "Pre-Hearing",
    assignedAttorney: "Greg Miles"
  };

  const mockParticipants = [
    {
      id: "1",
      name: "Kirby Neroni",
      role: "Respondent",
      type: "Individual",
      email: "kirby.neroni@example.com"
    },
    {
      id: "2", 
      name: "Department of Agriculture",
      role: "Complainant",
      type: "Government Agency",
      email: "legal@agriculture.illinois.gov"
    }
  ];

  const handleAddRequest = () => {
    navigate(`/attorney/case/${caseId}/add-request`);
  };

  const handleAddParticipant = (newParticipant: Participant) => {
    setParticipants(prev => [...prev, newParticipant]);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "submitted": return "secondary";
      case "draft": return "outline";
      case "denied": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      {/* Header */}
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/attorney/dashboard")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {mockCaseData.caseNumber}: {mockCaseData.caseType}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mockCaseData.department} • {mockCaseData.stage}
          </p>
        </div>

        {/* Full-width Tab Bar */}
        <div className="mt-6 mb-4">
          <Tabs defaultValue="case-summary" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-border h-auto rounded-none p-0 grid grid-cols-3 gap-0">
              <TabsTrigger 
                value="case-summary"
                className="font-fluent text-base font-medium rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-none hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring px-4 sm:px-6 py-4 min-h-[44px] min-w-[160px] transition-all duration-200 text-center flex items-center justify-center"
              >
                <span className="leading-tight">Case Summary</span>
              </TabsTrigger>
              <TabsTrigger 
                value="participants"
                className="font-fluent text-base font-medium rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-none hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring px-4 sm:px-6 py-4 min-h-[44px] min-w-[160px] transition-all duration-200 text-center flex items-center justify-center"
              >
                <span className="leading-tight">Participants</span>
              </TabsTrigger>
              <TabsTrigger 
                value="requests"
                className="font-fluent text-base font-medium rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-none hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring px-4 sm:px-6 py-4 min-h-[44px] min-w-[160px] transition-all duration-200 text-center flex items-center justify-center"
              >
                <span className="leading-tight">Requests</span>
              </TabsTrigger>
            </TabsList>

            {/* Case Summary Tab */}
            <TabsContent value="case-summary" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
              {/* Department Information */}
              <Card className="shadow-fluent-8 w-full h-[360px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Department Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Department</label>
                      <p className="font-medium">{mockCaseData.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Reference Number</label>
                      <p className="font-medium">AGR-2024-0892</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Division</label>
                      <p className="font-medium">Division of Agricultural Industry Regulation</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Bureau</label>
                      <p className="font-medium">Bureau of Administrative Hearings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primary Party Information */}
              <Card className="shadow-fluent-8 w-full h-[360px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Primary Party Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Party Name</label>
                      <p className="font-medium">{mockCaseData.primaryPartyName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Represented</label>
                      <p className="font-medium">No</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Details */}
              <Card className="shadow-fluent-8 w-full h-[360px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Case Details</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Initiating Action Date</label>
                      <p className="font-medium">July 15, 2024</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Responsive Action Date</label>
                      <p className="font-medium">August 11, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Abandon Well Questions */}
              <Card className="shadow-fluent-8 w-full h-[360px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Abandon Well Questions</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Permittee Number</label>
                      <p className="font-medium text-muted-foreground">Not applicable</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Permit Number</label>
                      <p className="font-medium text-muted-foreground">Not applicable</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Number of Wells</label>
                      <p className="font-medium text-muted-foreground">Not applicable</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="mt-4">
            <Card className="shadow-fluent-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-fluent">Case Participants</CardTitle>
                <Button 
                  onClick={() => setShowNewParticipantModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  New Participant
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.firstName && participant.lastName
                            ? `${participant.firstName} ${participant.lastName}`
                            : participant.organization || 'N/A'}
                        </TableCell>
                        <TableCell>{participant.role || 'N/A'}</TableCell>
                        <TableCell>{participant.organization || 'N/A'}</TableCell>
                        <TableCell>{participant.email || 'N/A'}</TableCell>
                        <TableCell>{participant.phone || 'N/A'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="mt-4">
            <Card className="shadow-fluent-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-fluent">Case Requests</CardTitle>
                <Button onClick={handleAddRequest}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Request
                </Button>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No requests have been made for this case.</p>
                    <Button onClick={handleAddRequest} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Request
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request Group</TableHead>
                        <TableHead>Request Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestGroup}</TableCell>
                          <TableCell>{request.requestType}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.submissionDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* New Participant Modal */}
      <NewParticipantModal
        isOpen={showNewParticipantModal}
        onClose={() => setShowNewParticipantModal(false)}
        onParticipantCreated={handleAddParticipant}
      />
    </div>
  );
};

export default AttorneyCaseView;