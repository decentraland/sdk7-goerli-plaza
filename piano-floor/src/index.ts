import { ColliderLayer, engine, GltfContainer, MeshCollider, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { BlackPianoKey, WhitePianoKey } from './pianoKey'
import resources from './resources'
import { AudioController } from './audioController'
import { setupUi } from './ui'

export function main() {
  const notes = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']

  // Base scene
  const baseScene = engine.addEntity()
  GltfContainer.create(baseScene, {
    src: resources.models.baseSceneModel,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  // For transforming the piano
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  })

  // White keys
  const whiteKeySounds: string[] = [
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4,
    resources.sounds.whiteKeys.c4
  ]

  let whiteKeyXPos = -5.55
  const audioController = new AudioController()
  const transpose = -4 // transpose in semitones
  const n = [0, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16]

  function createWhiteKeys() {
    for (let i = 0; i < whiteKeySounds.length; i++) {
      new WhitePianoKey(
        Vector3.create(whiteKeyXPos, 0.11, 0),
        Vector3.create(0.7, 4, 0.5),
        whiteKeySounds[i],
        i,
        Math.pow(2, (n[i] + transpose) / 12),
        scene
      )
      audioController.createAudioEntity(`whiteKeys.${notes[i]}`, false)
      whiteKeyXPos += 0.8
    }
  }

  // Black keys
  const blackKeySounds: string[] = [
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3,
    resources.sounds.blackKeys.aSharp3
  ]

  let blackKeyXPos = -5.15
  let skipKey = 1

  function createBlackKeys() {
    for (let i = 0; i < blackKeySounds.length; i++) {
      new BlackPianoKey(
        Vector3.create(blackKeyXPos, 0.12, 1.1),
        Vector3.create(0.5, 1.8, 10),
        blackKeySounds[i],
        i,
        Math.pow(2, (n[i] + transpose) / 12),
        scene
      )
      audioController.createAudioEntity(`blackKeys.${notes[i]}`, true)
      skipKey++
      skipKey % 3 !== 0 ? (blackKeyXPos += 0.8) : (blackKeyXPos += 1.6)
      if (skipKey === 6) skipKey = 1
    }
  }

  createWhiteKeys()
  createBlackKeys()
  //utils.triggers.enableDebugDraw(true); // To debug trigger areas

  // UI with GitHub link
  setupUi()
}
