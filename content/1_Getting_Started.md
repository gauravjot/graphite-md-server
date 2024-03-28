---
title: Getting started
date: 2024-03-28T22:43:22Z
description:
next: 2_Writing_your_First_Doc.md
prev: 0_Installation.md
---

Congratulations on setting up Graphite Docs! This page will help you get started with the project.

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

The navigation tree inside sidebar will be rendered in this exact manner. Here are all the rules that apply:

1. Use format `[number]_[name].md` to sort your files and directories, the prefix `[number]_` part is omitted during build.
2. Files starting with `_` (_underscore_) are treated as a draft and are hidden inside the navigation tree.
3. Try not to use _spaces_ when naming a file or folder. You should also restrict to using only URL safe symbols such as `$-_.+!*'(),`, however it is not a requirement.

   | Do this:              | Don't do this:        |
   | --------------------- | --------------------- |
   | `1_Doc_A.md`          | `1 Doc A.md`          |
   | `Some_Directory_Name` | `Some Directory Name` |

   **Reason**: This is because markdown links do not render that contain spaces.

   ```markdown_good
   [Link to Doc A](1_Doc_A.md)  # works
   ```

   ```markdown_bad
   [Link to Doc A](1 Doc A.md)  # doesn't work
   ```

   To make it work, you would have to replace the spaces with `%20`:

   ```markdown_good
   [Link to Doc A](1%20Doc%20A.md) # works although not very readable
   ```
