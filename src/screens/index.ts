import type { ComponentType } from 'react'
import type { ScreenProps } from '../motion'
import * as c from '../content'
import Title, { buildMs as titleMs } from './Title'
import Industry, { buildMs as industryMs } from './Industry'
import Technology, { buildMs as technologyMs } from './Technology'
import ValueModel, { buildMs as valueModelMs } from './ValueModel'
import Today, { buildMs as todayMs } from './Today'
import WithCameras, { buildMs as withCamerasMs } from './WithCameras'
import LittlesLaw, { buildMs as littlesLawMs } from './LittlesLaw'
import Evidence, { buildMs as evidenceMs } from './Evidence'
import People, { buildMs as peopleMs } from './People'
import Stakeholders, { buildMs as stakeholdersMs } from './Stakeholders'
import Future, { buildMs as futureMs } from './Future'
import BusinessCase, { buildMs as businessCaseMs } from './BusinessCase'
import Rollout, { buildMs as rolloutMs } from './Rollout'

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

// The story: industry and technology, the old model, the old and new process,
// what changes operationally, why, for whom, what comes next, whether it pays, how to start.
export const screens: ScreenDef[] = [
  def(Title, titleMs, c.title.notes, true),
  def(Industry, industryMs, c.industry.notes),
  def(Technology, technologyMs, c.technology.notes),
  def(ValueModel, valueModelMs, c.valueModel.notes),
  def(Today, todayMs, c.today.notes),
  def(WithCameras, withCamerasMs, c.withCameras.notes),
  def(LittlesLaw, littlesLawMs, c.littlesLaw.notes),
  def(Evidence, evidenceMs, c.evidence.notes),
  def(People, peopleMs, c.people.notes),
  def(Stakeholders, stakeholdersMs, c.stakeholders.notes),
  def(Future, futureMs, c.future.notes),
  def(BusinessCase, businessCaseMs, c.businessCase.notes),
  def(Rollout, rolloutMs, c.rollout.notes),
]
