import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AljWarningModal } from "@/components/portal/AljWarningModal";

const Index = () => {
  // Mock case data
  const mockCaseData = {
    caseNumber: "DBE-2024-001-EC",
    caseType: "Abandon Well",
    department: "Environmental Control",
    stage: "Active Investigation",
    primaryParty: {
      name: "Heritage Energy LLC",
      type: "Company",
      address: "1234 Industrial Blvd, Springfield, IL 62701",
      contact: "John Smith, Environmental Manager"
    },
    caseDetails: {
      filingDate: "March 15, 2024",
      lastActivity: "April 2, 2024",
      nextHearing: "May 15, 2024",
      assignedOfficer: "Officer Sarah Johnson"
    },
    questions: {
      wellDepth: "2,500 feet",
      wellType: "Oil production well",
      pluggingMethod: "Cement plug with bentonite seal",
      environmentalConcerns: "Groundwater protection required"
    }
  };

  return (
    <>
      <AljWarningModal onAcknowledge={() => {}} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/logo.png" alt="Illinois Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold">Case Summary</h1>
              <p className="text-muted-foreground">Case: {mockCaseData.caseNumber}</p>
            </div>
          </div>
        </div>

        {/* Case Information Header */}
        <div className="p-6 border-b bg-muted/50">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Case Number</p>
              <p className="text-lg font-semibold">{mockCaseData.caseNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Case Type</p>
              <p className="text-lg font-semibold">{mockCaseData.caseType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="text-lg font-semibold">{mockCaseData.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Stage</p>
              <p className="text-lg font-semibold">{mockCaseData.stage}</p>
            </div>
          </div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Department Information */}
            <Card className="shadow-fluent-8 aspect-square flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg">Department Information</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="font-semibold">{mockCaseData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Case Type</p>
                    <p className="font-semibold">{mockCaseData.caseType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned Officer</p>
                    <p className="font-semibold">{mockCaseData.caseDetails.assignedOfficer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Primary Party Information */}
            <Card className="shadow-fluent-8 aspect-square flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg">Primary Party</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="font-semibold">{mockCaseData.primaryParty.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="font-semibold">{mockCaseData.primaryParty.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact</p>
                    <p className="font-semibold">{mockCaseData.primaryParty.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="font-semibold">{mockCaseData.primaryParty.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Details */}
            <Card className="shadow-fluent-8 aspect-square flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg">Case Details</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Filing Date</p>
                    <p className="font-semibold">{mockCaseData.caseDetails.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Activity</p>
                    <p className="font-semibold">{mockCaseData.caseDetails.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Hearing</p>
                    <p className="font-semibold">{mockCaseData.caseDetails.nextHearing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abandon Well Questions */}
            <Card className="shadow-fluent-8 aspect-square flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg">Abandon Well Questions</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Well Depth</p>
                    <p className="font-semibold">{mockCaseData.questions.wellDepth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Well Type</p>
                    <p className="font-semibold">{mockCaseData.questions.wellType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Plugging Method</p>
                    <p className="font-semibold">{mockCaseData.questions.pluggingMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Environmental Concerns</p>
                    <p className="font-semibold">{mockCaseData.questions.environmentalConcerns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
