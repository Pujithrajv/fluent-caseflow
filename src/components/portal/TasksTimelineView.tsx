import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User, AlertTriangle, Clock, CheckCircle, XCircle, FileText } from "lucide-react";

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

interface TasksTimelineViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  // For demo purposes, generate a time based on task ID
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const getEventIcon = (title: string) => {
  if (title.includes('Created') || title.includes('New')) return Clock;
  if (title.includes('Accepted')) return CheckCircle;
  if (title.includes('Correction') || title.includes('Returned')) return AlertTriangle;
  if (title.includes('Rejected')) return XCircle;
  return FileText;
};

const getEventColor = (title: string) => {
  if (title.includes('Created') || title.includes('New')) return 'bg-blue-500';
  if (title.includes('Accepted')) return 'bg-green-500';
  if (title.includes('Correction') || title.includes('Returned')) return 'bg-orange-500';
  if (title.includes('Rejected')) return 'bg-red-500';
  return 'bg-gray-500';
};

export function TasksTimelineView({ tasks, onViewTask }: TasksTimelineViewProps) {
  // Sort tasks by due date for chronological order
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Group tasks by date, then by case number within each date
  const tasksByDateAndCase = sortedTasks.reduce((acc, task) => {
    const dateKey = formatDate(task.dueDate);
    if (!acc[dateKey]) acc[dateKey] = {};
    if (!acc[dateKey][task.caseNumber]) acc[dateKey][task.caseNumber] = [];
    acc[dateKey][task.caseNumber].push(task);
    return acc;
  }, {} as Record<string, Record<string, Task[]>>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks & Alerts - Timeline View</h2>
        <p className="text-sm text-muted-foreground">{tasks.length} items scheduled</p>
      </div>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-8">
          {Object.entries(tasksByDateAndCase).map(([date, caseTasks], dateIndex) => {
            const totalTasksForDate = Object.values(caseTasks).flat().length;
            
            return (
              <div key={date} className="relative">
                {/* Date Header */}
                <div className="flex items-center mb-6">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary rounded-full border-4 border-white shadow-md">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-foreground">{date}</h3>
                    <p className="text-sm text-muted-foreground">{totalTasksForDate} events</p>
                  </div>
                </div>

                {/* Cases for this date */}
                <div className="ml-24 space-y-6">
                  {Object.entries(caseTasks).map(([caseNumber, caseTaskList]) => (
                    <div key={caseNumber} className="space-y-4">
                      {/* Case Number Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <h4 className="text-md font-semibold text-foreground">Case: {caseNumber}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {caseTaskList.length} events
                        </Badge>
                      </div>
                      
                      {/* Tasks for this case */}
                      <div className="ml-6 space-y-3">
                        {caseTaskList.map((task, taskIndex) => {
                          const IconComponent = getEventIcon(task.title);
                          const eventColor = getEventColor(task.title);
                          
                          return (
                            <div key={task.id} className="relative">
                              {/* Timeline dot for task */}
                              <div className={`absolute -left-8 top-4 w-3 h-3 rounded-full ${eventColor} border-2 border-white shadow-sm`}></div>
                              
                              <Card className="hover:shadow-md transition-shadow duration-200 bg-white ml-2">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      {/* Time and Icon */}
                                      <div className="flex items-center space-x-3 mb-2">
                                        <div className={`p-2 rounded-lg ${eventColor} bg-opacity-10`}>
                                          <IconComponent className={`h-4 w-4 ${eventColor.replace('bg-', 'text-')}`} />
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {formatTime(task.dueDate)}
                                        </div>
                                      </div>

                                      {/* Task Title and Description */}
                                      <div className="mb-3">
                                        <h5 className="font-semibold text-foreground mb-1">{task.title}</h5>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {task.description}
                                        </p>
                                      </div>

                                      {/* Primary Party and Priority */}
                                      <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                          <User className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm font-medium">{task.primaryParty}</span>
                                        </div>
                                        
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs ${task.priorityClass}`}
                                        >
                                          {task.priority}
                                        </Badge>
                                      </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => onViewTask?.(task.id)}
                                      className="ml-4"
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}