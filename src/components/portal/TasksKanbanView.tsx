import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";

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

interface TasksKanbanViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const getStatusFromTitle = (title: string): string => {
  if (title.includes('Created') || title.includes('New')) return 'submitted';
  if (title.includes('Accepted')) return 'accepted';
  if (title.includes('Correction') || title.includes('Returned')) return 'correction';
  if (title.includes('Rejected')) return 'rejected';
  return 'submitted';
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'Alert':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'High Priority':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <Clock className="h-4 w-4 text-blue-600" />;
  }
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

export function TasksKanbanView({ tasks, onViewTask }: TasksKanbanViewProps) {
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = getStatusFromTitle(task.title);
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - Kanban Board</h2>
        <p className="text-sm text-muted-foreground">{tasks.length} total items</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((column) => {
          const IconComponent = column.icon;
          const columnTasks = tasksByStatus[column.id] || [];
          
          return (
            <div key={column.id} className="space-y-3">
              {/* Column Header */}
              <div className={`rounded-lg p-3 ${column.headerColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                  </div>
                  <Badge variant="outline" className="bg-white/70 text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              {/* Column Content */}
              <div className="space-y-3 min-h-[200px]">
                {columnTasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`hover:shadow-md transition-all duration-200 cursor-pointer border-2 ${column.color}`}
                    onClick={() => onViewTask?.(task.id)}
                  >
                    <CardContent className="p-4">
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs font-mono">
                          {task.caseNumber}
                        </Badge>
                        {getPriorityIcon(task.priority)}
                      </div>

                      {/* Task Title */}
                      <h4 className="font-medium text-sm text-foreground mb-2 line-clamp-2">
                        {task.title}
                      </h4>

                      {/* Task Description */}
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      {/* Primary Party */}
                      <div className="flex items-center space-x-2 mb-3">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-foreground font-medium truncate">
                          {task.primaryParty}
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-1 ${task.priorityClass}`}
                        >
                          {task.priority}
                        </Badge>
                        
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {columnTasks.length === 0 && (
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