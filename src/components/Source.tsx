import { motion } from 'motion/react'
import { reveal } from '../motion'

// Tiny citation line, bottom-left. The one place text drops below 20px.
export default function Source({ text, instant, enter }: { text: string; instant: boolean; enter: number }) {
  return (
    <motion.p
      {...reveal(instant, enter)}
      className="absolute bottom-[34px] left-[120px] m-0 max-w-[1150px] font-sans text-[14px] leading-snug text-muted"
    >
      {text}
    </motion.p>
  )
}
