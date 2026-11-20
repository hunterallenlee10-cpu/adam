import { MAP_H, MAP_W, countyLabels, countyPaths, mapPoints } from "@/lib/countyPaths";

// A plain outlined map of the three counties, like a surveyor's sheet.
export function CountyMap() {
  const short: Record<string, string> = { "24037": "ST. MARY'S", "24009": "CALVERT", "24017": "CHARLES" };
  return (
    <svg
      viewBox={`-10 -10 ${MAP_W + 20} ${MAP_H + 20}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="map-title map-desc"
    >
      <title id="map-title">Map of St. Mary&apos;s, Calvert and Charles Counties</title>
      <desc id="map-desc">
        Outline of the three Southern Maryland counties we serve, with our base in Great Mills and the county permit offices in Leonardtown,
        Prince Frederick and La Plata.
      </desc>
      {countyPaths.map((c) => (
        <path
          key={c.fips}
          d={c.d}
          fill={c.fips === "24037" ? "color-mix(in oklch, var(--color-primary) 14%, var(--color-surface))" : "var(--color-surface)"}
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}
      {countyPaths.map((c) => (
        <text
          key={`l-${c.fips}`}
          x={countyLabels[c.fips].x}
          y={countyLabels[c.fips].y}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="15"
          fontWeight="600"
          letterSpacing="2.5"
          fill="var(--color-muted)"
        >
          {short[c.fips]}
        </text>
      ))}
      {mapPoints.map((p) => (
        <g key={p.name}>
          {p.kind === "base" ? (
            <>
              <circle cx={p.x} cy={p.y} r="11" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y} r="3.5" fill="var(--color-ink)" />
            </>
          ) : (
            <rect x={p.x - 5} y={p.y - 5} width="10" height="10" fill="var(--color-primary)" />
          )}
          <text
            x={p.x + (p.kind === "base" ? -16 : 12)}
            y={p.y + (p.kind === "base" ? 28 : 5)}
            textAnchor={p.kind === "base" ? "end" : "start"}
            fontFamily="var(--font-sans)"
            fontSize="15"
            fontWeight={p.kind === "base" ? 700 : 500}
            fill="var(--color-ink)"
            paintOrder="stroke"
            stroke="var(--color-surface)"
            strokeWidth="4"
          >
            {p.kind === "base" ? "Great Mills (base)" : p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
