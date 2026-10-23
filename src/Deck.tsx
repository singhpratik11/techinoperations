import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { screens } from './screens'
import type { ScenarioKey } from './content'
import { BASE_PACE, FAST_PACE, pace } from './motion'

const W = 1600
const H = 900
const PUSH = 0.5 // seconds for the screen-to-screen push

function screenFromHash() {
  const n = parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) && n >= 1 && n <= screens.length ? n - 1 : 0
}

// fast: the rest of this screen's builds are being run through at FAST_PACE.
type Pos = { screen: number; step: number; instant: boolean; settle: number; dir: number; fast: boolean }

export default function Deck() {
  const reduced = useReducedMotion() ?? false
  const [pos, setPos] = useState<Pos>(() => ({ screen: screenFromHash(), step: 0, instant: false, settle: 0, dir: 1, fast: false }))
  const [notes, setNotes] = useState(false)
  const [scenario, setScenario] = useState<ScenarioKey>('base')
  const [scale, setScale] = useState(1)
  const [presenting, setPresenting] = useState(false)
  const buildEnds = useRef(0)
  const box = useRef<HTMLDivElement>(null)

  const instant = reduced || pos.instant
  // Read by every transition during this render (see motion.ts).
  pace.factor = pos.fast ? FAST_PACE : BASE_PACE
  const arriving = pos.settle === 0 && pos.step === 0 && !instant

  // When a build is playing, remember when it ends so "next" knows to hurry it along.
  useEffect(() => {
    const s = screens[pos.screen]
    if (instant) {
      buildEnds.current = 0
      return
    }
    const ms = (s.buildMs[pos.step] ?? 0) * (pos.fast ? FAST_PACE : BASE_PACE)
    const offset = pos.step === 0 && pos.settle === 0 ? PUSH * 700 : 0
    buildEnds.current = performance.now() + offset + ms
  }, [pos.screen, pos.step, pos.settle, pos.fast, instant])

  // Fast-forward: play each remaining build quickly, one after another, to the end of the screen.
  useEffect(() => {
    if (!pos.fast || instant || pos.step >= screens[pos.screen].steps) return
    const wait = Math.max(140, (screens[pos.screen].buildMs[pos.step] ?? 0) * FAST_PACE)
    const t = setTimeout(() => setPos((p) => (p.fast ? { ...p, step: p.step + 1 } : p)), wait)
    return () => clearTimeout(t)
  }, [pos.fast, pos.step, pos.screen, pos.settle, instant])

  const next = useCallback(() => {
    // Decide outside the state updater: updaters must stay pure.
    const building = performance.now() < buildEnds.current
    buildEnds.current = 0
    setPos((p) => {
      const s = screens[p.screen]
      // A third press while fast-forwarding: show the end of the screen at once.
      if (p.fast && (building || p.step < s.steps)) return { ...p, step: s.steps, instant: true, settle: p.settle + 1, fast: false }
      // A second press while a build plays: run through the rest of the screen quickly.
      if (building) return { ...p, instant: false, settle: p.settle + 1, fast: true }
      if (p.step < s.steps) return { ...p, step: p.step + 1, instant: false, fast: false }
      if (p.screen < screens.length - 1) return { screen: p.screen + 1, step: 0, instant: false, settle: 0, dir: 1, fast: false }
      return { ...p, fast: false }
    })
  }, [])

  const prev = useCallback(() => {
    buildEnds.current = 0
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1, instant: true, settle: p.settle + 1, fast: false }
      if (p.screen > 0) {
        const s = p.screen - 1
        return { screen: s, step: screens[s].steps, instant: true, settle: 0, dir: -1, fast: false }
      }
      return p
    })
  }, [])

  const jump = useCallback((screen: number) => {
    buildEnds.current = 0
    setPos((p) => (p.screen === screen ? p : { screen, step: 0, instant: false, settle: 0, dir: screen > p.screen ? 1 : -1, fast: false }))
  }, [])

  // Presentation mode: fullscreen with the control bar hidden. Esc (or F) leaves it.
  const togglePresenting = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }
    setPresenting((on) => {
      if (!on) document.documentElement.requestFullscreen?.().catch(() => {})
      return !on
    })
  }, [])
  useEffect(() => {
    const onFs = () => setPresenting(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          jump(0)
          break
        case 'End':
          jump(screens.length - 1)
          break
        case 'n':
        case 'N':
          setNotes((v) => !v)
          break
        case 'f':
        case 'F':
          togglePresenting()
          break
        case 'Escape':
          setPresenting(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, jump, togglePresenting])

  // Keep the URL hash in step with the screen, and follow manual hash edits.
  useEffect(() => {
    const want = `#${pos.screen + 1}`
    if (window.location.hash !== want) history.replaceState(null, '', want)
  }, [pos.screen])
  useEffect(() => {
    const onHash = () => jump(screenFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [jump])

  // Fit the 1600×900 stage into whatever space is left above the notes drawer.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / H))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const current = screens[pos.screen]
  const Screen = current.Component
  const dark = current.dark

  return (
    <div className="flex h-full flex-col">
      <div ref={box} className="relative min-h-0 flex-1 overflow-hidden">
        <div
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('button')) return
            next()
          }}
          className="absolute top-1/2 left-1/2 overflow-hidden bg-white"
          style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <AnimatePresence initial={false} custom={pos.dir}>
            <motion.div
              key={pos.screen}
              custom={pos.dir}
              variants={{
                in: (d: number) => ({ x: reduced ? 0 : d * W }),
                at: { x: 0 },
                out: (d: number) => ({ x: reduced ? 0 : -d * W }),
              }}
              initial="in"
              animate="at"
              exit="out"
              transition={{ duration: reduced ? 0 : PUSH, ease: [0.37, 0, 0.63, 1] }}
              className="absolute inset-0"
            >
              <Screen
                key={pos.settle}
                step={pos.step}
                instant={instant}
                enter={arriving ? (PUSH * 0.7) / BASE_PACE : 0}
                scenario={scenario}
                setScenario={setScenario}
              />
            </motion.div>
          </AnimatePresence>
          <div
            className="pointer-events-none absolute right-12 bottom-8 font-sans text-[18px] tabular-nums"
            style={{ color: dark ? 'rgba(156,197,184,0.7)' : '#5B7B83' }}
          >
            {pos.screen + 1} / {screens.length}
          </div>
        </div>
      </div>
      {!presenting && (
        <Controls
          canBack={pos.screen > 0 || pos.step > 0}
          canNext={pos.screen < screens.length - 1 || pos.step < current.steps}
          atStart={pos.screen === 0}
          atEnd={pos.screen === screens.length - 1}
          onPrev={prev}
          onNext={next}
          onTop={() => jump(0)}
          onEnd={() => jump(screens.length - 1)}
          onPresent={togglePresenting}
        />
      )}
      {notes && (
        <div className="h-[30%] shrink-0 overflow-y-auto border-t border-hair bg-white px-10 py-6">
          <p className="max-w-[1100px] font-sans text-[18px] leading-[1.6] text-ink">{current.notes}</p>
        </div>
      )}
    </div>
  )
}

