import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Trash2, Edit } from "lucide-react";

interface InvolvedPartiesTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const mockParties = [
  {
    id: 1,
    party: "John Doe",
    jobTitle: "Senior Analyst",
    participationGroup: "Stakeholder",
    type: "Individual",
    description: "Primary stakeholder for environmental review"
  },
  {
    id: 2,
    party: "Environmental Consulting LLC",
    jobTitle: "Lead Consultant",
    participationGroup: "Third Party",
    type: "Organization",
    description: "Technical consulting services"
  }
];

export function InvolvedPartiesTab({ onDataChange, data }: InvolvedPartiesTabProps) {
  return (
    <div className="space-y-6">
      {/* Expedited Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-fluent text-muted-foreground">Expedited</p>
          <Badge variant="secondary">No</Badge>
        </div>
      </div>
      
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 font-fluent">
              <Users className="h-5 w-5 text-primary" />
              <span>Involved Parties</span>
            </CardTitle>
            <Button size="sm" className="font-fluent">
              <Plus className="mr-2 h-4 w-4" />
              Create Related Party
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Participation Group
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium font-fluent text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {mockParties.map((party) => (
                  <tr key={party.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium font-fluent text-foreground">{party.party}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">{party.jobTitle}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="font-fluent">
                        {party.participationGroup}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-foreground">{party.type}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-fluent text-muted-foreground">{party.description}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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
          
          {mockParties.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-fluent text-muted-foreground">No involved parties added yet</p>
              <Button variant="outline" size="sm" className="mt-4 font-fluent">
                <Plus className="mr-2 h-4 w-4" />
                Add First Party
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}