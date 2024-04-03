---
title: Getting started
description:
next: 2_Writing_your_First_Doc.md
prev: 0_Installation.md
---

Congratulations on setting up Planum Docs! This page will help you get started with the project.

## Creating Docs and Folders

### Location

The docs are to be stored in the `content` directory. You may make directories inside as well.

### Schema

Use this format to name your files:

```text
1_Doc_A.md        # doc
2_Doc_B.md        # doc
3_Some_Directory  # directory
4_Doc_C.md        # doc
_Doc_D.md         # draft, is hidden
```

> Underscores as separators are preferred and also look clean. See point 3 below.

The navigation tree inside sidebar will be rendered in this exact manner. Here are **three** rules that apply:

1. Use format `[number]_[name].md` to sort documents and folders; the prefix `[number]_` is omitted during build.
   > Note: The number is used to sort the files in ascending order. If you have more than 9 files, use two digits like `01`, `02`, etc. Otherwise, the files will be sorted like `1`, `10`, `11`, `2`, `3`, etc.
2. Files starting with `_` (_underscore_) are treated as a draft and are hidden inside the navigation tree.
3. When naming a file or folder:

   - Do not to use _spaces_.
   - Use these URL safe symbols `-_.!'()`.
   - Use only English (A-Z a-z) and numerical (0-9) characters.

   None of the above are strict rules, but following them will make your life easier when [linking docs](/2_Writing_your_First_Doc.html#linking-other-docs).

   | Not Recommended       | Recommended           |
   | --------------------- | --------------------- |
   | `1 Doc A.md`          | `1_Doc_A.md`          |
   | `Some Directory Name` | `Some_Directory_Name` |

   When using spaces and special characters other than `-_.!'()`, markdown may not render links properly.

   ```markdown_good
   [Link to Doc A](1_Doc_A.md)  # works
   ```

   ```markdown_bad
   [Link to Doc A](1 Doc A.md)  # doesn't work
   ```

   To make it work, you will have to replace the spaces with `%20`:

   ```markdown_good
   [Link to Doc A](1%20Doc%20A.md) # works although not very readable
   ```

   For character encoding reference, see [W3 Schools - URL Encoding](https://www.w3schools.com/tags/ref_urlencode.ASP).
