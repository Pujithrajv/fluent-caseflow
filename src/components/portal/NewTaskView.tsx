import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, User, Calendar, FileText, Info } from 'lucide-react';

interface DashboardTask {
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

interface NewTaskViewProps {
  tasks: DashboardTask[];
  onViewTask: (taskId: string) => void;
}

export const NewTaskView: React.FC<NewTaskViewProps> = ({ tasks, onViewTask }) => {
  const navigate = useNavigate();
  // Mock data for the kanban columns with proper status distribution
  const mockKanbanTasks = [
    {
      id: '1',
      title: 'Complete Case Intake',
      priority: 'High Priority',
      caseNumber: 'DNR-OGRM-EU-CO-0426: Abandoned Well',
      department: 'Department of Natural Resources',
      assignedTo: 'John Doe',
      dueDate: 'September 22, 2025',
      description: 'Review all submitted documents and case data for completeness and compliance.',
      status: 'new' as const
    },
    {
      id: '2',
      title: 'Complete Case Intake',
      priority: 'High Priority',
      caseNumber: 'DNR-OGRM-EU-CO-0426: Abandoned Well',
      department: 'Department of Natural Resources',
      assignedTo: 'John Doe',
      dueDate: 'September 22, 2025',
      description: 'Review all submitted documents and case data for completeness and compliance.',
      status: 'in-progress' as const
    },
    {
      id: '4',
      title: 'Order of Motion is finalized for Request: Appeal-Appeal - Motions - Motion to Compel Discovery',
      priority: 'High Priority',
      caseNumber: 'DNR-OGRM-EU-CO-0426: Abandoned Well',
      department: 'Department of Natural Resources',
      assignedTo: 'John Doe',
      dueDate: 'September 23, 2025',
      description: 'Order of Motion is generated for Request: Appeal-Appeal - Motions - Motion to Compel Discovery\n\nPlease go to the portal and sign the document.',
      status: 'in-progress' as const
    },
    {
      id: '3',
      title: 'File Initial Complaint',
      priority: 'High Priority',
      caseNumber: 'DNR-OLC-GR-0430: License Revocation',
      department: 'Department of Natural Resources',
      completedBy: 'Lisa Davis',
      completedDate: 'September 15, 2025',
      description: 'Initial complaint filed and all parties notified',
      status: 'complete' as const
    }
  ];

  const newTasks = mockKanbanTasks.filter(task => task.status === 'new');
  const inProgressTasks = mockKanbanTasks.filter(task => task.status === 'in-progress');
  const completeTasks = mockKanbanTasks.filter(task => task.status === 'complete');

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

  const handleOpenTask = (taskId: string) => {
    navigate(`/task-detail/${taskId}`);
  };

  const TaskCard = ({ task }: { task: typeof mockKanbanTasks[0] }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <Badge className={`${getPriorityColor(task.priority)} text-xs px-2 py-1`}>
            {task.priority}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            <span>{task.caseNumber}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{task.department}</span>
          </div>
          
          {task.assignedTo && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}
          
          {task.completedBy && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>Completed by: {task.completedBy}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Due: {task.dueDate}</span>
            </div>
          )}
          
          {task.completedDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Completed: {task.completedDate}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-start text-sm text-gray-600 mb-4">
          <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span>{task.description}</span>
        </div>
        
        {task.status === 'complete' ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Open Case
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handleOpenTask(task.id)}
            >
              <span className="mr-2">≡</span>
              Open Task
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Open Case
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handleOpenTask(task.id)}
            >
              <span className="mr-2">≡</span>
              Open Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const Column = ({ title, count, tasks, headerColor }: { 
    title: string; 
    count: number; 
    tasks: typeof mockKanbanTasks; 
    headerColor: string;
  }) => (
    <div className="flex-1">
      <div className={`${headerColor} text-white p-4 flex items-center justify-between mb-4`}>
        <h2 className="font-semibold text-lg">{title}</h2>
        <Badge variant="secondary" className="bg-white/20 text-white border-0">
          {count}
        </Badge>
      </div>
      <div className="px-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex gap-6 max-w-7xl mx-auto">
        <Column 
          title="New" 
          count={newTasks.length} 
          tasks={newTasks} 
          headerColor="bg-gray-600"
        />
        <Column 
          title="In-Progress" 
          count={inProgressTasks.length} 
          tasks={inProgressTasks} 
          headerColor="bg-blue-600"
        />
        <Column 
          title="Complete" 
          count={completeTasks.length} 
          tasks={completeTasks} 
          headerColor="bg-green-600"
        />
      </div>
    </div>
  );
};