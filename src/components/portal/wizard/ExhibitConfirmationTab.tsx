import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Mail, FileText } from "lucide-react";

interface ExhibitConfirmationTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onFinish: () => void;
}

export function ExhibitConfirmationTab({ data, onFinish }: ExhibitConfirmationTabProps) {
  const uploadedExhibits = data.uploadedExhibits || [];
  const exhibitCount = uploadedExhibits.length;

  return (
    <div className="space-y-6">
      {/* Confirmation Message */}
      <Card className="shadow-fluent-8 border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Check className="h-5 w-5 text-success" />
            <span>Exhibit Submission Confirmation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="bg-success/10 border border-success/20 p-6 rounded-lg">
              <Mail className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold font-fluent text-foreground mb-2">
                Submission Successful!
              </h3>
              <p className="font-fluent text-foreground">
                You have uploaded <strong>{exhibitCount}</strong> exhibit{exhibitCount !== 1 ? 's' : ''}. 
                Confirmation of the upload will be provided by e-mail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary of Uploaded Exhibits */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Submitted Exhibits Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedExhibits.map((exhibit: any, index: number) => (
              <div key={exhibit.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium font-fluent text-foreground">{exhibit.exhibitId}</p>
                    <p className="text-sm font-fluent text-muted-foreground">
                      {exhibit.itemClass} - {exhibit.fileName}
                    </p>
                    {exhibit.documentTitle && (
                      <p className="text-sm font-fluent text-muted-foreground">
                        Title: {exhibit.documentTitle}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-sm font-fluent text-success flex items-center space-x-1">
                  <Check className="h-4 w-4" />
                  <span>Submitted</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="font-fluent">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm font-fluent text-muted-foreground">
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>You will receive an email confirmation for each submitted exhibit</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Exhibits will be reviewed for relevance and admissibility</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>You will be notified if any additional information is required</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Exhibits will be marked and entered into the case record upon approval</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Finish Button */}
      <div className="flex justify-center pt-4">
        <Button onClick={onFinish} size="lg" className="font-fluent">
          <Check className="mr-2 h-4 w-4" />
          OK
        </Button>
      </div>
    </div>
  );
}