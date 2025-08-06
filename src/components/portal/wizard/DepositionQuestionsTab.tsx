import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

interface DepositionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function DepositionQuestionsTab({ onDataChange, data }: DepositionQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Users className="h-5 w-5 text-primary" />
            <span>Deposition Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="depositionType" className="font-fluent">Type of Deposition *</Label>
              <Select>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select deposition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oral">Oral Deposition</SelectItem>
                  <SelectItem value="written">Written Deposition</SelectItem>
                  <SelectItem value="video">Video Deposition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDuration" className="font-fluent">Estimated Duration *</Label>
              <Input 
                id="estimatedDuration"
                placeholder="e.g., 4 hours, 1 day"
                className="shadow-fluent-8 border-input-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deponentNames" className="font-fluent">Names of Deponents *</Label>
            <Textarea 
              id="deponentNames"
              placeholder="List the names and titles of persons to be deposed..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositionTopics" className="font-fluent">Topics for Deposition *</Label>
            <Textarea 
              id="depositionTopics"
              placeholder="Describe the topics and subject areas you plan to cover in the deposition..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositionJustification" className="font-fluent">Justification for Deposition</Label>
            <Textarea 
              id="depositionJustification"
              placeholder="Explain why this deposition is necessary and relevant to your case..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="font-fluent">Special Requests or Instructions</Label>
            <Textarea 
              id="specialRequests"
              placeholder="Any special arrangements, interpreters, or other requirements..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}