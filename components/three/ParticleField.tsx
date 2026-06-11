'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────
 * ParticleField — cinematic three.js telemetry field for the hero.
 *
 * ~8000 points (2000 on mobile) in an asymmetric, tilted torus cloud.
 * Three populations encoded on the `aType` attribute:
 *   0 (85%) — ice-blue ambient field, alpha 0.25–0.35
 *   1 (13%) — cerulean telemetry pings, pulsing alpha
 *   2 ( 2%) — amber anomalies, brighter, random-walk drift, soft halo
 *
 * Pure three.js (no R3F). Self-contained: geometry, shaders, render
 * loop, cursor interaction, cleanup all live here.
 * ──────────────────────────────────────────────────────────────── */

const COUNT_DESKTOP = 8000
const COUNT_MOBILE = 2000
const MOBILE_BREAKPOINT = 768
const MAX_DPR = 1.5

const TORUS_MAJOR = 4
const TORUS_MINOR = 2

const REPEL_RADIUS = 0.25
const REPEL_STRENGTH = 0.02

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uCursor;
  uniform float uSizeScale;

  attribute float aType;
  attribute float aSeed;
  attribute float aSize;

  varying float vType;
  varying float vSeed;

  void main() {
    vType = aType;
    vSeed = aSeed;

    vec3 pos = position;

    // Cursor repulsion — stateless spring approximation: particles
    // inside the repel radius are pushed away; once the cursor moves
    // on they snap back because the displacement is recomputed from
    // the undisturbed position every frame.
    vec2 toCursor = pos.xy - uCursor;
    float cursorDist = length(toCursor);
    if (cursorDist < ${REPEL_RADIUS.toFixed(2)} && cursorDist > 0.0001) {
      pos.xy += normalize(toCursor)
        * ${REPEL_STRENGTH.toFixed(2)}
        * (1.0 - cursorDist / ${REPEL_RADIUS.toFixed(2)});
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation by depth.
    gl_PointSize = aSize * uSizeScale * (300.0 / length(mvPosition.xyz));

    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;

  varying float vType;
  varying float vSeed;

  // Brand palette.
  const vec3 ICE = vec3(0.718, 0.812, 0.910);     // #b7cfe8
  const vec3 CERULEAN = vec3(0.0, 0.643, 0.894);  // #00a4e4
  const vec3 AMBER = vec3(0.831, 0.659, 0.325);   // #d4a853

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;

    float core = smoothstep(0.5, 0.12, r);
    vec3 col;
    float alpha;

    if (vType < 0.5) {
      // Type 0 — ice-blue ambient field.
      col = ICE;
      alpha = (0.25 + 0.10 * vSeed) * core;
    } else if (vType < 1.5) {
      // Type 1 — cerulean pings, pulsing alpha.
      col = CERULEAN;
      float pulse = 0.5 + 0.5 * sin(uTime + vSeed * 12.566);
      alpha = (0.18 + 0.42 * pulse) * core;
    } else {
      // Type 2 — amber anomaly: hot core + soft halo ring.
      float hot = smoothstep(0.22, 0.0, r);
      float halo = smoothstep(0.5, 0.0, r) * 0.35;
      col = mix(AMBER, vec3(1.0, 0.92, 0.75), hot * 0.6);
      alpha = 0.75 * hot + halo;
    }

    gl_FragColor = vec4(col, alpha);
  }
`

interface ParticleUniforms {
  uTime: { value: number }
  uCursor: { value: THREE.Vector2 }
  uSizeScale: { value: number }
  [uniform: string]: THREE.IUniform
}

/**
 * Build the asymmetric torus-field distribution. The torus is
 * vertically squashed, has a thickness lobe that varies around the
 * ring (thicker on one side), sparse outliers, and a baked-in tilt so
 * the cloud reads as organic telemetry rather than a geometric donut.
 */
function buildPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const tilt = new THREE.Matrix4().makeRotationFromEuler(
    new THREE.Euler(-0.5, 0.32, 0.12),
  )
  const v = new THREE.Vector3()

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI * 2

    // Asymmetric tube thickness — one side of the ring is denser/fatter.
    const lobe = 0.55 + 0.45 * Math.sin(theta + 1.2)
    const minor = Math.sqrt(Math.random()) * TORUS_MINOR * lobe
    const major = TORUS_MAJOR + (Math.random() - 0.5) * 1.1
    const ring = major + minor * Math.cos(phi)

    v.set(
      ring * Math.cos(theta),
      ring * Math.sin(theta) * 0.82,
      minor * Math.sin(phi) * 1.25,
    )

    // Sparse outliers loosen the silhouette.
    if (Math.random() < 0.07) v.multiplyScalar(1 + Math.random() * 0.35)

    v.applyMatrix4(tilt)

    positions[i * 3] = v.x + 0.3
    positions[i * 3 + 1] = v.y
    positions[i * 3 + 2] = v.z
  }

  return positions
}

export function ParticleField({
  animate,
  className,
}: {
  animate: boolean
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animateRef = useRef(animate)

  useEffect(() => {
    animateRef.current = animate
  }, [animate])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const count =
      window.innerWidth < MOBILE_BREAKPOINT ? COUNT_MOBILE : COUNT_DESKTOP

    /* ── Renderer ── */
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
    } catch {
      // WebGL unavailable (old hardware, jsdom) — leave the container empty.
      return
    }
    const dpr = Math.min(window.devicePixelRatio, MAX_DPR)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    // Drive frames manually with rAF rather than the built-in loop.
    renderer.setAnimationLoop(null)
    const canvas = renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    /* ── Scene + camera ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60)
    camera.position.set(0, 0, 9)
    camera.lookAt(0, 0, 0)

    /* ── Geometry ── */
    const positions = buildPositions(count)
    const types = new Float32Array(count)
    const seeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    // Population split: 2% amber, 13% cerulean, 85% ice. Amber indices
    // come first so the random-walk pass below can iterate just them
    // (spatial placement is independent of index order).
    const amberCount = Math.max(1, Math.round(count * 0.02))
    const ceruleanCount = Math.round(count * 0.13)

    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random()
      if (i < amberCount) {
        types[i] = 2
        sizes[i] = 2.0 + Math.random() * 1.5
      } else if (i < amberCount + ceruleanCount) {
        types[i] = 1
        sizes[i] = 1.5 + Math.random() * 1.0
      } else {
        types[i] = 0
        sizes[i] = 1.2 + Math.random() * 0.8
      }
    }

    const geometry = new THREE.BufferGeometry()
    const positionAttr = new THREE.BufferAttribute(positions, 3)
    geometry.setAttribute('position', positionAttr)
    geometry.setAttribute('aType', new THREE.BufferAttribute(types, 1))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    /* ── Material ── */
    const uniforms: ParticleUniforms = {
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(9999, 9999) },
      // 300/depth attenuation is large at this camera distance; the
      // scale factor normalises point sizes back to the 2–9 px range
      // (in physical pixels, hence the DPR multiplier).
      uSizeScale: { value: 0.08 * dpr },
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    /* ── Resize ── */
    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (reducedMotion) renderer.render(scene, camera)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    /* ── Cursor tracking — NDC ray projected onto the field plane ── */
    const ndc = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    const fieldPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const hit = new THREE.Vector3()

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      )
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(fieldPlane, hit)) {
        uniforms.uCursor.value.set(hit.x, hit.y)
      }
    }
    const onMouseLeave = () => {
      uniforms.uCursor.value.set(9999, 9999)
    }

    if (!reducedMotion) {
      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseleave', onMouseLeave)
    }

    /* ── Amber random-walk state ── */
    const amberVel = new Float32Array(amberCount * 3)

    /* ── Render loop ── */
    const clock = new THREE.Clock()
    let simTime = 0
    let rafId = 0

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const delta = clock.getDelta()

      if (animateRef.current) {
        simTime += delta
        uniforms.uTime.value = simTime

        // Frame-rate-independent step (normalised to 60 fps).
        const step = Math.min(delta, 0.05) * 60

        // Curl-noise-inspired drift, accumulated into the position
        // buffer so the field genuinely wanders rather than wobbling.
        for (let i = 0; i < count; i++) {
          const ix = i * 3
          const x = positions[ix]
          const y = positions[ix + 1]
          positions[ix] += Math.sin(y * 0.3 + simTime * 0.2) * 0.003 * step
          positions[ix + 1] += Math.cos(x * 0.3 + simTime * 0.15) * 0.003 * step
        }

        // Amber anomalies get an extra damped random walk.
        for (let i = 0; i < amberCount; i++) {
          const ix = i * 3
          for (let a = 0; a < 3; a++) {
            amberVel[ix + a] += (Math.random() - 0.5) * 0.0006 * step
            amberVel[ix + a] *= 0.985
            positions[ix + a] += amberVel[ix + a] * step
          }
        }

        positionAttr.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    if (reducedMotion) {
      // Frozen field: render a single static frame (plus re-renders on
      // resize); no rAF loop, no cursor interaction.
      renderer.render(scene, camera)
    } else {
      rafId = requestAnimationFrame(tick)
    }

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      scene.remove(points)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (canvas.parentNode === container) container.removeChild(canvas)
    }
    // Mount-once: `animate` is read through animateRef inside the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} aria-hidden="true" className={className} />
}
