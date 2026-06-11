'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ─────────────────────────────────────────────────────────────────────────────
   IGNITION SEQUENCE — /apply hero visual
   Mission-control arm sequence: countdown manifold, capacity arc with Three.js
   particle torus, intake rail, arming-switch CTA, HUD readout.
   ───────────────────────────────────────────────────────────────────────────── */

const CLOSE_DATE = new Date('2026-09-30T23:59:59+05:30')
const INTAKE_FILLED = 12
const INTAKE_TOTAL = 20

const PIPELINE_STAGES = ['APPLY', 'SCREEN', 'PANEL', 'SIGN', 'BUILD'] as const

const AMBER = '#d4a853'
const AMBER_HI = '#f0cd7e'
const AMBER_CORE = '#ffd98a'

interface CountdownParts {
  d: string
  h: string
  m: string
  s: string
}

type CountdownUnit = keyof CountdownParts

const COUNTDOWN_UNITS: ReadonlyArray<{ key: CountdownUnit; suffix: string }> = [
  { key: 'd', suffix: 'D' },
  { key: 'h', suffix: 'H' },
  { key: 'm', suffix: 'M' },
  { key: 's', suffix: 'S' },
]

function computeCountdown(now: number): CountdownParts {
  const diff = Math.max(0, CLOSE_DATE.getTime() - now)
  const totalSeconds = Math.floor(diff / 1000)
  const d = Math.floor(totalSeconds / 86400)
  const h = Math.floor((totalSeconds % 86400) / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return {
    d: String(d).padStart(2, '0'),
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  }
}

/* ── SVG arc geometry ─────────────────────────────────────────────────────── */

const ARC_CX = 100
const ARC_CY = 100
const ARC_R = 80
const SEGMENT_SWEEP = 15  // degrees drawn per slot (18° pitch − 3° gap)
const SEGMENT_PITCH = 18  // 360 / 20

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function segmentPath(index: number): string {
  const start = index * SEGMENT_PITCH + (SEGMENT_PITCH - SEGMENT_SWEEP) / 2
  const end = start + SEGMENT_SWEEP
  const [x1, y1] = polar(ARC_CX, ARC_CY, ARC_R, start)
  const [x2, y2] = polar(ARC_CX, ARC_CY, ARC_R, end)
  return `M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${ARC_R} ${ARC_R} 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`
}

/* ── Component ────────────────────────────────────────────────────────────── */

export function IgnitionSequence() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const torusMountRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef<HTMLAnchorElement | null>(null)
  const ctaPulseRef = useRef<HTMLSpanElement | null>(null)
  const digitRefs = useRef<Record<CountdownUnit, HTMLSpanElement | null>>({
    d: null, h: null, m: null, s: null,
  })
  const prevCountdownRef = useRef<CountdownParts | null>(null)
  const reducedMotionRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState<CountdownParts | null>(null)

  /* ── Mount gate + reduced-motion detection ──────────────────────────────── */

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMounted(true)
  }, [])

  /* ── Countdown via requestAnimationFrame ────────────────────────────────── */

  useEffect(() => {
    if (!mounted) return
    let rafId = 0
    let lastSecond = -1

    const tick = () => {
      const now = Date.now()
      const second = Math.floor(now / 1000)
      if (second !== lastSecond) {
        lastSecond = second
        setCountdown(computeCountdown(now))
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [mounted])

  /* ── Digit-change pop (GSAP) ────────────────────────────────────────────── */

  useLayoutEffect(() => {
    if (!countdown || reducedMotionRef.current) {
      prevCountdownRef.current = countdown
      return
    }
    const prev = prevCountdownRef.current
    prevCountdownRef.current = countdown
    if (!prev) return

    const tweens: gsap.core.Tween[] = []
    ;(Object.keys(countdown) as CountdownUnit[]).forEach((unit) => {
      const el = digitRefs.current[unit]
      if (!el || prev[unit] === countdown[unit]) return
      tweens.push(
        gsap.fromTo(el,
          { scale: 1.15, color: AMBER_CORE },
          { scale: 1, color: AMBER, duration: 0.45, ease: 'power2.out', overwrite: 'auto' },
        ),
      )
    })
    return () => tweens.forEach((t) => t.kill())
  }, [countdown])

  /* ── Entrance choreography (GSAP scoped to rootRef) ────────────────────── */

  useEffect(() => {
    if (!mounted || reducedMotionRef.current || !rootRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-ig="countdown"]', { opacity: 0, y: -14, duration: 0.7 }, 0.1)
      tl.fromTo(
        '[data-ig="arc-seg"]',
        { strokeDashoffset: 40, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.5, stagger: 0.04 },
        0.35,
      )
      tl.from('[data-ig="arc-core"]', { opacity: 0, scale: 0.92, duration: 0.6 }, 0.9)
      tl.from('[data-ig="rail-node"]', { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, 0.6)
      tl.from('[data-ig="rail-line"]', { scaleX: 0, transformOrigin: 'left center', duration: 0.7 }, 0.55)
      tl.from('[data-ig="cta"]', { opacity: 0, y: 12, duration: 0.6 }, 1.0)
      tl.from('[data-ig="hud"]', { opacity: 0, duration: 0.8 }, 1.2)
    }, rootRef)

    return () => ctx.revert()
  }, [mounted])

  /* ── Three.js amber particle torus (lazy-loaded, zero SSR) ─────────────── */

  useEffect(() => {
    if (!mounted || reducedMotionRef.current) return
    const mount = torusMountRef.current
    if (!mount) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const THREE = await import('three')
      if (disposed || !torusMountRef.current) return

      const size = Math.min(mount.clientWidth, mount.clientHeight) || 320
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(size, size)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      const COUNT = 200
      const positions = new Float32Array(COUNT * 3)
      const majorR = 1.85
      const tubeR = 0.22
      for (let i = 0; i < COUNT; i++) {
        const u = Math.random() * Math.PI * 2
        const v = Math.random() * Math.PI * 2
        positions[i * 3]     = (majorR + tubeR * Math.cos(v)) * Math.cos(u)
        positions[i * 3 + 1] = (majorR + tubeR * Math.cos(v)) * Math.sin(u)
        positions[i * 3 + 2] = tubeR * Math.sin(v)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({
        color: new THREE.Color(AMBER),
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })

      const ring = new THREE.Points(geometry, material)
      ring.rotation.x = 0.35
      scene.add(ring)

      let rafId = 0
      const animate = () => {
        ring.rotation.z += 0.0012
        renderer.render(scene, camera)
        rafId = requestAnimationFrame(animate)
      }
      rafId = requestAnimationFrame(animate)

      const onResize = () => {
        const s = Math.min(mount.clientWidth, mount.clientHeight) || 320
        renderer.setSize(s, s)
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', onResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [mounted])

  /* ── Arming-switch hover (GSAP listeners) ───────────────────────────────── */

  const handleCtaEnter = useCallback(() => {
    if (reducedMotionRef.current) return
    const cta = ctaRef.current
    if (!cta) return

    gsap.to(cta.querySelector('[data-ig="cta-face"]'), {
      backgroundColor: AMBER_HI, duration: 0.25, ease: 'power2.out',
    })
    gsap.to(cta.querySelector('[data-ig="bk-tl"]'), { x: -6, y: -6, duration: 0.3, ease: 'power3.out' })
    gsap.to(cta.querySelector('[data-ig="bk-tr"]'), { x:  6, y: -6, duration: 0.3, ease: 'power3.out' })
    gsap.to(cta.querySelector('[data-ig="bk-bl"]'), { x: -6, y:  6, duration: 0.3, ease: 'power3.out' })
    gsap.to(cta.querySelector('[data-ig="bk-br"]'), { x:  6, y:  6, duration: 0.3, ease: 'power3.out' })

    if (ctaPulseRef.current) {
      gsap.fromTo(ctaPulseRef.current,
        { scale: 0.85, opacity: 0.5 },
        { scale: 1.35, opacity: 0, duration: 0.6, ease: 'power2.out', overwrite: true },
      )
    }
  }, [])

  const handleCtaLeave = useCallback(() => {
    if (reducedMotionRef.current) return
    const cta = ctaRef.current
    if (!cta) return

    gsap.to(cta.querySelector('[data-ig="cta-face"]'), {
      backgroundColor: AMBER, duration: 0.3, ease: 'power2.out',
    })
    gsap.to(cta.querySelectorAll('[data-ig^="bk-"]'), {
      x: 0, y: 0, duration: 0.35, ease: 'power3.inOut',
    })
  }, [])

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden px-4 pb-16 pt-6 desktop:px-0 desktop:pb-20 desktop:pt-8"
    >
      {/* HUD readout — top right */}
      <div
        data-ig="hud"
        aria-hidden
        className="absolute right-0 top-0 hidden desktop:block"
      >
        <div className="relative px-4 py-3">
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-brand-cerulean/60" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-brand-cerulean/60" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-brand-cerulean/60" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-brand-cerulean/60" />
          <dl className="space-y-1 font-mono text-[10px] leading-relaxed tracking-[0.2em]">
            <div className="flex gap-3">
              <dt className="text-brand-cerulean/70">PROGRAMME</dt>
              <dd className="text-brand-ice/50">· 12-MONTH</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-cerulean/70">FUNDING</dt>
              <dd className="text-brand-ice/50">· ₹25L MAX</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-cerulean/70">EQUITY</dt>
              <dd className="text-brand-ice/50">· 1-3%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-14">
        {/* 1. Countdown manifold */}
        <div
          data-ig="countdown"
          role="timer"
          aria-label={
            countdown
              ? `Application window closes in ${countdown.d} days, ${countdown.h} hours, ${countdown.m} minutes`
              : 'Application window countdown loading'
          }
          className="flex flex-col items-center gap-3 text-center"
        >
          <div aria-hidden className="font-mono tracking-tight text-amber text-[clamp(32px,5.5vw,64px)]">
            <span className="mr-3 text-brand-ice/40">T-MINUS</span>
            {COUNTDOWN_UNITS.map(({ key, suffix }, i) => (
              <span key={key}>
                <span
                  ref={(el) => { digitRefs.current[key] = el }}
                  className="inline-block text-glow-amber tabular-nums"
                >
                  {countdown ? countdown[key] : '--'}
                  <span className="text-amber/60">{suffix}</span>
                </span>
                {i < COUNTDOWN_UNITS.length - 1 && (
                  <span className="mx-2 text-brand-ice/25 desktop:mx-3">:</span>
                )}
              </span>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-brand-cerulean/80">
            APPLICATION WINDOW · COHORT III CLOSE
          </p>
        </div>

        {/* Middle band: capacity arc + intake rail */}
        <div className="grid w-full items-center gap-14 desktop:grid-cols-[auto_1fr] desktop:gap-20">
          {/* 2. Capacity arc */}
          <div
            className="relative mx-auto h-64 w-64 desktop:h-72 desktop:w-72"
            role="img"
            aria-label={`Intake capacity: ${INTAKE_FILLED} of ${INTAKE_TOTAL} slots filled`}
          >
            {/* Three.js amber particle torus behind SVG */}
            <div
              ref={torusMountRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-70"
            />

            <svg viewBox="0 0 200 200" className="relative z-10 h-full w-full" aria-hidden>
              {Array.from({ length: INTAKE_TOTAL }, (_, i) => {
                const filled = i < INTAKE_FILLED
                return (
                  <path
                    key={i}
                    data-ig="arc-seg"
                    d={segmentPath(i)}
                    fill="none"
                    strokeWidth={9}
                    strokeLinecap="butt"
                    strokeDasharray={40}
                    strokeDashoffset={0}
                    stroke={filled ? 'rgba(212,168,83,0.9)' : 'rgba(255,255,255,0.08)'}
                    style={filled ? { filter: 'drop-shadow(0 0 6px rgba(212,168,83,0.55))' } : undefined}
                  />
                )
              })}
            </svg>

            <div
              data-ig="arc-core"
              aria-hidden
              className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            >
              <span className="font-mono leading-none text-amber text-glow-amber text-[clamp(44px,6vw,72px)]">
                {INTAKE_FILLED}
              </span>
              <span className="mt-1 font-mono text-xs tracking-[0.3em] text-brand-ice/60">
                OF {INTAKE_TOTAL}
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.35em] text-brand-cerulean/70">
                SLOTS FILLED
              </span>
            </div>
          </div>

          {/* 3. Intake rail */}
          <div role="img" aria-label="Application pipeline: APPLY stage is active" className="w-full">
            <div className="relative flex items-start justify-between">
              <div
                data-ig="rail-line"
                aria-hidden
                className="absolute left-[10%] right-[10%] top-[7px] h-px"
                style={{
                  background: 'linear-gradient(90deg, rgba(212,168,83,0.3) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              />
              {PIPELINE_STAGES.map((stage, i) => {
                const active = i === 0
                return (
                  <div key={stage} data-ig="rail-node" className="relative z-10 flex flex-col items-center gap-3">
                    <span className="relative flex h-[15px] w-[15px] items-center justify-center">
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inline-flex h-full w-full scale-150 animate-ping rounded-full bg-amber/40"
                        />
                      )}
                      <span
                        className={
                          active
                            ? 'glow-amber relative inline-block h-[11px] w-[11px] rounded-full bg-amber'
                            : 'relative inline-block h-[9px] w-[9px] rounded-full border border-brand-ice/25'
                        }
                      />
                    </span>
                    <span
                      className={
                        active
                          ? 'font-mono text-[10px] tracking-[0.25em] text-amber text-glow-amber'
                          : 'font-mono text-[10px] tracking-[0.25em] text-brand-ice/35'
                      }
                    >
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 4. Arming switch CTA */}
        <div data-ig="cta" className="relative mt-2">
          <a
            ref={ctaRef}
            href="#apply"
            aria-label="Arm application — jump to the application form"
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            onFocus={handleCtaEnter}
            onBlur={handleCtaLeave}
            className="group relative inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
          >
            <span
              ref={ctaPulseRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-sm border border-brand-cerulean/70 opacity-0"
            />
            <span data-ig="bk-tl" aria-hidden className="absolute -left-2 -top-2 h-3 w-3 border-l border-t border-brand-cerulean" />
            <span data-ig="bk-tr" aria-hidden className="absolute -right-2 -top-2 h-3 w-3 border-r border-t border-brand-cerulean" />
            <span data-ig="bk-bl" aria-hidden className="absolute -bottom-2 -left-2 h-3 w-3 border-b border-l border-brand-cerulean" />
            <span data-ig="bk-br" aria-hidden className="absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-brand-cerulean" />
            <span
              data-ig="cta-face"
              className="relative inline-flex items-center gap-3 bg-amber px-10 py-4 font-mono text-sm font-bold tracking-[0.25em] text-bg-void"
            >
              ARM APPLICATION
              <span aria-hidden className="text-base leading-none">↗</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
