import { render, screen } from '@testing-library/react'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'

describe('TheDiagnosis', () => {
  it('renders H1 for SEO', () => {
    render(<TheDiagnosis />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the cinematic headline copy', () => {
    render(<TheDiagnosis />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/measured\s*signal/i)
  })
})
