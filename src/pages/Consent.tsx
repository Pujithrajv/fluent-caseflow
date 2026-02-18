import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Consent = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate();

  const handleAcceptAndContinue = () => {
    if (termsAccepted) navigate("/portal");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#F7F7F7" }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="mb-4">
              <i className="bi bi-shield-lock fs-3 text-secondary"></i>
            </div>
            <h1 className="h5 fw-semibold mb-4">Terms and Consent</h1>

            {/* Terms of Service */}
            <div className="mb-3">
              <button
                className="btn btn-light w-100 d-flex justify-content-between align-items-center"
                onClick={() => setTermsOpen(!termsOpen)}
              >
                <span className="fw-medium">Terms of Service</span>
                <i className={`bi bi-chevron-${termsOpen ? 'up' : 'down'}`}></i>
              </button>
              {termsOpen && (
                <div className="border rounded p-3 mt-2 small text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              )}
            </div>

            {/* Privacy Policy */}
            <div className="mb-4">
              <button
                className="btn btn-light w-100 d-flex justify-content-between align-items-center"
                onClick={() => setPrivacyOpen(!privacyOpen)}
              >
                <span className="fw-medium">Privacy Policy Summary</span>
                <i className={`bi bi-chevron-${privacyOpen ? 'up' : 'down'}`}></i>
              </button>
              {privacyOpen && (
                <div className="border rounded p-3 mt-2 small text-muted">
                  <ul className="mb-0">
                    <li>We collect minimal personal information necessary for service provision</li>
                    <li>Your data is encrypted and stored securely using industry standards</li>
                    <li>We do not share your information with third parties without consent</li>
                    <li>You have the right to access, modify, or delete your data at any time</li>
                    <li>Cookies are used only for essential functionality and analytics</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Consent Checkboxes */}
            <div className="mb-4">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms-consent"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="terms-consent">
                  I agree to the{" "}
                  <button className="btn btn-link btn-sm p-0 text-decoration-underline" onClick={() => setShowTermsModal(true)}>Terms of Service</button>
                  {" "}and{" "}
                  <button className="btn btn-link btn-sm p-0 text-decoration-underline" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>.
                  <span className="text-danger"> *</span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="email-notifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="email-notifications">
                  I agree to receive email notifications about account activity and important updates.
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                onClick={handleAcceptAndContinue}
                disabled={!termsAccepted}
              >
                Accept and Continue →
              </button>
              <button className="btn btn-light" onClick={() => navigate("/login")}>
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Terms of Service</h5>
                  <button type="button" className="btn-close" onClick={() => setShowTermsModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="small text-muted">Full terms of service would be displayed here in a real application.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Privacy Policy</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPrivacyModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="small text-muted">Full privacy policy would be displayed here in a real application.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Consent;
