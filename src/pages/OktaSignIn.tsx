import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/shared/Header";

const OktaSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
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
      navigate("/portal");
    }
  };

  return (
    <div className="min-h-screen bg-background font-fluent">
      <Header showUserActions={false} />
      <div className="max-w-md mx-auto px-6 py-8">

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Sign in to your account
          </h1>
          <p className="text-muted-foreground">
            Use your organizational account
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keep-signed-in"
                  checked={keepSignedIn}
                  onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
                />
                <Label htmlFor="keep-signed-in" className="text-sm text-foreground">
                  Keep me signed in
                </Label>
              </div>
              
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-hover"
                onClick={() => {}}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
            >
              Sign In
            </Button>
          </form>

          {/* Social Sign-In Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full h-12 border-border text-foreground hover:bg-secondary"
                onClick={() => {}}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 border-border text-foreground hover:bg-secondary"
                onClick={() => {}}
              >
                Microsoft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OktaSignIn;