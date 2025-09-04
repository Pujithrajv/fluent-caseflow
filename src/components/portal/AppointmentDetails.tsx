import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video, FolderOpen, Calendar, Clock, MapPin, Users, Building, File, Eye, Download } from "lucide-react";

interface AppointmentDetailsProps {
  // This will be populated based on the appointment ID from URL params
}

export function AppointmentDetails() {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();

  // Mock appointment data - in a real app, this would be fetched based on appointmentId
  const appointmentData = {
    id: appointmentId || "1",
    title: "Initial Case Management Conference",
    type: "Conference",
    caseReference: "DBE-2024-001-EC",
    caseTitle: "Grain Dealer and Warehouse Licensing",
    caseType: "Licensing Violation",
    complainant: "Department of Natural Resources",
    defendant: "Rajaram Sheppard",
    date: "January 15, 2025",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    timezone: "CST",
    duration: "1 hour",
    isTeamsEvent: true,
    location: "Microsoft Teams Meeting",
    meetingId: "859 234 567 89",
    aljAssigned: "Judge Sarah Mitchell"
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleOpenCase = () => {
    // Navigate to case wizard or case details
    navigate(`/dashboard?case=${appointmentData.caseReference}`);
  };

  const handleJoinTeams = () => {
    // In a real app, this would open Teams or the meeting link
    console.log("Joining Teams meeting:", appointmentData.meetingId);
  };

  const handleViewDocument = () => {
    // In a real app, this would open a document preview modal
    console.log("Opening document preview modal");
  };

  const handleDownloadDocument = () => {
    // In a real app, this would download the document
    console.log("Downloading document");
  };

  const getTypeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hearing':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        {/* Title and Badge */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">{appointmentData.title}</h1>
            <Badge 
              variant="outline" 
              className={`px-3 py-1 font-medium ${getTypeVariant(appointmentData.type)}`}
            >
              {appointmentData.type}
            </Badge>
          </div>
        </div>

        {/* Appointment Information Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-primary" />
              <span>Appointment Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Case Reference</label>
                <p className="text-foreground font-medium">{appointmentData.caseReference}: {appointmentData.caseTitle}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Case Type</label>
                <p className="text-foreground">{appointmentData.caseType}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4" />
                  <span>Related Parties</span>
                </label>
                <div className="space-y-2 ml-6">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{appointmentData.complainant}</span>
                    <Badge variant="outline" className="text-xs">Complainant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{appointmentData.defendant}</span>
                    <Badge variant="outline" className="text-xs">Defendant</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling Details Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Scheduling Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-foreground font-medium">{appointmentData.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="text-foreground font-medium">
                    {appointmentData.startTime} - {appointmentData.endTime} {appointmentData.timezone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                {appointmentData.isTeamsEvent ? (
                  <div className="mt-1">
                    <p className="text-foreground font-medium">{appointmentData.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Meeting ID: {appointmentData.meetingId}
                    </p>
                  </div>
                ) : (
                  <p className="text-foreground mt-1 whitespace-pre-line">{appointmentData.location}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="text-foreground">{appointmentData.duration}</p>
              </div>
            </div>

            {appointmentData.aljAssigned && (
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ALJ Assigned</label>
                  <p className="text-foreground font-medium">{appointmentData.aljAssigned}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Case Documents Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <File className="h-5 w-5 text-primary" />
              <span>Case Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📄</div>
                <div>
                  <p className="text-foreground font-medium">Notice of Initial Case Management Conference</p>
                  <p className="text-sm text-muted-foreground">Includes Certificate of Service</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewDocument}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadDocument}
                  className="flex items-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions Footer */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              {appointmentData.isTeamsEvent && (
                <Button 
                  onClick={handleJoinTeams}
                  className="flex-1 sm:flex-none sm:min-w-[140px]"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join Teams
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleOpenCase}
                className="flex-1 sm:flex-none sm:min-w-[140px]"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Open Case
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex-1 sm:flex-none sm:min-w-[140px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}