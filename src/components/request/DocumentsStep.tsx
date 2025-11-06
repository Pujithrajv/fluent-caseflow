import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Upload, X } from "lucide-react";

interface DocumentsStepProps {
  data: File[];
  onNext: (data: any) => void;
  onBack: () => void;
}

export function DocumentsStep({ data, onNext, onBack }: DocumentsStepProps) {
  const [files, setFiles] = useState<File[]>(data || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ documents: files });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Attach any supporting files for this request (optional unless otherwise ordered).
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label htmlFor="file-upload">Upload Documents</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <Input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="file-upload"
              className="cursor-pointer text-primary hover:text-primary/80"
            >
              Click to upload files
            </Label>
            <p className="text-sm text-muted-foreground mt-2">
              or drag and drop files here
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-3 rounded-lg"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
