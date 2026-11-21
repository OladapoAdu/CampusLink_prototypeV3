import { useState } from 'react';

const STUDENT_ACCOUNTS = [
  { id: 'GSS-0241', name: 'Amara Okafor', classArm: 'JSS 2A', invoiceTotal: 75000 },
  { id: 'SS-1B-014', name: 'Chidi Okafor', classArm: 'SS 1B', invoiceTotal: 95000 },
  { id: 'GSS-0242', name: 'Tunde Bakare', classArm: 'JSS 1A', invoiceTotal: 75000 },
];

const INITIAL_PAYMENTS = [
  {
    refId: 'PSK-984120',
    studentId: 'GSS-0241',
    studentName: 'Amara Okafor',
    classArm: 'JSS 2A',
    invoiceTotal: 75000,
    amountPaid: 45000,
    date: '16 Oct 2026',
    status: 'Verified',
  },
  {
    refId: 'PSK-984195',
    studentId: 'SS-1B-014',
    studentName: 'Chidi Okafor',
    classArm: 'SS 1B',
    invoiceTotal: 95000,
    amountPaid: 60000,
    date: '15 Oct 2026',
    status: 'Pending Match',
  },
];

const formatNaira = (amount) => `#${amount.toLocaleString('en-NG')}`;

const getNextPaystackRef = (currentPayments) => {
  const maxRef = currentPayments.reduce((highest, item) => {
    const match = item.refId.match(/(\d+)$/);
    const num = match ? Number.parseInt(match[1], 10) : 0;
    return num > highest ? num : highest;
  }, 984100);

  return `PSK-${maxRef + 1}`;
};

const BursaryDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [baseRevenue, setBaseRevenue] = useState(14250000);
  const [statusMessage, setStatusMessage] = useState('');

  // Paystack Payment Simulator State
  const [selectedStudentId, setSelectedStudentId] = useState(STUDENT_ACCOUNTS[0].id);
  const [paymentAmount, setPaymentAmount] = useState('30000');

  const handleSimulatePaystackPayment = (e) => {
    e.preventDefault();
    const numericAmount = Number(paymentAmount);
    if (!numericAmount || numericAmount <= 0) return;

    const student = STUDENT_ACCOUNTS.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const nextRef = getNextPaystackRef(payments);
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newPaymentRecord = {
      refId: nextRef,
      studentId: student.id,
      studentName: student.name,
      classArm: student.classArm,
      invoiceTotal: student.invoiceTotal,
      amountPaid: numericAmount,
      date: today,
      status: 'Verified',
    };

    setPayments([newPaymentRecord, ...payments]);
    setBaseRevenue((prev) => prev + numericAmount);
    setStatusMessage(
      `Paystack Webhook Verified (${nextRef}): ${formatNaira(numericAmount)} logged for ${student.name} (${student.id}).`
    );
  };

  const handleMatchTransaction = (refId, studentName) => {
    setPayments((prev) =>
      prev.map((txn) =>
        txn.refId === refId ? { ...txn, status: 'Verified' } : txn
      )
    );
    setStatusMessage(`Transaction ${refId} matched and verified for ${studentName}.`);
  };

  // Calculate cumulative paid per student for accurate balance display
  const getStudentBalance = (studentId, invoiceTotal) => {
    const totalPaidForStudent = payments
      .filter((p) => p.studentId === studentId && p.status === 'Verified')
      .reduce((sum, p) => sum + p.amountPaid, 0);

    return Math.max(0, invoiceTotal - totalPaidForStudent);
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark campus-navbar mb-4 py-3">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-icons">school</span> CampusLink - Bursary & Finance Portal
          </span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">
              Accounts Department
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
              <span className="badge rounded-pill bg-success-subtle text-success mb-2 fw-semibold px-3 py-2">
                FINANCE & ACCOUNTS COMMAND CENTER
              </span>
              <h3 className="fw-bold text-dark mb-1">Bursary Management Dashboard</h3>
              <p className="text-muted mb-0">
                Define fee structures, monitor Paystack fee payments by student, and issue verified receipts.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="bg-light px-3 py-2 rounded-3 border d-inline-block text-start">
                <small className="text-muted d-block">Term Revenue Collected</small>
                <strong className="text-success fs-5">{formatNaira(baseRevenue)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills campus-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              Paystack Payments Ledger
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              Fee Structures & Invoices
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Outstanding Revenue Reports
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

        {/* Tab Content: Paystack Payments Ledger & Simulator */}
        {activeTab === 'transactions' && (
          <div className="d-flex flex-column gap-4">
            {/* Paystack Payment Simulator Card */}
            <div className="card campus-card p-4 border-start border-primary border-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Simulate Incoming Paystack Fee Payment</h5>
                  <p className="text-muted small mb-0">
                    Test how Paystack metadata attaches a student profile and logs a new payment row in real time.
                  </p>
                </div>
                <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 fw-semibold">
                  Webhook Metadata Demo
                </span>
              </div>

              <form onSubmit={handleSimulatePaystackPayment} className="row g-3 align-items-end">
                <div className="col-md-5">
                  <label htmlFor="paystackStudentSelect" className="form-label small fw-semibold text-secondary">
                    Student (Paystack Metadata)
                  </label>
                  <select
                    id="paystackStudentSelect"
                    className="form-select campus-select"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    {STUDENT_ACCOUNTS.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.id} • {student.classArm})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="paystackAmountInput" className="form-label small fw-semibold text-secondary">
                    Amount Paid (NGN)
                  </label>
                  <input
                    id="paystackAmountInput"
                    type="number"
                    min="1000"
                    step="500"
                    className="form-control campus-select"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary campus-btn-primary w-100 text-white"
                  >
                    Record Paystack Payment
                  </button>
                </div>
              </form>
            </div>

            {/* Payments Ledger Table */}
            <div className="card campus-card p-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                <h4 className="fw-bold mb-0 text-dark">Online Payment Reconciliation</h4>
                <span className="badge rounded-pill bg-primary px-3 py-2">
                  Gateway: Paystack Verified
                </span>
              </div>
              <p className="text-muted mb-3">
                Every verified Paystack checkout automatically logs the student, amount paid, and remaining term balance.
              </p>
              <div className="table-responsive">
                <table className="table table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Paystack Ref</th>
                      <th>Student & ID</th>
                      <th>Class</th>
                      <th>Amount Paid</th>
                      <th>Term Balance</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((txn) => {
                      const remainingBalance = getStudentBalance(txn.studentId, txn.invoiceTotal);
                      return (
                        <tr key={txn.refId}>
                          <td className="fw-semibold">{txn.refId}</td>
                          <td>
                            <div className="fw-semibold text-dark">{txn.studentName}</div>
                            <small className="text-muted">{txn.studentId}</small>
                          </td>
                          <td>{txn.classArm}</td>
                          <td className="fw-bold text-success">{formatNaira(txn.amountPaid)}</td>
                          <td>
                            {remainingBalance === 0 ? (
                              <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1">
                                Cleared (#0)
                              </span>
                            ) : (
                              <span className="text-danger fw-semibold">
                                {formatNaira(remainingBalance)}
                              </span>
                            )}
                          </td>
                          <td>{txn.date}</td>
                          <td>
                            {txn.status === 'Verified' ? (
                              <span className="badge rounded-pill bg-success px-3 py-2">
                                Verified
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                                Pending Match
                              </span>
                            )}
                          </td>
                          <td>
                            {txn.status === 'Verified' ? (
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm rounded-pill px-3 fw-semibold"
                                onClick={() =>
                                  setStatusMessage(`Digital receipt issued for ${txn.studentName} (${txn.refId}).`)
                                }
                              >
                                Issue Receipt
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary campus-btn-primary btn-sm rounded-pill px-3 text-white"
                                onClick={() => handleMatchTransaction(txn.refId, txn.studentName)}
                              >
                                Match Transaction
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Fee Structures & Itemized Invoices */}
        {activeTab === 'invoices' && (
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="card campus-card p-4 h-100">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                  <h4 className="fw-bold mb-0 text-dark">Junior Secondary (JSS) Term Bill</h4>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                    onClick={() => setStatusMessage('Opened JSS fee structure editor.')}
                  >
                    + Edit Structure
                  </button>
                </div>
                <p className="text-muted small mb-3">
                  Standard itemized breakdown applied to all JSS student accounts.
                </p>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Description</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tuition & Instruction Fee</td>
                        <td className="text-end">#45,000</td>
                      </tr>
                      <tr>
                        <td>ICT & Portal Access Levy</td>
                        <td className="text-end">#10,000</td>
                      </tr>
                      <tr>
                        <td>Development & Maintenance</td>
                        <td className="text-end">#10,000</td>
                      </tr>
                      <tr>
                        <td>Sports & Library Fee</td>
                        <td className="text-end">#10,000</td>
                      </tr>
                      <tr className="table-active fw-bold">
                        <td>Total Term Invoice Value</td>
                        <td className="text-end text-primary">#75,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card campus-card p-4 h-100">
                <h4 className="fw-bold mb-2 text-dark">Senior Secondary (SSS) Bill</h4>
                <p className="text-muted small mb-3">
                  Includes specialized science lab and vocational levies.
                </p>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Description</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tuition & Instruction Fee</td>
                        <td className="text-end">#55,000</td>
                      </tr>
                      <tr>
                        <td>Science Laboratory Levy</td>
                        <td className="text-end">#20,000</td>
                      </tr>
                      <tr>
                        <td>ICT & Portal Access Levy</td>
                        <td className="text-end">#10,000</td>
                      </tr>
                      <tr>
                        <td>Development & Sports</td>
                        <td className="text-end">#10,000</td>
                      </tr>
                      <tr className="table-active fw-bold">
                        <td>Total Term Invoice Value</td>
                        <td className="text-end text-primary">#95,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Outstanding Reports */}
        {activeTab === 'reports' && (
          <div className="card campus-card p-4">
            <h4 className="fw-bold mb-1 text-dark">Revenue & Outstanding Balance Summaries</h4>
            <p className="text-muted mb-3">
              Analyze termly fee collection performance and flag accounts with pending balances.
            </p>
            <div className="alert alert-secondary rounded-3">
              Financial reporting filters, CSV exports, and automated parent payment reminders are active for demonstration.
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold"
                onClick={() => setStatusMessage('Term Financial Report (PDF) generated and ready for download.')}
              >
                Download Term Financial Report (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BursaryDashboard;