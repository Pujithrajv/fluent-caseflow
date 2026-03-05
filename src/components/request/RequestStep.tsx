import { useState } from "react";
import { Info, AlertCircle } from "lucide-react";
import { RequestData } from "@/pages/DemoRequestWizard";

interface RequestStepProps {
  data: RequestData;
  onNext: (data: Partial<RequestData>) => void;
}

const discoveryTypes = [
  { id: "Interrogatories", label: "Interrogatories" },
  { id: "Deposition", label: "Deposition" },
  { id: "Inspection", label: "Inspection" }
];

const subpoenaTypes = [
  { id: "Subpoena ad testificandum", label: "Subpoena ad testificandum" },
  { id: "Subpoena duces tecum", label: "Subpoena duces tecum" }
];

export function RequestStep({ data, onNext }: RequestStepProps) {
  const [requestGroup, setRequestGroup] = useState<RequestData["requestGroup"]>(data.requestGroup);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.selectedRequestTypes);
  const [summary, setSummary] = useState(data.summary);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useOwnDocuments, setUseOwnDocuments] = useState(false);
  const [responseRequired, setResponseRequired] = useState<string[]>([]);

  const discoveryEnabled = true;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleResponseToggle = (value: string) => {
    setResponseRequired(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!requestGroup) newErrors.requestGroup = "Please select a Filing Group";
    if (requestGroup === "Discovery" && !discoveryEnabled) {
      newErrors.discovery = "Discovery has not been authorized for this case";
      setErrors(newErrors);
      return;
    }
    if (requestGroup === "Discovery" && selectedTypes.length === 0) newErrors.requestTypes = "Select at least one Discovery Type";
    if (requestGroup === "Subpoenas" && selectedTypes.length === 0) newErrors.requestTypes = "Select at least one Subpoena Type";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onNext({ requestGroup, selectedRequestTypes: selectedTypes, summary });
  };

  return (
    <div>
      {/* Blue header */}
      <div
        className="px-4 py-3 mb-0"
        style={{
          backgroundColor: "#0B3A78",
          color: "#fff",
          borderRadius: "0.375rem 0.375rem 0 0",
        }}
      >
        <h3 className="fw-bold mb-1" style={{ fontSize: "1.4rem" }}>Filing Summary</h3>
        <p className="mb-0" style={{ fontSize: "0.85rem", opacity: 0.85 }}>Get started submitting your filing</p>
      </div>

      {/* Form card body */}
      <div
        className="bg-white border border-top-0 p-4"
        style={{ borderRadius: "0 0 0.375rem 0.375rem" }}
      >
        {/* Filing Group */}
        <div className="mb-4">
          <label htmlFor="requestGroup" className="form-label fw-semibold">
            Filing Group <span className="text-danger">*</span>
          </label>
          <select
            id="requestGroup"
            className={`form-select ${errors.requestGroup ? "is-invalid" : ""}`}
            value={requestGroup}
            onChange={(e) => {
              setRequestGroup(e.target.value as any);
              setSelectedTypes([]);
              setErrors({});
            }}
          >
            <option value="">Select</option>
            <option value="Motion">Motion</option>
            <option value="Exhibit">Exhibit</option>
            <option value="Discovery">Discovery</option>
            <option value="Subpoenas">Subpoenas</option>
          </select>
          {errors.requestGroup && <div className="invalid-feedback">{errors.requestGroup}</div>}
        </div>

        {/* Filing Type - for Discovery */}
        {requestGroup === "Discovery" && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Filing Type <span className="text-danger">*</span>
            </label>
            {!discoveryEnabled && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2">
                <AlertCircle size={16} /> Discovery has not been authorized for this case.
              </div>
            )}
            <div className="alert alert-info d-flex align-items-center gap-2 py-2 mb-3">
              <Info size={16} /> Only the Discovery types authorized by the ALJ for this case are selectable.
            </div>
            {discoveryTypes.map((type) => (
              <div className="form-check mb-2" key={type.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                />
                <label className="form-check-label" htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
            {errors.requestTypes && <div className="text-danger small mt-1">{errors.requestTypes}</div>}
          </div>
        )}

        {/* Filing Type - for Subpoenas */}
        {requestGroup === "Subpoenas" && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Filing Type <span className="text-danger">*</span>
            </label>
            <div className="alert alert-info d-flex align-items-center gap-2 py-2 mb-3">
              <Info size={16} /> Select the type of subpoena you wish to request.
            </div>
            {subpoenaTypes.map((type) => (
              <div className="form-check mb-2" key={type.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                />
                <label className="form-check-label" htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
            {errors.requestTypes && <div className="text-danger small mt-1">{errors.requestTypes}</div>}
          </div>
        )}

        {/* Filing Type dropdown - for Motion/Exhibit */}
        {requestGroup && requestGroup !== "Discovery" && requestGroup !== "Subpoenas" && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Filing Type <span className="text-danger">*</span>
            </label>
            <select className="form-select">
              <option value="">Select</option>
              {requestGroup === "Motion" && (
                <>
                  <option value="motion-compel">Motion to Compel Discovery</option>
                  <option value="motion-dismiss">Motion to Dismiss</option>
                  <option value="motion-summary">Motion for Summary Judgment</option>
                  <option value="motion-continuance">Motion for Continuance</option>
                </>
              )}
              {requestGroup === "Exhibit" && (
                <>
                  <option value="exhibit-doc">Documentary Exhibit</option>
                  <option value="exhibit-photo">Photographic Exhibit</option>
                  <option value="exhibit-physical">Physical Exhibit</option>
                </>
              )}
            </select>
          </div>
        )}

        {/* Filing Type - disabled when no group */}
        {!requestGroup && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Filing Type <span className="text-danger">*</span>
            </label>
            <select className="form-select" disabled>
              <option value="">Select</option>
            </select>
          </div>
        )}

        {/* Filing Summary */}
        <div className="mb-4">
          <label htmlFor="summary" className="form-label fw-semibold">
            Filing Summary <span className="text-danger">*</span>
          </label>
          <textarea
            id="summary"
            className="form-control"
            rows={5}
            placeholder=""
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* Response Required From */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Response Required From <span className="text-danger">*</span>
          </label>
          {["Department / Agency", "Primary Party", "Additional Party"].map((option) => (
            <div className="form-check mb-2" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`response-${option}`}
                checked={responseRequired.includes(option)}
                onChange={() => handleResponseToggle(option)}
              />
              <label className="form-check-label" htmlFor={`response-${option}`}>{option}</label>
            </div>
          ))}
        </div>

        {/* Use my Own Documents */}
        <div
          className="p-3 mb-4"
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "0.375rem",
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-info-circle-fill" style={{ color: "#0d6efd", fontSize: "1rem" }}></i>
            <span className="fw-bold">Use my Own Documents</span>
          </div>
          <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
            Attorneys - You are welcome to upload your own versions of required documentation. If you wish to use your own documents, please select the option below.
          </p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="useOwnDocs"
              checked={useOwnDocuments}
              onChange={(e) => setUseOwnDocuments(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="useOwnDocs">I will use my own documents</label>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary btn-lg d-flex align-items-center gap-2" onClick={handleNext}>
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}