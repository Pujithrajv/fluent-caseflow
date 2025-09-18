import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Users } from "lucide-react";

interface Task {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  primaryParty: string;
  priority: string;
  dueDate: string;
  priorityClass: string;
  type: string;
}

interface TasksPlannerViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
};

const getPriorityBadgeStyle = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Alert':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'High Priority':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'High':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Normal':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-blue-600 text-white';
    case 'correction required':
      return 'bg-orange-600 text-white';
    case 'accepted':
      return 'bg-green-600 text-white';
    case 'rejected':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const getBorderColor = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return 'border-l-red-500';
    case 'Alert':
    case 'High Priority':
    case 'High':
      return 'border-l-orange-500';
    case 'Normal':
      return 'border-l-green-500';
    default:
      return 'border-l-blue-500';
  }
};

// Mock data to match the reference design
const mockCases = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    primaryParty: 'Kirby Neroni',
    description: 'New case successfully created and saved to records.',
    complainant: { name: 'Kirby Neroni', attorney: 'John Smith' },
    defendant: { name: 'State Agency', attorney: 'Jane Doe' },
    submittedDate: '9/7/2025',
    acceptedDate: '9/9/2025',
    decisionDate: '9/15/2025',
    priority: 'Info',
    status: 'Active',
    assignee: 'JD'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    primaryParty: 'Sniders Group',
    description: 'Case returned for correction – missing/incorrect information or documents.',
    complainant: { name: 'Sniders Group', attorney: 'Mike Johnson' },
    defendant: { name: 'Regulatory Board', attorney: 'Sarah Wilson' },
    submittedDate: '10/4/2024',
    decisionDate: '12/26/2024',
    appealDue: '11/14/2024',
    priority: 'High',
    status: 'Correction Required',
    assignee: 'SW'
  },
  {
    id: '3',
    caseNumber: 'DBE-2024-001-EC',
    primaryParty: 'North District Foods',
    description: 'Case Accepted – Case Number generated.',
    complainant: { name: 'North District Foods', attorney: 'Robert Lee' },
    defendant: { name: 'Health Department', attorney: 'Lisa Chen' },
    submittedDate: '9/17/2025',
    acceptedDate: '9/19/2025',
    decisionDate: '9/25/2025',
    priority: 'Normal',
    status: 'Accepted',
    assignee: 'LC'
  },
  {
    id: '4',
    caseNumber: 'ABD-2024-001-EC',
    primaryParty: 'Valley Grain Solutions',
    description: 'Case Rejected – ALJ after checklist review.',
    complainant: { name: 'Valley Grain Solutions', attorney: 'David Kim' },
    defendant: { name: 'Agricultural Board', attorney: 'Maria Garcia' },
    submittedDate: '8/24/2025',
    appealDue: '9/15/2025',
    priority: 'Critical',
    status: 'Rejected',
    assignee: 'MG'
  }
];

export function TasksPlannerView({ tasks, onViewTask }: TasksPlannerViewProps) {
  // Use mock data for now to match the reference design
  const casesToDisplay = mockCases;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - Planner View</h2>
        <p className="text-sm text-muted-foreground">{casesToDisplay.length} total items</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {casesToDisplay.map((caseItem) => (
          <Card 
            key={caseItem.id} 
            className={`hover:shadow-lg transition-shadow duration-200 border-l-4 ${getBorderColor(caseItem.priority)} bg-white`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {caseItem.caseNumber}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {caseItem.primaryParty}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs font-medium px-2.5 py-1 rounded ${getPriorityBadgeStyle(caseItem.priority)}`}
                >
                  {caseItem.priority}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-foreground leading-relaxed">
                {caseItem.description}
              </p>

              {/* Parties Information */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">First Party: {caseItem.complainant.name}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">Atty: {caseItem.complainant.attorney}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">Second Party: {caseItem.defendant.name}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">Atty: {caseItem.defendant.attorney}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Submitted: {caseItem.submittedDate}</span>
                </div>
                
                {caseItem.acceptedDate && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Accepted: {caseItem.acceptedDate}</span>
                  </div>
                )}
                
                {caseItem.decisionDate && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Decision: {caseItem.decisionDate}</span>
                  </div>
                )}
                
                {caseItem.appealDue && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Appeal Due: {caseItem.appealDue}</span>
                  </div>
                )}
              </div>

              {/* Bottom Section - Status and Actions */}
              <div className="flex items-center justify-between pt-2">
                <Badge 
                  className={`text-xs font-medium px-3 py-1.5 rounded ${getStatusBadgeStyle(caseItem.status)}`}
                >
                  {caseItem.status}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-800 text-white hover:bg-gray-700 border-gray-800 flex-shrink-0"
                  onClick={() => onViewTask?.(caseItem.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}