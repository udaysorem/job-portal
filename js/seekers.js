requireRole("admin");

var rows = document.getElementById("rows");

function showSeekers() {
  var seekers = getSeekers();
  rows.innerHTML = "";
  document.getElementById("count").textContent = seekers.length;

  for (var i = 0; i < seekers.length; i++) {
    rows.innerHTML +=
      "<tr><td>" + safe(seekers[i].name) + "</td><td>" + safe(seekers[i].email) + "</td><td>" +
      '<button class="btn btn-danger btn-small remove-btn" data-email="' + safe(seekers[i].email) + '">Remove</button></td></tr>';
  }

  if (seekers.length === 0) {
    rows.innerHTML = '<tr><td colspan="3">No job seekers yet.</td></tr>';
  }
}

// one click listener for all Remove buttons
rows.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    var email = e.target.getAttribute("data-email");
    if (confirm("Remove this job seeker?")) {
      var users = getUsers();
      var kept = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].email !== email) {
          kept.push(users[i]);
        }
      }
      saveUsers(kept);
      showSeekers();
    }
  }
});

showSeekers();
