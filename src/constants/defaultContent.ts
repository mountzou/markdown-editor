/**
 * Default markdown content shown when the editor loads.
 */

export const INITIAL_MARKDOWN = `# Welcome

Welcome to **Markdown Editor**, a clean space for writing, previewing, and refining your documents in real time. Create notes, documentation, and technical content with support for **live preview** and **LaTeX math**.

![Version](https://img.shields.io/badge/version-v1.0.0-blue) ![Markdown%20Editor](https://img.shields.io/badge/Markdown%20Editor-online-green)

## Headings

Use headings to organize your content clearly, from main sections to more detailed subsections.

### Writing Content

#### Formatting Text

##### Keyboard Shortcuts

###### Additional Tips

## Blockquotes

> A single blockquote line.
>
> Multiple paragraphs in a quote. **Bold** and *italic* work here too.

## Lists

Unordered:

- Item one
- Item two
  - Nested item
- Item three

Ordered:

1. First
2. Second
3. Third

## Emphasis

**Bold text** and *italic text* and ***bold italic***. You can also use \`__double underscores__\` for bold and \`_single_\` for italic.

## Links and code

[Example link](https://example.com). Inline \`code\` and a fenced block:

\`\`\`js
console.log('Hello, Markdown!')
\`\`\`

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("Markdown"))
\`\`\`

## LaTeX math

Inline: $E = mc^2$ and $a^2 + b^2 = c^2$. Display:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## GFM extras

| Column A | Column B |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Strikethrough: ~~removed text~~. Task list:

- [ ] Unchecked
- [x] Checked

---

Horizontal rule above.
`
