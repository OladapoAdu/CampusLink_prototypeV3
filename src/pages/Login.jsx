import { useState } from 'react';

const ROLE_HINTS = {
  student: { label: 'Student Portal', sampleId: 'GSS-0241', badge: 'Academic & Schedule' },
  parent: { label: 'Parent / Guardian Portal', sampleId: 'PRT-1084', badge: 'Family & Fees' },
  teacher: { label: 'Teacher Portal', sampleId: 'STF-0312', badge: 'Classes & Scores' },
  admin: { label: 'School Administration Portal', sampleId: 'ADM-0001', badge: 'Admissions & Staff' },
  bursary: { label: 'Bursary & Accounts Portal', sampleId: 'FIN-0045', badge: 'Invoices & Receipts' },
};

const Login = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  const activeMeta = ROLE_HINTS[selectedRole];

  return (
    <div className="campus-login-bg min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-4">
            {/* Branding Header */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center text-white rounded-4 p-3 mb-3"
                style={{
                  width: '66px',
                  height: '66px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  boxShadow: '0 10px 24px rgba(37, 99, 235, 0.25)',
                }}
              >
                <span className="material-icons fs-2">school</span>
              </div>
              <h2 className="fw-bold text-dark mb-1">CampusLink</h2>
              <p className="text-muted small mb-0">
                Unified Secondary School Management System
              </p>
            </div>

            {/* Login Card */}
            <div className="card campus-card p-4 p-sm-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold mb-0 text-dark">Sign in</h5>
                <span className="badge rounded-pill bg-primary-subtle text-primary fw-semibold px-3 py-2">
                  {activeMeta.badge}
                </span>
              </div>

              <form onSubmit={handleLogin}>
                {/* Role Selector */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Select Portal Role
                  </label>
                  <select
                    className="form-select campus-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="student">Student Portal</option>
                    <option value="parent">Parent / Guardian Portal</option>
                    <option value="teacher">Teacher Portal</option>
                    <option value="admin">School Administration Portal</option>
                    <option value="bursary">Bursary & Accounts Portal</option>
                  </select>
                </div>

                {/* Username Input */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">
                      Username or ID
                    </label>
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-decoration-none fw-medium"
                      onClick={() => setUsername(activeMeta.sampleId)}
                    >
                      Use {activeMeta.sampleId}
                    </button>
                  </div>
                  <div className="input-group campus-input-group">
                    <span className="input-group-text ps-3 pe-2">
                      <span className="material-icons text-muted fs-6">person</span>
                    </span>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder={`e.g., ${activeMeta.sampleId}`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary">
                    Password
                  </label>
                  <div className="input-group campus-input-group">
                    <span className="input-group-text ps-3 pe-2">
                      <span className="material-icons text-muted fs-6">lock</span>
                    </span>
                    <input
                      type="password"
                      className="form-control py-2"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary campus-btn-primary w-100 text-white"
                >
                  Access {activeMeta.label}
                </button>
              </form>
            </div>

            {/* Prototype Note */}
            <div className="text-center mt-4 text-muted small">
              Demo Mode: Any credentials + role will open that portal view.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;