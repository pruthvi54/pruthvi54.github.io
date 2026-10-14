import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    studyTitle: z.string().optional(),
    summary: z.string().min(1),
    details: z.string().optional(),
    year: z.number().int(),
    status: z.string().min(1).optional(), // shown only for work with a publication
    kind: z.enum(['full', 'brief']),
    domain: z.string().min(1),
    tags: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    preview: z.object({ url: z.string(), alt: z.string(), caption: z.string() }).optional(),
    lead: z.string().optional(),
    sections: z.array(z.string()).optional(),
    credits: z.string().optional(),
    info: z.object({ duration: z.string().optional(), institution: z.string().optional(), role: z.string().optional(), teamSize: z.string().optional() }).optional(),
    relatedWork: z.array(z.object({ title: z.string(), url: z.url() })).optional()
  }).refine((item) => item.kind === 'brief' ||
    Boolean(item.preview && item.lead && item.sections?.length),
    'Full studies require a preview, lead, and sections')
});

export const collections = { projects };
