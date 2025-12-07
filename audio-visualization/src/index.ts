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
  const currentBandsValues: number[] = new Array<number>(BANDS)
  let currentAmplitude: number = 0

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
    const audioAnalysis = AudioAnalysis.get(audioEntity)

    // TODO Should be a helper
    currentAmplitude = audioAnalysis.amplitude

    currentBandsValues[0] = audioAnalysis.band0
    currentBandsValues[1] = audioAnalysis.band1
    currentBandsValues[2] = audioAnalysis.band2
    currentBandsValues[3] = audioAnalysis.band3
    currentBandsValues[4] = audioAnalysis.band4
    currentBandsValues[5] = audioAnalysis.band5
    currentBandsValues[6] = audioAnalysis.band6
    currentBandsValues[7] = audioAnalysis.band7
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
