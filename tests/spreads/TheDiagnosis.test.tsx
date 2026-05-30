import { render, screen } from '@testing-library/react'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'
import { FieldProvider } from '@/components/field/FieldProvider'

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheDiagnosis', () => {
  it('renders H1 for SEO', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('CTA links to #apply', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByRole('link', { name: /show us where it breaks/i }))
      .toHaveAttribute('href', '#apply')
  })

  it('renders first copy line', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByText(/your infrastructure is already talking/i)).toBeInTheDocument()
  })
})
