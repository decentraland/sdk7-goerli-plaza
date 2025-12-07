import {
  PBAudioAnalysisMode,
  AudioAnalysis,
  AudioSource,
  engine,
  Entity,
  Transform,
  AudioAnalysisView
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

import { VisualAmplitude, VisualBar } from './components'
import { createVisualBar, createVisualAmplitude } from './factory'

const BANDS: number = 8

const BARS_HEIGHT: number = 8;
const AMPLITUDE_SCALE : number = 4;

export function main() {
  console.log("Init")
  const currentAnalysis: AudioAnalysisView = { amplitude: 0, bands: new Array<number>(BANDS) }

  const audioEntity = engine.addEntity()
  AudioSource.create(audioEntity, {
    audioClipUrl: 'assets/scene/Audio/Vexento.mp3',
    playing: true,
    loop: true
  })
  AudioAnalysis.createAudioAnalysis(audioEntity)
  Transform.create(audioEntity)

  for (let i = 0; i < BANDS; i++) {
    createVisualBar(5, 0, i, i)
  }

  createVisualAmplitude(0, 5, 0)

  // Read
  engine.addSystem(() => {
    AudioAnalysis.readIntoView(audioEntity, currentAnalysis)
  })

  // Bands
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualBar, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)
      const index = VisualBar.get(entity).index

      const current = mutableTransform.position
      current.y = currentAnalysis.bands[index] * BARS_HEIGHT;
      mutableTransform.position = current
    }
  })

  // Amplitude
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualAmplitude, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)

      const value = currentAnalysis.amplitude * AMPLITUDE_SCALE;
      mutableTransform.scale = Vector3.create(value, value, value)
    }
  })
}
