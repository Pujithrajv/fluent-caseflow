import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/logo.png";

const TesScreen = () => {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ruling");

  const caseData = {
    caseNumber: "DBE-EC-02025-004",
    title: "Abandoned Well",
    requestingParty: {
      name: "Department of Natural Resources",
      type: "First Party: Complainant",
      deptNumber: "514-7311-0025"
    },
    respondingParty: {
      name: "Tommy Welldorf",
      type: "Second Party: Respondent",
      attorney: "Dell Spington"
    },
    recommendedDecision: {
      aljName: "Hon. Patricia Martinez",
      decisionDate: "11/25/2024",
      daysRemaining: "6 days",
      summary: "The Administrative Law Judge recommends granting the petitioner's request for remediation assistance based on the evidence presented during the hearing. The respondent failed to demonstrate compliance with environmental regulations as required under statute."
    }
  };

  const rulingDocuments = [
    {
      id: 1,
      name: "final ruling.pdf",
      type: "Recommended Decision",
      uploadedBy: "Patricia Martinez",
      uploadDate: "2025-11-11"
    },
    {
      id: 2,
      name: "Briefing-Schedule-Sequential.pdf",
      type: "Briefing Schedule",
      uploadedBy: "CMS System",
      uploadDate: "2025-11-11"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0f2a4e] text-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="text-xl font-semibold">Case Management System</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Back Button and Breadcrumb */}
        <div className="mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/portal')}
            className="text-blue-600 hover:text-blue-800 p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Case Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {caseData.title}: {caseData.caseNumber}
            </h1>
            <p className="text-sm text-blue-600 mb-2">
              Cases / Case Summary / Case Details
            </p>
            <div className="flex gap-2">
              <Badge className="bg-blue-600 text-white">Confidential</Badge>
              <Badge className="bg-orange-500 text-white">Complex</Badge>
              <Badge className="bg-red-600 text-white">Expedited</Badge>
            </div>
          </div>
          
          <div className="flex gap-8 text-sm">
            <div className="text-right">
              <p className="font-semibold text-gray-700">Requesting Party</p>
              <p className="text-gray-600">{caseData.requestingParty.name}</p>
              <p className="text-gray-500">{caseData.requestingParty.type}</p>
              <p className="text-gray-500">Dept#: {caseData.requestingParty.deptNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Responding Party</p>
              <p className="text-gray-600">{caseData.respondingParty.name}</p>
              <p className="text-gray-500">{caseData.respondingParty.type}</p>
              <p className="text-gray-500">Attorney: {caseData.respondingParty.attorney}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-auto p-0 mb-6">
            <TabsTrigger 
              value="case-details" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Case Details
            </TabsTrigger>
            <TabsTrigger 
              value="participants" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              👥 Participants
            </TabsTrigger>
            <TabsTrigger 
              value="submissions" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              📄 Submissions and Requests
            </TabsTrigger>
            <TabsTrigger 
              value="docket" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              📋 Docket
            </TabsTrigger>
            <TabsTrigger 
              value="ruling" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              ⚖️ FDM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ruling" className="mt-0">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="col-span-4 space-y-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-blue-600">📋</span>
                      Recommended Decision Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">ALJ Name</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {caseData.recommendedDecision.aljName}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Recommended Decision Date</p>
                        <p className="text-sm font-medium flex items-center gap-1">
                          📅 {caseData.recommendedDecision.decisionDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Days Remaining</p>
                        <p className="text-sm font-medium text-green-600">
                          ⏱️ {caseData.recommendedDecision.daysRemaining}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recommended Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                      <span>📄</span>
                      <span>Recommended Decision Report</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      System Generated • ALJ Patricia Martinez • 11/25/2024
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-blue-600">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Content */}
              <div className="col-span-9 space-y-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-blue-600">💬</span>
                      Recommended Decision Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {caseData.recommendedDecision.summary}
                      </p>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Final Decision Maker Action</h3>
                        <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
                          FDM Pending
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">Choose Your Action</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                          onClick={() => setSelectedAction('approve')}
                          className={`p-4 border-2 rounded-lg text-center transition-all ${
                            selectedAction === 'approve' 
                              ? 'border-green-600 bg-green-600 text-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl mb-1">⊙</div>
                          <p className="font-medium">Approve Recommended Decision</p>
                        </button>
                        <button
                          onClick={() => setSelectedAction('disagree')}
                          className={`p-4 border-2 rounded-lg text-center transition-all ${
                            selectedAction === 'disagree' 
                              ? 'border-orange-500 bg-orange-500 text-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl mb-1">⊗</div>
                          <p className="font-medium">Disagree / Upload Own Ruling</p>
                        </button>
                      </div>

                      {selectedAction === 'approve' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                          <p className="text-sm text-gray-700 mb-4">
                            Approving will automatically generate a Final Ruling Report based on the ALJ's recommendation.
                          </p>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Optional comments to accompany your approval
                          </p>
                          <textarea 
                            className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Enter any additional comments..."
                          />
                          <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                            Generate Final Ruling Report
                          </Button>
                        </div>
                      )}

                      {selectedAction === 'disagree' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                          <div className="flex items-start gap-2 mb-4">
                            <span className="text-orange-500 text-lg">⚠</span>
                            <p className="text-sm text-gray-700">
                              Upload your own final ruling PDF. This will replace the ALJ's recommendation as the Final Administrative Decision.
                            </p>
                          </div>
                          
                          <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center mb-5 bg-white cursor-pointer hover:border-orange-400 transition-colors">
                            <div className="text-orange-400 text-3xl mb-2">↑</div>
                            <p className="text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
                            <p className="text-sm text-gray-400">PDF only, max 10 MB</p>
                          </div>

                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Required justification for rejecting the recommendation <span className="text-red-500">*</span>
                          </p>
                          <textarea 
                            className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            rows={4}
                            placeholder="Explain why you are disagreeing with the ALJ's recommendation..."
                          />
                          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                            Upload Final Ruling & Mark as Final
                          </Button>
                        </div>
                      )}

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => navigate('/portal')}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Submit Final Decision
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ruling Documents Table */}
                <Card className="border shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Ruling Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Document Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Uploaded By</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Upload Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rulingDocuments.map((doc) => (
                            <tr key={doc.id} className="border-b">
                              <td className="py-3 px-4">
                                <a href="#" className="text-blue-600 hover:underline">
                                  {doc.name}
                                </a>
                              </td>
                              <td className="py-3 px-4">
                                <Select defaultValue={doc.type.toLowerCase().replace(' ', '-')}>
                                  <SelectTrigger className="w-40">
                                    <SelectValue>{doc.type}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="recommended-decision">Recommended Decision</SelectItem>
                                    <SelectItem value="briefing-schedule">Briefing Schedule</SelectItem>
                                    <SelectItem value="ruling">Ruling</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{doc.uploadedBy}</td>
                              <td className="py-3 px-4 text-gray-600">{doc.uploadDate}</td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4 text-gray-600" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer Info Banner */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <span className="text-blue-600">ℹ️</span>
              <p className="text-sm text-gray-700">
                This recommended decision has been routed to you as Final Decision Maker. Approve it to generate a Final Ruling Report, or upload your own final ruling if you disagree.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="case-details">
            <div className="text-center py-12 text-gray-500">
              Case Details content would go here
            </div>
          </TabsContent>

          <TabsContent value="participants">
            <div className="text-center py-12 text-gray-500">
              Participants content would go here
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <div className="text-center py-12 text-gray-500">
              Submissions and Requests content would go here
            </div>
          </TabsContent>

          <TabsContent value="docket">
            <div className="text-center py-12 text-gray-500">
              Docket content would go here
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f2a4e] text-white py-4 px-6 mt-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm">© 2024 Case Management System. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TesScreen;
