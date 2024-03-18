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
	// read the markdown file
	const file = matter.read(
		path.join(
			__dirname,
			"..",
			"content",
			req.params.article.replaceAll("_", " ") + ".md"
		)
	);

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

	const docs = fs
		.readdirSync(path.join(__dirname, "..", "content"))
		.filter((file) => file.endsWith(".md") && !file.startsWith("_"));

	res.render("doc", {
		post: result,
		title: file.data.title,
		date: file.data.date,
		description: file.data.description,
		docs: docs,
		current: req.params.article,
	});
});

app.get("/", (req, res) => {
	const docs = fs
		.readdirSync(path.join(__dirname, "..", "content"))
		.filter((file) => file.endsWith(".md") && !file.startsWith("_"));
	res.render("index", {
		docs: docs,
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
