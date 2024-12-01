---
title: Deploying to Production
description: This guide will help you deploy your Planum Docs website to any static hosting provider and Vercel.
prev: configuration/sidebar
sort: 5
---

## Prerequisites

- As of now, Planum can only be deployed directly to top-level domains. E.g., `https://example.com` or `https://docs.example.com`. It does not support subdirectories like `https://example.com/docs`.

  So, make sure you have a domain or subdomain ready. If you don't have one, you can use services like [Vercel](https://vercel.com) to host your website that provides a free subdomain.

## Deploying to a Static Hosting Provider

You can build static HTML files using Astro's build feature. This will create a `dist` folder with all the files you need to deploy to a static hosting provider.

```bash
npm run build
```

If you find any issues while building, please [report them](https://github.com/gauravjot/planum-docs/issues).

## Deploying to Vercel

(As of April 20, 2024)

[Vercel](https://vercel.com) allows you to host static websites. You start by creating new project in Vercel that points to your repository. Then use these settings:

1. Assuming you are cloned this repository, you have to choose following settings in Vercel:

   | Setting          | Value   |
   | ---------------- | ------- |
   | Framework Preset | `Other` |
   | Root Directory   | `./`    |

   > If you have Planum Docs in a subdirectory, you will need to point the `Root Directory` to that subdirectory.

2. Under _Building and Output Settings_, set the commands as follows:

   | Setting          | Value           |
   | ---------------- | --------------- |
   | Build Command    | `npm run build` |
   | Output Directory | `dist`          |

Here is an example of the settings:

![Vercel Settings](/assets/vercel_deploy_settings.webp)
