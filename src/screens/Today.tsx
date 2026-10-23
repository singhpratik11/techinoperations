import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import TimeAxis, { AX0, AXIS_Y, BAR_H, BAR_Y, hx } from '../components/TimeAxis'
import { today } from '../content'
import { pace, reveal, tr, type ScreenProps } from '../motion'

// 1: the empty-shelf bar grows in real proportion (1 s per hour) with a clock.
// 2: the patrol marker. 3: the phantom-stock stretch. 4: the 65%. 5: the 31% who leave.
export const buildMs = [900, 3200, 1100, 1900, 1100, 1100]
const GROW = today.noticedAtHours // seconds: 1 second per hour on the axis

const clock = (h: number) => {
  const m = Math.round(h * 60)
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`
}

export default function Today({ step, instant, enter }: ScreenProps) {
  const end = today.noticedAtHours
  const hours = useMotionValue(step >= 1 && instant ? end : 0)
  const width = useTransform(hours, (h) => hx(h) - AX0)
  const left = useTransform(hours, (h) => hx(h))
  const label = useTransform(hours, clock)

  const grown = step >= 1
  useEffect(() => {
    if (!grown) return hours.set(0)
    if (instant) return hours.set(end)
    const c = animate(hours, end, { duration: GROW * pace.factor, ease: 'linear' })
    return () => c.stop()
  }, [grown, instant, end, hours])

  const mx = hx(end)
  return (
    <div className="absolute inset-0">
      <Headline text={today.headline} instant={instant} enter={enter} />
      <TimeAxis instant={instant} enter={enter + 0.2} />

      {step >= 1 && (
        <>
          <motion.div className="absolute bg-bad" style={{ left: AX0, top: BAR_Y, height: BAR_H, width }} />
          <motion.div
            className="absolute font-mono text-[24px] font-medium text-bad tabular-nums"
            style={{ left, top: BAR_Y - 44, x: '-100%', paddingRight: 14 }}
          >
            {label}
          </motion.div>
          <motion.div
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tr(instant, 0.5, GROW - 0.4)}
            className="absolute flex items-center pl-6 font-sans text-[24px] text-white"
            style={{ left: AX0, top: BAR_Y, height: BAR_H, width: mx - AX0 }}
          >
            {today.barText}
          </motion.div>
        </>
      )}

      {step >= 3 && (
        <motion.div
          initial={instant ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={tr(instant, 1.1)}
          className="absolute origin-left border-[3px] border-dashed border-bad"
          style={{ left: mx, top: BAR_Y, height: BAR_H, width: hx(5) - mx }}
        >
          <motion.p
            {...reveal(instant, 0.9)}
            className="m-0 flex h-full items-center px-7 font-serif text-[25px] leading-[1.25] text-bad italic"
          >
            {today.phantom}
          </motion.p>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div
          initial={instant ? false : { opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(instant, 0.7)}
          className="absolute"
          style={{ left: mx, top: BAR_Y - 72 }}
        >
          <div className="absolute w-[3px] -translate-x-1/2 bg-ink" style={{ height: AXIS_Y - BAR_Y + 72 + 14 }} />
          <div className="absolute top-[-4px] left-4 font-sans text-[22px] whitespace-nowrap text-ink">{today.marker}</div>
        </motion.div>
      )}

      {step >= 4 && (
        <motion.div {...reveal(instant)} className="absolute top-[580px] left-[120px] flex items-center gap-7">
          <span className="font-serif text-[132px] leading-none tracking-[-0.02em] text-bad">{today.bigNumber}</span>
          <span className="w-[400px] font-sans text-[24px] leading-[1.4] text-ink">{today.bigNumberText}</span>
        </motion.div>
      )}
      {step >= 5 && (
        <motion.div {...reveal(instant)} className="absolute top-[580px] left-[860px] flex items-center gap-7">
          <span className="font-serif text-[132px] leading-none tracking-[-0.02em] text-bad">{today.secondNumber}</span>
          <span className="w-[340px] font-sans text-[24px] leading-[1.4] text-ink">{today.secondNumberText}</span>
        </motion.div>
      )}

      <Source text={today.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
