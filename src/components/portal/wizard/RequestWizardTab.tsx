import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Calendar, User, ChevronDown, Search, Eye, HelpCircle } from "lucide-react";
import { DocumentViewerModal } from "../DocumentViewerModal";

interface RequestWizardTabProps {
  onAddNewRequest?: (type: string) => void;
  data: any;
  isReadOnly?: boolean;
  isPartiallyEditable?: boolean;
}

const mockRequests = [
  {
    id: 1,
    groupType: "Motion",
    summary: "Motion to Expedite",
    status: "Completed",
    date: "2024-01-15",
    submittedBy: "John Smith"
  },
  {
    id: 2,
    groupType: "Notice",
    summary: "Notice of Initial Status Conference",
    status: "In Progress",
    date: "2024-01-15",
    submittedBy: "Sarah Johnson"
  },
  {
    id: 3,
    groupType: "Exhibit",
    summary: "Summary of Physical Exhibit Item",
    status: "Draft",
    date: "2025-05-18",
    submittedBy: "Tim O'Hara"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "bg-green-100 text-green-800 border-green-200";
    case "In Progress": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
    case "Pending": return "bg-gray-100 text-gray-800 border-gray-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function RequestWizardTab({ onAddNewRequest, data, isReadOnly = false, isPartiallyEditable = false }: RequestWizardTabProps) {
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
          <div className="flex items-end justify-end">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <Select defaultValue="active">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Requests</SelectItem>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search requests" 
                className="pl-10"
              />
            </div>
            
            {!isReadOnly && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => onAddNewRequest?.("requests")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Requests
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
            {/* Initialing Documents Row - Only when partially editable (accepted status) */}
            {isPartiallyEditable && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Initialing Documents</h4>
                    <p className="text-sm text-blue-700">View documents uploaded during case creation</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-700 border-blue-300"
                    onClick={() => setShowDocumentModal(true)}
                  >
                    View Documents
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Group / Type</div>
                <div>Summary</div>
                <div>Status</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {mockRequests.map((request) => (
                <div key={request.id} className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{request.groupType}</div>
                        <div className="text-sm text-gray-600">{request.summary}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-900">
                      {request.summary}
                    </div>
                    
                    <div className="flex flex-col items-start space-y-1">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(request.status)} px-2 py-1 text-xs font-medium rounded`}
                      >
                        {request.status}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{request.submittedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {mockRequests.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-muted-foreground">No requests associated with this case yet</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 font-fluent"
                onClick={() => onAddNewRequest?.("requests")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create First Request
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <DocumentViewerModal 
        open={showDocumentModal}
        onOpenChange={setShowDocumentModal}
      />
    </div>
  );
}