import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CaseWizard } from "@/components/portal/CaseWizard";
import { AljWarningModal } from "@/components/portal/AljWarningModal";

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const acceptedCase = {
  id: "CASE-2024-004", caseNumber: "CASE-2024-004", status: 'accepted' as const,
  department: "Department of Labor", primaryParty: "Michael Johnson",
  importantDates: [{ type: "Hearing Date", date: "2024-03-15" }, { type: "Document Deadline", date: "2024-03-01" }]
};

const mockEvents = [
  { id: "1", title: "Pre-hearing Conference", date: "2024-02-28", time: "10:00 AM", location: "Room 205, Springfield Building" },
  { id: "2", title: "Document Review Meeting", date: "2024-03-05", time: "2:00 PM", location: "Virtual Meeting" }
];

const ParticipantsDashboard = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "view-case">("dashboard");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  if (currentView === "view-case") {
    return <CaseWizard onBack={() => setCurrentView("dashboard")} mode="view-edit" caseStatus="accepted" caseId={selectedCaseId} />;
  }

  return (
    <>
      <AljWarningModal onAcknowledge={() => {}} />
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Header />
        <div className="container py-4">
          <h1 className="h3 fw-bold mb-1">Participants Dashboard</h1>
          <p className="text-muted mb-4">Manage participant information and case details</p>

          <ul className="nav nav-tabs mb-4">
            <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#cases-tab">Cases</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#events-tab">Upcoming Events</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tasks-tab">Tasks & Alerts</button></li>
          </ul>

          {/* Cases always visible for now (no JS tab switching needed since Bootstrap JS not included) */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Case #</th><th>Department</th><th>Primary Party</th><th>Status</th><th>Important Dates</th><th style={{ width: '100px' }}>Actions</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">{acceptedCase.caseNumber}</td>
                      <td>{acceptedCase.department}</td>
                      <td>{acceptedCase.primaryParty}</td>
                      <td><span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Accepted</span></td>
                      <td>{acceptedCase.importantDates.map((d, i) => <div key={i} className="small"><strong>{d.type}:</strong> <span className="text-muted">{formatDate(d.date)}</span></div>)}</td>
                      <td><button className="btn btn-outline-secondary btn-sm" onClick={() => { setSelectedCaseId(acceptedCase.id); setCurrentView("view-case"); }}><i className="bi bi-eye"></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="row g-3 mb-4">
            {mockEvents.map(event => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="fw-semibold">{event.title}</h6>
                    <div className="small text-muted"><i className="bi bi-calendar3 me-1"></i> {formatDate(event.date)} at {event.time}</div>
                    <div className="small text-muted"><i className="bi bi-geo-alt me-1"></i> {event.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tasks */}
          <div className="d-flex flex-column gap-3">
            <div className="card shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div><h6 className="fw-semibold mb-1">Review participant documentation</h6><small className="text-muted">Verify all participant information is complete and accurate</small><br /><small className="text-muted">Due: March 1, 2024</small></div>
                <span className="badge bg-danger">High Priority</span>
              </div>
            </div>
            <div className="card shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div><h6 className="fw-semibold mb-1">Update contact information</h6><small className="text-muted">Ensure all participant contact details are current</small><br /><small className="text-muted">Due: March 5, 2024</small></div>
                <span className="badge bg-secondary">Medium Priority</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ParticipantsDashboard;
