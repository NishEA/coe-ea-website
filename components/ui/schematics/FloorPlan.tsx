/**
 * Isometric floor-plan schematic for the Book hero (Concept D). Four labelled
 * zones — LAB / MEETING / DEMO SUITE / HARDWARE BAY — drawn as simple skewed
 * rectangles with mono labels. Decorative; server-renderable (no client JS).
 */
export function FloorPlan({ className = '' }: { className?: string }) {
  const zones = [
    { x: 60, y: 70, w: 150, h: 90, label: 'LAB', amber: false },
    { x: 230, y: 70, w: 120, h: 90, label: 'MEETING', amber: false },
    { x: 60, y: 180, w: 120, h: 90, label: 'HARDWARE BAY', amber: true },
    { x: 200, y: 180, w: 150, h: 90, label: 'DEMO SUITE', amber: false },
  ]
  return (
    <svg
      viewBox="0 0 420 340"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* isometric skew */}
      <g transform="translate(20 20) skewX(-12)">
        {zones.map(z => (
          <g key={z.label}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              fill={z.amber ? 'rgba(212,168,83,0.06)' : 'rgba(0,164,228,0.04)'}
              stroke={z.amber ? 'rgba(212,168,83,0.5)' : 'rgba(0,164,228,0.35)'}
              strokeWidth="1"
            />
            <text
              x={z.x + 12}
              y={z.y + 22}
              fill={z.amber ? 'rgba(212,168,83,0.9)' : 'rgba(183,207,232,0.7)'}
              fontFamily='"Space Mono", monospace'
              fontSize="9"
              letterSpacing="0.14em"
            >
              {z.label}
            </text>
          </g>
        ))}
        {/* corridor line */}
        <line
          x1="60"
          y1="170"
          x2="350"
          y2="170"
          stroke="rgba(183,207,232,0.12)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      </g>
    </svg>
  )
}
