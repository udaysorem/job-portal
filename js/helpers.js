// Small helper functions used by all the forms

function showError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.add("input-error");
}

function clearErrors() {
  var errors = document.querySelectorAll(".error-text");
  for (var i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }
  var inputs = document.querySelectorAll("input");
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].classList.remove("input-error");
  }
}

// Fake loading because there is no backend yet
function fakeSubmit(button, loadingText, normalText) {
  var successBox = document.getElementById("success");
  successBox.classList.add("hidden");
  button.disabled = true;
  button.textContent = loadingText;

  setTimeout(function () {
    button.disabled = false;
    button.textContent = normalText;
    successBox.classList.remove("hidden");
  }, 1000);
}
