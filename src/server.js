const express = require("express");
const app = express();
const { generateDocPage, generateHomePage } = require("./utils.js");

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

app.get("/:article", (req, res) => {
	res.render("doc", generateDocPage(req.params.article));
});

app.get("/", (req, res) => {
	res.render("index", generateHomePage());
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
