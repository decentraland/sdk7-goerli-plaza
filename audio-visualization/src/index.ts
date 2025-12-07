import {
  PBAudioAnalysisMode,
  AudioAnalysis,
  AudioSource,
  engine,
  Entity,
  GltfContainer,
  Material,
  MeshRenderer,
  Transform,
  inputSystem,
  PointerEvents,
  InputAction,
  PointerEventType
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

import { VisualAmplitude, VisualBar } from './components'
import { createVisualBar, createVisualAmplitude } from './factory'

const BANDS: number = 8

export function main() {
  const currentAnalysis: AudioAnalysisView = { amplitude: 0, bands: new Array<number>(BANDS) }

  const audioEntity = engine.addEntity()
  AudioSource.create(audioEntity, {
    audioClipUrl: 'assets/scene/Audio/Vexento.mp3',
    playing: true,
    loop: true
  })
  AudioAnalysis.createAudioAnalysis(audioEntity)

  for (let i = 0; i < BANDS; i++) {
    createVisualBar(5, 0, i, i)
  }

  createVisualAmplitude(0, 0, 0)

  // Read
  engine.addSystem(() => AudioAnalysis.readIntoView(audioEntity, currentAnalysis))

  // Bands
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualBar, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)
      const index = VisualBar.get(entity).index

      const current = mutableTransform.position
      current.y = currentAnalysis.bands[index]
      mutableTransform.position = current
    }
  })

  // Amplitude
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualAmplitude, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)

      const value = currentAnalysis.amplitude
      mutableTransform.scale = Vector3.create(value, value, value)
    }
  })
}
