/**
 * Horizontal event timeline (Concept D). A single line with four labelled
 * event-type nodes: HACKATHON · IDEATHON · WORKSHOP · INDUSTRIAL VISIT.
 * Decorative, server-renderable.
 */
const EVENTS = ['HACKATHON', 'IDEATHON', 'WORKSHOP', 'INDUSTRIAL VISIT']
const COLS = ['#d4a853', '#00a4e4', '#b7cfe8', '#00a4e4']

export function EventTimeline({ className = '' }: { className?: string }) {
  const y = 80
  const x0 = 70
  const x1 = 690
  const step = (x1 - x0) / (EVENTS.length - 1)
  return (
    <svg
      viewBox="0 0 760 160"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="rgba(183,207,232,0.18)" strokeWidth="1" />
      {EVENTS.map((label, i) => {
        const x = x0 + step * i
        const col = COLS[i]
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="14" fill={`${col}14`} />
            <circle cx={x} cy={y} r="5" fill={col} />
            <text
              x={x}
              y={y - 26}
              textAnchor="middle"
              fill="rgba(183,207,232,0.7)"
              fontFamily='"Space Mono", monospace'
              fontSize="10"
              letterSpacing="0.12em"
            >
              {label}
            </text>
            <text
              x={x}
              y={y + 32}
              textAnchor="middle"
              fill="rgba(183,207,232,0.35)"
              fontFamily='"Space Mono", monospace'
              fontSize="8"
              letterSpacing="0.12em"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
