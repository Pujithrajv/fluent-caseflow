import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Consent = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const navigate = useNavigate();

  const handleAcceptAndContinue = () => {
    if (termsAccepted) {
      navigate("/portal");
    }
  };

  const handleBackToSignIn = () => {
    navigate("/login");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-['Segoe_UI',system-ui,sans-serif]" 
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Logo */}
          <div className="mb-6">
            <Shield className="h-8 w-8 text-gray-600" />
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Terms and Consent</h1>
          </div>

          {/* Terms of Service Section */}
          <div className="mb-4">
            <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                <span className="font-medium text-gray-900">Terms of Service</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 border border-gray-200 rounded-md bg-white">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                  officia deserunt mollit anim id est laborum.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Privacy Policy Section */}
          <div className="mb-6">
            <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-md hover:bg-gray-100">
                <span className="font-medium text-gray-900">Privacy Policy Summary</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${privacyOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 border border-gray-200 rounded-md bg-white">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>We collect minimal personal information necessary for service provision</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your data is encrypted and stored securely using industry standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>We do not share your information with third parties without consent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>You have the right to access, modify, or delete your data at any time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Cookies are used only for essential functionality and analytics</span>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms-consent"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="terms-consent" className="text-sm text-gray-700 leading-relaxed">
                I agree to the{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-blue-600 hover:text-blue-700 underline">
                      Terms of Service
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Full terms of service would be displayed here in a real application.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                {" "}and{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Full privacy policy would be displayed here in a real application.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                . <span className="text-red-500">*</span>
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={(checked) => setEmailNotifications(checked === true)}
                className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="email-notifications" className="text-sm text-gray-700 leading-relaxed">
                I agree to receive email notifications about account activity and important updates. 
                You can unsubscribe at any time.
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleAcceptAndContinue}
              disabled={!termsAccepted}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={{ backgroundColor: termsAccepted ? "#1F6FEB" : undefined }}
            >
              Accept and Continue →
            </Button>
            <Button
              variant="ghost"
              onClick={handleBackToSignIn}
              className="w-full h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consent;