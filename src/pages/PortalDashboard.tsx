import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const PortalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-['Segoe_UI',system-ui,sans-serif]" 
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Shield className="h-12 w-12 text-gray-600" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to the Portal Dashboard
          </h1>
          
          <p className="text-gray-600 mb-8">
            You have successfully signed in and accepted the terms and conditions.
          </p>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            style={{ backgroundColor: "#1F6FEB" }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;