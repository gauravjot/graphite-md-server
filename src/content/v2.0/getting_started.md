---
title: Getting started
description:
next: writing_first_doc
prev: installation
alias: Getting Started
sort: 2
---

Congratulations on setting up Planum Docs! This page will help you get started with the project.

## Directory Structure

Here is the directory structure of Planum Docs:

```text title="Path: /"
public/             # static assets
src/                # source code, don't need to touch
src/config/         # configuration files
src/content/        # docs
```

- **config**: Contains configuration files for the project. You can change the website name, logo, and other settings from here.
- **content**: This is where you will be adding your docs and folders.
- **public**: Contains static assets such as images, stylesheets, and scripts.
- **src**: Contains the source code of the project. You don't need to touch this directory unless you want to change how Planum works.

## Home Page

The home page is `pages/index.md` file. Feel free to edit this file to add your content. You can also change the layout of the home page by editing `layouts/IndexLayout.astro`.

## Creating Docs and Folders

### Location

The docs are to be stored in the `content/{version}` directory. You may make directories inside as well.

### Versioning

Versioning is enabled by default. Simply make a directory like `v2.0` inside `content` and start adding your docs there.

You also need to update the `src/content/config.ts` file to add the new version.

```typescript start="1" lines title="src/content/config.ts"
export const versions = [
  {
    name: 'version_name',
    homepage: 'homepage_filename' // directly within the version folder
  },
];
```

Simply change the values of `name` and `homepage` as required. To add new version, copy content inside `{ }` including brackets and paste it above.

```typescript start="1" lines title="src/content/config.ts"
export const versions = [
  {
    name: 'new_version_name', // new version
    homepage: 'new_homepage_filename'
  },
  {
    name: 'version_name',
    homepage: 'homepage_filename'
  },
];
```

This array is in ascending order, where the first element is the latest version and the last element is the oldest version.

### Naming Convention

Use this format to name your files:

```text
Doc_A.md        # doc
Some_Directory  # directory
_Doc_D.md       # draft, is hidden
```

Here are the **three** rules that apply:

1. File and directory names act as slug in the URL, and these are case-sensitive. For files `.md` extension is removed and is replaced with `.html`. For directories, the name is used as is.
2. Files starting with `_` (_underscore_) are seen as a draft and are hidden inside the navigation tree.
3. When naming a file or folder:

   - Do not to use _spaces_.
   - Use these URL safe symbols `-_.!'()`.
   - Use only English (A-Z a-z) and numerical (0-9) characters.

   None of the above are strict rules, but following them will make your life easier when [linking docs](writing_first_doc.html#linking-other-docs).

   | Not Recommended       | Recommended           |
   | --------------------- | --------------------- |
   | `Doc A.md`            | `Doc_A.md`            |
   | `Some Directory Name` | `Some_Directory_Name` |

   When using spaces and special characters other than `-_.!'()`, you should be cautious to how you link other docs.

   ```markdown color="good"
   [Link to Doc A](Doc_A.md)  # works
   ```

   ```markdown color="bad"
   [Link to Doc A](Doc A.md)  # doesn't work
   ```

   To make it work, you will have to replace the spaces with `%20`:

   ```markdown color="good"
   [Link to Doc A](Doc%20A.md) # works although not very readable
   ```

   For character encoding reference, see [W3 Schools - URL Encoding](https://www.w3schools.com/tags/ref_urlencode.ASP).