import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setErrors({ username: "", password: "" });
    let hasErrors = false;
    if (!username.trim()) { setErrors(prev => ({ ...prev, username: "Username is required" })); hasErrors = true; }
    if (!password.trim()) { setErrors(prev => ({ ...prev, password: "Password is required" })); hasErrors = true; }
    if (!hasErrors) navigate("/portal");
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header showUserActions={false} />
      <div className="container py-5" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-4">
          <h1 className="h4 fw-bold">Sign in to your account</h1>
          <p className="text-muted">Use your organizational account</p>
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="keep-signed-in"
                    checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />
                  <label className="form-check-label small" htmlFor="keep-signed-in">Keep me signed in</label>
                </div>
                <button type="button" className="btn btn-link btn-sm p-0">Forgot password?</button>
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-lg">Sign In</button>
            </form>

            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small">Or continue with</span>
              <hr className="flex-grow-1" />
            </div>
            <div className="row g-2">
              <div className="col-6"><button className="btn btn-outline-secondary w-100">Google</button></div>
              <div className="col-6"><button className="btn btn-outline-secondary w-100">Microsoft</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OktaSignIn;
