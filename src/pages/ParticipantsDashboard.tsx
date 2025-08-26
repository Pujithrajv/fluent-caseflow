import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Calendar, MapPin } from "lucide-react";
import { CaseWizard } from "@/components/portal/CaseWizard";
import { AljWarningModal } from "@/components/portal/AljWarningModal";

interface CaseItem {
  id: string;
  caseNumber: string;
  status: 'draft' | 'submitted' | 'accepted';
  department: string;
  primaryParty: string;
  importantDates: Array<{
    type: string;
    date: string;
  }>;
  iconType?: string;
}

// Only show the accepted case
const acceptedCase: CaseItem = {
  id: "CASE-2024-004",
  caseNumber: "CASE-2024-004",
  status: 'accepted',
  department: "Department of Labor",
  primaryParty: "Michael Johnson",
  importantDates: [
    { type: "Hearing Date", date: "2024-03-15" },
    { type: "Document Deadline", date: "2024-03-01" }
  ],
  iconType: "briefcase"
};

const mockEvents = [
  {
    id: "1",
    title: "Pre-hearing Conference",
    date: "2024-02-28",
    time: "10:00 AM",
    location: "Room 205, Springfield Building"
  },
  {
    id: "2", 
    title: "Document Review Meeting",
    date: "2024-03-05",
    time: "2:00 PM",
    location: "Virtual Meeting"
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const ParticipantsDashboard = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "view-case">("dashboard");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView("view-case");
  };

  if (currentView === "view-case") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} mode="view-edit" caseStatus="accepted" caseId={selectedCaseId} />;
  }

  return (
    <>
      <AljWarningModal onAcknowledge={() => {}} />
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Participants Dashboard</h1>
              <p className="text-muted-foreground">
                Manage participant information and case details
              </p>
            </div>
          </div>

          <Tabs defaultValue="cases" className="space-y-6">
            <TabsList>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="tasks">Tasks & Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case #</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Primary Party</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Important Dates</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          {acceptedCase.caseNumber}
                        </TableCell>
                        <TableCell>{acceptedCase.department}</TableCell>
                        <TableCell>{acceptedCase.primaryParty}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-100"
                          >
                            Accepted
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {acceptedCase.importantDates.map((date, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{date.type}:</span>{" "}
                                <span className="text-muted-foreground">
                                  {formatDate(date.date)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCase(acceptedCase.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDate(event.date)} at {event.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Review participant documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          Verify all participant information is complete and accurate
                        </p>
                      </div>
                      <Badge variant="destructive">High Priority</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Due: March 1, 2024
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Update contact information</h3>
                        <p className="text-sm text-muted-foreground">
                          Ensure all participant contact details are current
                        </p>
                      </div>
                      <Badge variant="secondary">Medium Priority</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Due: March 5, 2024
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ParticipantsDashboard;