import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";

const SignInSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-fluent">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header with Logo */}
        <div className="mb-12">
          <img 
            src="/lovable-uploads/34438d6b-1c2f-4220-9e05-ab41b2d386d9.png" 
            alt="Illinois Bureau of Administrative Hearings" 
            className="h-16 w-auto"
          />
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sign In
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your sign-in method
          </p>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
          {/* State Users - Okta */}
          <div className="flex-1 bg-card rounded-lg shadow-fluent-16 p-8 border border-border hover:shadow-fluent-64 transition-shadow">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                State Users Only
              </h2>
              <Button
                onClick={() => navigate("/login-okta")}
                className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium mb-4"
              >
                Sign in with Okta
              </Button>
              <p className="text-sm text-muted-foreground">
                For employees and authorized state personnel only
              </p>
            </div>
          </div>

          {/* External Users */}
          <div className="flex-1 bg-card rounded-lg shadow-fluent-16 p-8 border border-border hover:shadow-fluent-64 transition-shadow">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                External Users
              </h2>
              <Button
                onClick={() => navigate("/login-external")}
                variant="outline"
                className="w-full h-12 border-border text-foreground hover:bg-secondary font-medium mb-4"
              >
                External User Sign-In
              </Button>
              <p className="text-sm text-muted-foreground">
                For external stakeholders and public users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSelection;