---
title: Installation Guide
description: To get started with Planum Docs, you need to set up a new instance. This page will guide you through the process.
next: getting_started
---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)

Then install `nodemon` globally:

```bash
npm install -g nodemon
```

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

The server will start at <http://localhost:3000>.

## Cleaning Up

- Empty out `content` directory.
- Empty out `public/assets` directory.
- Delete hidden `.git` directory if you cloned the repository.

If you will be setting up a repository, make sure to keep at least one file inside `content` and `public/assets`. Usually the empty directories are not pushed to the remote repositories.

## Configuring Planum

For customizations such as changing logo and website name in navigation, check [Configuration](/configuration/index.html) page.

## Building for Production

There are two ways to use Planum Docs in production:

- Static HTML (Recommended): See [Deploying Static Website (and Vercel)](deploying_planum/static.html).

- Express Server: See [Deploying ExpressJS Server](deploying_planum/expressjs.html).
