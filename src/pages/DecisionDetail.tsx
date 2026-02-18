import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useToast } from '@/hooks/use-toast';

export const DecisionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { decisionId } = useParams();
  const { toast } = useToast();
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const decisionData = {
    id: decisionId, caseNumber: 'CASE-2025-004', caseType: 'Food Safety — North District Foods',
    department: 'Department of Public Health', status: 'Decision Finalized',
    decisionTitle: 'Final Decision Issued', decidedBy: 'ALJ Rebecca Martinez',
    decisionDate: 'September 18, 2025',
    outcomeSummary: 'The ALJ has ruled in favor of the respondent and dismissed the complaint. After careful review of all evidence and testimony presented during the hearing, the Administrative Law Judge has determined that the Department of Public Health failed to establish a violation of food safety regulations by clear and convincing evidence.',
    actionRequired: 'Generate and send the Final Decision Report to all involved parties.',
    distributionList: [
      { role: 'Complainant', name: 'Department of Public Health', email: 'legal@health.state.gov' },
      { role: 'Respondent', name: 'North District Foods, Inc.', email: 'legal@northdistrictfoods.com' },
      { role: 'Complainant Counsel', name: 'Sarah Johnson, Esq.', email: 'sjohnson@stateattorney.gov' },
      { role: 'Respondent Counsel', name: 'Michael Chen, Esq.', email: 'mchen@defenselawfirm.com' }
    ]
  };

  const handleGenerateReport = () => {
    setIsReportGenerated(true);
    toast({ title: "Report Generated Successfully", description: "Final Decision Report has been generated and distributed.", duration: 3000 });
    setTimeout(() => navigate('/portal'), 2000);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <div className="container py-4" style={{ maxWidth: '960px' }}>
        <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={() => navigate('/portal')}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>

        <div className="card shadow-sm border-0 mb-4" style={{ borderLeft: '4px solid #0d6efd' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="h4 fw-bold d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-briefcase text-primary"></i> Decision Details
                </h2>
                <div className="small text-muted">
                  <p className="mb-1"><strong>Case:</strong> {decisionData.caseNumber}</p>
                  <p className="mb-1"><strong>Case Type:</strong> {decisionData.caseType}</p>
                  <p className="mb-1"><strong>Department:</strong> {decisionData.department}</p>
                  <p className="mb-0"><strong>Status:</strong> <span className="badge bg-primary">{decisionData.status}</span></p>
                </div>
              </div>
              {isReportGenerated && <span className="badge bg-success">✓ Report Generated</span>}
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="mb-4"><h6 className="text-muted small fw-semibold mb-1">Decision Title</h6><p className="fs-5 fw-medium">{decisionData.decisionTitle}</p></div>
            <div className="mb-4"><h6 className="text-muted small fw-semibold mb-1">Decided By</h6><p><i className="bi bi-person me-1"></i> {decisionData.decidedBy}</p></div>
            <div className="mb-4"><h6 className="text-muted small fw-semibold mb-1">Date of Decision</h6><p><i className="bi bi-calendar3 me-1"></i> {decisionData.decisionDate}</p></div>
            <div className="mb-4"><h6 className="text-muted small fw-semibold mb-1">Outcome Summary</h6><div className="alert alert-info">{decisionData.outcomeSummary}</div></div>
            <div className="mb-4"><h6 className="text-muted small fw-semibold mb-1">Action Required</h6><div className="alert alert-warning">{decisionData.actionRequired}</div></div>
            <div className="mb-4">
              <h6 className="text-muted small fw-semibold mb-2">Distribution List</h6>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr><th className="small">Role</th><th className="small">Name</th><th className="small">Email</th></tr>
                  </thead>
                  <tbody>
                    {decisionData.distributionList.map((party, index) => (
                      <tr key={index}><td className="small fw-medium">{party.role}</td><td className="small">{party.name}</td><td className="small text-muted"><i className="bi bi-envelope me-1"></i>{party.email}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex gap-3 pt-3 border-top">
              <button className="btn btn-primary flex-fill" onClick={handleGenerateReport} disabled={isReportGenerated}>
                <i className="bi bi-file-earmark-text me-1"></i> {isReportGenerated ? 'Report Generated ✓' : 'Generate Final Report'}
              </button>
              <button className="btn btn-outline-secondary flex-fill" onClick={() => navigate(`/case/${decisionData.caseNumber}`)}>View Case</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
