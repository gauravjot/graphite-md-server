import express, { static as estatic } from "express";
// import { urlencoded, json } from "body-parser";
import { join } from "path";
import { generateDocPage, generateHomePage } from "./utils.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(estatic(join(__dirname, "..", "public")));
// app.use(urlencoded({ extended: true }));
// app.use(json());

// Set up EJS
app.set("views", join(__dirname, "./ejs"));
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
