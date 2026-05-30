import '@testing-library/jest-dom'

// Canvas mock — jsdom has no Canvas 2D implementation
const ctx2d = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  lineJoin: '' as CanvasLineJoin,
  lineCap: '' as CanvasLineCap,
  font: '',
  globalAlpha: 1,
  globalCompositeOperation: '',
  shadowBlur: 0,
  shadowColor: '',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'left' as CanvasTextAlign,
  textBaseline: 'alphabetic' as CanvasTextBaseline,
  save: vi.fn(),
  restore: vi.fn(),
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  strokeRect: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  clip: vi.fn(),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  drawImage: vi.fn(),
  getImageData: vi.fn(() => new ImageData(1, 1)),
  putImageData: vi.fn(),
  createImageData: vi.fn(() => new ImageData(1, 1)),
  scale: vi.fn(),
  rotate: vi.fn(),
  translate: vi.fn(),
  transform: vi.fn(),
  setTransform: vi.fn(),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  createPattern: vi.fn(() => null),
  rect: vi.fn(),
}

HTMLCanvasElement.prototype.getContext = vi.fn(() => ctx2d) as unknown as typeof HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.toDataURL = vi.fn(() => '')

// ResizeObserver mock — jsdom has no ResizeObserver; needs class form for `new`
global.ResizeObserver = class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

// matchMedia mock — jsdom has no media query implementation
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
