<center>

# Welcome to Graphite Docs

</center>

To edit this file, go to `src/index.md` in your repository.

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
