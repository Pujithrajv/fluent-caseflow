import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Eye, Filter } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ParticipantsTab } from "@/components/portal/wizard/ParticipantsTab";


interface Request {
  id: string;
  requestGroup: string;
  requestType: string;
  requestStatus: "draft" | "in-progress" | "completed";
  decisionStatus: "approved" | "denied" | "pending";
  decisionBy: string;
  decisionDate: string;
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
    requestType: "Motion to Expedite",
    requestStatus: "completed",
    decisionStatus: "approved",
    decisionBy: "ALJ Smith",
    decisionDate: "2024-11-20"
  },
  {
    id: "REQ-002", 
    requestGroup: "Discovery",
    requestType: "Document Request",
    requestStatus: "in-progress",
    decisionStatus: "pending",
    decisionBy: "",
    decisionDate: ""
  },
  {
    id: "REQ-003",
    requestGroup: "Motion",
    requestType: "Motion to Dismiss",
    requestStatus: "draft",
    decisionStatus: "denied",
    decisionBy: "Clerk Jones",
    decisionDate: "2024-11-18"
  }
];

const AttorneyCaseView = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [requests] = useState<Request[]>(mockRequests);
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>("all");
  const [decisionStatusFilter, setDecisionStatusFilter] = useState<string>("all");
  
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


  const getRequestStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in-progress": return "secondary";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const getDecisionStatusStyle = (status: string) => {
    switch (status) {
      case "approved": return { backgroundColor: "#16a34a", color: "#ffffff" }; // green
      case "denied": return { backgroundColor: "#dc2626", color: "#ffffff" }; // red
      case "pending": return { backgroundColor: "#6b7280", color: "#ffffff" }; // gray
      default: return { backgroundColor: "#6b7280", color: "#ffffff" };
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesRequestStatus = requestStatusFilter === "all" || request.requestStatus === requestStatusFilter;
    const matchesDecisionStatus = decisionStatusFilter === "all" || request.decisionStatus === decisionStatusFilter;
    return matchesRequestStatus && matchesDecisionStatus;
  });

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
            <div className="grid grid-cols-2 gap-4">
              {/* Department Information */}
              <Card className="shadow-fluent-8 aspect-square flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Department Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
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
              <Card className="shadow-fluent-8 aspect-square flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Primary Party Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
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
              <Card className="shadow-fluent-8 aspect-square flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Case Details</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
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
              <Card className="shadow-fluent-8 aspect-square flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-fluent">Abandon Well Questions</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
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
              <ParticipantsTab 
                onDataChange={() => {}}
                data={participants}
                caseStatus={mockCaseData.status}
              />
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="mt-4">
            <Card className="shadow-fluent-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-fluent">Requests</CardTitle>
                <Button onClick={handleAddRequest}>
                  <Plus className="mr-2 h-4 w-4" />
                  Request
                </Button>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>
                  <Select value={requestStatusFilter} onValueChange={setRequestStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Request Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Request Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={decisionStatusFilter} onValueChange={setDecisionStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Decision Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Decision Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No requests yet. Create your first request to get started.</p>
                    <Button onClick={handleAddRequest} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Request
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Group / Type</TableHead>
                        <TableHead>Request Status</TableHead>
                        <TableHead>Decision Status</TableHead>
                        <TableHead>Decision By</TableHead>
                        <TableHead>Decision Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {request.requestGroup} — {request.requestType}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRequestStatusBadgeVariant(request.requestStatus)}>
                              {request.requestStatus.charAt(0).toUpperCase() + request.requestStatus.slice(1).replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div 
                              className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap"
                              style={getDecisionStatusStyle(request.decisionStatus)}
                            >
                              {request.decisionStatus.charAt(0).toUpperCase() + request.decisionStatus.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell>{request.decisionBy || "—"}</TableCell>
                          <TableCell>{request.decisionDate || "—"}</TableCell>
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

    </div>
  );
};

export default AttorneyCaseView;