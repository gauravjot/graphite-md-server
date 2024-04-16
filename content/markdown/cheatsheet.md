---
title: Markdown Cheat Sheet
date: 2024-03-21T21:15:42Z
description: A quick reference for general markdown syntax.
---

When using a markdown element, it is recommended to use a **blank line before and after the element**. This ensures that the document is rendered correctly and also makes the markdown more readable. If you are not familiar with markdown, you can check the [Markdown Guide](https://www.markdownguide.org/).

## Headers

```markdown
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

### Heading IDs

This are useful for linking to a specific heading. It shows up in the URL starting with _#_ symbol when you click on a heading link.

```markdown
## Heading with ID {#custom-id}
```

## Bold and Italic

```markdown
_italic_
**bold**
**_bold italic_**
```

## Strikethrough

```markdown
~~Strikethrough~~
```

## Lists

#### Unordered

```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

#### Ordered

```markdown
1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2
```

> To create nested lists, indent the items by four spaces.

## Links

```markdown
[Link title](https://example.com)
```

> Note: For linking to internal doc pages, see [Linking other Docs](/Writing_your_First_Doc.html#linking-other-docs) section.

## Images

```markdown
![Alt text](https://example.com/image.jpg)
```

## Blockquotes

```markdown
> This is a blockquote
```

## Code

#### Inline

```markdown
`code`
```

Example: Here is an `inline code` in a sentence.

#### Blocks

````text
```python
print("Hello, World!")
```
````

> Note: If you are using Planum Docs, you can do alot more with codeblocks. Check the [Codeblocks](/Writing_your_First_Doc.html#codeblocks) section for more information.

## Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Row 1    | Row 1    |
| Row 2    | Row 2    |
```

## Horizontal Rule

```markdown
---
```

## Escaping

```markdown
\*escaped\*
```

This let you escape **\*** symbol that otherwise would indicate the text is italic: \*escaped\*

## Footnotes

```markdown
Here is a footnote reference[^1].

[^1]: Here is the footnote.
```

Example: Here is a footnote reference[^1].

[^1]: Here is the footnote.

## Math

Planum Docs have built-in support for math equations. See the [Using Math in Planum Docs](/Markdown/Using_Math_in_Planum) page for more information.
