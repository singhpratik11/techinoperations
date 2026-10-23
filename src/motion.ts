import type { Transition } from 'motion/react'
import type { ScenarioKey } from './content'

// What every screen receives from the deck.
export type ScreenProps = {
  // Builds played since the screen arrived (0 = arrival state).
  step: number
  // True when the screen must show its current step's end state at once:
  // after "next" during a build, after going back, or with reduced motion.
  instant: boolean
  // Delay before the arrival build, so it starts once the push has landed.
  enter: number
  scenario: ScenarioKey
  setScenario: (s: ScenarioKey) => void
}

export const ease = [0.37, 0, 0.63, 1] as const // sine in-out: calm, no overshoot

// Every duration and delay in the deck is multiplied by the current pace.
// Normal builds run at BASE_PACE; a fast-forward through a slide runs at FAST_PACE.
export const BASE_PACE = 0.6
export const FAST_PACE = 0.18
export const pace = { factor: BASE_PACE }

type Timed = { duration?: number; delay?: number }
function scaled<T extends Timed>(t: T, k: number): T {
  return { ...t, ...(t.duration !== undefined && { duration: t.duration * k }), ...(t.delay !== undefined && { delay: t.delay * k }) }
}

export function tr(instant: boolean, duration: number, delay = 0, extra: Transition = {}): Transition {
  if (instant) return { duration: 0 }
  const k = pace.factor
  const perProp = Object.fromEntries(
    Object.entries(extra).map(([key, v]) => [key, v && typeof v === 'object' && !Array.isArray(v) ? scaled(v as Timed, k) : v]),
  )
  return { duration: duration * k, delay: delay * k, ease, ...perProp }
}

// Fade used for text reveals. Opacity only: moving text inside the scaled stage shimmers.
export function reveal(instant: boolean, delay = 0) {
  return {
    initial: instant ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: tr(instant, 0.6, delay),
  } as const
}
