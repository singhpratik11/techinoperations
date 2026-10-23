import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { future } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// 1: the loop closes, one link at a time. 2: why it is worth selling. 3: the market waiting for it.
export const buildMs = [900, 3000, 1100, 900]

const CX = 520
const CY = 520
const R = 150
const GAP = 9 // degrees left open at each node
const rad = (d: number) => (d * Math.PI) / 180
const pt = (d: number) => [CX + R * Math.cos(rad(d)), CY + R * Math.sin(rad(d))]

function arc(from: number, to: number) {
  const [x0, y0] = pt(from)
  const [x1, y1] = pt(to)
  return `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`
}
function head(at: number) {
  // A small chevron pointing clockwise along the circle.
  const [x, y] = pt(at)
  const t = rad(at + 90)
  const n = rad(at)
  const back = (k: number, side: number) => [x - 14 * Math.cos(t) + side * 8 * Math.cos(n) * k, y - 14 * Math.sin(t) + side * 8 * Math.sin(n) * k]
  const [ax, ay] = back(1, 1)
  const [bx, by] = back(1, -1)
  return `M ${ax} ${ay} L ${x} ${y} L ${bx} ${by}`
}

// Node text sits outside the circle: above, right, below, left.
const NODE_STYLE: CSSProperties[] = [
  { left: CX - 160, width: 320, bottom: 900 - (CY - R - 18), textAlign: 'center' },
  { left: CX + R + 22, width: 240, top: CY - 30 },
  { left: CX - 170, width: 340, top: CY + R + 18, textAlign: 'center' },
  { right: 1600 - (CX - R - 22), width: 230, top: CY - 30, textAlign: 'right' },
]
const BAR_X = 1010
const BAR_W = 470

export default function Future({ step, instant, enter }: ScreenProps) {
  const max = Math.max(...future.margins.map((m) => m.value))
  return (
    <div className="absolute inset-0">
      <Headline text={future.headline} instant={instant} enter={enter} />

      <svg className="absolute inset-0" viewBox="0 0 1600 900" width={1600} height={900} aria-hidden>
        <motion.circle {...reveal(instant, enter + 0.2)} cx={CX} cy={CY} r={R} fill="none" stroke="#E4EAEC" strokeWidth={3} />
        {step >= 1 &&
          [0, 1, 2, 3].map((i) => {
            const a0 = -90 + i * 90 + GAP
            const a1 = a0 + 90 - 2 * GAP
            return (
              <g key={i}>
                <motion.path
                  d={arc(a0, a1)}
                  fill="none"
                  stroke="#1F8A70"
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={instant ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={tr(instant, 0.5, 0.3 + i * 0.6)}
                />
                <motion.path
                  d={head(a1)}
                  fill="none"
                  stroke="#1F8A70"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={instant ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={tr(instant, 0.2, 0.75 + i * 0.6)}
                />
              </g>
            )
          })}
      </svg>
      {step >= 1 &&
        future.loop.map((t, i) => (
          <motion.div
            key={t}
            {...reveal(instant, i * 0.6)}
            className={`absolute font-sans text-[23px] leading-snug ${i === 3 ? 'font-semibold text-teal' : 'text-ink'}`}
            style={NODE_STYLE[i]}
          >
            {t}
          </motion.div>
        ))}

      {step >= 2 &&
        future.margins.map((m, i) => {
          const w = (m.value / max) * BAR_W
          const top = 300 + i * 130
          const color = i === 0 ? '#1F8A70' : '#5B7B83'
          return (
            <div key={m.label} className="absolute" style={{ left: BAR_X, top }}>
              <motion.div {...reveal(instant)} className="font-sans text-[22px] text-muted">
                {m.label}
              </motion.div>
              <motion.div
                initial={instant ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={tr(instant, 0.9, 0.2)}
                className="mt-2 h-[44px] origin-left"
                style={{ width: w, background: color }}
              />
              <motion.div
                {...reveal(instant, 0.9)}
                className="absolute font-mono text-[24px] font-medium"
                style={{ top: 44, left: w > 120 ? w - 80 : w + 14, color: w > 120 ? '#FFFFFF' : color }}
              >
                ~{m.value}%
              </motion.div>
            </div>
          )
        })}
      {step >= 3 && (
        <motion.p {...reveal(instant)} className="absolute m-0 font-sans text-[26px] leading-[1.4] text-ink" style={{ left: BAR_X, top: 580, width: BAR_W }}>
          {future.india}
        </motion.p>
      )}
      <Source text={future.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
