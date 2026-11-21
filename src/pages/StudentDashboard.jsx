import { useState } from 'react';

const StudentDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-vh-100 pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark campus-navbar mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-icons">school</span> CampusLink
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">
              Logged in as: <strong className="text-white">Amara Okafor (JSS 2A)</strong>
            </span>
            <button
              className="btn btn-outline-light btn-sm rounded-pill px-3 fw-semibold"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Welcome Banner */}
        <div className="card campus-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge rounded-pill bg-primary-subtle text-primary mb-2 fw-semibold px-3 py-2">
                STUDENT PORTAL
              </span>
              <h3 className="fw-bold text-dark mb-1">Welcome back, Amara!</h3>
              <p className="text-muted mb-0">
                Here is a summary of your academic progress and upcoming schedule for this term.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="bg-light px-3 py-2 rounded-3 border d-inline-block text-start">
                <small className="text-muted d-block">Student ID</small>
                <strong className="text-dark">GSS-0241</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills campus-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => setActiveTab('timetable')}
            >
              Timetable & Subjects
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              Results & Grades
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              Assignments
            </button>
          </li>
        </ul>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card campus-stat-card p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="fw-semibold text-secondary">Attendance</small>
                    <span className="campus-icon-box bg-success-subtle text-success">
                      <span className="material-icons fs-5">event_available</span>
                    </span>
                  </div>
                  <h4 className="fw-bold text-dark mb-1">94%</h4>
                  <small className="text-muted">Present this term</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card campus-stat-card p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="fw-semibold text-secondary">Average Score</small>
                    <span className="campus-icon-box bg-primary-subtle text-primary">
                      <span className="material-icons fs-5">school</span>
                    </span>
                  </div>
                  <h4 className="fw-bold text-dark mb-1">78%</h4>
                  <small className="text-muted">Current term average</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card campus-stat-card p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="fw-semibold text-secondary">Enrolled Subjects</small>
                    <span className="campus-icon-box bg-warning-subtle text-warning">
                      <span className="material-icons fs-5">book</span>
                    </span>
                  </div>
                  <h4 className="fw-bold text-dark mb-1">12</h4>
                  <small className="text-muted">Active subjects</small>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card campus-card p-4 h-100">
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                    <span className="material-icons text-primary">event</span> Upcoming School Events
                  </h5>
                  <div className="d-flex align-items-start p-3 rounded-3 bg-light border">
                    <div
                      className="bg-primary text-white text-center rounded-3 p-2 me-3 fw-bold flex-shrink-0"
                      style={{ minWidth: '60px' }}
                    >
                      <span className="d-block fs-4 lh-1">21</span>
                      <small className="text-uppercase">Oct</small>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">Mid-term assessments begin</h6>
                      <span className="badge rounded-pill bg-secondary">Academic calendar</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card campus-card p-4 h-100">
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                    <span className="material-icons text-primary">campaign</span> Notice
                  </h5>
                  <p className="small text-muted mb-0">
                    The new term timetable and assessment schedule are now available for download.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timetable Tab */}
        {activeTab === 'timetable' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Class Timetable & Subjects</h4>
            <p className="text-muted mb-3">
              Here are your scheduled classes and assigned subject teachers for JSS 2A.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>08:00 AM - 09:00 AM</td>
                    <td>Mathematics</td>
                    <td>Mr. Adebayo</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>09:00 AM - 10:00 AM</td>
                    <td>English Language</td>
                    <td>Mrs. Okoro</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>08:00 AM - 09:00 AM</td>
                    <td>Basic Science</td>
                    <td>Mr. Johnson</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Released Academic Results</h4>
            <p className="text-muted mb-3">View your continuous assessments and examination grades.</p>
            <div className="alert alert-info rounded-3 mb-0">
              First Term Continuous Assessment results have been published.
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Assignments & Learning Resources</h4>
            <p className="text-muted mb-3">Download notes and submit your pending homework.</p>
            <ul className="list-group list-group-flush border rounded-3 overflow-hidden">
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <div>
                  <h6 className="mb-1 fw-bold text-dark">Algebra Practice Exercise</h6>
                  <small className="text-muted">Mathematics • Due: Oct 24</small>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                >
                  Download
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;