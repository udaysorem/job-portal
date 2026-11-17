var form = document.getElementById("forgot-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  var email = document.getElementById("email").value;

  if (!email.includes("@")) {
    showError("email", "Please enter a valid email");
    return;
  }

  fakeSubmit(document.getElementById("submit-btn"), "Sending...", "Send Reset Link");
});
