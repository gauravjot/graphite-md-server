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
