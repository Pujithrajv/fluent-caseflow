import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, CheckCircle, AlertTriangle, Play } from "lucide-react";

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

interface Tasks2ViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

// Mock data organized by status
const mockTasksByStatus = {
  "open": [
    {
      id: '2',
      caseNumber: 'ENV-2024-005',
      caseType: 'Environmental Protection',
      title: 'Compliance check in progress',
      primaryParty: 'Green Valley Corp',
      firstParty: { name: 'Green Valley Corp', attorney: 'Michael Thompson' },
      secondParty: { name: 'Environmental Agency', attorney: 'Rachel Green' },
      startedDate: '9/20/2025',
      priority: 'High'
    },
    {
      id: '6',
      caseNumber: 'TAX-2024-012',
      caseType: 'FOID Appeals',
      title: 'Tax assessment review',
      primaryParty: 'Metro Retail Group',
      firstParty: { name: 'Metro Retail Group', attorney: 'Jennifer Adams' },
      secondParty: { name: 'Tax Authority', attorney: 'Mark Stevens' },
      startedDate: '9/18/2025',
      priority: 'Medium'
    }
  ],
  "inprogress": [
    {
      id: '3',
      caseNumber: 'DBE-2024-001-EC',
      caseType: 'Grain Dealer and Warehouse License',
      title: 'License verification underway',
      primaryParty: 'North District Foods',
      firstParty: { name: 'North District Foods', attorney: 'Robert Lee' },
      secondParty: { name: 'Health Department', attorney: 'Lisa Chen' },
      startedDate: '9/17/2025',
      priority: 'High'
    },
    {
      id: '7',
      caseNumber: 'REG-2024-008',
      caseType: 'Gift Ban Act',
      title: 'Regulatory compliance review',
      primaryParty: 'Coastal Industries',
      firstParty: { name: 'Coastal Industries', attorney: 'Patricia Moore' },
      secondParty: { name: 'Regulatory Commission', attorney: 'Thomas Clark' },
      startedDate: '8/15/2025',
      priority: 'Critical'
    }
  ],
  "complete": [
    {
      id: '4',
      caseNumber: 'ABD-2024-001-EC',
      caseType: 'Grant Recovery',
      title: 'Final review completed',
      primaryParty: 'Valley Grain Solutions',
      firstParty: { name: 'Valley Grain Solutions', attorney: 'David Kim' },
      secondParty: { name: 'Agricultural Board', attorney: 'Maria Garcia' },
      startedDate: '8/24/2025',
      completedDate: '9/15/2025',
      priority: 'Normal'
    },
    {
      id: '8',
      caseNumber: 'INS-2024-004',
      caseType: 'Good Faith Effort Appeals',
      title: 'Appeal processing completed',
      primaryParty: 'Alpine Insurance Co',
      firstParty: { name: 'Alpine Insurance Co', attorney: 'Richard Davis' },
      secondParty: { name: 'Insurance Board', attorney: 'Susan Miller' },
      startedDate: '7/30/2025',
      completedDate: '8/15/2025',
      priority: 'Normal'
    }
  ]
};

const columns = [
  {
    id: 'open',
    title: 'Open',
    icon: Play,
    headerColor: 'bg-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    icon: AlertTriangle,
    headerColor: 'bg-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'complete',
    title: 'Complete',
    icon: CheckCircle,
    headerColor: 'bg-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

const getStatusBadgeColor = (columnId: string) => {
  switch (columnId) {
    case 'open':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'inprogress':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'complete':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'normal':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export function Tasks2View({ tasks, onViewTask }: Tasks2ViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks2 - Status Workflow</h2>
        <p className="text-sm text-muted-foreground">
          {Object.values(mockTasksByStatus).flat().length} total tasks
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const IconComponent = column.icon;
          const columnTasks = mockTasksByStatus[column.id as keyof typeof mockTasksByStatus] || [];
          
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
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              {/* Column Content */}
              <div className="space-y-4 min-h-[500px]">
                {columnTasks.map((task: any) => (
                  <Card 
                    key={task.id} 
                    className={`hover:shadow-lg transition-shadow duration-200 ${column.bgColor} ${column.borderColor} border-l-4 shadow-sm`}
                  >
                    <CardContent className="p-4 space-y-4">
                      {/* Task Header */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-foreground">
                          {task.caseNumber} – {task.caseType}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {task.title}
                        </p>
                      </div>

                      {/* Parties Information */}
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">First Party: {task.firstParty.name}</span>
                            <span className="text-muted-foreground ml-2">(Atty: {task.firstParty.attorney})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Second Party: {task.secondParty.name}</span>
                            <span className="text-muted-foreground ml-2">(Atty: {task.secondParty.attorney})</span>
                          </div>
                        </div>
                      </div>

                      {/* Dates and Details */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {task.createdDate && (
                            <span className="text-muted-foreground">Created: {task.createdDate}</span>
                          )}
                          {task.startedDate && (
                            <span className="text-muted-foreground">Started: {task.startedDate}</span>
                          )}
                          {task.completedDate && (
                            <>
                              <span className="text-muted-foreground">│ ✅ Completed: {task.completedDate}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Priority and Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline"
                            className={`text-xs font-medium px-3 py-1 rounded border ${getStatusBadgeColor(column.id)}`}
                          >
                            {column.title}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`text-xs font-medium px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs px-3 py-1 hover:bg-gray-100"
                          onClick={() => onViewTask?.(task.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks</p>
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