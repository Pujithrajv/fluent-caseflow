import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FileText, Send, Clock, CheckCircle, AlertCircle, FileUp, Download, Plus, User, Calendar, Edit, XCircle, RefreshCw, ChevronRight, Eye } from "lucide-react";

const BPFStage = ({ label, isActive, isCompleted, onClick }: { label: string; isActive: boolean; isCompleted: boolean; onClick?: () => void }) => (
  <div className={`flex-grow-1 d-flex align-items-center ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
    <div className={`d-flex align-items-center justify-content-center w-100 py-2 px-3 small fw-medium position-relative ${isActive ? 'bg-primary text-white' : isCompleted ? 'bg-success text-white' : 'bg-light text-secondary'}`}>
      {isCompleted && <CheckCircle size={16} className="me-2" />}
      {label}
    </div>
    <div style={{
      width: 0, height: 0,
      borderTop: "20px solid transparent", borderBottom: "20px solid transparent",
      borderLeft: `12px solid ${isActive ? '#0d6efd' : isCompleted ? '#198754' : '#e9ecef'}`
    }} />
  </div>
);

const RulingScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [bpfStage, setBpfStage] = useState(1);
  const [needsExtension, setNeedsExtension] = useState(false);
  const [meetsStatutory, setMeetsStatutory] = useState(true);
  const [readyForIssuance, setReadyForIssuance] = useState(false);
  const [recommendedVsFinal, setRecommendedVsFinal] = useState("");

  const caseData = {
    caseNumber: "DBE-2024-001-EC", caseName: "Grain Dealer and Warehouse Licensing - Kirby Neroni",
    caseType: "Grain Dealer and Warehouse Licensing", department: "Department of Agriculture",
    primaryParty: "Kirby Neroni", assignedALJ: "Hon. Sarah Mitchell", backupALJ: "Hon. James Rivera",
    deputyDirector: "Dr. Patricia Williams", decisionDueDate: "2025-01-15", daysRemaining: 12,
    rulingStage: "Writing", statusReason: "In Progress"
  };

  const rulingDocuments = [{ id: 1, name: "Ruling_Draft_v1.docx", type: "Word Document", version: "1.0", uploadedBy: "Hon. Sarah Mitchell", uploadedOn: "2024-12-10" }];
  const proofingTasks = [
    { id: 1, name: "Ruling report by ALJ", owner: "Hon. James Rivera", dueDate: "2024-12-18", status: "In Progress" },
    { id: 2, name: "Ruling report changes by backup ALJ", owner: "Hon. James Rivera", dueDate: "2024-12-19", status: "Pending" }
  ];
  const extensionRequests = [{ id: 1, requestedBy: "Hon. Sarah Mitchell", requestedOn: "2024-12-05", reason: "Additional evidence review required", meetsStatutory: "Yes", decision: "Approved", decisionBy: "Dr. Patricia Williams", decisionDate: "2024-12-06" }];
  const issuedDocuments = [{ id: 1, name: "Decision_Report.docx", type: "System Generated", generatedOn: "2024-12-14", status: "Ready" }];
  const timelineEvents = [
    { id: 1, text: "5-day deadline reminder sent to ALJ", date: "Dec 10, 2024 9:00 AM", icon: AlertCircle, colorClass: "text-warning" },
    { id: 2, text: "Proofing task created for Backup ALJ", date: "Dec 11, 2024 10:30 AM", icon: FileText, colorClass: "text-primary" },
    { id: 3, text: "Draft v2 uploaded by Backup ALJ", date: "Dec 12, 2024 2:15 PM", icon: FileUp, colorClass: "text-success" },
    { id: 4, text: "Stage advanced to Proofing", date: "Dec 12, 2024 3:00 PM", icon: RefreshCw, colorClass: "text-info" },
    { id: 5, text: "2-day proofing deadline reminder", date: "Dec 16, 2024 9:00 AM", icon: Clock, colorClass: "text-warning" }
  ];
  const bpfStages = [{ label: "Writing", stage: 1 }, { label: "Proofing", stage: 2 }, { label: "ALJ Review", stage: 3 }, { label: "Issuance", stage: 4 }, { label: "Completed", stage: 5 }];

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f3f2f1" }}>
      {/* Header */}
      <header className="text-white px-3 py-2 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#002050" }}>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm text-white" onClick={() => navigate('/portal')}><ArrowLeft size={16} className="me-1" /> Back</button>
          <div className="vr bg-white opacity-25" style={{ height: "24px" }}></div>
          <span className="fs-5 fw-semibold">ALJ Case Management</span>
          <ChevronRight size={16} className="text-white opacity-50" />
          <span className="small text-white opacity-75">Ruling</span>
        </div>
        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white small fw-medium" style={{ width: "32px", height: "32px" }}>SM</div>
      </header>

      {/* Command Bar */}
      <div className="bg-white border-bottom px-3 py-2 d-flex align-items-center gap-2 shadow-sm">
        <button className="btn btn-outline-primary btn-sm"><Save size={14} className="me-1" /> Save</button>
        <div className="vr"></div>
        <button className="btn btn-outline-secondary btn-sm"><FileText size={14} className="me-1" /> Create Ruling Report</button>
        <button className="btn btn-outline-secondary btn-sm"><Send size={14} className="me-1" /> Submit for Proofing</button>
        <button className="btn btn-outline-secondary btn-sm"><Clock size={14} className="me-1" /> Request Extension</button>
        <button className="btn btn-outline-secondary btn-sm"><CheckCircle size={14} className="me-1" /> Mark Ready</button>
        <button className="btn btn-outline-secondary btn-sm"><FileUp size={14} className="me-1" /> Issue Final Ruling</button>
        <button className="btn btn-outline-secondary btn-sm"><Eye size={14} className="me-1" /> Mark as Recommended</button>
      </div>

      {/* BPF */}
      <div className="bg-white border-bottom px-3 py-3">
        <div className="d-flex align-items-center" style={{ maxWidth: "800px" }}>
          {bpfStages.map((stage) => (
            <BPFStage key={stage.stage} label={stage.label} isActive={bpfStage === stage.stage} isCompleted={bpfStage > stage.stage} onClick={() => setBpfStage(stage.stage)} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex overflow-hidden">
        <div className="flex-grow-1 overflow-auto p-4">
          {/* Record Header */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h4 className="fw-semibold text-dark mb-1">{caseData.caseName}</h4>
                <p className="small text-muted mb-0">Case Number: {caseData.caseNumber}</p>
              </div>
              <div className="d-flex gap-2">
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary">{caseData.rulingStage}</span>
                <span className={`badge ${caseData.daysRemaining <= 5 ? 'bg-danger bg-opacity-10 text-danger border border-danger' : 'bg-success bg-opacity-10 text-success border border-success'}`}>
                  {caseData.daysRemaining} Days Remaining
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ul className="nav nav-tabs">
            {[
              { key: "summary", label: "Writing" }, { key: "proofing", label: "Proofing" },
              { key: "extensions", label: "Extensions & Compliance" }, { key: "issuance", label: "Issuance / Recommendation" }
            ].map(tab => (
              <li className="nav-item" key={tab.key}>
                <button className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
              </li>
            ))}
          </ul>

          <div className="bg-white border border-top-0 p-4">
            {/* Writing Tab */}
            {activeTab === "summary" && (
              <>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Assigned</h6></div>
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-6">
                            <label className="form-label small text-muted">Assigned ALJ</label>
                            <div className="d-flex align-items-center p-2 bg-light rounded border"><User size={14} className="text-muted me-2" /><span className="small">{caseData.assignedALJ}</span></div>
                          </div>
                          <div className="col-6">
                            <label className="form-label small text-muted">Backup ALJ</label>
                            <div className="d-flex align-items-center p-2 bg-light rounded border"><User size={14} className="text-muted me-2" /><span className="small">{caseData.backupALJ}</span></div>
                          </div>
                          <div className="col-12">
                            <label className="form-label small text-muted">Deputy Director / Bureau Chief</label>
                            <div className="d-flex align-items-center p-2 bg-light rounded border"><User size={14} className="text-muted me-2" /><span className="small">{caseData.deputyDirector}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Deadlines</h6></div>
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-6">
                            <label className="form-label small text-muted">Decision Due Date</label>
                            <div className="d-flex align-items-center p-2 bg-light rounded border"><Calendar size={14} className="text-muted me-2" /><span className="small">{caseData.decisionDueDate}</span></div>
                          </div>
                          <div className="col-6">
                            <label className="form-label small text-muted">Days Remaining</label>
                            <div className={`d-flex align-items-center p-2 rounded border ${caseData.daysRemaining <= 5 ? 'bg-danger bg-opacity-10 border-danger' : 'bg-success bg-opacity-10 border-success'}`}>
                              <Clock size={14} className={`me-2 ${caseData.daysRemaining <= 5 ? 'text-danger' : 'text-success'}`} />
                              <span className={`small fw-medium ${caseData.daysRemaining <= 5 ? 'text-danger' : 'text-success'}`}>{caseData.daysRemaining} days</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <label className="form-label small text-muted">Ruling Stage</label>
                            <select className="form-select form-select-sm" defaultValue={caseData.rulingStage}>
                              <option>Writing</option><option>Proofing</option><option>ALJ Review</option><option>Issuance</option><option>Completed</option>
                            </select>
                          </div>
                          <div className="col-6">
                            <label className="form-label small text-muted">Status Reason</label>
                            <select className="form-select form-select-sm" defaultValue={caseData.statusReason}>
                              <option>In Progress</option><option>On Hold</option><option>Pending Review</option><option>Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Issued Documents */}
                <div className="card border mt-4">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Issued Documents</h6></div>
                  <div className="card-body p-0">
                    <table className="table table-sm mb-0">
                      <thead className="table-light"><tr><th className="small">Document Name</th><th className="small">Type</th><th className="small">Generated On</th><th className="small">Status</th><th className="small">Actions</th></tr></thead>
                      <tbody>
                        {issuedDocuments.map(doc => (
                          <tr key={doc.id}>
                            <td className="small fw-medium text-primary">{doc.name}</td>
                            <td className="small">{doc.type}</td>
                            <td className="small">{doc.generatedOn}</td>
                            <td><span className="badge bg-success bg-opacity-10 text-success border border-success">{doc.status}</span></td>
                            <td><button className="btn btn-sm btn-link p-0"><Download size={14} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Proofing Tab */}
            {activeTab === "proofing" && (
              <>
                <div className="card border mb-4">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Proofing Status</h6></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label small text-muted">Proofing Due Date</label>
                        <input className="form-control form-control-sm bg-light" value="Dec 18, 2024" readOnly />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small text-muted">Proofing Status</label>
                        <select className="form-select form-select-sm" defaultValue="in-progress">
                          <option value="draft">Draft</option><option value="in-progress">In Progress</option><option value="completed">Completed</option><option value="overdue">Overdue</option>
                        </select>
                      </div>
                      <div className="col-md-4 d-flex align-items-end">
                        <button className="btn btn-primary btn-sm"><CheckCircle size={14} className="me-1" /> Submit Proofing Completed</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Proofing Tasks</h6></div>
                  <div className="card-body p-0">
                    <table className="table table-sm mb-0">
                      <thead className="table-light"><tr><th className="small">Task Name</th><th className="small">Owner (Backup ALJ)</th><th className="small">Due Date</th><th className="small">Status</th><th className="small">Actions</th></tr></thead>
                      <tbody>
                        {proofingTasks.map(task => (
                          <tr key={task.id}>
                            <td className="small fw-medium text-primary">{task.name}</td>
                            <td className="small">{task.owner}</td>
                            <td className="small">{task.dueDate}</td>
                            <td><span className={`badge ${task.status === "In Progress" ? 'bg-primary bg-opacity-10 text-primary' : 'bg-secondary bg-opacity-10 text-secondary'}`}>{task.status}</span></td>
                            <td><button className="btn btn-sm btn-link p-0"><Edit size={14} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Extensions Tab */}
            {activeTab === "extensions" && (
              <>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Extension Request Details</h6></div>
                      <div className="card-body">
                        <div className="form-check form-switch mb-3">
                          <input className="form-check-input" type="checkbox" checked={needsExtension} onChange={() => setNeedsExtension(!needsExtension)} />
                          <label className="form-check-label small">Needs Extension?</label>
                        </div>
                        {needsExtension && (
                          <div className="mb-3">
                            <label className="form-label small text-muted">Extension Justification</label>
                            <textarea className="form-control form-control-sm" rows={4} placeholder="Provide justification..." />
                          </div>
                        )}
                        <div>
                          <label className="form-label small text-muted">New Ruling Due Date</label>
                          <input type="date" className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Statutory Compliance</h6></div>
                      <div className="card-body">
                        <div className="form-check form-switch mb-3">
                          <input className="form-check-input" type="checkbox" checked={meetsStatutory} onChange={() => setMeetsStatutory(!meetsStatutory)} />
                          <label className="form-check-label small">Meets Statutory Requirements?</label>
                        </div>
                        {!meetsStatutory && (
                          <div className="alert alert-warning py-2">
                            <div className="d-flex align-items-center"><AlertCircle size={14} className="me-2" /><span className="small fw-medium">Escalation Required</span></div>
                            <p className="small mb-0 mt-1">This case requires Deputy Director override for deadline modification.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border mb-4">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Extension Requests History</h6></div>
                  <div className="card-body p-0">
                    <table className="table table-sm mb-0">
                      <thead className="table-light"><tr><th className="small">Requested By</th><th className="small">Requested On</th><th className="small">Reason</th><th className="small">Meets Statutory</th><th className="small">Decision</th><th className="small">Decision By</th><th className="small">Decision Date</th></tr></thead>
                      <tbody>
                        {extensionRequests.map(req => (
                          <tr key={req.id}>
                            <td className="small">{req.requestedBy}</td><td className="small">{req.requestedOn}</td><td className="small">{req.reason}</td><td className="small">{req.meetsStatutory}</td>
                            <td><span className="badge bg-success bg-opacity-10 text-success">{req.decision}</span></td>
                            <td className="small">{req.decisionBy}</td><td className="small">{req.decisionDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card border">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Director Override</h6></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4"><label className="form-label small text-muted">Modify Ruling Deadline</label><input type="date" className="form-control form-control-sm" /></div>
                      <div className="col-md-4">
                        <label className="form-label small text-muted">Reason</label>
                        <select className="form-select form-select-sm"><option value="">Select reason...</option><option>Case Complexity</option><option>Additional Evidence Required</option><option>Party Request</option><option>Other</option></select>
                      </div>
                      <div className="col-md-4"><label className="form-label small text-muted">Additional Notes</label><input className="form-control form-control-sm" placeholder="Optional notes..." /></div>
                    </div>
                    <button className="btn btn-sm text-white mt-3" style={{ backgroundColor: "#7c3aed" }}>Apply Override</button>
                  </div>
                </div>
              </>
            )}

            {/* Issuance Tab */}
            {activeTab === "issuance" && (
              <>
                <div className="card border mb-4">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Issuance Settings</h6></div>
                  <div className="card-body">
                    <div className="row g-3 align-items-end">
                      <div className="col-md-4">
                        <div className="form-check form-switch p-3 border rounded">
                          <input className="form-check-input" type="checkbox" checked={readyForIssuance} onChange={() => setReadyForIssuance(!readyForIssuance)} />
                          <label className="form-check-label small">Ready for Issuance</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small text-muted">Recommended vs Final</label>
                        <select className="form-select form-select-sm" value={recommendedVsFinal} onChange={(e) => setRecommendedVsFinal(e.target.value)}>
                          <option value="">Select type...</option><option value="recommended">Recommended Decision</option><option value="final">Final Ruling</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        {recommendedVsFinal === "recommended" && <button className="btn btn-primary btn-sm"><FileText size={14} className="me-1" /> Generate Recommended Docs</button>}
                        {recommendedVsFinal === "final" && <button className="btn btn-success btn-sm"><FileText size={14} className="me-1" /> Generate Final Ruling</button>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border">
                  <div className="card-header bg-light py-2"><h6 className="small fw-medium text-secondary mb-0">Issued Documents</h6></div>
                  <div className="card-body p-0">
                    <table className="table table-sm mb-0">
                      <thead className="table-light"><tr><th className="small">Document Name</th><th className="small">Type</th><th className="small">Generated On</th><th className="small">Status</th><th className="small">Actions</th></tr></thead>
                      <tbody>
                        {issuedDocuments.map(doc => (
                          <tr key={doc.id}>
                            <td className="small fw-medium text-primary">{doc.name}</td><td className="small">{doc.type}</td><td className="small">{doc.generatedOn}</td>
                            <td><span className="badge bg-success bg-opacity-10 text-success">{doc.status}</span></td>
                            <td><button className="btn btn-sm btn-link p-0"><Download size={14} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Timeline Panel */}
        <div className="bg-white border-start p-3 overflow-auto" style={{ width: "300px" }}>
          <h6 className="fw-semibold text-dark mb-3">Activity Timeline</h6>
          <div className="position-relative">
            {timelineEvents.map((event, idx) => (
              <div key={event.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                <div className={`${event.colorClass}`}><event.icon size={16} /></div>
                <div>
                  <p className="small mb-0">{event.text}</p>
                  <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulingScreen;
