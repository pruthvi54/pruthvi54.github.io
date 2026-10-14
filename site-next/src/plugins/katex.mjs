// Typesets math for the Sätteri Markdown processor: with features.math, $…$ and $$…$$ become
// inlineMath/math nodes, which this renders to KaTeX HTML at build time (no client-side script).
import { defineMdastPlugin } from 'satteri';
import katex from 'katex';

const render = (tex, displayMode) => ({
  raw: katex.renderToString(tex, { displayMode, throwOnError: true, output: 'htmlAndMathml' }),
  mdxExpressions: false
});

export const katexPlugin = defineMdastPlugin({
  name: 'katex',
  math(node, ctx) { ctx.replaceNode(node, render(node.value, true)); },
  inlineMath(node, ctx) { ctx.replaceNode(node, render(node.value, false)); }
});
