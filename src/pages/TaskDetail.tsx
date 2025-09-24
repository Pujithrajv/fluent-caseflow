import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  FileText, 
  Building, 
  User, 
  Calendar, 
  Clock,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { useTask, TaskDetail as TaskDetailType } from '@/contexts/TaskContext';

interface HistoryEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

const mockHistory: HistoryEntry[] = [
  {
    id: 'hist-1',
    action: 'Task Created',
    user: 'System',
    timestamp: '2025-09-20 09:00 AM',
    details: 'Task automatically generated from case workflow'
  },
  {
    id: 'hist-2',
    action: 'Status Updated',
    user: 'John Doe',
    timestamp: '2025-09-20 10:30 AM',
    details: 'Changed from Open to In Progress'
  },
  {
    id: 'hist-3',
    action: 'Priority Updated',
    user: 'Sarah Johnson',
    timestamp: '2025-09-20 02:15 PM',
    details: 'Changed from Medium Priority to High Priority'
  },
  {
    id: 'hist-4',
    action: 'Comment Added',
    user: 'John Doe',
    timestamp: '2025-09-21 11:45 AM',
    details: 'Added progress notes about document review'
  },
  {
    id: 'hist-5',
    action: 'Due Date Modified',
    user: 'Sarah Johnson',
    timestamp: '2025-09-22 09:20 AM',
    details: 'Extended due date from Sep 24 to Sep 25 due to respondent delay'
  }
];

export function TaskDetail() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { getTaskById, updateTask } = useTask();
  const [activeTab, setActiveTab] = useState('details');
  
  // Get task data from context
  const task = getTaskById(taskId || '');
  const [taskDetail, setTaskDetail] = useState<TaskDetailType | null>(task || null);

  useEffect(() => {
    if (task) {
      setTaskDetail(task);
    }
  }, [task]);

  // Redirect if task not found
  if (!taskDetail) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Task Not Found</h1>
            <Button onClick={() => navigate('/portal')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High Priority':
        return 'bg-orange-500 text-white';
      case 'Medium Priority':
        return 'bg-yellow-500 text-white';
      case 'Low Priority':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleBackClick = () => {
    navigate('/portal');
  };

  const handleMarkComplete = () => {
    if (taskDetail) {
      const updatedTask = { ...taskDetail, status: 'Completed' as const };
      setTaskDetail(updatedTask);
      updateTask(taskDetail.id, { status: 'Completed' });
    }
  };

  const handleReassignTask = () => {
    // Open reassignment modal/dialog
    console.log('Reassign task');
  };

  const handleTaskUpdate = (field: keyof TaskDetailType, value: any) => {
    if (taskDetail) {
      const updatedTask = { ...taskDetail, [field]: value };
      setTaskDetail(updatedTask);
      updateTask(taskDetail.id, { [field]: value });
    }
  };

  const getDaysLeft = () => {
    const today = new Date();
    const dueDate = new Date(taskDetail.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks & Alerts
        </Button>

        {/* Page Title */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Task Details</h1>
            <p className="text-muted-foreground">Manage and track task progress</p>
          </div>
          
          {/* Case and Task Information - Top Right */}
          <div className="flex gap-8">
            {/* Case Information */}
            <div className="text-right relative">
              <div className="text-sm font-medium text-foreground">
                Case: {taskDetail.linkedCase.caseNumber}
              </div>
              <div className="text-sm text-muted-foreground">
                {taskDetail.linkedCase.caseType}
              </div>
              <div className="text-sm text-muted-foreground">
                {taskDetail.linkedCase.department}
              </div>
              <div className="text-sm text-muted-foreground">
                {taskDetail.linkedCase.primaryParty}
              </div>
              {/* Blue line with 1cm gap */}
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-blue-500"></div>
            </div>
            
            {/* Task Information */}
            <div className="text-right relative">
              <div className="text-sm font-medium text-foreground">
                Task: {taskDetail.id}
              </div>
              <div className="text-sm text-muted-foreground">
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                  {taskDetail.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {taskDetail.title}
              </div>
              {/* Blue line with 1cm gap */}
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-blue-500"></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="details">Task Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Task Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Task Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input 
                      id="task-title"
                      value={taskDetail.title}
                      onChange={(e) => handleTaskUpdate('title', e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assigned-to">Assigned To</Label>
                    <Select value={taskDetail.assignedTo} onValueChange={(value) => handleTaskUpdate('assignedTo', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                        <SelectItem value="Lisa Davis">Lisa Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Body Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={taskDetail.description}
                    onChange={(e) => handleTaskUpdate('description', e.target.value)}
                    rows={4}
                    placeholder="Enter task instructions or notes..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Button onClick={handleMarkComplete} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                  <Button variant="outline" onClick={handleReassignTask} className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reassign Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Task History</CardTitle>
                <p className="text-sm text-muted-foreground">Complete audit trail of all task activities</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHistory.map((entry, index) => (
                    <div key={entry.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{entry.action}</h4>
                          <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          by <strong>{entry.user}</strong>
                        </p>
                        {entry.details && (
                          <p className="text-sm text-muted-foreground italic">{entry.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}