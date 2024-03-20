const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const {
	getFiles,
	generateDocPage,
	getDocURI,
	generateHomePage,
} = require("./src/utils.js");

const distDir = path.join(__dirname, "dist");

/**
 * [THIS IS THE SKETCHY BIT ABOUT THE BUILD SCRIPT]
 * find all a hrefs that are not external, and add .html to them
 * @param {string} html
 * @returns
 */
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

/**
 *
 * @param {*} template
 * @param {{path: string; title: string; files?: [];}[]} docTree
 * @returns
 */
function generate_DocPages(template, docTree) {
	for (let i = 0; i < docTree.length; i++) {
		if (docTree[i].files) {
			// this is a directory
			generate_DocPages(template, docTree[i].files);
			continue;
		}

		const fn = getDocURI(docTree[i]["path"], true);
		const generate = generateDocPage(fn);
		var html = template(generate);
		html = escapeInternalLinks(html);
		fs.writeFileSync(path.join(distDir, fn + ".html"), html);
		console.log("=> Generated " + fn + ".html");
	}
}

function build() {
	// Save in dist folder
	console.log("\nBuilding...\n");
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir);
		console.log("\nCreated dist folder");
	}

	// Save Home Page
	console.log("\nGenerating Home Page");
	fs.writeFileSync(path.join(distDir, "index.html"), generate_HomePage());
	console.log("=> Generated index.html\n");

	/*
	 * Save Doc Pages
	 */
	// Since all docs pages use same template
	const templatePath = path.join(__dirname, "src", "ejs", "doc.ejs");
	const templateStr = ejs.fileLoader(templatePath, "utf8");
	const template = ejs.compile(templateStr, { filename: templatePath });
	// Get the files
	const docs = getFiles(path.join(__dirname, "content"));
	console.log("Generating Doc Pages");
	// Generate the pages
	generate_DocPages(template, docs);

	// Copy public folder files to dist folder
	fs.cp(
		path.join(__dirname, "public"),
		path.join(__dirname, "dist"),
		{ recursive: true, force: true },
		(err) => {
			if (err) {
				console.error(
					"Error copying public folder to dist folder. Please manually move the contents of public folder to dist folder.",
					err
				);
			}
		}
	);

	// Success message
	console.log("\nBuild complete! Files are saved in dist folder. 🎉\n");
}

// Run the build
build();
