import {CUSTOMIZE} from "./config/config";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ejs}", "./public/**/*.{html,js,ejs}"],
	darkMode: "selector",
	theme: {
		extend: {
			...CUSTOMIZE,
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
