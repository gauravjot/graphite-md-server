---
title: Getting started
date: 2024-03-18T10:45:00Z
description:
next: 2_Writing_your_First_Doc.md
prev: 0_Installation.md
---

Congratulations on setting up Graphite Docs! This page will help you get started with the project.

## Creating Docs and Folders

#### Location

The docs are to be stored in the `content` directory. You may make directories inside as well.

#### Schema

The docs and folders are sorted alphabetically in sidebar. Use this format to name your files:

```text
1_Doc_A.md        # doc
2_Doc_B.md        # doc
3_Some_Directory  # directory
4_Doc_C.md        # doc
_Doc_D.md         # draft, is hidden
```

> Underscores as separators are preferred and also look clean. See point 3 below.

The navigation tree inside sidebar will be rendered in this exact manner. Here are all the rules that apply:

1. Use format _[number]\_[name.md]_ to sort your files and directories, the prefix `[number]_` part is omitted during build.
2. Files starting with `_` (_underscore_) are treated as a draft and are hidden inside the navigation tree.
3. **IMPORTANT:** Do not use spaces when naming a file or folder. You should instead use URL safe symbols such as `$-_.+!*'(),`. See [Content Formatting - Linking other Docs](/2_Writing_your_First_Doc.html#linking-other-docs) for more related info.
