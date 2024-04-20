---
title: Sidebar Configuration
description:
next: deploying_planum/static.md
prev: configuration/app.md
---

The `config/sidebar.js` file contains the settings for the sidebar. Here is an example configuration:

```js
/**
 * Sidebar configuration
 *
 */
export const SIDEBAR = {
	permalinks: {
		main: {
			enabled: true,
			links: [
				{
					title: "Home",
					href: "/",
				},
				{
					title: "GitHub Repository",
					href: "https://github.com/gauravjot/planum-docs",
					open_in_new: true,
				},
			],
		},
		foot: {
			enabled: true,
			links: [
				{
					title: "v1.7.0",
					href: "https://github.com/gauravjot/planum-docs/releases",
					open_in_new: true,
				},
				{
					title: "Docs",
					href: "https://planum-docs.vercel.app/",
					open_in_new: true,
				},
			],
		},
	},
};
```

### `permalinks.main`

These are the links that appear above the documentation tree in the sidebar. You can add any number of links here. You will need to provide following attributes:

- `title`: The title of the link.
- `href`: The URL of the link.
- `open_in_new` (**optional**): If the link should open in a new tab.

You may also disable the main links by setting `enabled` to `false`.

### `permalinks.foot`

These are the links that appear at the bottom of sidebar. You can add any number of links here. You will need to provide following attributes:

- `title`: The title of the link.
- `href`: The URL of the link.
- `open_in_new` (**optional**): If the link should open in a new tab.

You may disable the footer links by setting `enabled` to `false`.
