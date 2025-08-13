import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Trash2, Download, Check, ExternalLink } from "lucide-react";

interface DocumentUploadTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
}

interface RequiredDocument {
  name: string;
  hasTemplate?: boolean;
  templateUrl?: string;
}

// Case type to required documents mapping
const requiredDocumentsByCase: Record<string, RequiredDocument[]> = {
  'Abandoned Well': [
    { name: 'Notice of Violation', hasTemplate: true, templateUrl: '#' },
    { name: 'Notice to Caregiver', hasTemplate: true, templateUrl: '#' },
    { name: 'Police Reports', hasTemplate: false },
    { name: 'Request for Appeal', hasTemplate: true, templateUrl: '#' },
    { name: 'Responsive Document', hasTemplate: false },
    { name: 'Well Inspection Report', hasTemplate: true, templateUrl: '#' },
    { name: 'Well Records of the Inspector', hasTemplate: false }
  ],
  'Environmental Compliance': [
    { name: 'Environmental Impact Assessment', hasTemplate: true, templateUrl: '#' },
    { name: 'Soil Test Results', hasTemplate: false },
    { name: 'Water Quality Report', hasTemplate: false }
  ],
  'Safety Violation': [
    { name: 'Incident Report', hasTemplate: true, templateUrl: '#' },
    { name: 'Safety Inspection Report', hasTemplate: true, templateUrl: '#' },
    { name: 'Witness Statements', hasTemplate: false }
  ]
};

const mockDocuments = [
  {
    id: 1,
    name: "Notice_of_Violation_2024.pdf",
    type: "Notice of Violation",
    size: "1.2 MB",
    uploadedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Well_Inspection_Report_2024.pdf",
    type: "Well Inspection Report",
    size: "2.8 MB", 
    uploadedDate: "2024-01-14"
  },
  {
    id: 3,
    name: "Environmental_Assessment.pdf",
    type: "Supporting Evidence",
    size: "3.1 MB",
    uploadedDate: "2024-01-13"
  }
];

export function DocumentUploadTab({ onDataChange, data, isReadOnly = false }: DocumentUploadTabProps) {
  // Get the case type from form data to determine required documents
  const caseType = data.caseType || data.selectedCategory;
  const requiredDocuments = requiredDocumentsByCase[caseType] || [];
  
  // Helper function to check if a required document has been uploaded
  const isDocumentUploaded = (requiredDocName: string) => {
    return mockDocuments.some(doc => 
      doc.name.toLowerCase().includes(requiredDocName.toLowerCase()) ||
      doc.type.toLowerCase().includes(requiredDocName.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Required Documents Section */}
      {requiredDocuments.length > 0 && (
        <Card className="shadow-fluent-8 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <FileText className="h-5 w-5 text-primary" />
              <span>Required Documents for This Case Type</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground font-fluent">
              The following documents are required for {caseType} cases. Please ensure all are uploaded before submission.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requiredDocuments.map((doc, index) => {
                const isUploaded = isDocumentUploaded(doc.name);
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isUploaded 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted border border-muted-foreground'
                      }`}>
                        {isUploaded && <Check className="h-3 w-3" />}
                      </div>
                      <div>
                        {doc.hasTemplate ? (
                          <button 
                            className="text-primary hover:text-primary/80 font-medium font-fluent underline flex items-center space-x-1"
                            onClick={() => window.open(doc.templateUrl, '_blank')}
                          >
                            <span>{doc.name}</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        ) : (
                          <span className="font-medium font-fluent text-foreground">{doc.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-fluent">
                      {isUploaded ? (
                        <span className="text-success flex items-center space-x-1">
                          <Check className="h-4 w-4" />
                          <span>Uploaded</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not yet uploaded</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <Upload className="h-5 w-5 text-primary" />
            <span>Document Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          {!isReadOnly && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-foreground mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-sm font-fluent text-muted-foreground">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)</p>
              <Button variant="outline" size="sm" className="mt-4 font-fluent">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          )}
          
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
                          <Select defaultValue={doc.type} disabled={isReadOnly}>
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
                            {!isReadOnly && (
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
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