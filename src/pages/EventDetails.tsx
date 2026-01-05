import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  HelpCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2,
  Users,
  FileText,
  ExternalLink
} from "lucide-react";

const mockEvents = [
  {
    id: "1",
    title: "Initial Case Management Conference",
    subtitle: "Notice of Initial Case Management Conference",
    date: "August 25, 2025",
    time: "1:00 PM",
    endTime: "2:00 PM",
    duration: "1 hour",
    location: "Microsoft Teams Meeting",
    meetingId: "392 671 125 846",
    type: "Conference",
    isTeamsEvent: true,
    caseNumber: "DBE-2024-001-EC",
    caseName: "Grain Dealer and Warehouse Licensing",
    primaryParty: "Kirby Neroni",
    primaryPartyRole: "Respondent",
    department: "Department of Agriculture",
    departmentRole: "Complainant",
    timezone: "CST",
    instructions: "Please join the Microsoft Teams meeting at the scheduled time. Ensure your audio and video are working properly before the conference begins. All parties should be prepared to discuss case scheduling and preliminary matters.",
    physicalLocation: {
      building: "William G. Stratton Building",
      room: "Room 502",
      address: "401 South Spring Street",
      city: "Springfield, IL 62706-4000"
    }
  },
  {
    id: "2",
    title: "Case Management Continuance",
    subtitle: "Web-based session",
    date: "September 14, 2025",
    time: "10:00 AM",
    endTime: "11:00 AM",
    duration: "1 hour",
    location: "Microsoft Teams Meeting",
    meetingId: "855 123 456 789",
    type: "Meeting",
    isTeamsEvent: true,
    caseNumber: "CASE-2024-001",
    caseName: "Weights & Measures Inspections",
    primaryParty: "Sniders Group",
    primaryPartyRole: "Respondent",
    department: "Department of Agriculture",
    departmentRole: "Petitioner",
    timezone: "CST",
    instructions: "This is a continuation of the previous case management conference. All parties should come prepared with updated status reports.",
    physicalLocation: null
  },
  {
    id: "3",
    title: "Pre-hearing Conference",
    subtitle: "Web-based session",
    date: "September 14, 2025",
    time: "2:00 PM",
    endTime: "3:00 PM",
    duration: "1 hour",
    location: "Microsoft Teams Meeting",
    meetingId: "123 987 654 321",
    type: "Conference",
    isTeamsEvent: true,
    caseNumber: "CASE-2024-002",
    caseName: "Weights & Measures Inspections",
    primaryParty: "Midtown Vending LLC",
    primaryPartyRole: "Respondent",
    department: "Department of Agriculture",
    departmentRole: "Petitioner",
    timezone: "CST",
    instructions: "Pre-hearing conference to discuss witness lists, exhibit exchanges, and hearing procedures.",
    physicalLocation: null
  },
  {
    id: "4",
    title: "Administrative Hearing",
    subtitle: "Professional Hearing Session",
    date: "September 19, 2025",
    time: "1:00 PM",
    endTime: "3:00 PM",
    duration: "2 hours",
    location: "In-Person",
    type: "Hearing",
    isTeamsEvent: false,
    caseNumber: "CASE-2024-003",
    caseName: "Food Safety",
    primaryParty: "North District Foods",
    primaryPartyRole: "Respondent",
    department: "Department of Public Health",
    departmentRole: "Complainant",
    timezone: "CST",
    instructions: "This is a formal administrative hearing. All parties must appear in person. Please arrive 15 minutes early for check-in. Bring all relevant documents and exhibits.",
    physicalLocation: {
      building: "William G. Stratton Building",
      room: "Room 502",
      address: "401 South Spring Street",
      city: "Springfield, IL 62706-4000"
    }
  }
];

export default function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTab, setActiveTab] = useState("details");

  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return 'bg-blue-600 text-white';
      case 'hearing':
        return 'bg-red-600 text-white';
      case 'meeting':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dark Navy Header */}
      <header className="bg-[#1a2744] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">ALJ Case Management Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <button 
            onClick={() => navigate('/portal')}
            className="hover:text-blue-600 transition-colors"
          >
            Events
          </button>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">Event Details</span>
        </nav>

        {/* Event Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h1>
              
              {/* Case Info Block */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Case Number</span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{event.caseNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Case Name</span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{event.caseName}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Primary Party</span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{event.primaryParty}</p>
                  </div>
                </div>
              </div>

              {/* Date and Status */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 font-medium">
                  Scheduled
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Badge className={`${getTypeBadgeColor(event.type)} px-4 py-1.5 text-sm font-medium rounded-full`}>
                {event.type}
              </Badge>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HelpCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border border-gray-200 rounded-lg p-1 mb-6 h-auto">
            <TabsTrigger 
              value="details" 
              className="px-6 py-2.5 text-sm font-medium rounded-md data-[state=active]:bg-[#1a2744] data-[state=active]:text-white"
            >
              Event Details
            </TabsTrigger>
            <TabsTrigger 
              value="participants" 
              className="px-6 py-2.5 text-sm font-medium rounded-md data-[state=active]:bg-[#1a2744] data-[state=active]:text-white"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger 
              value="notice" 
              className="px-6 py-2.5 text-sm font-medium rounded-md data-[state=active]:bg-[#1a2744] data-[state=active]:text-white"
            >
              Event Notice
            </TabsTrigger>
          </TabsList>

          {/* Event Details Tab */}
          <TabsContent value="details" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Event Details */}
              <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Event Details</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to My Calendar
                    </Button>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Event Date</span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{event.date}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Event Type</span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {event.isTeamsEvent ? 'Online' : 'In-Person'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Event Time</span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{event.time} - {event.endTime} {event.timezone}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{event.duration}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Instructions</span>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">{event.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Meeting Cards */}
              <div className="space-y-6">
                {/* Online Meeting Card */}
                {event.isTeamsEvent && (
                  <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Video className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Online Meeting</h3>
                      </div>

                      <div className="space-y-3 mb-5">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Platform</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">Microsoft Teams Meeting</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meeting ID</span>
                          <p className="text-sm font-mono font-semibold text-gray-900 mt-1">{event.meetingId}</p>
                        </div>
                      </div>

                      <Button className="w-full bg-[#1a2744] hover:bg-[#2a3754] text-white font-medium">
                        <Video className="h-4 w-4 mr-2" />
                        Join Teams
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* In-Person Meeting Card */}
                {event.physicalLocation && (
                  <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">In-Person Meeting</h3>
                      </div>

                      <div className="space-y-3 mb-5">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Building</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{event.physicalLocation.building}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Room</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{event.physicalLocation.room}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {event.physicalLocation.address}<br />
                            {event.physicalLocation.city}
                          </p>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>

                      {/* Map Placeholder */}
                      <div className="mt-4 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <span className="text-sm">Map View</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="mt-0">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Event Participants</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{event.department}</p>
                        <p className="text-sm text-gray-500">Government Agency</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {event.departmentRole}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{event.primaryParty}</p>
                        <p className="text-sm text-gray-500">Primary Party</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {event.primaryPartyRole}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Notice Tab */}
          <TabsContent value="notice" className="mt-0">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Event Notice Documents</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Notice of {event.title}</p>
                        <p className="text-sm text-gray-500">PDF Document • Includes Certificate of Service</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
