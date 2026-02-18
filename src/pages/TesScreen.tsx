import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, HelpCircle, User } from "lucide-react";
import logo from "@/assets/logo.png";

const TesScreen = () => {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ruling");

  const caseData = {
    caseNumber: "DBE-EC-02025-004",
    title: "Abandoned Well",
    requestingParty: {
      name: "Department of Natural Resources",
      type: "First Party: Complainant",
      deptNumber: "514-7311-0025"
    },
    respondingParty: {
      name: "Tommy Welldorf",
      type: "Second Party: Respondent",
      attorney: "Dell Spington"
    },
    recommendedDecision: {
      aljName: "Hon. Patricia Martinez",
      decisionDate: "11/25/2024",
      daysRemaining: "6 days",
      summary: "The Administrative Law Judge recommends granting the petitioner's request for remediation assistance based on the evidence presented during the hearing. The respondent failed to demonstrate compliance with environmental regulations as required under statute."
    }
  };

  const rulingDocuments = [
    { id: 1, name: "final ruling.pdf", type: "Recommended Decision", uploadedBy: "Patricia Martinez", uploadDate: "2025-11-11" },
    { id: 2, name: "Briefing-Schedule-Sequential.pdf", type: "Briefing Schedule", uploadedBy: "CMS System", uploadDate: "2025-11-11" }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="text-white" style={{ backgroundColor: "#0f2a4e" }}>
        <div className="d-flex align-items-center justify-content-between px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
            <span className="fs-5 fw-semibold">Case Management System</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-link text-white p-1"><HelpCircle size={20} /></button>
            <button className="btn btn-link text-white p-1"><User size={20} /></button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Back Button */}
        <div className="mb-3">
          <button className="btn btn-link text-primary p-0" onClick={() => navigate('/portal')}>
            <ArrowLeft size={16} className="me-1" /> Back
          </button>
        </div>

        {/* Case Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">
              {caseData.title}: {caseData.caseNumber}
            </h1>
            <p className="small text-primary mb-2">Cases / Case Summary / Case Details</p>
            <div className="d-flex gap-2">
              <span className="badge bg-primary">Confidential</span>
              <span className="badge bg-warning text-dark">Complex</span>
              <span className="badge bg-danger">Expedited</span>
            </div>
          </div>
          <div className="d-flex gap-4 small">
            <div className="text-end">
              <p className="fw-semibold text-secondary mb-0">Requesting Party</p>
              <p className="text-muted mb-0">{caseData.requestingParty.name}</p>
              <p className="text-muted mb-0">{caseData.requestingParty.type}</p>
              <p className="text-muted mb-0">Dept#: {caseData.requestingParty.deptNumber}</p>
            </div>
            <div className="text-end">
              <p className="fw-semibold text-secondary mb-0">Responding Party</p>
              <p className="text-muted mb-0">{caseData.respondingParty.name}</p>
              <p className="text-muted mb-0">{caseData.respondingParty.type}</p>
              <p className="text-muted mb-0">Attorney: {caseData.respondingParty.attorney}</p>
            </div>
            <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "case-details" ? "active" : ""}`} onClick={() => setActiveTab("case-details")}>Case Details</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "participants" ? "active" : ""}`} onClick={() => setActiveTab("participants")}>👥 Participants</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "submissions" ? "active" : ""}`} onClick={() => setActiveTab("submissions")}>📄 Submissions and Requests</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "docket" ? "active" : ""}`} onClick={() => setActiveTab("docket")}>📋 Docket</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "ruling" ? "active" : ""}`} onClick={() => setActiveTab("ruling")}>⚖️ FDM</button>
          </li>
        </ul>

        {/* FDM Tab Content */}
        {activeTab === "ruling" && (
          <div className="row g-4">
            {/* Left Sidebar */}
            <div className="col-md-3">
              <div className="card border shadow-sm mb-4">
                <div className="card-header bg-white pb-2">
                  <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                    <span className="text-primary">📋</span> Recommended Decision Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <p className="small text-muted mb-0">ALJ Name</p>
                    <p className="small fw-medium d-flex align-items-center gap-1 mb-0">
                      <User size={14} /> {caseData.recommendedDecision.aljName}
                    </p>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <p className="small text-muted mb-0">Recommended Decision Date</p>
                      <p className="small fw-medium mb-0">📅 {caseData.recommendedDecision.decisionDate}</p>
                    </div>
                    <div className="col-6">
                      <p className="small text-muted mb-0">Days Remaining</p>
                      <p className="small fw-medium text-success mb-0">⏱️ {caseData.recommendedDecision.daysRemaining}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border shadow-sm">
                <div className="card-header bg-white pb-2">
                  <h5 className="card-title mb-0">Recommended Documents</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 small text-primary" style={{ cursor: "pointer" }}>
                    <span>📄</span><span>Recommended Decision Report</span>
                  </div>
                  <p className="text-muted mt-1 mb-1" style={{ fontSize: "0.75rem" }}>
                    System Generated • ALJ Patricia Martinez • 11/25/2024
                  </p>
                  <button className="btn btn-link text-primary p-0"><Download size={16} /></button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-md-9">
              <div className="card border shadow-sm">
                <div className="card-header bg-white pb-2">
                  <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                    <span className="text-primary">💬</span> Recommended Decision Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <h6 className="fw-medium text-secondary mb-2">Summary</h6>
                    <p className="small text-muted lh-lg">{caseData.recommendedDecision.summary}</p>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-3 pt-3">
                    <h5 className="fw-semibold mb-0">Final Decision Maker Action</h5>
                    <span className="badge bg-warning bg-opacity-25 text-dark border border-warning">FDM Pending</span>
                  </div>

                  <p className="small text-muted mb-3">Choose Your Action</p>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <button
                        onClick={() => setSelectedAction('approve')}
                        className={`w-100 p-3 border rounded text-center ${selectedAction === 'approve' ? 'border-success bg-success text-white' : 'border-secondary-subtle'}`}
                        style={{ borderWidth: "2px" }}
                      >
                        <div className="fs-5 mb-1">⊙</div>
                        <p className="fw-medium mb-0">Approve Recommended Decision</p>
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={() => setSelectedAction('disagree')}
                        className={`w-100 p-3 border rounded text-center ${selectedAction === 'disagree' ? 'text-white' : 'border-secondary-subtle'}`}
                        style={{ borderWidth: "2px", backgroundColor: selectedAction === 'disagree' ? '#fd7e14' : undefined, borderColor: selectedAction === 'disagree' ? '#fd7e14' : undefined }}
                      >
                        <div className="fs-5 mb-1">⊗</div>
                        <p className="fw-medium mb-0">Disagree / Upload Own Ruling</p>
                      </button>
                    </div>
                  </div>

                  {selectedAction === 'approve' && (
                    <div className="bg-light border rounded p-4 mb-4">
                      <p className="small text-secondary mb-3">
                        Approving will automatically generate a Final Ruling Report based on the ALJ's recommendation.
                      </p>
                      <div className="mb-4">
                        <p className="small fw-medium text-secondary mb-2">Upload Supporting Documents (Optional)</p>
                        <div className="border border-2 border-dashed border-success rounded p-4 text-center bg-white" style={{ cursor: "pointer" }}>
                          <div className="text-success fs-3 mb-2">↑</div>
                          <p className="text-muted mb-1">Drag and drop files here, or click to browse</p>
                          <p className="small text-muted">PDF- max 10 MB</p>
                        </div>
                      </div>
                      <p className="small fw-medium text-secondary mb-2">Optional comments to accompany your approval</p>
                      <textarea className="form-control mb-3" rows={4} placeholder="Enter any additional comments..." />
                      <button className="btn btn-success">Generate Final Ruling Report</button>
                    </div>
                  )}

                  {selectedAction === 'disagree' && (
                    <div className="bg-light border rounded p-4 mb-4">
                      <div className="d-flex align-items-start gap-2 mb-3">
                        <span className="text-warning fs-5">⚠</span>
                        <p className="small text-secondary mb-0">
                          Upload your own final ruling PDF. This will replace the ALJ's recommendation as the Final Administrative Decision.
                        </p>
                      </div>
                      <div className="border border-2 border-dashed rounded p-5 text-center bg-white mb-4" style={{ borderColor: "#fd7e14", cursor: "pointer" }}>
                        <div style={{ color: "#fd7e14" }} className="fs-3 mb-2">↑</div>
                        <p className="text-muted mb-1">Drag and drop files here, or click to browse</p>
                        <p className="small text-muted">PDF only, max 10 MB</p>
                      </div>
                      <p className="small fw-medium text-secondary mb-2">
                        Required justification for rejecting the recommendation <span className="text-danger">*</span>
                      </p>
                      <textarea className="form-control mb-3" rows={4} placeholder="Explain why you are disagreeing with the ALJ's recommendation..." />
                      <button className="btn text-white" style={{ backgroundColor: "#fd7e14" }}>Upload Final Ruling & Mark as Final</button>
                    </div>
                  )}

                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/portal')}>Cancel</button>
                    <button className="btn btn-primary">Submit Final Decision</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "case-details" && (
          <div className="text-center py-5 text-muted">Case Details content would go here</div>
        )}
        {activeTab === "participants" && (
          <div className="text-center py-5 text-muted">Participants content would go here</div>
        )}
        {activeTab === "submissions" && (
          <div className="text-center py-5 text-muted">Submissions and Requests content would go here</div>
        )}
        {activeTab === "docket" && (
          <div className="text-center py-5 text-muted">Docket content would go here</div>
        )}

        {/* Footer Info Banner */}
        {activeTab === "ruling" && (
          <div className="mt-4 alert alert-info d-flex align-items-center gap-2">
            <span className="text-primary">ℹ️</span>
            <p className="small text-secondary mb-0">
              This recommended decision has been routed to you as Final Decision Maker. Approve it to generate a Final Ruling Report, or upload your own final ruling if you disagree.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-white py-3 px-4 mt-auto" style={{ backgroundColor: "#0f2a4e" }}>
        <div className="d-flex align-items-center justify-content-between">
          <p className="small mb-0">© 2024 Case Management System. All rights reserved.</p>
          <div className="d-flex gap-3 small">
            <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none">Terms of Service</a>
            <a href="#" className="text-white text-decoration-none">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TesScreen;
