import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Search, Calendar, ChevronRight, Edit, FileText, Users } from 'lucide-react';
const recommendedDecisions = [{
  id: 1,
  caseNumber: '2025-01101',
  caseType: 'Abandoned Well',
  deptId: '123456',
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
  groupType: 'Abandoned Well'
}, {
  id: 2,
  caseNumber: '2025-01017',
  caseType: 'Abandoned Well',
  deptId: '',
  department: 'Department of Natural Resources',
  firstParty: 'Complainant',
  attorney: 'Department Attorney (DNR)',
  secondParties: 'Defendant',
  represented: 'No',
  primaryParty: 'Rajaram Sheppard',
  status: 'Recommended Decision',
  statusColor: 'bg-[#0d6efd] text-white',
  secondStatus: 'Draft',
  secondStatusColor: 'bg-[#6c757d] text-white',
  decisionDate: '2025-08-11',
  acceptedDate: '2025-08-11',
  submittedDate: '2025-08-11',
  groupType: 'Abandoned Well'
}, {
  id: 3,
  caseNumber: '2025-01029',
  caseType: 'Abandoned Well',
  deptId: '',
  department: 'Department of Natural Resources',
  firstParty: 'Complainant',
  attorney: 'Department Attorney (DNR)',
  secondParties: 'Defendant',
  represented: 'No',
  primaryParty: 'Jeronimo Lovel',
  status: 'Recommended Decision',
  statusColor: 'bg-[#0d6efd] text-white',
  secondStatus: 'Draft',
  secondStatusColor: 'bg-[#6c757d] text-white',
  decisionDate: '2025-08-11',
  acceptedDate: '2025-08-11',
  submittedDate: '2025-08-11',
  groupType: 'Abandoned Well'
}];
const FinalDecisionMaker: React.FC = () => {
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
    navigate(`/fdm/${caseId}`);
  };
  return <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[#0d6efd] mb-4 font-fluent">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/portal')}>
            Dashboard
          </span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-muted-foreground">My Cases</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-6 font-fluent">Final Decision Maker</h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-4">
            <TabsTrigger value="recommended" className="font-fluent rounded-none border-b-2 border-transparent data-[state=active]:border-[#0d6efd] data-[state=active]:bg-transparent data-[state=active]:text-[#0d6efd] data-[state=active]:shadow-none px-4 py-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Cases
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {/* Search Row */}
            <div className="flex items-center justify-end mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64 h-10 font-fluent border-gray-300 bg-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>

            {/* Main Table */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_1fr_1fr_140px_1fr] bg-[#1a365d] text-white">
                <div className="px-4 py-3 font-semibold font-fluent w-12"></div>
                <div className="px-4 py-3 font-semibold font-fluent">Case</div>
                <div className="px-4 py-3 font-semibold font-fluent">Department</div>
                <div className="px-4 py-3 font-semibold font-fluent">Primary Party</div>
                <div className="px-4 py-3 font-semibold font-fluent">Status</div>
                <div className="px-4 py-3 font-semibold font-fluent">Dates</div>
              </div>

              {Object.entries(groupedDecisions).map(([groupType, decisions]) => <div key={groupType}>
                  {/* Group Header */}
                  <div className="bg-[#17a2b8]/20 px-4 py-2 border-b border-gray-200">
                    <span className="font-semibold text-[#1a365d] font-fluent">{groupType}</span>
                  </div>
                  
                  {/* Group Rows */}
                  {decisions.map((decision, index) => <div key={decision.id} className={`grid grid-cols-[auto_1fr_1fr_1fr_140px_1fr] border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`} onClick={() => handleCaseClick(decision.id)}>
                      {/* Edit Icon */}
                      <div className="px-4 py-3 flex items-start w-12">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={e => {
                    e.stopPropagation();
                    handleCaseClick(decision.id);
                  }}>
                          <Edit className="h-4 w-4 text-[#0d6efd]" />
                        </Button>
                      </div>

                      {/* Case */}
                      <div className="px-4 py-3">
                        <div className="text-[#0d6efd] font-semibold font-fluent">{decision.caseNumber}</div>
                        <div className="text-sm text-muted-foreground font-fluent">{decision.caseType}</div>
                        {decision.deptId && <div className="text-sm text-muted-foreground font-fluent">Dept. ID: {decision.deptId}</div>}
                      </div>

                      {/* Department */}
                      <div className="px-4 py-3">
                        <div className="font-semibold font-fluent text-foreground">{decision.department}</div>
                        <div className="text-sm text-muted-foreground font-fluent">First Party: {decision.firstParty}</div>
                        <div className="text-sm text-muted-foreground font-fluent">Attorney: {decision.attorney}</div>
                      </div>

                      {/* Primary Party */}
                      <div className="px-4 py-3">
                        <div className="font-fluent text-foreground">{decision.primaryParty}</div>
                        <div className="text-sm text-muted-foreground font-fluent">Second Parties: {decision.secondParties}</div>
                        <div className="text-sm text-muted-foreground font-fluent">Represented: {decision.represented}</div>
                      </div>

                      {/* Status */}
                      <div className="px-4 py-3">
                        <Badge className={`${decision.statusColor} font-fluent text-xs px-2 py-0.5 rounded w-fit`}>
                          {decision.status}
                        </Badge>
                      </div>

                      {/* Dates */}
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm font-fluent text-[#dc3545]">
                          <Calendar className="h-3 w-3" />
                          <span>Decision: {decision.decisionDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-fluent text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Accepted: {decision.acceptedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-fluent text-[#0d6efd]">
                          <Calendar className="h-3 w-3" />
                          <span>Submitted: {decision.submittedDate}</span>
                        </div>
                      </div>
                    </div>)}
                </div>)}
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>;
};
export default FinalDecisionMaker;