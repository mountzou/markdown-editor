import { marked } from 'marked'
import TurndownService from 'turndown'
import katex from 'katex'

marked.setOptions({ gfm: true })

const MATH_BLOCK_PLACEHOLDER = '§§MATH_B'
const MATH_INLINE_PLACEHOLDER = '§§MATH_I'

function renderMath(latex: string, displayMode: boolean): string {
  try {
    const span = katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      output: 'html',
    })
    return displayMode ? `<div class="math-block">${span}</div>` : span
  } catch {
    return displayMode ? `$$${latex}$$` : `$${latex}$`
  }
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  hr: '---',
})

// GFM strikethrough: <del>, <s>, <strike> → ~~text~~
turndownService.addRule('strikethrough', {
  filter: (node) =>
    node.nodeName === 'DEL' ||
    node.nodeName === 'S' ||
    node.nodeName === 'STRIKE',
  replacement(content: string) {
    return `~~${content}~~`
  },
})

/**
 * Convert markdown to HTML (with GFM and LaTeX math).
 * Inline math: $...$ . Block math: $$...$$
 */
export function markdownToHtml(md: string): string {
  const blockParts: string[] = []
  const inlineParts: string[] = []

  let text = md
  // Block math first ($$...$$)
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const i = blockParts.length
    blockParts.push(math)
    return `\n\n${MATH_BLOCK_PLACEHOLDER}${i}§§\n\n`
  })
  // Inline math ($...$) – single line, no unescaped $
  text = text.replace(/\$([^$\n]+)\$/g, (_, math) => {
    const i = inlineParts.length
    inlineParts.push(math)
    return `${MATH_INLINE_PLACEHOLDER}${i}§§`
  })

  let html = marked.parse(text, { async: false }) as string

  blockParts.forEach((math, i) => {
    const placeholder = `${MATH_BLOCK_PLACEHOLDER}${i}§§`
    html = html.split(placeholder).join(renderMath(math, true))
  })
  inlineParts.forEach((math, i) => {
    const placeholder = `${MATH_INLINE_PLACEHOLDER}${i}§§`
    html = html.split(placeholder).join(renderMath(math, false))
  })

  return html
}

/**
 * Convert HTML to markdown. Normalizes list spacing and keeps list items flush (no indent for nested items).
 */
export function htmlToMarkdown(html: string): string {
  const md = turndownService.turndown(html)
  // Turndown uses "-   " (3 spaces) and "1.  " (2 spaces); normalize to single space
  let out = md
    .replace(/^(\s*)(-)(\s+)/gm, '$1$2 ')
    .replace(/^(\s*)(\d+\.)(\s+)/gm, '$1$2 ')
  // Strip leading whitespace before list markers so nested items stay "- item" not "  - item"
  out = out.replace(/^\s+(- )/gm, '- ').replace(/^\s+(\d+\. )/gm, '$1 ')
  return out
}
