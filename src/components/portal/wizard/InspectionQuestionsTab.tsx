import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface InspectionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function InspectionQuestionsTab({ onDataChange, data }: InspectionQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Search className="h-5 w-5 text-primary" />
            <span>Inspection Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="whatToInspect" className="font-fluent">What is to be inspected?</Label>
            <Textarea 
              id="whatToInspect"
              placeholder="Describe what is to be inspected..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionPurpose" className="font-fluent">What is the purpose of the inspection?</Label>
            <Textarea 
              id="inspectionPurpose"
              placeholder="Explain the purpose of the inspection..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whoPresent" className="font-fluent">Who is to be present at the inspection?</Label>
            <Textarea 
              id="whoPresent"
              placeholder="Describe who should be present during the inspection..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whoControls" className="font-fluent">Who controls the thing to be inspected?</Label>
            <Textarea 
              id="whoControls"
              placeholder="Identify who has control over the item/location to be inspected..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}