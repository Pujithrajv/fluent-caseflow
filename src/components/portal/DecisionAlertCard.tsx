import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, User, Calendar, Gavel, FileText } from 'lucide-react';

interface DecisionAlertCardProps {
  id: string;
  caseNumber: string;
  caseType: string;
  department: string;
  assignedTo: string;
  decisionDate: string;
  description: string;
  onViewDetails: () => void;
  onOpenCase: () => void;
}

export const DecisionAlertCard: React.FC<DecisionAlertCardProps> = ({
  caseNumber,
  caseType,
  department,
  assignedTo,
  decisionDate,
  description,
  onViewDetails,
  onOpenCase,
}) => {
  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500 bg-blue-50/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900">Final Decision Issued</h3>
          </div>
          <Badge className="bg-blue-600 text-white text-xs px-2 py-1 hover:bg-blue-700">
            Decision Finalized
          </Badge>
        </div>
        
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">
            {caseNumber}: {caseType}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            ALJ has reached a final ruling and issued the Final Decision Report.
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <div className="space-y-2 mb-4 border-t pt-3">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{department}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>Case Manager: {assignedTo}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Decision Date: {decisionDate}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onOpenCase}
          >
            <FileText className="w-4 h-4 mr-2" />
            Open Case
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            View Decision Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
