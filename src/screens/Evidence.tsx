import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { evidence } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// One mechanism per step, then our own assumption on the same scale.
export const buildMs = [1000, 1100, 1100, 1100, 1100]

const PX0 = 700
const PX1 = 1440
const MAX = 30
const px = (v: number) => PX0 + (v / MAX) * (PX1 - PX0)
const ROW_Y = [262, 372, 482, 626]
const AXIS_Y = 742

export default function Evidence({ step, instant, enter }: ScreenProps) {
  const rows = [...evidence.rows, evidence.ours]
  return (
    <div className="absolute inset-0">
      <Headline text={evidence.headline} instant={instant} enter={enter} />

      <motion.div {...reveal(instant, enter + 0.2)} className="absolute inset-0">
        {evidence.axis.map((v) => (
          <div key={v} className="absolute" style={{ left: px(v), top: 252 }}>
            <div className="w-px bg-hair" style={{ height: AXIS_Y - 252 }} />
            <div className="absolute top-full mt-3 -translate-x-1/2 font-mono text-[20px] text-muted">{v}%</div>
          </div>
        ))}
        <div className="absolute h-px bg-hair" style={{ left: 120, width: PX1 - 120, top: 604 }} />
      </motion.div>

      {rows.map((r, i) => {
        if (step <= i) return null
        const ours = i === rows.length - 1
        const color = ours ? '#0B3C49' : '#1F8A70'
        const x0 = px(r.lo)
        const w = Math.max(px(r.hi) - x0, 18)
        const labelLeft = px(r.hi) > 1150
        return (
          <div key={r.text} className="absolute" style={{ top: ROW_Y[i], left: 0, width: 1600 }}>
            <motion.div {...reveal(instant)} className="absolute w-[520px] font-sans" style={{ left: 120 }}>
              <div className={`text-[20px] ${ours ? 'font-semibold text-teal' : 'text-muted'}`}>{r.mechanism}</div>
              <div className="text-[25px] leading-snug text-ink">{r.text}</div>
            </motion.div>
            <motion.div
              initial={instant ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={tr(instant, 0.8, 0.2)}
              className="absolute origin-left rounded-full"
              style={{ left: x0 - (w === 18 ? 9 : 0), top: 36, width: w, height: 18, background: color }}
            />
            <motion.div
              {...reveal(instant, 0.8)}
              className="absolute font-mono text-[22px] font-medium whitespace-nowrap"
              style={{ top: 30, color, ...(labelLeft ? { right: 1600 - x0 + 18 } : { left: x0 + w + 16 }) }}
            >
              {r.label}
            </motion.div>
          </div>
        )
      })}
      <Source text={evidence.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
