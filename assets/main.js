const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => nav.classList.toggle("isOpen"));

  // close menu after clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("isOpen"));
  });
}
