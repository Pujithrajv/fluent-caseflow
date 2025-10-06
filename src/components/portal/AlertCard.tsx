import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, User, Calendar, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AlertCardProps {
  id: string;
  caseNumber: string;
  caseType: string;
  department: string;
  assignedTo: string;
  rejectionDate: string;
  description: string;
  onViewDetails: () => void;
  onOpenCase: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  caseNumber,
  caseType,
  department,
  assignedTo,
  rejectionDate,
  description,
  onViewDetails,
  onOpenCase,
}) => {
  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-red-500 bg-red-50/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to view correction details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="font-semibold text-gray-900">Case Returned for Correction</h3>
          </div>
          <Badge className="bg-yellow-500 text-white text-xs px-2 py-1 hover:bg-yellow-600">
            Action Required
          </Badge>
        </div>
        
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">
            {caseNumber}: {caseType}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{department}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>Assigned to: {assignedTo}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Rejected: {rejectionDate}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            View Alert Details
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onOpenCase}
          >
            Open Case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
