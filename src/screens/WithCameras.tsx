import { Fragment } from 'react'
import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import TimeAxis, { AX0, BAR_H, BAR_Y, hx } from '../components/TimeAxis'
import { today, withCameras } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// 1: ghost of today's bar. 2: the 30-minute bar, and the two hours that vanish.
// 3: the loop that closes the gap. 4: the side benefits.
export const buildMs = [900, 700, 1700, 1900, 800]

export default function WithCameras({ step, instant, enter }: ScreenProps) {
  const ghostEnd = hx(today.noticedAtHours)
  const fixed = hx(withCameras.fixedAtHours)
  return (
    <div className="absolute inset-0">
      <Headline text={withCameras.headline} instant={instant} enter={enter} />
      <TimeAxis instant={instant} enter={enter + 0.2} />

      {step >= 1 && (
        <motion.div
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={tr(instant, 0.6)}
          className="absolute border-2 border-dashed border-[#AEBCC0]"
          style={{ left: AX0, top: BAR_Y, height: BAR_H, width: ghostEnd - AX0 }}
        />
      )}

      {step >= 2 && (
        <>
          <motion.div
            initial={instant ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={tr(instant, withCameras.fixedAtHours * 1.6)}
            className="absolute flex origin-left items-center justify-center bg-good font-sans text-[24px] font-semibold text-white"
            style={{ left: AX0, top: BAR_Y, height: BAR_H, width: fixed - AX0 }}
          >
            <motion.span {...reveal(instant, 0.7)}>{withCameras.barText}</motion.span>
          </motion.div>
          <motion.p
            {...reveal(instant, 1.0)}
            className="absolute m-0 flex items-center px-8 font-serif text-[25px] leading-[1.25] text-muted italic"
            style={{ left: fixed, top: BAR_Y, height: BAR_H, width: ghostEnd - fixed }}
          >
            {withCameras.ghostText}
          </motion.p>
        </>
      )}

      {step >= 3 && (
        <p className="absolute top-[586px] left-[120px] m-0 max-w-[1300px] font-sans text-[30px] leading-[1.45] text-ink">
          {withCameras.flow.map((part, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <motion.span {...reveal(instant, i * 0.6 - 0.2)} className="inline-block px-3 text-good">
                  →
                </motion.span>
              )}
              <motion.span {...reveal(instant, i * 0.6)} className="inline">
                {part}
              </motion.span>
            </Fragment>
          ))}
        </p>
      )}

      {step >= 4 && (
        <motion.p {...reveal(instant)} className="absolute top-[732px] left-[120px] m-0 max-w-[1100px] font-sans text-[22px] leading-[1.45] text-muted">
          {withCameras.aside}
        </motion.p>
      )}

      <Source text={withCameras.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
