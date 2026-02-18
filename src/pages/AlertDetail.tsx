import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export const AlertDetail: React.FC = () => {
  const navigate = useNavigate();
  const { alertId } = useParams();
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const alertData = {
    id: alertId, caseNumber: 'DBE-2025-001', caseType: 'Abandoned Well',
    department: 'Department of Natural Resources', status: 'Returned for Correction',
    alertTitle: 'Case Returned for Correction', triggeredBy: 'Sarah Johnson',
    rejectionDate: 'March 15, 2025',
    reasonForReturn: 'The submitted case documentation is incomplete. The required "Well Records of Inspector" document is missing from the submission. Additionally, the property boundary description in Section 3 appears to have formatting errors.',
    requiredAction: 'Upload missing "Well Records of Inspector" document and re-verify case details before resubmission.',
    assignedTo: 'John Doe'
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    setTimeout(() => navigate('/portal'), 1500);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <div className="container py-4" style={{ maxWidth: '960px' }}>
        <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={() => navigate('/portal')}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>

        {/* Header Card */}
        <div className="card shadow-sm border-0 mb-4" style={{ borderLeft: '4px solid #dc3545' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="h4 fw-bold d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-exclamation-triangle text-danger"></i> Alert Details
                </h2>
                <div className="small text-muted">
                  <p className="mb-1"><strong>Case:</strong> {alertData.caseNumber}</p>
                  <p className="mb-1"><strong>Case Type:</strong> {alertData.caseType}</p>
                  <p className="mb-1"><strong>Department:</strong> {alertData.department}</p>
                  <p className="mb-0"><strong>Status:</strong> <span className="badge bg-danger">{alertData.status}</span></p>
                </div>
              </div>
              {isAcknowledged && <span className="badge bg-success">Alert Acknowledged</span>}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="mb-4">
              <h6 className="text-muted small fw-semibold mb-1">Alert Title</h6>
              <p className="fs-5 fw-medium">{alertData.alertTitle}</p>
            </div>
            <div className="mb-4">
              <h6 className="text-muted small fw-semibold mb-1">Triggered By</h6>
              <p><i className="bi bi-person me-1"></i> {alertData.triggeredBy} (Clerk)</p>
            </div>
            <div className="mb-4">
              <h6 className="text-muted small fw-semibold mb-1">Date</h6>
              <p><i className="bi bi-calendar3 me-1"></i> {alertData.rejectionDate}</p>
            </div>
            <div className="mb-4">
              <h6 className="text-muted small fw-semibold mb-1">Reason for Return</h6>
              <div className="alert alert-danger">{alertData.reasonForReturn}</div>
            </div>
            <div className="d-flex gap-3 pt-3 border-top">
              <button className="btn btn-primary flex-fill" onClick={() => navigate(`/case/${alertData.caseNumber}`)}>Open Case</button>
              <button className="btn btn-outline-secondary flex-fill" onClick={handleAcknowledge} disabled={isAcknowledged}>
                {isAcknowledged ? 'Acknowledged ✓' : 'Acknowledge Alert'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
