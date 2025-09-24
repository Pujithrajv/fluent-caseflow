import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TaskDetail {
  id: string;
  title: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  status: 'Open' | 'In Progress' | 'Completed' | 'On Hold';
  assignedTo: string;
  dueDate: string;
  dueTime: string;
  description: string;
  linkedCase: {
    caseNumber: string;
    caseType: string;
    primaryParty: string;
    primaryPartyRole: string;
    secondaryParty?: string;
    secondaryPartyRole?: string;
    department: string;
  };
  relatedDocument: string;
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    uploadedBy: string;
    uploadedDate: string;
  }>;
  notes: string;
}

interface TaskContextType {
  tasks: TaskDetail[];
  getTaskById: (id: string) => TaskDetail | undefined;
  updateTask: (id: string, updates: Partial<TaskDetail>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock tasks data that matches the NewTaskView structure
const mockTasks: TaskDetail[] = [
  {
    id: '1',
    title: 'Complete Case Intake',
    priority: 'High Priority',
    status: 'Open',
    assignedTo: 'John Doe',
    dueDate: '2025-09-22',
    dueTime: '14:00',
    description: 'Review all submitted documents and case data for completeness and compliance. Ensure all required forms are properly filled out and supporting documentation is attached.',
    linkedCase: {
      caseNumber: 'DNR-OGRM-EU-CO-0426',
      caseType: 'Abandoned Well',
      primaryParty: 'North District Foods',
      primaryPartyRole: 'Complainant',
      secondaryParty: 'Metro Agricultural Corp',
      secondaryPartyRole: 'Respondent',
      department: 'Department of Natural Resources'
    },
    relatedDocument: 'Case Intake Forms',
    attachments: [
      {
        id: 'att-1',
        name: 'Intake_Forms.pdf',
        type: 'PDF',
        uploadedBy: 'John Doe',
        uploadedDate: '2025-09-20'
      }
    ],
    notes: 'Initial review started. All primary documents received.'
  },
  {
    id: '2',
    title: 'Complete Case Intake',
    priority: 'High Priority',
    status: 'In Progress',
    assignedTo: 'John Doe',
    dueDate: '2025-09-22',
    dueTime: '16:00',
    description: 'Review all submitted documents and case data for completeness and compliance. Ensure all required forms are properly filled out and supporting documentation is attached.',
    linkedCase: {
      caseNumber: 'DNR-OGRM-EU-CO-0426',
      caseType: 'Abandoned Well',
      primaryParty: 'North District Foods',
      primaryPartyRole: 'Complainant',
      secondaryParty: 'Metro Agricultural Corp',
      secondaryPartyRole: 'Respondent',
      department: 'Department of Natural Resources'
    },
    relatedDocument: 'Case Intake Forms',
    attachments: [
      {
        id: 'att-2',
        name: 'Updated_Forms.pdf',
        type: 'PDF',
        uploadedBy: 'John Doe',
        uploadedDate: '2025-09-21'
      }
    ],
    notes: 'In progress. Additional documentation requested from respondent.'
  },
  {
    id: '3',
    title: 'File Initial Complaint',
    priority: 'High Priority',
    status: 'Completed',
    assignedTo: 'Lisa Davis',
    dueDate: '2025-09-15',
    dueTime: '12:00',
    description: 'Initial complaint filed and all parties notified. Complete all necessary paperwork and ensure proper service of documents.',
    linkedCase: {
      caseNumber: 'DNR-OLC-GR-0430',
      caseType: 'License Revocation',
      primaryParty: 'State Environmental Agency',
      primaryPartyRole: 'Complainant',
      secondaryParty: 'Industrial Waste Corp',
      secondaryPartyRole: 'Respondent',
      department: 'Department of Natural Resources'
    },
    relatedDocument: 'Initial Complaint Filing',
    attachments: [
      {
        id: 'att-3',
        name: 'Complaint_Filed.pdf',
        type: 'PDF',
        uploadedBy: 'Lisa Davis',
        uploadedDate: '2025-09-15'
      }
    ],
    notes: 'Complaint successfully filed. All parties have been served.'
  }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskDetail[]>(mockTasks);

  const getTaskById = (id: string): TaskDetail | undefined => {
    return tasks.find(task => task.id === id);
  };

  const updateTask = (id: string, updates: Partial<TaskDetail>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, getTaskById, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};