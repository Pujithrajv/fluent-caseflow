import { Header } from "@/components/shared/Header";
import { useState } from "react";
import { FileText, MessageSquare, HandMetal, HelpCircle } from "lucide-react";

const MotionDetails = () => {
  const [activeTab, setActiveTab] = useState("motion-details");

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <div className="container-xl px-4 py-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h3 fw-semibold text-dark mb-2">Discovery: Deposition</h1>
            <nav aria-label="breadcrumb" className="mb-2">
              <ol className="breadcrumb small">
                <li className="breadcrumb-item"><a href="#" className="text-primary">Cases</a></li>
                <li className="breadcrumb-item"><a href="#" className="text-primary">DBE-EC-02025-004</a></li>
                <li className="breadcrumb-item"><a href="#" className="text-primary">Discovery</a></li>
                <li className="breadcrumb-item active">Response</li>
              </ol>
            </nav>
            <span className="badge bg-primary">Awaiting Response</span>
          </div>
          <div className="d-flex gap-3">
            <div className="card" style={{ width: "250px" }}>
              <div className="card-header py-2"><h6 className="card-title small fw-semibold mb-0">Requesting Party</h6></div>
              <div className="card-body small py-2">
                <p className="text-muted mb-0">Department of Natural Resources</p>
                <p className="mb-0">First Party: <strong>Complainant</strong></p>
                <p className="mb-0">Dept#: <strong>S14-7311-0025</strong></p>
              </div>
            </div>
            <div className="card" style={{ width: "250px" }}>
              <div className="card-header py-2"><h6 className="card-title small fw-semibold mb-0">Responding Party</h6></div>
              <div className="card-body small py-2">
                <p className="text-muted mb-0">Tommy Welldorf</p>
                <p className="mb-0">Second Party: <strong>Respondent</strong></p>
                <p className="mb-0">Attorney: <strong>Dell Spington</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-0">
          <li className="nav-item">
            <button className={`nav-link d-flex align-items-center gap-1 ${activeTab === "motion-details" ? "active" : ""}`} onClick={() => setActiveTab("motion-details")}>
              <FileText size={16} /> Discovery Details
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link d-flex align-items-center gap-1 ${activeTab === "request" ? "active" : ""}`} onClick={() => setActiveTab("request")}>
              <MessageSquare size={16} /> Request
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link d-flex align-items-center gap-1 ${activeTab === "response" ? "active" : ""}`} onClick={() => setActiveTab("response")}>
              <HandMetal size={16} /> Response
            </button>
          </li>
        </ul>

        {/* Discovery Details Tab */}
        {activeTab === "motion-details" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border">
                  <div className="card-header bg-white"><h6 className="card-title mb-0 d-flex align-items-center gap-2"><FileText size={16} className="text-primary" /> Request Information</h6></div>
                  <div className="card-body">
                    <div className="mb-3"><p className="small fw-semibold text-muted mb-1">Request Group</p><p className="mb-0">Discovery</p></div>
                    <div className="mb-3"><p className="small fw-semibold text-muted mb-1">Request Type</p><p className="mb-0">Deposition</p></div>
                    <div><p className="small fw-semibold text-muted mb-1">Request Summary</p><p className="text-muted small lh-lg mb-0">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="card-header bg-white"><h6 className="card-title mb-0">Deposition Questions / Motion to Compel Discovery Questions</h6></div>
                  <div className="card-body">
                    <div className="mb-3"><p className="small fw-semibold text-muted mb-1">What did you ask the other side to give you?</p><p className="mb-0">jane doe 7894561230 janedoe@gmail.com</p></div>
                    <div className="mb-3"><p className="small fw-semibold text-muted mb-1">Why is their deposition necessary?</p><p className="mb-0">Other (please explain)</p></div>
                    <div><p className="small fw-semibold text-muted mb-1">Can testimony be gotten by interrogatories?</p><p className="mb-0">Yes</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Tab */}
        {activeTab === "request" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card border">
                  <div className="card-header bg-white py-2"><h6 className="card-title mb-0 d-flex align-items-center gap-2"><FileText size={16} className="text-primary" /> Request Details</h6></div>
                  <div className="card-body small">
                    <div className="mb-3">
                      <p className="fw-semibold mb-2">Requesting Party</p>
                      <p className="text-muted mb-0">Department of Natural Resources</p>
                      <p className="mb-0">First Party: <strong>Complainant</strong></p>
                      <p className="mb-0">Case Manager: <strong>Fred Appleton</strong></p>
                      <p className="mb-0">General Counsel: <strong>Bob Standishn</strong></p>
                      <p className="mb-0">Case Coordinator: <strong>Dell Spington</strong></p>
                      <p className="mb-0">Decision Maker: <strong>Sara Mc Murry</strong></p>
                    </div>
                    <div className="mb-2"><p className="fw-semibold mb-0">Requesting Party Due Date</p><p className="mb-0">November 13, 2025</p></div>
                    <div><p className="fw-semibold mb-0">ALJ Ruling Date</p><p className="mb-0">November 24, 2025</p></div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card border">
                  <div className="card-header bg-white py-2"><h6 className="card-title mb-0 d-flex align-items-center gap-2"><MessageSquare size={16} className="text-primary" /> Request</h6></div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Comments</label>
                      <textarea className="form-control" rows={4} placeholder="Enter notes" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Document Upload</label>
                      <div className="border border-2 border-dashed rounded p-5 text-center">
                        <p className="fw-medium mb-1">Drag and drop files here, or click to browse</p>
                        <p className="small text-muted mb-2">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
                        <button className="btn btn-outline-secondary btn-sm">Browse Files</button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Request Documents</label>
                      <table className="table table-sm table-bordered">
                        <thead className="table-light">
                          <tr><th className="small">Document Name</th><th className="small">Type</th><th className="small">Uploaded By</th><th className="small">Upload Date</th><th className="small">Actions</th></tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "17AC23-Compel-Discovery.pdf", type: "Attorney Motion Request", by: "Bob Standish", date: "2025-10-15" },
                            { name: "Additional_Documentation.pdf", type: "Supporting Evidence", by: "Sara Mc Murry", date: "2025-10-15" },
                            { name: "Motion-to-Compel-Discovery.pdf", type: "System Generated", by: "CMS System", date: "2025-10-15" },
                            { name: "Sequential-Briefing-Schedule-Order.pdf", type: "System Generated", by: "CMS System", date: "2025-10-15" }
                          ].map((doc, i) => (
                            <tr key={i}>
                              <td className="small"><a href="#" className="text-primary">{doc.name}</a></td>
                              <td className="small">{doc.type}</td>
                              <td className="small">{doc.by}</td>
                              <td className="small">{doc.date}</td>
                              <td className="small"><button className="btn btn-sm btn-link p-0"><FileText size={14} /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <label className="form-label small fw-semibold">Request Completed On</label>
                      <input type="text" className="form-control form-control-sm" placeholder="mm/dd/yyyy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response Tab */}
        {activeTab === "response" && (
          <div className="bg-white border border-top-0 p-4">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card border">
                  <div className="card-header bg-white py-2"><h6 className="card-title mb-0 d-flex align-items-center gap-2"><FileText size={16} className="text-primary" /> Response Details</h6></div>
                  <div className="card-body small">
                    <div className="mb-3">
                      <p className="fw-semibold mb-2">Responding Party</p>
                      <p className="text-muted mb-0">Tommy Welldorf</p>
                      <p className="mb-0">Second Party: <strong>Respondent</strong></p>
                      <p className="mb-0">Attorney: <strong>Dell Spington</strong></p>
                    </div>
                    <div className="mb-2"><p className="fw-semibold mb-0">Responding Party Due Date</p><p className="mb-0">November 13, 2025</p></div>
                    <div><p className="fw-semibold mb-0">ALJ Ruling Date</p><p className="mb-0">November 24, 2025</p></div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card border">
                  <div className="card-header bg-white py-2"><h6 className="card-title mb-0 d-flex align-items-center gap-2"><MessageSquare size={16} className="text-primary" /> Response</h6></div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Comments</label>
                      <textarea className="form-control" rows={4} placeholder="Enter notes" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Document Upload</label>
                      <div className="border border-2 border-dashed rounded p-5 text-center">
                        <p className="fw-medium mb-1">Drag and drop files here, or click to browse</p>
                        <p className="small text-muted mb-2">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
                        <button className="btn btn-outline-secondary btn-sm">Browse Files</button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Response Documents</label>
                      <table className="table table-sm table-bordered">
                        <thead className="table-light">
                          <tr><th className="small">Document Name</th><th className="small">Type</th><th className="small">Uploaded By</th><th className="small">Upload Date</th><th className="small">Actions</th></tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Attorney-Response.pdf", type: "Attorney Motion Request", by: "Dell Spington", date: "2025-10-21" },
                            { name: "Support-Documentation.pdf", type: "Supporting Evidence", by: "Tommy Welldorf", date: "2025-10-25" }
                          ].map((doc, i) => (
                            <tr key={i}>
                              <td className="small"><a href="#" className="text-primary">{doc.name}</a></td>
                              <td className="small">{doc.type}</td>
                              <td className="small">{doc.by}</td>
                              <td className="small">{doc.date}</td>
                              <td className="small"><button className="btn btn-sm btn-link p-0"><FileText size={14} /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Response Complete</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="response-complete" />
                        <label className="form-check-label small" htmlFor="response-complete">Yes</label>
                      </div>
                    </div>
                    <div>
                      <label className="form-label small fw-semibold">Response Completed On</label>
                      <input type="text" className="form-control form-control-sm" placeholder="mm/dd/yyyy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotionDetails;
