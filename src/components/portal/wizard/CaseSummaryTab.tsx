import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DepartmentTab } from "./DepartmentTab";
import { PrimaryPartyTab } from "./PrimaryPartyTab";
import { CaseDetailsTab } from "./CaseDetailsTab";
import { CaseQuestionsTab } from "./CaseQuestionsTab";

interface CaseSummaryTabProps {
  data: any;
  onDataChange: (data: any) => void;
  onEditTab?: (tabId: string) => void;
  isReadOnly?: boolean;
  isSeededCase?: boolean;
}

export function CaseSummaryTab({ 
  data, 
  onDataChange, 
  onEditTab, 
  isReadOnly = true,
  isSeededCase = false 
}: CaseSummaryTabProps) {
  
  const handleEditClick = (tabId: string) => {
    if (onEditTab) {
      onEditTab(tabId);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Department Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold">Department</CardTitle>
              <p className="text-muted-foreground font-fluent">Agency structure and personnel</p>
            </div>
            {onEditTab && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditClick('department')}
                className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
              >
                <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <DepartmentTab 
            onDataChange={onDataChange} 
            data={data} 
            isReadOnly={true}
            isPartiallyEditable={false}
            isSeededCase={isSeededCase}
          />
        </CardContent>
      </Card>

      {/* Primary Party Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold">Primary Party</CardTitle>
              <p className="text-muted-foreground font-fluent">Party information</p>
            </div>
            {onEditTab && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditClick('primary-party')}
                className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
              >
                <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <PrimaryPartyTab 
            onDataChange={onDataChange} 
            data={data}
            isReadOnly={true}
            isSeededCase={isSeededCase}
          />
        </CardContent>
      </Card>

      {/* Case Details Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold">Case Details</CardTitle>
              <p className="text-muted-foreground font-fluent">Case name and details</p>
            </div>
            {onEditTab && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditClick('case-details')}
                className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
              >
                <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CaseDetailsTab 
            onDataChange={onDataChange} 
            data={data}
            isReadOnly={true}
            isSeededCase={isSeededCase}
          />
        </CardContent>
      </Card>

      {/* Abandon Well Questions Section */}
      <Card className="shadow-fluent-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-fluent font-semibold">Abandon Well Questions</CardTitle>
              <p className="text-muted-foreground font-fluent">Case type specific questions</p>
            </div>
            {onEditTab && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditClick('case-questions')}
                className="hover:bg-muted/80 focus:bg-muted/80 transition-colors"
              >
                <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CaseQuestionsTab 
            onDataChange={onDataChange} 
            data={data}
            isReadOnly={true}
            isSeededCase={isSeededCase}
          />
        </CardContent>
      </Card>
    </div>
  );
}