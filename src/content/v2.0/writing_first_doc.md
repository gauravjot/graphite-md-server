---
title: Writing your First Doc
description: Let's get you started with writing your first doc! This page will help you understand the layout and adding content such as images, links, and codeblocks to your docs.
next: configuration
prev: getting_started
sort: 3
---

If you are unsure about where to make your file or how to name one, check the [Getting Started](/getting_started.html#creating-docs-and-folders) page first.

## Layout

Here is the layout of a typical doc file:

```text
---
title         : Getting started
date          : 2024-03-18
description   : Useful information for starting with Planum Docs
next          : writing_first_doc.md
prev          : installation.md
sort          : 2
alias         : Getting Started
---

Your content goes here.
```

- **title**: The title of the doc and the HTML page. If not present, the file name is used as the title.
- **date** (_optional_): This shows up on top of the page. You may wish to update it when you make changes to the doc. The date is read in **UTC** time.
- **description** (_recommended_): This shows up under the title on the doc page. For better SEO, it is recommended to have a description for meta tags. As such, no markdown is allowed.
- **next** (_optional_): The link to next doc. This is used to create a "Next" button on buttom of the doc page.
- **prev** (_optional_): The link to previous doc. This creates a "Previous" button.
- **sort** (_optional_): The order in which the doc appears in the sidebar. The lower the number, the higher it appears.
- **alias** (_optional_): The name that appears in the sidebar. If not present, the title is used.

> [!NOTE]
> In **next** and **prev**, omit the `.md` extension.

## Content Formatting

The content is written in markdown format. If you are not familiar with markdown, you can check the [Markdown Guide](https://www.markdownguide.org/).

### Using Images and Assets

You can add your assets directly in the `public/assets` directory or make sub-directories for organization. To use an image in your doc, you can use the following markdown:

```text
![Alt text](/assets/image_name.png)
```

For best performance, it is recommended to convert images to **WebP format** and use maximum **width of 1000px**. You can use tools like [CloudConvert](https://cloudconvert.com/webp-converter) to convert images to WebP.

### Linking other Docs

```text
[link title](folder_1/folder_2/doc)
```

> [!IMPORTANT]
> Notice that when linking, omit the `.md` extension. It is recommended to use relative paths, i.e., not starting with `/`. To go up a directory, use `../`.

### Codeblocks

You can customize codeblocks by using attributes. There are five attributes available:

| Attribute   | Example Values      | Description                                   |
| ----------- | ------------------- | --------------------------------------------- |
| `color`     | `="good"`, `="bad"` | Colors the codeblock                          |
| `lines`     |                     | Show line numbers                             |
| `title`     | `="any string"`     | Add a title to the codeblock                  |
| `highlight` | `="1,3-5,7-*"`      | Highlight specific lines in the codeblock     |
| `start`     | `="4"`              | Start line number; Use with `lines` attribute |

> [!IMPORTANT]
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

#### Add Title

`title="Your Title"`

Usage is same as `color` attribute. Example:

```python title="Print Books"
for book in books:
    print(book)
```

#### Show Line Numbers

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

#### Start Line Number

`start="5"`

Use with attribute: `lines`
Default value: `1`

You can specify the starting line number using the `start` attribute.

```python lines start="5"
for book in books:
    print(book)
```

#### Line Highlighting

`highlight="2,4-5,7-*"`

Line numbers are relative to the `start` attribute.

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

`color="good" title="Print Books" lines highlight="3,5-6,8-*" start="3"`

```python color="good" title="Print Books" lines highlight="3,5-6,8-*" start="3"
books = ["Book 1", "Book 2", "Book 3", "Book 4", "Book 5"]

for book in books:
    print(book)

print("Done")
```

### Alert Blockquotes

These use the same format as GitHub. The first line needs to indicate the alert type.

#### Note

```text
> [!NOTE]
> This is a note.
```

> [!NOTE]
> This is a note.

#### Tip

```text
> [!TIP]
> This is a tip.
```

> [!TIP]
> This is a tip.

#### Important

```text
> [!IMPORTANT]
> Crutial information comes here
```

> [!IMPORTANT]
> Crutial information comes here.

#### Caution

```text
> [!CAUTION]
> Negative potential consequences of an action.
```

> [!CAUTION]
> Negative potential consequences of an action.

#### Warning

```text
> [!WARNING]
> Critical content comes here.
```

> [!WARNING]
> Critical content comes here.

### Embed Iframes

You can embed iframes in your docs. This can be useful for embedding videos, maps, and other content.

**YouTube Video**

```text
<iframe width="100%" style="aspect-ratio:16/9;" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=zlbpakY2yEUGQZBp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

**Codepen**

```text
<iframe height="500" style="width: 100%;" scrolling="no" title="Game of Life" src="https://codepen.io/gauravjot/embed/preview/gOqJmGL?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/gauravjot/pen/gOqJmGL">
  Game of Life</a> by Gauravjot Garaya (<a href="https://codepen.io/gauravjot">@gauravjot</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
```

<iframe height="500" style="width: 100%;" scrolling="no" title="Game of Life" src="https://codepen.io/gauravjot/embed/preview/gOqJmGL?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/gauravjot/pen/gOqJmGL">
  Game of Life</a> by Gauravjot Garaya (<a href="https://codepen.io/gauravjot">@gauravjot</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Complete Markdown Reference

Please check following resources to learn more about markdown that works with Planum Docs:

- [Using Math in Planum](markdown/math.html)
- [Markdown Cheatsheet](markdown/cheatsheet.html)

### Using HTML

You can also use HTML in your docs. This can be useful for adding custom elements, styling, or just adding new lines using `<br>`.

However, it is recommended to use markdown as much as possible. Embedding non-verified HTML such as images, iframes, and scripts that are not controlled directly by you can be a security risk.
