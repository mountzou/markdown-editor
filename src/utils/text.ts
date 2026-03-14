/**
 * Text utilities for word/character counts and pluralization.
 */

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).filter(Boolean).length
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}
