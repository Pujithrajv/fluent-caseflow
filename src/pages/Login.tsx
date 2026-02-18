import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#F7F7F7" }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            {/* Logo */}
            <div className="mb-4">
              <i className="bi bi-shield-lock fs-3 text-secondary"></i>
            </div>

            {/* Header */}
            <h1 className="h5 fw-semibold mb-1">Sign In</h1>
            <p className="text-muted small mb-4">Enter your credentials to access your account</p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label small fw-medium">Username</label>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label small fw-medium">Password</label>
                <div className="input-group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="keep-signed-in"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="keep-signed-in">
                  Keep me signed in
                </label>
              </div>

              <div className="text-end mb-3">
                <button type="button" className="btn btn-link btn-sm text-decoration-none p-0">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small">Or continue with</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Social */}
            <div className="d-grid gap-2">
              <button className="btn btn-outline-secondary">Sign in with Google</button>
              <button className="btn btn-outline-secondary">Sign in with Microsoft</button>
            </div>

            {/* Footer Links */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Privacy Policy • Terms • Support
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
