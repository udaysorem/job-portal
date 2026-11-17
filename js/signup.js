var form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;
  var role = document.getElementById("role").value;
  var hasError = false;

  // only these two roles can be chosen here. Admin accounts are not created on this page.
  if (role !== "seeker" && role !== "recruiter") {
    role = "seeker";
  }

  if (name.trim() === "") {
    showError("name", "Name is required");
    hasError = true;
  }
  if (!email.includes("@")) {
    showError("email", "Please enter a valid email");
    hasError = true;
  } else if (emailExists(email)) {
    showError("email", "This email is already registered");
    hasError = true;
  }
  if (password.length < 8) {
    showError("password", "Password must be at least 8 characters");
    hasError = true;
  }
  if (confirm !== password) {
    showError("confirm", "Passwords do not match");
    hasError = true;
  }

  if (!hasError) {
    var users = getUsers();
    users.push({ name: name.trim(), email: email, password: password, role: role });
    saveUsers(users);
    fakeSubmit(document.getElementById("submit-btn"), "Creating account...", "Sign Up");
  }
});
