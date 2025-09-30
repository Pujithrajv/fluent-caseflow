import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, Trash2, Download, Check, ExternalLink, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface DocumentUploadTabProps {
  onDataChange: (data: any) => void;
  data: any;
  isReadOnly?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
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
    name: "Environmental_Assessment_Report.pdf",
    type: "Notice of Violation",
    size: "1.2 MB",
    uploadedDate: "2024-01-15",
    mappedToRequired: "Notice of Violation"
  },
  {
    id: 2,
    name: "Site_Inspection_Documentation.pdf",
    type: "Well Inspection Report",
    size: "2.8 MB", 
    uploadedDate: "2024-01-14",
    mappedToRequired: "Well Inspection Report"
  },
  {
    id: 3,
    name: "Compliance_Review_Summary.pdf",
    type: "Supporting Evidence",
    size: "0.9 MB",
    uploadedDate: "2024-01-13"
  }
];

export function DocumentUploadTab({ onDataChange, data, isReadOnly = false, onNext, onPrevious }: DocumentUploadTabProps) {
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
    'Supporting Evidence'
  ];

  return (
    <div className="space-y-6">
      {/* Required Documents Table */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-fluent">
            <FileText className="h-5 w-5 text-primary" />
            <span>Required Document Table</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Required
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {requiredDocuments.map((doc, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-medium font-fluent text-foreground">{doc.name}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">Yes</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">{doc.description}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>


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
                Supported formats: PDF, JPG, PNG (Max 10MB per file)
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
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider w-1/4">
                        Document Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider w-2/5">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider w-1/6">
                        Uploaded Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider w-24">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {uploadedDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 w-1/4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium font-fluent text-foreground">{doc.name}</span>
                            {doc.mappedToRequired && (
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 w-2/5">
                          <RadioGroup 
                            value={doc.type}
                            onValueChange={(value) => handleDocumentTypeChange(doc.id, value)}
                            disabled={isReadOnly}
                            className="space-y-2"
                          >
                            {availableDocumentTypes.map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={type} 
                                  id={`${doc.id}-${type}`}
                                  className="border-primary"
                                />
                                <Label 
                                  htmlFor={`${doc.id}-${type}`}
                                  className="text-sm font-fluent cursor-pointer"
                                >
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </td>
                        <td className="px-4 py-4 w-1/6">
                          <span className="text-sm font-fluent text-foreground">{doc.uploadedDate}</span>
                        </td>
                        <td className="px-4 py-4 w-24">
                          {!isReadOnly && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
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


      {/* Navigation Buttons */}
      {(onNext || onPrevious) && (
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            Previous
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onNext}
            disabled={!onNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}