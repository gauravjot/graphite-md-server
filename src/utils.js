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

let content_dir = path.join(__dirname, "..", "content");

// //hljs, wrap each line in a span
// hljs.addPlugin({
// 	"after:highlight": (result) => {
// 		console.log("-------");
// 		console.log(JSON.stringify(result._emitter));
// 		let classes = [];
// 		// split into lines array
// 		let lines = result.value.split("\n");
// 		// trim the last line if it is empty
// 		if (lines[lines.length - 1] === "") {
// 			lines.pop();
// 		}
// 		// wrap each line in a span
// 		lines = lines.map((line) => `<span class="${classes.join(" ")}">${line}</span>`);
// 		result.value = lines.join("\n");
// 	},
// });

// markdown-it options
const md = MarkdownIt({
	html: true,
	xhtmlOut: true,
	breaks: true,
	highlight: function (str, lang, attrs) {
		let attr = parseCodeBlockAttrs(attrs);

		let block = `<pre class="hljsp-pre${attr.color ? " " + attr.color : ""}">`;
		if (attr.title) {
			block += `<div class="hljsp-title">${attr.title}</div>`;
		}
		let hl = `${str}`;
		let hl_success = false;
		if (lang && hljs.getLanguage(lang)) {
			try {
				hl = hljs.highlight(str, {language: lang}).value;
				hl_success = true;
			} catch (__) {}
		}
		if (hl_success) {
			block += `<code class="language-${lang}">`;
		} else {
			block += `<code>`;
		}
		let classes = [];
		if (attr.linenums) {
			classes.push("hljsp-linenums");
		}
		// split into lines array
		let lines = hl.split("\n");
		// trim the last line if it is empty
		if (lines[lines.length - 1] === "") {
			lines.pop();
		}
		// wrap each line in a span and highlight if needed
		const highlighted_lines = attr.hl_lines ? highlightedLines(attr.hl_lines, lines.length) : [];
		lines = lines.map((line, index) => {
			let is_highlighted_line = attr.hl_lines && highlighted_lines.includes(index + 1);
			let span_class = classes.join(" ") + (is_highlighted_line ? " hljsp-linehl" : "");
			span_class = span_class.trim();
			return `<span class="${span_class}">${line}</span>`;
		});
		// join the lines back
		block += lines.join("\n");
		block += "</code></pre>";
		return block;
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
/*                                                          */
/* Using snake_case for variables, camelCase for functions  */
/* Don't be triggered. Appreciated!                         */
/************************************************************/

/**
 * Get all md files from the content folder and the subfolders
 * @param {string} dir - Path to directory where files are located
 * @returns {{path: string; title: string; files?:[]}[]}
 * Readable tree of md files in `dir`
 * -  `path`  - absolute path to the file or directory
 * -  `title` - title of the document provided inside the file or
 *            the file name or directory name
 * -  `files` - an array of objects if the path is a directory
 */
export function getFiles(dir) {
	let arr = [];
	const items = fs.readdirSync(dir);
	// sort alphabetically
	items.sort((a, b) => (a < b ? -1 : 1));
	// iterate over files and recurse if it is a directory
	for (let i = 0; i < items.length; i++) {
		let item_path = path.join(dir, items[i]);
		// check if item is a directory or file
		if (fs.statSync(item_path).isDirectory()) {
			// Get files inside the directory
			let dir_items = getFiles(item_path);
			if (dir_items.length > 0) {
				arr.push({
					title: items[i],
					path: item_path,
					files: dir_items,
				});
			}
		} else {
			if (!items[i].endsWith(".md") || items[i].startsWith("_")) {
				// skip non-md files and files starting with _ (hidden)
				continue;
			}
			arr.push({
				path: item_path,
				title: matter.read(item_path).data.title || items[i].replace(".md", ""),
			});
		}
	}
	return arr;
}

/**
 * Generates URL string of the doc
 *
 * @param {string} file_path absolute OR relative to content directory
 * @returns {string} URL for doc
 */
export function getDocURL(file_path) {
	if (!file_path) {
		return;
	}
	if (file_path.endsWith(".html")) {
		return file_path; // already html path given
	}
	let uri = file_path.split(content_dir).pop();
	// split the uri into chunks
	const encoded_uri_chunks = uri.split(path.sep);
	// encode each chunk
	for (let i = 0; i < encoded_uri_chunks.length; i++) {
		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#description
		encoded_uri_chunks[i] = encodeURIComponent(encoded_uri_chunks[i]);
	}
	// pack the chunks back together, remove .md and add .html
	let result = encoded_uri_chunks.join("/").replace(/\.md$/, "") + ".html";
	return result.startsWith("/") ? result : "/" + result;
}

/**
 * Takes file path of doc and returns title
 *
 * @param {string} file_path absolute OR relative to content directory
 * @returns {string} title of the document
 */
export function parseDocTitle(file_path) {
	if (!file_path) {
		return "";
	}
	// read file
	const file = file_path.startsWith(content_dir)
		? matter.read(file_path)
		: matter.read(path.join(content_dir, file_path));
	return file.data.title || file_path.replace(/^\d+_/, "").replaceAll("_", " ");
}

/**
 * This function generates a list that is used in the sidebar
 * to show the document tree
 *
 * @param {{path: string; title: string; files?:[]}[]} data - output of getFiles() function
 * @param {string} highlight -  absolute path of doc to highlight if it is opened.
 * @returns {string} HTML
 */
export function generateSidebarList(data, highlight = "") {
	let html = "<div><ul>";
	data.forEach((item) => {
		if (item.files) {
			// item is a directory
			let dir_name = path.basename(item.path);
			html += '<li class="accordion" id="' + dir_name + '">';
			// regex [digit+]_ to remove the number prefix used for sorting
			// We didn't remove this for id because id has to be unique
			if (/^\d+_/.test(dir_name)) {
				dir_name = dir_name.replace(/^\d+_/, "");
			}
			html +=
				'<button class="accordion__button"><span>' +
				dir_name.replaceAll("_", " ") +
				"</span></button>";
			html += generateSidebarList(item.files, highlight); // nested list
			html += "</li>";
		} else {
			// item is a file
			let name = item.title;
			// Regex [digit+]_ to remove the number prefix.
			if (/^\d+_/.test(name)) {
				// This will only be the case if no title is given inside .md file
				// and file name is being used for title
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
	html += "</ul></div>";
	return html;
}

/**
 * Generates a doc page for express to render
 *
 * @param {string} url  URL of doc, eg. /folder/doc.html
 * @returns {{
 *  post: string,
 *  title: string,
 *  date: string,
 *  description: string,
 *  docs: string,
 *  next: string,
 *  prev: string,
 *  nextTitle:string,
 *  prevTitle:string
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
	// Get absolute file path
	const filepath = path.join(content_dir, path_chunks.join("/") + ".md");

	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const content = file.content;
	const html = md.render(content);

	// Get all docs for sidebar navigation
	const docs = getFiles(content_dir);

	// in nextTitle and prevTitle, we need path of the file,
	// in-case a .html path was given, switch it to .md
	return {
		post: html,
		title: file.data.title,
		date: formatDate(file.data.date),
		description: file.data.description,
		next: getDocURL(file.data.next, true) || "",
		nextTitle: parseDocTitle(file.data.next ? file.data.next.replace(/\.html$/, ".md") : ""),
		prev: getDocURL(file.data.prev, true) || "",
		prevTitle: parseDocTitle(file.data.prev ? file.data.prev.replace(/\.html$/, ".md") : ""),
		docs: generateSidebarList(docs, filepath),
	};
}

/**
 * Generates the home page for express to render
 *
 * @returns {{post: string, docs: string}}
 */
export function generateHomePage() {
	const file_name = "index.md";
	const file_path = path.join(__dirname, file_name);
	// read the markdown file
	const file = matter.read(file_path);

	// use markdown-it to convert content to HTML
	const content = file.content;
	const result = md.render(content);

	const docs = getFiles(content_dir);

	return {
		post: result,
		docs: generateSidebarList(docs),
	};
}

/**
 * Helper functions
 */
export function formatDate(date) {
	if (!date) {
		return "";
	}
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	date = new Date(date);
	return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
/**
 *
 * @param {*} str
 * @returns {{linenums?:boolean; color?: good|bad; title?:string; hl_lines?:string;}}
 */
function parseCodeBlockAttrs(str) {
	const obj = {};
	str.replace(/(\w+)(?:\s*=\s*"([^"]*)")?/g, (match, key, value) => {
		if (value === "true" || value === undefined) {
			obj[key] = true;
		} else if (value === "false") {
			obj[key] = false;
		} else {
			obj[key] = value;
		}
	});
	return obj;
}
/**
 *
 * @param {number} lineNumber
 * @param {*} hlLinesAttribute e.g. "1-3,5,7-9,10-*"
 * @param {number} maxLines
 * @returns
 */
function highlightedLines(hlLinesAttribute, maxLines) {
	const hlLinesRanges = hlLinesAttribute.split(","); // Split the hl_lines attribute value by comma
	const highlightedLines = [];

	hlLinesRanges.forEach((range) => {
		if (range.includes("-")) {
			const [start, end] = range.split("-");
			if (start === "*") {
				for (let i = 1; i <= Number(end); i++) {
					highlightedLines.push(i);
				}
			} else if (end === "*") {
				for (let i = Number(start); i <= maxLines; i++) {
					highlightedLines.push(i);
				}
				// We can break here because * will always be the last range
				return;
			} else {
				for (let i = Number(start); i <= Number(end); i++) {
					highlightedLines.push(i);
				}
			}
		} else {
			highlightedLines.push(Number(range));
		}
	});

	return highlightedLines;
}
