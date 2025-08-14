import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Download, FileText, Check, AlertTriangle, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DiscoveryDetailsTab } from "./DiscoveryDetailsTab";
import { InterrogatoriesQuestionsTab } from "./InterrogatoriesQuestionsTab";
import { DocumentProductionQuestionsTab } from "./DocumentProductionQuestionsTab";
import { DepositionQuestionsTab } from "./DepositionQuestionsTab";
import { InspectionQuestionsTab } from "./InspectionQuestionsTab";

interface DiscoveryTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

interface DiscoveryEntry {
  id: string;
  type: 'interrogatories' | 'document-production' | 'deposition' | 'inspection';
  status: 'valid' | 'missing-info';
  lastUpdated: Date;
  details: any;
}

export function DiscoveryTab({ onDataChange, data }: DiscoveryTabProps) {
  console.log('DiscoveryTab component mounted in CaseWizard!');
  
  const [formData, setFormData] = useState(data?.discovery || {});
  const [selectedDiscoveryTypes, setSelectedDiscoveryTypes] = useState<string[]>(data?.discovery?.discoveryTypes || []);
  const [activeSubTab, setActiveSubTab] = useState<string>('discovery-information');

  // Available discovery sub-tabs
  const discoverySubTabs = [
    { id: 'discovery-information', title: 'Discovery Information', description: 'Set discovery schedule and types' },
    ...selectedDiscoveryTypes.map(type => ({
      id: `${type}-questions`,
      title: getTypeTitle(type),
      description: 'Type-specific questions'
    })),
    // Only show overview if at least one type is selected
    ...(selectedDiscoveryTypes.length > 0 ? [{ id: 'overview-table', title: 'Overview (Table)', description: 'Consolidated summary' }] : [])
  ];

  function getTypeTitle(type: string): string {
    const titles = {
      'interrogatories': 'Interrogatories Questions',
      'document-production': 'Document Production Questions',
      'deposition': 'Deposition Questions',
      'inspection': 'Inspection Questions'
    };
    return titles[type as keyof typeof titles] || `${type.charAt(0).toUpperCase() + type.slice(1)} Questions`;
  }

  const updateFormData = (stepData: any) => {
    const newData = { ...formData, ...stepData };
    
    // Update selected discovery types when they change
    if (stepData.discoveryTypes) {
      setSelectedDiscoveryTypes(stepData.discoveryTypes);
    }
    
    setFormData(newData);
    onDataChange({ discovery: newData });
  };

  const validateDiscoveryEntry = (type: string, data: any): 'valid' | 'missing-info' => {
    if (!data) return 'missing-info';
    
    switch (type) {
      case 'interrogatories':
        return (data.recipients?.length > 0 && data.receiveDate && data.replyDue) ? 'valid' : 'missing-info';
      case 'document-production':
        return (data.recipients?.length > 0 && data.receiveDate && data.productionDue) ? 'valid' : 'missing-info';
      case 'deposition':
        return (data.whoToBeDeposed?.length > 0 && data.whyNecessary && data.completionDateRange) ? 'valid' : 'missing-info';
      case 'inspection':
        return (data.whatToInspect && data.purpose && data.whoIsPresent && data.whoControlsItem) ? 'valid' : 'missing-info';
      default:
        return 'missing-info';
    }
  };

  const getDiscoveryEntries = (): DiscoveryEntry[] => {
    return selectedDiscoveryTypes.map(type => ({
      id: type,
      type: type as any,
      status: validateDiscoveryEntry(type, formData[type]),
      lastUpdated: new Date(),
      details: formData[type] || {}
    }));
  };

  const renderDetailCell = (entry: DiscoveryEntry) => {
    const { type, details } = entry;
    
    switch (type) {
      case 'interrogatories':
        return (
          <div className="space-y-1 text-sm">
            <div><strong>Recipients:</strong> {details.recipients?.length || 0} person(s)</div>
            <div><strong>Receive Date:</strong> {details.receiveDate || 'Not set'}</div>
            <div><strong>Reply Due:</strong> {details.replyDue || 'Not set'}</div>
          </div>
        );
      case 'document-production':
        return (
          <div className="space-y-1 text-sm">
            <div><strong>Recipients:</strong> {details.recipients?.length || 0} person(s)</div>
            <div><strong>Receive Date:</strong> {details.receiveDate || 'Not set'}</div>
            <div><strong>Production Due:</strong> {details.productionDue || 'Not set'}</div>
          </div>
        );
      case 'deposition':
        return (
          <div className="space-y-1 text-sm">
            <div><strong>To be deposed:</strong> {details.whoToBeDeposed?.length || 0} person(s)</div>
            <div><strong>Why necessary:</strong> {details.whyNecessary ? (details.whyNecessary.length > 50 ? details.whyNecessary.substring(0, 50) + '...' : details.whyNecessary) : 'Not specified'}</div>
            <div><strong>By Interrogatories:</strong> {details.byInterrogatories || 'Not specified'}</div>
          </div>
        );
      case 'inspection':
        return (
          <div className="space-y-1 text-sm">
            <div><strong>What to inspect:</strong> {details.whatToInspect || 'Not specified'}</div>
            <div><strong>Purpose:</strong> {details.purpose || 'Not specified'}</div>
            <div><strong>Who is present:</strong> {details.whoIsPresent || 'Not specified'}</div>
            <div><strong>Who controls item:</strong> {details.whoControlsItem || 'Not specified'}</div>
          </div>
        );
      default:
        return <div>No details available</div>;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'interrogatories': 'bg-blue-100 text-blue-800',
      'document-production': 'bg-green-100 text-green-800',
      'deposition': 'bg-purple-100 text-purple-800',
      'inspection': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const allEntriesValid = () => {
    return getDiscoveryEntries().every(entry => entry.status === 'valid');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-fluent font-semibold">Discovery Management</CardTitle>
        <p className="text-muted-foreground font-fluent">Manage discovery requests and track their status</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
          {/* Sub-tabs Navigation */}
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {discoverySubTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Discovery Information Tab */}
          <TabsContent value="discovery-information">
            <DiscoveryDetailsTab onDataChange={updateFormData} data={formData} />
          </TabsContent>

          {/* Dynamic Type-specific Tabs */}
          {selectedDiscoveryTypes.map((type) => (
            <TabsContent key={`${type}-questions`} value={`${type}-questions`}>
              {type === 'interrogatories' && <InterrogatoriesQuestionsTab onDataChange={updateFormData} data={formData} />}
              {type === 'document-production' && <DocumentProductionQuestionsTab onDataChange={updateFormData} data={formData} />}
              {type === 'deposition' && <DepositionQuestionsTab onDataChange={updateFormData} data={formData} />}
              {type === 'inspection' && <InspectionQuestionsTab onDataChange={updateFormData} data={formData} />}
            </TabsContent>
          ))}

          {/* Overview Table Tab */}
          {selectedDiscoveryTypes.length > 0 && (
            <TabsContent value="overview-table">
              <Card>
                <CardHeader>
                  <CardTitle className="font-fluent font-semibold">Discovery Overview</CardTitle>
                  <p className="text-muted-foreground font-fluent">Consolidated summary of all discovery requests</p>
                </CardHeader>
                <CardContent>
                  {/* Global Summary */}
                  <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Discovery Information</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Schedule:</strong> {formData.schedule || 'Not set'}</div>
                        <div><strong>Start Date:</strong> {formData.startDate || 'Not set'}</div>
                        <div><strong>Cutoff Date:</strong> {formData.cutoffDate || 'Not set'}</div>
                        <div><strong>Conference Date:</strong> {formData.conferenceDate || 'Not set'}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Types Selected</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDiscoveryTypes.map(type => (
                          <Badge key={type} className={getTypeColor(type)}>
                            {getTypeTitle(type)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Overview Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getDiscoveryEntries().map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <Badge className={getTypeColor(entry.type)}>
                                {getTypeTitle(entry.type)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {renderDetailCell(entry)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {entry.status === 'valid' ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Valid
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Missing Info
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {entry.lastUpdated.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setActiveSubTab(`${entry.type}-questions`)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit {getTypeTitle(entry.type)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Export Options */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                    <Button 
                      disabled={!allEntriesValid()}
                      className="font-fluent"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Complete Discovery Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}