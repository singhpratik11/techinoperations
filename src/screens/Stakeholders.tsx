import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { stakeholders } from '../content'
import { reveal, type ScreenProps } from '../motion'

// One stakeholder per step, then what changes for staff, then the condition that holds it together.
export const buildMs = [900, 800, 800, 800, 800, 900, 800]
const COLS = 'grid grid-cols-[220px_640px_500px]'

export default function Stakeholders({ step, instant, enter }: ScreenProps) {
  const { rows } = stakeholders
  return (
    <div className="absolute inset-0">
      <Headline text={stakeholders.headline} instant={instant} enter={enter} />
      <div className="absolute top-[256px] left-[120px] w-[1360px]">
        <motion.div {...reveal(instant, enter + 0.2)} className={`${COLS} pb-2 font-sans text-[21px] text-muted`}>
          <span />
          <span>{stakeholders.columns[0]}</span>
          <span>{stakeholders.columns[1]}</span>
        </motion.div>
        {rows.map((r, i) =>
          step > i ? (
            <motion.div
              key={r.label}
              {...reveal(instant)}
              className={`${COLS} items-center border-t border-hair py-[14px] font-sans text-[23px] leading-tight`}
            >
              <span className="font-semibold text-ink">{r.label}</span>
              <span className="pr-8 text-good">{r.gain}</span>
              <span className="text-muted">{r.condition}</span>
            </motion.div>
          ) : null,
        )}
        {step > 0 && <div className="border-t border-hair" />}
        {/* In the flow under the table, so two-line rows push these down instead of overlapping them. */}
        {step > rows.length && (
          <motion.p {...reveal(instant)} className="mt-7 mb-0 w-[1300px] font-sans text-[23px] leading-[1.45] text-ink">
            {stakeholders.roles}
          </motion.p>
        )}
        {step > rows.length + 1 && (
          <motion.p {...reveal(instant)} className="mt-9 mb-0 font-serif text-[34px] text-teal italic">
            {stakeholders.closing}
          </motion.p>
        )}
      </div>
      <Source text={stakeholders.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
