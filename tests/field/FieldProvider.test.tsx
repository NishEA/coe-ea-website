import { render, screen, act } from '@testing-library/react'
import { FieldProvider, useField } from '@/components/field/FieldProvider'

function Consumer() {
  const { resolvedDomains, resolveDomain, unrevealedCount } = useField()
  return (
    <div>
      <span data-testid="count">{resolvedDomains.size}</span>
      <span data-testid="unrevealed">{unrevealedCount}</span>
      <button onClick={() => resolveDomain('smart-energy')}>resolve</button>
    </div>
  )
}

describe('FieldProvider', () => {
  it('starts with zero resolved domains', () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('unrevealedCount starts at 10', () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    expect(screen.getByTestId('unrevealed').textContent).toBe('10')
  })

  it('resolveDomain adds to resolvedDomains', async () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    await act(async () => screen.getByRole('button').click())
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('unrevealedCount decreases after resolve', async () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    await act(async () => screen.getByRole('button').click())
    expect(screen.getByTestId('unrevealed').textContent).toBe('9')
  })

  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Consumer />)).toThrow()
    spy.mockRestore()
  })
})
