/**
 * Tripartite governance hierarchy (Concept D). CoE-EA sits at centre in amber;
 * KITS, STPI, and HPE are ice funder nodes joined by thin lines. Decorative,
 * server-renderable.
 */
export function HierarchyDiagram({ className = '' }: { className?: string }) {
  const cx = 210
  const cy = 150
  const funders = [
    { x: 60, y: 60, label: 'KITS' },
    { x: 360, y: 60, label: 'STPI' },
    { x: 210, y: 250, label: 'HPE' },
  ]
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* connectors */}
      {funders.map(f => (
        <line
          key={`l-${f.label}`}
          x1={cx}
          y1={cy}
          x2={f.x}
          y2={f.y}
          stroke="rgba(183,207,232,0.18)"
          strokeWidth="1"
        />
      ))}

      {/* funder nodes (ice) */}
      {funders.map(f => (
        <g key={f.label}>
          <circle cx={f.x} cy={f.y} r="6" fill="rgba(183,207,232,0.8)" />
          <text
            x={f.x}
            y={f.y - 14}
            textAnchor="middle"
            fill="rgba(183,207,232,0.7)"
            fontFamily='"Space Mono", monospace'
            fontSize="10"
            letterSpacing="0.14em"
          >
            {f.label}
          </text>
        </g>
      ))}

      {/* centre node (amber) */}
      <circle
        cx={cx}
        cy={cy}
        r="26"
        fill="rgba(212,168,83,0.08)"
        stroke="rgba(212,168,83,0.6)"
        strokeWidth="1"
      />
      <circle cx={cx} cy={cy} r="7" fill="#d4a853" />
      <text
        x={cx}
        y={cy + 44}
        textAnchor="middle"
        fill="rgba(212,168,83,0.95)"
        fontFamily='"Space Mono", monospace'
        fontSize="11"
        letterSpacing="0.16em"
      >
        CoE-EA
      </text>
    </svg>
  )
}
