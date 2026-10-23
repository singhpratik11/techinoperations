import { motion } from 'motion/react'
import { reveal } from '../motion'

export default function Headline({ text, instant, enter, width = 1300 }: { text: string; instant: boolean; enter: number; width?: number }) {
  return (
    <motion.h1
      {...reveal(instant, enter)}
      className="absolute top-[72px] left-[120px] m-0 font-serif text-[56px] leading-[1.12] font-normal tracking-[-0.01em] text-balance text-teal"
      style={{ maxWidth: width }}
    >
      {text}
    </motion.h1>
  )
}
