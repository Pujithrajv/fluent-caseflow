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

  const discoveryEnabled = true;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!requestGroup) newErrors.requestGroup = "Please select a Request Group";
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
      <h3 className="fw-bold mb-4" style={{ fontSize: "1.5rem" }}>Request Details</h3>

      {/* Request Group */}
      <div className="mb-4">
        <label htmlFor="requestGroup" className="form-label fw-semibold">
          Request Group <span className="text-danger">*</span>
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

      {/* Request Type - for Discovery */}
      {requestGroup === "Discovery" && (
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Request Type <span className="text-danger">*</span>
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

      {/* Request Type - for Subpoenas */}
      {requestGroup === "Subpoenas" && (
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Request Type <span className="text-danger">*</span>
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

      {/* Request Type dropdown - always visible */}
      {requestGroup && requestGroup !== "Discovery" && requestGroup !== "Subpoenas" && (
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Request Type <span className="text-danger">*</span>
          </label>
          <select className="form-select">
            <option value="">Select</option>
            {requestGroup === "Motion" && (
              <>
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

      {/* Request Type - always show as dropdown when no group selected */}
      {!requestGroup && (
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Request Type <span className="text-danger">*</span>
          </label>
          <select className="form-select" disabled>
            <option value="">Select</option>
          </select>
        </div>
      )}

      {/* Request Summary */}
      <div className="mb-4">
        <label htmlFor="summary" className="form-label fw-semibold">
          Request Summary <span className="text-danger">*</span>
        </label>
        <textarea
          id="summary"
          className="form-control"
          rows={4}
          placeholder=""
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary btn-lg" onClick={() => window.history.back()}>
          Back
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
