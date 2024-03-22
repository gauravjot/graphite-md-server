---
title: Deploying Static (and Vercel)
date: 2024-03-18T10:45:00Z
description:
prev: 2_Writing__your__First__Doc
next: 3_Deploying__Graphite___2_Deploying__ExpressJS
---

You can build static HTML files using the included `build` command. This will create a `dist` folder with all the files you need to deploy to a static hosting provider.

```bash
npm run build
```

> This script is not tested thoroughly for stability. So, if you find any issues, please report them.

## Deploying to Vercel

(As of March 21, 2024)

[Vercel](https://vercel.com) allows you to host static websites. You start by creating new project in Vercel that points to your repository. Then use these settings:

1. Assuming you are cloned this repository, you have to choose following settings in Vercel:

    | Setting          | Value   |
    | ---------------- | ------- |
    | Framework Preset | `Other` |
    | Root Directory   | `./`    |

    > If you have Graphite Docs in a subdirectory, you will need to point the `Root Directory` to that subdirectory.

2. Under _Building and Output Settings_, set the commands as follows:

    | Setting          | Value           |
    | ---------------- | --------------- |
    | Build Command    | `npm run build` |
    | Output Directory | `dist`          |

Here is a screenshot of the settings:

> ![Vercel Settings](images/vercel_deploy_settings.webp)
