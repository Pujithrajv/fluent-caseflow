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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Calendar, FileText, ChevronRight, Edit } from 'lucide-react';

const recommendedDecisions = [
  {
    id: 1,
    caseNumber: 'DBE-EC-02025-004',
    caseName: 'Smith vs. Department of Transportation',
    caseType: 'Abandoned Well',
    department: 'Transportation',
    primaryParty: 'John Smith',
    status: 'Recommended – FDM Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
    recommendedDate: '11/25/2024',
    deadline: '12/15/2024',
  },
  {
    id: 2,
    caseNumber: 'DBE-EC-02025-008',
    caseName: 'Johnson Environmental Review',
    caseType: 'Abandoned Well',
    department: 'Environmental Protection',
    primaryParty: 'ABC Industries',
    status: 'Due Soon',
    statusColor: 'bg-orange-100 text-orange-800',
    recommendedDate: '11/20/2024',
    deadline: '12/10/2024',
  },
  {
    id: 3,
    caseNumber: 'HRD-02025-012',
    caseName: 'Williams Employment Dispute',
    caseType: 'Human Resources',
    department: 'Human Resources',
    primaryParty: 'Mary Williams',
    status: 'Overdue',
    statusColor: 'bg-red-100 text-red-800',
    recommendedDate: '11/01/2024',
    deadline: '11/30/2024',
  },
  {
    id: 4,
    caseNumber: 'PRO-02025-015',
    caseName: 'Davis Procurement Appeal',
    caseType: 'Procurement',
    department: 'Procurement',
    primaryParty: 'Davis Corp',
    status: 'Finalized',
    statusColor: 'bg-green-100 text-green-800',
    recommendedDate: '10/15/2024',
    deadline: '11/15/2024',
  },
];

const FinalDecisionMaker: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  const [filterValue, setFilterValue] = useState('active');

  const groupedDecisions = recommendedDecisions.reduce((acc, decision) => {
    if (!acc[decision.caseType]) {
      acc[decision.caseType] = [];
    }
    acc[decision.caseType].push(decision);
    return acc;
  }, {} as Record<string, typeof recommendedDecisions>);

  const handleCaseClick = (caseId: number) => {
    navigate(`/fdm/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-4 font-fluent">
          <span 
            className="hover:text-primary cursor-pointer"
            onClick={() => navigate('/portal')}
          >
            Dashboard
          </span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Final Decisions</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-[#1a365d] mb-6 font-fluent">
          Final Decisions – Recommended Cases
        </h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border border-gray-200 mb-4">
            <TabsTrigger 
              value="recommended" 
              className="font-fluent data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Recommended Decisions
            </TabsTrigger>
            <TabsTrigger 
              value="deadlines" 
              className="font-fluent data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Upcoming Deadlines
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="font-fluent data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {/* Filter Row */}
            <div className="flex items-center justify-between mb-4">
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[250px] h-11 border-gray-400 bg-white font-fluent">
                  <SelectValue placeholder="Filter decisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active Recommended Decisions</SelectItem>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by Case ID, party, or department…"
                  className="pl-10 w-80 h-11 font-fluent border-gray-400 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Main Table */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                {Object.entries(groupedDecisions).map(([caseType, decisions]) => (
                  <div key={caseType}>
                    {/* Group Header */}
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                      <span className="font-semibold text-[#1a365d] font-fluent">{caseType}</span>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="font-fluent font-semibold text-[#1a365d]">Case</TableHead>
                          <TableHead className="font-fluent font-semibold text-[#1a365d]">Department</TableHead>
                          <TableHead className="font-fluent font-semibold text-[#1a365d]">Primary Party</TableHead>
                          <TableHead className="font-fluent font-semibold text-[#1a365d]">Status</TableHead>
                          <TableHead className="font-fluent font-semibold text-[#1a365d]">Dates</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {decisions.map((decision) => (
                          <TableRow 
                            key={decision.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleCaseClick(decision.id)}
                          >
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCaseClick(decision.id);
                                }}
                              >
                                <Edit className="h-4 w-4 text-blue-600" />
                              </Button>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-blue-600 font-fluent">{decision.caseNumber}</span>
                                <span className="text-sm text-muted-foreground font-fluent">{decision.caseName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-fluent">{decision.department}</TableCell>
                            <TableCell className="font-fluent">{decision.primaryParty}</TableCell>
                            <TableCell>
                              <Badge className={`${decision.statusColor} font-fluent`}>
                                {decision.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm font-fluent">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>Recommended: {decision.recommendedDate}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>Deadline: {decision.deadline}</span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-fluent text-[#1a365d]">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-fluent">No upcoming deadlines to display.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-fluent text-[#1a365d]">Decision History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-fluent">No historical decisions to display.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinalDecisionMaker;
