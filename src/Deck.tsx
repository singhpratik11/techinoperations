import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { screens } from './screens'
import type { ScenarioKey } from './content'

const W = 1600
const H = 900
const PUSH = 0.7 // seconds for the screen-to-screen push

function screenFromHash() {
  const n = parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) && n >= 1 && n <= screens.length ? n - 1 : 0
}

type Pos = { screen: number; step: number; instant: boolean; settle: number; dir: number }

export default function Deck() {
  const reduced = useReducedMotion() ?? false
  const [pos, setPos] = useState<Pos>(() => ({ screen: screenFromHash(), step: 0, instant: false, settle: 0, dir: 1 }))
  const [notes, setNotes] = useState(false)
  const [scenario, setScenario] = useState<ScenarioKey>('base')
  const [scale, setScale] = useState(1)
  const buildEnds = useRef(0)
  const box = useRef<HTMLDivElement>(null)

  const instant = reduced || pos.instant

  // When a build is playing, remember when it ends so "next" can finish it first.
  useEffect(() => {
    const s = screens[pos.screen]
    if (instant) {
      buildEnds.current = 0
      return
    }
    const ms = s.buildMs[pos.step] ?? 0
    const offset = pos.step === 0 && pos.settle === 0 ? PUSH * 700 : 0
    buildEnds.current = performance.now() + offset + ms
  }, [pos.screen, pos.step, pos.settle, instant])

  const next = useCallback(() => {
    // Decide outside the state updater: updaters must stay pure.
    const building = performance.now() < buildEnds.current
    buildEnds.current = 0
    setPos((p) => {
      if (building) return { ...p, instant: true, settle: p.settle + 1 } // finish the build, stay put
      const s = screens[p.screen]
      if (p.step < s.steps) return { ...p, step: p.step + 1, instant: false }
      if (p.screen < screens.length - 1) return { screen: p.screen + 1, step: 0, instant: false, settle: 0, dir: 1 }
      return p
    })
  }, [])

  const prev = useCallback(() => {
    buildEnds.current = 0
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1, instant: true, settle: p.settle + 1 }
      if (p.screen > 0) {
        const s = p.screen - 1
        return { screen: s, step: screens[s].steps, instant: true, settle: 0, dir: -1 }
      }
      return p
    })
  }, [])

  const jump = useCallback((screen: number) => {
    buildEnds.current = 0
    setPos((p) => (p.screen === screen ? p : { screen, step: 0, instant: false, settle: 0, dir: screen > p.screen ? 1 : -1 }))
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
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen?.()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, jump])

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
                enter={pos.settle === 0 && pos.step === 0 && !instant ? PUSH * 0.7 : 0}
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
      {notes && (
        <div className="h-[30%] shrink-0 overflow-y-auto border-t border-hair bg-white px-10 py-6">
          <p className="max-w-[1100px] font-sans text-[18px] leading-[1.6] text-ink">{current.notes}</p>
        </div>
      )}
    </div>
  )
}
