import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, Trash2, Check } from "lucide-react";
import { useState } from "react";

interface ExhibitUploadTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onNext: () => void;
  onUploadAnother: () => void;
}

interface UploadedExhibit {
  id: string;
  itemClass: string;
  fileName: string;
  documentTitle?: string;
  exhibitId: string;
  uploadDate: string;
  size: string;
}

export function ExhibitUploadTab({ onDataChange, data, onNext, onUploadAnother }: ExhibitUploadTabProps) {
  const [uploadedExhibits, setUploadedExhibits] = useState<UploadedExhibit[]>(data.uploadedExhibits || []);
  const [hasAnotherItem, setHasAnotherItem] = useState<boolean | null>(null);

  const handleFileUpload = () => {
    // Simulate file upload
    const newExhibit: UploadedExhibit = {
      id: `EX-${Date.now()}`,
      itemClass: data.exhibitType || "Document",
      fileName: `exhibit_${Date.now()}.pdf`,
      documentTitle: data.documentTitle,
      exhibitId: `EX-${Date.now()}`,
      uploadDate: new Date().toLocaleDateString(),
      size: "2.3 MB"
    };
    
    const updatedExhibits = [...uploadedExhibits, newExhibit];
    setUploadedExhibits(updatedExhibits);
    onDataChange({ 
      uploadedExhibits: updatedExhibits,
      currentExhibitId: newExhibit.exhibitId
    });
  };

  const handleAnotherItemResponse = (hasAnother: boolean) => {
    setHasAnotherItem(hasAnother);
    onDataChange({ hasAnotherItem: hasAnother });
  };

  const handleContinue = () => {
    if (hasAnotherItem) {
      onUploadAnother();
    } else {
      onNext();
    }
  };

  const removeExhibit = (id: string) => {
    const updatedExhibits = uploadedExhibits.filter(exhibit => exhibit.id !== id);
    setUploadedExhibits(updatedExhibits);
    onDataChange({ uploadedExhibits: updatedExhibits });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Exhibit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center hover:border-primary transition-colors cursor-pointer" onClick={handleFileUpload}>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-foreground mb-2">Drag and drop your exhibit here, or click to browse</p>
              <p className="text-sm font-fluent text-muted-foreground">Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4 (Max 25MB)</p>
              <Button variant="outline" size="sm" className="mt-4 font-fluent">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>

            {/* Exhibit Information */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold font-fluent text-foreground mb-2">Exhibit Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium font-fluent text-muted-foreground">Item Class:</span>
                  <span className="ml-2 font-fluent text-foreground">{data.exhibitType || "Document"}</span>
                </div>
                {data.documentTitle && (
                  <div>
                    <span className="font-medium font-fluent text-muted-foreground">Document Title:</span>
                    <span className="ml-2 font-fluent text-foreground">{data.documentTitle}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Exhibits */}
      {uploadedExhibits.length > 0 && (
        <Card className="shadow-fluent-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <Check className="h-5 w-5 text-success" />
              <span>Uploaded Exhibits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Exhibit ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Item Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Document Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {uploadedExhibits.map((exhibit) => (
                    <tr key={exhibit.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-medium font-fluent text-primary">{exhibit.exhibitId}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-fluent text-foreground capitalize">{exhibit.itemClass}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-fluent text-foreground">{exhibit.fileName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-fluent text-foreground">{exhibit.documentTitle || "-"}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeExhibit(exhibit.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Another Item Question */}
      {uploadedExhibits.length > 0 && hasAnotherItem === null && (
        <Card className="shadow-fluent-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold font-fluent text-foreground">Do you have another item to upload?</h3>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleAnotherItemResponse(true)}
                  className="font-fluent"
                >
                  Yes, upload another
                </Button>
                <Button 
                  onClick={() => handleAnotherItemResponse(false)}
                  className="font-fluent"
                >
                  No, continue to confirmation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      {hasAnotherItem !== null && (
        <div className="flex justify-end">
          <Button onClick={handleContinue} className="font-fluent">
            {hasAnotherItem ? "Upload Another Item" : "Continue to Confirmation"}
          </Button>
        </div>
      )}
    </div>
  );
}