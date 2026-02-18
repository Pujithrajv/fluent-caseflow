import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

interface DocketEntry {
  date: string;
  time: string;
  role: string;
  person?: string;
  title: string;
  description?: string;
  document?: string;
  link?: string;
  serviceMethod?: string;
  manualEntry?: boolean;
  internalOnly?: boolean;
  freeText?: boolean;
  headerColor: string;
}

const docketEntries: DocketEntry[] = [
  // INTAKE
  { date: "January 2, 2026", time: "9:15 AM CT", role: "System", title: "Case Referred for Adjudication", headerColor: "#6c757d" },
  { date: "January 3, 2026", time: "10:05 AM CT", role: "Clerk", person: "Sandra Lee", title: "Case Rejected by Clerk", description: "Reason: Missing required initiating documents", headerColor: "#1e3a5f" },
  { date: "January 6, 2026", time: "11:20 AM CT", role: "Clerk", person: "Sandra Lee", title: "Intake Correction Received", headerColor: "#1e3a5f" },
  { date: "January 7, 2026", time: "2:45 PM CT", role: "Clerk", person: "Sandra Lee", title: "Case Accepted by Clerk", document: "Initiating_Complaint.pdf", headerColor: "#1e3a5f" },
  { date: "January 8, 2026", time: "9:00 AM CT", role: "System", title: "Administrative Law Judge Assigned", headerColor: "#6c757d" },
  { date: "January 8, 2026", time: "11:00 AM CT", role: "Administrative Law Judge", person: "Rebecca Lawson", title: "Assignment Accepted", headerColor: "#1e3a5f" },
  { date: "January 9, 2026", time: "4:30 PM CT", role: "Administrative Law Judge", person: "Rebecca Lawson", title: "Procedural Checklist Completed – Ready to Proceed", headerColor: "#1e3a5f" },
  // NOTICES / EVENTS
  { date: "January 15, 2026", time: "1:30 PM CT", role: "Clerk", title: "Initial Case Management Conference Scheduled", headerColor: "#1e3a5f" },
  { date: "January 15, 2026", time: "4:00 PM CT", role: "Administrative Law Judge", title: "Notice Entered", document: "Notice_ICMC.pdf", headerColor: "#c5930a" },
  { date: "January 16, 2026", time: "8:15 AM CT", role: "Clerk", title: "Notice Served", serviceMethod: "Email + Portal", headerColor: "#1e3a5f" },
  { date: "January 28, 2026", time: "10:00 AM CT", role: "Administrative Law Judge", title: "Conference Conducted", headerColor: "#1e3a5f" },
  { date: "January 28, 2026", time: "2:00 PM CT", role: "System", title: "Recording Available", link: "ICMC_Recording.mp4", headerColor: "#c5930a" },
  { date: "January 29, 2026", time: "9:00 AM CT", role: "Administrative Law Judge", title: "Conference Report Entered", document: "Conference_Report.pdf", headerColor: "#c5930a" },
  { date: "January 29, 2026", time: "1:30 PM CT", role: "Clerk", title: "Conference Report Served", headerColor: "#1e3a5f" },
  { date: "February 5, 2026", time: "3:00 PM CT", role: "Clerk", title: "Prehearing Conference Rescheduled", description: "Reason: Scheduling Conflict", headerColor: "#1e3a5f" },
  { date: "February 10, 2026", time: "9:00 AM CT", role: "Administrative Law Judge", title: "Prehearing Conference Canceled", description: "Reason: Settlement Discussions", headerColor: "#1e3a5f" },
  { date: "February 15, 2026", time: "10:00 AM CT", role: "Administrative Law Judge", title: "Status Conference Held – No Substantive Business Conducted", headerColor: "#1e3a5f" },
  // MOTIONS
  { date: "February 1, 2026", time: "11:15 AM CT", role: "Respondent Attorney", title: "Motion to Dismiss Filed", document: "Motion_to_Dismiss.pdf", headerColor: "#3b6bb5" },
  { date: "February 2, 2026", time: "3:00 PM CT", role: "Administrative Law Judge", title: "Briefing Schedule Entered", document: "Briefing_Schedule.pdf", headerColor: "#3b6bb5" },
  { date: "February 2, 2026", time: "4:15 PM CT", role: "Clerk", title: "Briefing Schedule Served", serviceMethod: "Portal", headerColor: "#1e3a5f" },
  { date: "February 10, 2026", time: "10:30 AM CT", role: "Petitioner Attorney", title: "Response Filed", document: "Response.pdf", headerColor: "#3b6bb5" },
  { date: "February 14, 2026", time: "9:00 AM CT", role: "Respondent Attorney", title: "Reply Filed", headerColor: "#3b6bb5" },
  { date: "February 20, 2026", time: "1:00 PM CT", role: "Petitioner Attorney", title: "Supplemental Document Filed in Relation to Motion to Dismiss", headerColor: "#3b6bb5" },
  { date: "February 25, 2026", time: "2:00 PM CT", role: "Clerk", title: "Hearing on Motion Scheduled", headerColor: "#1e3a5f" },
  { date: "March 1, 2026", time: "4:30 PM CT", role: "Administrative Law Judge", title: "Order on Motion to Dismiss – Denied", document: "Order.pdf", headerColor: "#5b2d8e" },
  { date: "March 2, 2026", time: "8:45 AM CT", role: "Clerk", title: "Order Served", serviceMethod: "Certified Mail", headerColor: "#4a6a8a" },
  // CERTIFIED MAIL TRACKING
  { date: "March 2, 2026", time: "9:10 AM CT", role: "Clerk", title: "Free Text – Manual Entry", description: "Certified Mail Article Number 7015 0640 0001 2345 6789 entered for Order on Motion to Dismiss mailed to Petitioner.", freeText: true, manualEntry: true, headerColor: "#dc3545" },
  { date: "March 2, 2026", time: "9:15 AM CT", role: "Clerk", title: "Free Text – Manual Entry", description: "Additional Certified Mail Article Number 7015 0640 0001 9876 5432 entered for alternate mailing address.", freeText: true, manualEntry: true, headerColor: "#dc3545" },
  { date: "March 5, 2026", time: "3:00 PM CT", role: "Clerk", title: "Certified Mail Return Receipt Received (Signed)", headerColor: "#4a6a8a" },
  { date: "March 6, 2026", time: "9:30 AM CT", role: "Clerk", title: "Regular Mail Returned Undeliverable", headerColor: "#4a6a8a" },
  // ORAL MOTIONS
  { date: "March 5, 2026", time: "10:15 AM CT", role: "Bureau Staff", title: "Oral Motion on the Record – Motion to Continue", headerColor: "#3b6bb5" },
  { date: "March 5, 2026", time: "3:00 PM CT", role: "Administrative Law Judge", title: "Ruling on Oral Motion – Granted", headerColor: "#5b2d8e" },
  // SUBPOENAS
  { date: "March 6, 2026", time: "9:30 AM CT", role: "Petitioner Attorney", title: "Request for Issuance of Subpoena Filed", headerColor: "#3b6bb5" },
  { date: "March 8, 2026", time: "2:00 PM CT", role: "Administrative Law Judge", title: "Subpoena Issued", headerColor: "#3b6bb5" },
  { date: "March 15, 2026", time: "1:00 PM CT", role: "Respondent Attorney", title: "Motion to Quash Subpoena Filed", headerColor: "#3b6bb5" },
  // DISCOVERY
  { date: "March 20, 2026", time: "11:00 AM CT", role: "Administrative Law Judge", title: "Discovery Schedule Entered", headerColor: "#3b6bb5" },
  { date: "March 20, 2026", time: "2:30 PM CT", role: "Clerk", title: "Discovery Schedule Served", headerColor: "#1e3a5f" },
  { date: "April 10, 2026", time: "4:00 PM CT", role: "Petitioner", title: "Discovery Compliance Certificate Filed", headerColor: "#3b6bb5" },
  // EXHIBITS + IN CAMERA
  { date: "April 15, 2026", time: "9:00 AM CT", role: "Petitioner Attorney", title: "Proposed Exhibits Uploaded", headerColor: "#3b6bb5" },
  { date: "April 16, 2026", time: "10:00 AM CT", role: "Petitioner Attorney", title: "In Camera Exhibit Submitted – Visible to ALJ Only", internalOnly: true, headerColor: "#3b6bb5" },
  { date: "April 18, 2026", time: "1:30 PM CT", role: "Administrative Law Judge", title: "Free Text – Manual Entry", description: "In-person in camera inspection completed. Portions remain confidential.", freeText: true, manualEntry: true, internalOnly: true, headerColor: "#dc3545" },
  { date: "April 20, 2026", time: "11:00 AM CT", role: "Clerk", title: "In Camera Exhibit Released per ALJ Order", headerColor: "#1e3a5f" },
  // DECISION
  { date: "May 1, 2026", time: "1:00 PM CT", role: "Administrative Law Judge", title: "Findings of Fact, Conclusions of Law, and Recommended Decision Entered", headerColor: "#5b2d8e" },
  { date: "May 1, 2026", time: "3:30 PM CT", role: "Clerk", title: "FFCLRD Served", headerColor: "#1e3a5f" },
  { date: "May 20, 2026", time: "10:00 AM CT", role: "Referring Agency", title: "Final Administrative Decision Entered", description: "Activity Date: May 18, 2026", headerColor: "#5b2d8e" },
  { date: "May 20, 2026", time: "2:00 PM CT", role: "Clerk", title: "FAD Served", headerColor: "#1e3a5f" },
  // PARTY CONTACT UPDATE
  { date: "June 1, 2026", time: "11:00 AM CT", role: "Clerk", title: "Party Contact Updated for Petitioner", headerColor: "#1e3a5f" },
  // FINAL FREE TEXT
  { date: "June 5, 2026", time: "9:30 AM CT", role: "Bureau Staff", title: "Free Text – Manual Entry", description: "Court reporter notified regarding transcript correction.", freeText: true, manualEntry: true, internalOnly: true, headerColor: "#dc3545" },
];

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "Clerk": return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
    case "Administrative Law Judge": return "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
    case "System": return "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25";
    case "Bureau Staff": return "bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25";
    case "Referring Agency": return "bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25";
    default: return "bg-light text-secondary border";
  }
};

