import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { valueModel } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Arrival: four ways of making money converge on one shelf.
// 1: the shelf empties and every line turns red. 2: what that costs.
export const buildMs = [2600, 1500, 900]

const TOP = 270
const GAP = 112
const LX = 580 // where the lines leave the labels
const C = { x: 1000, y: 450 } // where they meet the shelf
const BOARD = 500
const ITEMS = [
  { x: 1022, h: 100 },
  { x: 1080, h: 120 },
  { x: 1138, h: 92 },
]

export default function ValueModel({ step, instant, enter }: ScreenProps) {
  const broken = step >= 1
  const ink = broken ? '#C94040' : '#0B3C49'
  return (
    <div className="absolute inset-0">
      <Headline text={valueModel.headline} instant={instant} enter={enter} />

      {valueModel.streams.map((s, i) => (
        <motion.div key={s.name} {...reveal(instant, enter + 0.2 + i * 0.25)} className="absolute w-[440px]" style={{ left: 120, top: TOP + i * GAP }}>
          <div className="font-sans text-[26px] font-semibold text-ink">{s.name}</div>
          <div className="font-sans text-[21px] text-muted">{s.detail}</div>
        </motion.div>
      ))}

      <svg className="absolute inset-0" viewBox="0 0 1600 900" width={1600} height={900} aria-hidden>
        {valueModel.streams.map((s, i) => {
          const y = TOP + i * GAP + 32
          return (
            <motion.path
              key={s.name}
              d={`M ${LX} ${y} C ${LX + 230} ${y}, ${C.x - 200} ${C.y}, ${C.x} ${C.y}`}
              fill="none"
              strokeWidth={3}
              initial={instant ? false : { pathLength: 0, stroke: '#0B3C49' }}
              animate={{ pathLength: 1, stroke: ink }}
              transition={tr(instant, 1.0, broken ? 0.5 : enter + 0.6 + i * 0.25)}
            />
          )
        })}
        <motion.g {...reveal(instant, enter + 1.4)}>
          {ITEMS.map((it, i) => (
            <motion.rect
              key={i}
              x={it.x}
              y={BOARD - it.h}
              width={44}
              height={it.h}
              rx={3}
              fill="#5B7B83"
              initial={false}
              animate={{ opacity: i === 1 && broken ? 0 : [0.6, 0.85, 0.5][i] }}
              transition={tr(instant, 0.5)}
            />
          ))}
          <line x1={1004} x2={1196} y1={BOARD + 3} y2={BOARD + 3} stroke="#C9D3D6" strokeWidth={5} strokeLinecap="round" />
        </motion.g>
        {broken && (
          <motion.rect
            x={1073}
            y={368}
            width={58}
            height={128}
            rx={4}
            fill="none"
            stroke="#C94040"
            strokeWidth={4}
            initial={instant ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={tr(instant, 0.7, 0.3)}
          />
        )}
      </svg>

      {step >= 2 && (
        <motion.div {...reveal(instant)} className="absolute w-[250px]" style={{ left: 1240, top: 352 }}>
          <div className="font-serif text-[104px] leading-none tracking-[-0.02em] text-bad">{valueModel.stat}</div>
          <div className="mt-3 font-sans text-[22px] leading-[1.4] text-ink">{valueModel.statText}</div>
        </motion.div>
      )}
      <Source text={valueModel.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
