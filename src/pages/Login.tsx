import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Shield } from "lucide-react";

const Login = () => {
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
      navigate("/consent");
    }
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
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h1>
            <p className="text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-xs text-red-600">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="keep-signed-in"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="keep-signed-in" className="text-sm text-gray-700">
                Keep me signed in
              </Label>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={() => {}}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              style={{ backgroundColor: "#1F6FEB" }}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-xs text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {}}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {}}
            >
              Sign in with Microsoft
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center space-x-4 text-xs text-gray-600">
            <button className="hover:text-gray-800">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-gray-800">Terms</button>
            <span>•</span>
            <button className="hover:text-gray-800">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;