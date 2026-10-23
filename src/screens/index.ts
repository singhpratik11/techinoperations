import type { ComponentType } from 'react'
import type { ScreenProps } from '../motion'
import * as c from '../content'
import Title, { buildMs as titleMs } from './Title'
import Technology, { buildMs as technologyMs } from './Technology'
import ValueModel, { buildMs as valueModelMs } from './ValueModel'
import Today, { buildMs as todayMs } from './Today'
import WithCameras, { buildMs as withCamerasMs } from './WithCameras'
import LittlesLaw, { buildMs as littlesLawMs } from './LittlesLaw'
import Stakeholders, { buildMs as stakeholdersMs } from './Stakeholders'
import BusinessCase, { buildMs as businessCaseMs } from './BusinessCase'
import Thanks, { buildMs as thanksMs } from './Thanks'

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

// The story: the technology, the old model, the old and new process,
// what changes operationally, for whom, and whether it pays.
export const screens: ScreenDef[] = [
  def(Title, titleMs, c.title.notes, true),
  def(Technology, technologyMs, c.technology.notes),
  def(ValueModel, valueModelMs, c.valueModel.notes),
  def(Today, todayMs, c.today.notes),
  def(WithCameras, withCamerasMs, c.withCameras.notes),
  def(LittlesLaw, littlesLawMs, c.littlesLaw.notes),
  def(Stakeholders, stakeholdersMs, c.stakeholders.notes),
  def(BusinessCase, businessCaseMs, c.businessCase.notes),
  def(Thanks, thanksMs, c.thanks.notes, true),
]
