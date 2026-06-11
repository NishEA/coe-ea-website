/**
 * Observatory motion primitives — single physics language for the whole site.
 *
 * Import these constants wherever you set `transition` or `animate` props so
 * every component speaks the same timing dialect.
 */

// Cinematic deceleration — entrances, reveals, wipes.
export const EASE_CINEMA = [0.16, 1, 0.3, 1] as const

// Camera-cut / snappy exit — departures, drawer close.
export const EASE_CAMERA = [0.45, 0, 0.15, 1] as const

// Panel spring — nav drawer, sheet slide-in, card expand.
export const SPRING_PANEL = {
  type: 'spring',
  stiffness: 170,
  damping: 26,
  mass: 0.9,
} as const

// Cursor spring — pointer-tracking elements, magnetic hover.
export const SPRING_CURSOR = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
} as const

// Tilt spring — 3-D card tilt, gyro-driven rotation.
export const SPRING_TILT = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const
