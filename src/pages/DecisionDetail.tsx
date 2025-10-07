import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, User, Calendar, Gavel, Mail } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { useToast } from '@/hooks/use-toast';

export const DecisionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { decisionId } = useParams();
  const { toast } = useToast();
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  // Mock decision data
  const decisionData = {
    id: decisionId,
    caseNumber: 'CASE-2025-004',
    caseType: 'Food Safety — North District Foods',
    department: 'Department of Public Health',
    status: 'Decision Finalized',
    decisionTitle: 'Final Decision Issued',
    decidedBy: 'ALJ Rebecca Martinez',
    decisionDate: 'September 18, 2025',
    outcomeSummary: 'The ALJ has ruled in favor of the respondent and dismissed the complaint. After careful review of all evidence and testimony presented during the hearing, the Administrative Law Judge has determined that the Department of Public Health failed to establish a violation of food safety regulations by clear and convincing evidence.',
    actionRequired: 'Generate and send the Final Decision Report to all involved parties, including Complainant, Respondent, and their respective attorneys.',
    distributionList: [
      { role: 'Complainant', name: 'Department of Public Health', email: 'legal@health.state.gov' },
      { role: 'Respondent', name: 'North District Foods, Inc.', email: 'legal@northdistrictfoods.com' },
      { role: 'Complainant Counsel', name: 'Sarah Johnson, Esq.', email: 'sjohnson@stateattorney.gov' },
      { role: 'Respondent Counsel', name: 'Michael Chen, Esq.', email: 'mchen@defenselawfirm.com' }
    ]
  };

  const handleGenerateReport = () => {
    setIsReportGenerated(true);
    toast({
      title: "Report Generated Successfully",
      description: "Final Decision Report has been generated and distributed to all parties.",
      duration: 3000,
    });
    
    // Simulate moving to complete after a delay
    setTimeout(() => {
      navigate('/portal');
    }, 2000);
  };

  const handleOpenCase = () => {
    navigate(`/case/${decisionData.caseNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/portal')}
          className="mb-4 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header Card */}
        <Card className="mb-6 border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Gavel className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-2xl">Decision Details</CardTitle>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Case:</strong> {decisionData.caseNumber}</p>
                  <p><strong>Case Type:</strong> {decisionData.caseType}</p>
                  <p><strong>Department:</strong> {decisionData.department}</p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <Badge className="bg-blue-600 text-white">
                      {decisionData.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {isReportGenerated && (
                <Badge className="bg-green-600 text-white">
                  ✓ Report Generated
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="details"
              className="font-fluent text-base rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              Decision Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Decision Title */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Decision Title</h3>
                  <p className="text-lg font-medium text-gray-900">{decisionData.decisionTitle}</p>
                </div>

                {/* Decided By */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Decided By</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-900">{decisionData.decidedBy}</p>
                  </div>
                </div>

                {/* Date of Decision */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Date of Decision</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-900">{decisionData.decisionDate}</p>
                  </div>
                </div>

                {/* Outcome Summary */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Outcome Summary</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-gray-900">{decisionData.outcomeSummary}</p>
                  </div>
                </div>

                {/* Action Required */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Action Required</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-gray-900">{decisionData.actionRequired}</p>
                  </div>
                </div>

                {/* Distribution List */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Distribution List</h3>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {decisionData.distributionList.map((party, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{party.role}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{party.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {party.email}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    variant="default"
                    size="lg"
                    onClick={handleGenerateReport}
                    disabled={isReportGenerated}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {isReportGenerated ? 'Report Generated ✓' : 'Generate Final Report'}
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleOpenCase}
                    className="flex-1"
                  >
                    View Case
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
