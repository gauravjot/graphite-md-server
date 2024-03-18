const express = require("express");
const app = express();
const fs = require("fs");
const anchor = require("markdown-it-anchor");

// if you have a public dir with static scripts and styles
app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// path for the ejs folder
const path = require("path");

app.set("views", path.join(__dirname, "./ejs"));
app.set("view engine", "ejs");

// set public folder as static folder for static files
app.use(express.static(path.join(__dirname, "..", "public")));

// gray-matter to read the .md files better
const matter = require("gray-matter");

app.get("/:article", (req, res) => {
	let basedir = path.join(__dirname, "..", "content");
	const subpath = req.params.article.split("___");
	const filename = subpath.pop().replaceAll("__", " ") + ".md";
	for (let i = 0; i < subpath.length; i++) {
		basedir = path.join(basedir, subpath[i].replaceAll("__", " "));
	}
	const filepath = path.join(basedir, filename);
	// read the markdown file
	const file = matter.read(filepath);

	// use markdown-it to convert content to HTML
	const md = require("markdown-it")();
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

	res.render("doc", {
		post: result,
		title: file.data.title,
		date: file.data.date,
		description: file.data.description,
		docs: generateNestedListHTML(docs),
		current: req.params.article,
	});
});

app.get("/", (req, res) => {
	const docs = getFiles(path.join(__dirname, "..", "content"));
	res.render("index", {
		docs: generateNestedListHTML(docs),
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

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
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	});
	return files_;
}

function generateNestedListHTML(data) {
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
		let id = category
			.replace(/^\/|\/$/g, "")
			.replaceAll("/", "___")
			.replaceAll(" ", "__");
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
			const link =
				id +
				(id.length > 0 ? "___" : "") +
				item.path.split("/").pop().replaceAll(" ", "__").replace(".md", "");
			html += "<li>";
			html +=
				'<a id="' +
				link +
				'" href="/' +
				link +
				'">' +
				(match ? item.title.replace(match[0], "") : item.title) +
				"</a>";
			if (
				category_index + 1 < categories.length &&
				categories[category_index + 1].startsWith(category)
			) {
				html += buildNestedListHTML(category_index + 1);
			}
			html += "</li>";
		});
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
