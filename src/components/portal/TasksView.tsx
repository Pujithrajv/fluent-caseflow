import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, AlertTriangle, X, CheckCircle, Clock, Play } from "lucide-react";

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

interface TasksViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

// Mock data organized by task status
const mockTasksByStatus = {
  notStarted: [
    {
      id: '1',
      caseNumber: 'CASE-2024-001',
      caseType: 'Environmental Protection',
      title: 'Document review pending',
      primaryParty: 'Kirby Neroni',
      firstParty: { name: 'Kirby Neroni', attorney: 'John Smith' },
      secondParty: { name: 'State Agency', attorney: 'Jane Doe' },
      submittedDate: '9/7/2025',
      priority: 'High'
    },
    {
      id: '2',
      caseNumber: 'CASE-2024-002',
      caseType: 'Fire Protection',
      title: 'Initial assessment required',
      primaryParty: 'Martinez Construction',
      firstParty: { name: 'Martinez Construction', attorney: 'Elena Rodriguez' },
      secondParty: { name: 'Labor Department', attorney: 'James Wilson' },
      submittedDate: '9/15/2025',
      priority: 'Medium'
    }
  ],
  open: [
    {
      id: '3',
      caseNumber: 'CASE-2024-003',
      caseType: 'Labor Relations',
      title: 'Investigation opened',
      primaryParty: 'Johnson & Associates',
      firstParty: { name: 'Johnson & Associates', attorney: 'Michael Johnson' },
      secondParty: { name: 'Workers Union', attorney: 'Sarah Davis' },
      submittedDate: '9/10/2025',
      priority: 'High'
    },
    {
      id: '4',
      caseNumber: 'CASE-2024-004',
      caseType: 'Safety Compliance',
      title: 'Compliance review open',
      primaryParty: 'Tech Solutions Inc',
      firstParty: { name: 'Tech Solutions Inc', attorney: 'Robert Chen' },
      secondParty: { name: 'Safety Board', attorney: 'Lisa Martinez' },
      submittedDate: '9/12/2025',
      priority: 'Medium'
    }
  ],
  inProgress: [
    {
      id: '5',
      caseNumber: 'CASE-2024-005',
      caseType: 'Environmental Protection',
      title: 'Evidence collection in progress',
      primaryParty: 'Green Energy Corp',
      firstParty: { name: 'Green Energy Corp', attorney: 'David Wilson' },
      secondParty: { name: 'EPA', attorney: 'Jennifer Brown' },
      submittedDate: '9/8/2025',
      priority: 'High'
    }
  ],
  complete: [
    {
      id: '6',
      caseNumber: 'CASE-2024-006',
      caseType: 'Fire Protection',
      title: 'Case resolved successfully',
      primaryParty: 'Safety First LLC',
      firstParty: { name: 'Safety First LLC', attorney: 'Amanda Taylor' },
      secondParty: { name: 'Fire Department', attorney: 'Thomas Anderson' },
      submittedDate: '8/25/2025',
      priority: 'Low'
    },
    {
      id: '7',
      caseNumber: 'CASE-2024-007',
      caseType: 'Labor Relations',
      title: 'Settlement reached',
      primaryParty: 'Manufacturing Co',
      firstParty: { name: 'Manufacturing Co', attorney: 'Kevin Lee' },
      secondParty: { name: 'Labor Board', attorney: 'Rachel Green' },
      submittedDate: '8/30/2025',
      priority: 'Info'
    }
  ]
};

const columns = [
  {
    id: 'notStarted',
    title: 'Not Started',
    icon: Clock,
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-500'
  },
  {
    id: 'open',
    title: 'Open',
    icon: Play,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500'
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-500'
  },
  {
    id: 'complete',
    title: 'Complete',
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500'
  }
];

const getStatusBadgeColor = (columnId: string) => {
  switch (columnId) {
    case 'notStarted':
      return 'bg-gray-100 text-gray-800';
    case 'open':
      return 'bg-blue-100 text-blue-800';
    case 'inProgress':
      return 'bg-yellow-100 text-yellow-800';
    case 'complete':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TasksView: React.FC<TasksViewProps> = ({ tasks, onViewTask }) => {
  // Calculate total items across all columns
  const totalItems = Object.values(mockTasksByStatus).reduce((total, statusTasks) => total + statusTasks.length, 0);

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
          <div className="text-sm text-gray-500">
            {totalItems} total items
          </div>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {columns.map((column) => {
          const columnTasks = mockTasksByStatus[column.id as keyof typeof mockTasksByStatus] || [];
          const IconComponent = column.icon;
          
          return (
            <div key={column.id} className="flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center justify-between p-4 rounded-t-lg border-t border-l border-r ${column.borderColor} ${column.bgColor}`}>
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${column.iconColor}`} />
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                </div>
                <Badge variant="secondary" className={getStatusBadgeColor(column.id)}>
                  {columnTasks.length}
                </Badge>
              </div>

              {/* Column Content */}
              <div className={`flex-1 border-l border-r border-b ${column.borderColor} ${column.bgColor} rounded-b-lg overflow-y-auto`}>
                <div className="p-3 space-y-3">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <IconComponent className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <Card key={task.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Case Number and Type */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-primary">{task.caseNumber}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  task.priority === 'High' ? 'border-red-300 text-red-700 bg-red-50' :
                                  task.priority === 'Medium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                                  task.priority === 'Low' ? 'border-green-300 text-green-700 bg-green-50' :
                                  'border-blue-300 text-blue-700 bg-blue-50'
                                }`}
                              >
                                {task.priority}
                              </Badge>
                            </div>

                            {/* Case Type */}
                            <div className="text-sm font-medium text-gray-900">
                              {task.caseType}
                            </div>

                            {/* Title */}
                            <div className="text-sm text-gray-600">
                              {task.title}
                            </div>

                            {/* Parties */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <User className="h-3 w-3" />
                                <span>{task.firstParty.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <User className="h-3 w-3" />
                                <span>{task.secondParty.name}</span>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>Submitted: {task.submittedDate}</span>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 border-t border-gray-100">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs h-8"
                                onClick={() => onViewTask?.(task.id)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksView;