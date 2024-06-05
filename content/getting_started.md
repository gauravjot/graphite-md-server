---
title: Getting started
description:
next: writing_first_doc.md
prev: installation.md
---

Congratulations on setting up Planum Docs! This page will help you get started with the project.

## Directory Structure

Here is the directory structure of Planum Docs:

```text title="Path: /"
config/         # configuration files
content/        # docs and folders
public/         # static assets
src/            # source code, don't need to touch
```

- **config**: Contains configuration files for the project. You can change the website name, logo, and other settings from here.
- **content**: This is where you will be adding your docs and folders.
- **public**: Contains static assets such as images, stylesheets, and scripts.
- **src**: Contains the source code of the project. You don't need to touch this directory unless you want to change how Planum works.

## Home Page

The home page is generated from the `content/index.md` file.

## Creating Docs and Folders

### Location

The docs are to be stored in the `content` directory. You may make directories inside as well.

### Schema

Use this format to name your files:

```text
Doc_A.md        # doc
Some_Directory  # directory
_Doc_D.md       # draft, is hidden
```

Here are the **three** rules that apply:

1. File and directory names act as slug in the URL, and these are case-sensitive. For files `.md` extension is removed and is replaced with `.html`. For directories, the name is used as is.
2. Files starting with `_` (_underscore_) are seen as a draft and are hidden inside the navigation tree. These files are also not processed during build.
3. When naming a file or folder:

   - Do not to use _spaces_.
   - Use these URL safe symbols `-_.!'()`.
   - Use only English (A-Z a-z) and numerical (0-9) characters.

   None of the above are strict rules, but following them will make your life easier when [linking docs](/Writing_your_First_Doc.html#linking-other-docs).

   | Not Recommended       | Recommended           |
   | --------------------- | --------------------- |
   | `Doc A.md`            | `Doc_A.md`            |
   | `Some Directory Name` | `Some_Directory_Name` |

   When using spaces and special characters other than `-_.!'()`, you should be cautious to how you link other docs.

   ```markdown_good
   [Link to Doc A](Doc_A.md)  # works
   ```

   ```markdown_bad
   [Link to Doc A](Doc A.md)  # doesn't work
   ```

   To make it work, you will have to replace the spaces with `%20`:

   ```markdown_good
   [Link to Doc A](Doc%20A.md) # works although not very readable
   ```

   For character encoding reference, see [W3 Schools - URL Encoding](https://www.w3schools.com/tags/ref_urlencode.ASP).

### _meta.json_

This file is used for sorting the docs and aliasing folder names in the sidebar. You may make _meta.json_ file in each directory you create inside _content_. Example:

```json title="content/meta.json"
{
	"order": ["installation.md", "getting_started.md", "deploy"],
	"alias": {
		"deploy": "Deploying Planum",
		"installation.md": "Installation Guide"
	}
}
```

The file extension _.md_ is required for files.

#### Sorting

The order of the docs and folders is determined by the order inside the `order` key.

#### Aliasing

The `alias` key is used to change folder and file names in the sidebar. The key is the original name and the value is the aliased name.

If file has `title` property in the front matter, the alias will take precedence over it.
