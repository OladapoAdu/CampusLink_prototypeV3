import { useState } from 'react';

const INITIAL_ADMISSIONS = [
  { id: 1, name: 'Tunde Bakare', classArm: 'JSS 1', date: '14 Oct 2026', status: 'Pending Review', assignedId: null },
  { id: 2, name: 'Amara Okafor', classArm: 'JSS 2', date: '02 Sep 2025', status: 'Admitted', assignedId: 'GSS-0241' },
];

const INITIAL_SUBMISSIONS = [
  { id: 'SUB-101', teacher: 'Mr. Adebayo', classArm: 'JSS 2A', subject: 'Mathematics', studentsCount: 42, status: 'Awaiting Approval' },
  { id: 'SUB-102', teacher: 'Mrs. Okoro', classArm: 'JSS 2A', subject: 'English Language', studentsCount: 42, status: 'Published' },
];

const INITIAL_SENT_MESSAGES = [
  {
    id: 1,
    recipient: 'Academic Staff (All Teachers)',
    subject: 'First Term CA Submission Reminder',
    body: 'Please ensure all continuous assessment entries are reviewed before Friday.',
    time: 'Yesterday',
  },
  {
    id: 2,
    recipient: 'Parents & Guardians',
    subject: "Parents' Consultation Day",
    body: 'You are invited to discuss academic progress with teachers on October 28.',
    time: '3 days ago',
  },
];

