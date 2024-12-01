// Copy code block buttons
const btns = document.querySelectorAll("button.markdown-it-code-copy");
const clipboard = new ClipboardJS(btns);

clipboard.on("success", function (e) {
  let innerHTML = e.trigger.innerHTML;
  e.trigger.innerHTML = "Copied!";
  setTimeout(() => {
    e.trigger.innerHTML = innerHTML;
  }, 3000);
});

// Sidebar toggle
// Topbar toggler
const sidebar_toggler = document.getElementById('sidebar-toggler');
// Togglers inside the sidebar
const sidebar_toggle = document.getElementById("sidebar-toggle");
const sidebar_toggle_closed = document.getElementById("sidebar-toggle-closed");
// Sidebar and content
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
// Check if the screen is mobile
let isMobile = window.matchMedia("only screen and (max-width: 1023px)").matches;

function toggleSidebar() {
  if (sidebar?.dataset.hidden === "true") {
    showSidebar();
  } else {
    hideSidebar();
  }
}
function showSidebar() {
  if (!sidebar) return;
  if (isMobile) {
    sidebar.dataset.hidden = "false";
    content?.classList.remove("sidebar-open");
  } else {
    sidebar.dataset.hidden = "false";
    content?.classList.add("sidebar-open");
    content?.classList.remove("ml-16");
  }
}
function hideSidebar() {
  if (window.matchMedia("only screen and (min-width: 1536px)").matches) {
    return; // dont hide sidebar on large screens
  }
  if (!sidebar) return;
  if (isMobile) {
    sidebar.dataset.hidden = "true";
    content?.classList.remove("sidebar-open");
  } else {
    sidebar.dataset.hidden = "true";
    content?.classList.remove("sidebar-open");
    content?.classList.add("ml-16");
  }
}

// Initial setup
if (isMobile) {
  hideSidebar();
}
// Show/hide sidebar on resize
window.addEventListener("resize", () => {
  isMobile = window.matchMedia("only screen and (max-width: 1023px)").matches;
  if (isMobile) {
    hideSidebar();
  } else {
    showSidebar();
  }
});

// Add event listeners
sidebar_toggler?.addEventListener("click", toggleSidebar);
sidebar_toggle?.addEventListener("click", hideSidebar);
sidebar_toggle_closed?.addEventListener("click", showSidebar);