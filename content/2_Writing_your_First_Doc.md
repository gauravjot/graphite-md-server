---
title: Writing your First Doc
date: 2024-04-03
description: Let's get you started with writing your first doc! This page will help you understand the layout and adding content such as images, links, and codeblocks to your docs.
next: 3_Deploying_Planum/1_Deploying_Static.html
prev: 1_Getting_Started.html
---

If you are unsure about where to make your file or how to name one, check the [Getting Started](/1_Getting_Started.html#creating-docs-and-folders) page first.

## Layout

Here is the layout of a typical doc file:

```text
---
title         : Getting started
date          : 2024-03-18
description   : Useful information for starting with Planum Docs
next          : /2_Writing_your_First_Doc.html
prev          : /0_Installation.md
---

Your content goes here.
```

- **title**: The title of the doc and the HTML page. If not present, the file name is used as the title.
- **date** (_optional_): This shows up on top of the page. You may wish to update it when you make changes to the doc. The date is read in **UTC** time.
- **description** (_recommended_): This shows up under the title on the doc page. For better SEO, it is recommended to have a description for meta tags. As such, no markdown is allowed.
- **next** (_optional_): The link to next doc. This is used to create a "Next" button on buttom of the doc page.
- **prev** (_optional_): The link to previous doc. This creates a "Previous" button.

> In **next** and **prev** both `.md` and `.html` extensions work. You can choose whatever seems easy for you.

## Content Formatting

The content is written in markdown format. If you are not familiar with markdown, you can check the [Markdown Guide](https://www.markdownguide.org/).

### Using Images and Assets

You can add your assets directly in the `assets` directory or make folders for organization. To use an image in your doc, you can use the following markdown: (assuming the image is in `assets` directory)

```text
![Alt text](/assets/image_name.png)
```

For best performance, it is recommended to convert images to **WebP format** and use maximum **width of 900px**. You can use tools like [CloudConvert](https://cloudconvert.com/webp-converter) to convert images to WebP.

### Linking other Docs

```text
[link title](/Folder_1/Folder_2/1_Doc.html)
```

> Notice that when linking, the extension `.html` is used.

This creates a link to a doc located at `content/Folder_1/Folder_2/1_Doc.md` in file tree. Notice that `content` is not included when linking.

#### Please Remember

- The file path is relative to the `content` directory.
- The file extension `.md` is replaced with `.html`.
- Always start your links with `/`.
- Non-URL-safe characters are converted to URL-safe characters. For example, spaces are converted to `%20`.

> Related: See how to name your files and folders under [Schema - Getting Started](/1_Getting_Started.html#schema).

### Codeblocks

You can customize codeblocks by using attributes. There are four attributes available:

| Attribute   | Values             | Description                               |
| ----------- | ------------------ | ----------------------------------------- |
| `color`     | `good\|bad` string | Colors the codeblock                      |
| `lines`     | none               | Add line numbers to the codeblock         |
| `title`     | string             | Add a title to the codeblock              |
| `highlight` | string             | Highlight specific lines in the codeblock |

> To use attributes, you need to specify the language name. If you are not using a language, you can use `text` as the language.

#### Add Color for Context

There are two ways to color codeblocks:

1. Green: Using attribute `color="good"`

   ````text
   ```python color="good"
   i = 0
   while i < len(books):
       print(books[i])
       i += 1
   ```
   ````

   This will render like this

   ```python color="good"
   i = 0
   while i < len(books):
       print(books[i])
       i += 1
   ```

2. Red: Using attribute `color="bad"`

   ```python color="bad"
   for book in books:
       print(book)
   ```

#### Add Line Numbers

Add line numbers to your codeblocks by using `lines` attribute.

````text
```python lines
i = 0
while i < len(books):
    print(books[i])
    i += 1
```
````

This will render like this

```python lines
i = 0
while i < len(books):
    print(books[i])
    i += 1
```

#### Add Title

`title="Your Title"`

Example:

```python title="Print Books"
for book in books:
    print(book)
```

#### Add Line Highlighting

`highlight="2,4-5,7-*"`

This will highlight lines 2, 4 to 5, and all lines starting from 7 to end. Attribute values are separated by commas.

```python highlight="2,4-5,7-*" lines
# List of books
books = ["Book 1", "Book 2", "Book 3", "Book 4", "Book 5"]

for book in books:
    print(book)

print("Done")
print("🎉")
```

##### Format

- `2`: Highlights line 2.
- `4-5`: Highlights all lines between and including 4 and 5.
- `7-*`: Highlights all lines starting from 7 to the last.
- `*-10`: Highlights all lines from first to 10.

#### Using Multiple Attributes

You can use multiple attributes in a codeblock.

`color="good" lines title="Print Books" highlight="1,3-4,6-*"`

```python color="good" lines title="Print Books" highlight="1,3-4,6-*"
books = ["Book 1", "Book 2", "Book 3", "Book 4", "Book 5"]

for book in books:
    print(book)

print("Done")
```

### Complete Markdown Reference

Please check following resources to learn more about markdown that works with Planum Docs:

- [Using Math in Planum](/4_Markdown/4_Using_Math_in_Planum.html)
- [Markdown Cheatsheet](/4_Markdown/5_Markdown_Cheatsheet.html)

### Using HTML

You can also use HTML in your docs. This can be useful for adding custom elements, styling, or just adding new lines using `<br>`.

However, it is recommended to use markdown as much as possible. Embedding non-verified HTML such as images, iframes, and scripts that are not controlled directly by you can be a security risk.
