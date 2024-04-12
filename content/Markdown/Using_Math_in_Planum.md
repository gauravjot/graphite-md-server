---
title: Using Math in Planum
date: 2024-03-21T22:28:42Z
description:
---

Planum Docs support rendering math equations using KaTeX. A guide to KaTeX can be found at <https://katex.org/docs/supported.html>.

## Examples

Use single `$` for inline math and `$$` for block math.

```markdown
Pythagoran theorem is $a^2 + b^2 = c^2$.

Bayes theorem:

$$P(A | B) = (P(B | A)P(A)) / P(B)$$
```

Pythagoran theorem is $a^2 + b^2 = c^2$.

Bayes theorem:

$$P(A | B) = (P(B | A)P(A)) / P(B)$$

---

```markdown
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$

---

```markdown
$$
\begin{CD}
A @>a>> B \\
@VbVV @AAcA \\
C @= D
\end{CD}
$$
```

$$
\begin{CD}
A @>a>> B \\
@VbVV @AAcA \\
C @= D
\end{CD}
$$

---

```markdown
$$
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
$$
```

$$
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
$$

---

```markdown
$$\textcolor{green}{F=ma}$$
$$\fcolorbox{red}{teal}{F=ma}$$
$$\fcolorbox{red}{yellow}{\textcolor{green}{F=ma}}$$
```

$$\textcolor{green}{F=ma}$$
$$\fcolorbox{red}{teal}{F=ma}$$
$$\fcolorbox{red}{yellow}{\textcolor{green}{F=ma}}$$

## Limitations

[HTML](https://katex.org/docs/supported.html#html) features of KaTeX are not fully supported in Planum Docs. There is limited support for using `\url` and `\href` commands.
