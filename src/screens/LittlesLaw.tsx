import { Fragment } from 'react'
import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { littlesLaw } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Arrival: I = R × T. Then the cause first and the effect last: T, then R, then I.
export const buildMs = [1200, 900, 900, 900]
const COL_X = [120, 600, 1080]
const OPS = [{ x: 400, s: '=' }, { x: 880, s: '×' }]
const ORDER = [2, 1, 0] // T is revealed at step 1, R at 2, I at 3

export default function LittlesLaw({ step, instant, enter }: ScreenProps) {
  return (
    <div className="absolute inset-0">
      <Headline text={littlesLaw.headline} instant={instant} enter={enter} />

      {littlesLaw.terms.map((t, i) => {
        const shown = step > ORDER.indexOf(i)
        return (
          <Fragment key={t.symbol}>
            <motion.div
              {...reveal(instant, enter + 0.2)}
              className="absolute font-serif text-[150px] leading-none"
              style={{ left: COL_X[i], top: 250 }}
            >
              <motion.span initial={false} animate={{ color: shown ? '#0B3C49' : '#C9D3D6' }} transition={tr(instant, 0.5)}>
                {t.symbol}
              </motion.span>
            </motion.div>
            {shown && (
              <motion.div {...reveal(instant, 0.2)} className="absolute w-[400px] font-sans" style={{ left: COL_X[i], top: 450 }}>
                <div className="text-[22px] text-muted">{t.name}</div>
                {t.before && <div className="mt-3 text-[26px] text-muted line-through decoration-bad decoration-2">{t.before}</div>}
                <div className="mt-2 text-[30px] leading-tight font-semibold text-good">{t.after}</div>
                {t.extra && <div className="mt-3 text-[23px] leading-snug text-ink">{t.extra}</div>}
              </motion.div>
            )}
          </Fragment>
        )
      })}
      {OPS.map((o) => (
        <motion.div key={o.s} {...reveal(instant, enter + 0.2)} className="absolute font-serif text-[110px] leading-none text-hair" style={{ left: o.x, top: 270 }}>
          {o.s}
        </motion.div>
      ))}
      <Source text={littlesLaw.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
