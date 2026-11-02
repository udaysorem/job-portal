requireRole("admin");

var seekers = getSeekers();
var todayData = getAttendance()[today()] || {};
var present = 0;
var absent = 0;

for (var i = 0; i < seekers.length; i++) {
  var mark = todayData[seekers[i].email];
  if (mark === "Present") {
    present++;
  } else if (mark === "Absent") {
    absent++;
  }
}

document.getElementById("today").textContent = today();
document.getElementById("total").textContent = seekers.length;
document.getElementById("present").textContent = present;
document.getElementById("absent").textContent = absent;
document.getElementById("not-marked").textContent = seekers.length - present - absent;
