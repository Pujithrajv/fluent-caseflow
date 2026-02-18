import { useNavigate } from "react-router-dom";
import { useState } from "react";

const faqData = [
  { id: "faq-1", question: "How do I create a new case?", answer: "Click on the 'Create New Case' button in the top right corner of the dashboard. This will open the case wizard where you can enter all the required information step by step." },
  { id: "faq-2", question: "What information do I need to start a case?", answer: "You'll need department information, party details, case description, and any relevant documents. The wizard will guide you through each required field." },
  { id: "faq-3", question: "How can I track the status of my case?", answer: "All your cases are displayed on the main dashboard with their current status. You can also click 'View' on any case to see detailed progress information." },
  { id: "faq-4", question: "Can I edit a case after submission?", answer: "Draft cases can be edited freely. Once submitted, cases enter the review process and may have limited editing capabilities depending on the current stage." },
  { id: "faq-5", question: "How do I upload documents?", answer: "In the case wizard, there's a dedicated 'Documents' tab where you can upload all required files. Supported formats include PDF, DOC, DOCX, and image files." }
];

interface HeaderProps {
  showUserActions?: boolean;
}

export function Header({ showUserActions = true }: HeaderProps) {
  const navigate = useNavigate();
  const [showFaq, setShowFaq] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="container-fluid px-4 py-2">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-link text-white p-1 me-3"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <i className="bi bi-arrow-left fs-5"></i>
            </button>
            <img
              src="/lovable-uploads/cms-logo.png"
              alt="Illinois Department of Central Management Services"
              style={{ height: '3.5rem' }}
            />
          </div>

          {showUserActions && (
            <div className="d-flex align-items-center gap-2">
              {/* User dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-link text-white p-2"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', right: 60, top: 50 }}>
                    <button className="dropdown-item" onClick={() => { setShowUserMenu(false); }}>
                      <i className="bi bi-gear me-2"></i>Account Settings
                    </button>
                    <button className="dropdown-item" onClick={() => { setShowUserMenu(false); navigate("/profile"); }}>
                      <i className="bi bi-person me-2"></i>Profile
                    </button>
                    <button className="dropdown-item" onClick={() => { setShowUserMenu(false); navigate("/participants"); }}>
                      <i className="bi bi-people me-2"></i>Attorneys
                    </button>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item text-danger" onClick={() => { setShowUserMenu(false); navigate("/"); }}>
                      <i className="bi bi-box-arrow-right me-2"></i>Log Out
                    </button>
                  </div>
                )}
              </div>

              {/* FAQ button */}
              <button
                className="btn btn-link text-white p-2"
                onClick={() => setShowFaq(!showFaq)}
                aria-label="Help"
              >
                <i className="bi bi-question-circle fs-5"></i>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* FAQ Offcanvas */}
      {showFaq && (
        <>
          <div className="offcanvas-backdrop show" onClick={() => setShowFaq(false)}></div>
          <div className="offcanvas offcanvas-end show" tabIndex={-1} style={{ visibility: 'visible' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Frequently Asked Questions</h5>
              <button type="button" className="btn-close" onClick={() => setShowFaq(false)}></button>
            </div>
            <div className="offcanvas-body">
              <div className="accordion" id="faqAccordion">
                {faqData.map((faq) => (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${openFaqId !== faq.id ? 'collapsed' : ''}`}
                        type="button"
                        onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqId === faq.id ? 'show' : ''}`}>
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
