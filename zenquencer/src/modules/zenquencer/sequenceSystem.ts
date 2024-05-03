import { Animator, engine } from '@dcl/sdk/ecs'
import { stones } from './stones'
import { tube } from './zenquencer'

export enum PlayingMode {
  OFF,
  LOOP,
  RANDOM
}

export const LOOP_DURATION = 8 // second
export const TOTAL_DURATION = 60 // second
export const TOTAL_BEATS = 8

class PlaySequence {
  isSystemAdded: boolean = false
  // active: boolean = false
  playingMode: PlayingMode = PlayingMode.OFF
  currentBeat: number
  loopDuration: number
  durationLeft: number
  beats: number
  currentLoop: number
  beatDuration: number
  constructor(loopDuration: number, totalDuration: number, beats: number) {
    this.durationLeft = totalDuration
    this.loopDuration = loopDuration
    this.beats = beats
    this.currentLoop = 0
    this.currentBeat = 0
    this.beatDuration = this.loopDuration / this.beats
  }
}

export let sequencerConfig = new PlaySequence(8, 60, 16)

function PlaySequenceSystem(dt: number) {
  if (!sequencerConfig.playingMode) return

  sequencerConfig.durationLeft -= dt
  if (sequencerConfig.durationLeft < 0) {
    sequencerConfig.playingMode = PlayingMode.OFF
    Animator.stopAllAnimations(tube)

    deactivateSequenceSystem()
  }

  let beatDuration = sequencerConfig.loopDuration / sequencerConfig.beats

  sequencerConfig.currentLoop += dt
  if (
    sequencerConfig.currentLoop >
    (sequencerConfig.currentBeat + 1) * beatDuration
  ) {
    sequencerConfig.currentBeat += 1
    if (sequencerConfig.currentBeat >= sequencerConfig.beats) {
      sequencerConfig.currentLoop = 0
      sequencerConfig.currentBeat = 0
    }
    if (sequencerConfig.playingMode === 1) {
      // sequence mode
      console.log(stones[sequencerConfig.currentBeat])
      for (let i = 0; i < 7; i++) {
        if (stones[sequencerConfig.currentBeat][i].stoneOn) {
          // console.log('zenquencer. current beat', sequencerConfig.currentBeat, 'play stone beat:', sequencerConfig.currentBeat, 'note:', i)
          stones[sequencerConfig.currentBeat][i].play()
        }
      }
    } else {
      // random mode
      let randomBeat = Math.floor(Math.random() * sequencerConfig.beats)
      for (let i = 0; i < 7; i++) {
        if (stones[randomBeat][i]) {
          stones[randomBeat][i].play()
        }
      }
    }
  }
}

export function setupSequenceConfig(
  loopDuration: number,
  totalDuration: number,
  beats: number
) {
  sequencerConfig.durationLeft = totalDuration
  sequencerConfig.loopDuration = loopDuration
  sequencerConfig.beats = beats
  sequencerConfig.currentLoop = 0
  sequencerConfig.currentBeat = 0
  sequencerConfig.beatDuration =
    sequencerConfig.loopDuration / sequencerConfig.beats
}

export function activateSequenceSystem() {
  if (sequencerConfig.isSystemAdded) return
  sequencerConfig.isSystemAdded = true
  console.log('zenquencer. sequenceSystem. activate')
  engine.addSystem(PlaySequenceSystem)
}

export function deactivateSequenceSystem() {
  if (!sequencerConfig.isSystemAdded) return
  sequencerConfig.isSystemAdded = false
  console.log('zenquencer. sequenceSystem. deactivate')
  engine.removeSystem(PlaySequenceSystem)
}
