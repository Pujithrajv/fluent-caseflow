import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

interface InterrogatoriesQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function InterrogatoriesQuestionsTab({ onDataChange, data }: InterrogatoriesQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Interrogatories Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="numberOfInterrogatories" className="font-fluent">Number of Interrogatories *</Label>
            <Input 
              id="numberOfInterrogatories"
              type="number"
              placeholder="Enter number of interrogatories"
              className="shadow-fluent-8 border-input-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interrogatoriesScope" className="font-fluent">Scope of Interrogatories *</Label>
            <Textarea 
              id="interrogatoriesScope"
              placeholder="Describe the scope and subject matter of your interrogatories..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interrogatoriesJustification" className="font-fluent">Justification for Interrogatories</Label>
            <Textarea 
              id="interrogatoriesJustification"
              placeholder="Explain why these interrogatories are necessary and relevant to your case..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificQuestions" className="font-fluent">Specific Questions (Optional)</Label>
            <Textarea 
              id="specificQuestions"
              placeholder="List any specific interrogatory questions you want to include..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}