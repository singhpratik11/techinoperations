import type { ComponentType } from 'react'
import type { ScreenProps } from '../motion'
import { businessCase, changes, technology, title, today, withCameras } from '../content'
import Title, { buildMs as titleMs } from './Title'
import Technology, { buildMs as technologyMs } from './Technology'
import Today, { buildMs as todayMs } from './Today'
import WithCameras, { buildMs as withCamerasMs } from './WithCameras'
import Changes, { buildMs as changesMs } from './Changes'
import BusinessCase, { buildMs as businessCaseMs } from './BusinessCase'

export type ScreenDef = {
  Component: ComponentType<ScreenProps>
  // buildMs[i] = how long build i plays; index 0 is the arrival build.
  buildMs: number[]
  steps: number
  notes: string
  dark?: boolean
}

const def = (Component: ComponentType<ScreenProps>, buildMs: number[], notes: string, dark = false): ScreenDef => ({
  Component,
  buildMs,
  steps: buildMs.length - 1,
  notes,
  dark,
})

export const screens: ScreenDef[] = [
  def(Title, titleMs, title.notes, true),
  def(Technology, technologyMs, technology.notes),
  def(Today, todayMs, today.notes),
  def(WithCameras, withCamerasMs, withCameras.notes),
  def(Changes, changesMs, changes.notes),
  def(BusinessCase, businessCaseMs, businessCase.notes),
]
