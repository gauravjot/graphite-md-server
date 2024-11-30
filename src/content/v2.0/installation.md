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

There are two ways to use Planum Docs in production:

- Static HTML (Recommended): See [Deploying Static Website (and Vercel)](deploying_planum/static.html).

- Express Server: See [Deploying ExpressJS Server](deploying_planum/expressjs.html).
