import fs from "fs";
import matter from "gray-matter";
import path from "path";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import {fileURLToPath} from "url";
import katex from "katex";
import tm from "markdown-it-texmath";
import footnote_plugin from "markdown-it-footnote";
import markdownItCodeCopy from "markdown-it-code-copy";

// get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// markdown-it options
const md = MarkdownIt({
	html: true,
	xhtmlOut: true,
	breaks: true,
	highlight: function (str, lang) {
		// lang may be e.g. "javacript_good" or "javascript_bad"
		// where good and bad are visual cues through css for codeblock
		if (lang && hljs.getLanguage(lang.split("_")[0])) {
			try {
				let block = `<pre ${lang.split("_")[1] ? `class="${lang.split("_")[1]}"` : ""}>`;
				block += `<code class="language-${lang.split("_")[0]}">`;
				block += hljs.highlight(str, {language: lang.split("_")[0]}).value;
				block += "</code></pre>";
				return block;
			} catch (__) {}
		}

		return ""; // use external default escaping
	},
});
md.use(anchor, {
	slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-")),
	permalink: anchor.permalink.headerLink({
		safariReaderFix: true,
	}),
});
md.use(tm, {
	engine: katex,
	delimiters: "dollars",
	katexOptions: {output: "mathml", trust: true},
});
md.use(markdownItCodeCopy, {
	iconClass: "copy-icon",
	iconStyle: "",
});
md.use(footnote_plugin);

/************************************************************/
/* Functions                                                */
/************************************************************/

/**
 * Get all md files from the content folder and the subfolders
 * @param {string} dir - Path to directory where files are located
 * @returns {{path: string; title: string; files?:[]}[]} readable file tree of md files
 */
export function getFiles(dir) {
	let files_ = [];
	const files = fs.readdirSync(dir);
	// sort alphabetically
	files.sort((a, b) => {
		if (a < b) {
			return -1;
		}
		return 1;
	});
	// iterate over files and recurse if it is a directory
	for (var i in files) {
		let file_path = dir + "/" + files[i];
		if (fs.statSync(file_path).isDirectory()) {
			let dir_files = getFiles(file_path);
			if (dir_files.length > 0) {
				files_.push({
					title: files[i],
					path: file_path,
					files: dir_files,
				});
			}
		} else {
			if (!files[i].endsWith(".md") || files[i].startsWith("_")) {
				continue;
			}
			files_.push({
				path: file_path,
				title: matter.read(path.resolve(file_path)).data.title || files[i].replace(".md", ""),
			});
		}
	}
	return files_;
}

/**
 * Generates URL string of the doc
 *
 * @param {string} filePath - Path to file
 * @returns {string} - URL for doc
 */
export function getDocURL(filePath) {
	if (!filePath) {
		return;
	}
	if (filePath.endsWith(".html")) {
		return filePath; // already html path given
	}
	let uri = filePath
		.split(path.join(__dirname, "..", "content"))
		.pop()
		.replace(/^\/|\/$/g, "");
	// it is a file, return URL string, replace .md with empty string
	const encoded_uri_chunks = uri.split("/");
	for (let i = 0; i < encoded_uri_chunks.length; i++) {
		// encode each chunk
		encoded_uri_chunks[i] = encodeURIComponent(encoded_uri_chunks[i]);
	}
	return "/" + encoded_uri_chunks.join("/").replace(/\.md$/, "") + ".html";
}

/**
 * Takes string like folder1/folder2/this_article.md and returns title
 *
 * @param {string} filepath e.g. folder1/folder2/this_article.md
 * @returns {string} title of the document
 */
export function parseDocTitleFromURI(filepath) {
	if (!filepath) {
		return "";
	}
	let baseDir = path.join(__dirname, "..", "content");
	let filePath = path.join(baseDir, filepath);
	// read file
	const file = matter.read(filePath);
	return file.data.title || filepath.replace(/^\d+_/, "").replaceAll("_", " ");
}

/**
 * This function generates a list that is used in the sidebar
 * to show the document tree
 *
 * @param {{path: string; title: string; files?:[]}[]} data - output of getFiles() function
 * @param {string} highlight - path of doc to highlight if it is opened
 * @returns {string} HTML
 */
export function generateSidebarList(data, highlight = "") {
	let html = "<ul><div>";
	data.forEach((item) => {
		if (item.files) {
			let dir_name = item.path.split("/").pop();
			html += '<div class="accordion" id="' + dir_name + '">';
			// regex [digit+]_ to remove the number prefix
			if (/^\d+_/.test(dir_name)) {
				dir_name = dir_name.replace(/^\d+_/, "");
			}
			html +=
				'<button class="accordion__button"><span>' +
				dir_name.replaceAll("_", " ") +
				"</span></button>";
			html += generateSidebarList(item.files, highlight);
			html += "</div>";
		} else {
			let name = item.title;
			// Regex [digit+]_ to remove the number prefix.
			// This will only be true if no title is given inside .md file
			// and file name is being used instead.
			if (/^\d+_/.test(name)) {
				name = name.replace(/^\d+_/, "");
			}
			html +=
				'<li><a href="' +
				getDocURL(item.path) +
				'" aria-current="' +
				(highlight === item.path) +
				'">' +
				name +
				"</a></li>";
		}
	});
	html += "</div></ul>";
	return html;
}

/**
 * Generates a doc page for express to render
 *
 * @param {string} url  URL of doc, eg. /folder/doc.html
 * @returns {{
 * post: string,
 * title: string,
 * date: string,
 * description: string,
 * docs: string,
 * next: string,
 * prev: string,
 * nextTitle:string,
 * prevTitle:string
 * }}
 */
export function generateDocPage(url) {
	// replace trailing .html
	url = url.replace(/\.html$/, "");
	// Get the file tree
	const path_chunks = url.split("/");
	// remove first empty string
	path_chunks.shift();
	// decode chunks to get actual file name
	for (let i = 0; i < path_chunks.length; i++) {
		path_chunks[i] = decodeURIComponent(path_chunks[i]);
	}
	// Get file path
	let basedir = path.join(__dirname, "..", "content");
	const filepath = path.join(basedir, path_chunks.join("/") + ".md");

	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const content = file.content;
	const html = md.render(content);

	// Get all docs for sidebar navigation
	const docs = getFiles(path.join(__dirname, "..", "content"));

	// in nextTitle and prevTitle, we need path of the file,
	// in-case a .html path was given, switch it to .md
	return {
		post: html,
		title: file.data.title,
		date: file.data.date,
		description: file.data.description,
		next: getDocURL(file.data.next, true) || "",
		nextTitle: parseDocTitleFromURI(file.data.next ? file.data.next.replace(/\.html$/, ".md") : ""),
		prev: getDocURL(file.data.prev, true) || "",
		prevTitle: parseDocTitleFromURI(file.data.prev ? file.data.prev.replace(/\.html$/, ".md") : ""),
		docs: generateSidebarList(docs, filepath),
	};
}

/**
 * Generates the home page for express to render
 *
 * @returns {{post: string, docs: string}}
 */
export function generateHomePage() {
	const filename = "index.md";
	const filepath = path.join(__dirname, filename);
	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const content = file.content;
	const result = md.render(content);

	const docs = getFiles(path.join(__dirname, "..", "content"));

	return {
		post: result,
		docs: generateSidebarList(docs),
	};
}
