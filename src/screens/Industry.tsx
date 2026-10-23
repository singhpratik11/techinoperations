import { motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { industry } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Arrival: revenue bar draws. 1: the profit sliver lights up. 2: what stores are missing.
export const buildMs = [2000, 1200, 900]

const X0 = 120
const W = 1360
const Y = 400
const H = 110
const fmt = (n: number) => n.toLocaleString('en-IN')

export default function Industry({ step, instant, enter }: ScreenProps) {
  const share = industry.profitCr / industry.revenueCr
  const pw = W * share
  const pct = `${(share * 100).toFixed(1)}%`
  return (
    <div className="absolute inset-0">
      <Headline text={industry.headline} instant={instant} enter={enter} />

      <motion.div {...reveal(instant, enter + 0.2)} className="absolute font-sans text-[24px] text-ink" style={{ left: X0, top: Y - 48 }}>
        {industry.revenueLabel(fmt(industry.revenueCr))} <span className="text-muted">({industry.who})</span>
      </motion.div>
      <motion.div
        initial={instant ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={tr(instant, 1.2, enter + 0.3)}
        className="absolute origin-left bg-[#DCE3E5]"
        style={{ left: X0, top: Y, width: W, height: H }}
      />
      <motion.div
        initial={false}
        animate={{ backgroundColor: step >= 1 ? '#1F8A70' : '#DCE3E5' }}
        transition={tr(instant, 0.6)}
        className="absolute"
        style={{ left: X0 + W - pw, top: Y, width: pw, height: H }}
      />
      {step >= 1 && (
        <motion.div {...reveal(instant, 0.3)} className="absolute text-right" style={{ right: 1600 - X0 - W, top: Y + H + 18 }}>
          <div className="font-serif text-[64px] leading-none text-good">{pct}</div>
          <div className="mt-2 font-sans text-[24px] text-ink">{industry.profitLabel(fmt(industry.profitCr))}</div>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.p {...reveal(instant)} className="absolute m-0 w-[760px] font-sans text-[30px] leading-[1.4] text-ink" style={{ left: X0, top: 600 }}>
          {industry.gap[0]}
          <span className="font-semibold text-teal">{industry.gap[1]}</span>
        </motion.p>
      )}
      <Source text={industry.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
