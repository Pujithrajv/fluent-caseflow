import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  CheckCircle,
  Clock,
  User,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { useTask, TaskDetail as TaskDetailType } from '@/contexts/TaskContext';

interface HistoryEntry {
  id: string;
  changedDate: string;
  changedBy: string;
  event: string;
  changedField: string;
  oldValue: string;
  newValue: string;
  isSystemGenerated: boolean;
}

const mockHistory: HistoryEntry[] = [
  {
    id: 'hist-1',
    changedDate: 'Sep 20, 2025 – 09:00 AM',
    changedBy: 'System',
    event: 'Task Created',
    changedField: 'Status',
    oldValue: '',
    newValue: 'Open',
    isSystemGenerated: true
  },
  {
    id: 'hist-2',
    changedDate: 'Sep 20, 2025 – 10:30 AM',
    changedBy: 'John Doe',
    event: 'Status Updated',
    changedField: 'Status',
    oldValue: 'Open',
    newValue: 'In Progress',
    isSystemGenerated: false
  },
  {
    id: 'hist-3',
    changedDate: 'Sep 20, 2025 – 02:15 PM',
    changedBy: 'Sarah Johnson',
    event: 'Priority Updated',
    changedField: 'Priority',
    oldValue: 'Medium Priority',
    newValue: 'High Priority',
    isSystemGenerated: false
  },
  {
    id: 'hist-4',
    changedDate: 'Sep 21, 2025 – 11:45 AM',
    changedBy: 'John Doe',
    event: 'Comment Added',
    changedField: 'Notes',
    oldValue: '',
    newValue: 'Added progress notes about document review',
    isSystemGenerated: false
  },
  {
    id: 'hist-5',
    changedDate: 'Sep 22, 2025 – 09:20 AM',
    changedBy: 'Sarah Johnson',
    event: 'Due Date Modified',
    changedField: 'Due Date',
    oldValue: 'Sep 24, 2025',
    newValue: 'Sep 25, 2025',
    isSystemGenerated: false
  }
];

