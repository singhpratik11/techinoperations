import { Fragment } from 'react'
import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { littlesLaw } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Arrival: I = R × T. Then the cause first and the effect last: T, then R, then I.
// 4: the evidence behind it. 5: how little of that our model assumes.
export const buildMs = [1200, 900, 900, 900, 1300, 1100]
const COL_X = [120, 600, 1080]
const OPS = [{ x: 400, s: '=' }, { x: 880, s: '×' }]
const ORDER = [2, 1, 0] // T is revealed at step 1, R at 2, I at 3

// Evidence strip, in stage px.
const PX0 = 780
const PX1 = 1440
const MAX = 30
const px = (v: number) => PX0 + (v / MAX) * (PX1 - PX0)
const ROW_Y = [606, 650, 694, 750]
const AXIS_TOP = 596
const AXIS_BOTTOM = 790

export default function LittlesLaw({ step, instant, enter }: ScreenProps) {
  const ev = littlesLaw.evidence
  const rows = [...ev.rows, ev.ours]
  return (
    <div className="absolute inset-0">
      <Headline text={littlesLaw.headline} instant={instant} enter={enter} />

      {littlesLaw.terms.map((t, i) => {
        const shown = step > ORDER.indexOf(i)
        return (
          <Fragment key={t.symbol}>
            <motion.div {...reveal(instant, enter + 0.2)} className="absolute font-serif text-[120px] leading-none" style={{ left: COL_X[i], top: 190 }}>
              <motion.span initial={false} animate={{ color: shown ? '#0B3C49' : '#C9D3D6' }} transition={tr(instant, 0.5)}>
                {t.symbol}
              </motion.span>
            </motion.div>
            {shown && (
              <motion.div {...reveal(instant, 0.2)} className="absolute w-[420px] font-sans" style={{ left: COL_X[i], top: 340 }}>
                <div className="text-[21px] text-muted">{t.name}</div>
                {t.before && <div className="mt-1 text-[24px] text-muted line-through decoration-bad decoration-2">{t.before}</div>}
                <div className="mt-1 text-[28px] leading-tight font-semibold text-good">{t.after}</div>
                {t.extra && <div className="mt-2 text-[22px] leading-snug text-ink">{t.extra}</div>}
              </motion.div>
            )}
          </Fragment>
        )
      })}
      {OPS.map((o) => (
        <motion.div key={o.s} {...reveal(instant, enter + 0.2)} className="absolute font-serif text-[90px] leading-none text-hair" style={{ left: o.x, top: 205 }}>
          {o.s}
        </motion.div>
      ))}

      {step >= 4 && (
        <motion.div {...reveal(instant)} className="absolute inset-0">
          <p className="absolute m-0 w-[1360px] border-t border-hair pt-4 font-serif text-[28px] text-teal" style={{ left: 120, top: 520 }}>
            {ev.lead}
          </p>
          {ev.axis.map((v) => (
            <div key={v} className="absolute" style={{ left: px(v), top: AXIS_TOP }}>
              <div className="w-px bg-hair" style={{ height: AXIS_BOTTOM - AXIS_TOP }} />
              <div className="absolute top-full mt-1 -translate-x-1/2 font-mono text-[20px] text-muted">{v}%</div>
            </div>
          ))}
        </motion.div>
      )}
      {rows.map((r, i) => {
        const ours = i === rows.length - 1
        if (step < (ours ? 5 : 4)) return null
        const color = ours ? '#0B3C49' : '#1F8A70'
        const x0 = px(r.lo)
        const w = Math.max(px(r.hi) - x0, 16)
        const labelLeft = px(r.hi) > 1150
        const delay = ours ? 0 : 0.2 + i * 0.25
        return (
          <div key={r.text} className="absolute" style={{ top: ROW_Y[i], left: 0, width: 1600 }}>
            {ours && <div className="absolute h-px bg-hair" style={{ left: 120, width: 1360, top: -10 }} />}
            <motion.div
              {...reveal(instant, delay)}
              className={`absolute w-[620px] font-sans text-[22px] ${ours ? 'font-semibold text-teal' : 'text-ink'}`}
              style={{ left: 120 }}
            >
              {r.text}
            </motion.div>
            <motion.div
              initial={instant ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={tr(instant, 0.7, delay + 0.2)}
              className="absolute origin-left rounded-full"
              style={{ left: x0 - (w === 16 ? 8 : 0), top: 8, width: w, height: 16, background: color }}
            />
            <motion.div
              {...reveal(instant, delay + 0.6)}
              className="absolute font-mono text-[20px] font-medium whitespace-nowrap"
              style={{ top: 2, color, ...(labelLeft ? { right: 1600 - x0 + 14 } : { left: x0 + w + 12 }) }}
            >
              {r.label}
            </motion.div>
          </div>
        )
      })}
      <Source text={littlesLaw.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
