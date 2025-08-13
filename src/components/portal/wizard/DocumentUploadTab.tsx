import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, Trash2, Download, Check, ExternalLink, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface DocumentUploadTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
}

interface RequiredDocument {
  name: string;
  hasTemplate?: boolean;
  templateUrl?: string;
  description?: string;
}

interface UploadedDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
  mappedToRequired?: string;
}

// Case type to required documents mapping - admin configurable
const requiredDocumentsByCase: Record<string, RequiredDocument[]> = {
  'Abandoned Well': [
    { 
      name: 'Notice of Violation', 
      hasTemplate: true, 
      templateUrl: '/templates/notice-of-violation.pdf',
      description: 'Official notice documenting the violation'
    },
    { 
      name: 'Well Inspection Report', 
      hasTemplate: true, 
      templateUrl: '/templates/well-inspection-report.pdf',
      description: 'Technical inspection documentation'
    },
    { 
      name: 'Well Records of the Inspector', 
      hasTemplate: false,
      description: 'Historical records and documentation'
    }
  ],
  'Environmental Compliance': [
    { 
      name: 'Environmental Impact Assessment', 
      hasTemplate: true, 
      templateUrl: '/templates/environmental-impact.pdf',
      description: 'Assessment of environmental impact'
    },
    { 
      name: 'Soil Test Results', 
      hasTemplate: false,
      description: 'Laboratory soil analysis results'
    },
    { 
      name: 'Water Quality Report', 
      hasTemplate: false,
      description: 'Water quality testing documentation'
    }
  ],
  'Safety Violation': [
    { 
      name: 'Incident Report', 
      hasTemplate: true, 
      templateUrl: '/templates/incident-report.pdf',
      description: 'Detailed incident documentation'
    },
    { 
      name: 'Safety Inspection Report', 
      hasTemplate: true, 
      templateUrl: '/templates/safety-inspection.pdf',
      description: 'Safety compliance inspection results'
    },
    { 
      name: 'Witness Statements', 
      hasTemplate: false,
      description: 'Statements from witnesses'
    }
  ]
};

// Mock uploaded documents - in real app this would come from props/state
const mockDocuments: UploadedDocument[] = [
  {
    id: 1,
    name: "Notice_of_Violation_2024.pdf",
    type: "Notice of Violation",
    size: "1.2 MB",
    uploadedDate: "2024-01-15",
    mappedToRequired: "Notice of Violation"
  },
  {
    id: 2,
    name: "Well_Inspection_Report_2024.pdf",
    type: "Well Inspection Report",
    size: "2.8 MB", 
    uploadedDate: "2024-01-14",
    mappedToRequired: "Well Inspection Report"
  },
  {
    id: 3,
    name: "Additional_Documentation.pdf",
    type: "Supporting Evidence",
    size: "0.9 MB",
    uploadedDate: "2024-01-13"
  }
];

export function DocumentUploadTab({ onDataChange, data, isReadOnly = false }: DocumentUploadTabProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(mockDocuments);
  
  // Get the case type from form data to determine required documents
  const caseType = data?.caseDetails?.caseType || data?.selectedCategory || 'Abandoned Well';
  const requiredDocuments = requiredDocumentsByCase[caseType] || [];
  
  // Helper function to check if a required document has been uploaded
  const isDocumentUploaded = (requiredDocName: string) => {
    return uploadedDocuments.some(doc => doc.mappedToRequired === requiredDocName);
  };

  // Get missing required documents
  const missingDocuments = requiredDocuments.filter(doc => !isDocumentUploaded(doc.name));
  const allRequiredUploaded = missingDocuments.length === 0;

  // Handle document type change
  const handleDocumentTypeChange = (documentId: number, newType: string) => {
    setUploadedDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, type: newType, mappedToRequired: requiredDocuments.find(req => req.name === newType)?.name }
          : doc
      )
    );
  };

  // Handle document deletion
  const handleDeleteDocument = (documentId: number) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  // Available document types for dropdown
  const availableDocumentTypes = [
    ...requiredDocuments.map(doc => doc.name),
    'Supporting Evidence',
    'Correspondence', 
    'Legal Document',
    'Technical Drawing',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Required Documents Section */}
      {requiredDocuments.length > 0 && (
        <Card className="shadow-fluent-8 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <FileText className="h-5 w-5 text-primary" />
              <span>Required Documents</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground font-fluent">
              You must upload all required documents before submitting this case.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requiredDocuments.map((doc, index) => {
                const isUploaded = isDocumentUploaded(doc.name);
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        isUploaded 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'bg-transparent border-gray-300'
                      }`}>
                        {isUploaded && <Check className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
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
                        {doc.description && (
                          <p className="text-sm text-muted-foreground font-fluent mt-1">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isUploaded ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <span className="text-sm">Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Missing Documents Warning */}
      {!allRequiredUploaded && missingDocuments.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div>
              <p className="font-medium mb-2">Missing Required Documents</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {missingDocuments.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
              <p className="text-sm mt-2">You cannot proceed to submission until all required documents are uploaded.</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Document Upload Section */}
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
              <p className="text-sm font-fluent text-muted-foreground mb-4">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
              </p>
              <Button variant="outline" size="sm" className="font-fluent">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          )}
          
          {/* Uploaded Documents Table */}
          <div className="space-y-4">
            <h3 className="font-semibold font-fluent text-foreground">Uploaded Documents</h3>
            
            {uploadedDocuments.length > 0 ? (
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Uploaded Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {uploadedDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium font-fluent text-foreground">{doc.name}</span>
                            {doc.mappedToRequired && (
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Select 
                            value={doc.type} 
                            onValueChange={(value) => handleDocumentTypeChange(doc.id, value)}
                            disabled={isReadOnly}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDocumentTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
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
                {!isReadOnly && (
                  <p className="text-sm font-fluent text-muted-foreground mt-2">
                    Upload your first document using the area above
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      {requiredDocuments.length > 0 && (
        <Card className="shadow-fluent-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="font-medium font-fluent">
                Required Documents Progress
              </span>
              <span className="text-sm font-fluent text-muted-foreground">
                {requiredDocuments.length - missingDocuments.length} of {requiredDocuments.length} uploaded
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((requiredDocuments.length - missingDocuments.length) / requiredDocuments.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}