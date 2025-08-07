import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Trash2, Edit, Search, Eye, HelpCircle } from "lucide-react";

interface InvolvedPartiesTabProps {
  onDataChange: (data: any) => void;
  data: any;
}

const mockParties = [
  {
    id: 1,
    party: "Kirby Neroni\nChief Counsel\nDepartment General Counsel",
    contact: "P. 630-308-4387\nE. kirby.neroni@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 2,
    party: "Batsheva English\nExecutive Assistant\nDepartment Representative",
    contact: "P. 217-786-3028\nE. batsheva.english@il.gov",
    organization: "Board of Higher Education\nSpringfield, IL"
  },
  {
    id: 3,
    party: "Aafjes-Soriano\nPrinciple\nAppellee",
    contact: "",
    organization: "Sunny Day Schools\nSt. Charles, IL"
  },
  {
    id: 4,
    party: "Abbey Higgins\nAttorney at Law\nParty Counsel",
    contact: "P. 480-796-1707\nE. abbey.higgins@royce.com",
    organization: "Royce Partners, LLC\nChicago, IL"
  }
];

export function InvolvedPartiesTab({ onDataChange, data }: InvolvedPartiesTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-fluent-8">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground mb-1">
                Involved Parties
              </CardTitle>
              <p className="text-sm text-muted-foreground">Associated parties</p>
            </div>
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <Select defaultValue="active">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Parties</SelectItem>
                <SelectItem value="all">All Parties</SelectItem>
                <SelectItem value="stakeholder">Stakeholders</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search parties" 
                className="pl-10"
              />
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Related Party
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div>Party</div>
                <div>Contact</div>
                <div>Organization</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {mockParties.map((party) => (
                <div key={party.id} className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="flex items-start space-x-3">
                      <Eye className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.party}</div>
                    </div>
                    
                    <div className="text-sm text-gray-900 whitespace-pre-line">
                      {party.contact || "—"}
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 whitespace-pre-line">{party.organization}</div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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