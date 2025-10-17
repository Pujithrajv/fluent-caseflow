import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus } from "lucide-react";

const CaseDetail = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("case-summary");

  // Mock case data
  const caseData = {
    id: "DBE-2024-001-EC",
    caseNumber: "DBE-2024-001-EC",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    primaryParty: "Kirby Neroni",
    status: "Accepted",
    stage: "Pre-Hearing",
    description: "This case involves grain dealer and warehouse licensing regulations.",
    filingDate: "2024-08-11",
    assignedAttorney: "Greg Miles"
  };

  // Mock requests data
  const mockRequests = [
    {
      id: "REQ-001",
      type: "Discovery Request",
      submittedBy: "Department of Agriculture",
      submittedDate: "2024-12-01",
      status: "Pending",
      description: "Initial discovery request for documentation"
    },
    {
      id: "REQ-002",
      type: "Motion",
      submittedBy: "Kirby Neroni",
      submittedDate: "2024-11-28",
      status: "Under Review",
      description: "Motion to extend discovery deadline"
    }
  ];

  const handleSubprocessClick = () => {
    navigate(`/case/${caseId}/discovery-workflow`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/portal")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Case Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">
                  Case #{caseData.caseNumber}
                </CardTitle>
                <p className="text-muted-foreground">{caseData.caseType}</p>
              </div>
              <Badge variant="default" className="text-base px-4 py-2">
                {caseData.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0 w-full">
            <TabsTrigger 
              value="case-summary" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Case Summary
            </TabsTrigger>
            <TabsTrigger 
              value="participants" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger 
              value="requests" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Requests
            </TabsTrigger>
          </TabsList>

          {/* Case Summary Tab */}
          <TabsContent value="case-summary" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Case Number</p>
                    <p className="text-base">{caseData.caseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Case Type</p>
                    <p className="text-base">{caseData.caseType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-base">{caseData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Primary Party</p>
                    <p className="text-base">{caseData.primaryParty}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stage</p>
                    <p className="text-base">{caseData.stage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Filing Date</p>
                    <p className="text-base">{caseData.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned Attorney</p>
                    <p className="text-base">{caseData.assignedAttorney}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                  <p className="text-base">{caseData.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <p className="font-medium">Primary Party</p>
                    <p className="text-sm text-muted-foreground">{caseData.primaryParty}</p>
                    <p className="text-sm text-muted-foreground">Role: Respondent</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium">{caseData.department}</p>
                    <p className="text-sm text-muted-foreground">Role: Complainant</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium">{caseData.assignedAttorney}</p>
                    <p className="text-sm text-muted-foreground">Role: Assigned Attorney</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Requests</CardTitle>
                <Button onClick={handleSubprocessClick}>
                  <Plus className="mr-2 h-4 w-4" />
                  Subprocess
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.submittedBy}</TableCell>
                        <TableCell>{request.submittedDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.status}</Badge>
                        </TableCell>
                        <TableCell>{request.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDetail;
