/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ejs}", "./public/**/*.{html,js,ejs}"],
	darkMode: "selector",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				serif: ["Roboto Slab", "serif"],
				mono: ["Source Code Pro", "monospace"],
			},
			colors: {
				primary: {
					50: "#eef7ff",
					100: "#d9ecff",
					200: "#bcdfff",
					300: "#8eccff",
					400: "#58afff",
					500: "#328dff",
					600: "#2372f5",
					700: "#1457e1",
					800: "#1746b6",
					900: "#193e8f",
					950: "#142757",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
