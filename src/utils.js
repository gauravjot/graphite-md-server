const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const anchor = require("markdown-it-anchor");
const hljs = require("highlight.js");

/**
 * Get all md files from the content folder and the subfolders
 * @param {string} dir - Path to directory where files are located
 * @returns {JSON} readable file tree of md files
 */
function getFiles(dir) {
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
 * This function generates a unique string for a file or folder
 * based on the path.
 * For files    : It returns a unique string that is used as
 *                URL string for anchor tag
 * For folders  : It returns a unique string that is used as
 *                id string for folder div element in sidebar
 * @param {string} file_path - Path to file or folder
 * @param {string} is_file - If it is a file or folder
 * @returns {string} - Unique string
 */
function getDocURI(file_path, is_file) {
	let id = file_path
		.split(path.join(__dirname, "..", "content"))
		.pop()
		.replace(/^\/|\/$/g, "")
		.replaceAll("/", "___")
		.replaceAll(" ", "__");
	if (is_file) {
		// it is a file, return URL string, replace .md with empty string
		return encodeURIComponent(id.replace(".md", ""));
	} else {
		// it is a folder, return id
		return id;
	}
}

/**
 * This function generates a list that is used in the sidebar
 * to show the document tree
 *
 * @param {[]} data - output of getFiles() function
 * @param {string} highlight - doc to highlight if it is opened
 * @returns {string} HTML
 */
function generateSidebarList(data, highlight = "") {
	let html = "<ul>";
	data.forEach((item) => {
		if (item.files) {
			const id = getDocURI(item.path, false);
			html += '<div class="accordion" id="' + id + '">';
			html +=
				'<button class="accordion__button"><span>' +
				id.split("___").slice(-1).join("").replaceAll("__", " ") +
				"</span></button>";
			html += "<div>";
			html += generateSidebarList(item.files, highlight);
			html += "</div></div>";
		} else {
			const link = getDocURI(item.path, true);
			html +=
				'<li><a id="' +
				link +
				'" href="/' +
				link +
				'" aria-current="' +
				(highlight === link) +
				'">' +
				item.title +
				"</a></li>";
		}
	});
	html += "</ul>";
	return html;
}

// Doc page generation
function generateDocPage(article) {
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
	const md = require("markdown-it")({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {}
			}

			return ""; // use external default escaping
		},
	});
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
		docs: generateSidebarList(docs, article),
	};
}

// Home page generation
function generateHomePage() {
	const filename = "index.md";
	const filepath = path.join(__dirname, filename);
	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const md = require("markdown-it")({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {}
			}

			return ""; // use external default escaping
		},
	});
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

module.exports = {
	generateSidebarList,
	getFiles,
	generateDocPage,
	getDocURI,
	generateHomePage,
};
