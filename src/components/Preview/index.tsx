import { useRef, useEffect, useMemo } from 'react'
import hljs from '../../lib/highlight'
import { markdownToHtml } from '../../lib/markdown'
import './preview.css'
import './highlight-themes.css'

interface PreviewProps {
  content: string
}

/**
 * Rendered Markdown preview (read-only). Updates when markdown content changes.
 */
export function Preview({ content }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const html = useMemo(() => markdownToHtml(content), [content])

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = html
    ref.current.querySelectorAll<HTMLElement>('pre code').forEach((el) => {
      hljs.highlightElement(el)
    })
  }, [html])

  return (
    <div className="preview-pane" data-testid="preview-pane">
      <div
        ref={ref}
        className="preview-content"
        aria-label="Markdown preview"
      />
    </div>
  )
}
