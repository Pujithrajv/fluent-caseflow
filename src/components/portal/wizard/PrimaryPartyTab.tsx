import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "lucide-react";

interface PrimaryPartyTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function PrimaryPartyTab({ onDataChange, data }: PrimaryPartyTabProps) {
  return (
    <div className="space-y-6">
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
            <Input 
              id="partyName"
              placeholder="Enter party name"
              className="shadow-fluent-8 border-input-border"
            />
          </div>
          
          <div className="space-y-4">
            <Label className="font-fluent">Represented *</Label>
            <RadioGroup defaultValue="no" className="flex space-x-6">
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
        </CardContent>
      </Card>
    </div>
  );
}