import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Trash2, Download } from "lucide-react";

interface DocumentUploadTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const mockDocuments = [
  {
    id: 1,
    name: "Environmental_Report_2024.pdf",
    type: "Environmental Report",
    size: "2.4 MB",
    uploadedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Site_Plans.dwg",
    type: "Technical Drawing",
    size: "5.1 MB", 
    uploadedDate: "2024-01-14"
  }
];

export function DocumentUploadTab({ onDataChange, data }: DocumentUploadTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Upload className="h-5 w-5 text-primary" />
            <span>Document Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-fluent text-foreground mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm font-fluent text-muted-foreground">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)</p>
            <Button variant="outline" size="sm" className="mt-4 font-fluent">
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
          
          {/* Uploaded Documents Table */}
          <div className="space-y-4">
            <h3 className="font-semibold font-fluent text-foreground">Uploaded Documents</h3>
            
            {mockDocuments.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {mockDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-medium font-fluent text-foreground">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Select defaultValue={doc.type}>
                            <SelectTrigger className="w-48 shadow-fluent-8 border-input-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Environmental Report">Environmental Report</SelectItem>
                              <SelectItem value="Technical Drawing">Technical Drawing</SelectItem>
                              <SelectItem value="Legal Document">Legal Document</SelectItem>
                              <SelectItem value="Supporting Evidence">Supporting Evidence</SelectItem>
                              <SelectItem value="Correspondence">Correspondence</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-fluent text-foreground">{doc.size}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-fluent text-foreground">{doc.uploadedDate}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-fluent text-muted-foreground">No documents uploaded yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}