# Job & Internship Portal: Requirements (Week 1, Day 1)

## 1. Project Summary
A responsive React frontend for job search, applications, profiles, and recruiter views. It uses a mock JSON data layer that can be swapped for a real API later.

**Goals:** reusable components, form validation, role-aware navigation, loading/empty/error states, accessibility, and deployment readiness.

**Out of scope (Week 1):** real backend, real authentication, payments, real-time chat.

---

## 2. User Roles

| Role | Description | Can do |
|---|---|---|
| Guest | Not signed in | Browse landing page, search and view jobs, sign up / sign in |
| Job Seeker | Signed-in candidate | Everything a guest can, plus apply, save jobs, track applications, edit profile, see notifications |
| Recruiter | Signed-in employer | Post and edit jobs, view applicants, change application status, see notifications |
| Admin (optional) | Platform manager | Moderate users and jobs. Only if time allows. |

---

## 3. Role-Aware Navigation

| Link | Guest | Job Seeker | Recruiter |
|---|---|---|---|
| Home | Yes | Yes | Yes |
| Jobs | Yes | Yes | Yes |
| Sign in / Sign up | Yes | No | No |
| Dashboard (My Applications) | No | Yes | No |
| Dashboard (My Postings) | No | No | Yes |
| Post a Job | No | No | Yes |
| Notifications | No | Yes | Yes |
| Profile / Settings | No | Yes | Yes |
| Help | Yes | Yes | Yes |

---

## 4. User Journeys

### Job Seeker
1. Lands on the home page and searches "React intern".
2. Views the results, then filters by location, job type, and experience, and sorts by newest.
3. Opens a job detail page and reads the description and related jobs.
4. Clicks **Apply**. If not signed in, is sent to sign in and returned to the job afterward.
5. Fills in the application form (resume, cover note) and sees inline validation.
6. Sees a success confirmation and a new notification.
7. Opens the dashboard to track the application status (Applied, Reviewing, Interview, Rejected, Offer).

### Recruiter
1. Signs up or signs in as a recruiter.
2. Opens the dashboard and sees active postings and applicant counts.
3. Clicks **Post a Job**, fills in and validates the form, and publishes.
4. Opens a posting and views the applicant list (searchable, filterable).
5. Updates an applicant's status and sees a confirmation message.

### Account Recovery
1. Clicks **Forgot password** on the sign-in page.
2. Enters an email, sees validation, then a "check your email" success state.

---

## 5. Screen List

| # | Screen | Route | Access |
|---|---|---|---|
| 1 | Landing / Home | `/` | All |
| 2 | Sign in | `/signin` | Guest |
| 3 | Sign up | `/signup` | Guest |
| 4 | Forgot password | `/forgot-password` | Guest |
| 5 | Job listing / search | `/jobs` | All |
| 6 | Job detail | `/jobs/:id` | All |
| 7 | Dashboard | `/dashboard` | Seeker, Recruiter |
| 8 | Create / edit job | `/jobs/new`, `/jobs/:id/edit` | Recruiter |
| 9 | Profile / settings | `/profile` | Seeker, Recruiter |
| 10 | Notifications | `/notifications` | Seeker, Recruiter |
| 11 | Help | `/help` | All |
| 12 | 404 / error | `*` | All |

---

## 6. Functional Requirements (Week 1 focus)

- **FR-1** Sign in, sign up, and forgot password screens with validation.
- **FR-2** Responsive global layout with navbar and footer.
- **FR-3** Reusable UI components: Button, Input, Select, Textarea, Card, Badge, Alert.
- **FR-4** Landing page with hero, search bar, featured jobs, categories, and a call to action.
- **FR-5** Routing with a 404 page.
- **FR-6** README with setup instructions.

Later weeks: search/filter/sort/pagination, dashboards, job forms, modals, tables, notifications, tests.

---

## 7. Acceptance Criteria

### Layout and Navigation
- [ ] Navbar collapses to a hamburger menu below 768px.
- [ ] The mobile menu opens and closes by keyboard (Tab, Enter, Esc) and returns focus properly.
- [ ] Navigation links change according to the user's role.
- [ ] Unknown URLs show a 404 page with a link home.

### Forms and Validation
- [ ] Sign-up shows an inline error for an invalid email.
- [ ] Password must be at least 8 characters and the error message says so.
- [ ] "Confirm password" shows an error if it does not match.
- [ ] Required empty fields show an error on submit.
- [ ] The submit button shows a loading state and is disabled while submitting.
- [ ] A success message appears after a successful submit.
- [ ] Every input has a visible label and error text is linked to its input (`aria-describedby`).

### Responsive Design
- [ ] No horizontal scrolling at 375px (mobile), 768px (tablet), and 1280px (desktop).
- [ ] Touch targets are at least 44px tall on mobile.

### Accessibility
- [ ] All interactive elements are reachable and usable by keyboard.
- [ ] Focus outlines are visible.
- [ ] Text contrast meets WCAG AA (4.5:1).
- [ ] Images have alt text and icon-only buttons have `aria-label`.

### Code Quality
- [ ] Linting and formatting pass with no errors.
- [ ] `npm run build` completes successfully.
- [ ] `.env` is git-ignored and `.env.example` is committed.
- [ ] Commits follow a clear convention (`feat:`, `fix:`, `docs:`).

---

## 8. Assumptions and Open Questions
- Authentication is mocked in Week 1 (no real backend).
- Job data comes from local JSON files through a `services/` layer.
---

