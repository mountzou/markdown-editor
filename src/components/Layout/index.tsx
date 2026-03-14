import { useState } from 'react'
import { Editor } from '../Editor'
import { Preview } from '../Preview'

export interface LayoutProps {
  markdown: string
  onEditorChange: (value: string) => void
}

type FullscreenPanel = 'editor' | 'preview' | null

function FullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function ExitFullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

/**
 * Two-pane layout: editor (left) and read-only preview (right).
 * Each panel can be toggled to fullscreen.
 */
export function Layout({ markdown, onEditorChange }: LayoutProps) {
  const [fullscreen, setFullscreen] = useState<FullscreenPanel>(null)
  const [copied, setCopied] = useState(false)

  const isEditorFullscreen = fullscreen === 'editor'
  const isPreviewFullscreen = fullscreen === 'preview'

  const toggleEditorFullscreen = () => setFullscreen((prev) => (prev === 'editor' ? null : 'editor'))
  const togglePreviewFullscreen = () => setFullscreen((prev) => (prev === 'preview' ? null : 'preview'))

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`layout ${fullscreen ? 'layout-fullscreen' : ''}`} data-fullscreen={fullscreen}>
      <aside
        className={`layout-editor ${isEditorFullscreen ? 'layout-panel-fullscreen' : ''} ${isPreviewFullscreen ? 'layout-panel-hidden' : ''}`}
      >
        <div className="layout-panel-toolbar">
          <span className="layout-panel-label">Editor</span>
          <div className="layout-panel-actions">
            <button
              type="button"
              className="layout-panel-toolbar-btn"
              onClick={copyMarkdown}
              title="Copy markdown"
              aria-label="Copy markdown"
            >
              {copied ? (
                <span className="layout-panel-copied">Copied!</span>
              ) : (
                <CopyIcon />
              )}
            </button>
            <button
              type="button"
              className="layout-panel-toolbar-btn"
              onClick={toggleEditorFullscreen}
              title={isEditorFullscreen ? 'Exit fullscreen' : 'Editor fullscreen'}
              aria-label={isEditorFullscreen ? 'Exit fullscreen' : 'Editor fullscreen'}
            >
              {isEditorFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>
          </div>
        </div>
        <div className="layout-panel-content">
          <Editor value={markdown} onChange={onEditorChange} />
        </div>
      </aside>
      <aside
        className={`layout-preview ${isPreviewFullscreen ? 'layout-panel-fullscreen' : ''} ${isEditorFullscreen ? 'layout-panel-hidden' : ''}`}
      >
        <div className="layout-panel-toolbar">
          <span className="layout-panel-label">Preview</span>
          <div className="layout-panel-actions">
          <button
            type="button"
            className="layout-panel-fullscreen-btn"
            onClick={togglePreviewFullscreen}
            title={isPreviewFullscreen ? 'Exit fullscreen' : 'Preview fullscreen'}
            aria-label={isPreviewFullscreen ? 'Exit fullscreen' : 'Preview fullscreen'}
          >
            {isPreviewFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
          </div>
        </div>
        <div className="layout-panel-content">
          <Preview content={markdown} />
        </div>
      </aside>
    </div>
  )
}
