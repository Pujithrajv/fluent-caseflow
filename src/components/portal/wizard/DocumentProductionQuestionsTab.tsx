import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface DocumentProductionQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

export function DocumentProductionQuestionsTab({ onDataChange, data }: DocumentProductionQuestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Document Production Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="documentFormat" className="font-fluent">Preferred Document Format *</Label>
              <Select>
                <SelectTrigger className="shadow-fluent-8 border-input-border">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronic">Electronic (PDF/Native)</SelectItem>
                  <SelectItem value="hard-copy">Hard Copy</SelectItem>
                  <SelectItem value="both">Both Electronic and Hard Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeFrame" className="font-fluent">Time Frame for Documents *</Label>
              <Input 
                id="timeFrame"
                placeholder="e.g., January 2020 - Present"
                className="shadow-fluent-8 border-input-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentCategories" className="font-fluent">Document Categories Requested *</Label>
            <Textarea 
              id="documentCategories"
              placeholder="Specify the types of documents you are requesting (e.g., contracts, correspondence, financial records)..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentJustification" className="font-fluent">Justification for Document Request</Label>
            <Textarea 
              id="documentJustification"
              placeholder="Explain why these documents are necessary and relevant to your case..."
              className="shadow-fluent-8 border-input-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificRequests" className="font-fluent">Specific Document Requests</Label>
            <Textarea 
              id="specificRequests"
              placeholder="List specific documents or detailed requests for production..."
              className="shadow-fluent-8 border-input-border min-h-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}