import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, Shield, ArrowLeft, Calendar, Clock, Video, MapPin, FolderOpen, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CaseItem {
  id: string;
  name: string;
  caseNumber?: string;
  caseType: string;
  department: string;
  primaryPartyName: string;
  primaryPartyType: string;
  status: "accepted";
  stage: string;
  lastActionDate: string;
  assignedAttorney?: string;
}

const mockAcceptedCases: CaseItem[] = [
  {
    id: "DBE-2024-001-EC",
    name: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    caseNumber: "DBE-2024-001-EC",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    primaryPartyName: "Kirby Neroni",
    primaryPartyType: "Respondent",
    status: "accepted",
    stage: "Pre-Hearing",
    lastActionDate: "2025-08-11",
    assignedAttorney: "Greg Miles",
  }
];

const AttorneyDashboard = () => {
  const navigate = useNavigate();
  const [cases] = useState<CaseItem[]>(mockAcceptedCases);
  const [activeTab, setActiveTab] = useState("cases");

  const handleViewCase = (caseId: string) => {
    navigate(`/attorney/case/${caseId}`);
  };

  // Mock events for attorney dashboard
  const mockEvents = [
    {
      id: 1,
      title: "Initial Case Management Conference",
      subtitle: "Notice of Initial Case Management Conference",
      date: "2025-08-25",
      time: "1:00 PM",
      endDate: "2025-08-25",
      endTime: "2:00 PM",
      location: "Microsoft Teams Meeting",
      meetingId: "392 671 125 846",
      type: "Conference",
      eventType: "meeting",
      isTeamsEvent: true,
      hasCase: true,
      caseNumber: "DBE-2024-001-EC",
      caseType: "Grain Dealer and Warehouse Licensing",
      department: "Department of Agriculture",
      departmentRole: "Complainant",
      primaryParty: "Kirby Neroni",
      primaryPartyRole: "Respondent",
      timezone: "CST"
    }
  ];

  // Mock tasks for attorney dashboard
  const mockTasks = [
    {
      id: "DBE-2024-001-EC",
      caseNumber: "DBE-2024-001-EC",
      title: "Document Review Pending",
      description: "Grain Dealer and Warehouse Licensing case review",
      primaryParty: "Kirby Neroni",
      priority: "High Priority",
      dueDate: "2024-12-22",
      priorityClass: "bg-warning/20 border-warning",
      type: "task"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Attorney Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage accepted cases, events, and tasks
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="justify-start bg-transparent border-b border-border h-14 rounded-none p-0">
            <TabsTrigger 
              value="cases" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Cases
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Tasks & Alerts
            </TabsTrigger>
          </TabsList>

          {/* Cases Tab Content */}
          <TabsContent value="cases" className="mt-6">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="font-fluent">Accepted Cases</CardTitle>
              </CardHeader>
              <CardContent>
                {cases.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No accepted cases</h3>
                    <p className="text-muted-foreground">You don't have any accepted cases yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case Number</TableHead>
                        <TableHead>Case Type</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Primary Party</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Action</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-medium">
                            {caseItem.caseNumber || caseItem.id}
                          </TableCell>
                          <TableCell>{caseItem.caseType}</TableCell>
                          <TableCell>{caseItem.department}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{caseItem.primaryPartyName}</div>
                              <div className="text-sm text-muted-foreground">{caseItem.primaryPartyType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{caseItem.stage}</Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={caseItem.status} />
                          </TableCell>
                          <TableCell>{caseItem.lastActionDate}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCase(caseItem.id)}
                            >
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

          {/* Upcoming Events Tab Content */}
          <TabsContent value="events" className="mt-6">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="font-fluent">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {mockEvents.map((event) => (
                    <Card key={event.id} className="shadow-sm border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold leading-tight">
                            {event.title}
                          </CardTitle>
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        {/* Case & Party Metadata */}
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">{event.caseNumber}:</span> {event.caseType}
                          </div>
                          <div className="text-muted-foreground">
                            {event.department} ({event.departmentRole})
                          </div>
                          <div className="text-muted-foreground">
                            {event.primaryParty} ({event.primaryPartyRole})
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{event.time} - {event.endTime} {event.timezone}</span>
                          </div>
                          <div className="flex items-start">
                            {event.isTeamsEvent ? (
                              <Video className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                            ) : (
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                            )}
                            <div>
                              <div>{event.location}</div>
                              {event.isTeamsEvent && event.meetingId && (
                                <div className="text-xs text-muted-foreground">Meeting ID: {event.meetingId}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-2 pt-2">
                          {event.isTeamsEvent && (
                            <Button size="sm" className="flex-1">
                              <Video className="mr-2 h-4 w-4" />
                              Join Teams
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="flex-1">
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Open Case
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate(`/appointment/${event.id}`)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Appointment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks & Alerts Tab Content */}
          <TabsContent value="tasks" className="mt-6">
            <Card className="shadow-fluent-8">
              <CardHeader>
                <CardTitle className="font-fluent">Tasks & Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <Card key={task.id} className={`border-l-4 ${task.priorityClass}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {task.caseNumber}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {task.priority}
                              </Badge>
                            </div>
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Primary Party: {task.primaryParty}</span>
                              <span>Due: {formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AttorneyDashboard;