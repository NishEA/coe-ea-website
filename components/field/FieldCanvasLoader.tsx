'use client'
import dynamic from 'next/dynamic'

// ssr:false must live in a Client Component — not allowed in Server Components (Next.js 16+).
export const FieldCanvasLoader = dynamic(
  () => import('./FieldCanvas').then(m => ({ default: m.FieldCanvas })),
  { ssr: false }
)
