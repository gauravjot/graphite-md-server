---
title: App Configuration
description:
next: configuration/sidebar.md
prev: configuration/index.md
---

The `config/app.js` file contains the website name, logo, and other settings. You can change these settings to suit your needs.

## Meta Data

Upload your assets to the `public` directory and provide the path in the configuration file. All paths should be relative to the `public` directory.

```js title="config/app.js" highlight="4-6,8-9,13"
export const META = {
	// icons and logos should be in the public directory
	// for public/favicon.ico, use "/favicon.ico"
	app_icon: "/favicon.svg",
	app_name: "Planum Docs",
	app_description: "Planum Docs is a simple and easy to use documentation tool.",
	// app_url is where the app is hosted
	app_url: "https://planum-docs.vercel.app/",
	favicon: "/favicon.ico",
	navbar: {
		logo: {
			// logo can be an image, text, or both
			style: "icon_with_text",
			// whatever style you choose, provide the necessary values
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
					// avoid changing width and height and instead
					// try to fit the logo in the given dimensions
					width: 200,
					height: 65,
				},
			},
		},
	},
};
```

### `app_icon`

This is a high-resolution icon that is used in the browser tab. A `.svg` file is recommended for this.

### `app_name`

This is the name of the app that is displayed in the browser tab.

### `app_description`

This is a short description of the app that is added to the meta tags on home page.

### `app_url`

This is the URL where the app is hosted. This is used to create links in the app and sitemap.

### `favicon`

This is the favicon that is displayed in the browser tab. A `.ico` file is recommended for this.

### `navbar.logo.style`

This is the style of the logo in the navigation bar. You can choose from the following styles:

- `icon_with_text`: Logo with icon and text.
- `text_only`: Text only logo.
- `icon_only`: Icon only logo.
- `full_logo`: Full logo with custom width and height. Recommended resolution `200x65`.

### `navbar.logo.variations`

This is where you provide the necessary values for the logo style you choose.

## Include Custom Stylesheets and Scripts

The scripts and stylesheets can be from internal or external sources. For internal, provide the paths relative to the `public` directory.

```js
/**
 * Declare any additional stylesheets or scripts that you want to include in the head.
 * `link` is for stylesheets and `scripts` is for scripts.
 *
 * The order in which you provide the links is the order in which they will be included in the head.
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
	scripts: [
		{
			src: "https://cdn.splitbee.io/sb.js",
		},
		{
			src: "/some-script-in-public-dir.js",
		},
	],
};
```

### `links` (Stylesheets)

Provide a list of stylesheets that you want to include in the head. The order you provide is the order they will be added in the head tag.

There are three attributes you can provide:

- `href`: The path to the stylesheet.
- `rel`: The relationship of the stylesheet. For stylesheets, this should be `stylesheet`.
- `crossorigin` (_optional_): If the stylesheet is from a different origin, set this to `true`.

### `scripts` (Scripts)

Provide a list of scripts that you want to include in the head. The order you provide is the order they will be added just before the closing body tag.

You can provide the following attribute:

- `src`: The path to the script.

## Customization

Planum allows you to change the font and primary color of the app. You can change these values in the `CUSTOMIZE` object.

```js highlight="4-6,11-21"
export const CUSTOMIZE = {
	fontFamily: {
		// Change font here to use your own
		sans: ["Inter", "sans-serif"],
		mono: ["Source Code Pro", "monospace"],
		serif: ["Inter", "sans-serif"],
	},
	colors: {
		primary: {
			// Change values below to change the primary color
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
```

### `fontFamily`

When changing font, make sure to provide the font name and the fallback font such as `sans-serif`. You can find fonts on [Google Fonts](https://fonts.google.com/).

### `colors.primary`

This is the primary color of the app. You can change the color shades here.

Here 50 is the lightest shade and 950 is the darkest shade. You can generate the color shades using the [Tailwind Color Palette Generator](https://javisperez.github.io/tailwindcolorshades/).
