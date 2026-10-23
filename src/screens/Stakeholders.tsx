import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { stakeholders } from '../content'
import { reveal, type ScreenProps } from '../motion'

// One stakeholder per step, then the condition that holds it together.
export const buildMs = [900, 800, 800, 800, 800, 800]
const COLS = 'grid grid-cols-[240px_660px_460px]'

export default function Stakeholders({ step, instant, enter }: ScreenProps) {
  const { rows } = stakeholders
  return (
    <div className="absolute inset-0">
      <Headline text={stakeholders.headline} instant={instant} enter={enter} />
      <div className="absolute top-[262px] left-[120px] w-[1360px]">
        <motion.div {...reveal(instant, enter + 0.2)} className={`${COLS} pb-3 font-sans text-[22px] text-muted`}>
          <span />
          <span>{stakeholders.columns[0]}</span>
          <span>{stakeholders.columns[1]}</span>
        </motion.div>
        {rows.map((r, i) =>
          step > i ? (
            <motion.div
              key={r.label}
              {...reveal(instant)}
              className={`${COLS} items-center border-t border-hair py-[20px] font-sans text-[25px] leading-tight`}
            >
              <span className="font-semibold text-ink">{r.label}</span>
              <span className="pr-10 text-good">{r.gain}</span>
              <span className="text-muted">{r.condition}</span>
            </motion.div>
          ) : null,
        )}
        {step > 0 && <div className="border-t border-hair" />}
      </div>
      {step > rows.length && (
        <motion.p {...reveal(instant)} className="absolute top-[742px] left-[120px] m-0 font-serif text-[36px] text-teal italic">
          {stakeholders.closing}
        </motion.p>
      )}
      <Source text={stakeholders.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
