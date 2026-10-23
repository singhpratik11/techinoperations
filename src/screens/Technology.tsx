import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Shelf from '../components/Shelf'
import Source from '../components/Source'
import { technology } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Arrival: the shelf, and the thin margin it has to protect.
// Then one detection per step, each with its paragraph.
const fmt = (n: number) => n.toLocaleString('en-IN')
export const buildMs = [2200, 1400, 1400, 1400]

export default function Technology({ step, instant, enter }: ScreenProps) {
  const { tags, paragraphs, industry } = technology
  const share = industry.profitCr / industry.revenueCr
  return (
    <div className="absolute inset-0">
      <Headline text={technology.headline} instant={instant} enter={enter} />
      <Shelf
        className="absolute top-[236px] left-[108px] w-[780px]"
        color="#5B7B83"
        board="#C9D3D6"
        instant={instant}
        enter={enter + 0.2}
        empty={[5, 6, 7]}
        low={[8, 9, 10]}
        boxes={[
          { row: 0, from: 1, to: 4, color: '#1F8A70', tag: tags.stocked, show: step >= 1 },
          { row: 1, from: 5, to: 7, color: '#C94040', tag: tags.empty, show: step >= 2 },
          { row: 2, from: 8, to: 10, color: '#E39B2D', textColor: '#1B2A2F', tag: tags.low, show: step >= 3 },
        ]}
      />
      <motion.div {...reveal(instant, enter + 0.4)} className="absolute top-[250px] left-[1000px] w-[480px] border-b border-hair pb-5 font-sans">
        <p className="m-0 text-[23px] leading-snug font-semibold text-teal">{industry.lead}</p>
        <div className="relative mt-3 h-[22px] bg-[#DCE3E5]">
          <motion.div
            initial={instant ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={tr(instant, 0.6, enter + 1.0)}
            className="absolute top-0 right-0 h-full origin-right bg-good"
            style={{ width: `${share * 100}%` }}
          />
        </div>
        <p className="mt-2 mb-0 text-[20px] leading-snug text-muted">
          {industry.caption(fmt(industry.profitCr), fmt(industry.revenueCr), `${(share * 100).toFixed(1)}%`)}
        </p>
      </motion.div>
      <div className="absolute top-[440px] left-[1000px] w-[480px]">
        {paragraphs.map((p, i) =>
          step > i ? (
            <motion.p
              key={i}
              initial={instant ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, color: step === i + 1 ? '#1B2A2F' : '#5B7B83' }}
              transition={tr(instant, 0.6, step === i + 1 ? 0.5 : 0)}
              className="mt-0 mb-5 font-sans text-[23px] leading-[1.4]"
            >
              {p}
            </motion.p>
          ) : null,
        )}
      </div>
      <Source text={technology.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
