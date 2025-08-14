import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InterrogatoriesQuestionsTab } from "./InterrogatoriesQuestionsTab";
import { DocumentProductionQuestionsTab } from "./DocumentProductionQuestionsTab";
import { DepositionQuestionsTab } from "./DepositionQuestionsTab";
import { InspectionQuestionsTab } from "./InspectionQuestionsTab";

interface DiscoveryTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface SubTabData {
  [key: string]: any;
}

const discoveryTypes = [
  { id: 'interrogatories', label: 'Interrogatories' },
  { id: 'documentProduction', label: 'Document Production' },
  { id: 'deposition', label: 'Deposition' },
  { id: 'inspection', label: 'Inspection' }
];

export function DiscoveryTab({ onDataChange, data, isReadOnly = false, onNext, onPrevious }: DiscoveryTabProps) {
  const [currentSubTab, setCurrentSubTab] = useState<string>('main');
  const [discoveryData, setDiscoveryData] = useState({
    discoverySchedule: data.discoverySchedule || '',
    selectedDiscoveryTypes: data.selectedDiscoveryTypes || [],
    discoveryStartDate: data.discoveryStartDate ? new Date(data.discoveryStartDate) : undefined,
    discoveryCutoffDate: data.discoveryCutoffDate ? new Date(data.discoveryCutoffDate) : undefined,
    discoveryConferenceDate: data.discoveryConferenceDate ? new Date(data.discoveryConferenceDate) : undefined,
    caseId: 'AUTO-GENERATED',
    processStage: 'Initial Review',
    discoverySummary: data.discoverySummary || '',
    ...data
  });

  const [subTabData, setSubTabData] = useState<SubTabData>({
    interrogatories: data.interrogatoriesData || {},
    documentProduction: data.documentProductionData || {},
    deposition: data.depositionData || {},
    inspection: data.inspectionData || {}
  });

  const [subTabValidation, setSubTabValidation] = useState<{ [key: string]: boolean }>({
    interrogatories: false,
    documentProduction: false,
    deposition: false,
    inspection: false
  });

  const updateDiscoveryData = (updates: any) => {
    const newData = { ...discoveryData, ...updates };
    setDiscoveryData(newData);
    onDataChange(newData);
  };

  const updateSubTabData = (subTab: string, data: any) => {
    const newSubTabData = { ...subTabData, [subTab]: data };
    setSubTabData(newSubTabData);
    onDataChange({ [`${subTab}Data`]: data });
  };

  const updateSubTabValidation = (subTab: string, isValid: boolean) => {
    setSubTabValidation(prev => ({ ...prev, [subTab]: isValid }));
  };

  const handleDiscoveryTypeChange = (typeId: string, checked: boolean) => {
    const newSelectedTypes = checked 
      ? [...discoveryData.selectedDiscoveryTypes, typeId]
      : discoveryData.selectedDiscoveryTypes.filter((t: string) => t !== typeId);
    
    updateDiscoveryData({ selectedDiscoveryTypes: newSelectedTypes });

    // Clear data for unchecked types
    if (!checked) {
      const clearedSubTabData = { ...subTabData };
      delete clearedSubTabData[typeId];
      setSubTabData(clearedSubTabData);
      setSubTabValidation(prev => ({ ...prev, [typeId]: false }));
    }
  };

  const isMainFormValid = () => {
    return discoveryData.discoverySchedule &&
           discoveryData.selectedDiscoveryTypes.length > 0 &&
           discoveryData.discoveryStartDate &&
           discoveryData.discoveryCutoffDate &&
           discoveryData.discoverySummary;
  };

  const areAllSubTabsValid = () => {
    return discoveryData.selectedDiscoveryTypes.every((type: string) => 
      subTabValidation[type] === true
    );
  };

  const getSubTabs = () => {
    const subTabs = [];
    if (discoveryData.selectedDiscoveryTypes.includes('interrogatories')) {
      subTabs.push({ id: 'interrogatories', title: 'Interrogatories Questions' });
    }
    if (discoveryData.selectedDiscoveryTypes.includes('documentProduction')) {
      subTabs.push({ id: 'documentProduction', title: 'Document Production Questions' });
    }
    if (discoveryData.selectedDiscoveryTypes.includes('deposition')) {
      subTabs.push({ id: 'deposition', title: 'Deposition Questions' });
    }
    if (discoveryData.selectedDiscoveryTypes.includes('inspection')) {
      subTabs.push({ id: 'inspection', title: 'Inspection Questions' });
    }
    return subTabs;
  };

  const renderSubTab = () => {
    switch (currentSubTab) {
      case 'interrogatories':
        return (
          <InterrogatoriesQuestionsTab
            data={subTabData.interrogatories}
            onDataChange={(data) => updateSubTabData('interrogatories', data)}
            onValidationChange={(isValid) => updateSubTabValidation('interrogatories', isValid)}
            isReadOnly={isReadOnly}
          />
        );
      case 'documentProduction':
        return (
          <DocumentProductionQuestionsTab
            data={subTabData.documentProduction}
            onDataChange={(data) => updateSubTabData('documentProduction', data)}
            onValidationChange={(isValid) => updateSubTabValidation('documentProduction', isValid)}
            isReadOnly={isReadOnly}
          />
        );
      case 'deposition':
        return (
          <DepositionQuestionsTab
            data={subTabData.deposition}
            onDataChange={(data) => updateSubTabData('deposition', data)}
            onValidationChange={(isValid) => updateSubTabValidation('deposition', isValid)}
            isReadOnly={isReadOnly}
          />
        );
      case 'inspection':
        return (
          <InspectionQuestionsTab
            data={subTabData.inspection}
            onDataChange={(data) => updateSubTabData('inspection', data)}
            onValidationChange={(isValid) => updateSubTabValidation('inspection', isValid)}
            isReadOnly={isReadOnly}
          />
        );
      default:
        return null;
    }
  };

  if (currentSubTab !== 'main') {
    return (
      <div className="space-y-6">
        {/* Sub-tab navigation */}
        <div className="flex items-center space-x-4 pb-4 border-b">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentSubTab('main')}
            className="text-sm"
          >
            ← Back to Discovery Information
          </Button>
          <div className="flex space-x-2">
            {getSubTabs().map((tab) => (
              <Button
                key={tab.id}
                variant={currentSubTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentSubTab(tab.id)}
                className="text-xs"
              >
                {tab.title}
                {subTabValidation[tab.id] && (
                  <CheckCircle2 className="ml-1 h-3 w-3 text-green-500" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {renderSubTab()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Discovery Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Set Discovery Schedule */}
            <div className="space-y-2">
              <Label htmlFor="discoverySchedule" className="font-fluent">
                Set Discovery Schedule *
              </Label>
              <Select
                disabled={isReadOnly}
                value={discoveryData.discoverySchedule}
                onValueChange={(value) => updateDiscoveryData({ discoverySchedule: value })}
              >
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select discovery schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Schedule (90 days)</SelectItem>
                  <SelectItem value="expedited">Expedited Schedule (45 days)</SelectItem>
                  <SelectItem value="extended">Extended Schedule (120 days)</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discovery Start Date */}
            <div className="space-y-2">
              <Label className="font-fluent">Discovery Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isReadOnly}
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryData.discoveryStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryData.discoveryStartDate ? (
                      format(discoveryData.discoveryStartDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryData.discoveryStartDate}
                    onSelect={(date) => updateDiscoveryData({ discoveryStartDate: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Discovery Cutoff Date */}
            <div className="space-y-2">
              <Label className="font-fluent">Discovery Cutoff Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isReadOnly}
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryData.discoveryCutoffDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryData.discoveryCutoffDate ? (
                      format(discoveryData.discoveryCutoffDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryData.discoveryCutoffDate}
                    onSelect={(date) => updateDiscoveryData({ discoveryCutoffDate: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Discovery Conference Date */}
            <div className="space-y-2">
              <Label className="font-fluent">Date for Discovery Conference to monitor progress of discovery</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isReadOnly}
                    className={cn(
                      "w-full justify-start text-left font-normal shadow-fluent-8 border-input-border",
                      !discoveryData.discoveryConferenceDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {discoveryData.discoveryConferenceDate ? (
                      format(discoveryData.discoveryConferenceDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={discoveryData.discoveryConferenceDate}
                    onSelect={(date) => updateDiscoveryData({ discoveryConferenceDate: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Case ID */}
            <div className="space-y-2">
              <Label className="font-fluent">Case ID</Label>
              <Input
                value={discoveryData.caseId}
                disabled
                className="shadow-fluent-8 border-input-border bg-muted text-muted-foreground"
              />
            </div>

            {/* Process Stage */}
            <div className="space-y-2">
              <Label className="font-fluent">Process Stage</Label>
              <Input
                value={discoveryData.processStage}
                disabled
                className="shadow-fluent-8 border-input-border bg-muted text-muted-foreground"
              />
            </div>
          </div>

          {/* Type of Discovery Allowed */}
          <div className="space-y-4">
            <Label className="font-fluent text-base font-medium">Type of Discovery Allowed *</Label>
            <div className="grid grid-cols-2 gap-4">
              {discoveryTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`discovery-${type.id}`}
                    disabled={isReadOnly}
                    checked={discoveryData.selectedDiscoveryTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleDiscoveryTypeChange(type.id, checked as boolean)}
                  />
                  <Label htmlFor={`discovery-${type.id}`} className="font-fluent cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Summary */}
          <div className="space-y-2">
            <Label htmlFor="discoverySummary" className="font-fluent">
              Discovery Summary *
            </Label>
            <Textarea
              id="discoverySummary"
              placeholder="Provide a summary of the discovery process and key considerations..."
              className="min-h-[100px] shadow-fluent-8 border-input-border"
              disabled={isReadOnly}
              value={discoveryData.discoverySummary}
              onChange={(e) => updateDiscoveryData({ discoverySummary: e.target.value })}
            />
          </div>

          {/* Sub-tabs navigation when types are selected */}
          {discoveryData.selectedDiscoveryTypes.length > 0 && (
            <div className="border-t pt-6">
              <h4 className="font-semibold font-fluent mb-4">Discovery Sub-Processes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSubTabs().map((tab) => (
                  <Card 
                    key={tab.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setCurrentSubTab(tab.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium font-fluent">{tab.title}</span>
                        <div className="flex items-center space-x-2">
                          {subTabValidation[tab.id] ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                          )}
                          <Button variant="ghost" size="sm">
                            Configure →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}