export default function DocketLog() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f4f6f8' }}>
      <Header />

      <div className="container py-4" style={{ maxWidth: '960px' }}>
        {/* Case Header */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <small className="text-muted fw-medium">Case Number</small>
                <p className="fs-5 fw-bold mb-0">BAH-2026-000145</p>
              </div>
              <div className="col-md-6">
                <small className="text-muted fw-medium">Case Type</small>
                <p className="fs-5 fw-semibold mb-0">Professional License Disciplinary Appeal</p>
              </div>
              <div className="col-md-6">
                <small className="text-muted fw-medium">Petitioner</small>
                <p className="fw-semibold mb-0">John A. Smith <span className="fw-normal text-muted small">(Represented)</span></p>
                <small className="text-muted">Attorney: Maria Gonzalez, Esq.</small>
              </div>
              <div className="col-md-6">
                <small className="text-muted fw-medium">Respondent</small>
                <p className="fw-semibold mb-0">Illinois Department of Licensing <span className="fw-normal text-muted small">(Represented)</span></p>
                <small className="text-muted">Attorney: Daniel Harper, Assistant Attorney General</small>
              </div>
              <div className="col-md-6">
                <small className="text-muted fw-medium">Assigned ALJ</small>
                <p className="fw-semibold mb-0">Hon. Rebecca Lawson</p>
              </div>
              <div className="col-md-6">
                <small className="text-muted fw-medium">Case Status</small>
                <div><span className="badge bg-success mt-1">Active – Pre-Hearing Phase</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="position-relative">
          {/* Vertical line */}
          <div className="d-none d-md-block position-absolute" style={{ left: '260px', width: '2px', backgroundColor: '#dee2e6', top: 0, bottom: 0 }}></div>

          {docketEntries.map((entry, index) => (
            <div key={index} className="d-flex align-items-start mb-4 position-relative" style={{ gap: '1.5rem' }}>
              {/* Left: Date/Role Card */}
              <div className="flex-shrink-0 d-flex justify-content-end" style={{ width: '230px' }}>
                <div className={`d-inline-flex flex-column align-items-center rounded-pill px-3 py-2 shadow-sm text-center ${getRoleBadgeClass(entry.role)}`}>
                  <small className="fw-bold" style={{ fontSize: '0.7rem' }}>{entry.date} {entry.time}</small>
                  <small className="fw-medium" style={{ fontSize: '0.7rem' }}>{entry.person || entry.role}</small>
                  {entry.person && <small style={{ fontSize: '0.6rem' }}>{entry.role}</small>}
                </div>
              </div>

              {/* Center: Timeline node */}
              <div className="flex-shrink-0 d-none d-md-block position-relative" style={{ marginTop: '1rem', zIndex: 1 }}>
                <div
                  className="rounded-circle border border-2 border-white shadow-sm"
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: entry.freeText ? '#dc3545' : '#adb5bd'
                  }}
                ></div>
              </div>

              {/* Right: Event Card */}
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className={`card border-0 shadow-sm overflow-hidden ${entry.internalOnly && entry.freeText ? '' : ''}`} style={entry.internalOnly && entry.freeText ? { backgroundColor: '#fff5f5' } : {}}>
                  <div className="px-3 py-2" style={{ backgroundColor: entry.headerColor }}>
                    <h6 className="mb-0 text-white fw-bold small">{entry.title}</h6>
                  </div>
                  <div className="card-body p-3">
                    {entry.description && <p className="small mb-2">{entry.description}</p>}
                    {entry.document && (
                      <div className="mb-2">
                        <small className="fw-bold d-block mb-1">Documents Uploaded</small>
                        <a href="#" className="small text-primary text-decoration-underline">
                          <i className="bi bi-file-earmark-text me-1"></i>{entry.document}
                        </a>
                      </div>
                    )}
                    {entry.link && (
                      <div className="mb-2">
                        <small className="fw-bold d-block mb-1">Link to Recording</small>
                        <a href="#" className="small text-primary text-decoration-underline">
                          <i className="bi bi-link-45deg me-1"></i>{entry.link}
                        </a>
                      </div>
                    )}
                    {entry.serviceMethod && (
                      <small className="text-muted d-block">Service Method: <span className="fw-medium">{entry.serviceMethod}</span></small>
                    )}
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {entry.manualEntry && (
                        <span className="badge border border-warning text-warning bg-warning bg-opacity-10" style={{ fontSize: '0.65rem' }}>Manual Entry</span>
                      )}
                      {entry.internalOnly && (
                        <span className="badge border border-danger text-danger bg-danger bg-opacity-10" style={{ fontSize: '0.65rem' }}>Internal Only</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer className="mt-5" />
    </div>
  );
}
