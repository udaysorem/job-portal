var area = document.getElementById("detail-area");
var jobId = new URLSearchParams(window.location.search).get("id");
var user = getCurrentUser();

function loadJob() {
  area.innerHTML = '<div class="card skeleton"></div><div class="card skeleton"></div>';
  getJob(jobId, showJob, function (message) {
    area.innerHTML = messageBoxHTML("Something went wrong", message, true);
    document.getElementById("retry-btn").addEventListener("click", loadJob);
  });
}

function showJob(job) {
  if (job === null) {
    area.innerHTML = messageBoxHTML("Job not found", "This job may have been removed.", false) +
      '<p class="links"><a href="jobs.html">Back to all jobs</a></p>';
    return;
  }

  var requirements = "";
  var list = job.requirements || [];
  for (var i = 0; i < list.length; i++) {
    requirements += "<li>" + safe(list[i]) + "</li>";
  }

  // action buttons depend on the role
  var actions = "";
  if (user === null) {
    actions = '<a class="btn" href="signin.html">Sign in to apply</a>';
  } else if (user.role === "seeker") {
    if (hasApplied(job.id, user.email)) {
      actions = '<button class="btn" disabled>Applied</button>';
    } else {
      actions = '<button id="apply-btn" class="btn">Apply Now</button>';
    }
  } else if (user.role === "recruiter" && job.postedBy === user.email) {
    actions = '<a class="btn btn-gray" href="job-form.html?id=' + job.id + '">Edit</a> ' +
      '<button id="delete-btn" class="btn btn-danger">Delete</button>';
  }

  // related jobs: same type, not this job
  var all = readJobs();
  var relatedHTML = "";
  var count = 0;
  for (var j = 0; j < all.length; j++) {
    if (all[j].type === job.type && all[j].id !== job.id && count < 3) {
      relatedHTML += jobCardHTML(all[j]);
      count++;
    }
  }
  if (count === 0) {
    relatedHTML = "<p>No related jobs yet.</p>";
  }

  area.innerHTML =
    '<p class="links"><a href="jobs.html">&larr; Back to jobs</a></p>' +
    "<h1>" + safe(job.title) + "</h1>" +
    '<p class="gray">' + safe(job.company) + " &bull; " + safe(job.location) + "</p>" +
    '<span class="badge">' + safe(job.type) + "</span>" +
    '<div class="actions">' + actions + "</div>" +
    '<div class="tabs" role="tablist">' +
      '<button class="tab-btn active" role="tab" data-tab="overview">Overview</button>' +
      '<button class="tab-btn" role="tab" data-tab="requirements">Requirements</button>' +
      '<button class="tab-btn" role="tab" data-tab="company">Company</button>' +
    "</div>" +
    '<div id="tab-overview" class="tab-panel"><p>' + safe(job.description) + "</p>" +
      "<p><strong>Salary:</strong> " + safe(job.salary || "Not mentioned") + "</p>" +
      '<p class="gray">Posted on ' + safe(job.date || "") + "</p></div>" +
    '<div id="tab-requirements" class="tab-panel hidden"><ul>' + requirements + "</ul></div>" +
    '<div id="tab-company" class="tab-panel hidden"><p><strong>' + safe(job.company) + "</strong></p><p>Location: " + safe(job.location) + "</p></div>" +
    '<h2 class="section-title">Related jobs</h2><div class="grid">' + relatedHTML + "</div>";

  // tabs
  var buttons = document.querySelectorAll(".tab-btn");
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function () {
      var panels = document.querySelectorAll(".tab-panel");
      for (var p = 0; p < panels.length; p++) { panels[p].classList.add("hidden"); }
      for (var q = 0; q < buttons.length; q++) { buttons[q].classList.remove("active"); }
      document.getElementById("tab-" + this.getAttribute("data-tab")).classList.remove("hidden");
      this.classList.add("active");
    });
  }

  var applyBtn = document.getElementById("apply-btn");
  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      applyBtn.disabled = true;
      applyBtn.textContent = "Applying...";
      applyToJob(job, function () {
        applyBtn.textContent = "Applied";
        showToast("Application sent!", "success");
      }, function (message) {
        applyBtn.disabled = false;
        applyBtn.textContent = "Apply Now";
        showToast(message, "error");
      });
    });
  }

  var deleteBtn = document.getElementById("delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      if (confirm("Delete this job?")) {
        deleteJob(job.id, function () {
          showToast("Job deleted", "success");
          setTimeout(function () { window.location.href = "jobs.html"; }, 800);
        }, function (message) {
          showToast(message, "error");
        });
      }
    });
  }
}

loadJob();
