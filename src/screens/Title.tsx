import { motion } from 'motion/react'
import Shelf from '../components/Shelf'
import { title } from '../content'
import { reveal, type ScreenProps } from '../motion'

// Rows fade in, three products sell out, then the camera boxes the gap.
const VANISH_AT = 2.0
const BOX_AT = 3.4
export const buildMs = [4800]

export default function Title({ instant, enter }: ScreenProps) {
  return (
    <div className="absolute inset-0 bg-teal">
      <div className="absolute top-[250px] left-[120px] w-[620px]">
        <motion.h1 {...reveal(instant, enter)} className="m-0 font-serif text-[112px] leading-[1.0] font-normal tracking-[-0.015em] text-white">
          {title.heading}
        </motion.h1>
        <motion.p {...reveal(instant, enter + 0.25)} className="mt-8 mb-0 font-serif text-[36px] leading-[1.25] text-sea">
          {title.subheading}
        </motion.p>
      </div>
      <motion.p {...reveal(instant, enter + 0.5)} className="absolute bottom-[34px] left-[120px] m-0 font-sans text-[20px] text-sea/80">
        {title.byline}
      </motion.p>
      <Shelf
        className="absolute top-[170px] left-[800px] w-[700px]"
        color="#9CC5B8"
        board="rgba(156,197,184,0.55)"
        instant={instant}
        enter={enter}
        vanish={[5, 6, 7]}
        vanished
        vanishDelay={enter + VANISH_AT}
        boxes={[{ row: 1, from: 5, to: 7, color: '#C94040', tag: title.tag, show: true, delay: enter + BOX_AT }]}
      />
    </div>
  )
}
