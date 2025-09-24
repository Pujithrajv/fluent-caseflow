import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  FileText, 
  Building, 
  User, 
  Clock, 
  Paperclip, 
  ExternalLink,
  CheckCircle,
  RotateCcw,
  ArrowLeft,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId?: string;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ 
  open, 
  onOpenChange,
  taskId 
}) => {
  const [taskTitle, setTaskTitle] = useState('Send copy of Motion Order to Respondent');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('Open');
  const [assignedTo, setAssignedTo] = useState('John Doe');
  const [dueDate, setDueDate] = useState<Date>(new Date('2025-09-22'));
  const [description, setDescription] = useState('Send a copy of the Motion Order to the respondent party as required by administrative procedure. Ensure all parties are properly notified and delivery confirmation is obtained.');
  const [notes, setNotes] = useState('');
  const [sharepointUrl, setSharepointUrl] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Header Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Task Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input
                    id="task-title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assigned-to">Assigned To</Label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High Priority</SelectItem>
                      <SelectItem value="Medium">Medium Priority</SelectItem>
                      <SelectItem value="Low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={getPriorityColor(priority)}>
                    {priority} Priority
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="w-5 h-5" />
                Task Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Enter task description..."
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Linked Case</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">DBE-2025-004</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Case Type:</span>
                    <span className="text-sm font-medium">Licensing Violation</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Primary Party: <strong>North District Foods</strong> (Respondent)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Secondary Party: <strong>Department of Public Health</strong> (Complainant)</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Related Request/Document</h4>
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-blue-800">Motion to Compel Discovery</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Attachments</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drop files here or <Button variant="link" className="p-0 h-auto">browse files</Button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Supports PDF, Word, and image files</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes/Comments</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add progress updates or notes..."
                />
              </div>
            </CardContent>
          </Card>

          {/* References & Actions Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                References & Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sharepoint-url">SharePoint / Document URL</Label>
                <Input
                  id="sharepoint-url"
                  value={sharepointUrl}
                  onChange={(e) => setSharepointUrl(e.target.value)}
                  placeholder="Enter external document link..."
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Related Events</h4>
                <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Administrative Hearing - September 19, 2025 at 1:00 PM
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks & Alerts
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Add Document
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reassign Task
            </Button>
            <Button className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};