import {fileLoader, compile} from "ejs";
import path from "path";
import {
	cpSync,
	writeFile,
	mkdir,
	existsSync,
	mkdirSync,
	readFile,
	writeFileSync,
	readdirSync,
	statSync,
	readFileSync,
} from "fs";
import {getFiles, generateDocPage, getDocURL, generateHomePage} from "../src/utils.js";
import {fileURLToPath} from "url";
import {minify} from "html-minifier";
import readline from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sitemap
// Reference: https://www.sitemaps.org/protocol.html
let buildSitemap = false;
let baseURL = "";
/**
 * Sitemap
 * @type {{loc: string; lastmod: string; changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"}[]}
 * @description
 * This is the sitemap for the build files.
 * Each object in the array represents a navigable page.
 */
const sitemap = [];
/**
 * Sitemap Change Frequency
 */
const scf = "daily";

/**
 * Base Directory
 */
const baseDir = path.join(__dirname, "..");

/**
 * Build Directory
 */
const distDir = path.join(__dirname, "..", "dist");

/**
 * Content Directory
 */
const content_dir = path.join(__dirname, "..", "content");

/**
 * Minify Options
 */
const MINIFY_OPTIONS = {
	keepClosingSlash: true,
	removeOptionalTags: false,
	removeComments: true,
	collapseWhitespace: true,
	minifyJS: true,
};

function generate_HomePage() {
	const templatePath = path.join(baseDir, "src", "templates", "home_page.ejs");
	const templateStr = fileLoader(templatePath, "utf8");
	const template = compile(templateStr, {filename: templatePath});

	var html = template(generateHomePage());
	html = minify(html, MINIFY_OPTIONS);

	// Add to sitemap
	if (buildSitemap)
		sitemap.push({
			loc: `${baseURL}/`,
			lastmod: new Date().toISOString(),
			changefreq: scf,
		});

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

		// Get new to-be path in dist folder
		let doc_dist_path = path.dirname(docTree[i]["path"]).split(content_dir)[1];
		doc_dist_path = path.join(distDir, doc_dist_path);
		// See if directory is created in dist
		if (!existsSync(doc_dist_path)) {
			// make directory
			mkdirSync(doc_dist_path);
		}

		// Get to-be URL of this doc
		const url = getDocURL(docTree[i]["path"]);
		// Get to-be filename
		const filename = url.split("/").pop();
		// Generate HTML
		const generate = generateDocPage(url);
		let html = template(generate);
		html = minify(html, MINIFY_OPTIONS);
		// write .html file at to-be path
		writeFile(path.join(doc_dist_path, filename), html, (err) => {
			if (err) {
				console.error("Error writing file", err);
			}
		});
		// Add to sitemap
		if (buildSitemap) {
			sitemap.push({
				loc: `${baseURL}${url}`,
				lastmod: new Date().toISOString(),
				changefreq: scf,
			});
		}
		// Log
		console.log("=> Generated " + url);
	}
}

/**
 * Build the site
 * Steps:
 * 1. Ask to build the sitemap
 * 2. Make the dist folder
 * 3. Save the Home Page
 * 4. Save the Doc Pages
 * 5. Copy public folder files to dist folder
 * 6. Save the sitemap
 */
