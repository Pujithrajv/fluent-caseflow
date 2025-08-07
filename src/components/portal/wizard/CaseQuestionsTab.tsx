import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

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
            <span>Abandon Wells Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-muted p-12 text-center text-muted-foreground">
            <HelpCircle className="mx-auto h-16 w-16 mb-4 opacity-50" />
            <p className="font-fluent text-lg">No questions configured</p>
            <p className="text-sm font-fluent mt-2">Questions will appear here when configured</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}