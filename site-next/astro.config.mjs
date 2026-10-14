import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { katexPlugin } from './src/plugins/katex.mjs';

const redirectedPaths = new Set([
  '/me/', '/insights/', '/request-cv/',
  '/request-success/', '/contact/', '/projects/auv-simulation/'
]);

export default defineConfig({
  site: 'https://pruthvi54.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { processor: satteri({ features: { math: true }, mdastPlugins: [katexPlugin] }) },
  integrations: [mdx(), sitemap({ filter: (page) => {
    const pathname = new URL(page).pathname;
    return !redirectedPaths.has(pathname) && pathname !== '/404.html';
  } })]
});
