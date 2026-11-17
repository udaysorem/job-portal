requireRole("recruiter");

var area = document.getElementById("form-area");
var jobId = new URLSearchParams(window.location.search).get("id");
var editing = null; // the job being edited (stays null when creating)

function showForm(job) {
  var v = job || { title: "", company: "", location: "", type: "Internship", salary: "", description: "" };
  document.getElementById("page-title").textContent = job ? "Edit Job" : "Post a Job";

  area.innerHTML = '<form id="job-form" novalidate>' +
    fieldHTML("title", "Job Title", "text", v.title) +
    fieldHTML("company", "Company", "text", v.company) +
    fieldHTML("place", "Location", "text", v.location) +
    selectHTML("type", "Job Type", ["Internship", "Full-time", "Part-time"], v.type) +
    fieldHTML("salary", "Salary (optional)", "text", v.salary) +
    textareaHTML("description", "Description", v.description) +
    '<button id="submit-btn" type="submit" class="btn">Save Job</button></form>';

  document.getElementById("job-form").addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  clearErrors();

  var title = document.getElementById("title").value.trim();
  var company = document.getElementById("company").value.trim();
  var place = document.getElementById("place").value.trim();
  var description = document.getElementById("description").value.trim();
  var hasError = false;

  if (title.length < 3) {
    showError("title", "Title must be at least 3 characters");
    hasError = true;
  }
  if (company === "") {
    showError("company", "Company is required");
    hasError = true;
  }
  if (place === "") {
    showError("place", "Location is required");
    hasError = true;
  }
  if (description.length < 30) {
    showError("description", "Description must be at least 30 characters");
    hasError = true;
  }
  if (hasError) {
    return;
  }

  var job = editing || {};
  job.title = title;
  job.company = company;
  job.location = place;
  job.type = document.getElementById("type").value;
  job.salary = document.getElementById("salary").value.trim();
  job.description = description;
  if (!job.requirements) {
    job.requirements = ["See the job description"];
  }

  var button = document.getElementById("submit-btn");
  button.disabled = true;
  button.textContent = "Saving...";

  saveJob(job, function (saved) {
    showToast("Job saved!", "success");
    setTimeout(function () { window.location.href = "job-detail.html?id=" + saved.id; }, 800);
  }, function (message) {
    button.disabled = false;
    button.textContent = "Save Job";
    showToast(message, "error");
  });
}

if (jobId === null) {
  showForm(null);
} else {
  area.innerHTML = '<div class="card skeleton"></div>';
  getJob(jobId, function (job) {
    if (job === null || job.postedBy !== getCurrentUser().email) {
      area.innerHTML = messageBoxHTML("Not allowed", "You can only edit your own jobs.", false);
    } else {
      editing = job;
      showForm(job);
    }
  }, function (message) {
    area.innerHTML = messageBoxHTML("Something went wrong", message, true);
    document.getElementById("retry-btn").addEventListener("click", function () {
      window.location.reload();
    });
  });
}
