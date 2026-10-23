import { AnimatePresence, motion } from 'motion/react'
import Headline from '../components/Headline'
import Source from '../components/Source'
import { businessCase as bc } from '../content'
import { reveal, tr, type ScreenProps } from '../motion'

// Steps 1–7 build the waterfall bar by bar; step 8 brings in the rest of the argument.
export const buildMs = [900, 900, 900, 900, 900, 900, 900, 900, 900]

const round1 = (v: number) => Math.round(v * 10) / 10
const signed = (v: number) => (v > 0 ? `+${v.toFixed(1)}` : v < 0 ? `−${Math.abs(v).toFixed(1)}` : '0')

// Running totals and the net come from the step values; nothing here is typed in by hand.
export function waterfall(values: number[]) {
  let total = 0
  const bars = values.map((v, i) => {
    const from = total
    total = round1(total + v)
    return { label: bc.steps[i], value: v, lo: Math.min(from, total), hi: Math.max(from, total), after: total, kind: v < 0 ? 'cost' : 'gain' }
  })
  bars.push({ label: bc.netLabel, value: total, lo: 0, hi: total, after: total, kind: 'net' })
  return { bars, net: total }
}

const headlineNet = (net: number) => (Math.abs(net) >= 10 ? String(Math.round(net)) : net.toFixed(1))

// Chart frame, in stage px.
const CW = 940
const CH = 500
const BASE = 392
const TOP = 40
const MAX = 50 // fixed scale so switching cases shows the true difference
const SLOT = CW / 7
const BW = 84
const yv = (v: number) => BASE - (v / MAX) * (BASE - TOP)
const COLOR = { gain: '#1F8A70', cost: '#C94040', net: '#0B3C49' }

export default function BusinessCase({ step, instant, enter, scenario, setScenario }: ScreenProps) {
  const s = bc.scenarios[scenario]
  const { bars, net } = waterfall(s.values)
  const headline = bc.headline(headlineNet(net), s.payback)
  const move = tr(instant, 0.8)

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.div key={headline} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
          <Headline text={headline} instant={instant} enter={enter} />
        </motion.div>
      </AnimatePresence>

      <svg className="absolute top-[236px] left-[110px]" width={CW} height={CH} overflow="visible" aria-hidden>
        <motion.text {...reveal(instant, enter + 0.2)} x={10} y={8} fontFamily="IBM Plex Sans" fontSize={20} fill="#5B7B83">
          {bc.unit}
        </motion.text>
        <line x1={0} x2={CW} y1={BASE} y2={BASE} stroke="#C9D3D6" strokeWidth={2} />

        {bars.map((b, i) => {
          if (step <= i) return null
          const x = i * SLOT + (SLOT - BW) / 2
          const top = yv(b.hi)
          const h = Math.max(yv(b.lo) - top, 2)
          const growFrom = b.kind === 'cost' ? top : yv(b.lo)
          const [l1, ...rest] = b.label.split(' ')
          return (
            <g key={i}>
              {i > 0 && (
                <motion.line
                  x1={x - (SLOT - BW)}
                  x2={x}
                  stroke="#9FB1B6"
                  strokeWidth={2}
                  strokeDasharray="4 5"
                  initial={instant ? false : { y1: yv(bars[i - 1].after), y2: yv(bars[i - 1].after), opacity: 0 }}
                  animate={{ y1: yv(bars[i - 1].after), y2: yv(bars[i - 1].after), opacity: 1 }}
                  transition={move}
                />
              )}
              <motion.rect
                x={x}
                width={BW}
                fill={COLOR[b.kind as keyof typeof COLOR]}
                initial={instant ? false : { attrY: growFrom, height: 0 }}
                animate={{ attrY: top, height: h }}
                transition={move}
              />
              <motion.text
                x={x + BW / 2}
                textAnchor="middle"
                fontFamily="IBM Plex Mono"
                fontWeight={500}
                fontSize={22}
                fill={b.kind === 'cost' ? '#C94040' : b.kind === 'net' ? '#0B3C49' : '#1B2A2F'}
                initial={instant ? false : { attrY: top - 12, opacity: 0 }}
                animate={{ attrY: top - 12, opacity: 1 }}
                transition={tr(instant, 0.8, 0, { opacity: { delay: instant ? 0 : 0.5, duration: 0.4 } })}
              >
                {b.kind === 'net' ? b.value.toFixed(1) : signed(b.value)}
              </motion.text>
              <motion.text {...reveal(instant)} x={x + BW / 2} y={BASE + 36} textAnchor="middle" fontFamily="IBM Plex Sans" fontSize={20} fill="#1B2A2F">
                <tspan x={x + BW / 2}>{l1}</tspan>
                {rest.length > 0 && (
                  <tspan x={x + BW / 2} dy={25}>
                    {rest.join(' ')}
                  </tspan>
                )}
              </motion.text>
            </g>
          )
        })}
      </svg>

      {step >= 7 && (
        <motion.div {...reveal(instant)} className="absolute top-[742px] left-[120px] flex items-center gap-3 font-sans text-[22px]">
          {bc.order.map((k, i) => (
            <span key={k} className="flex items-center gap-3">
              {i > 0 && <span className="text-hair">·</span>}
              <button
                onClick={() => setScenario(k)}
                className={`cursor-pointer border-0 bg-transparent p-0 font-sans text-[22px] ${
                  k === scenario ? 'font-semibold text-teal' : 'text-muted hover:text-ink'
                }`}
              >
                {bc.scenarios[k].label}
              </button>
            </span>
          ))}
        </motion.div>
      )}

      <div className="absolute top-[280px] left-[1120px] w-[360px] font-sans text-[24px] leading-[1.42]">
        <motion.p {...reveal(instant, enter + 0.3)} className="mt-0 mb-8 text-ink">
          {bc.paragraphs[0]}
        </motion.p>
        {step >= 8 && (
          <>
            <motion.p {...reveal(instant)} className="mt-0 mb-8 font-semibold text-teal">
              {bc.paragraphs[1]}
            </motion.p>
            <motion.p {...reveal(instant, 0.4)} className="m-0 text-ink">
              {bc.paragraphs[2]}
            </motion.p>
          </>
        )}
      </div>

      <Source text={bc.source} instant={instant} enter={enter + 0.4} />
    </div>
  )
}
