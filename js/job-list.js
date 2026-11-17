var area = document.getElementById("job-area");
var searchBox = document.getElementById("search");
var typeSelect = document.getElementById("type");
var sortSelect = document.getElementById("sort");
var viewBtn = document.getElementById("view-btn");
var countText = document.getElementById("result-count");

var allJobs = [];
var view = "cards";
var limit = 6; // how many jobs are shown before "Show more"

function loadJobs() {
  area.innerHTML = '<div class="grid">' + skeletonHTML(6) + "</div>";
  getJobs(function (list) {
    allJobs = list;
    showJobs();
  }, function (message) {
    area.innerHTML = messageBoxHTML("Something went wrong", message, true);
    document.getElementById("retry-btn").addEventListener("click", loadJobs);
  });
}

function showJobs() {
  var text = searchBox.value.toLowerCase();
  var result = [];

  // search + filter
  for (var i = 0; i < allJobs.length; i++) {
    var job = allJobs[i];
    var words = (job.title + " " + job.company + " " + job.location).toLowerCase();
    if (words.includes(text) && (typeSelect.value === "all" || job.type === typeSelect.value)) {
      result.push(job);
    }
  }

  // sort
  if (sortSelect.value === "title") {
    result.sort(function (a, b) { return a.title.localeCompare(b.title); });
  } else if (sortSelect.value === "company") {
    result.sort(function (a, b) { return a.company.localeCompare(b.company); });
  } else {
    result.sort(function (a, b) { return b.id - a.id; }); // newest first
  }

  countText.textContent = result.length + " job(s) found";

  if (result.length === 0) {
    area.innerHTML = messageBoxHTML("No jobs found", "Try a different search or filter.", false);
    return;
  }

  var shown = result.slice(0, limit);
  var html = "";

  if (view === "cards") {
    html = '<div class="grid">';
    for (var j = 0; j < shown.length; j++) {
      html += jobCardHTML(shown[j]);
    }
    html += "</div>";
  } else {
    html = '<div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Company</th><th>Location</th><th>Type</th><th>Salary</th></tr></thead><tbody>';
    for (var k = 0; k < shown.length; k++) {
      var s = shown[k];
      html += '<tr><td><a href="job-detail.html?id=' + s.id + '">' + safe(s.title) + "</a></td><td>" + safe(s.company) +
        "</td><td>" + safe(s.location) + "</td><td>" + safe(s.type) + "</td><td>" + safe(s.salary || "-") + "</td></tr>";
    }
    html += "</tbody></table></div>";
  }

  if (result.length > limit) {
    html += '<p class="links"><button id="more-btn" class="btn btn-gray">Show more</button></p>';
  }
  area.innerHTML = html;

  if (result.length > limit) {
    document.getElementById("more-btn").addEventListener("click", function () {
      limit += 6;
      showJobs();
    });
  }
}

// when search or filters change, start again from the first 6
function filtersChanged() {
  limit = 6;
  showJobs();
}

searchBox.addEventListener("input", filtersChanged);
typeSelect.addEventListener("change", filtersChanged);
sortSelect.addEventListener("change", filtersChanged);

viewBtn.addEventListener("click", function () {
  if (view === "cards") {
    view = "table";
    viewBtn.textContent = "Card view";
  } else {
    view = "cards";
    viewBtn.textContent = "Table view";
  }
  showJobs();
});

loadJobs();
