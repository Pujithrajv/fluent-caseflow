import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AljWarningModal } from "@/components/portal/AljWarningModal";
import { CaseManagementTable } from "@/components/portal/CaseManagementTable";

const PortalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <AljWarningModal onAcknowledge={() => {}} />
      <div className="min-h-screen bg-gray-50 font-['Segoe_UI',system-ui,sans-serif]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Case Management Dashboard
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <CaseManagementTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalDashboard;