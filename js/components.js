// Reusable pieces. Each function returns HTML text or shows something on the page.

function showToast(message, type) {
  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 3000);
}

function jobCardHTML(job) {
  return '<div class="card">' +
    '<h3><a href="job-detail.html?id=' + job.id + '">' + safe(job.title) + "</a></h3>" +
    "<p>" + safe(job.company) + "</p>" +
    '<p class="gray">' + safe(job.location) + "</p>" +
    '<span class="badge">' + safe(job.type) + "</span></div>";
}

function statCardHTML(number, label) {
  return '<div class="card stat"><h3>' + number + "</h3><p>" + label + "</p></div>";
}

// Loading state: grey boxes while data "loads"
function skeletonHTML(count) {
  var html = "";
  for (var i = 0; i < count; i++) {
    html += '<div class="card skeleton"></div>';
  }
  return html;
}

// Used for both empty and error states
function messageBoxHTML(title, text, withRetry) {
  var html = '<div class="state-box"><h3>' + title + "</h3><p>" + text + "</p>";
  if (withRetry) {
    html += '<button id="retry-btn" class="btn">Try again</button>';
  }
  return html + "</div>";
}

// Reusable form fields
function fieldHTML(id, label, type, value) {
  return '<div class="field"><label for="' + id + '">' + label + "</label>" +
    '<input id="' + id + '" type="' + type + '" value="' + safe(value) + '" aria-describedby="' + id + '-error">' +
    '<p id="' + id + '-error" class="error-text"></p></div>';
}

function selectHTML(id, label, options, value) {
  var html = '<div class="field"><label for="' + id + '">' + label + '</label><select id="' + id + '">';
  for (var i = 0; i < options.length; i++) {
    var picked = "";
    if (options[i] === value) { picked = "selected"; }
    html += '<option value="' + options[i] + '" ' + picked + ">" + options[i] + "</option>";
  }
  return html + "</select></div>";
}

function textareaHTML(id, label, value) {
  return '<div class="field"><label for="' + id + '">' + label + "</label>" +
    '<textarea id="' + id + '" rows="5" aria-describedby="' + id + '-error">' + safe(value) + "</textarea>" +
    '<p id="' + id + '-error" class="error-text"></p></div>';
}
