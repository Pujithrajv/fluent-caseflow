import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { TasksPlannerView } from "./TasksPlannerView";
import { TasksJiraView } from "./TasksJiraView";
import { TasksKanbanView } from "./TasksKanbanView";
import { TasksNewApproach2View } from "./TasksNewApproach2View";
import { Tasks2View } from "./Tasks2View";
import { NewTaskView } from "./NewTaskView";
import CmsUpcomingEvents from "./CmsUpcomingEvents";

interface CaseItem {
  id: string;
  name: string;
  description: string;
  caseNumber?: string;
  confirmationNumber?: string;
  deptRefNumber?: string;
  caseType: string;
  department: string;
  departmentParticipationType: string;
  section: string;
  primaryPartyName: string;
  primaryPartyType: string;
  primaryPartyCategory: string;
  represented?: string;
  attorneyName?: string;
  status: "draft" | "submitted" | "accepted" | "complete" | "closed" | "archived";
  externalStatus: string;
  stage: "Intake" | "Pre-Hearing" | "Hearing" | "Post-Hearing";
  icon: "shield" | "car" | "file";
  lastActionDate: string;
  lastWizardTab: string;
  assignedAttorney?: string;
  nextEvent?: { name: string; date: string; time: string };
  deadlines?: Array<{ name: string; date: string; priority: number }>;
}

const mockCases: CaseItem[] = [
  {
    id: "DBE-2024-001-EC", name: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    description: "Grain Dealer and Warehouse Licensing", caseNumber: "DBE-2024-001-EC",
    deptRefNumber: "AGR-2024-0892", caseType: "Grain Dealer and Warehouse Licensing",
    department: "Department of Agriculture", departmentParticipationType: "Complainant",
    section: "Division of Agricultural Industry Regulation", primaryPartyName: "Kirby Neroni",
    primaryPartyType: "Respondent", primaryPartyCategory: "Individual", represented: "No",
    status: "accepted", externalStatus: "Accepted", stage: "Pre-Hearing", icon: "shield",
    lastActionDate: "2025-08-11", lastWizardTab: "review-submit", assignedAttorney: "Greg Miles",
    nextEvent: { name: "Pre-hearing Conference", date: "2024-12-28", time: "2:00 PM" },
    deadlines: [{ name: "Response to Motion due", date: "2024-12-22", priority: 1 }, { name: "Discovery cutoff", date: "2024-12-30", priority: 2 }]
  },
  {
    id: "CASE-2024-001", name: "Weights & Measures Inspections for Sniders Group",
    description: "Weights & Measures Inspections", confirmationNumber: "2024-0001",
    deptRefNumber: "WM-2024-0456", caseType: "Weights & Measures Inspections",
    department: "Department of Agriculture", departmentParticipationType: "Petitioner",
    section: "Weights & Measures Division", primaryPartyName: "Sniders Group",
    primaryPartyType: "Respondent", primaryPartyCategory: "Corporate Entity",
    status: "submitted", externalStatus: "Submitted", stage: "Intake", icon: "shield",
    lastActionDate: "2024-06-04", lastWizardTab: "review-submit", assignedAttorney: "Jaslyn Blom",
    deadlines: [{ name: "Initial Response due", date: "2024-12-25", priority: 1 }]
  },
  {
    id: "CASE-2024-002", name: "Vending Inspection – Midtown",
    description: "Weights & Measures Inspections", confirmationNumber: "2024-0002",
    caseType: "Weights & Measures Inspections", department: "Department of Agriculture",
    departmentParticipationType: "Petitioner", section: "Weights & Measures Division",
    primaryPartyName: "Midtown Vending LLC", primaryPartyType: "Respondent",
    primaryPartyCategory: "Corporate Entity", status: "draft", externalStatus: "Draft",
    stage: "Intake", icon: "shield", lastActionDate: "2025-07-28", lastWizardTab: "department"
  },
  {
    id: "CASE-2024-003", name: "Food Safety – North District",
    description: "Food Safety", confirmationNumber: "2024-0003",
    deptRefNumber: "FS-2024-0123", caseType: "Food Safety",
    department: "Department of Public Health", departmentParticipationType: "Complainant",
    section: "Food Safety Division", primaryPartyName: "North District Foods",
    primaryPartyType: "Respondent", primaryPartyCategory: "Corporate Entity",
    status: "draft", externalStatus: "Draft", stage: "Intake", icon: "file",
    lastActionDate: "2025-07-28", lastWizardTab: "primary-party"
  }
];

