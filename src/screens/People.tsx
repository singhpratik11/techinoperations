import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { people } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// A line from automated to augmented. Roles land on it: the auditor, the merchandiser,
// then the three floor roles together, then the proof that it pays people too.
export const buildMs = [1000, 900, 900, 1100, 900]

const LX0 = 360
const LX1 = 1260
const LY = 520
const LABEL_TOP = { up: 400, upFar: 290, down: 562 }
const stepFor = (i: number) => (i < 2 ? i + 1 : 3)

export default function People({ step, instant, enter }: ScreenProps) {
  const [auto, aug] = people.ends
  return (
    <div className="absolute inset-0">
      <Headline text={people.headline} instant={instant} enter={enter} />

      <motion.div {...reveal(instant, enter + 0.2)} className="absolute inset-0">
        <div className="absolute h-[3px] bg-ink" style={{ left: LX0, width: LX1 - LX0, top: LY - 1 }} />
        <div className="absolute w-[220px] text-right font-sans" style={{ left: LX0 - 240, top: LY - 30 }}>
          <div className="text-[26px] font-semibold text-muted">{auto.name}</div>
          <div className="text-[20px] text-muted">{auto.detail}</div>
        </div>
        <div className="absolute w-[220px] font-sans" style={{ left: LX1 + 20, top: LY - 30 }}>
          <div className="text-[26px] font-semibold text-good">{aug.name}</div>
          <div className="text-[20px] text-muted">{aug.detail}</div>
        </div>
      </motion.div>

      {people.roles.map((r, i) => {
        if (step < stepFor(i)) return null
        const x = LX0 + r.at * (LX1 - LX0)
        const top = LABEL_TOP[r.tier]
        const down = r.tier === 'down'
        const color = r.at < 0.3 ? '#5B7B83' : '#1F8A70'
        const alignRight = r.at > 0.95
        const delay = i > 2 ? (i - 2) * 0.25 : 0
        return (
          <motion.div key={r.name} className="absolute inset-0" {...reveal(instant, delay)}>
            <div
              className="absolute w-[2px]"
              style={{ left: x - 1, background: color, top: down ? LY : top + 66, height: down ? top - LY - 6 : LY - top - 66 }}
            />
            <motion.div
              initial={instant ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={tr(instant, 0.4, delay)}
              className="absolute h-5 w-5 rounded-full"
              style={{ left: x - 10, top: LY - 10, background: color }}
            />
            <div
              className="absolute w-[270px] font-sans"
              style={{ top, ...(alignRight ? { right: 1600 - x - 14, textAlign: 'right' } : { left: x - 14 }) }}
            >
              <div className="text-[24px] font-semibold text-ink">{r.name}</div>
              <div className="text-[20px] leading-snug text-muted">{r.detail}</div>
            </div>
          </motion.div>
        )
      })}

      {step >= 4 && (
        <motion.p {...reveal(instant)} className="absolute m-0 w-[1200px] font-serif text-[30px] leading-[1.35] text-teal italic" style={{ left: 120, top: 700 }}>
          {people.proof}
        </motion.p>
      )}
      <Source text={people.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
