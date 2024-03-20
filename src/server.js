const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { generateDocPage, generateHomePage } = require("./utils.js");

const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up EJS
app.set("views", path.join(__dirname, "./ejs"));
app.set("view engine", "ejs");

/*
 * Routes
 */

app.get("/:article", (req, res) => {
	res.render("doc", generateDocPage(req.params.article));
});

app.get("/", (req, res) => {
	res.render("index", generateHomePage());
});

/*
 * Start server
 */

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
