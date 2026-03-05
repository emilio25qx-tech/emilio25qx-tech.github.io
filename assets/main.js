// Enable snap by default
document.body.classList.add("snap");

const snapToggle = document.getElementById("snapToggle");
if (snapToggle) {
  snapToggle.addEventListener("change", () => {
    document.body.classList.toggle("snap", snapToggle.checked);
  });
}

// Progress bar + current page
const pages = Array.from(document.querySelectorAll(".page"));
const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");

function updateProgress(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const p = max > 0 ? (doc.scrollTop / max) : 0;
  if (progressBar) progressBar.style.width = `${Math.round(p * 100)}%`;

  // Find current page by viewport center
  const mid = window.innerHeight * 0.5;
  let current = 1;
  for (const el of pages) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      current = parseInt(el.dataset.page || "1", 10);
      break;
    }
  }
  if (progressLabel) progressLabel.textContent = `${current} / ${pages.length}`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbHint = document.getElementById("lbHint");

function openLb(src, page){
  lbImg.src = src;
  lbHint.textContent = `Page ${page}`;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}

function closeLb(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

pages.forEach((el) => {
  el.addEventListener("click", () => {
    const img = el.querySelector("img");
    const page = el.dataset.page || "";
    openLb(img.src, page);
  });
});

lbClose?.addEventListener("click", closeLb);
lb?.addEventListener("click", (e) => {
  if (e.target === lb) closeLb();
});

window.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
});