---
title: Writing your First Doc
date: 2024-03-22T08:32:27Z
description:
next: 3_Deploying__Graphite___1_Deploying__Static
prev: 1_Getting__Started
---

Now, let's help you write your first doc. If you are not sure where to make your doc files, check the [Getting Started](/1_Getting__Started) page first.

## Layout

Here is the layout of a typical doc file:

```text
---
title         : Getting started
date          : 2024-03-18T10:45:00Z
description   : Useful information for starting with Graphite Docs
next          : /2_Writing__your__First__Doc
prev          :
---

Your content goes here.
```

- **title**: The title of the doc. If not present, the file name is used as the title.
- **date**: The date of the doc. This shows up on top of the page. You may wish to update it when you make changes to the doc. The date in above sample markdown is in **UTC** time (_Z_ represents UTC) and gets converted to server's local time when rendering.
- **description**: A short description of the doc. This shows up under the title on the doc page.
- **next**: (_optional_) The link to the next doc. This is used to create a "Next" button on buttom of the doc page.
- **prev**: (_optional_) The link to the previous doc. This creates a "Previous" button.

## Content Formatting

The content is written in markdown format. If you are not familiar with markdown, you can check the [Markdown Guide](https://www.markdownguide.org/).

### Linking other Docs

```text
[link title](/Folder__1___Folder__2___1_Doc)
```

This creates a link to a doc located at `content/Folder 1/Folder 2/1_Doc.md` in file tree.

###### Key Points

- The file path is relative to the `content` directory.

- Folders and file names have _spaces_ replaced with `__` (double underscore). The file extension `.md` is omitted.
- To distinguish within folders and file, `___` (triple underscore) is used.

### Colorize Codeblocks

There are two ways to colorize codeblocks:

1. Green: Using language `[langauge]_good`

   ````markdown
   ```python_good
   i = 0
   while i < len(books):
       print(books[i])
       i += 1
   ```
   ````

   This will render like this

   ```python_good
   i = 0
   while i < len(books):
       print(books[i])
       i += 1
   ```

2. Red: Using language `[langauge]_bad`

   ````markdown
   ```python_bad
   for book in books:
       print(book)
   ```
   ````

   Rendering

   ```python_bad
   for book in books:
       print(book)
   ```

### Complete Markdown Reference

Please check following resources to learn more about markdown that works with Graphite Docs:

- [Using Math in Graphite](/4_Markdown___4_Using__Math__in__Graphite)
- [Markdown Cheatsheet](/4_Markdown___5_Markdown__Cheatsheet)

### Using HTML

You can also use HTML in your docs. This can be useful for adding custom elements, styling, or just adding new lines using `<br>`.

However, it is recommended to use markdown as much as possible. Embedding non-verified HTML such as images, iframes, and scripts that are not controlled directly by you can be a security risk.
