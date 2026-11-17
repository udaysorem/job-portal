requireLogin();

var user = getCurrentUser();
if (user !== null && user.role === "admin") {
  window.location.href = "admin-dashboard.html";
}

var summary = document.getElementById("summary");
var actionsBox = document.getElementById("actions");
var recentBox = document.getElementById("recent");
var activityBox = document.getElementById("activity");

document.getElementById("welcome").textContent = "Welcome, " + user.name;

function findJob(list, id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) { return list[i]; }
  }
  return null;
}

function loadDashboard() {
  summary.innerHTML = skeletonHTML(3);
  getJobs(showDashboard, function (message) {
    summary.innerHTML = messageBoxHTML("Something went wrong", message, true);
    document.getElementById("retry-btn").addEventListener("click", loadDashboard);
  });
}

function showDashboard(jobs) {
  var apps = getApplications();
  var html = "";

  if (user.role === "seeker") {
    var mine = [];
    for (var i = 0; i < apps.length; i++) {
      if (apps[i].email === user.email) { mine.push(apps[i]); }
    }
    summary.innerHTML = statCardHTML(jobs.length, "Open Jobs") + statCardHTML(mine.length, "My Applications");
    actionsBox.innerHTML = '<a class="btn" href="jobs.html">Browse Jobs</a>';

    html = "<h2>My recent applications</h2>";
    if (mine.length === 0) {
      html += "<p>You have not applied yet. Browse jobs to get started.</p>";
    }
    for (var a = mine.length - 1; a >= 0 && a >= mine.length - 5; a--) {
      var job = findJob(jobs, mine[a].jobId);
      if (job !== null) {
        html += '<p><a href="job-detail.html?id=' + job.id + '">' + safe(job.title) + "</a> <span class='gray'>(" + safe(job.company) + ", " + mine[a].date + ")</span></p>";
      }
    }
  } else {
    var postings = [];
    var received = 0;
    for (var j = 0; j < jobs.length; j++) {
      if (jobs[j].postedBy === user.email) { postings.push(jobs[j]); }
    }
    html = "<h2>My postings</h2>";
    if (postings.length === 0) {
      html += "<p>You have not posted any jobs yet.</p>";
    } else {
      html += '<div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Applicants</th><th>Actions</th></tr></thead><tbody>';
    }
    for (var p = 0; p < postings.length; p++) {
      var count = 0;
      for (var k = 0; k < apps.length; k++) {
        if (apps[k].jobId === postings[p].id) { count++; }
      }
      received += count;
      html += '<tr><td><a href="job-detail.html?id=' + postings[p].id + '">' + safe(postings[p].title) + "</a></td><td>" + count +
        '</td><td><a href="job-form.html?id=' + postings[p].id + '">Edit</a></td></tr>';
    }
    if (postings.length > 0) { html += "</tbody></table></div>"; }

    summary.innerHTML = statCardHTML(postings.length, "My Postings") + statCardHTML(received, "Applications Received") + statCardHTML(jobs.length, "Open Jobs");
    actionsBox.innerHTML = '<a class="btn" href="job-form.html">Post a Job</a> <a class="btn btn-gray" href="jobs.html">Browse Jobs</a>';
  }
  recentBox.innerHTML = html;

  // recent activity (notifications)
  var notes = getNotifications(user.email);
  var activity = "<h2>Recent activity</h2>";
  if (notes.length === 0) {
    activity += "<p>No activity yet.</p>";
  }
  for (var n = 0; n < notes.length && n < 5; n++) {
    activity += "<p>" + safe(notes[n].text) + " <span class='gray'>(" + notes[n].date + ")</span></p>";
  }
  activityBox.innerHTML = activity;
}

loadDashboard();
