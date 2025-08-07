import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Search, Plus } from "lucide-react";

interface PrimaryPartyTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

interface PrimaryPartyData {
  partyName?: string;
  represented?: "yes" | "no";
  attorneyName?: string;
}

export function PrimaryPartyTab({ onDataChange, data }: PrimaryPartyTabProps) {
  const handlePartyNameChange = (value: string) => {
    onDataChange({ ...data, partyName: value });
  };

  const handleRepresentedChange = (value: "yes" | "no") => {
    onDataChange({ ...data, represented: value, attorneyName: value === "no" ? undefined : data?.attorneyName });
  };

  const handleAttorneyNameChange = (value: string) => {
    onDataChange({ ...data, attorneyName: value });
  };

  const handleSearchParty = () => {
    // TODO: Implement party search functionality
    console.log("Search party functionality to be implemented");
  };

  const handleAddParty = () => {
    // TODO: Implement add party functionality
    console.log("Add party functionality to be implemented");
  };

  const handleSearchAttorney = () => {
    // TODO: Implement attorney search functionality
    console.log("Search attorney functionality to be implemented");
  };

  const handleAddAttorney = () => {
    // TODO: Implement add attorney functionality
    console.log("Add attorney functionality to be implemented");
  };

  return (
    <div className="space-y-6">
      {/* Expedited Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-fluent text-muted-foreground">Expedited</p>
          <Badge variant="secondary">No</Badge>
        </div>
      </div>
      
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <User className="h-5 w-5 text-primary" />
            <span>Primary Party Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="partyName" className="font-fluent">Party Name *</Label>
            <div className="flex space-x-2">
              <Input 
                id="partyName"
                placeholder="Enter party name"
                value={data?.partyName || ""}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                className="shadow-fluent-8 border-input-border flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSearchParty}
                className="flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddParty}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Party</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="font-fluent">Represented *</Label>
            <RadioGroup 
              value={data?.represented || "no"} 
              onValueChange={handleRepresentedChange}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="represented-yes" />
                <Label htmlFor="represented-yes" className="font-fluent">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="represented-no" />
                <Label htmlFor="represented-no" className="font-fluent">No</Label>
              </div>
            </RadioGroup>
          </div>

          {data?.represented === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="attorneyName" className="font-fluent">Attorney Name</Label>
              <div className="flex space-x-2">
                <Input 
                  id="attorneyName"
                  placeholder="Enter attorney name"
                  value={data?.attorneyName || ""}
                  onChange={(e) => handleAttorneyNameChange(e.target.value)}
                  className="shadow-fluent-8 border-input-border flex-1"
                />
                 <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSearchAttorney}
                  className="flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddAttorney}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Attorney</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}