import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, User, Shield, Car } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CaseItem {
  id: string;
  name: string;
  description: string;
  caseNumber?: string;
  department: string;
  section: string;
  firstParty: string;
  secondParty: string;
  secondPartyType: string;
  represented?: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Returned";
  stage: string;
  icon: "shield" | "car" | "file";
}

const mockCases: CaseItem[] = [
  {
    id: "CASE-2024-001",
    name: "DBE Certification Appeal for Eki Carver",
    description: "Good Faith Effort Appeals",
    department: "Department of Transportation",
    section: "DBE Certification Section",
    firstParty: "Petitionaire",
    secondParty: "Eki Carver",
    secondPartyType: "Litigant",
    represented: "Todd Litgard, Attorney at Law",
    status: "Draft",
    stage: "Intake",
    icon: "shield"
  },
  {
    id: "CASE-2024-002", 
    name: "FOID Card Denial for Abigayle Low",
    description: "Card Denial",
    caseNumber: "DNR-GA-FRR-SL-2025-00001",
    department: "Department of State Police",
    section: "Firearms Owners Identification Card",
    firstParty: "Petitionaire",
    secondParty: "Abigayle Low",
    secondPartyType: "Respondant",
    status: "Submitted",
    stage: "Pending Case Acceptance",
    icon: "car"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved": return "bg-success text-success-foreground";
    case "Under Review": return "bg-warning text-warning-foreground";
    case "Submitted": return "bg-success text-success-foreground";
    case "Draft": return "bg-destructive text-destructive-foreground";
    case "Returned": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getCaseIcon = (iconType: string) => {
  switch (iconType) {
    case "shield": return Shield;
    case "car": return Car;
    default: return FileText;
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
        <div className="flex items-center justify-between">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter cases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Cases Table */}
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Case
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Dept/Bureau
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Participant/Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockCases.map((caseItem) => {
                  const IconComponent = getCaseIcon(caseItem.icon);
                  return (
                    <tr key={caseItem.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-primary hover:underline cursor-pointer">
                              {caseItem.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                            {caseItem.caseNumber && (
                              <p className="text-xs text-muted-foreground">
                                Case #: {caseItem.caseNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{caseItem.department}</p>
                          <p className="text-sm text-muted-foreground">{caseItem.section}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">First Party:</span> {caseItem.firstParty}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{caseItem.secondParty}</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Second Party:</span> {caseItem.secondPartyType}
                          </p>
                          {caseItem.represented && (
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Represented:</span> {caseItem.represented}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <Badge className={getStatusColor(caseItem.status)} variant="secondary">
                            {caseItem.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {caseItem.status === "Draft" ? "Pending Submission" : caseItem.stage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Stage:</span> {caseItem.stage}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}