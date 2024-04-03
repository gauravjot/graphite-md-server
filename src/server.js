import express from "express";
// import { urlencoded, json } from "body-parser";
import {join} from "path";
import {generateDocPage, generateHomePage} from "./utils.js";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(join(__dirname, "..", "public")));
app.use("/assets", express.static(join(__dirname, "..", "assets")));
// app.use(urlencoded({ extended: true }));
// app.use(json());

// Set up EJS
app.set("views", join(__dirname, "./templates"));
app.set("view engine", "ejs");

/*
 * Routes
 */

app.get("/", (req, res) => {
	res.render("home_page", generateHomePage());
});

app.get("*", (req, res) => {
	res.render("doc_page", generateDocPage(req.url));
});

/*
 * Start server
 */

app.listen(3000, () => {
	console.log("Server is running on port 3000\nhttp://localhost:3000/");
});