async function build() {
	// 1. Ask user if they want to build the sitemap
	if (process.argv.includes("--sitemap")) {
		buildSitemap = true;
		console.log("\nBuild sitemap flag found.");
	} else {
		// Ask user if they want to build the sitemap
		if ((await askQuestion("Do you want to build a sitemap? (y/N):")) === "y") {
			buildSitemap = true;
		} else {
			console.log("No sitemap will be built.");
		}
	}
	if (buildSitemap) {
		if (process.argv.includes("--baseurl")) {
			baseURL = process.argv[process.argv.indexOf("--baseurl") + 1];
			console.log(`Using base URL: ${baseURL}`);
		} else {
			// Ask user for the base URL
			baseURL = await askQuestion("Enter the base URL (e.g. https://example.com):");
			// remove trailing slash
			baseURL = baseURL.replace(/\/$/, "");
		}
	}

	// 2. Dist folder
	console.log("\nStarting build...");
	if (!existsSync(distDir)) {
		mkdir(distDir, (err) => {
			if (err) {
				console.error("Error creating dist folder", err);
				return;
			}
		});
		console.log("\nCreated dist folder");
	}

	// 3. Save Home Page
	console.log("\nGenerating Home Page");
	let html = minify(generate_HomePage(), {
		keepClosingSlash: true,
		removeOptionalTags: false,
		removeComments: true,
		collapseWhitespace: true,
		minifyJS: true,
	});
	writeFile(path.join(distDir, "index.html"), html, (err) => {
		if (err) {
			console.error("Error writing file", err);
			return;
		}
	});
	console.log("=> Generated index.html\n");

	/*
	 * 4. Save Doc Pages
	 */
	// Since all docs pages use same template
	const templatePath = path.join(baseDir, "src", "templates", "doc_page.ejs");
	const templateStr = fileLoader(templatePath, "utf8");
	const template = compile(templateStr, {filename: templatePath});
	// Get the files
	console.log("Generating Doc Pages");
	// Generate the pages
	generate_DocPages(template, getFiles(content_dir));

	// 5. Copy public folder files to dist folder
	cpSync(path.join(baseDir, "public"), distDir, {recursive: true, force: true}, (err) => {
		if (err) {
			console.error(
				"Error copying public folder to dist folder. Please manually move the contents of public folder to dist folder.",
				err,
			);
		}
	});
	console.log("\nCopied public directory");

	// Minify files inside dist/js
	const jsFiles = readdirSync(path.join(distDir, "js"));
	for (let i = 0; i < jsFiles.length; i++) {
		let item_path = path.join(distDir, "js", jsFiles[i]);
		if (statSync(item_path).isDirectory()) {
			// this is a directory
			continue;
		}
		try {
			let jsCode = readFileSync(item_path, "utf8");
			jsCode = minifyJS(jsCode);
			writeFileSync(item_path, jsCode, (err) => {
				if (err) {
					console.error("Error writing JS file", err);
				}
			});
		} catch (err) {}
	}

	// 5.1 Copy assets folder files to dist folder
	cpSync(
		path.join(baseDir, "assets"),
		path.join(distDir, "assets"),
		{recursive: true, force: true},
		(err) => {
			if (err) {
				console.error(
					"Error copying assets folder to dist folder. Please manually move the contents of assets folder to dist folder.",
					err,
				);
			}
		},
	);
	console.log("\nCopied assets directory");

	// 6. Save sitemap
	if (buildSitemap) {
		console.log("\nGenerating Sitemap");
		const sitemapPath = path.join(distDir, "sitemap.xml");
		let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
		sitemap.forEach((page) => {
			sitemapXML += `<url><loc>${page.loc}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq></url>\n`;
		});
		sitemapXML += `</urlset>`;
		writeFileSync(sitemapPath, sitemapXML, (err) => {
			if (err) {
				console.error("Error writing sitemap file", err);
			}
		});
		console.log("=> Generated sitemap.xml");

		// Generate robots.txt with sitemap
		const robotsPath = path.join(distDir, "robots.txt");

		let rb_contents = "";
		try {
			readFileSync(robotsPath, "utf8");
		} catch (err) {
			rb_contents = "User-agent: *";
		}
		rb_contents += `\n\nSitemap: ${baseURL}/sitemap.xml`;
		writeFileSync(robotsPath, rb_contents, (err) => {
			if (err) {
				console.error("Error writing robots.txt file", err);
			}
		});
		console.log("=> Generated robots.txt\n");
	}

	// Success message
	console.log("Build complete! Files are saved in dist folder. 🎉\n");
}

// Run build function if this file is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) build();

/**
 * Helper function to create a readline interface
 * @param {string} query
 */
function askQuestion(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			rl.close();
			resolve(ans);
		}),
	);
}
export function minifyJS(code) {
	// Preserve string literals
	const stringLiterals = [];
	code = code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
		const replacement = `___STRING${stringLiterals.length}___`;
		stringLiterals.push(match);
		return replacement;
	});

	// Remove comments (single-line and multi-line)
	code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

	// Minify code while preserving necessary spaces
	code = code.replace(/\s+/g, " "); // Replace all white spaces with a single space
	code = code.replace(/\s*([()\[\]{};,.+\-*\/%="|&!<>:])\s*/g, "$1"); // Remove spaces around operators and punctuations

	// Restore string literals
	stringLiterals.forEach((literal, index) => {
		const placeholder = `___STRING${index}___`;
		code = code.replace(placeholder, literal);
	});
	code = code.trim();

	return code;
}
