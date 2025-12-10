import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar, Clock, MapPin, FileText, Users, Building, User, Briefcase } from 'lucide-react';

const recommendedDecisions = [
  {
    id: 1,
    caseNumber: 'DNR-OLE-HFSS-25-00001',
    caseName: 'Summary Suspension',
    caseType: 'Initial Case Management Conference',
    eventType: 'Conference',
    eventTypeColor: 'bg-[#0d6efd] text-white',
    department: 'Department of Natural Resources',
    partyRole: 'Complainant',
    primaryParty: 'John Smith',
    secondPartyRole: 'Defendant',
    eventDate: 'September 22, 2025',
    eventTime: '11:30 AM CST',
    locationType: 'Microsoft Teams Meeting',
    meetingId: '222 647 995 075',
  },
  {
    id: 2,
    caseNumber: 'DNR-OLE-HFSS-25-00001',
    caseName: 'Summary Suspension',
    caseType: 'Hearing',
    eventType: 'Hearing',
    eventTypeColor: 'bg-[#dc3545] text-white',
    department: 'Department of Natural Resources',
    partyRole: 'Complainant',
    primaryParty: 'Rajaram Sheppard',
    secondPartyRole: 'Defendant',
    eventDate: 'September 30, 2025',
    eventTime: '2:00 PM CST',
    locationType: 'In-Person Meeting',
    locationAddress: 'William G. Stratton Building\nConference Room A\n401 South Spring Street\nSpringfield, IL 62706-4000',
  },
  {
    id: 3,
    caseNumber: 'DNR-OLE-HFSS-25-00001',
    caseName: 'Summary Suspension',
    caseType: 'Case Management Conference Continuance',
    eventType: 'Conference',
    eventTypeColor: 'bg-[#0d6efd] text-white',
    department: 'Department of Natural Resources',
    partyRole: 'Complainant',
    primaryParty: 'Jeronimo Lovel',
    secondPartyRole: 'Defendant',
    eventDate: 'September 23, 2025',
    eventTime: '1:30 PM CST',
    locationType: 'Microsoft Teams Meeting',
    meetingId: '222 647 995 074',
  },
];

const FinalDecisionMaker2: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  const [filterValue, setFilterValue] = useState('all');

  const handleCaseClick = (caseId: number) => {
    navigate(`/fdm2/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-1 font-fluent">
          Upcoming Events
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[#0d6efd] mb-4 font-fluent">
          <span 
            className="hover:underline cursor-pointer"
            onClick={() => navigate('/portal')}
          >
            Dashboard
          </span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-muted-foreground">Upcoming Events</span>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-4">
            <TabsTrigger 
              value="cases" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Cases
            </TabsTrigger>
            <TabsTrigger 
              value="recommended" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Tasks and Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {/* Filter Row */}
            <div className="flex items-center justify-between mb-6">
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px] h-10 border-gray-300 bg-white font-fluent">
                  <SelectValue placeholder="Filter events" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                  <SelectItem value="hearing">Hearings</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 h-10 font-fluent border-gray-300 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedDecisions.map((decision) => (
                <Card 
                  key={decision.id} 
                  className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#1a365d] font-fluent leading-tight pr-2">
                        {decision.caseType}
                      </h3>
                      <Badge className={`${decision.eventTypeColor} font-fluent text-xs px-2 py-0.5 rounded shrink-0`}>
                        {decision.eventType}
                      </Badge>
                    </div>

                    {/* Case Info */}
                    <div className="space-y-2 mb-4 text-[#0d6efd]">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-sm font-fluent">{decision.caseNumber}: {decision.caseName}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-sm font-fluent">{decision.department} ({decision.partyRole})</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-sm font-fluent">{decision.primaryParty} ({decision.secondPartyRole})</span>
                      </div>
                    </div>

                    {/* Date/Time/Location */}
                    <div className="space-y-2 mb-6 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#1a365d] shrink-0" />
                        <span className="text-sm font-fluent">{decision.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#1a365d] shrink-0" />
                        <span className="text-sm font-fluent">{decision.eventTime}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#1a365d] mt-0.5 shrink-0" />
                        <div className="text-sm font-fluent">
                          <div>{decision.locationType}</div>
                          {decision.meetingId && (
                            <div className="text-gray-500">Meeting ID: {decision.meetingId}</div>
                          )}
                          {decision.locationAddress && (
                            <div className="text-gray-500 whitespace-pre-line">{decision.locationAddress}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#0d6efd] mb-4"></div>

                    {/* Open Case Button */}
                    <Button 
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-fluent flex items-center justify-center gap-2"
                      onClick={() => handleCaseClick(decision.id)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Open Case
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-fluent text-[#1a365d]">Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-fluent">No cases to display.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-fluent text-[#1a365d]">Tasks and Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-fluent">No tasks or alerts to display.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinalDecisionMaker2;
