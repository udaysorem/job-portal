// Opens and closes the mobile menu
var menuBtn = document.getElementById("menu-btn");
var navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  var isOpen = navLinks.classList.contains("show");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Esc key closes the menu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    navLinks.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", false);
  }
});
