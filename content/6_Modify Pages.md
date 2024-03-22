---
title: Modify Pages
date: 2024-03-21T23:46:03Z
description:
---

## Page Layouts

The page layouts are stored in `src/ejs` directory. You can modify these files to customize the layout of your pages.

## CSS

Use the `src/source.css` file to write your CSS. The file is processed and minified using TailwindCSS, and the production version is stored in `public/css/styles.css`.

When making changes in `source.css`, run the following command to build the CSS:

```bash
npm run css
```

This also watches for changes in the CSS file and rebuilds the CSS automatically.
