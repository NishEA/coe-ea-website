import { render, screen } from '@testing-library/react'
import { TheResolve } from '@/components/spreads/TheResolve'
import { FieldProvider } from '@/components/field/FieldProvider'

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheResolve', () => {
  it('renders section with id="resolve"', () => {
    render(<TheResolve />, { wrapper: W })
    expect(document.getElementById('resolve')).toBeInTheDocument()
  })

  it('renders 10 domain names for screen readers', () => {
    render(<TheResolve />, { wrapper: W })
    const list = screen.getByRole('list', { name: /infrastructure domains/i })
    expect(list.querySelectorAll('li')).toHaveLength(10)
  })

  it('each domain has a keyboard-accessible resolve button', () => {
    render(<TheResolve />, { wrapper: W })
    expect(screen.getAllByRole('button', { name: /resolve/i })).toHaveLength(10)
  })
})
