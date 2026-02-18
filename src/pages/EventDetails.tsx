import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const mockEvents = [
  { id: "1", title: "Initial Case Management Conference", subtitle: "Notice of Initial Case Management Conference", date: "August 25, 2025", time: "1:00 PM", endTime: "2:00 PM", duration: "1 hour", location: "Microsoft Teams Meeting", meetingId: "392 671 125 846", type: "Conference", isTeamsEvent: true, caseNumber: "DBE-2024-001-EC", caseName: "Grain Dealer and Warehouse Licensing", primaryParty: "Kirby Neroni", primaryPartyRole: "Respondent", department: "Department of Agriculture", departmentRole: "Complainant", timezone: "CST", instructions: "Please join the Microsoft Teams meeting at the scheduled time. Ensure your audio and video are working properly before the conference begins.", physicalLocation: { building: "William G. Stratton Building", room: "Room 502", address: "401 South Spring Street", city: "Springfield, IL 62706-4000" } },
  { id: "2", title: "Case Management Continuance", subtitle: "Web-based session", date: "September 14, 2025", time: "10:00 AM", endTime: "11:00 AM", duration: "1 hour", location: "Microsoft Teams Meeting", meetingId: "855 123 456 789", type: "Meeting", isTeamsEvent: true, caseNumber: "CASE-2024-001", caseName: "Weights & Measures Inspections", primaryParty: "Sniders Group", primaryPartyRole: "Respondent", department: "Department of Agriculture", departmentRole: "Petitioner", timezone: "CST", instructions: "Continuation of the previous case management conference.", physicalLocation: null },
  { id: "3", title: "Pre-hearing Conference", subtitle: "Web-based session", date: "September 14, 2025", time: "2:00 PM", endTime: "3:00 PM", duration: "1 hour", location: "Microsoft Teams Meeting", meetingId: "123 987 654 321", type: "Conference", isTeamsEvent: true, caseNumber: "CASE-2024-002", caseName: "Weights & Measures Inspections", primaryParty: "Midtown Vending LLC", primaryPartyRole: "Respondent", department: "Department of Agriculture", departmentRole: "Petitioner", timezone: "CST", instructions: "Pre-hearing conference to discuss witness lists and exhibit exchanges.", physicalLocation: null },
  { id: "4", title: "Administrative Hearing", subtitle: "Professional Hearing Session", date: "September 19, 2025", time: "1:00 PM", endTime: "3:00 PM", duration: "2 hours", location: "In-Person", type: "Hearing", isTeamsEvent: false, caseNumber: "CASE-2024-003", caseName: "Food Safety", primaryParty: "North District Foods", primaryPartyRole: "Respondent", department: "Department of Public Health", departmentRole: "Complainant", timezone: "CST", instructions: "Formal administrative hearing. All parties must appear in person.", physicalLocation: { building: "William G. Stratton Building", room: "Room 502", address: "401 South Spring Street", city: "Springfield, IL 62706-4000" } }
];