const mockTasks = [
  { id: "CASE-2024-001", caseNumber: "CASE-2024-001", title: "New Case Created", description: "New case successfully created and saved to records.", primaryParty: "Kirby Neroni", priority: "Informational", dueDate: "2025-09-17", priorityClass: "bg-secondary bg-opacity-10 text-secondary", type: "alert" },
  { id: "CASE-2024-002", caseNumber: "CASE-2024-002", title: "Case Returned for Correction", description: "Case returned for correction – missing/incorrect information or documents.", primaryParty: "Sniders Group", priority: "High Priority", dueDate: "2024-12-28", priorityClass: "bg-warning bg-opacity-10 text-warning", type: "alert" },
  { id: "DBE-2024-001-EC", caseNumber: "DBE-2024-001-EC", title: "Case Accepted", description: "Case Accepted – Case Number generated.", primaryParty: "North District Foods", priority: "Normal", dueDate: "2025-09-27", priorityClass: "bg-primary bg-opacity-10 text-primary", type: "alert" },
  { id: "CASE-2024-004", caseNumber: "CASE-2024-004", title: "Case Rejected - Soft Reject (Clerk)", description: "Case Rejected – due to incomplete information or wrong document upload.", primaryParty: "Metro Agricultural Corp", priority: "Alert", dueDate: "2024-12-30", priorityClass: "bg-warning bg-opacity-25 text-dark", type: "alert" },
  { id: "ABD-2024-001-EC", caseNumber: "ABD-2024-001-EC", title: "Case Rejected - Hard Reject (ALJ)", description: "Case Rejected – ALJ after checklist review.", primaryParty: "Valley Grain Solutions", priority: "Critical Alert", dueDate: "2025-09-17", priorityClass: "bg-danger bg-opacity-10 text-danger", type: "alert" }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, { bg: string; text: string }> = {
    draft: { bg: '#C53E3E', text: '#ffffff' },
    submitted: { bg: '#F6A609', text: '#ffffff' },
    accepted: { bg: '#3DA546', text: '#ffffff' },
    complete: { bg: '#3DA546', text: '#ffffff' },
    closed: { bg: '#6c757d', text: '#ffffff' },
    archived: { bg: '#6c757d', text: '#ffffff' },
  };
  const s = styles[status] || styles.draft;
  return { backgroundColor: s.bg, color: s.text };
};

interface DashboardProps {
  onCreateCase: () => void;
  onViewCase: (caseId: string) => void;
  onEditCase?: (caseId: string, tab: string) => void;
}

