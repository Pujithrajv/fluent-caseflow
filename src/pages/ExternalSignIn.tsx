import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";

const ExternalSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
    let hasErrors = false;
    if (!username.trim()) { setErrors(prev => ({ ...prev, username: "Username is required" })); hasErrors = true; }
    if (!password.trim()) { setErrors(prev => ({ ...prev, password: "Password is required" })); hasErrors = true; }
    if (!hasErrors) navigate("/consent");
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header showUserActions={false} />
      <div className="container py-5" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-4">
          <h1 className="h4 fw-bold">External User Sign-In</h1>
          <p className="text-muted">Enter your credentials to continue</p>
        </div>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label small fw-medium">Username</label>
                <input id="username" type="text" className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label small fw-medium">Password</label>
                <div className="input-group">
                  <input id="password" type={showPassword ? "text" : "password"}
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-lg">Sign In</button>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-link btn-sm">Forgot password?</button>
              </div>
            </form>
            <div className="text-center mt-4 small text-muted">
              Privacy Policy • Terms of Service • Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalSignIn;
