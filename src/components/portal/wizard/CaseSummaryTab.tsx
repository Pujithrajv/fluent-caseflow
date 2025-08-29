import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Download, Eye, FileText, CalendarIcon, ChevronDown, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CaseSummaryTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onEditTab?: (tabId: string) => void;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}

export function CaseSummaryTab({ 
  data, 
  onDataChange, 
  onEditTab, 
  isReadOnly = true,
  isSeededCase = false 
}: CaseSummaryTabProps) {
  
  const [initiatingActionDate, setInitiatingActionDate] = useState<Date>(
    data.initiatingActionDate ? new Date(data.initiatingActionDate) : undefined
  );
  const [responsiveActionDate, setResponsiveActionDate] = useState<Date>(
    data.responsiveActionDate ? new Date(data.responsiveActionDate) : undefined
  );
  const [selectedAccessibilityOptions, setSelectedAccessibilityOptions] = useState<string[]>(
    data.accessibilityOptions || []
  );
  const [isAccessibilityDropdownOpen, setIsAccessibilityDropdownOpen] = useState(false);

  const accessibilityOptions = [
    { value: "podium", label: "Podium" },
    { value: "audio-amplification", label: "Audio Amplification (Mic & Speakers)" },
    { value: "video-projection", label: "Video Projection for video and/or photos" },
    { value: "audio-projection", label: "Audio Projection for recordings or audio clips" },
    { value: "easel", label: "Easel" },
    { value: "laptop-space", label: "Space for a laptop/physical documents for review" },
    { value: "electrical-outlets", label: "Electrical outlets, chargers and cables" }
  ];
  
  const handleEditClick = (tabId: string) => {
    if (onEditTab) {
      onEditTab(tabId);
    }
  };

  const handleAccessibilityChange = (optionValue: string, checked: boolean) => {
    let newSelection: string[];
    if (checked) {
      newSelection = [...selectedAccessibilityOptions, optionValue];
    } else {
      newSelection = selectedAccessibilityOptions.filter(item => item !== optionValue);
    }
    setSelectedAccessibilityOptions(newSelection);
    onDataChange({ ...data, accessibilityOptions: newSelection });
  };

  const removeOption = (optionValue: string) => {
    const newSelection = selectedAccessibilityOptions.filter(item => item !== optionValue);
    setSelectedAccessibilityOptions(newSelection);
    onDataChange({ ...data, accessibilityOptions: newSelection });
  };

  const getSelectedLabels = () => {
    return selectedAccessibilityOptions.map(value => 
      accessibilityOptions.find(option => option.value === value)?.label
    ).filter(Boolean);
  };

  // Mock data for demonstration - replace with actual data from props
  const mockRequests = [
    { id: 1, group: "Motion", type: "Motion to Dismiss", reference: "REQ-2024-001", date: "2024-01-15", status: "Draft" },
    { id: 2, group: "Discovery", type: "Document Production", reference: "REQ-2024-002", date: "2024-01-12", status: "Submitted" }
  ];

  const mockDocuments = [
    { id: 1, name: "Initial_Complaint.pdf", size: "2.4 MB", uploadDate: "2024-01-15" },
    { id: 2, name: "Supporting_Evidence.docx", size: "856 KB", uploadDate: "2024-01-14" }
  ];

  const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border last:border-b-0">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-fluent">{value}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Department Information */}
      {(data?.department || data?.division || data?.bureau) && (
        <Card className="shadow-fluent-8 aspect-square flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold text-sm">Department Information</CardTitle>
                <p className="text-muted-foreground font-fluent text-xs">Agency structure and personnel</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditClick('department')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-0 text-xs">
            <InfoRow label="Department" value={data?.department} />
            <InfoRow label="Division" value={data?.division} />
            <InfoRow label="Bureau" value={data?.bureau} />
            <InfoRow label="Case Type" value={data?.caseType} />
            <InfoRow label="Case Reference" value={data?.referenceNumber} />
          </CardContent>
        </Card>
      )}

      {/* Primary Party Information */}
      {(data?.partyName || data?.partyType) && (
        <Card className="shadow-fluent-8 aspect-square flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold text-sm">Primary Party Information</CardTitle>
                <p className="text-muted-foreground font-fluent text-xs">Party details and representation</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditClick('primary-party')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-0 text-xs">
            <InfoRow label="Party Type" value={data?.partyType} />
            <InfoRow label="Party Name" value={data?.partyName} />
            <InfoRow label="Email" value={data?.contactEmail} />
            <InfoRow label="Phone" value={data?.contactPhone} />
            <InfoRow label="Represented" value={data?.isRepresented ? "Yes" : "No"} />
            {data?.attorneyName && <InfoRow label="Attorney" value={data?.attorneyName} />}
          </CardContent>
        </Card>
      )}

      {/* Case Details */}
      <Card className="shadow-fluent-8 aspect-square flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold text-sm">Case Details</CardTitle>
              <p className="text-muted-foreground font-fluent text-xs">Case information and timeline</p>
            </div>
            {onEditTab && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEditClick('case-details')}
                className="hover:bg-muted/80 focus:bg-muted/80 transition-colors h-6 w-6 p-0"
              >
                <Edit className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-0 text-xs">
          <InfoRow label="Case Name" value={data?.caseName} />
          <InfoRow label="Description" value={data?.caseDescription} />
          <InfoRow label="Special Instructions" value={data?.specialInstructions} />
          <InfoRow label="Caption Notation" value={data?.captionNotation} />
          <InfoRow label="Initiating Action Date" value={data?.initiatingActionDate ? format(new Date(data.initiatingActionDate), 'MMM dd, yyyy') : undefined} />
          <InfoRow label="Responsive Action Date" value={data?.responsiveActionDate ? format(new Date(data.responsiveActionDate), 'MMM dd, yyyy') : undefined} />
          {data?.accessibilityOptions && data.accessibilityOptions.length > 0 && (
            <InfoRow label="Hearing Resources" value={data.accessibilityOptions.map(val => 
              accessibilityOptions.find(opt => opt.value === val)?.label
            ).filter(Boolean).join(', ')} />
          )}
        </CardContent>
      </Card>

      {/* Abandon Well Questions - Only show if relevant data exists */}
      {(data?.permitteeNumber || data?.permitNumber || data?.numberOfWells) && (
        <Card className="shadow-fluent-8 aspect-square flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-fluent font-semibold text-sm">Abandon Well Questions</CardTitle>
                <p className="text-muted-foreground font-fluent text-xs">Case type specific information</p>
              </div>
              {onEditTab && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditClick('case-questions')}
                  className="hover:bg-muted/80 focus:bg-muted/80 transition-colors h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-0 text-xs">
            <InfoRow label="Permittee Number" value={data?.permitteeNumber} />
            <InfoRow label="Permit Number" value={data?.permitNumber} />
            <InfoRow label="Number of Wells" value={data?.numberOfWells?.toString()} />
            <InfoRow label="Reason for Case Initiation" value={data?.reasonForInitiation} />
          </CardContent>
        </Card>
      )}

    </div>
  );
}