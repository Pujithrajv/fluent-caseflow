import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, ExternalLink } from "lucide-react";

interface RequestTypeQuestionsTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const questionSets = [
  {
    id: 'environmental-impact',
    title: 'Environmental Impact Assessment',
    description: 'Questions related to environmental considerations and impact evaluation.',
    questions: [
      {
        id: 'habitat-impact',
        question: 'Does this request involve potential habitat disruption?',
        helpText: 'Consider any activities that might affect wildlife habitats or protected areas.'
      },
      {
        id: 'water-quality',
        question: 'Are there water quality concerns associated with this request?',
        helpText: 'Evaluate potential impacts on groundwater, surface water, or water systems.'
      }
    ]
  },
  {
    id: 'compliance-review',
    title: 'Compliance Review',
    description: 'Regulatory compliance and adherence verification questions.',
    questions: [
      {
        id: 'regulatory-compliance',
        question: 'Does this request require regulatory compliance verification?',
        helpText: 'Check if current regulations and standards need to be verified.'
      },
      {
        id: 'permit-requirements',
        question: 'Are there specific permit requirements for this request?',
        helpText: 'Identify any permits or licenses that may be required.'
      }
    ]
  }
];

export function RequestTypeQuestionsTab({ onDataChange, data }: RequestTypeQuestionsTabProps) {
  return (
    <div className="space-y-6">
      {questionSets.map((questionSet) => (
        <Card key={questionSet.id} className="shadow-fluent-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>{questionSet.title}</span>
            </CardTitle>
            <p className="text-muted-foreground font-fluent text-sm">{questionSet.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {questionSet.questions.map((question) => (
              <div key={question.id} className="space-y-4 p-4 border border-input-border rounded-lg bg-background/50">
                <div className="space-y-2">
                  <Label className="font-fluent font-medium text-base">{question.question}</Label>
                  <p className="text-sm text-muted-foreground font-fluent">{question.helpText}</p>
                </div>
                
                <RadioGroup defaultValue="no" className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                    <Label htmlFor={`${question.id}-yes`} className="font-fluent">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${question.id}-no`} />
                    <Label htmlFor={`${question.id}-no`} className="font-fluent">No</Label>
                  </div>
                </RadioGroup>

                <div className="pt-2">
                  <Button variant="outline" size="sm" className="font-fluent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Complete In Camera Inspection
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}