import { useState } from "react";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RequestSelectionTab } from "@/components/portal/wizard/RequestSelectionTab";
import { SelectedSubprocessDetailsTab } from "@/components/portal/wizard/SelectedSubprocessDetailsTab";
import { DocumentUploadTab } from "@/components/portal/wizard/DocumentUploadTab";
import { RequestReviewSubmitTab } from "@/components/portal/wizard/RequestReviewSubmitTab";

const requestTabs = [
  { id: 'request', title: 'Request', description: 'Request group and type' },
  { id: 'details', title: 'Selected Subprocess Details', description: 'Request specific details' },
  { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
  { id: 'review', title: 'Review & Submit', description: 'Verify and submit request' }
];

const faqData: Record<string, { id: string; question: string; answer: string }[]> = {
  request: [
    { id: "req-1", question: "How do I select the correct request type?", answer: "Choose the request type that best matches your specific need." },
    { id: "req-2", question: "What should I include in the request summary?", answer: "Provide a clear, concise summary of what you're requesting and why." }
  ],
  details: [
    { id: "details-1", question: "Why do I need to provide specific details?", answer: "Different request types require specific information for proper processing." }
  ],
  documents: [
    { id: "docs-1", question: "What types of documents can I upload?", answer: "You can upload PDFs, Word documents, images (JPEG, PNG), and other standard file formats. Each file should be under 10MB." },
    { id: "docs-2", question: "Are documents required for all requests?", answer: "Document requirements vary by request type." }
  ],
  review: [
    { id: "review-1", question: "What happens after I submit my request?", answer: "Your request will be reviewed and processed according to the type and priority." },
    { id: "review-2", question: "Can I edit my request after submission?", answer: "Limited changes may be possible depending on the processing status." }
  ]
};

interface RequestData {
  requestGroup?: string;
  requestType?: string;
  details?: any;
  documents?: any[];
}

const RequestWizard = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("request");
  const [formData, setFormData] = useState<RequestData>({});
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const [showFaq, setShowFaq] = useState(false);

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const markTabCompleted = (tabId: string) => {
    setCompletedTabs(prev => prev.includes(tabId) ? prev : [...prev, tabId]);
  };

  const isTabCompleted = (tabId: string) => completedTabs.includes(tabId);

  const handleSubmit = () => {
    toast({ title: "Request Submitted", description: "Your request has been submitted successfully and will be reviewed." });
    navigate(`/attorney/case/${caseId}`);
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container" style={{ maxWidth: "1140px" }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <img src="/lovable-uploads/ecada5cc-ee5a-4470-8e12-b8bb75355c68.png" alt="Illinois Bureau of Administrative Hearings" style={{ height: "64px" }} className="object-fit-contain" />
            <div>
              <h1 className="h3 fw-semibold text-dark mb-0">New Request</h1>
              <p className="text-muted small mb-0">Complete all sections to create your request</p>
            </div>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(`/attorney/case/${caseId}`)}>
            <ArrowLeft size={16} className="me-1" /> Back to Case
          </button>
        </div>

        {/* Vertical Tabs Layout */}
        <div className="row g-4">
          {/* Left Sidebar */}
          <div className="col-md-4 col-lg-3">
            <div className="card shadow-sm">
              <div className="card-body p-3">
                <div className="d-grid gap-2">
                  {requestTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`btn text-start d-flex justify-content-between align-items-center py-3 px-3 ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => { setActiveTab(tab.id); markTabCompleted(tab.id); }}
                    >
                      <div>
                        <div className="fw-medium">{tab.title}</div>
                        <div className="small opacity-75">{tab.description}</div>
                      </div>
                      {isTabCompleted(tab.id) && (
                        <span className="badge bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "20px", height: "20px" }}>
                          <Check size={12} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="col-md-8 col-lg-9">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-0 fw-semibold">{requestTabs.find(t => t.id === activeTab)?.title}</h5>
                  <p className="text-muted small mb-0">{requestTabs.find(t => t.id === activeTab)?.description}</p>
                </div>
                <button className="btn btn-link text-muted p-0" onClick={() => setShowFaq(!showFaq)}>
                  <HelpCircle size={20} />
                </button>
              </div>
              <div className="card-body p-4 bg-white">
                {/* FAQ Panel */}
                {showFaq && (
                  <div className="alert alert-info mb-4">
                    <h6 className="fw-semibold mb-2">{requestTabs.find(t => t.id === activeTab)?.title} Help</h6>
                    <div className="accordion accordion-flush" id="faqAccordion">
                      {faqData[activeTab]?.map((faq) => (
                        <div className="accordion-item" key={faq.id}>
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed small" type="button" data-bs-toggle="collapse" data-bs-target={`#${faq.id}`}>
                              {faq.question}
                            </button>
                          </h2>
                          <div id={faq.id} className="accordion-collapse collapse">
                            <div className="accordion-body small">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'request' && (
                  <RequestSelectionTab data={formData} onDataChange={updateFormData} onComplete={() => markTabCompleted('request')} />
                )}
                {activeTab === 'details' && (
                  <SelectedSubprocessDetailsTab data={formData} onDataChange={updateFormData} onComplete={() => markTabCompleted('details')} />
                )}
                {activeTab === 'documents' && (
                  <DocumentUploadTab data={formData} onDataChange={updateFormData} />
                )}
                {activeTab === 'review' && (
                  <RequestReviewSubmitTab data={formData} onSubmit={handleSubmit} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between pt-4 pb-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate(`/attorney/case/${caseId}`)}>
            <ArrowLeft size={16} className="me-1" /> Back to Case
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">Save Draft</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Check size={16} className="me-1" /> Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestWizard;
