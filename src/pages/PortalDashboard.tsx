import { useNavigate } from "react-router-dom";
import { AljWarningModal } from "@/components/portal/AljWarningModal";

const PortalDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AljWarningModal onAcknowledge={() => {}} />
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#F7F7F7" }}>
        <div style={{ maxWidth: '28rem', width: '100%' }}>
          <div className="card shadow-sm text-center">
            <div className="card-body p-4">
              <div className="mb-4">
                <i className="bi bi-shield-lock fs-1 text-secondary"></i>
              </div>
              <h1 className="h4 fw-semibold mb-3">Welcome to the Portal Dashboard</h1>
              <p className="text-muted mb-4">
                You have successfully signed in and accepted the terms and conditions.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary w-100"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalDashboard;
