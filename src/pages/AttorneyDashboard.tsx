import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, Shield, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CaseItem {
  id: string;
  name: string;
  caseNumber?: string;
  caseType: string;
  department: string;
  primaryPartyName: string;
  primaryPartyType: string;
  status: "accepted";
  stage: string;
  lastActionDate: string;
  assignedAttorney?: string;
}

const mockAcceptedCases: CaseItem[] = [
  {
    id: "DBE-2024-001-EC",
    name: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    caseNumber: "DBE-2024-001-EC",
    caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture",
    primaryPartyName: "Kirby Neroni",
    primaryPartyType: "Respondent",
    status: "accepted",
    stage: "Pre-Hearing",
    lastActionDate: "2025-08-11",
    assignedAttorney: "Greg Miles",
  }
];

const AttorneyDashboard = () => {
  const navigate = useNavigate();
  const [cases] = useState<CaseItem[]>(mockAcceptedCases);

  const handleViewCase = (caseId: string) => {
    navigate(`/attorney/case/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      {/* Header */}
      <div className="w-full bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" 
                alt="Illinois Bureau of Administrative Hearings" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Attorney Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage accepted cases
          </p>
        </div>

        {/* Cases Table */}
        <Card className="shadow-fluent-8">
          <CardHeader>
            <CardTitle className="font-fluent">Accepted Cases</CardTitle>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No accepted cases</h3>
                <p className="text-muted-foreground">You don't have any accepted cases yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Number</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Primary Party</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Action</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">
                        {caseItem.caseNumber || caseItem.id}
                      </TableCell>
                      <TableCell>{caseItem.caseType}</TableCell>
                      <TableCell>{caseItem.department}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{caseItem.primaryPartyName}</div>
                          <div className="text-sm text-muted-foreground">{caseItem.primaryPartyType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{caseItem.stage}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={caseItem.status} />
                      </TableCell>
                      <TableCell>{caseItem.lastActionDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCase(caseItem.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttorneyDashboard;