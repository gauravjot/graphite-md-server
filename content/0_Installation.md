---
title: Installation Guide
date: 2024-03-18T10:45:00Z
description:
next: 1_Getting__Started
---

To get started with Graphite Docs, you need to set up a new instance. This page will guide you through the process.

## Prerequisites

First step, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)

Then install `nodemon` globally:

```bash
npm install -g nodemon
```

## Cloning the Repository

Clone the Graphite Docs repository from GitHub and `cd` into it:

```bash
git clone https://github.com/gauravjot/graphite-docs
cd graphite-docs
```

## Installing Dependencies

Navigate to the project directory in your terminal and run

```bash
npm install
```

## Starting the Development Server

To start the development server, run

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## Building for Production

There are two ways to use Graphite Docs in production:

- Static HTML: See [Deploying Static Website (and Vercel)](3_Deploying__Graphite___1_Deploying__Static).

- Express Server: See [Deploying ExpressJS Server](3_Deploying__Graphite___2_Deploying__ExpressJS).
