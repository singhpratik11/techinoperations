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

export function tr(instant: boolean, duration: number, delay = 0, extra: Transition = {}): Transition {
  return instant ? { duration: 0 } : { duration, delay, ease, ...extra }
}

// Fade-and-settle used for text reveals.
export function reveal(instant: boolean, delay = 0) {
  return {
    initial: instant ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: tr(instant, 0.6, delay),
  } as const
}
