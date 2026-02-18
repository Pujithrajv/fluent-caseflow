import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
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
  { id: 'hist-1', changedDate: '2025-09-20 09:00 AM', changedBy: 'System', event: 'Task Created', changedField: 'Status', oldValue: '', newValue: 'Open' },
  { id: 'hist-2', changedDate: '2025-09-20 10:30 AM', changedBy: 'John Doe', event: 'Status Updated', changedField: 'Status', oldValue: 'Open', newValue: 'In Progress' },
  { id: 'hist-5', changedDate: '2025-09-22 09:20 AM', changedBy: 'John Doe', event: 'Due Date Modified', changedField: 'Due Date', oldValue: 'Sep 24, 2025', newValue: 'Sep 25, 2025' }
];

export function TaskDetail() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { getTaskById, updateTask } = useTask();
  const [activeTab, setActiveTab] = useState('details');
  const task = getTaskById(taskId || '');
  const [taskDetail, setTaskDetail] = useState<TaskDetailType | null>(task || null);

  useEffect(() => { if (task) setTaskDetail(task); }, [task]);

  if (!taskDetail) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="container py-5 text-center">
          <h1 className="h4 fw-semibold mb-3">Task Not Found</h1>
          <button className="btn btn-primary" onClick={() => navigate('/portal')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

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
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <div className="container py-4" style={{ maxWidth: '1140px' }}>
        <button className="btn btn-link text-decoration-none mb-4 p-0" onClick={() => navigate('/portal')}>
          <i className="bi bi-arrow-left me-1"></i> Back to Tasks & Alerts
        </button>

        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h4 fw-semibold">Task Details</h1>
            <p className="text-muted small">Manage and track task progress</p>
          </div>
          <div className="d-flex gap-4 text-end">
            <div className="border-end border-primary border-3 pe-3">
              <div className="small fw-medium">Case: {taskDetail.linkedCase.caseNumber}</div>
              <div className="small text-muted">{taskDetail.linkedCase.caseType}</div>
              <div className="small text-muted">{taskDetail.linkedCase.department}</div>
              <div className="small text-muted">{taskDetail.linkedCase.primaryParty}</div>
            </div>
            <div className="border-end border-primary border-3 pe-3">
              <div className="small fw-medium">Task: {taskDetail.id}</div>
              <div><span className="badge bg-warning text-dark">{taskDetail.status}</span></div>
              <div className="small text-muted">{taskDetail.title}</div>
            </div>
          </div>
        </div>

        {/* Tabs + Open Case */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <ul className="nav nav-tabs mb-0">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Task Details</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</button>
            </li>
          </ul>
          <button className="btn btn-primary"><i className="bi bi-file-earmark-text me-1"></i> Open Case</button>
        </div>

        {activeTab === 'details' && (
          <div className="d-flex flex-column gap-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white"><h6 className="fw-semibold mb-0">Task Information</h6></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small">Task Title</label>
                    <input className="form-control" value={taskDetail.title} onChange={(e) => handleTaskUpdate('title', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Assigned To</label>
                    <input className="form-control bg-light" value={taskDetail.assignedTo} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Due Date</label>
                    <input className="form-control" type="date" value={taskDetail.dueDate} onChange={(e) => handleTaskUpdate('dueDate', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Priority</label>
                    <input className="form-control bg-light" value={taskDetail.priority} readOnly />
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-header bg-white"><h6 className="fw-semibold mb-0">Task Details</h6></div>
              <div className="card-body">
                <label className="form-label small">Description</label>
                <textarea className="form-control" rows={4} value={taskDetail.description} onChange={(e) => handleTaskUpdate('description', e.target.value)} />
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <button className="btn btn-primary w-100" onClick={handleMarkComplete}>
                  <i className="bi bi-check-circle me-1"></i> Mark as Complete
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white">
              <h6 className="fw-semibold mb-0">Task History</h6>
              <small className="text-muted">Complete audit trail of all task activities</small>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="small">Changed Date</th>
                      <th className="small">Changed By</th>
                      <th className="small">Event</th>
                      <th className="small">Changed Field</th>
                      <th className="small">Old Value</th>
                      <th className="small">New Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockHistory.map((entry) => (
                      <tr key={entry.id}>
                        <td className="small fw-medium">{entry.changedDate}</td>
                        <td className="small">{entry.changedBy}</td>
                        <td className="small">{entry.event}</td>
                        <td className="small">{entry.changedField}</td>
                        <td className="small text-muted">{entry.oldValue || '-'}</td>
                        <td className="small">{entry.newValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 small text-muted">
                <span>1 - 3 of 3</span>
                <span>Page 1</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
