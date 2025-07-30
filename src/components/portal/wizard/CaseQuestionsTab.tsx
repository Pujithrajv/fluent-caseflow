import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, AlertTriangle } from "lucide-react";

interface CaseQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function CaseQuestionsTab({ onDataChange, data }: CaseQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Case Type Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jsonInput" className="font-fluent">JSON Input for Dynamic Questions</Label>
            <Textarea 
              id="jsonInput"
              placeholder='{"questions": [{"id": 1, "text": "Question text here", "type": "text"}]}'
              className="shadow-fluent-8 border-input-border min-h-[120px] font-mono text-sm"
            />
          </div>
          
          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="font-fluent text-warning-foreground">
              No questions found or invalid JSON structure. Please verify the JSON format above.
            </AlertDescription>
          </Alert>
          
          <div className="rounded-lg border border-muted p-6 text-center text-muted-foreground">
            <HelpCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="font-fluent">Dynamic questions will appear here based on case type selection</p>
            <p className="text-sm font-fluent mt-2">Valid JSON structure will generate appropriate form fields</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}