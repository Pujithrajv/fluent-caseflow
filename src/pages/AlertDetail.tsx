import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, User, Calendar, AlertCircle } from 'lucide-react';
import { Header } from '@/components/shared/Header';

export const AlertDetail: React.FC = () => {
  const navigate = useNavigate();
  const { alertId } = useParams();
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  // Mock alert data - in a real app, this would come from API/state
  const alertData = {
    id: alertId,
    caseNumber: 'DBE-2025-001',
    caseType: 'Abandoned Well',
    department: 'Department of Natural Resources',
    status: 'Returned for Correction',
    alertTitle: 'Case Returned for Correction',
    triggeredBy: 'Sarah Johnson',
    rejectionDate: 'March 15, 2025',
    reasonForReturn: 'The submitted case documentation is incomplete. The required "Well Records of Inspector" document is missing from the submission. Additionally, the property boundary description in Section 3 appears to have formatting errors.',
    requiredAction: 'Upload missing "Well Records of Inspector" document and re-verify case details before resubmission. Please ensure all property boundaries are correctly formatted according to state guidelines.',
    linkedDocuments: [
      'Application Form - Complete',
      'Environmental Impact Statement - Complete',
      'Well Records of Inspector - MISSING',
      'Property Survey Map - Needs Correction'
    ],
    assignedTo: 'John Doe'
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    // In a real app, this would update the backend
    setTimeout(() => {
      navigate('/portal');
    }, 1500);
  };

  const handleOpenCase = () => {
    // Navigate to case details
    navigate(`/case/${alertData.caseNumber}`);
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
        <Card className="mb-6 border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-2xl">Alert Details</CardTitle>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Case:</strong> {alertData.caseNumber}</p>
                  <p><strong>Case Type:</strong> {alertData.caseType}</p>
                  <p><strong>Department:</strong> {alertData.department}</p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <Badge variant="destructive" className="bg-red-600">
                      {alertData.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {isAcknowledged && (
                <Badge className="bg-green-600 text-white">
                  Alert Acknowledged
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
              Alert Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Alert Title */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Alert Title</h3>
                  <p className="text-lg font-medium text-gray-900">{alertData.alertTitle}</p>
                </div>

                {/* Triggered By */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Triggered By</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-900">{alertData.triggeredBy} (Clerk)</p>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Date</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-900">{alertData.rejectionDate}</p>
                  </div>
                </div>

                {/* Reason for Return */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Reason for Return</h3>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-gray-900">{alertData.reasonForReturn}</p>
                  </div>
                </div>

                {/* Required Action */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Required Action</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-gray-900">{alertData.requiredAction}</p>
                  </div>
                </div>

                {/* Linked Documents */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Linked Documents</h3>
                  <div className="space-y-2">
                    {alertData.linkedDocuments.map((doc, index) => {
                      const isMissing = doc.includes('MISSING');
                      const needsCorrection = doc.includes('Needs Correction');
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-center gap-2 p-3 rounded-md border ${
                            isMissing 
                              ? 'bg-red-50 border-red-200' 
                              : needsCorrection 
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-green-50 border-green-200'
                          }`}
                        >
                          <FileText className={`w-4 h-4 ${
                            isMissing 
                              ? 'text-red-600' 
                              : needsCorrection 
                                ? 'text-yellow-600'
                                : 'text-green-600'
                          }`} />
                          <span className="text-gray-900">{doc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    variant="default"
                    size="lg"
                    onClick={handleOpenCase}
                    className="flex-1"
                  >
                    Open Case
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleAcknowledge}
                    disabled={isAcknowledged}
                    className="flex-1"
                  >
                    {isAcknowledged ? 'Acknowledged ✓' : 'Acknowledge Alert'}
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
