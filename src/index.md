<center>

# Welcome to Graphite Docs

</center>

To edit this file, go to `src/index.md` in your repository. But before that, here are few things you should know:

1.  The docs are to be stored in the `content` directory.
2.  You may make directories inside `content`. This will be reflected in the sidebar in the accordion format.
3.  The docs are sorted alphabetically in sidebar. The title for a doc is taken from the `title` field in the front matter of the markdown file. If the `title` field is not present, the file name is used as the title.
4.  Some conventions for your content files:

    -   `_*.md`: Files starting with `_` will be treated as a draft and will not be shown in the sidebar or processed.
    -   **Do not use more than one `_` in the file name.** This will break things.
    -   If possible, user `-` (_hyphen_) instead of `_` in the file name.

## Building

To build the project, run the following command:

```bash
npm run build
```

> **Note:** This produces the static files in the `dist` directory. Resulting pages are suffixed with `.html`. In current iteration of the build file, you will have to deploy this directly onto a **top-level or subdomain-level** and cannot be deployed under a path.
>
> The script is not production ready and thus may not work as expected. For production, I recommend deploying a `ExpressJS` server instead. Please contribute to the project to make it production ready.

## Customizations

### Page Layouts

The page layouts are stored in `src/ejs` directory. You can modify these files to customize the layout of your pages.

### CSS

Use the `src/source.css` file to write your CSS. The file is processed using `PostCSS` and `TailwindCSS`. The final CSS is then minified and stored in `public/css/styles.css`.

After your changes, run the following command to build the CSS:

```bash
npm run css
```

### Follow Project

You can follow project's repository to get the latest updates.

<https://github.com/gauravjot/graphite-md-server>
