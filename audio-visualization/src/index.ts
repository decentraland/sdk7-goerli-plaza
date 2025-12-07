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

const BARS_HEIGHT: number = 12;


const AMPLITUDE_VISUAL_BASE : number = 1;
const AMPLITUDE_VISUAL_SCALE : number = 10;

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

  const half = BANDS / 2
  for (let i = 0; i < BANDS; i++) {
    createVisualBar(0, 0, i + half, i)
  }

  createVisualAmplitude(5, 1, 5)

  // Read
  engine.addSystem(() => {
    AudioAnalysis.readIntoView(audioEntity, currentAnalysis)
  })

  // Bands
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualBar, Transform)
    for (const [entity, _, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)
      const index = VisualBar.get(entity).index

      const current = Vector3.One();
      current.y = currentAnalysis.bands[index] * BARS_HEIGHT;
      mutableTransform.scale = current
    }
  })

  // Amplitude
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualAmplitude, Transform)
    for (const [entity, _, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)

      const value = AMPLITUDE_VISUAL_BASE + (currentAnalysis.amplitude * AMPLITUDE_VISUAL_SCALE);
      mutableTransform.scale = Vector3.create(value, value, value)
    }
  })
}
