import { useState } from 'react';

const CHILD_PROFILES = {
  'Amara Okafor (JSS 2A)': {
    outstandingFees: '#45,000',
    attendance: '94%',
    attendanceNote: 'Good standing',
    averageScore: '78%',
    scoreNote: 'Sample results',
    receipts: '2 Verified',
  },
  'Chidi Okafor (SS 1B)': {
    outstandingFees: '#60,000',
    attendance: '91%',
    attendanceNote: 'On track this term',
    averageScore: '82%',
    scoreNote: 'First term CA',
    receipts: '1 Verified',
  },
};

const ParentDashboard = ({ onLogout }) => {
  const [selectedChild, setSelectedChild] = useState('Amara Okafor (JSS 2A)');
  const [statusMessage, setStatusMessage] = useState('');

  const activeChildStats = CHILD_PROFILES[selectedChild];

  const handleChildChange = (e) => {
    setSelectedChild(e.target.value);
    setStatusMessage('');
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark campus-navbar mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-icons">school</span> CampusLink - Parent Portal
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">
              Parent Account: <strong className="text-white">Mr. Okafor</strong>
            </span>
            <button
              type="button"
              className="btn btn-outline-light btn-sm rounded-pill px-3 fw-semibold"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Multi-Child Switcher Banner */}
        <div className="card campus-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-7">
              <span className="badge rounded-pill bg-success-subtle text-success mb-2 fw-semibold px-3 py-2">
                FAMILY DASHBOARD
              </span>
              <h3 className="fw-bold text-dark mb-1">Welcome back, Mr. Okafor!</h3>
              <p className="text-muted mb-0">
                Monitor your children's academic progress, attendance, and fee status from one place.
              </p>
            </div>

            {/* Multi-Child Switcher Dropdown */}
            <div className="col-md-5 text-md-end mt-3 mt-md-0">
              <label
                htmlFor="childSwitcher"
                className="form-label small fw-semibold text-secondary d-block text-md-end mb-1"
              >
                Select Active Child:
              </label>
              <select
                id="childSwitcher"
                className="form-select campus-select d-inline-block w-auto"
                value={selectedChild}
                onChange={handleChildChange}
              >
                <option value="Amara Okafor (JSS 2A)">Amara Okafor - JSS 2A</option>
                <option value="Chidi Okafor (SS 1B)">Chidi Okafor - SS 1B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected Student Quick Info Bar */}
        <div className="alert alert-primary border-0 rounded-4 d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 shadow-sm px-4 py-3">
          <div className="d-flex align-items-center">
            <span className="material-icons me-2">child_care</span>
            <span>
              Viewing records for: <strong>{selectedChild}</strong>
            </span>
          </div>
          <span className="badge rounded-pill bg-primary px-3 py-2">Active Term: First Term</span>
        </div>

        {statusMessage && (
          <div className="alert alert-info alert-dismissible rounded-4 shadow-sm mb-4" role="alert">
            {statusMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setStatusMessage('')}
            />
          </div>
        )}

        {/* Financial & Academic Overview Grid */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="card campus-stat-card p-3 h-100 border-start border-danger border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-danger">Outstanding Fees</small>
                <span className="campus-icon-box bg-danger-subtle text-danger">
                  <span className="material-icons fs-5">account_balance_wallet</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">{activeChildStats.outstandingFees}</h4>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill px-3 mt-2 fw-semibold"
                onClick={() =>
                  setStatusMessage(`Payment checkout initiated for ${selectedChild} (${activeChildStats.outstandingFees}).`)
                }
              >
                Pay Online Now
              </button>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="card campus-stat-card p-3 h-100 border-start border-success border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-success">Attendance</small>
                <span className="campus-icon-box bg-success-subtle text-success">
                  <span className="material-icons fs-5">event_available</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">{activeChildStats.attendance}</h4>
              <small className="text-muted mt-2 d-block">{activeChildStats.attendanceNote}</small>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="card campus-stat-card p-3 h-100 border-start border-primary border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-primary">Average Score</small>
                <span className="campus-icon-box bg-primary-subtle text-primary">
                  <span className="material-icons fs-5">school</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">{activeChildStats.averageScore}</h4>
              <small className="text-muted mt-2 d-block">{activeChildStats.scoreNote}</small>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="card campus-stat-card p-3 h-100 border-start border-warning border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-warning">Fee Receipts</small>
                <span className="campus-icon-box bg-warning-subtle text-warning">
                  <span className="material-icons fs-5">receipt</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">{activeChildStats.receipts}</h4>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-3 mt-2 fw-semibold"
                onClick={() =>
                  setStatusMessage(`Receipt PDF prepared for ${selectedChild}.`)
                }
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Announcements & Communication Section */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card campus-card p-4 h-100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                <span className="material-icons text-primary">campaign</span> School Announcements & Notices
              </h5>
              <div className="p-3 bg-light rounded-3 border">
                <h6 className="fw-bold text-dark mb-1">Parents' Consultation Day</h6>
                <p className="small text-muted mb-2">
                  You are invited to discuss academic progress with teachers on October 28.
                </p>
                <span className="badge rounded-pill bg-secondary">School Announcement</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card campus-card p-4 h-100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                <span className="material-icons text-primary">support_agent</span> Teacher Communication
              </h5>
              <p className="small text-muted mb-3">
                Need to speak with a class teacher or request a meeting?
              </p>
              <button
                type="button"
                className="btn btn-primary campus-btn-primary btn-sm w-100 text-white"
                onClick={() =>
                  setStatusMessage(`Message composer opened for ${selectedChild}'s class teacher.`)
                }
              >
                Send Direct Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;