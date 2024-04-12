---
title: Getting started
description:
next: Writing_your_First_Doc.md
prev: Installation.md
---

Congratulations on setting up Planum Docs! This page will help you get started with the project.

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

1. File and directory names act as slug in the URL. For files `.md` extension is removed and is replaced with `.html`. For directories, the name is used as is.
2. Files starting with `_` (_underscore_) are seen as a draft and are hidden inside the navigation tree.
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

### `meta.json` File

This file is used for sorting the docs in the sidebar. The order of the docs and folders is determined by the order inside the `meta.json` file.

```json title="content/meta.json"
{
	"order": [
		"Installation.md",
		"Getting_Started.md",
		"Writing_your_First_Doc.md",
		"Deploying_Planum",
		"Markdown",
		"Customization"
	]
}
```
