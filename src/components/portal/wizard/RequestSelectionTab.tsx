import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Scale, Search, Award, FileX, Bell } from "lucide-react";

interface RequestSelectionTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onComplete: () => void;
  onNext?: () => void;
}

const requestGroups = [
  { value: "motion", label: "Motion", icon: Scale },
  { value: "exhibit", label: "Exhibit", icon: FileText },
  { value: "discovery", label: "Discovery", icon: Search },
  { value: "certificate", label: "Certificate", icon: Award },
  { value: "pleading", label: "Pleading", icon: FileX },
  { value: "notices", label: "Notices", icon: Bell }
];

// Motion types from the existing Motion Details component
const motionTypes = [
  "Motion for In Camera Inspection",
  "Motion for Protective Order",
  "Motion for Recusal",
  "Motion for Substitution of Counsel",
  "Motion to Amend Pleadings",
  "Motion to Continue",
  "Motion to Dismiss",
  "Motion to Withdraw as Counsel",
  "Motion to Withdraw Case",
  "Motions Otherwise Not Classified",
  "Motion to Compel Discovery",
  "Motion to Issue a Subpoena",
  "Motion to Quash a Subpoena",
  "Motion to Exclude",
  "Motion to Leave to Correct the Record",
  "Motion to Object to Exhibit Admission",
  "Motion to Re-Open the Record",
  "Motion to Take Judicial Notice",
  "Motion for Reconsideration",
  "Motion for Rehearing",
  "Motion for Change of Venue",
  "Motion for Default Judgment",
  "Motion for Expedited Consideration",
  "Motion for Substitution of ALJ",
  "Motion for Summary Judgement",
  "Motion in Limine",
  "Motion to Advance a Court Date",
  "Motion to Consolidate",
  "Motion to Dismiss on Legal Grounds"
];

// Exhibit types from the Exhibit Type tab
const exhibitTypes = [
  "Document",
  "Oversized/Voluminous Document", 
  "Photograph",
  "Recording",
  "Physical Item"
];

export function RequestSelectionTab({ onDataChange, data, onComplete, onNext }: RequestSelectionTabProps) {
  const [requestGroup, setRequestGroup] = useState(data.requestGroup || "");
  const [requestType, setRequestType] = useState(data.requestType || "");
  const [summary, setSummary] = useState(data.summary || "");

  const handleRequestGroupChange = (value: string) => {
    setRequestGroup(value);
    setRequestType(""); // Reset type when group changes
    onDataChange({ requestGroup: value, requestType: "", summary });
  };

  const handleRequestTypeChange = (value: string) => {
    setRequestType(value);
    onDataChange({ requestGroup, requestType: value, summary });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    onDataChange({ requestGroup, requestType, summary: newSummary });
  };

  // Get available request types based on selected group
  const getRequestTypes = () => {
    switch (requestGroup) {
      case "motion":
        return motionTypes;
      case "exhibit":
        return exhibitTypes;
      case "discovery":
      case "certificate": 
      case "pleading":
      case "notices":
        // For these groups, the request type mirrors the group name
        return [requestGroup.charAt(0).toUpperCase() + requestGroup.slice(1)];
      default:
        return [];
    }
  };

  const canContinue = requestGroup && requestType;

  useEffect(() => {
    if (canContinue) {
      onComplete();
    }
  }, [canContinue, onComplete]);

  return (
    <div className="space-y-6">
      {/* Request Group */}
      <div className="space-y-2">
        <Label htmlFor="requestGroup" className="font-fluent font-semibold text-sm">Request Group *</Label>
        <Select value={requestGroup} onValueChange={handleRequestGroupChange}>
          <SelectTrigger className="shadow-fluent-8 border-input-border">
            <SelectValue placeholder="Select request group" />
          </SelectTrigger>
          <SelectContent>
            {requestGroups.map((group) => {
              const Icon = group.icon;
              return (
                <SelectItem key={group.value} value={group.value}>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{group.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Request Type - Only show when group is selected */}
      {requestGroup && (
        <div className="space-y-2">
          <Label htmlFor="requestType" className="font-fluent font-semibold text-sm">Request Type *</Label>
          <Select value={requestType} onValueChange={handleRequestTypeChange}>
            <SelectTrigger className="shadow-fluent-8 border-input-border">
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              {getRequestTypes().map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Summary */}
      {requestType && (
        <div className="space-y-2">
          <Label htmlFor="summary" className="font-fluent font-semibold text-sm">Summary</Label>
          <Textarea
            id="summary"
            placeholder="Enter a brief summary of your request..."
            value={summary}
            onChange={handleSummaryChange}
            className="min-h-[100px] shadow-fluent-8 border-input-border resize-none"
          />
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <Button 
          disabled={!canContinue}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}