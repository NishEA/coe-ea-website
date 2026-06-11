'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const CERULEAN_75 = 'rgba(0, 164, 228, 0.75)'
const CERULEAN_65 = 'rgba(0, 164, 228, 0.65)'
const CERULEAN_55 = 'rgba(0, 164, 228, 0.55)'
const CERULEAN_45 = 'rgba(0, 164, 228, 0.45)'
const CERULEAN_35 = 'rgba(0, 164, 228, 0.35)'
const CERULEAN_28 = 'rgba(0, 164, 228, 0.28)'
const CERULEAN_18 = 'rgba(0, 164, 228, 0.18)'
const AMBER = '#d4a853'
const WHITE_70 = 'rgba(255, 255, 255, 0.7)'
const WHITE_55 = 'rgba(255, 255, 255, 0.55)'
const MONO = "'Space Mono', monospace"

const STAMP_OUTER_DASH = '3 2'

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function TitleBlock() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lines = svg.querySelectorAll<SVGLineElement>('line[data-draw]')
    lines.forEach((line) => {
      const x1 = Number(line.getAttribute('x1'))
      const y1 = Number(line.getAttribute('y1'))
      const x2 = Number(line.getAttribute('x2'))
      const y2 = Number(line.getAttribute('y2'))
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      line.style.strokeDasharray = String(len)
      line.style.strokeDashoffset = String(len)
    })

    const circles = svg.querySelectorAll<SVGCircleElement>('circle[data-draw]')
    circles.forEach((circle) => {
      const r = Number(circle.getAttribute('r'))
      const circumference = 2 * Math.PI * r
      circle.style.strokeDasharray = String(circumference)
      circle.style.strokeDashoffset = String(circumference)
    })

    const stamp = svg.querySelector<SVGGElement>('#stamp')
    const stampOuter = svg.querySelector<SVGCircleElement>('#stamp-outer')

    if (reduced) {
      lines.forEach((l) => {
        l.style.strokeDashoffset = '0'
      })
      circles.forEach((c) => {
        c.style.strokeDashoffset = '0'
      })
      if (stampOuter) {
        stampOuter.style.strokeDasharray = STAMP_OUTER_DASH
      }
      if (stamp) {
        stamp.style.opacity = '1'
      }
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(
        ['#centerline', '#label-kits', '#label-stpi', '#label-hpe', '#label-chamber'],
        { autoAlpha: 0 },
      )

      const tl = gsap.timeline({ delay: 0.3 })

      tl.to('#ground', { strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut' }, 0)

        .to(
          ['#plinth-l', '#plinth-c', '#plinth-r'],
          { strokeDashoffset: 0, duration: 0.2, ease: 'power1.out' },
          0.25,
        )

        .to(
          ['#pillar-l', '#pillar-l-left', '#pillar-l-right'],
          { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
          0.4,
        )
        .to(
          ['#pillar-r', '#pillar-r-left', '#pillar-r-right'],
          { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
          0.4,
        )
        .to(
          ['#pillar-c', '#pillar-c-left', '#pillar-c-right'],
          { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' },
          0.5,
        )

        .to(
          ['#cap-l', '#cap-c', '#cap-r'],
          { strokeDashoffset: 0, duration: 0.2, ease: 'power1.out' },
          0.85,
        )

        .to('#lintel-l', { strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut' }, 0.9)
        .to('#lintel-r', { strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut' }, 1.1)

        .to(
          ['#chamber-bottom', '#chamber-left'],
          { strokeDashoffset: 0, duration: 0.25, ease: 'power1.out' },
          1.1,
        )
        .to('#chamber-top', { strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' }, 1.35)
        .to('#chamber-right', { strokeDashoffset: 0, duration: 0.25, ease: 'power1.in' }, 1.6)

        .to('#pediment-l', { strokeDashoffset: 0, duration: 0.2, ease: 'power1.out' }, 1.7)
        .to('#pediment-r', { strokeDashoffset: 0, duration: 0.2, ease: 'power1.out' }, 1.78)

        .to(
          [
            '#tick-l',
            '#tick-c',
            '#tick-r',
            '#corner-tl-h',
            '#corner-tl-v',
            '#corner-tr-h',
            '#corner-tr-v',
          ],
          { strokeDashoffset: 0, duration: 0.2, ease: 'power1.out', stagger: 0.04 },
          1.9,
        )
        .to('#centerline', { autoAlpha: 1, duration: 0.3, ease: 'power1.inOut' }, 1.9)

        .to(
          ['#label-kits', '#label-stpi', '#label-hpe', '#label-chamber'],
          { autoAlpha: 1, duration: 0.3, ease: 'power1.out', stagger: 0.05 },
          2.1,
        )

        .fromTo(
          '#stamp',
          { opacity: 0, rotation: -15, svgOrigin: '460 280' },
          { opacity: 1, rotation: 0, duration: 0.3, ease: 'power2.out' },
          2.5,
        )
        .to(
          ['#stamp-outer', '#stamp-inner'],
          { strokeDashoffset: 0, duration: 0.3, ease: 'power1.out' },
          2.5,
        )
        .set('#stamp-outer', { strokeDasharray: STAMP_OUTER_DASH, strokeDashoffset: 0 }, 2.82)
    }, svg)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 540 400"
      width="100%"
      height="100%"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      {/* Centerline — architectural dot-dash through the center pillar */}
      <line
        id="centerline"
        x1="270"
        y1="20"
        x2="270"
        y2="380"
        stroke={CERULEAN_18}
        strokeWidth="1"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Layer 1 — Ground line */}
      <line
        id="ground"
        data-draw
        x1="30"
        y1="340"
        x2="510"
        y2="340"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />

      {/* Base plinths */}
      <line
        id="plinth-l"
        data-draw
        x1="90"
        y1="340"
        x2="130"
        y2="340"
        stroke={CERULEAN_55}
        strokeWidth="2.5"
        fill="none"
      />
      <line
        id="plinth-c"
        data-draw
        x1="250"
        y1="340"
        x2="290"
        y2="340"
        stroke={CERULEAN_55}
        strokeWidth="2.5"
        fill="none"
      />
      <line
        id="plinth-r"
        data-draw
        x1="410"
        y1="340"
        x2="450"
        y2="340"
        stroke={CERULEAN_55}
        strokeWidth="2.5"
        fill="none"
      />

      {/* Layer 2 — Left pillar (drawn upward: start at the base) */}
      <line
        id="pillar-l"
        data-draw
        x1="110"
        y1="340"
        x2="110"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="pillar-l-left"
        data-draw
        x1="100"
        y1="340"
        x2="100"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="pillar-l-right"
        data-draw
        x1="120"
        y1="340"
        x2="120"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />

      {/* Layer 2 — Center pillar (tallest) */}
      <line
        id="pillar-c"
        data-draw
        x1="270"
        y1="340"
        x2="270"
        y2="120"
        stroke={CERULEAN_55}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="pillar-c-left"
        data-draw
        x1="260"
        y1="340"
        x2="260"
        y2="120"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="pillar-c-right"
        data-draw
        x1="280"
        y1="340"
        x2="280"
        y2="120"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />

      {/* Layer 2 — Right pillar */}
      <line
        id="pillar-r"
        data-draw
        x1="430"
        y1="340"
        x2="430"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="pillar-r-left"
        data-draw
        x1="420"
        y1="340"
        x2="420"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="pillar-r-right"
        data-draw
        x1="440"
        y1="340"
        x2="440"
        y2="160"
        stroke={CERULEAN_55}
        strokeWidth="1"
        fill="none"
      />

      {/* Capital blocks */}
      <line
        id="cap-l"
        data-draw
        x1="95"
        y1="160"
        x2="125"
        y2="160"
        stroke={CERULEAN_45}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="cap-c"
        data-draw
        x1="255"
        y1="120"
        x2="285"
        y2="120"
        stroke={CERULEAN_45}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="cap-r"
        data-draw
        x1="415"
        y1="160"
        x2="445"
        y2="160"
        stroke={CERULEAN_45}
        strokeWidth="1"
        fill="none"
      />

      {/* Layer 3 — Lintel beam */}
      <line
        id="lintel-l"
        data-draw
        x1="110"
        y1="155"
        x2="270"
        y2="155"
        stroke={CERULEAN_55}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="lintel-r"
        data-draw
        x1="270"
        y1="155"
        x2="430"
        y2="155"
        stroke={CERULEAN_55}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Layer 4 — Governing chamber */}
      <line
        id="chamber-bottom"
        data-draw
        x1="200"
        y1="115"
        x2="340"
        y2="115"
        stroke={CERULEAN_75}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="chamber-left"
        data-draw
        x1="200"
        y1="115"
        x2="200"
        y2="60"
        stroke={CERULEAN_75}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="chamber-top"
        data-draw
        x1="200"
        y1="60"
        x2="340"
        y2="60"
        stroke={CERULEAN_75}
        strokeWidth="1.5"
        fill="none"
      />
      <line
        id="chamber-right"
        data-draw
        x1="340"
        y1="60"
        x2="340"
        y2="115"
        stroke={CERULEAN_75}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Pediment rafters */}
      <line
        id="pediment-l"
        data-draw
        x1="200"
        y1="60"
        x2="270"
        y2="30"
        stroke={CERULEAN_65}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="pediment-r"
        data-draw
        x1="340"
        y1="60"
        x2="270"
        y2="30"
        stroke={CERULEAN_65}
        strokeWidth="1"
        fill="none"
      />

      {/* Layer 5 — Dimension tick marks on the ground line */}
      <line
        id="tick-l"
        data-draw
        x1="110"
        y1="340"
        x2="110"
        y2="355"
        stroke={CERULEAN_28}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="tick-c"
        data-draw
        x1="270"
        y1="340"
        x2="270"
        y2="355"
        stroke={CERULEAN_28}
        strokeWidth="1"
        fill="none"
      />
      <line
        id="tick-r"
        data-draw
        x1="430"
        y1="340"
        x2="430"
        y2="355"
        stroke={CERULEAN_28}
        strokeWidth="1"
        fill="none"
      />

      {/* Corner angle marks on the chamber corners */}
      <line
        id="corner-tl-h"
        data-draw
        x1="194"
        y1="54"
        x2="202"
        y2="54"
        stroke={CERULEAN_35}
        strokeWidth="0.8"
        fill="none"
      />
      <line
        id="corner-tl-v"
        data-draw
        x1="194"
        y1="54"
        x2="194"
        y2="62"
        stroke={CERULEAN_35}
        strokeWidth="0.8"
        fill="none"
      />
      <line
        id="corner-tr-h"
        data-draw
        x1="346"
        y1="54"
        x2="338"
        y2="54"
        stroke={CERULEAN_35}
        strokeWidth="0.8"
        fill="none"
      />
      <line
        id="corner-tr-v"
        data-draw
        x1="346"
        y1="54"
        x2="346"
        y2="62"
        stroke={CERULEAN_35}
        strokeWidth="0.8"
        fill="none"
      />

      {/* Layer 6 — Pillar labels */}
      <text
        id="label-kits"
        x="110"
        y="370"
        textAnchor="middle"
        fill={WHITE_55}
        fontSize="9"
        fontFamily={MONO}
      >
        KITS
      </text>
      <text
        id="label-stpi"
        x="270"
        y="375"
        textAnchor="middle"
        fill={WHITE_70}
        fontSize="10"
        fontFamily={MONO}
      >
        STPI
      </text>
      <text
        id="label-hpe"
        x="430"
        y="370"
        textAnchor="middle"
        fill={WHITE_55}
        fontSize="9"
        fontFamily={MONO}
      >
        HPE
      </text>
      <text
        id="label-chamber"
        x="270"
        y="88"
        textAnchor="middle"
        fill="rgba(0, 164, 228, 0.7)"
        fontSize="8"
        fontFamily={MONO}
        letterSpacing="0.18em"
      >
        GOVERNANCE
      </text>

      {/* Layer 7 — Amber approval stamp */}
      <g id="stamp" opacity="0">
        <circle
          id="stamp-outer"
          data-draw
          cx="460"
          cy="280"
          r="38"
          stroke={AMBER}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={STAMP_OUTER_DASH}
        />
        <circle
          id="stamp-inner"
          data-draw
          cx="460"
          cy="280"
          r="30"
          stroke={AMBER}
          strokeWidth="0.8"
          fill="none"
        />
        <text
          x="460"
          y="274"
          textAnchor="middle"
          fill={AMBER}
          fontSize="7"
          fontFamily={MONO}
          letterSpacing="0.14em"
        >
          DSIR
        </text>
        <text
          x="460"
          y="284"
          textAnchor="middle"
          fill={AMBER}
          fontSize="7"
          fontFamily={MONO}
          letterSpacing="0.14em"
        >
          RECOGNISED
        </text>
        <line x1="456" y1="265" x2="464" y2="265" stroke={AMBER} strokeWidth="0.8" />
        <line x1="460" y1="261" x2="460" y2="269" stroke={AMBER} strokeWidth="0.8" />
      </g>
    </svg>
  )
}
