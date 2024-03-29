---
title: Writing your First Doc
date: 2024-03-28T22:51:27Z
description:
next: 3_Deploying_Planum/1_Deploying_Static.html
prev: 1_Getting_Started.html
---

Now, let's get you started for writing your first doc!

If you are unsure about where to make your file or how to name one, **check the [Getting Started](/1_Getting_Started.html#creating-docs-and-folders) page** first.

## Layout

Here is the layout of a typical doc file:

```text
---
title         : Getting started
date          : 2024-03-18T10:45:00Z
description   : Useful information for starting with Planum Docs
next          : /2_Writing_your_First_Doc.html
prev          : /0_Installation.md
---

Your content goes here.
```

- **title**: The title of the doc. If not present, the file name is used as the title.
- **date**: The date of the doc. This shows up on top of the page. You may wish to update it when you make changes to the doc. The date in above sample markdown is in **UTC** time (_Z_ represents UTC) and gets converted to server's local time when rendering.
- **description**: A short description of the doc. This shows up under the title on the doc page.
- **next**: (_optional_) The link to the next doc. This is used to create a "Next" button on buttom of the doc page.
- **prev**: (_optional_) The link to the previous doc. This creates a "Previous" button.

> In **next** and **prev** both `.md` and `.html` extensions work. You can choose whatever seems easy for you.

## Content Formatting

The content is written in markdown format. If you are not familiar with markdown, you can check the [Markdown Guide](https://www.markdownguide.org/).

### Using Images and Assets

You can add your assets directly in the `assets` directory or make folders for organization. To use an image in your doc, you can use the following markdown: (assuming the image is in `assets` directory)

```text
![Alt text](/assets/image_name.png)
```

For best performance, it is recommended to convert images to WebP format. You can use tools like [CloudConvert](https://cloudconvert.com/webp-converter) to convert images to WebP.

### Linking other Docs

```text
[link title](/Folder_1/Folder_2/1_Doc.html)
```

> Notice that when linking, the extension `.html` is used.

This creates a link to a doc located at `content/Folder_1/Folder_2/1_Doc.md` in file tree. Notice that `content` is not included when linking.

#### Key Points

- The file path is relative to the `content` directory.
- The file extension `.md` is replaced with `.html`.

> Related: See how to name your files and folders under [Schema - Getting Started](/1_Getting_Started.html#schema).

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

Please check following resources to learn more about markdown that works with Planum Docs:

- [Using Math in Planum](/4_Markdown/4_Using_Math_in_Planum.html)
- [Markdown Cheatsheet](/4_Markdown/5_Markdown_Cheatsheet.html)

### Using HTML

You can also use HTML in your docs. This can be useful for adding custom elements, styling, or just adding new lines using `<br>`.

However, it is recommended to use markdown as much as possible. Embedding non-verified HTML such as images, iframes, and scripts that are not controlled directly by you can be a security risk.
