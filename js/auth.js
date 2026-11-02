// Shared functions for users, login and attendance (loaded on every page).
// Data is saved in the browser with localStorage because there is no backend yet.

// Stops user-typed text from being treated as HTML
function safe(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getUsers() {
  var saved = localStorage.getItem("users");
  if (saved === null) {
    // starter accounts, created the first time the site opens
    var starter = [
      { name: "Admin", email: "admin@jobportal.com", password: "admin1234", role: "admin" },
      { name: "Recruiter Demo", email: "recruiter@example.com", password: "recruit123", role: "recruiter" },
      { name: "Ravi Kumar", email: "ravi@example.com", password: "ravi12345", role: "seeker" },
      { name: "Priya Sharma", email: "priya@example.com", password: "priya1234", role: "seeker" },
      { name: "Anil Reddy", email: "anil@example.com", password: "anil12345", role: "seeker" }
    ];
    localStorage.setItem("users", JSON.stringify(starter));
    return starter;
  }
  return JSON.parse(saved);
}

function saveUsers(list) {
  localStorage.setItem("users", JSON.stringify(list));
}

function findUser(email, password) {
  var users = getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].password === password) {
      return users[i];
    }
  }
  return null;
}

function emailExists(email) {
  var users = getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function getCurrentUser() {
  var saved = localStorage.getItem("currentUser");
  if (saved === null) {
    return null;
  }
  return JSON.parse(saved);
}

function login(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Admin pages call this first. Wrong role or not logged in goes to sign in.
function requireRole(role) {
  var user = getCurrentUser();
  if (user === null || user.role !== role) {
    window.location.href = "signin.html";
  }
}

function getSeekers() {
  var users = getUsers();
  var seekers = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].role === "seeker") {
      seekers.push(users[i]);
    }
  }
  return seekers;
}

// Attendance looks like: { "2026-11-02": { "ravi@example.com": "Present" } }
function getAttendance() {
  var saved = localStorage.getItem("attendance");
  if (saved === null) {
    return {};
  }
  return JSON.parse(saved);
}

function saveAttendance(data) {
  localStorage.setItem("attendance", JSON.stringify(data));
}

// Today's date as YYYY-MM-DD
function today() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  return d.getFullYear() + "-" + month + "-" + day;
}
