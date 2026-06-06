import { render, screen, within } from '@testing-library/react'
import { TheApplication } from '@/components/spreads/TheApplication'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('@/components/forms/apply/ApplyForm', () => ({
  ApplyForm: () => <form aria-label="Apply form" />,
}))

describe('TheApplication', () => {
  it('renders section with id="apply"', () => {
    render(<TheApplication />)
    expect(document.getElementById('apply')).toBeInTheDocument()
  })

  it('renders 5 benefit items', () => {
    render(<TheApplication />)
    const benefitsList = screen.getByRole('list', { name: /what you get/i })
    expect(within(benefitsList).getAllByRole('listitem')).toHaveLength(5)
  })

  it('renders ApplyForm', () => {
    render(<TheApplication />)
    expect(screen.getByRole('form', { name: /apply form/i })).toBeInTheDocument()
  })
})
