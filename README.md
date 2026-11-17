# Job & Internship Portal (Week 1) - HTML, CSS, JavaScript version

A simple job portal front end with a landing page and authentication screens.

## How to run
No installation needed. Open `index.html` in your browser (or use the VS Code "Live Server" extension).

## Features
- Landing page with search and featured jobs (mock data)
- Sign in, Sign up and Forgot password forms with validation and success messages
- Responsive navbar with a mobile menu (Esc closes it)
- 404 page

## Folder structure
```
index.html, signin.html, signup.html, forgot-password.html, 404.html
css/style.css     all styling
js/navbar.js      mobile menu
js/helpers.js     shared form helper functions
js/jobs.js        mock job data
js/home.js        search and job cards
js/signin.js, signup.js, forgot.js   form validation
```

## Deployment
Upload the whole folder to Netlify or GitHub Pages. No build step is needed.

## Roles and Admin (added)
| Role | What they can do |
|---|---|
| Job Seeker | Browse jobs, sign in and sign up |
| Recruiter | Browse jobs, sign in and sign up |
| Admin | Everything above, plus: dashboard, mark attendance of job seekers, attendance report, manage job seekers |

- Attendance is tracked for **job seekers only**.
- Admin accounts cannot be created on the Sign Up page. A starter admin is created by the system.
- Demo logins: `admin@jobportal.com / admin1234`, `ravi@example.com / ravi12345`, `recruiter@example.com / recruit123`.
- Admin pages: `admin-dashboard.html`, `attendance.html`, `attendance-report.html`, `seekers.html`.
- Data is stored in the browser with `localStorage`. There is no backend, so this is a demo. A real app must check the role and passwords on the server.

New files: `js/auth.js`, `js/dashboard.js`, `js/attendance.js`, `js/report.js`, `js/seekers.js`.

## Week 2 - Core Features
| Day | What was added |
|---|---|
| 1 | `dashboard.html`: summary cards and primary actions for job seekers and recruiters (admin has `admin-dashboard.html`) |
| 2 | `jobs.html`: search, filter by type, sort, card/table view, "Show more" |
| 3 | `job-detail.html`: tabs (Overview, Requirements, Company), related jobs, Apply / Edit / Delete buttons by role |
| 4 | `job-form.html`: create and edit jobs (recruiters only) with validation; reusable field functions in `components.js` |
| 5 | `service.js`: mock service layer; loading skeletons, empty states, error states with retry, toast notifications, recent activity |

- Add `?error=1` to a page address (for example `jobs.html?error=1`) to see the error state and the Try again button.
- Job seekers can apply to jobs. Recruiters can post, edit and delete their own jobs.
- New files: `js/service.js`, `js/components.js`, `js/job-list.js`, `js/job-detail.js`, `js/job-form.js`, `js/my-dashboard.js`.
