import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, AlertTriangle, Clock, User } from "lucide-react";

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
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'Alert':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'High Priority':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    default:
      return <Clock className="h-4 w-4 text-blue-600" />;
  }
};

const getPriorityBorderColor = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return 'border-l-red-500';
    case 'Alert':
      return 'border-l-orange-500';
    case 'High Priority':
      return 'border-l-yellow-500';
    default:
      return 'border-l-blue-500';
  }
};

export function TasksPlannerView({ tasks, onViewTask }: TasksPlannerViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - Planner View</h2>
        <p className="text-sm text-muted-foreground">{tasks.length} total items</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card 
            key={task.id} 
            className={`hover:shadow-md transition-shadow duration-200 border-l-4 ${getPriorityBorderColor(task.priority)} bg-white`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(task.priority)}
                  <CardTitle className="text-sm font-semibold text-foreground line-clamp-2">
                    {task.title}
                  </CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewTask?.(task.id)}
                  className="p-1 h-auto"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Case Number */}
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {task.caseNumber}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>

              {/* Primary Party */}
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{task.primaryParty}</span>
              </div>

              {/* Priority & Due Date */}
              <div className="space-y-2">
                <Badge variant="outline" className={`text-xs font-medium px-2.5 py-1 rounded-full ${task.priorityClass}`}>
                  {task.priority}
                </Badge>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => onViewTask?.(task.id)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}