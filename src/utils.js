import fs from "fs";
import matter from "gray-matter";
import path from "path";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markdownitOptions = {
	html: true,
	xhtmlOut: true,
	breaks: true,
	highlight: function (str, lang) {
		// lang may be e.g. "javacript_good" or "javascript_bad"
		// where good and bad are visual cues through css for codeblock
		if (lang && hljs.getLanguage(lang.split("_")[0])) {
			try {
				let block = `<pre ${
					lang.split("_")[1] ? `class="${lang.split("_")[1]}"` : ""
				}>`;
				block += `<code class="language-${lang.split("_")[0]}">`;
				block += hljs.highlight(str, { language: lang.split("_")[0] }).value;
				block += "</code></pre>";
				return block;
			} catch (__) {}
		}

		return ""; // use external default escaping
	},
};

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
				title:
					matter.read(path.resolve(file_path)).data.title ||
					files[i].replace(".md", ""),
			});
		}
	}
	return files_;
}

/**
 * Generates URL string of the doc or id of the folder
 *
 * For files    : It returns a unique string that is used as
 *                URL string for anchor tag.
 * For folders  : It returns a unique string that is used as
 *                id string for folder div element in sidebar.
 * @param {string} filePath - Path to file or folder
 * @param {boolean} isFile - If it is a file or folder
 * @returns {string} - Unique string eg. "folder1___folder2___this__article"
 */
export function getDocURI(filePath, isFile) {
	let id = filePath
		.split(path.join(__dirname, "..", "content"))
		.pop()
		.replace(/^\/|\/$/g, "")
		.replaceAll("/", "___")
		.replaceAll(" ", "__");
	if (isFile) {
		// it is a file, return URL string, replace .md with empty string
		return encodeURIComponent(id.replace(".md", ""));
	} else {
		// it is a folder, return id
		return id;
	}
}

/**
 * Takes string like folder1___folder2___this__article and returns title
 *
 * @param {string} name
 * @returns {string} title of the document
 */
export function parseDocTitleFromURI(name) {
	if (!name) {
		return "";
	}
	let baseDir = path.join(__dirname, "..", "content");
	let filePath = path.join(
		baseDir,
		name.replaceAll("___", "/").replaceAll("__", " ") + ".md"
	);
	// read file
	const file = matter.read(filePath);
	return (
		file.data.title ||
		name.split("___").pop().replaceAll("__", " ").replace(/^\d+_/, "")
	);
}

/**
 * This function generates a list that is used in the sidebar
 * to show the document tree
 *
 * @param {{path: string; title: string; files?:[]}[]} data - output of getFiles() function
 * @param {string} highlight - doc to highlight if it is opened
 * @returns {string} HTML
 */
export function generateSidebarList(data, highlight = "") {
	let html = "<ul><div>";
	data.forEach((item) => {
		if (item.files) {
			const id = getDocURI(item.path, false);
			html += '<div class="accordion" id="' + id + '">';
			let name = id.split("___").slice(-1).join("").replaceAll("__", " ");
			// regex [digit+]_ to remove the number prefix
			if (/^\d+_/.test(name)) {
				name = name.replace(/^\d+_/, "");
			}
			html +=
				'<button class="accordion__button"><span>' + name + "</span></button>";
			html += generateSidebarList(item.files, highlight);
			html += "</div>";
		} else {
			const link = getDocURI(item.path, true);
			let name = item.title;
			// regex [digit+]_ to remove the number prefix
			if (/^\d+_/.test(name)) {
				name = name.replace(/^\d+_/, "");
			}
			html +=
				'<li><a id="' +
				link +
				'" href="/' +
				link +
				'" aria-current="' +
				(highlight === link) +
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
 * @param {string} article URL string of the article, eg. "folder1___folder2___this__article"
 * @returns {{post: string, title: string, date: string, description: string, docs: string}}
 */
export function generateDocPage(article) {
	article = decodeURIComponent(article);
	let basedir = path.join(__dirname, "..", "content");
	const subpath = article.split("___");
	const filename = subpath.pop().replaceAll("__", " ") + ".md";
	for (let i = 0; i < subpath.length; i++) {
		basedir = path.join(basedir, subpath[i].replaceAll("__", " "));
	}
	const filepath = path.join(basedir, filename);
	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const md = MarkdownIt(markdownitOptions);
	md.use(anchor, {
		slugify: (s) =>
			encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-")),
		permalink: anchor.permalink.headerLink({
			safariReaderFix: true,
		}),
	});
	const content = file.content;
	const result = md.render(content);

	const docs = getFiles(path.join(__dirname, "..", "content"));

	return {
		post: result,
		title: file.data.title,
		date: file.data.date,
		description: file.data.description,
		next: file.data.next || "",
		nextTitle: parseDocTitleFromURI(file.data.next || ""),
		prev: file.data.prev || "",
		prevTitle: parseDocTitleFromURI(file.data.prev || ""),
		docs: generateSidebarList(docs, article),
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
	const md = MarkdownIt(markdownitOptions);
	md.use(anchor, {
		slugify: (s) =>
			encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-")),
		permalink: anchor.permalink.headerLink({
			safariReaderFix: true,
		}),
	});
	const content = file.content;
	const result = md.render(content);

	const docs = getFiles(path.join(__dirname, "..", "content"));

	return {
		post: result,
		docs: generateSidebarList(docs),
	};
}
