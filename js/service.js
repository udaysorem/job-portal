// Mock service layer. It acts like an API, but saves data in localStorage.
// Later, each function can call a real backend with fetch() instead.
// Add ?error=1 to any page address to practise the error state.

function readList(key) {
  var saved = localStorage.getItem(key);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function readJobs() {
  var saved = localStorage.getItem("jobs");
  if (saved === null) {
    localStorage.setItem("jobs", JSON.stringify(seedJobs));
    return seedJobs;
  }
  return JSON.parse(saved);
}

function writeJobs(list) {
  localStorage.setItem("jobs", JSON.stringify(list));
}

// Waits a little (like a real server), then returns data or an error
function fakeRequest(work, onSuccess, onError) {
  setTimeout(function () {
    if (window.location.search.includes("error=1")) {
      onError("Could not reach the server. Please try again.");
    } else {
      onSuccess(work());
    }
  }, 700);
}

function getJobs(onSuccess, onError) {
  fakeRequest(readJobs, onSuccess, onError);
}

function getJob(id, onSuccess, onError) {
  fakeRequest(function () {
    var list = readJobs();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === Number(id)) {
        return list[i];
      }
    }
    return null;
  }, onSuccess, onError);
}

// New job (no id) is added. A job with an id is updated.
function saveJob(job, onSuccess, onError) {
  fakeRequest(function () {
    var list = readJobs();
    if (job.id) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === job.id) {
          list[i] = job;
        }
      }
    } else {
      var maxId = 0;
      for (var j = 0; j < list.length; j++) {
        if (list[j].id > maxId) { maxId = list[j].id; }
      }
      job.id = maxId + 1;
      job.date = today();
      job.postedBy = getCurrentUser().email;
      list.push(job);
    }
    writeJobs(list);
    return job;
  }, onSuccess, onError);
}

function deleteJob(id, onSuccess, onError) {
  fakeRequest(function () {
    var list = readJobs();
    var kept = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id !== id) { kept.push(list[i]); }
    }
    writeJobs(kept);
    return true;
  }, onSuccess, onError);
}

function getApplications() {
  return readList("applications");
}

function hasApplied(jobId, email) {
  var apps = getApplications();
  for (var i = 0; i < apps.length; i++) {
    if (apps[i].jobId === jobId && apps[i].email === email) { return true; }
  }
  return false;
}

function applyToJob(job, onSuccess, onError) {
  fakeRequest(function () {
    var user = getCurrentUser();
    var apps = getApplications();
    apps.push({ jobId: job.id, email: user.email, name: user.name, date: today() });
    localStorage.setItem("applications", JSON.stringify(apps));
    addNotification(user.email, "You applied for " + job.title);
    addNotification(job.postedBy, user.name + " applied for " + job.title);
    return true;
  }, onSuccess, onError);
}

function addNotification(email, text) {
  var list = readList("notifications");
  list.unshift({ email: email, text: text, date: today() });
  localStorage.setItem("notifications", JSON.stringify(list.slice(0, 30)));
}

function getNotifications(email) {
  var list = readList("notifications");
  var mine = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].email === email) { mine.push(list[i]); }
  }
  return mine;
}
