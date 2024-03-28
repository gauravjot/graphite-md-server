---
title: Modify Website Pages
date: 2024-03-21T23:46:03Z
description:
next: 5_Customization___2_Switch__Accent__Color
---

## Favicon, Logo, Manifest

The favicon and logo are stored in the `public` directory. Replace the following files to update the favicon and logo:

```text
public/favicon.svg
public/favicon.ico
public/android-chrome-192x192.png
public/android-chrome-512x512.png
public/apple-touch-icon.png
```

The `public/manifest.json` file is used to configure the PWA settings. Update the `name` and `short_name` to use your website name.

## Pages

The page layouts are stored in `src/ejs` directory. These files can be updated to customize Graphite Docs to your liking and rebrand the website.

### Home and Doc Page

The homepage layout is stored in `src/ejs/index.ejs` and the doc page layout is stored in `src/ejs/doc.ejs`

To change title of the website, update the `app_name` variable in first line of both files.

```javascript
1 <% var app_name = "Graphite Docs"; %>
2 ...
```

### Navigation Bar

The navigation bar layout is stored in `src/ejs/partials/nav.ejs`. You can change the title by updating the `logo_text` variable in the first line.

```javascript
1 <% var app_name = "Graphite Docs"; %>
2 ...
```

To update the logo, follow [Favicon, Logo, Manifest](#favicon%2C-logo%2C-manifest) section.

### Sidebar

The sidebar layout is stored in `src/ejs/partials/sidebar.ejs`.

Here you can change the link that says `Github Repository` and the links that are at the bottom of the sidebar inlcuding version number, and `Docs`.

## CSS (Optional)

Use the `src/source.css` file to write your CSS. The file is processed and minified using TailwindCSS, and the production version is stored in `public/css/styles.css`.

When making changes in `source.css`, run the following command to build the CSS:

```bash
npm run css
```

This also watches for changes in the CSS file and rebuilds the CSS automatically.

### Switching Accent Color

Check [Switch Accent Color](5_Customization___2_Switch__Accent__Color) page to learn how to switch the accent color of the website.
