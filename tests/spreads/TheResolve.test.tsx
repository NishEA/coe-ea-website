import { render, screen } from '@testing-library/react'
import { TheResolve } from '@/components/spreads/TheResolve'

describe('TheResolve', () => {
  it('renders section with id="resolve"', () => {
    render(<TheResolve />)
    expect(document.getElementById('resolve')).toBeInTheDocument()
  })

  it('renders The Shift label', () => {
    render(<TheResolve />)
    expect(screen.getByText('The Shift')).toBeInTheDocument()
  })

  it('renders Before and After panels', () => {
    render(<TheResolve />)
    expect(screen.getByText(/before — legacy state/i)).toBeInTheDocument()
    expect(screen.getByText(/after — instrumented/i)).toBeInTheDocument()
  })
})
