import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignInSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showUserActions={false} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-6 py-12">
          {/* Selection Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* External Users */}
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="mb-8">
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    ILog<span className="text-blue-600">i</span>n
                  </div>
                  <div className="w-8 h-8 bg-blue-900 rounded mx-auto -mt-2"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  External Users
                </h2>
                <Button
                  onClick={() => navigate("/login-external")}
                  variant="outline"
                  className="w-48 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium mb-6"
                >
                  External User Sign-In
                </Button>
                <p className="text-sm text-gray-600">
                  For external stakeholders and public users
                </p>
              </div>

              {/* State Users - Okta */}
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="mb-8">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    okta
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  State Users Only
                </h2>
                <Button
                  onClick={() => navigate("/portal")}
                  className="w-48 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium mb-6"
                >
                  Sign in with Okta
                </Button>
                <p className="text-sm text-gray-600">
                  For employees and authorized state personnel only
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                <div className="font-bold text-lg mb-3">WARNING!</div>
                <div className="text-sm leading-relaxed">
                  This system contains U.S Government information. By using this information system, you are consenting to system monitoring for law enforcement and other purposes. 
                  Unauthorized or improper use of this system may subject you to state and federal criminal prosecution and penalties as well as state penalties. At any time, 
                  the Government may intercept, search, and seize any communication or data transiting or stored on this information system. You may have access to or see confidential or 
                  proprietary information or data (all hereinafter referred to as "Confidential Information"), such as national directory of new hire information, protected health information (HIPAA) 
                  or Personally Identifiable Information. Authorized use of the ILogin client login is for customer application and case information and management. By clicking "ILogin" you 
                  understand and agree that all such Confidential Information or data may not be released, copied or disclosed, in whole or in part, unless properly authorized by Illinois Bureau of 
                  Administrative Hearings.
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-600">
            <div>© Copyright 2025. All rights reserved.</div>
            <div className="space-x-4">
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSelection;