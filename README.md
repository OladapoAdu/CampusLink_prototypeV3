# CampusLink

**CampusLink** is a centralized secondary school management system designed to bring academic, administrative, communication, and financial workflows onto a single platform. Built with **React**, **Vite**, **Bootstrap 5**, and custom CSS, it provides role-based dashboards tailored to each stakeholder in a school ecosystem.

---

## Project Architecture & Features

### 1. Role-Based Login (`src/pages/Login.jsx`)
- Allows users to select a portal role (**Student**, **Parent**, **Teacher**, **Admin**, or **Bursary**) with quick-fill sample IDs for prototype testing.
- Routes authenticated or demo sessions into the matching dashboard view via `src/App.jsx`.

### 2. Student Portal (`src/pages/StudentDashboard.jsx`)
- **Overview:** Displays attendance rate, term average score, enrolled subjects count, upcoming academic events, and notices.
- **Timetable & Subjects:** Shows scheduled classes and assigned subject teachers.
- **Results & Grades:** Displays continuous assessment and examination release updates.
- **Assignments:** Lists learning resources and homework downloads.

### 3. Parent / Guardian Portal (`src/pages/ParentDashboard.jsx`)
- **Multi-Child Switcher:** Switch between linked children (such as *Amara Okafor - JSS 2A* and *Chidi Okafor - SS 1B*) to inspect individual records.
- **Financial & Academic Summary:** Tracks outstanding fees, attendance, average scores, and verified fee receipts.
- **Announcements & Communication:** Highlights school notices and provides a direct message trigger for teachers.

### 4. Teacher Portal (`src/pages/TeacherDashboard.jsx`)
- **My Classes & Subjects:** Displays assigned class arms, subjects, and student counts.
- **Record Attendance:** Supports selecting a class arm and saving the daily attendance register.
- **Continuous Assessment & Scores:** Allows entering CA (up to 20) and Exam (up to 80) scores with live total calculation before submitting for review.
- **Messages & Notifications:** Inbox view for receiving parent inquiries and administrative notifications, complete with a quick reply composer.

### 5. School Administration Portal (`src/pages/AdminDashboard.jsx`)
- **Admissions & Records:** Reviews student applications, approves admissions, and deterministically assigns sequential student IDs (`GSS-XXXX`).
- **Classes & Arms:** Displays secondary class arms (`JSS 1`, `JSS 2`, `SS 1`) and student counts.
- **Staff & Teachers:** Lists teaching staff, departments, and subject allocations.
- **Result Approvals:** Enables administrators to review and publish teacher score submissions to Student and Parent portals.
- **Communications & Broadcasts:** Allows sending official notices to targeted groups or individual staff members and maintains a dispatched notices log.

### 6. Bursary & Finance Portal (`src/pages/BursaryDashboard.jsx`)
- **Paystack Payments Ledger & Simulator:** Simulates incoming Paystack payments with student metadata (`studentId`, `studentName`, `classArm`), updates term revenue collected, calculates remaining balances against term bills, and supports transaction matching and receipt issuance.
- **Fee Structures & Invoices:** Outlines itemized term bills for Junior Secondary (JSS) and Senior Secondary (SSS).
- **Outstanding Revenue Reports:** Provides a summary view and report download action for fee collection tracking.

---

## How the Project Was Built

1. **Scaffolded with Vite + React:** Initialized a fast React workspace inside the project folder and installed **Bootstrap 5** for responsive grids, tables, badges, and pill tabs.
2. **Styled with Custom CSS (`src/index.css`):** Added typography (`Montserrat` and `Roboto`), subtle surface elevation, card styling, pill tab states, and gradient navigation bars.
3. **Structured by Role & View:** Separated the login screen and each role dashboard into focused components under `src/pages/`, coordinated by centralized role state in `src/App.jsx`.
4. **Refined Workflows & Reconciliation Logic:** Replaced random ID generation with deterministic sequential ID assignment, added bidirectional messaging flows between Admin, Teachers, and Parents, and structured Bursary payment tracking around Paystack metadata and balance reconciliation.

---

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## Putting CampusLink on GitHub & Sharing a Usable Link

### Step 1: Create a Repository on GitHub
1. Sign in to **GitHub** and create a new repository (for example, `campuslink`).
2. Keep it **Public** (or **Private** if your team members are collaborators on the repo). Do not initialize with extra conflicting files if you already have your local project folder ready.

### Step 2: Push Your Code from VS Code
Open the terminal in your project root (`C:\Users\aduol\Documents\Development\campuslink`) and run:

```bash
git init
git add .
git commit -m "Initial commit: CampusLink multi-portal React prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/campuslink.git
git push -u origin main
```

*(Make sure `node_modules` and `dist` are listed in `.gitignore`—Vite includes a standard `.gitignore` by default.)*

### Step 3: Get a Usable Live Link for Your Team
A GitHub repository URL lets your team view and clone the code, while deploying to **Vercel** or **Netlify** gives them a clickable live URL they can open immediately in a browser:
1. Import your `campuslink` GitHub repository into **Vercel** or **Netlify**.
2. Confirm the build command is `npm run build` and the output directory is `dist`.
3. Deploy and share the generated live link alongside your GitHub repository link.

---

## Production Notes
- **Authentication & Authorization:** Move role verification and session management to a backend service so permissions are enforced server-side.
- **Paystack Security:** Never expose secret keys in frontend code; verify Paystack transactions and `charge.success` webhooks on your backend server before marking balances as paid.