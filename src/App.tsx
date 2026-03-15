import { useState, useCallback, useRef, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/Layout'
import { ThemeToggle } from './components/ThemeToggle'
import { Footer } from './components/Footer'
import { INITIAL_MARKDOWN, MARKDOWN_STORAGE_KEY } from './constants/defaultContent'
import { countWords, pluralize } from './utils/text'
import './App.css'

function getStoredMarkdown(): string {
  try {
    const saved = localStorage.getItem(MARKDOWN_STORAGE_KEY)
    if (saved != null) return saved
  } catch {
    // localStorage unavailable (e.g. private mode)
  }
  return INITIAL_MARKDOWN
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function ToastCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

const TOAST_DURATION_MS = 2500

function App() {
  const [markdown, setMarkdown] = useState(getStoredMarkdown)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const handleEditorChange = useCallback((value: string) => {
    setMarkdown(value)
    try {
      localStorage.setItem(MARKDOWN_STORAGE_KEY, value)
    } catch {
      // Ignore quota or disabled localStorage
    }
  }, [])

  const handleReset = useCallback(() => {
    setMarkdown(INITIAL_MARKDOWN)
    try {
      localStorage.removeItem(MARKDOWN_STORAGE_KEY)
    } catch {
      // Ignore
    }
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast('Content reset')
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null)
      toastTimeoutRef.current = null
    }, TOAST_DURATION_MS)
  }, [])

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [markdown])

  const characterCount = markdown.length
  const wordCount = countWords(markdown)

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header" role="banner">
          <span>Markdown Editor</span>
          <span className="app-header-stats" aria-live="polite">
            {wordCount} {pluralize(wordCount, 'word', 'words')} · {characterCount} {pluralize(characterCount, 'character', 'characters')}
          </span>
          <div className="app-header-actions">
            <button
              type="button"
              className="app-header-reset"
              onClick={handleReset}
              title="Reset to default content"
              aria-label="Reset to default content"
            >
              <RefreshIcon />
            </button>
            <button
              type="button"
              className="app-header-download"
              onClick={handleDownload}
              title="Download as Markdown"
              aria-label="Download as Markdown"
            >
              <DownloadIcon />
            </button>
            <span className="app-header-separator" aria-hidden="true" />
            <ThemeToggle />
          </div>
        </header>
        <main className="app-main" role="main">
          <h1 className="sr-only">Markdown Editor</h1>
          <Layout markdown={markdown} onEditorChange={handleEditorChange} />
        </main>
        <Footer />
        {toast && (
          <div className="app-toast" role="status" aria-live="polite">
            <ToastCheckIcon />
            <span className="app-toast-message">{toast}</span>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