export function Dashboard({ onCreateCase, onViewCase, onEditCase }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cases");
  const [tasks, setTasks] = useState(mockTasks);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f4f6f8' }}>
      <Header />

      <div className="container-lg py-4">
        {/* Bootstrap Tabs */}
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>
              <i className="bi bi-folder2-open me-1"></i> Cases
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
              <i className="bi bi-calendar-event me-1"></i> Upcoming Events
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'new-task' ? 'active' : ''}`} onClick={() => setActiveTab('new-task')}>
              <i className="bi bi-list-task me-1"></i> Tasks
            </button>
          </li>
        </ul>

        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <div>
            {/* Action Buttons + Search */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary" onClick={() => navigate('/demo-request')}>Demo Request</button>
                <button className="btn btn-primary" onClick={() => navigate('/crm')}>CRM</button>
                <button className="btn btn-primary" onClick={() => navigate('/discoverys')}>Discoverys</button>
                <button className="btn btn-primary" onClick={() => navigate('/submission-fillings')}>Submission & Fillings</button>
                <button className="btn btn-primary" onClick={() => navigate('/tes')}>TES</button>
                <button className="btn btn-primary" onClick={() => navigate('/fillings')}>Fillings</button>
                <button className="btn btn-primary" onClick={() => navigate('/docket')}>Docket</button>
              </div>
              <div className="d-flex gap-2">
                <div className="input-group" style={{ width: '16rem' }}>
                  <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search cases..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={onCreateCase}>
                  <i className="bi bi-plus-lg me-1"></i> Create New Case
                </button>
              </div>
            </div>

            {/* Cases Table */}
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '60px' }}></th>
                      <th>Case #</th>
                      <th>Department</th>
                      <th>Primary Party</th>
                      <th>Status</th>
                      <th>Important Dates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCases.map(caseItem => (
                      <tr key={caseItem.id}>
                        <td className="align-top">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              if (caseItem.status === 'draft') {
                                onEditCase?.(caseItem.id, caseItem.lastWizardTab);
                              } else {
                                onViewCase(caseItem.id);
                              }
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>

                        {/* Case # */}
                        <td className="align-top">
                          <div className="fw-medium small">
                            {caseItem.status === 'accepted' || caseItem.status === 'complete' || caseItem.status === 'closed'
                              ? caseItem.caseNumber ? `Case #: ${caseItem.caseNumber}` : '—'
                              : caseItem.confirmationNumber ? `Confirmation #: ${caseItem.confirmationNumber}` : '—'}
                          </div>
                          <small className="text-muted">{caseItem.caseType}</small>
                          <br />
                          <small className="text-muted">Dept. Ref #: {caseItem.deptRefNumber || '—'}</small>
                        </td>

                        {/* Department */}
                        <td className="align-top">
                          <div className="fw-medium small">{caseItem.department}</div>
                          <small className="text-muted">{caseItem.departmentParticipationType}</small>
                          <br />
                          <small className="text-muted">{caseItem.assignedAttorney || "(not yet assigned)"}</small>
                        </td>

                        {/* Primary Party */}
                        <td className="align-top">
                          <div className="fw-medium small">{caseItem.primaryPartyName}</div>
                          <small className="text-muted">{caseItem.primaryPartyType} – {caseItem.primaryPartyCategory}</small>
                          <br />
                          <small className="text-muted">
                            {caseItem.attorneyName ? `Attorney: ${caseItem.attorneyName}` : `Represented: ${caseItem.represented || 'No'}`}
                          </small>
                        </td>

                        {/* Status */}
                        <td className="align-top">
                          <span className="badge rounded-pill" style={getStatusBadge(caseItem.status)}>
                            {caseItem.externalStatus}
                          </span>
                          <br />
                          <small className="text-muted">Stage: {caseItem.stage}</small>
                        </td>

                        {/* Important Dates */}
                        <td className="align-top">
                          {caseItem.nextEvent ? (
                            <div className="small">
                              <div className="fw-medium">{caseItem.nextEvent.name}</div>
                              <span className="text-muted">{formatDate(caseItem.nextEvent.date)} at {caseItem.nextEvent.time}</span>
                            </div>
                          ) : (
                            <small className="text-muted">No events scheduled</small>
                          )}
                          {caseItem.deadlines?.slice(0, 2).map((deadline, index) => (
                            <div key={index} className="small text-muted">{deadline.name} — {formatDate(deadline.date)}</div>
                          ))}
                          {caseItem.status === "draft" && (
                            <div className="mt-1">
                              <small className="text-muted">Draft saved — {formatDate(caseItem.lastActionDate)}</small>
                              {onEditCase && (
                                <button
                                  className="btn btn-outline-secondary btn-sm ms-2"
                                  onClick={() => onEditCase(caseItem.id, caseItem.lastWizardTab)}
                                >
                                  Continue Editing
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <CmsUpcomingEvents />
        )}

        {/* Tasks Tab */}
        {activeTab === 'new-task' && (
          <NewTaskView tasks={tasks} onViewTask={taskId => console.log('View task:', taskId)} />
        )}
      </div>

      <Footer />
    </div>
  );
}
