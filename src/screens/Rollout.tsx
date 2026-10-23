import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { rollout } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// 1: pilot. 2: first gate, then scale. 3: second gate, then brands. 4: the risk we design against.
export const buildMs = [900, 1100, 1500, 1500, 900]

const X0 = 120
const W = 1360
const Y = 470
const xAt = (f: number) => X0 + f * W

export default function Rollout({ step, instant, enter }: ScreenProps) {
  const [trap, ...rest] = rollout.risk.split('. ')
  return (
    <div className="absolute inset-0">
      <Headline text={rollout.headline} instant={instant} enter={enter} />
      <motion.div {...reveal(instant, enter + 0.2)} className="absolute h-[2px] bg-hair" style={{ left: X0, width: W, top: Y + 4 }} />

      {rollout.phases.map((p, i) => {
        if (step < i + 1) return null
        const left = xAt(p.from)
        const width = xAt(p.to) - left
        const delay = i === 0 ? 0 : 0.5
        return (
          <div key={p.name}>
            <motion.div
              initial={instant ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={tr(instant, 0.8, delay)}
              className="absolute h-[10px] origin-left rounded-full bg-teal"
              style={{ left, width, top: Y }}
            />
            <motion.div {...reveal(instant, delay + 0.4)} className="absolute pr-6 font-sans" style={{ left, width, top: Y + 34 }}>
              <div className="text-[26px] font-semibold text-ink">{p.name}</div>
              <div className="mt-1 text-[21px] leading-snug text-muted">{p.detail}</div>
            </motion.div>
          </div>
        )
      })}

      {rollout.gates.map((g, i) => {
        if (step < i + 2) return null
        const x = xAt(g.at)
        return (
          <motion.div key={g.question} {...reveal(instant)} className="absolute inset-0">
            <div className="absolute w-[4px] rounded-full bg-warn" style={{ left: x - 2, top: Y - 70, height: 150 }} />
            <div className="absolute w-[300px] -translate-x-1/2 text-center font-sans text-[22px] leading-snug text-ink" style={{ left: x, top: Y - 140 }}>
              {g.question}
            </div>
          </motion.div>
        )
      })}

      {step >= 4 && (
        <motion.p {...reveal(instant)} className="absolute m-0 w-[1200px] font-sans text-[26px] leading-[1.45] text-ink" style={{ left: X0, top: 680 }}>
          <span className="font-semibold text-bad">{trap}.</span> {rest.join('. ')}
        </motion.p>
      )}
      <Source text={rollout.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
