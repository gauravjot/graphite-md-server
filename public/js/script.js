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
		document.querySelector("body").classList.contains("dark") ? "dark" : "light"
	);
}

// Sidebar toggle: breakpoint `md`
let isMobile = window.matchMedia("only screen and (max-width: 1024px)").matches;
if (isMobile) {
	hideSidebar();
}
window.addEventListener("resize", () => {
	isMobile = window.matchMedia("only screen and (max-width: 1024px)").matches;
	if (isMobile) {
		hideSidebar();
	} else {
		showSidebar();
	}
});
function toggleSidebar() {
	if (document.getElementById("sidebar").getAttribute("aria-hidden") === "true") {
		showSidebar();
	} else {
		hideSidebar();
	}
}
function showSidebar() {
	if (isMobile) {
		document.getElementById("sidebar").setAttribute("aria-hidden", "false");
		document.getElementById("content").classList.remove("sidebar-open");
		document.getElementById("content").classList.add("ml-12");
	} else {
		document.getElementById("sidebar").setAttribute("aria-hidden", "false");
		document.getElementById("content").classList.add("sidebar-open");
		document.getElementById("content").classList.remove("ml-16");
	}
}
function hideSidebar() {
	if (isMobile) {
		document.getElementById("sidebar").setAttribute("aria-hidden", "true");
		document.getElementById("content").classList.remove("sidebar-open");
		document.getElementById("content").classList.add("ml-12");
	} else {
		document.getElementById("sidebar").setAttribute("aria-hidden", "true");
		document.getElementById("content").classList.remove("sidebar-open");
		document.getElementById("content").classList.add("ml-16");
	}
}

// Expand accordion for open page
const sidebarDocList = document
	.getElementById("sidebar-doc-list")
	.getElementsByTagName("a");
for (let i = 0; i < sidebarDocList.length; i++) {
	if (sidebarDocList[i].id === getLastURLPart()) {
		let parent = sidebarDocList[i].parentElement;
		while (parent.id !== "sidebar-doc-list") {
			// if tagName is button, then it is an accordion
			if (parent.tagName === "DIV" && parent.classList.contains("accordion")) {
				console.log(parent);
				parent.setAttribute("aria-expanded", "true");
			}

			parent = parent.parentElement;
		}
		break;
	}
}
function getLastURLPart() {
	let part = window.location.href.split("/").slice(-1)[0];
	if (part === "") {
		return window.location.href.split("/").slice(-2)[0];
	}
	return part.replace(".html", "");
}

// Sidebar accordions on click listeners
const sidebarAccordions = document.getElementsByClassName("accordion");
for (let i = 0; i < sidebarAccordions.length; i++) {
	// Get first element of the accordion
	const button = sidebarAccordions[i].getElementsByTagName("button")[0];
	button.addEventListener("click", function (e) {
		e.preventDefault();
		button.parentElement.setAttribute(
			"aria-expanded",
			button.parentElement.getAttribute("aria-expanded") === "true"
				? "false"
				: "true"
		);
	});
}

// Get all headings under the element with id `md-content`
const mdContent = document.getElementById("md-content");
const mdHeadings = mdContent.querySelectorAll("h2, h3, h4, h5, h6");
// Get all hrefs of a tag inside heading, also note the level
const mdHeadingList = [];
for (let i = 0; i < mdHeadings.length; i++) {
	mdHeadingList.push({
		text: mdHeadings[i].textContent,
		href: mdHeadings[i].querySelector("a").href,
		level: mdHeadings[i].tagName,
	});
}
// Render the table of contents
const mdToc = document.getElementById("toc");
for (let i = 0; i < mdHeadingList.length; i++) {
	const li = document.createElement("li");
	li.innerHTML = `<a href="${mdHeadingList[i].href}">${mdHeadingList[i].text}</a>`;
	giveMarginForHeading(li, mdHeadingList[i]);
	mdToc.appendChild(li);
}
function giveMarginForHeading(li, heading) {
	if (heading.level === "H2" || heading.level === "H1") {
		li.classList.add("pl-0");
	} else if (heading.level === "H3") {
		li.classList.add("pl-2");
	} else if (heading.level === "H4") {
		li.classList.add("pl-4");
	} else {
		li.classList.add("pl-6");
	}
}
// Highlight the current heading in toc on page scroll
let tocLinks = document.getElementById("toc");
if (typeof tocLinks !== "undefined" && tocLinks !== null) {
	tocLinks = tocLinks.getElementsByTagName("a");
	window.addEventListener("scroll", () => {
		// If mobile, return
		if (window.matchMedia("only screen and (max-width: 1024px)").matches) {
			return;
		}
		let latest;
		let fromTop = window.scrollY;
		for (let i = 0; i < mdHeadingList.length; i++) {
			let section = document.getElementById(mdHeadingList[i].href.split("#")[1]);
			// When heading is halfway from top, highlight the toc link
			if (
				section.offsetTop <= fromTop + screen.height / 2 &&
				section.offsetTop + section.offsetHeight > fromTop + screen.height / 2
			) {
				// Remove if new heading is selected
				latest = tocLinks[i];
			}
		}
		if (latest) {
			for (let i = 0; i < tocLinks.length; i++) {
				tocLinks[i].setAttribute("aria-current", "false");
			}
			latest.setAttribute("aria-current", "true");
		}
	});
}
