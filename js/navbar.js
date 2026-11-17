var menuBtn = document.getElementById("menu-btn");
var navLinks = document.getElementById("nav-links");

// Build the menu links depending on who is logged in
var user = getCurrentUser();
var links = '<a href="index.html">Home</a><a href="jobs.html">Jobs</a>';

if (user === null) {
  links += '<a href="signin.html">Sign In</a>';
  links += '<a href="signup.html" class="nav-signup">Sign Up</a>';
} else {
  if (user.role === "admin") {
    links += '<a href="admin-dashboard.html">Dashboard</a>';
    links += '<a href="attendance.html">Attendance</a>';
    links += '<a href="attendance-report.html">Report</a>';
    links += '<a href="seekers.html">Seekers</a>';
  }
  if (user.role !== "admin") {
    links += '<a href="dashboard.html">Dashboard</a>';
  }
  if (user.role === "recruiter") {
    links += '<a href="job-form.html">Post Job</a>';
  }
  links += '<span class="nav-user">' + safe(user.name) + ' (' + user.role + ')</span>';
  links += '<a href="#" id="logout" class="nav-signup">Logout</a>';
}
navLinks.innerHTML = links;

if (user !== null) {
  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
  });
}

// Opens and closes the mobile menu
menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("show"));
});

// Esc key closes the menu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    navLinks.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", false);
  }
});
