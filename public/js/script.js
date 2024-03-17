// Light and dark theme
if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    localStorage.getItem("theme") !== "light"
) {
    document.querySelector("body").classList.add("dark");
    localStorage.setItem("theme", "dark");
}
function toggleTheme() {
    document.querySelector("body").classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.querySelector("body").classList.contains("dark")
            ? "dark"
            : "light"
    );
}

// Sidebar toggle
let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
if (isMobile) {
    document.getElementById("content").classList.remove("ml-80");
    document.getElementById("sidebar").setAttribute("aria-hidden", "true");
}
window.addEventListener("resize", () => {
    isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    if (isMobile) {
        document.getElementById("sidebar").setAttribute("aria-hidden", "true");
        document.getElementById("content").classList.remove("ml-80");
    } else {
        document.getElementById("sidebar").setAttribute("aria-hidden", "false");
        document.getElementById("content").classList.add("ml-80");
    }
});
function toggleSidebar() {
    if (
        document.getElementById("sidebar").getAttribute("aria-hidden") ===
        "false"
    ) {
        document.getElementById("sidebar").setAttribute("aria-hidden", "true");
        document.getElementById("content").classList.remove("ml-80");
    } else {
        document.getElementById("sidebar").setAttribute("aria-hidden", "false");
        if (!isMobile)
            document.getElementById("content").classList.add("ml-80");
    }
}

// Highlight the current page in the sidebar
const sidebarDocList = document
    .getElementById("sidebar-doc-list")
    .getElementsByTagName("li");
for (let i = 0; i < sidebarDocList.length; i++) {
    if (sidebarDocList[i].id === getLastURLPart()) {
        sidebarDocList[i].setAttribute("aria-current", "page");
    }
}
function getLastURLPart() {
    let part = window.location.href.split("/").slice(-1)[0];
    if (part === "") {
        return window.location.href.split("/").slice(-2)[0];
    }
    return part;
}