type ControlsProps = {
  canBack: boolean
  canNext: boolean
  atStart: boolean
  atEnd: boolean
  onPrev: () => void
  onNext: () => void
  onTop: () => void
  onEnd: () => void
  onPresent: () => void
}

function Controls({ canBack, canNext, atStart, atEnd, onPrev, onNext, onTop, onEnd, onPresent }: ControlsProps) {
  const buttons = [
    { label: 'Jump to top', onClick: onTop, disabled: atStart },
    { label: '← Previous slide', onClick: onPrev, disabled: !canBack },
    { label: 'Next slide →', onClick: onNext, disabled: !canNext, primary: true },
    { label: 'Jump to end', onClick: onEnd, disabled: atEnd },
    { label: 'Presentation mode', onClick: onPresent },
  ]
  return (
    <div className="flex h-14 shrink-0 items-center justify-center gap-2 border-t border-hair bg-white px-4">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          disabled={b.disabled}
          // Keep focus off the button so Space and arrows stay deck keys, never a second click.
          onMouseDown={(e) => e.preventDefault()}
          onClick={b.onClick}
          className={`cursor-pointer rounded-md border px-3.5 py-1.5 font-sans text-[14px] transition-colors disabled:cursor-default disabled:opacity-35 ${
            b.primary
              ? 'border-teal bg-teal text-white enabled:hover:bg-[#0E4D5D]'
              : 'border-hair bg-white text-ink enabled:hover:bg-[#F2F5F6]'
          }`}
        >
          {b.label}
        </button>
      ))}
    </div>
  )
}
