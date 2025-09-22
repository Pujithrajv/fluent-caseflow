import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, AlertTriangle, X, CheckCircle, Clock } from "lucide-react";

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

interface TasksNewApproach2ViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

// Mock data organized by status
const mockCasesByStatus = {
  submitted: [
    {
      id: '1',
      caseNumber: 'CASE-2024-001',
      title: 'New case successfully created',
      primaryParty: 'Kirby Neroni',
      firstParty: { name: 'Kirby Neroni', attorney: 'John Smith' },
      secondParty: { name: 'State Agency', attorney: 'Jane Doe' },
      submittedDate: '9/7/2025',
      priority: 'Info'
    },
    {
      id: '5',
      caseNumber: 'CASE-2024-003',
      title: 'New case successfully created',
      primaryParty: 'Martinez Construction',
      firstParty: { name: 'Martinez Construction', attorney: 'Elena Rodriguez' },
      secondParty: { name: 'Labor Department', attorney: 'James Wilson' },
      submittedDate: '9/22/2025',
      priority: 'Info'
    },
    {
      id: '6',
      caseNumber: 'ENV-2024-005',
      title: 'New case successfully created',
      primaryParty: 'Green Valley Corp',
      firstParty: { name: 'Green Valley Corp', attorney: 'Michael Thompson' },
      secondParty: { name: 'Environmental Agency', attorney: 'Rachel Green' },
      submittedDate: '9/20/2025',
      priority: 'Info'
    },
    {
      id: '7',
      caseNumber: 'TAX-2024-012',
      title: 'New case successfully created',
      primaryParty: 'Metro Retail Group',
      firstParty: { name: 'Metro Retail Group', attorney: 'Jennifer Adams' },
      secondParty: { name: 'Tax Authority', attorney: 'Mark Stevens' },
      submittedDate: '9/18/2025',
      priority: 'Info'
    }
  ],
  accepted: [
    {
      id: '3',
      caseNumber: 'DBE-2024-001-EC',
      title: 'Case Accepted – Case Number generated.',
      primaryParty: 'North District Foods',
      firstParty: { name: 'North District Foods', attorney: 'Robert Lee' },
      secondParty: { name: 'Health Department', attorney: 'Lisa Chen' },
      submittedDate: '9/17/2025',
      acceptedDate: '9/19/2025',
      decisionDate: '9/25/2025',
      priority: 'Accepted'
    },
    {
      id: '8',
      caseNumber: 'REG-2024-008',
      title: 'Case Accepted – Ready for hearing scheduling.',
      primaryParty: 'Coastal Industries',
      firstParty: { name: 'Coastal Industries', attorney: 'Patricia Moore' },
      secondParty: { name: 'Regulatory Commission', attorney: 'Thomas Clark' },
      submittedDate: '8/15/2025',
      acceptedDate: '8/20/2025',
      decisionDate: '10/5/2025',
      priority: 'Accepted'
    }
  ],
  correction: [
    {
      id: '2',
      caseNumber: 'CASE-2024-002',
      title: 'Correction required – Missing/incorrect info.',
      primaryParty: 'Sniders Group',
      firstParty: { name: 'Sniders Group', attorney: 'Mike Johnson' },
      secondParty: { name: 'Regulatory Board', attorney: 'Sarah Wilson' },
      submittedDate: '10/4/2024',
      decisionDate: '12/6/2024',
      correctionDue: '11/14/2024',
      reason: 'Missing Exhibit Document',
      priority: 'High'
    }
  ],
  rejected: [
    {
      id: '4',
      caseNumber: 'ABD-2024-001-EC',
      title: 'Rejected – ALJ Review.',
      primaryParty: 'Valley Grain Solutions',
      firstParty: { name: 'Valley Grain Solutions', attorney: 'David Kim' },
      secondParty: { name: 'Agricultural Board', attorney: 'Maria Garcia' },
      submittedDate: '8/24/2025',
      rejectedDate: '9/15/2025',
      type: 'Hard Reject (ALJ Review)',
      reason: 'Insufficient documentation provided',
      appealDue: '11/14/2025',
      priority: 'Critical'
    },
    {
      id: '9',
      caseNumber: 'INS-2024-004',
      title: 'Case Rejected – Insufficient documentation.',
      primaryParty: 'Alpine Insurance Co',
      firstParty: { name: 'Alpine Insurance Co', attorney: 'Richard Davis' },
      secondParty: { name: 'Insurance Board', attorney: 'Susan Miller' },
      submittedDate: '7/30/2025',
      rejectedDate: '8/15/2025',
      type: 'Soft Reject (Clerk)',
      reason: 'Incomplete application form',
      appealDue: '8/25/2025',
      priority: 'Alert'
    },
    {
      id: '10',
      caseNumber: 'FIN-2024-015',
      title: 'Case Rejected – Jurisdictional issues.',
      primaryParty: 'Pacific Financial',
      firstParty: { name: 'Pacific Financial', attorney: 'Amanda White' },
      secondParty: { name: 'Financial Authority', attorney: 'Kevin Brown' },
      submittedDate: '8/5/2025',
      rejectedDate: '8/20/2025',
      type: 'Hard Reject (ALJ Review)',
      reason: 'Jurisdictional issues identified',
      appealDue: '9/1/2025',
      priority: 'Alert'
    }
  ]
};

