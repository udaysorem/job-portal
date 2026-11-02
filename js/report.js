requireRole("admin");

var rows = document.getElementById("rows");
var searchBox = document.getElementById("search");

// Count present and absent days for each job seeker
function showReport(searchText) {
  var seekers = getSeekers();
  var all = getAttendance();
  var shown = 0;
  rows.innerHTML = "";

  for (var i = 0; i < seekers.length; i++) {
    var s = seekers[i];

    if (s.name.toLowerCase().includes(searchText.toLowerCase())) {
      var present = 0;
      var absent = 0;

      for (var date in all) {
        var mark = all[date][s.email];
        if (mark === "Present") {
          present++;
        } else if (mark === "Absent") {
          absent++;
        }
      }

      var marked = present + absent;
      var percentText = "-";
      if (marked > 0) {
        var percent = Math.round((present / marked) * 100);
        var look = "badge-good";
        if (percent < 75) { look = "badge-low"; }
        percentText = '<span class="badge ' + look + '">' + percent + "%</span>";
      }

      rows.innerHTML +=
        "<tr><td>" + safe(s.name) + "</td><td>" + safe(s.email) + "</td><td>" +
        marked + "</td><td>" + present + "</td><td>" + absent + "</td><td>" + percentText + "</td></tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows.innerHTML = '<tr><td colspan="6">No job seekers found.</td></tr>';
  }
}

searchBox.addEventListener("input", function () {
  showReport(searchBox.value);
});

showReport("");
