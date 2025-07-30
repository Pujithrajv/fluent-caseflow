import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, FileText, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CaseItem {
  id: string;
  name: string;
  caseType: string;
  dateSubmitted: string;
  party: string;
  status: "Submitted" | "Under Review" | "Approved" | "Returned";
}

const mockCases: CaseItem[] = [
  {
    id: "CASE-2024-001",
    name: "Environmental Impact Assessment",
    caseType: "Environmental",
    dateSubmitted: "2024-01-15",
    party: "City Planning Department",
    status: "Under Review"
  },
  {
    id: "CASE-2024-002", 
    name: "Public Records Request",
    caseType: "FOIA",
    dateSubmitted: "2024-01-14",
    party: "Citizens Coalition",
    status: "Approved"
  },
  {
    id: "CASE-2024-003",
    name: "Zoning Variance Application",
    caseType: "Zoning",
    dateSubmitted: "2024-01-12",
    party: "Metro Development Corp",
    status: "Submitted"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved": return "bg-success text-success-foreground";
    case "Under Review": return "bg-warning text-warning-foreground";
    case "Returned": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

interface DashboardProps {
  onCreateCase: () => void;
}

export function Dashboard({ onCreateCase }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/a8ff40e4-1efe-4d80-9072-5c480ab49fa9.png" 
              alt="Illinois Bureau of Administrative Hearings" 
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-3xl font-semibold font-fluent text-foreground">Power Portal</h1>
              <p className="text-muted-foreground font-fluent">Case Management System</p>
            </div>
          </div>
          <Button size="lg" className="font-fluent" onClick={onCreateCase}>
            <Plus className="mr-2 h-5 w-5" />
            Create New Case
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-fluent-8">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search cases by name, ID, or party..."
                  className="pl-10 border-input-border font-fluent"
                />
              </div>
              <Button variant="fluent" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card className="shadow-fluent-16">
          <CardHeader>
            <CardTitle className="font-fluent font-semibold">All Cases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Case Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Date Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Party
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockCases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium font-fluent text-foreground">{caseItem.name}</p>
                            <p className="text-sm text-muted-foreground font-fluent">{caseItem.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-fluent text-foreground">{caseItem.caseType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-fluent text-foreground">{caseItem.dateSubmitted}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-fluent text-foreground">{caseItem.party}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(caseItem.status)}>
                          {caseItem.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="font-fluent">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}