const columns = [
  {
    id: 'submitted',
    title: 'Submitted',
    icon: Clock,
    headerColor: 'bg-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'accepted',
    title: 'Accepted',
    icon: CheckCircle,
    headerColor: 'bg-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'correction',
    title: 'Correction Required',
    icon: AlertTriangle,
    headerColor: 'bg-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'rejected',
    title: 'Rejected',
    icon: X,
    headerColor: 'bg-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
];

const getStatusBadgeColor = (columnId: string) => {
  switch (columnId) {
    case 'submitted':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'accepted':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'correction':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export function TasksNewApproach2View({ tasks, onViewTask }: TasksNewApproach2ViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - New Approach 2</h2>
        <p className="text-sm text-muted-foreground">
          {Object.values(mockCasesByStatus).flat().length} total items
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((column) => {
          const IconComponent = column.icon;
          const columnCases = mockCasesByStatus[column.id as keyof typeof mockCasesByStatus] || [];
          
          return (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className={`${column.headerColor} text-white rounded-lg p-4 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                  </div>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                    {columnCases.length}
                  </Badge>
                </div>
              </div>

              {/* Column Content */}
              <div className="space-y-4 min-h-[500px]">
                {columnCases.map((caseItem: any) => (
                  <Card 
                    key={caseItem.id} 
                    className={`hover:shadow-lg transition-shadow duration-200 ${column.bgColor} ${column.borderColor} border-l-4 shadow-sm`}
                  >
                    <CardContent className="p-4 space-y-4">
                      {/* Case Header */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-foreground">
                          {caseItem.caseNumber} – {caseItem.primaryParty}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {caseItem.title}
                        </p>
                      </div>

                      {/* Parties Information */}
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">First Party: {caseItem.firstParty.name}</span>
                            <span className="text-muted-foreground ml-2">(Atty: {caseItem.firstParty.attorney})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Second Party: {caseItem.secondParty.name}</span>
                            <span className="text-muted-foreground ml-2">(Atty: {caseItem.secondParty.attorney})</span>
                          </div>
                        </div>
                      </div>

                      {/* Dates and Details */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Submitted: {caseItem.submittedDate}</span>
                          
                          {caseItem.acceptedDate && (
                            <>
                              <span className="text-muted-foreground">│ ✅ Accepted: {caseItem.acceptedDate}</span>
                            </>
                          )}
                          
                          {caseItem.decisionDate && (
                            <>
                              <span className="text-muted-foreground">│ ⚖️ Decision: {caseItem.decisionDate}</span>
                            </>
                          )}
                          
                          {caseItem.rejectedDate && (
                            <>
                              <span className="text-muted-foreground">│ ❌ Rejected: {caseItem.rejectedDate}</span>
                            </>
                          )}
                        </div>

                        {/* Correction/Rejection specific details */}
                        {caseItem.correctionDue && (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm font-medium">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              <span className="text-orange-700">Correction Due: {caseItem.correctionDue}</span>
                            </div>
                            {caseItem.reason && (
                              <p className="text-sm text-muted-foreground ml-6">
                                Reason: {caseItem.reason}
                              </p>
                            )}
                          </div>
                        )}

                        {caseItem.type && column.id === 'rejected' && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              Type: {caseItem.type}
                            </p>
                            {caseItem.reason && (
                              <p className="text-sm text-muted-foreground">
                                Reason: {caseItem.reason}
                              </p>
                            )}
                            {caseItem.appealDue && (
                              <p className="text-sm font-medium text-red-700">
                                Appeal Due: {caseItem.appealDue}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <Badge 
                          variant="outline"
                          className={`text-xs font-medium px-3 py-1 rounded border ${getStatusBadgeColor(column.id)}`}
                        >
                          {column.title}
                        </Badge>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs px-3 py-1 hover:bg-gray-100"
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