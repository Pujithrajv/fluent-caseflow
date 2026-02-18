import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/shared/Footer";

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const mockAcceptedCases = [
  { id: "DBE-2024-001-EC", caseNumber: "DBE-2024-001-EC", caseType: "Grain Dealer and Warehouse Licensing", department: "Department of Agriculture", primaryPartyName: "Kirby Neroni", primaryPartyType: "Respondent", stage: "Pre-Hearing", status: "accepted", lastActionDate: "2025-08-11", assignedAttorney: "Greg Miles" }
];

const mockEvents = [
  { id: 1, title: "Initial Case Management Conference", date: "2025-08-25", time: "1:00 PM", endTime: "2:00 PM", location: "Microsoft Teams Meeting", meetingId: "392 671 125 846", type: "Conference", isTeamsEvent: true, caseNumber: "DBE-2024-001-EC", caseType: "Grain Dealer and Warehouse Licensing", department: "Department of Agriculture", departmentRole: "Complainant", primaryParty: "Kirby Neroni", primaryPartyRole: "Respondent", timezone: "CST" }
];

const mockTasks = [
  { id: "DBE-2024-001-EC", caseNumber: "DBE-2024-001-EC", title: "Document Review Pending", description: "Grain Dealer and Warehouse Licensing case review", primaryParty: "Kirby Neroni", priority: "High Priority", dueDate: "2024-12-22" }
];

const AttorneyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cases");

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <div className="bg-white border-bottom">
        <div className="container-lg py-3 d-flex justify-content-between align-items-center">
          <img src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" alt="Illinois Bureau of Administrative Hearings" style={{ height: '4rem' }} />
          <button className="btn btn-link text-decoration-none" onClick={() => navigate("/profile")}><i className="bi bi-arrow-left me-1"></i> Back to Profile</button>
        </div>
      </div>

      <div className="container-lg py-4">
        <h1 className="h3 fw-bold mb-1">Attorney Dashboard</h1>
        <p className="text-muted mb-4">View and manage accepted cases, events, and tasks</p>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item"><button className={`nav-link ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>Cases</button></li>
          <li className="nav-item"><button className={`nav-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>Upcoming Events</button></li>
          <li className="nav-item"><button className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>Tasks & Alerts</button></li>
        </ul>

        {activeTab === 'cases' && (
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white"><h6 className="fw-semibold mb-0">Accepted Cases</h6></div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Case Number</th><th>Case Type</th><th>Department</th><th>Primary Party</th><th>Stage</th><th>Status</th><th>Last Action</th><th className="text-end">Actions</th></tr>
                  </thead>
                  <tbody>
                    {mockAcceptedCases.map(c => (
                      <tr key={c.id}>
                        <td className="fw-medium">{c.caseNumber}</td>
                        <td>{c.caseType}</td><td>{c.department}</td>
                        <td><div className="fw-medium">{c.primaryPartyName}</div><small className="text-muted">{c.primaryPartyType}</small></td>
                        <td><span className="badge border text-secondary">{c.stage}</span></td>
                        <td><span className="badge rounded-pill" style={{ backgroundColor: '#3DA546', color: '#fff' }}>Accepted</span></td>
                        <td>{c.lastActionDate}</td>
                        <td className="text-end"><button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(`/attorney/case/${c.id}`)}><i className="bi bi-eye me-1"></i>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white"><h6 className="fw-semibold mb-0">Upcoming Events</h6></div>
            <div className="card-body">
              <div className="row g-3">
                {mockEvents.map(event => (
                  <div key={event.id} className="col-lg-6">
                    <div className="card border-start border-primary border-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2"><h6 className="fw-semibold">{event.title}</h6><span className="badge bg-secondary">{event.type}</span></div>
                        <div className="small text-muted mb-1"><strong>{event.caseNumber}:</strong> {event.caseType}</div>
                        <div className="small text-muted mb-1">{event.department} ({event.departmentRole})</div>
                        <div className="small text-muted mb-2">{event.primaryParty} ({event.primaryPartyRole})</div>
                        <div className="small mb-1"><i className="bi bi-calendar3 me-1"></i> {formatDate(event.date)}</div>
                        <div className="small mb-2"><i className="bi bi-clock me-1"></i> {event.time} - {event.endTime} {event.timezone}</div>
                        <div className="d-flex gap-2">
                          {event.isTeamsEvent && <button className="btn btn-primary btn-sm flex-fill"><i className="bi bi-camera-video me-1"></i>Join Teams</button>}
                          <button className="btn btn-outline-secondary btn-sm flex-fill"><i className="bi bi-folder2-open me-1"></i>Open Case</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white"><h6 className="fw-semibold mb-0">Tasks & Alerts</h6></div>
            <div className="card-body">
              {mockTasks.map(task => (
                <div key={task.id} className="card border-start border-warning border-3 mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="d-flex gap-2 mb-1">
                          <span className="badge border text-secondary">{task.caseNumber}</span>
                          <span className="badge bg-warning text-dark">{task.priority}</span>
                        </div>
                        <h6 className="fw-semibold">{task.title}</h6>
                        <p className="small text-muted mb-1">{task.description}</p>
                        <small className="text-muted">Primary Party: {task.primaryParty} | Due: {formatDate(task.dueDate)}</small>
                      </div>
                      <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-eye me-1"></i>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AttorneyDashboard;
