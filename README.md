# Graphite MD Docs: Express-based Markdown to HTML Server

![](press/doc_page.webp)

<center>Preview</center>

## Introduction

This is a simple server that serves markdown files as HTML. It uses the `express` framework and `ejs` as the view engine.

## Install Packages

-   Run the following command in this directory.

    ```bash
    npm install
    ```

-   (Optional) Install `nodemon` to your system for development. It will automatically restart the server when you make changes to the code.

    ```bash
    npm install -g nodemon
    ```

## Run Server

Use this command to run the server.

```bash
npm run dev
```

## Structure

-   `server.js`: The main file of the server.
-   `ejs` directory: Contains the views/templates of the server.
-   `content` directory: Contains the markdown content. See file `content/_index.md` for an example.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