// Mock task data that matches the detailed requirements
const mockTaskDetail: TaskDetailType = {
  id: '2',
  title: 'Complete Case Intake',
  assignedTo: 'John Doe',
  priority: 'High Priority',
  dueDate: '2025-09-22',
  dueTime: '09:00',
  status: 'In Progress',
  description: 'Review all submitted documents and case data for completeness and compliance. Ensure all required forms are properly filled out and supporting documentation is attached.',
  linkedCase: {
    caseNumber: 'DNR-OGRM-EU-CO-0426',
    caseType: 'Abandoned Well',
    department: 'Department of Natural Resources',
    primaryParty: 'North District Foods',
    primaryPartyRole: 'Applicant',
    secondaryParty: 'State Environmental Agency',
    secondaryPartyRole: 'Regulatory Body'
  },
  relatedDocument: 'Case File #DNR-OGRM-EU-CO-0426',
  attachments: [],
  notes: 'Initial case intake review in progress'
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high priority':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'medium priority':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'low priority':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'in progress':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'complete':
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export function TaskDetail() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { getTaskById, updateTask } = useTask();
  const [activeTab, setActiveTab] = useState('details');
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Use mock data for now, but fallback to context data if available
  const contextTask = getTaskById(taskId || '');
  const [taskDetail, setTaskDetail] = useState<TaskDetailType | null>(
    contextTask || {
      ...mockTaskDetail,
      id: taskId || '2'
    }
  );

  useEffect(() => {
    if (contextTask) {
      setTaskDetail(contextTask);
    }
  }, [contextTask]);

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

  const handleBackClick = () => {
    navigate('/portal');
  };

  const handleMarkComplete = () => {
    if (taskDetail) {
      const updatedTask = { ...taskDetail, status: 'Completed' as const };
      setTaskDetail(updatedTask);
      setIsCompleted(true);
      updateTask(taskDetail.id, { status: 'Completed' });
      
      // Show success animation for 2 seconds
      setTimeout(() => {
        setIsCompleted(false);
      }, 2000);
    }
  };

  const handleTaskUpdate = (field: keyof TaskDetailType, value: any) => {
    if (taskDetail) {
      const updatedTask = { ...taskDetail, [field]: value };
      setTaskDetail(updatedTask);
      updateTask(taskDetail.id, { [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mb-6 hover:bg-muted text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks & Alerts
        </Button>

        {/* Page Header with Case Information */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            {/* Header Title and Case Info */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground mb-2">Task Details</h1>
                <p className="text-muted-foreground">Manage and track task progress</p>
              </div>
              
              {/* Case Information Card */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 min-w-80">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-blue-900">
                    Case: {taskDetail.linkedCase.caseNumber}
                  </div>
                  <div className="text-sm text-blue-700">
                    {taskDetail.linkedCase.caseType}
                  </div>
                  <div className="text-sm text-blue-600">
                    {taskDetail.linkedCase.department}
                  </div>
                  <div className="text-sm text-blue-600">
                    {taskDetail.linkedCase.primaryParty}
                  </div>
                </div>
              </div>
            </div>

            {/* Task Summary Bar */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">Task: {taskDetail.id}</span>
                    <span className="text-sm text-muted-foreground">—</span>
                    <span className="text-sm font-medium text-foreground">{taskDetail.title}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline"
                    className={`text-xs font-medium px-3 py-1 rounded border ${getStatusColor(taskDetail.status)}`}
                  >
                    {taskDetail.status}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`text-xs font-medium px-3 py-1 rounded border ${getPriorityColor(taskDetail.priority)}`}
                  >
                    {taskDetail.priority}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="details">Task Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Task Details Tab */}
          <TabsContent value="details" className="space-y-6">
            {/* Task Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2 text-muted-foreground" />
                  Task Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="task-title" className="text-sm font-medium text-foreground">Task Title</Label>
                    <Input 
                      id="task-title"
                      value={taskDetail.title}
                      onChange={(e) => handleTaskUpdate('title', e.target.value)}
                      className="font-medium"
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assigned-to" className="text-sm font-medium text-foreground">Assigned To</Label>
                    <Input 
                      id="assigned-to"
                      value={taskDetail.assignedTo}
                      readOnly
                      className="bg-muted cursor-not-allowed text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="due-date" className="text-sm font-medium text-foreground">Due Date</Label>
                    <div className="relative">
                      <Input 
                        id="due-date"
                        type="date"
                        value={taskDetail.dueDate}
                        onChange={(e) => handleTaskUpdate('dueDate', e.target.value)}
                        className="pl-10"
                      />
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium text-foreground">Priority</Label>
                    <div className="relative">
                      <Input 
                        id="priority"
                        value={taskDetail.priority}
                        readOnly
                        className="bg-muted cursor-not-allowed text-muted-foreground pl-10"
                      />
                      <AlertTriangle className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
                  <Textarea 
                    id="description"
                    value={taskDetail.description}
                    onChange={(e) => handleTaskUpdate('description', e.target.value)}
                    rows={4}
                    placeholder="Enter task instructions or notes..."
                    className="resize-none"
                  />
                </div>
                
                {/* Last Updated Info */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last updated by {taskDetail.assignedTo} on {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                  Task History
                </CardTitle>
                <p className="text-sm text-muted-foreground">Complete audit trail of all task activities</p>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-muted-foreground font-medium">Changed Date</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Changed By</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Event</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Changed Field</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Old Value</TableHead>
                        <TableHead className="text-muted-foreground font-medium">New Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockHistory.map((entry, index) => (
                        <TableRow key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <TableCell className="font-medium text-sm">{entry.changedDate}</TableCell>
                          <TableCell className="text-sm">{entry.changedBy}</TableCell>
                          <TableCell className={`text-sm ${entry.isSystemGenerated ? 'italic text-muted-foreground' : 'font-medium text-foreground'}`}>
                            {entry.event}
                          </TableCell>
                          <TableCell className="text-sm">{entry.changedField}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{entry.oldValue || '—'}</TableCell>
                          <TableCell className="text-sm font-medium">{entry.newValue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination Footer */}
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <div>
                    Showing 1 - {mockHistory.length} of {mockHistory.length} entries
                  </div>
                  <div className="text-xs">
                    Page 1 of 1
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sticky Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="mx-auto max-w-7xl px-6">
            <Button 
              onClick={handleMarkComplete} 
              className={`w-full transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-600 hover:bg-green-600 text-white' 
                  : 'bg-primary hover:bg-primary-hover text-primary-foreground'
              }`}
              disabled={taskDetail.status === 'Completed'}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Task Completed!
                </>
              ) : taskDetail.status === 'Completed' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Task Already Completed
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom padding to account for sticky footer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}