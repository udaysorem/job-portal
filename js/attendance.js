requireRole("admin");

var dateInput = document.getElementById("date");
var rows = document.getElementById("rows");
var successBox = document.getElementById("success");

dateInput.value = today();
dateInput.max = today(); // future dates cannot be picked

// Draw one row for every job seeker, with the saved choice already ticked
function showRows() {
  var seekers = getSeekers();
  var dayData = getAttendance()[dateInput.value] || {};
  rows.innerHTML = "";

  for (var i = 0; i < seekers.length; i++) {
    var s = seekers[i];
    var presentTick = "";
    var absentTick = "";
    if (dayData[s.email] === "Present") { presentTick = "checked"; }
    if (dayData[s.email] === "Absent") { absentTick = "checked"; }

    rows.innerHTML +=
      "<tr><td>" + safe(s.name) + "</td><td>" + safe(s.email) + "</td><td>" +
      '<label><input type="radio" name="r' + i + '" value="Present" ' + presentTick + "> Present</label> " +
      '<label><input type="radio" name="r' + i + '" value="Absent" ' + absentTick + "> Absent</label>" +
      "</td></tr>";
  }

  if (seekers.length === 0) {
    rows.innerHTML = '<tr><td colspan="3">No job seekers yet.</td></tr>';
  }
}

document.getElementById("save-btn").addEventListener("click", function () {
  clearErrors();
  successBox.classList.add("hidden");

  if (dateInput.value === "") {
    showError("date", "Please choose a date");
    return;
  }
  if (dateInput.value > today()) {
    showError("date", "You cannot mark a future date");
    return;
  }

  var seekers = getSeekers();
  var all = getAttendance();
  var dayData = all[dateInput.value] || {};

  for (var i = 0; i < seekers.length; i++) {
    var chosen = document.querySelector('input[name="r' + i + '"]:checked');
    if (chosen !== null) {
      dayData[seekers[i].email] = chosen.value;
    }
  }

  all[dateInput.value] = dayData;
  saveAttendance(all);
  successBox.classList.remove("hidden");
});

document.getElementById("all-present").addEventListener("click", function () {
  var radios = document.querySelectorAll('input[value="Present"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = true;
  }
});

dateInput.addEventListener("change", showRows);
showRows();
