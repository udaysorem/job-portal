var searchBox = document.getElementById("search");
var jobList = document.getElementById("job-list");
var noJobs = document.getElementById("no-jobs");

// Show the jobs that match the search text
function showJobs(searchText) {
  jobList.innerHTML = "";
  var count = 0;

  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    if (job.title.toLowerCase().includes(searchText.toLowerCase())) {
      jobList.innerHTML +=
        '<div class="card">' +
        "<h3>" + job.title + "</h3>" +
        "<p>" + job.company + "</p>" +
        '<p class="gray">' + job.location + "</p>" +
        '<span class="badge">' + job.type + "</span>" +
        "</div>";
      count++;
    }
  }

  // show the empty message if nothing matched
  if (count === 0) {
    noJobs.classList.remove("hidden");
  } else {
    noJobs.classList.add("hidden");
  }
}

searchBox.addEventListener("input", function () {
  showJobs(searchBox.value);
});

// show all jobs when the page opens
showJobs("");