export default function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  const getTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference': return 'bg-primary';
      case 'hearing': return 'bg-danger';
      case 'meeting': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />

      <div className="container py-4" style={{ maxWidth: '1140px' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate('/portal')}>Events</button></li>
            <li className="breadcrumb-item active">Event Details</li>
          </ol>
        </nav>

        {/* Event Header Card */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h1 className="h3 fw-bold mb-3">{event.title}</h1>
                <div className="bg-light rounded p-3 mb-3">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <small className="text-muted fw-medium text-uppercase">Case Number</small>
                      <p className="small fw-semibold mb-0">{event.caseNumber}</p>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted fw-medium text-uppercase">Case Name</small>
                      <p className="small fw-semibold mb-0">{event.caseName}</p>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted fw-medium text-uppercase">Primary Party</small>
                      <p className="small fw-semibold mb-0">{event.primaryParty}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="small fw-medium"><i className="bi bi-calendar3 me-1"></i> {event.date}</span>
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Scheduled</span>
                </div>
              </div>
              <span className={`badge ${getTypeBadgeClass(event.type)} rounded-pill px-3 py-2`}>{event.type}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Event Details</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'participants' ? 'active' : ''}`} onClick={() => setActiveTab('participants')}>Participants</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'notice' ? 'active' : ''}`} onClick={() => setActiveTab('notice')}>Event Notice</button>
          </li>
        </ul>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Event Details</h5>
                    <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-calendar-plus me-1"></i> Add to My Calendar</button>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <small className="text-muted text-uppercase fw-medium">Event Date</small>
                      <p className="small fw-semibold">{event.date}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted text-uppercase fw-medium">Event Type</small>
                      <p className="small fw-semibold">{event.isTeamsEvent ? 'Online' : 'In-Person'}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted text-uppercase fw-medium">Event Time</small>
                      <p className="small fw-semibold">{event.time} - {event.endTime} {event.timezone}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted text-uppercase fw-medium">Duration</small>
                      <p className="small fw-semibold">{event.duration}</p>
                    </div>
                    <div className="col-12">
                      <small className="text-muted text-uppercase fw-medium">Instructions</small>
                      <p className="small mt-1">{event.instructions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {event.isTeamsEvent && (
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="rounded bg-primary bg-opacity-10 p-2"><i className="bi bi-camera-video text-primary"></i></div>
                      <h5 className="fw-bold mb-0">Online Meeting</h5>
                    </div>
                    <div className="mb-2"><small className="text-muted text-uppercase fw-medium">Platform</small><p className="small fw-semibold">Microsoft Teams Meeting</p></div>
                    <div className="mb-3"><small className="text-muted text-uppercase fw-medium">Meeting ID</small><p className="small fw-semibold font-monospace">{event.meetingId}</p></div>
                    <button className="btn btn-dark w-100"><i className="bi bi-camera-video me-2"></i>Join Teams</button>
                  </div>
                </div>
              )}
              {event.physicalLocation && (
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="rounded bg-success bg-opacity-10 p-2"><i className="bi bi-building text-success"></i></div>
                      <h5 className="fw-bold mb-0">In-Person Meeting</h5>
                    </div>
                    <div className="mb-2"><small className="text-muted text-uppercase fw-medium">Building</small><p className="small fw-semibold">{event.physicalLocation.building}</p></div>
                    <div className="mb-2"><small className="text-muted text-uppercase fw-medium">Room</small><p className="small fw-semibold">{event.physicalLocation.room}</p></div>
                    <div className="mb-3"><small className="text-muted text-uppercase fw-medium">Address</small><p className="small fw-semibold">{event.physicalLocation.address}<br />{event.physicalLocation.city}</p></div>
                    <button className="btn btn-outline-secondary w-100"><i className="bi bi-geo-alt me-2"></i>Get Directions</button>
                    <div className="mt-3 bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '10rem' }}>
                      <div className="text-center text-muted"><i className="bi bi-geo-alt fs-3 d-block mb-1"></i><small>Map View</small></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Participants Tab */}
        {activeTab === 'participants' && (
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Event Participants</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2"><i className="bi bi-people text-primary"></i></div>
                    <div><p className="fw-semibold mb-0">{event.department}</p><small className="text-muted">Government Agency</small></div>
                  </div>
                  <span className="badge border text-secondary">{event.departmentRole}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-success bg-opacity-10 p-2"><i className="bi bi-people text-success"></i></div>
                    <div><p className="fw-semibold mb-0">{event.primaryParty}</p><small className="text-muted">Primary Party</small></div>
                  </div>
                  <span className="badge border text-secondary">{event.primaryPartyRole}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notice Tab */}
        {activeTab === 'notice' && (
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Event Notice</h5>
              <div className="bg-light rounded p-4">
                <p className="small text-muted">Notice document preview would appear here.</p>
                <button className="btn btn-outline-primary btn-sm"><i className="bi bi-download me-1"></i>Download Notice</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
