import { render, screen } from '@testing-library/react'
import { TheApplication } from '@/components/spreads/TheApplication'
import { FieldProvider } from '@/components/field/FieldProvider'

vi.mock('@/components/forms/apply/ApplyForm', () => ({
  ApplyForm: () => <form aria-label="Apply form" />,
}))

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheApplication', () => {
  it('renders section with id="apply"', () => {
    render(<TheApplication />, { wrapper: W })
    expect(document.getElementById('apply')).toBeInTheDocument()
  })

  it('renders 5 benefit items', () => {
    render(<TheApplication />, { wrapper: W })
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('renders ApplyForm', () => {
    render(<TheApplication />, { wrapper: W })
    expect(screen.getByRole('form', { name: /apply form/i })).toBeInTheDocument()
  })
})
