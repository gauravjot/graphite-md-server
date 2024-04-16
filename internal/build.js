import {fileLoader, compile} from "ejs";
import path from "path";
import {
	cpSync,
	existsSync,
	mkdirSync,
	writeFileSync,
	readdirSync,
	statSync,
	readFileSync,
} from "fs";
import {getFiles} from "../src/utils/get_files.js";
import {generateDocPage} from "../src/utils/generate_doc_page.js";
import {getDocURL} from "../src/utils/get_doc_url.js";
import {fileURLToPath} from "url";
import {minify} from "html-minifier";
import readline from "node:readline";
import chalk from "chalk";

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
		const url = getDocURL(content_dir, docTree[i]["path"]);
		// Get to-be filename
		const filename = url.split("/").pop();
		// Generate HTML
		const generate = generateDocPage(url);
		let html = template(generate);
		html = minify(html, MINIFY_OPTIONS);
		// write .html file at to-be path
		writeFileSync(path.join(doc_dist_path, filename), html, (err) => {
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
		let {size} = statSync(path.join(doc_dist_path, filename));
		size = (size / 1024).toFixed(2);
		size += "KB";
		console.log(chalk.cyan("[Done]"), url, chalk.green(size));
	}
}

/**
 * Build the site
 * Steps:
 * 1. Ask to build the sitemap
 * 2. Make the dist folder
 * 3. Save the Doc Pages
 * 4. Copy public folder files to dist folder
 * 5. Save the sitemap
 */
async function build() {
	// 1. Ask user if they want to build the sitemap
	if (process.argv.includes("--sitemap")) {
		buildSitemap = true;
		console.log("\nBuild sitemap flag found.");
	} else {
		console.log("\nSitemap");
		// Ask user if they want to build the sitemap
		if ((await askQuestion("Do you want to build a sitemap? (y/N): ")) === "y") {
			buildSitemap = true;
		} else {
			console.log(chalk.blue("[Info]"), "No sitemap will be built.");
		}
	}
	if (buildSitemap) {
		if (process.argv.includes("--baseurl")) {
			baseURL = process.argv[process.argv.indexOf("--baseurl") + 1];
			console.log(`Using base URL: ${baseURL}`);
		} else {
			// Ask user for the base URL
			baseURL = await askQuestion("Enter the base URL (e.g. https://example.com): ");
			// remove trailing slash
			baseURL = baseURL.replace(/\/$/, "");
		}
	}

	// 2. Dist folder
	console.log();
	console.log(chalk.blue("[Info]"), "Starting build...");
	if (!existsSync(distDir)) {
		mkdirSync(distDir, (err) => {
			if (err) {
				console.error("Error creating dist folder", err);
				return;
			}
		});
		console.log(chalk.blue("[Info]"), "Created dist folder");
	}

	/*
	 * 3. Save Doc Pages
	 */
	// Since all docs pages use same template
	const templatePath = path.join(baseDir, "src", "templates", "doc_page.ejs");
	const templateStr = fileLoader(templatePath, "utf8");
	const template = compile(templateStr, {filename: templatePath});
	// Get the files
	console.log("\nGenerating Doc Pages");
	// Generate the pages
	generate_DocPages(template, getFiles(content_dir));

	// 4. Copy public folder files to dist folder
	cpSync(path.join(baseDir, "public"), distDir, {recursive: true, force: true}, (err) => {
		if (err) {
			console.error(
				"Error copying public folder to dist folder. Please manually move the contents of public folder to dist folder.",
				err,
			);
		}
	});
	console.log();
	console.log(chalk.cyan("[Done]"), "Copied public directory");

	// 4.1 Copy pd-static folder files to dist folder
	cpSync(
		path.join(baseDir, "pd-static"),
		path.join(distDir, "pd-static"),
		{recursive: true, force: true},
		(err) => {
			if (err) {
				console.error(
					"Error copying pd-static folder to dist folder. Please manually move the contents of assets folder to dist folder.",
					err,
				);
			}
		},
	);
	console.log(chalk.cyan("[Done]"), "Copied pd-static directory");

	// Minify files inside pd-static
	const jsFiles = readdirSync(path.join(distDir, "pd-static"));
	for (let i = 0; i < jsFiles.length; i++) {
		let item_path = path.join(distDir, "pd-static", jsFiles[i]);
		if (statSync(item_path).isDirectory() || !jsFiles[i].endsWith(".js")) {
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

	// 5. Save sitemap
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
		console.log(chalk.cyan("[Done]"), "sitemap.xml", chalk.green(filesize(sitemapPath)));

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
		console.log(chalk.cyan("[Done]"), "robots.txt", chalk.green(filesize(robotsPath)));
	}

	// Success message
	console.log("\nBuild complete! Files are saved in dist folder. 🎉\n");
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
function filesize(path) {
	let {size} = statSync(path);
	size = (size / 1024).toFixed(2);
	return size + "KB";
}
