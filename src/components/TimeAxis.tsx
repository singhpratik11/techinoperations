import { motion } from 'motion/react'
import { timeAxis } from '../content'
import { tr } from '../motion'

// One clock for screens 3 and 4: same position, same scale, so the two bars compare by eye.
export const AX0 = 120
export const AX1 = 1480
export const BAR_Y = 340
export const BAR_H = 112
export const AXIS_Y = BAR_Y + BAR_H + 14

export const hx = (hours: number) => AX0 + (hours / timeAxis.hours) * (AX1 - AX0)

export default function TimeAxis({ instant, enter }: { instant: boolean; enter: number }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={instant ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={tr(instant, 0.6, enter)}
    >
      <div className="absolute h-[2px] bg-ink" style={{ left: AX0, width: AX1 - AX0, top: AXIS_Y }} />
      {timeAxis.ticks.map((label, i) => (
        <div key={label} className="absolute" style={{ left: hx(i), top: AXIS_Y }}>
          <div className="h-3 w-[2px] -translate-x-1/2 bg-ink" />
          <div
            className={`absolute top-6 font-sans text-[20px] whitespace-nowrap text-muted ${
              i === 0 ? 'left-0 -translate-x-[1px]' : '-translate-x-1/2'
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
