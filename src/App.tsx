import { useState, useCallback } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/Layout'
import { ThemeToggle } from './components/ThemeToggle'
import { Footer } from './components/Footer'
import { INITIAL_MARKDOWN } from './constants/defaultContent'
import { countWords, pluralize } from './utils/text'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN)

  const handleEditorChange = useCallback((value: string) => {
    setMarkdown(value)
  }, [])

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
          <ThemeToggle />
        </header>
        <main className="app-main" role="main">
          <Layout markdown={markdown} onEditorChange={handleEditorChange} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
