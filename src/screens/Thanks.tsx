import { motion } from 'motion/react'
import Shelf from '../components/Shelf'
import { thanks, title } from '../content'
import { reveal, type ScreenProps } from '../motion'

// Bookend to the title: the same gap, restocked and confirmed by the camera.
const REFILL_AT = 1.6
const BOX_AT = 2.9
export const buildMs = [4200]

export default function Thanks({ instant, enter }: ScreenProps) {
  return (
    <div className="absolute inset-0 bg-teal">
      <div className="absolute top-[300px] left-[120px] w-[620px]">
        <motion.h1 {...reveal(instant, enter)} className="m-0 font-serif text-[112px] leading-[1.0] font-normal tracking-[-0.015em] text-white">
          {thanks.heading}
        </motion.h1>
        <motion.p {...reveal(instant, enter + 0.25)} className="mt-8 mb-0 font-serif text-[36px] leading-[1.25] text-sea">
          {thanks.subheading}
        </motion.p>
      </div>
      <motion.div {...reveal(instant, enter + 0.5)} className="absolute bottom-[34px] left-[120px] font-sans">
        <p className="m-0 text-[24px] text-white">{title.team.join(', ')}</p>
        <p className="mt-2 mb-0 text-[20px] text-sea/80">{title.course}</p>
      </motion.div>
      <Shelf
        className="absolute top-[170px] left-[800px] w-[700px]"
        color="#9CC5B8"
        board="rgba(156,197,184,0.55)"
        instant={instant}
        enter={enter}
        refill={[5, 6, 7]}
        refillDelay={enter + REFILL_AT}
        boxes={[{ row: 1, from: 5, to: 7, color: '#1F8A70', tag: thanks.tag, show: true, delay: enter + BOX_AT }]}
      />
    </div>
  )
}
