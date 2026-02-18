import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";

const SignInSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Header showUserActions={false} />
      <div className="flex-grow-1 d-flex flex-column">
        <div className="container py-5">
          <div className="row justify-content-center g-4">
            {/* External Users */}
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <div className="fw-bold fs-2" style={{ color: '#1e3a8a' }}>
                      ILog<span style={{ color: '#2563eb' }}>i</span>n
                    </div>
                    <div className="mx-auto mt-n1" style={{ width: '2rem', height: '2rem', backgroundColor: '#1e3a8a', borderRadius: '0.25rem' }}></div>
                  </div>
                  <h2 className="h5 fw-semibold text-dark mb-4">External Users</h2>
                  <button
                    onClick={() => navigate("/login-external")}
                    className="btn btn-outline-secondary px-5 py-2 mb-3"
                  >
                    External User Sign-In
                  </button>
                  <p className="text-muted small">
                    For external stakeholders and public users
                  </p>
                </div>
              </div>
            </div>

            {/* State Users - Okta */}
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <div className="fw-bold fs-2" style={{ color: '#2563eb' }}>
                      okta
                    </div>
                  </div>
                  <h2 className="h5 fw-semibold text-dark mb-4">State Users Only</h2>
                  <button
                    onClick={() => navigate("/portal")}
                    className="btn btn-primary px-5 py-2 mb-3"
                  >
                    Sign in with Okta
                  </button>
                  <p className="text-muted small">
                    For employees and authorized state personnel only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="container pb-4">
          <div className="alert alert-danger" role="alert">
            <div className="fw-bold fs-5 mb-2">WARNING!</div>
            <p className="small mb-0">
              This system contains U.S Government information. By using this information system, you are consenting to system monitoring for law enforcement and other purposes. 
              Unauthorized or improper use of this system may subject you to state and federal criminal prosecution and penalties as well as state penalties. At any time, 
              the Government may intercept, search, and seize any communication or data transiting or stored on this information system. You may have access to or see confidential or 
              proprietary information or data (all hereinafter referred to as "Confidential Information"), such as national directory of new hire information, protected health information (HIPAA) 
              or Personally Identifiable Information. Authorized use of the ILogin client login is for customer application and case information and management. By clicking "ILogin" you 
              understand and agree that all such Confidential Information or data may not be released, copied or disclosed, in whole or in part, unless properly authorized by Illinois Bureau of 
              Administrative Hearings.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-top bg-white py-3 mt-auto">
          <div className="container d-flex justify-content-between align-items-center">
            <span className="small text-muted">© Copyright 2025. All rights reserved.</span>
            <div>
              <a href="#" className="small text-primary text-decoration-none me-3">Privacy Policy</a>
              <span className="text-muted">|</span>
              <a href="#" className="small text-primary text-decoration-none ms-3">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignInSelection;
