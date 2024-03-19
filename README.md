# Graphite MD Docs: Express-based Markdown to HTML Server

![](press/doc_page.webp)

<center>Preview</center>

## Introduction

This is a simple server that serves markdown files as HTML. It uses the `express` framework and `ejs` as the view engine.

## Features

-   Make drafts of your documentation in markdown by prefixing with an underscore.
-   Serve the documentation as static HTML.
-   Clean Ctrl+P print-friendly pages.
-   Uses Tailwind CSS for styling.
-   Very lightweight and easy to use.

## Get Started: Install Packages

-   Run the following command in this directory.

    ```bash
    npm install
    ```

-   (Optional) Install `nodemon` to your system for development. It will automatically restart the server when you make changes to the code.

    ```bash
    npm install -g nodemon
    ```

## Run Server

Use this command to run the development server.

```bash
npm run dev
```

For non-development purposes use this command.

```bash
npm run live
```

## Structure

-   `src/server.js`: The main file of the server.
-   `src/ejs` directory: Contains the views/templates of the server.
-   `content` directory: Contains the markdown content. See file `content/_index.md` for an example.
-   `public` directory: Contains static files like CSS, JS, and images.
-   `src/source.css`: The source CSS file for the server. Use this to add more classes. DO NOT edit `public/css/style.css` directly as it will be overwritten by Tailwind.

## How To Use

Please see [src/index.md](src/index.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
