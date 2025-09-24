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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle
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
}

const mockHistory: HistoryEntry[] = [
  {
    id: 'hist-1',
    changedDate: '2025-09-20 09:00 AM',
    changedBy: 'System',
    event: 'Task Created',
    changedField: 'Status',
    oldValue: '',
    newValue: 'Open'
  },
  {
    id: 'hist-2',
    changedDate: '2025-09-20 10:30 AM',
    changedBy: 'John Doe',
    event: 'Status Updated',
    changedField: 'Status',
    oldValue: 'Open',
    newValue: 'In Progress'
  },
  {
    id: 'hist-3',
    changedDate: '2025-09-20 02:15 PM',
    changedBy: 'Sarah Johnson',
    event: 'Priority Updated',
    changedField: 'Priority',
    oldValue: 'Medium Priority',
    newValue: 'High Priority'
  },
  {
    id: 'hist-4',
    changedDate: '2025-09-21 11:45 AM',
    changedBy: 'John Doe',
    event: 'Comment Added',
    changedField: 'Notes',
    oldValue: '',
    newValue: 'Added progress notes about document review'
  },
  {
    id: 'hist-5',
    changedDate: '2025-09-22 09:20 AM',
    changedBy: 'Sarah Johnson',
    event: 'Due Date Modified',
    changedField: 'Due Date',
    oldValue: 'Sep 24, 2025',
    newValue: 'Sep 25, 2025'
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
                <Button onClick={handleMarkComplete} className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Complete
                </Button>
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
                {/* Table Header */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-muted-foreground font-medium">Changed Date</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Changed By</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Event</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Changed Field</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Old Value</TableHead>
                        <TableHead className="text-muted-foreground font-medium">New Value</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockHistory.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.changedDate}</TableCell>
                          <TableCell>{entry.changedBy}</TableCell>
                          <TableCell>{entry.event}</TableCell>
                          <TableCell>{entry.changedField}</TableCell>
                          <TableCell className="text-muted-foreground">{entry.oldValue || '-'}</TableCell>
                          <TableCell>{entry.newValue}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination Footer */}
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <span>1 - 5 of 5</span>
                    <Button variant="ghost" size="sm" disabled>
                      <ArrowLeft className="w-4 h-4 transform rotate-180" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      ⏮
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      ⏪
                    </Button>
                    <span>Page 1</span>
                    <Button variant="ghost" size="sm" disabled>
                      ⏩
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      ⏭
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}