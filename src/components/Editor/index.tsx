import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { useTheme } from '../../contexts/ThemeContext'
import './editor.css'

const EDITOR_EXTENSIONS = [EditorView.lineWrapping]

const EDITOR_BASIC_SETUP = {
  lineNumbers: false,
  foldGutter: false,
  highlightActiveLine: false,
  highlightSelectionMatches: false,
} as const

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

/**
 * Markdown editor pane with CodeMirror 6. Plain text only; syntax highlighting is in the preview.
 */
export function Editor({ value, onChange }: EditorProps) {
  const { theme } = useTheme()

  return (
    <div className="editor-pane" data-testid="editor-pane">
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={theme}
        extensions={EDITOR_EXTENSIONS}
        placeholder="Type markdown here..."
        aria-label="Markdown editor"
        basicSetup={EDITOR_BASIC_SETUP}
      />
    </div>
  )
}
