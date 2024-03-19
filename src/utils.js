const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const anchor = require("markdown-it-anchor");
const hljs = require("highlight.js");
const { get } = require("http");
const e = require("express");

// Get all md files from the content folder and the subfolders.
// We will store the subfolder name as the category of the article.
function getFiles(dir, basedir, files_, category) {
	files_ = files_ || [];
	category = category || "content";
	basedir = basedir || dir;
	const files = fs.readdirSync(dir);
	for (var i in files) {
		let name = dir + "/" + files[i];
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, basedir, files_, files[i]);
		} else {
			if (!files[i].endsWith(".md") || files[i].startsWith("_")) {
				continue;
			}
			files_.push({
				path: name,
				title:
					matter.read(path.resolve(name)).data.title ||
					files[i].replace(".md", ""),
				category: name.replace(basedir, "").replace(files[i], ""),
			});
		}
	}
	// sort based on the category and then the title
	files_.sort((a, b) => {
		if (a.category < b.category) {
			return -1;
		}
		if (a.category > b.category) {
			return 1;
		}
		if (a.path.split("/").pop() < b.path.split("/").pop()) {
			return -1;
		}
		if (a.path.split("/").pop() > b.path.split("/").pop()) {
			return 1;
		}
		return 0;
	});
	return files_;
}

// Take a category from return of getFiles() fnc e.g. `category: /GoLang/Setup/`
// Take filesystem path e.g. `fs_path: F:\\..\\content/GoLang/Setup/Get Started.md'`
// Return a tuple of id and link
// id format: `category___category___category`
// link format: `category___category___category___Get_Started`
function getDocURI(category, fs_path) {
	let id = category
		.replace(/^\/|\/$/g, "")
		.replaceAll("/", "___")
		.replaceAll(" ", "__");
	let link = null;
	if (fs_path !== undefined) {
		link =
			id +
			(id.length > 0 ? "___" : "") +
			fs_path.split("/").pop().replaceAll(" ", "__").replace(".md", "");
		// convert link to url friendly
		link = encodeURIComponent(link);
	}
	return [id, link];
}

// Sidebar nested list generation
function generateNestedListHTML(data, highlight_doc = "") {
	// Group items by category
	const groupedItems = {};
	const categories = [];
	data.forEach((item) => {
		const category = item.category;
		if (!groupedItems[category]) {
			groupedItems[category] = [];
			categories.push(category);
		}
		groupedItems[category].push(item);
	});

	// Function to recursively build the nested UL list
	function buildNestedListHTML(category_index) {
		const category = categories[category_index];
		let html = "";
		let id = getDocURI(category)[0];
		if (category === "/") {
			html = "<ul>";
			id = "";
		} else {
			html = '<div class="accordion" id="' + id + '">';
			html +=
				'<button class="accordion__button"><span>' +
				id.split("___").slice(-1).join("").replaceAll("__", " ") +
				"</span></button>";
			html += "<ul><div>";
		}
		groupedItems[category].forEach((item) => {
			// match item.title with [digit+]_[w+] pattern
			const match = item.title.match(/^(\d+_)/);
			const link = getDocURI(category, item.path)[1];
			html += "<li>";
			html +=
				'<a id="' +
				link +
				'" href="/' +
				link +
				'" aria-current="' +
				(highlight_doc === link) +
				'">' +
				(match ? item.title.replace(match[0], "") : item.title) +
				"</a>";
			html += "</li>";
		});
		if (
			category_index + 1 < categories.length &&
			categories[category_index + 1].startsWith(category)
		) {
			html += buildNestedListHTML(category_index + 1);
		}
		if (category === "/") {
			html += "</ul>";
		} else {
			html += "</div></ul>";
			html += "</div>";
		}
		return html;
	}
	let res = buildNestedListHTML(0);
	return res;
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
		docs: generateNestedListHTML(docs, article),
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
		docs: generateNestedListHTML(docs),
	};
}

module.exports = {
	generateNestedListHTML,
	getFiles,
	generateDocPage,
	getDocURI,
	generateHomePage,
};
