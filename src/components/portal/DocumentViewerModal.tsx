import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";

interface DocumentViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock documents data - this would come from the document upload step
const mockDocuments = [
  {
    id: 1,
    name: "Application Form.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedDate: "2024-01-15",
    uploadedBy: "John Smith",
    status: "Uploaded"
  },
  {
    id: 2,
    name: "Supporting Evidence.docx", 
    type: "DOCX",
    size: "1.8 MB",
    uploadedDate: "2024-01-15",
    uploadedBy: "John Smith", 
    status: "Uploaded"
  },
  {
    id: 3,
    name: "Technical Specifications.pdf",
    type: "PDF", 
    size: "3.2 MB",
    uploadedDate: "2024-01-16",
    uploadedBy: "Sarah Johnson",
    status: "Uploaded"
  }
];

export function DocumentViewerModal({ open, onOpenChange }: DocumentViewerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fluent text-xl">Initialing Documents</DialogTitle>
          <p className="text-muted-foreground">
            Documents uploaded during case creation
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          {mockDocuments.length > 0 ? (
            <div className="grid gap-4">
              {mockDocuments.map((document) => (
                <Card key={document.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">{document.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Badge variant="outline" className="text-xs">
                                {document.type}
                              </Badge>
                              <span>{document.size}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{document.uploadedDate}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{document.uploadedBy}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {document.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No documents uploaded yet</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}