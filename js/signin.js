var form = document.getElementById("signin-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var hasError = false;

  if (!email.includes("@")) {
    showError("email", "Please enter a valid email");
    hasError = true;
  }
  if (password.length < 8) {
    showError("password", "Password must be at least 8 characters");
    hasError = true;
  }

  if (!hasError) {
    var user = findUser(email, password);

    if (user === null) {
      showError("password", "Wrong email or password");
    } else {
      fakeSubmit(document.getElementById("submit-btn"), "Signing in...", "Sign In", function () {
        login(user);
        // each role goes to its own first page
        setTimeout(function () {
          if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
          } else {
            window.location.href = "dashboard.html";
          }
        }, 700);
      });
    }
  }
});
