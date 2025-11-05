import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const songsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    genre: z.string().optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const booksCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    genre: z.string().optional(),
    status: z.enum(["draft", "published", "in-progress"]).optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    collection: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  songs: songsCollection,
  books: booksCollection,
};
