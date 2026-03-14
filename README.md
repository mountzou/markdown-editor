# Markdown Editor

A static, client-side Markdown editor built with Vite, React, TypeScript, CodeMirror 6, and react-markdown. No backend required; suitable for GitHub Pages.

## Stack

- **Vite** – build tool
- **React 19** + **TypeScript**
- **CodeMirror 6** (`@uiw/react-codemirror`, `@codemirror/lang-markdown`) – editor
- **react-markdown** + **remark-gfm** – Markdown rendering and GFM (tables, strikethrough, etc.)
- **CSS** – design tokens and layout (no CSS-in-JS)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command      | Description                |
| ------------ | -------------------------- |
| `npm run dev`    | Start dev server           |
| `npm run build`  | Production build            |
| `npm run preview`| Preview production build   |
| `npm run lint`   | Run ESLint                 |

## GitHub Pages

The app uses `base: './'` in `vite.config.ts`, so it works when deployed to the repo root or a subpath (e.g. `https://user.github.io/markdown-editor/`).

1. Build: `npm run build`
2. Deploy the `dist/` folder (e.g. via GitHub Actions with `peaceiris/actions-gh-pages` or by pushing `dist` to a `gh-pages` branch).

## Project structure

```
src/
├── components/
│   ├── Editor/       # CodeMirror 6 editor pane
│   ├── Layout/       # Two-pane layout
│   └── Preview/      # react-markdown preview pane
├── App.tsx
├── App.css
├── index.css         # Global tokens
└── main.tsx
```

## License

MIT
