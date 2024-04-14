/**
 * How to edit -
 * Only edit values in the right hand side of the colon (:)
 *
 * Read: https://planum-docs.vercel.app/Configuration/App.html
 */

/**
 * App metadata
 */
export const META = {
	// icons and logos should be in the public directory
	// for public/favicon.ico, use "/favicon.ico"
	app_icon: "/favicon.svg",
	app_name: "Planum Docs",
	app_description: "Planum Docs is a simple and easy to use documentation tool.",
	app_url: "https://planum-docs.vercel.app/",
	favicon: "/favicon.ico",
	navbar: {
		logo: {
			style: "icon_with_text",
			variations: {
				icon_with_text: {
					icon: "/favicon.svg",
					text: "Planum Docs",
				},
				text_only: {
					text: "Planum Docs",
				},
				icon_only: {
					icon: "/favicon.svg",
				},
				full_logo: {
					logo: "/favicon.svg",
					width: 200,
					height: 65,
				},
			},
		},
	},
};

/**
 * Declare any additional stylesheets or scripts that you want to include in the head.
 * `link` is for stylesheets and `scripts` is for scripts.
 */
export const INLCUDE = {
	links: [
		{
			href: "https://fonts.googleapis.com",
			rel: "preconnect",
		},
		{
			href: "https://fonts.gstatic.com",
			rel: "preconnect",
			crossorigin: true,
		},
		{
			href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Source+Code+Pro&display=swap",
			rel: "stylesheet",
		},
	],
	scripts: [],
};

/**
 * This goes into tailwind.config.js theme.extend
 */
export const CUSTOMIZE = {
	fontFamily: {
		sans: ["Inter", "sans-serif"],
		mono: ["Source Code Pro", "monospace"],
		serif: ["Inter", "sans-serif"],
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
};
