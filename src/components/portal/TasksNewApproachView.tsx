import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Users, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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

interface TasksNewApproachViewProps {
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
    case 'Info':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
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

const getStatusFromTitle = (title: string): string => {
  if (title.includes('Created') || title.includes('New')) return 'submitted';
  if (title.includes('Accepted')) return 'accepted';
  if (title.includes('Correction') || title.includes('Returned') || title.includes('returned')) return 'correction';
  if (title.includes('Rejected')) return 'rejected';
  return 'submitted';
};

const getCaseType = (caseNumber: string): string => {
  if (caseNumber === 'CASE-2024-002') return 'environmental protection';
  if (caseNumber.startsWith('DBE-')) return 'grain dealer and warehouse license';
  if (caseNumber.startsWith('ABD-')) return 'Animal Welfare';
  if (caseNumber.startsWith('ENV-')) return 'bond forfeiture';
  if (caseNumber.startsWith('TAX-')) return 'card denial';
  if (caseNumber.startsWith('REG-')) return 'card revocation';
  if (caseNumber.startsWith('INS-')) return 'coal notice of violation';
  if (caseNumber.startsWith('FIN-')) return 'denial of certification appeals';
  return 'grain dealer and warehouse license';
};

const columns = [
  {
    id: 'submitted',
    title: 'Submitted',
    icon: Clock,
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'bg-blue-100 text-blue-900'
  },
  {
    id: 'accepted',
    title: 'Accepted',
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200',
    headerColor: 'bg-green-100 text-green-900'
  },
  {
    id: 'correction',
    title: 'Correction Required',
    icon: AlertTriangle,
    color: 'bg-orange-50 border-orange-200',
    headerColor: 'bg-orange-100 text-orange-900'
  },
  {
    id: 'rejected',
    title: 'Rejected',
    icon: XCircle,
    color: 'bg-red-50 border-red-200',
    headerColor: 'bg-red-100 text-red-900'
  }
];

// Mock data to match the planner view reference design
const mockCases = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    title: 'New case successfully created and saved to records.',
    primaryParty: 'Kirby Neroni',
    description: 'New case successfully created and saved to records.',
    complainant: { name: 'Kirby Neroni', attorney: 'John Smith' },
    defendant: { name: 'State Agency', attorney: 'Jane Doe' },
    submittedDate: '9/7/2025',
    priority: 'Info',
    status: 'Active'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    title: 'Case returned for correction – missing/incorrect information or documents.',
    primaryParty: 'Sniders Group',
    description: 'Case returned for correction – missing/incorrect information or documents.',
    complainant: { name: 'Sniders Group', attorney: 'Mike Johnson' },
    defendant: { name: 'Regulatory Board', attorney: 'Sarah Wilson' },
    submittedDate: '10/4/2024',
    priority: 'High',
    status: 'Correction Required'
  },
  {
    id: '3',
    caseNumber: 'DBE-2024-001-EC',
    title: 'Case Accepted – Case Number generated.',
    primaryParty: 'North District Foods',
    description: 'Case Accepted – Case Number generated.',
    complainant: { name: 'North District Foods', attorney: 'Robert Lee' },
    defendant: { name: 'Health Department', attorney: 'Lisa Chen' },
    submittedDate: '9/17/2025',
    acceptedDate: '9/19/2025',
    priority: 'Normal',
    status: 'Accepted'
  },
  {
    id: '4',
    caseNumber: 'ABD-2024-001-EC',
    title: 'Case Rejected – ALJ after checklist review.',
    primaryParty: 'Valley Grain Solutions',
    description: 'Case Rejected – ALJ after checklist review.',
    complainant: { name: 'Valley Grain Solutions', attorney: 'David Kim' },
    defendant: { name: 'Agricultural Board', attorney: 'Maria Garcia' },
    submittedDate: '8/24/2025',
    appealDue: '9/15/2025',
    priority: 'Critical',
    status: 'Rejected'
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-003',
    title: 'New employment discrimination case submitted.',
    primaryParty: 'Martinez Construction',
    description: 'New employment discrimination case submitted for initial review.',
    complainant: { name: 'Martinez Construction', attorney: 'Elena Rodriguez' },
    defendant: { name: 'Labor Department', attorney: 'James Wilson' },
    submittedDate: '9/22/2025',
    priority: 'Normal',
    status: 'Active'
  },
  {
    id: '6',
    caseNumber: 'ENV-2024-005',
    title: 'Environmental compliance case created.',
    primaryParty: 'Green Valley Corp',
    description: 'Environmental compliance case created and awaiting initial processing.',
    complainant: { name: 'Green Valley Corp', attorney: 'Michael Thompson' },
    defendant: { name: 'Environmental Agency', attorney: 'Rachel Green' },
    submittedDate: '9/20/2025',
    priority: 'High',
    status: 'Active'
  },
  {
    id: '7',
    caseNumber: 'TAX-2024-012',
    title: 'New tax dispute case filed.',
    primaryParty: 'Metro Retail Group',
    description: 'New tax dispute case filed and pending initial assessment.',
    complainant: { name: 'Metro Retail Group', attorney: 'Jennifer Adams' },
    defendant: { name: 'Tax Authority', attorney: 'Mark Stevens' },
    submittedDate: '9/18/2025',
    priority: 'Normal',
    status: 'Active'
  },
  {
    id: '8',
    caseNumber: 'REG-2024-008',
    title: 'Case Accepted – Ready for hearing scheduling.',
    primaryParty: 'Coastal Industries',
    description: 'Case Accepted – Ready for hearing scheduling and discovery phase.',
    complainant: { name: 'Coastal Industries', attorney: 'Patricia Moore' },
    defendant: { name: 'Regulatory Commission', attorney: 'Thomas Clark' },
    submittedDate: '8/15/2025',
    acceptedDate: '8/20/2025',
    priority: 'High',
    status: 'Accepted'
  },
  {
    id: '9',
    caseNumber: 'INS-2024-004',
    title: 'Case Rejected – Insufficient documentation provided.',
    primaryParty: 'Alpine Insurance Co',
    description: 'Case Rejected – Insufficient documentation provided for regulatory review.',
    complainant: { name: 'Alpine Insurance Co', attorney: 'Richard Davis' },
    defendant: { name: 'Insurance Board', attorney: 'Susan Miller' },
    submittedDate: '7/30/2025',
    appealDue: '8/25/2025',
    priority: 'Normal',
    status: 'Rejected'
  },
  {
    id: '10',
    caseNumber: 'FIN-2024-015',
    title: 'Case Rejected – Jurisdictional issues identified.',
    primaryParty: 'Pacific Financial',
    description: 'Case Rejected – Jurisdictional issues identified during preliminary review.',
    complainant: { name: 'Pacific Financial', attorney: 'Amanda White' },
    defendant: { name: 'Financial Authority', attorney: 'Kevin Brown' },
    submittedDate: '8/5/2025',
    appealDue: '9/1/2025',
    priority: 'Alert',
    status: 'Rejected'
  }
];

export function TasksNewApproachView({ tasks, onViewTask }: TasksNewApproachViewProps) {
  // Use mock data and organize by status
  const casesByStatus = mockCases.reduce((acc, caseItem) => {
    const status = getStatusFromTitle(caseItem.title);
    if (!acc[status]) acc[status] = [];
    acc[status].push(caseItem);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - New Approach</h2>
        <p className="text-sm text-muted-foreground">{mockCases.length} total items</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((column) => {
          const IconComponent = column.icon;
          const columnCases = casesByStatus[column.id] || [];
          
          return (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className={`rounded-lg p-3 ${column.headerColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                  </div>
                  <Badge variant="outline" className="bg-white/70 text-xs">
                    {columnCases.length}
                  </Badge>
                </div>
              </div>

              {/* Column Content with Planner View Cards */}
              <div className="space-y-4 min-h-[400px]">
                {columnCases.map((caseItem) => (
                  <Card 
                    key={caseItem.id} 
                    className={`hover:shadow-lg transition-shadow duration-200 border-l-4 ${getBorderColor(caseItem.priority)} ${column.color}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {caseItem.caseNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            {getCaseType(caseItem.caseNumber)}
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

                {columnCases.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No items</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}