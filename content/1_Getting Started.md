---
title: Getting started
date: 2024-03-18T10:45:00Z
description:
next: 2_Writing__your__First__Doc
prev: 0_Installation
---

Congratulations on setting up Graphite Docs! This page will help you get started with the project.

## Creating Docs and Folders

#### Location

The docs are to be stored in the `content` directory. You may make directories inside as well.

#### Schema

The docs and folders are sorted alphabetically in sidebar. Use this format to name your files:

```text
1_Doc A.md        # doc
2_Doc B.md        # doc
3_Some Directory  # directory
4_Doc C.md        # doc
_Doc D.md         # draft, is hidden
```

The navigation tree inside sidebar will be rendered in this exact manner. Here are all the rules that apply:

- Use format _[number]\_[name.md]_ to sort your files and directories, the prefix `[number]_` part is omitted during rendering.
- Files starting with `_` (_underscore_) are treated as a draft and thus are hidden inside the navigation tree.
- **IMPORTANT:** Do not use more than one underscore or space together when naming a file or folder. <u>This will break things.</u> E.g. `Hello_Polar_Star.md` is perfectly okay, but `Hello__Polar_Star.md` will cause problems.

  This is because _spaces_ are replaced with `__` (double underscore) to distinguish between spaces and underscores **in the URL**. A triple underscore `___` is used to separate folders and files. See [Content Formatting - Linking other Docs](/2_Writing__your__First__Doc.html#linking-other-docs) for more reasoning.

  A period `.` will work but is discouraged as it may conflict with the file extension (_.md_).

## Updating Homepage

The homepage content is stored in `src/index.md`. You can modify this file to update the content of the homepage.
