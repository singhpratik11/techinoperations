import { motion } from 'motion/react'
import { tr } from '../motion'

// A grocery shelf: 3 boards × 12 products, drawn in a 760-wide viewBox so 1 unit ≈ 1 stage px.
const COLS = 12
const VW = 760
const SW = VW / COLS
const BOARDS = [170, 340, 510]
const LOW_H = 34
const GAP_H = 120

const HEIGHTS = [
  [112, 96, 128, 104, 118, 90, 124, 100, 116, 94, 130, 108],
  [104, 122, 98, 116, 92, 126, 110, 120, 100, 118, 96, 114],
  [120, 100, 114, 128, 96, 110, 104, 124, 98, 116, 106, 122],
]
const TINT = [0.55, 0.8, 0.65, 1, 0.7, 0.5, 0.9, 0.6, 0.85, 0.7, 0.95, 0.6]

export type ShelfBox = {
  row: number
  from: number
  to: number
  color: string
  textColor?: string
  tag: string
  show: boolean
  delay?: number
}

type Props = {
  color: string
  board: string
  instant: boolean
  // Rows fade in one after another, starting at this delay.
  enter?: number
  empty?: number[] // middle-row slots that are bare from the start
  vanish?: number[] // middle-row slots that sell out during the build
  vanished?: boolean
  vanishDelay?: number
  refill?: number[] // middle-row slots that are restocked during the build
  refillDelay?: number
  low?: number[] // bottom-row slots running low
  boxes?: ShelfBox[]
  className?: string
}

const TAG_FONT = 22
const TAG_H = 32

function height(row: number, col: number, low: number[]) {
  return row === 2 && low.includes(col) ? LOW_H : HEIGHTS[row][col]
}

export default function Shelf({
  color,
  board,
  instant,
  enter = 0,
  empty = [],
  vanish = [],
  vanished = false,
  vanishDelay = 0,
  refill = [],
  refillDelay = 0,
  low = [],
  boxes = [],
  className,
}: Props) {
  return (
    <svg viewBox={`-12 -48 ${VW + 24} ${BOARDS[2] + 60}`} className={className} aria-hidden>
      {BOARDS.map((by, row) => (
        <motion.g
          key={row}
          initial={instant ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(instant, 0.7, enter + row * 0.45)}
        >
          {HEIGHTS[row].map((_, col) => {
            if (row === 1 && empty.includes(col)) return null
            const h = height(row, col, low)
            const gone = row === 1 && vanish.includes(col) && vanished
            const back = row === 1 && refill.includes(col)
            const tint = TINT[(col + row * 5) % COLS]
            return (
              <motion.rect
                key={col}
                x={col * SW + 5}
                y={by - h}
                width={SW - 10}
                height={h}
                rx={3}
                fill={color}
                initial={instant ? false : { opacity: back ? 0 : tint }}
                animate={{ opacity: gone ? 0 : tint }}
                transition={tr(
                  instant,
                  0.5,
                  gone ? vanishDelay + (col - vanish[0]) * 0.35 : back ? refillDelay + (col - refill[0]) * 0.35 : 0,
                )}
              />
            )
          })}
          <line x1={-12} x2={VW + 12} y1={by + 2} y2={by + 2} stroke={board} strokeWidth={5} strokeLinecap="round" />
        </motion.g>
      ))}

      {boxes.map((b, i) => {
        if (!b.show) return null
        const by = BOARDS[b.row]
        const top =
          Math.max(
            ...Array.from({ length: b.to - b.from + 1 }, (_, k) => {
              const col = b.from + k
              const bare = b.row === 1 && (empty.includes(col) || vanish.includes(col))
              return bare ? GAP_H : height(b.row, col, low)
            }),
          ) + 10
        const x = b.from * SW + 1
        const w = (b.to - b.from + 1) * SW - 2
        const y = by - top
        const tagW = b.tag.length * TAG_FONT * 0.6 + 20
        const d = b.delay ?? 0
        return (
          <g key={i}>
            <motion.rect
              x={x}
              y={y}
              width={w}
              height={top - 4}
              rx={4}
              fill="none"
              stroke={b.color}
              strokeWidth={4}
              initial={instant ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={tr(instant, 0.9, d, { opacity: { duration: 0.01, delay: d } })}
            />
            <motion.g
              initial={instant ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={tr(instant, 0.35, d + 0.8)}
            >
              <rect x={x - 2} y={y - TAG_H + 2} width={tagW} height={TAG_H} rx={3} fill={b.color} />
              <text
                x={x + 8}
                y={y - TAG_H / 2 + 3}
                dominantBaseline="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight={500}
                fontSize={TAG_FONT}
                fill={b.textColor ?? '#FFFFFF'}
              >
                {b.tag}
              </text>
            </motion.g>
          </g>
        )
      })}
    </svg>
  )
}
