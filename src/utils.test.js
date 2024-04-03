import {getDocURL} from "./utils";
import path from "path";
import {fileURLToPath} from "url";

// get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let content_dir = path.join(__dirname, "..", "content");

test("getDocURL Test 1: Relative Path", () => {
	const input = "0_Installation.md";
	const expected = "/0_Installation.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});

test("getDocURL Test 2: Absolute Path", () => {
	const input = path.join(content_dir, "0_Installation.md");
	const expected = "/0_Installation.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});

test("getDocURL Test 3: Nested Path", () => {
	const input = path.join(content_dir, "nested", "0_Installation.md");
	const expected = "/nested/0_Installation.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});

test("getDocURL Test 4: Nested Path with Single Space", () => {
	const input = path.join(content_dir, "nested", "0 Installation.md");
	const expected = "/nested/0%20Installation.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});

test("getDocURL Test 5: Nested Path with Multiple Spaces", () => {
	const input = path.join(content_dir, "nested", "0 Installation  1.md");
	const expected = "/nested/0%20Installation%20%201.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});

test("getDocURL Test 6: Nested Path with Special Characters", () => {
	const input = path.join(content_dir, "nested", "0 Installation 1!@#$%^&(),'_+{}[].md");
	// URL safe characters are not escaped,
	// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#description
	const expected = "/nested/0%20Installation%201!%40%23%24%25%5E%26()%2C'_%2B%7B%7D%5B%5D.html";
	const actual = getDocURL(input);
	expect(actual).toBe(expected);
});
