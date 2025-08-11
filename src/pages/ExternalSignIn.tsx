import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/shared/Header";

const ExternalSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ username: "", password: "" });
    
    // Basic validation
    let hasErrors = false;
    if (!username.trim()) {
      setErrors(prev => ({ ...prev, username: "Username is required" }));
      hasErrors = true;
    }
    if (!password.trim()) {
      setErrors(prev => ({ ...prev, password: "Password is required" }));
      hasErrors = true;
    }
    
    if (!hasErrors) {
      navigate("/consent");
    }
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      <Header showUserActions={false} />
      <div className="max-w-md mx-auto px-6 py-8">

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            External User Sign-In
          </h1>
          <p className="text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-fluent-16 p-8 border border-border">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="mt-1 h-12 border-input focus:border-ring focus:ring-ring"
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-sm text-destructive">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12 border-input focus:border-ring focus:ring-ring"
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
            >
              Sign In
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-hover"
                onClick={() => {}}
              >
                Forgot password?
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <button className="hover:text-foreground">Privacy Policy</button>
              <span>•</span>
              <button className="hover:text-foreground">Terms of Service</button>
              <span>•</span>
              <button className="hover:text-foreground">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalSignIn;