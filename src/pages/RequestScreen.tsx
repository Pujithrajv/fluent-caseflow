import { Header } from "@/components/shared/Header";
import { Plus } from "lucide-react";

export default function RequestScreen() {
  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <div className="container-xl px-4 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 fw-semibold text-dark">Requests</h1>
            <p className="text-muted mt-1">Manage and track your requests</p>
          </div>
          <button className="btn btn-primary btn-lg"><Plus size={18} className="me-2" /> Create New Request</button>
        </div>
        <div className="card">
          <div className="card-header bg-white"><h5 className="card-title mb-0">Request Management</h5></div>
          <div className="card-body"><p className="text-muted">Request management content will appear here.</p></div>
        </div>
      </div>
    </div>
  );
}
