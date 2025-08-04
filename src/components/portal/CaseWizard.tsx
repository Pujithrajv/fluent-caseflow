import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check } from "lucide-react";
import { DepartmentTab } from "./wizard/DepartmentTab";
import { PrimaryPartyTab } from "./wizard/PrimaryPartyTab";
import { CaseDetailsTab } from "./wizard/CaseDetailsTab";
import { CaseQuestionsTab } from "./wizard/CaseQuestionsTab";
import { InvolvedPartiesTab } from "./wizard/InvolvedPartiesTab";
import { RequestWizardTab } from "./wizard/RequestWizardTab";
import { DocumentUploadTab } from "./wizard/DocumentUploadTab";
import { ReviewSubmitTab } from "./wizard/ReviewSubmitTab";
import { RequestWizard } from "./RequestWizard";

const wizardTabs = [
  { id: 'department', title: 'Department', description: 'Agency structure and personnel' },
  { id: 'primary-party', title: 'Primary Party', description: 'Party information' },
  { id: 'case-details', title: 'Case Details', description: 'Case name and details' },
  { id: 'case-questions', title: 'Case Questions', description: 'Case type specific questions' },
  { id: 'involved-parties', title: 'Involved Parties', description: 'Additional parties' },
  { id: 'requests', title: 'Requests', description: 'Associated requests' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit case' }
];

interface CaseWizardProps {
  onBack?: () => void;
  initialTab?: string;
  readOnly?: boolean;
}

export function CaseWizard({ onBack, initialTab = "department", readOnly = false }: CaseWizardProps) {
  const [formData, setFormData] = useState({});
  const [showRequestWizard, setShowRequestWizard] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const markTabCompleted = (tabId: string) => {
    setCompletedTabs(prev => prev.includes(tabId) ? prev : [...prev, tabId]);
  };

  const isTabCompleted = (tabId: string) => {
    return completedTabs.includes(tabId);
  };

  const handleAddNewRequest = () => {
    setShowRequestWizard(true);
  };

  const handleRequestWizardBack = () => {
    setShowRequestWizard(false);
  };

  if (showRequestWizard) {
    return <RequestWizard onBack={handleRequestWizardBack} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold font-fluent text-foreground">
              {readOnly ? "View Case" : "Create New Case"}
            </h1>
            <p className="text-muted-foreground font-fluent">
              {readOnly ? "Review case details and information" : "Complete all sections to submit your case"}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Vertical Tabs Layout */}
        <Tabs defaultValue={initialTab} className="w-full" orientation="vertical">
          <div className="flex gap-6">
            {/* Vertical Tab List */}
            <Card className="shadow-fluent-8 w-80">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {wizardTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full justify-between px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => markTabCompleted(tab.id)}
                    >
                      <div className="text-left">
                        <div className="font-fluent font-medium">{tab.title}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="flex-1">
              <TabsContent value="department" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Department</CardTitle>
                    <p className="text-muted-foreground font-fluent">Agency structure and personnel</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <DepartmentTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="primary-party" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Primary Party</CardTitle>
                    <p className="text-muted-foreground font-fluent">Party information</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <PrimaryPartyTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="case-details" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Case Details</CardTitle>
                    <p className="text-muted-foreground font-fluent">Case name and details</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CaseDetailsTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="case-questions" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Case Questions</CardTitle>
                    <p className="text-muted-foreground font-fluent">Case type specific questions</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CaseQuestionsTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="involved-parties" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Involved Parties</CardTitle>
                    <p className="text-muted-foreground font-fluent">Additional parties</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <InvolvedPartiesTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Requests</CardTitle>
                    <p className="text-muted-foreground font-fluent">Associated requests</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RequestWizardTab 
                      onDataChange={updateFormData} 
                      data={formData} 
                      onAddNewRequest={handleAddNewRequest}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Documents</CardTitle>
                    <p className="text-muted-foreground font-fluent">Upload supporting documents</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <DocumentUploadTab onDataChange={updateFormData} data={formData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="mt-0">
                <Card className="shadow-fluent-16">
                  <CardHeader>
                    <CardTitle className="font-fluent font-semibold">Review & Submit</CardTitle>
                    <p className="text-muted-foreground font-fluent">Verify and submit case</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ReviewSubmitTab formData={formData} />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Submit Actions */}
        {!readOnly && (
          <div className="flex justify-end space-x-3">
            <Button variant="fluent" className="font-fluent">
              Save Draft
            </Button>
            <Button className="font-fluent">
              <Check className="mr-2 h-4 w-4" />
              Submit Case
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}