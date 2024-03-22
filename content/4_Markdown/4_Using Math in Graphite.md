---
title: Using Math in Graphite
date: 2024-03-21T22:28:42Z
description:
---

Graphite Docs support rendering math equations using KaTeX. A guide to KaTeX can be found at <https://katex.org/docs/supported.html>.

#### Examples

```markdown
Pythagoran theorem is $$a^2 + b^2 = c^2$$.

Bayes theorem:

$$P(A | B) = (P(B | A)P(A)) / P(B)$$
```

This will render the math equation like this

> Pythagoran theorem is $a^2 + b^2 = c^2$.
>
> Bayes theorem:
>
> $$P(A | B) = (P(B | A)P(A)) / P(B)$$

##### Complex example

```markdown
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