const getNextStudentId = (currentAdmissions) => {
  const maxNumber = currentAdmissions.reduce((highest, applicant) => {
    if (!applicant.assignedId) return highest;
    const match = applicant.assignedId.match(/(\d+)$/);
    const num = match ? Number.parseInt(match[1], 10) : 0;
    return num > highest ? num : highest;
  }, 240);

  return `GSS-${String(maxNumber + 1).padStart(4, '0')}`;
};

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('admissions');
  const [admissions, setAdmissions] = useState(INITIAL_ADMISSIONS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [sentMessages, setSentMessages] = useState(INITIAL_SENT_MESSAGES);
  const [statusMessage, setStatusMessage] = useState('');

  // Broadcast / Message Form State
  const [recipient, setRecipient] = useState('Academic Staff (All Teachers)');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  const handleApproveAdmission = (id, name) => {
    setAdmissions((prev) => {
      const nextId = getNextStudentId(prev);
      setStatusMessage(`${name} has been admitted and assigned ID ${nextId}.`);
      return prev.map((app) =>
        app.id === id ? { ...app, status: 'Admitted', assignedId: nextId } : app
      );
    });
  };

  const handleRejectAdmission = (id, name) => {
    setAdmissions((prev) => prev.filter((app) => app.id !== id));
    setStatusMessage(`Application for ${name} has been declined.`);
  };

  const handlePublishScores = (subId, subject, classArm) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === subId ? { ...sub, status: 'Published' } : sub))
    );
    setStatusMessage(`${subject} results for ${classArm} are now published to Student & Parent portals.`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgBody.trim()) return;

    const newBroadcast = {
      id: sentMessages.length + 1,
      recipient,
      subject: msgSubject,
      body: msgBody,
      time: 'Just now',
    };

    setSentMessages([newBroadcast, ...sentMessages]);
    setStatusMessage(`Message "${msgSubject}" dispatched to ${recipient}.`);
    setMsgSubject('');
    setMsgBody('');
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark campus-navbar mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-icons">school</span> CampusLink - Admin Portal
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">
              Logged in: <strong className="text-white">Dr. Mrs. Alabi (Principal)</strong>
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
        {/* Welcome Banner */}
        <div className="card campus-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge rounded-pill bg-danger-subtle text-danger mb-2 fw-semibold px-3 py-2">
                SCHOOL ADMINISTRATION PORTAL
              </span>
              <h3 className="fw-bold text-dark mb-1">Welcome, Dr. Alabi</h3>
              <p className="text-muted mb-0">
                Manage student admissions, school-wide records, staff assignments, and official broadcasts.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="bg-light px-3 py-2 rounded-3 border d-inline-block text-start">
                <small className="text-muted d-block">Active Session</small>
                <strong className="text-dark">2026/2027 Academic Year</strong>
              </div>
            </div>
          </div>
        </div>

        {/* School-Wide Snapshot Metrics */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card campus-stat-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-secondary">Total Enrollment</small>
                <span className="campus-icon-box bg-primary-subtle text-primary">
                  <span className="material-icons fs-5">groups</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">333</h4>
              <small className="text-muted">Across JSS 1 – SS 3</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card campus-stat-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-secondary">Academic Staff</small>
                <span className="campus-icon-box bg-success-subtle text-success">
                  <span className="material-icons fs-5">badge</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">28</h4>
              <small className="text-muted">Active teaching staff</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card campus-stat-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <small className="fw-semibold text-secondary">Pending Approvals</small>
                <span className="campus-icon-box bg-warning-subtle text-warning">
                  <span className="material-icons fs-5">pending_actions</span>
                </span>
              </div>
              <h4 className="fw-bold text-dark mb-1">
                {admissions.filter((a) => a.status === 'Pending Review').length +
                  submissions.filter((s) => s.status === 'Awaiting Approval').length}
              </h4>
              <small className="text-muted">Admissions & score sheets</small>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills campus-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'admissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('admissions')}
            >
              Admissions & Records
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              Classes & Arms
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`}
              onClick={() => setActiveTab('staff')}
            >
              Staff & Teachers
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              Result Approvals
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'communications' ? 'active' : ''}`}
              onClick={() => setActiveTab('communications')}
            >
              Communications & Broadcasts
            </button>
          </li>
        </ul>

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

        {/* Tab Content: Admissions */}
        {activeTab === 'admissions' && (
          <div className="card campus-card p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <h4 className="fw-bold mb-1 text-dark">Student Admissions & Enrollment</h4>
                <p className="text-muted mb-0">
                  Review applications, assign admission numbers, and manage student profiles.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary campus-btn-primary btn-sm rounded-pill px-3 text-white"
                onClick={() => setStatusMessage('New student registration modal opened.')}
              >
                + Admit New Student
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Applicant Name</th>
                    <th>Proposed Class</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((applicant) => (
                    <tr key={applicant.id}>
                      <td className="fw-semibold">{applicant.name}</td>
                      <td>{applicant.classArm}</td>
                      <td>{applicant.date}</td>
                      <td>
                        {applicant.status === 'Pending Review' ? (
                          <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                            Pending Review
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-success px-3 py-2">
                            Admitted ({applicant.assignedId})
                          </span>
                        )}
                      </td>
                      <td>
                        {applicant.status === 'Pending Review' ? (
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-success btn-sm rounded-pill px-3 fw-semibold"
                              onClick={() => handleApproveAdmission(applicant.id, applicant.name)}
                            >
                              Approve & Assign ID
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold"
                              onClick={() => handleRejectAdmission(applicant.id, applicant.name)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                            onClick={() => setStatusMessage(`Viewing dossier for ${applicant.name} (${applicant.assignedId}).`)}
                          >
                            View Profile
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Classes */}
        {activeTab === 'classes' && (
          <div className="card campus-card p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <h4 className="fw-bold mb-1 text-dark">Class & Arm Setup</h4>
                <p className="text-muted mb-0">
                  Configure secondary school arms and promote students across years.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary campus-btn-primary btn-sm rounded-pill px-3 text-white"
                onClick={() => setStatusMessage('Class arm configuration form opened.')}
              >
                + Add New Class Arm
              </button>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card border rounded-4 p-3 bg-light h-100">
                  <h5 className="fw-bold text-dark">JSS 1</h5>
                  <p className="small text-muted mb-3">Arms: JSS 1A, JSS 1B, JSS 1C</p>
                  <div>
                    <span className="badge rounded-pill bg-primary px-3 py-2">120 Total Students</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border rounded-4 p-3 bg-light h-100">
                  <h5 className="fw-bold text-dark">JSS 2</h5>
                  <p className="small text-muted mb-3">Arms: JSS 2A, JSS 2B</p>
                  <div>
                    <span className="badge rounded-pill bg-primary px-3 py-2">115 Total Students</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border rounded-4 p-3 bg-light h-100">
                  <h5 className="fw-bold text-dark">SS 1</h5>
                  <p className="small text-muted mb-3">Arms: SS 1A, SS 1B</p>
                  <div>
                    <span className="badge rounded-pill bg-primary px-3 py-2">98 Total Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Staff */}
        {activeTab === 'staff' && (
          <div className="card campus-card p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <h4 className="fw-bold mb-1 text-dark">Staff & Teacher Management</h4>
                <p className="text-muted mb-0">
                  Manage teacher profiles and subject assignments.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary campus-btn-primary btn-sm rounded-pill px-3 text-white"
                onClick={() => setStatusMessage('Staff onboarding form opened.')}
              >
                + Register New Staff
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Staff Name</th>
                    <th>Department</th>
                    <th>Assigned Subjects</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold">Mr. Adebayo</td>
                    <td>Science & Mathematics</td>
                    <td>Mathematics, Further Maths</td>
                    <td>Teacher</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">Mrs. Okoro</td>
                    <td>Arts & Humanities</td>
                    <td>English Language, Literature</td>
                    <td>Senior Teacher</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Result Approvals */}
        {activeTab === 'approvals' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Teacher Score Sheet Approvals</h4>
            <p className="text-muted mb-3">
              Review continuous assessment and exam uploads before publishing to Student and Parent portals.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Submitted By</th>
                    <th>Class Arm</th>
                    <th>Subject</th>
                    <th>Entries</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id}>
                      <td className="fw-semibold">{sub.teacher}</td>
                      <td>{sub.classArm}</td>
                      <td>{sub.subject}</td>
                      <td>{sub.studentsCount} students</td>
                      <td>
                        {sub.status === 'Awaiting Approval' ? (
                          <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                            Awaiting Approval
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-success px-3 py-2">
                            Published
                          </span>
                        )}
                      </td>
                      <td>
                        {sub.status === 'Awaiting Approval' ? (
                          <button
                            type="button"
                            className="btn btn-success btn-sm rounded-pill px-3 fw-semibold"
                            onClick={() => handlePublishScores(sub.id, sub.subject, sub.classArm)}
                          >
                            Approve & Publish
                          </button>
                        ) : (
                          <span className="text-muted small">Live on portals</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Communications & Broadcasts */}
        {activeTab === 'communications' && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card campus-card p-4 h-100">
                <h5 className="fw-bold mb-1 text-dark">Send Official Message</h5>
                <p className="text-muted small mb-3">
                  Dispatch direct notices to academic staff, parents, or students.
                </p>

                <form onSubmit={handleSendBroadcast}>
                  <div className="mb-3">
                    <label htmlFor="recipientSelect" className="form-label small fw-semibold text-secondary">
                      Target Audience / Recipient
                    </label>
                    <select
                      id="recipientSelect"
                      className="form-select campus-select"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    >
                      <option value="Academic Staff (All Teachers)">Academic Staff (All Teachers)</option>
                      <option value="Mr. Adebayo (Mathematics Dept.)">Mr. Adebayo (Mathematics Dept.)</option>
                      <option value="Parents & Guardians">Parents & Guardians</option>
                      <option value="All Students">All Students</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="broadcastSubject" className="form-label small fw-semibold text-secondary">
                      Subject
                    </label>
                    <input
                      id="broadcastSubject"
                      type="text"
                      className="form-control campus-select"
                      placeholder="e.g., Mid-Term Assessment Schedule"
                      value={msgSubject}
                      onChange={(e) => setMsgSubject(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="broadcastBody" className="form-label small fw-semibold text-secondary">
                      Message Content
                    </label>
                    <textarea
                      id="broadcastBody"
                      rows="4"
                      className="form-control campus-select"
                      placeholder="Type your official announcement or directive..."
                      value={msgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary campus-btn-primary w-100 text-white"
                  >
                    Send Official Notice
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card campus-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0 text-dark">Dispatched Notices Log</h5>
                  <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    {sentMessages.length} Sent
                  </span>
                </div>

                <div className="d-flex flex-column gap-3">
                  {sentMessages.map((msg) => (
                    <div key={msg.id} className="p-3 bg-light rounded-3 border">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="badge rounded-pill bg-secondary">{msg.recipient}</span>
                        <small className="text-muted">{msg.time}</small>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">{msg.subject}</h6>
                      <p className="small text-muted mb-0">{msg.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;