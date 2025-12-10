import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, ChevronRight, Edit, FileText, Users } from 'lucide-react';

const recommendedDecisions = [
  {
    id: 1,
    caseNumber: '2025-01101',
    caseType: 'Abandoned Well',
    deptId: 'AW-7896',
    department: 'Department of Natural Resources',
    firstParty: 'Complainant',
    attorney: 'Hailwic Giugovaz',
    secondParties: 'Defendant',
    represented: 'No',
    primaryParty: 'John Smith',
    status: 'Recommended Decision',
    statusColor: 'bg-[#0d6efd] text-white',
    secondStatus: 'Draft',
    secondStatusColor: 'bg-[#6c757d] text-white',
    decisionDate: '2025-08-11',
    acceptedDate: '2025-08-11',
    submittedDate: '2025-08-11',
    groupType: 'Abandoned Well',
  },
  {
    id: 2,
    caseNumber: '2025-01017',
    caseType: 'Abandoned Well',
    deptId: 'AW-1489',
    department: 'Department of Natural Resources',
    firstParty: 'Complainant',
    attorney: 'Department Attorney (DNR)',
    secondParties: 'Defendant',
    represented: 'No',
    primaryParty: 'Rajaram Sheppard',
    status: 'Recommended Decision',
    statusColor: 'bg-[#28a745] text-white',
    secondStatus: 'Draft',
    secondStatusColor: 'bg-[#6c757d] text-white',
    decisionDate: '2025-08-11',
    acceptedDate: '2025-08-11',
    submittedDate: '2025-08-11',
    groupType: 'Abandoned Well',
  },
  {
    id: 3,
    caseNumber: '2025-01029',
    caseType: 'Abandoned Well',
    deptId: 'AW-875',
    department: 'Department of Natural Resources',
    firstParty: 'Complainant',
    attorney: 'Department Attorney (DNR)',
    secondParties: 'Defendant',
    represented: 'No',
    primaryParty: 'Jeronimo Lovel',
    status: 'Recommended Decision',
    statusColor: 'bg-[#28a745] text-white',
    secondStatus: 'Draft',
    secondStatusColor: 'bg-[#6c757d] text-white',
    decisionDate: '2025-08-11',
    acceptedDate: '2025-08-11',
    submittedDate: '2025-08-11',
    groupType: 'Abandoned Well',
  },
];

const FinalDecisionMaker2: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  

  const groupedDecisions = recommendedDecisions.reduce((acc, decision) => {
    if (!acc[decision.groupType]) {
      acc[decision.groupType] = [];
    }
    acc[decision.groupType].push(decision);
    return acc;
  }, {} as Record<string, typeof recommendedDecisions>);

  const handleCaseClick = (caseId: number) => {
    navigate(`/fdm2/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[#0d6efd] mb-4 font-fluent">
          <span 
            className="hover:underline cursor-pointer"
            onClick={() => navigate('/portal')}
          >
            Dashboard
          </span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-muted-foreground">My Cases</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-6 font-fluent">
          My Cases
        </h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-4">
            <TabsTrigger 
              value="recommended" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Cases
            </TabsTrigger>
            <TabsTrigger 
              value="deadlines" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Tasks and Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {/* Filter Row */}
            <div className="flex items-center justify-end mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Case ID, party, or department..."
                  className="pl-10 w-80 h-10 font-fluent border-gray-300 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedDecisions.map((decision) => (
                <div 
                  key={decision.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground font-fluent">{decision.caseType}</h3>
                        <span 
                          className="text-[#0d6efd] font-semibold font-fluent cursor-pointer hover:underline"
                          onClick={() => handleCaseClick(decision.id)}
                        >
                          {decision.caseNumber}
                        </span>
                        {decision.deptId && <div className="text-sm text-muted-foreground font-fluent">Dept number : {decision.deptId}</div>}
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge className={`${decision.statusColor} font-fluent text-xs px-2 py-0.5 rounded`}>
                          {decision.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    {/* Department Info */}
                    <div>
                      <div className="font-semibold text-foreground font-fluent">{decision.department}</div>
                      <div className="text-sm text-muted-foreground font-fluent">First Party: {decision.firstParty}</div>
                      <div className="text-sm text-muted-foreground font-fluent">Attorney: {decision.attorney}</div>
                    </div>

                    {/* Primary Party */}
                    <div>
                      <div className="font-fluent text-foreground">{decision.primaryParty} (Defendant)</div>
                      <div className="text-sm text-muted-foreground font-fluent">Second Parties: {decision.secondParties}</div>
                      <div className="text-sm text-muted-foreground font-fluent">Represented: {decision.represented}</div>
                    </div>

                    {/* Dates */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm font-fluent text-[#dc3545]">
                        <Calendar className="h-3 w-3" />
                        <span>Decision: {decision.decisionDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-fluent text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Accepted: {decision.acceptedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-fluent text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted: {decision.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 border-t border-gray-100 flex gap-2">
                    <Button 
                      className="flex-1 bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-white font-fluent"
                      onClick={() => handleCaseClick(decision.id)}
                    >
                      Open Case
                    </Button>
                    <Button 
                      variant="outline"
                      className="font-fluent border-gray-300"
                      onClick={() => handleCaseClick(decision.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deadlines">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-fluent text-[#1a365d]">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-fluent">No upcoming events to display.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
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
