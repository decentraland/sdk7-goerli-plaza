// We define the empty imports so the auto-complete feature works as expected.
import {} from '@dcl/sdk/math'
import {
  PBAudioAnalysisMode,
  AudioAnalysis,
  AudioSource,
  engine,
  Entity,
  GltfContainer,
  Material,
  MeshRenderer,
  Transform
} from '@dcl/sdk/ecs'

import { VisualAmplitude, VisualBar } from './components'
import { createVisualBar, createVisualAmplitude } from './factory'

import { inputSystem, PointerEvents, InputAction, PointerEventType } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

const BANDS: number = 8

export function main() {
  const currentBandsValues: number[] = new Array<number>(BANDS)
  const currentAmplitude: number = 0

  const audioEntity = engine.addEntity()
  AudioSource.create(audioEntity, {
    audioClipUrl: 'assets/scene/Audio/Vexento.mp3',
    playing: true,
    loop: true
  })
  /* TODO helper function
  AudioAnalysis.create(audioEntity, {
    mode: PBAudioAnalysisMode.MODE_LOGARITHMIC,
    amplitude: 0,
    band
  });
  */

  for (let i = 0; i < BANDS; i++) {
    createVisualBar(5, 0, i, i)
  }

  createVisualAmplitude(0, 0, 0)

  // Read

  engine.addSystem(() => {
    // TODO
  })

  // Bands
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualBar, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)
      const index = VisualBar.get(entity).index

      const current = mutableTransform.position
      current.y = currentBandsValues[index]
      mutableTransform.position = current
    }
  })

  // Amplitude
  engine.addSystem(() => {
    const entities = engine.getEntitiesWith(VisualAmplitude, Transform)
    for (const [entity, _spinner, _transform] of entities) {
      const mutableTransform = Transform.getMutable(entity)

      mutableTransform.scale = Vector3.create(currentAmplitude, currentAmplitude, currentAmplitude)
    }
  })
}
