import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    next: z.string().nullable().optional(),
    prev: z.string().nullable().optional(),
    sort: z.number().nullable().optional(),
    alias: z.string().nullable().optional(),
  })
});

export const collections = {
  'v1': docsCollection,
  'v2': docsCollection,
};