import { motion } from 'motion/react'
import Headline from '../components/Headline'
import { changes } from '../content'
import { reveal, type ScreenProps } from '../motion'

// One row per step, then the condition that holds it together.
export const buildMs = [900, 800, 800, 800, 800, 800, 800]
const COLS = 'grid grid-cols-[400px_480px_480px]'

export default function Changes({ step, instant, enter }: ScreenProps) {
  const { rows } = changes
  return (
    <div className="absolute inset-0">
      <Headline text={changes.headline} instant={instant} enter={enter} />
      <div className="absolute top-[270px] left-[120px] w-[1360px]">
        <motion.div {...reveal(instant, enter + 0.2)} className={`${COLS} pb-3 font-sans text-[22px] text-muted`}>
          <span />
          <span>{changes.columns[0]}</span>
          <span>{changes.columns[1]}</span>
        </motion.div>
        {rows.map((r, i) =>
          step > i ? (
            <motion.div
              key={r.label}
              {...reveal(instant)}
              className={`${COLS} items-center border-t border-hair py-[22px] font-sans text-[26px] leading-tight`}
            >
              <span className="text-ink">{r.label}</span>
              <span className="text-muted">{r.today}</span>
              <span className="font-semibold text-good">{r.after}</span>
            </motion.div>
          ) : null,
        )}
        {step > 0 && <div className="border-t border-hair" />}
      </div>
      {step > rows.length && (
        <motion.p {...reveal(instant)} className="absolute top-[740px] left-[120px] m-0 font-serif text-[36px] text-teal italic">
          {changes.closing}
        </motion.p>
      )}
    </div>
  )
}
