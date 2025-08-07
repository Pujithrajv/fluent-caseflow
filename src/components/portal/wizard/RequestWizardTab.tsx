import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, FileText, Calendar, User, ChevronDown } from "lucide-react";

interface RequestWizardTabProps {
  onDataChange: (data: any) => void;
  data: any;
  onAddNewRequest?: (type: string) => void;
}

const mockRequests = [
  {
    id: 1,
    request: "Environmental Impact Assessment",
    submittedBy: "John Smith",
    status: "In Progress",
    date: "2024-01-15"
  },
  {
    id: 2,
    request: "Document Review Request",
    submittedBy: "Sarah Johnson",
    status: "Completed",
    date: "2024-01-12"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "bg-success text-success-foreground";
    case "In Progress": return "bg-warning text-warning-foreground";
    case "Pending": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function RequestWizardTab({ onDataChange, data, onAddNewRequest }: RequestWizardTabProps) {
  return (
    <div className="space-y-6">
      <Badge variant="destructive" className="px-4 py-1 text-xs font-fluent">
        Expedited
      </Badge>
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <FileText className="h-5 w-5 text-primary" />
              <span>Associated Requests</span>
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="font-fluent">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => onAddNewRequest?.("motion")}>
                  Motion
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddNewRequest?.("exhibit")}>
                  Exhibit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddNewRequest?.("discovery")}>
                  Discovery
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddNewRequest?.("certificates")}>
                  Certificates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddNewRequest?.("documents")}>
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddNewRequest?.("notices")}>
                  Notices
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {mockRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium font-fluent text-foreground">{request.request}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-fluent text-foreground">{request.submittedBy}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-fluent text-foreground">{request.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm" className="font-fluent">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {mockRequests.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-muted-foreground">No requests associated with this case yet</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-4 font-fluent">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Request
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-[200px]">
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("motion")}>
                    Motion
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("exhibit")}>
                    Exhibit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("discovery")}>
                    Discovery
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("certificates")}>
                    Certificates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("documents")}>
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddNewRequest?.("notices")}>
                    Notices
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}