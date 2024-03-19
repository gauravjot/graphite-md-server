const ejs = require("ejs");
const path = require("path");
const {
	getFiles,
	generateDocPage,
	getDocURI,
	generateHomePage,
} = require("./src/utils.js");

const docs = getFiles(path.join(__dirname, "content"));

// find all a hrefs that are not external, and add .html to them
function escapeInternalLinks(html) {
	const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g;
	return html.replaceAll(regex, (match, p1) => {
		if (p1.startsWith("http")) {
			return match;
		}
		if (p1 === "/" || p1.includes("#")) {
			return match;
		}
		return match.replace(p1, p1 + ".html");
	});
}

function generate_HomePage() {
	const templatePath = path.join(__dirname, "src", "ejs", "index.ejs");
	const templateStr = ejs.fileLoader(templatePath, "utf8");
	const template = ejs.compile(templateStr, { filename: templatePath });

	var html = template(generateHomePage());
	html = escapeInternalLinks(html);

	return html;
}

function generate_DocPages() {
	const templatePath = path.join(__dirname, "src", "ejs", "doc.ejs");
	const templateStr = ejs.fileLoader(templatePath, "utf8");
	const template = ejs.compile(templateStr, { filename: templatePath });

	result = [];
	for (let i = 0; i < docs.length; i++) {
		const fn = getDocURI(docs[i]["category"], docs[i]["path"]);
		const generate = generateDocPage(fn[1]);
		var html = template(generate);
		html = escapeInternalLinks(html);
		result.push({
			filename: fn[1] + ".html",
			html: html,
		});
	}
	return result;
}

function build() {
	// Save in dist folder
	const fs = require("fs");
	const distDir = path.join(__dirname, "dist");
	if (!fs.existsSync(distDir)) {
		// empty dist folder
		fs.rm(distDir, { recursive: true, force: true });
		fs.mkdirSync(distDir);
	}

	// Save Home Page
	console.log("Generating Home Page");
	fs.writeFileSync(path.join(distDir, "index.html"), generate_HomePage());
	console.log("=> Generated index.html\n");

	// Save Doc Pages
	console.log("\nGenerating Doc Pages");
	const pages = generate_DocPages();
	for (let i = 0; i < pages.length; i++) {
		fs.writeFileSync(path.join(distDir, pages[i].filename), pages[i].html);
		console.log("=> Generated " + pages[i].filename);
	}

	// Copy public folder files to dist folder
	fs.cp(
		path.join(__dirname, "public"),
		path.join(__dirname, "dist"),
		{ recursive: true, force: true },
		(err) => {
			if (err) {
				console.error("Error copying public folder to dist folder", err);
			}
		}
	);
}

// Run the build
build();
