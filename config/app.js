/**
 * How to edit -
 * Only edit values in the right hand side of the colon (:)
 *
 * Read: https://planum-docs.vercel.app/configuration/app
 */

/**
 * App metadata
 */
export const META = {
	app_icon: "public/favicon.svg",
	app_name: "Planum Docs",
	app_description: "Planum Docs is a simple and easy to use documentation tool.",
	app_url: "https://planum-docs.vercel.app/",
	icons: {
		favicon: "public/favicon.ico",
		appleTouchIcon: "public/apple-touch-icon.png",
		android192: "public/android-chrome-192.png",
		android512: "public/android-chrome-512.png",
	},
	logo: {
		style: "icon_with_text",
		variations: {
			icon_with_text: {
				icon: "public/favicon.svg",
				text: "Planum Docs",
			},
			text_only: {
				text: "Planum Docs",
			},
			icon_only: {
				icon: "public/favicon.svg",
			},
			full_logo: {
				logo: "public/favicon.svg",
				width: 200,
				height: 65,
			},
		},
	},
};

/**
 * Declare any additional stylesheets or scripts that you want to include in the head.
 */
export const INLCUDE = {
	stylesheets: [
		"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Source+Code+Pro&display=swap",
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
	screens: {
		"3xl": "1800px",
		"4xl": "1940px",
	},
};

export const OTHER = {
	use_dot_html: true,
	lowercase_routing_only: false,
};
