---
title: Switch Accent Color
date: 2024-03-21T23:32:12Z
description:
prev: customization/modify_pages.md
---

To change the accent color, you will have to edit the file `tailwind.config.js`. This file is located in the root directory of your project.

Change these lines in the `tailwind.config.js` file:

> Do not change keyword `primary` for the color. Only change the color codes.

```javascript
...
colors: {
  primary: {
    50: "#eef7ff",
    100: "#d9ecff",
    200: "#bcdfff",
    300: "#8eccff",
    400: "#58afff",
    500: "#328dff",
    600: "#2372f5",
    700: "#1457e1",
    800: "#1746b6",
    900: "#193e8f",
    950: "#142757",
  },
},
...
```

Here 50 is the lightest shade and 950 is the darkest shade. You can generate the color shades using the [Tailwind Color Palette Generator](https://javisperez.github.io/tailwindcolorshades/).
