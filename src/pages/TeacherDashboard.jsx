import { useState } from 'react';

const INITIAL_SCORES = [
  { id: 'GSS-0241', name: 'Amara Okafor', ca: 18, exam: 72 },
  { id: 'GSS-0298', name: 'Chidi Okafor', ca: 15, exam: 65 },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'Mr. Okafor (Parent • Amara Okafor, JSS 2A)',
    subject: 'Consultation Day & Algebra Progress',
    preview: 'Good morning Mr. Adebayo, we would like to review Amara’s upcoming mid-term preparation.',
    time: 'Today, 09:15 AM',
    unread: true,
    type: 'Parent Message',
  },
  {
    id: 2,
    sender: 'School Administration',
    subject: 'First Term CA Submission Reminder',
    preview: 'Please ensure all continuous assessment entries are reviewed before Friday.',
    time: 'Yesterday',
    unread: false,
    type: 'Notification',
  },
];

const TeacherDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('classes');
  const [selectedAttendanceClass, setSelectedAttendanceClass] = useState('JSS 2A (Mathematics)');
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedMessageId, setSelectedMessageId] = useState(INITIAL_MESSAGES[0].id);
  const [replyText, setReplyText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const unreadCount = messages.filter((item) => item.unread).length;
  const activeMessage =
    messages.find((item) => item.id === selectedMessageId) || messages[0];

  const handleScoreChange = (studentId, field, rawValue) => {
    const maxScore = field === 'ca' ? 20 : 80;
    const numericValue = Math.max(0, Math.min(maxScore, Number(rawValue) || 0));

    setScores((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, [field]: numericValue } : student
      )
    );
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
    setMessages((prev) =>
      prev.map((item) => (item.id === messageId ? { ...item, unread: false } : item))
    );
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setStatusMessage(`Reply sent regarding "${activeMessage.subject}".`);
    setReplyText('');
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark campus-navbar mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-icons">school</span> CampusLink - Teacher Portal
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">
              Logged in: <strong className="text-white">Mr. Adebayo (Mathematics Dept.)</strong>
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
              <span className="badge rounded-pill bg-warning-subtle text-dark mb-2 fw-semibold px-3 py-2">
                ACADEMIC STAFF PORTAL
              </span>
              <h3 className="fw-bold text-dark mb-1">Welcome back, Mr. Adebayo!</h3>
              <p className="text-muted mb-0">
                Manage your assigned classes, record daily attendance, and upload continuous assessment scores.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="bg-light px-3 py-2 rounded-3 border d-inline-block text-start">
                <small className="text-muted d-block">Assigned Classes</small>
                <strong className="text-dark">JSS 2A, JSS 2B, SS 1A</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills campus-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              My Classes & Subjects
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              Record Attendance
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'scores' ? 'active' : ''}`}
              onClick={() => setActiveTab('scores')}
            >
              Continuous Assessment & Scores
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link d-inline-flex align-items-center gap-2 ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <span>Messages & Notifications</span>
              {unreadCount > 0 && (
                <span className="badge rounded-pill bg-danger text-white">{unreadCount}</span>
              )}
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

        {/* Tab Content: Classes */}
        {activeTab === 'classes' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Assigned Teaching Schedule</h4>
            <p className="text-muted mb-3">
              Here are your active classes and subject allocations for the current term.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Class Arm</th>
                    <th>Subject</th>
                    <th>Total Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JSS 2A</td>
                    <td>Mathematics</td>
                    <td>42</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                        onClick={() => setStatusMessage('Opened class roster for JSS 2A (Mathematics).')}
                      >
                        View Roster
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>JSS 2B</td>
                    <td>Mathematics</td>
                    <td>38</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                        onClick={() => setStatusMessage('Opened class roster for JSS 2B (Mathematics).')}
                      >
                        View Roster
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>SS 1A</td>
                    <td>Further Mathematics</td>
                    <td>25</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                        onClick={() => setStatusMessage('Opened class roster for SS 1A (Further Mathematics).')}
                      >
                        View Roster
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Attendance */}
        {activeTab === 'attendance' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Daily Attendance Register</h4>
            <p className="text-muted mb-3">
              Select a class to mark present or absent students for today.
            </p>
            <div className="mb-3" style={{ maxWidth: '360px' }}>
              <label htmlFor="attendanceClassSelect" className="form-label small fw-semibold text-secondary">
                Select Class
              </label>
              <select
                id="attendanceClassSelect"
                className="form-select campus-select"
                value={selectedAttendanceClass}
                onChange={(e) => setSelectedAttendanceClass(e.target.value)}
              >
                <option value="JSS 2A (Mathematics)">JSS 2A (Mathematics)</option>
                <option value="JSS 2B (Mathematics)">JSS 2B (Mathematics)</option>
              </select>
            </div>
            <div className="alert alert-secondary rounded-3">
              Attendance sheet ready for <strong>{selectedAttendanceClass}</strong>. Marking feature mockup active for prototype demonstration.
            </div>
            <button
              type="button"
              className="btn btn-success rounded-pill px-4 fw-semibold"
              onClick={() => setStatusMessage(`Attendance register saved for ${selectedAttendanceClass}.`)}
            >
              Save Attendance Register
            </button>
          </div>
        )}

        {/* Tab Content: Scores */}
        {activeTab === 'scores' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Upload Examination & CA Scores</h4>
            <p className="text-muted mb-3">
              Enter continuous assessments (Tests, Projects) and exam scores before submission.
            </p>
            <div className="table-responsive mb-3">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>CA Test (20 marks)</th>
                    <th>Exam (80 marks)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((student) => {
                    const total = student.ca + student.exam;
                    return (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.id}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            className="form-control form-control-sm"
                            style={{ maxWidth: '90px' }}
                            value={student.ca}
                            onChange={(e) => handleScoreChange(student.id, 'ca', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="80"
                            className="form-control form-control-sm"
                            style={{ maxWidth: '90px' }}
                            value={student.exam}
                            onChange={(e) => handleScoreChange(student.id, 'exam', e.target.value)}
                          />
                        </td>
                        <td className="fw-bold text-success">{total}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="btn btn-primary campus-btn-primary rounded-pill px-4 text-white"
              onClick={() => setStatusMessage('Continuous assessment and exam scores submitted for review.')}
            >
              Submit Scores for Review
            </button>
          </div>
        )}

        {/* Tab Content: Messages & Notifications */}
        {activeTab === 'messages' && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card campus-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0 text-dark">Inbox & Alerts</h5>
                  <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    {messages.length} Items
                  </span>
                </div>

                <div className="d-flex flex-column gap-2">
                  {messages.map((item) => {
                    const isSelected = item.id === activeMessage.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectMessage(item.id)}
                        className={`text-start p-3 rounded-3 border transition-all ${
                          isSelected ? 'bg-primary-subtle border-primary' : 'bg-light'
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                          <span className="badge rounded-pill bg-secondary">{item.type}</span>
                          <small className="text-muted">{item.time}</small>
                        </div>
                        <div className="fw-bold text-dark small">{item.sender}</div>
                        <div className="fw-semibold text-primary small mb-1">{item.subject}</div>
                        <p className="text-muted small mb-0 text-truncate">{item.preview}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card campus-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                  <div>
                    <span className="badge rounded-pill bg-info-subtle text-dark mb-2 px-3 py-2">
                      {activeMessage.type}
                    </span>
                    <h5 className="fw-bold text-dark mb-1">{activeMessage.subject}</h5>
                    <small className="text-muted">From: {activeMessage.sender} • {activeMessage.time}</small>
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 border mb-4">
                  <p className="text-dark mb-0">{activeMessage.preview}</p>
                </div>

                <form onSubmit={handleSendReply}>
                  <label htmlFor="teacherReplyBox" className="form-label small fw-semibold text-secondary">
                    Quick Response
                  </label>
                  <textarea
                    id="teacherReplyBox"
                    rows="3"
                    className="form-control campus-select mb-3"
                    placeholder="Write a reply or note..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary campus-btn-primary btn-sm rounded-pill px-4 text-white"
                  >
                    Send Reply
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;