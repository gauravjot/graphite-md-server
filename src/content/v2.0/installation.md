---
title: Installation Guide
description: To get started with Planum Docs, you need to set up a new instance. This page will guide you through the process.
next: getting_started
sort: 1
---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)

## Getting Planum

You can download the latest release from GitHub and extract the contents.

- <https://github.com/gauravjot/planum-docs/releases>

Or you can clone the repository to get the latest changes:

```bash
git clone --depth 1 https://github.com/gauravjot/planum-docs
cd planum-docs
```

## Starting the Development Server

Install the dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

The server will start at <http://localhost:4321>.

## Cleaning Up

- Delete any directories inside `src/content` directory. KEEP `src/content/config.ts` file.
- Empty out `public/assets` directory.
- Delete hidden `.git` directory if it is present.

## Configuring Planum

For customizations such as changing logo and website name in navigation, check [Configuration](configuration/index.html) page.

## Building for Production

With Planum, you are able to build a static HTML, CSS, and JavaScript only website. Run the following command to build the website:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

See [Deploying Static Website](deploying_planum/static.html) for more information.
