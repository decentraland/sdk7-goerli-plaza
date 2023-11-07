import {
  engine,
  Entity,
  InputAction,
  Transform,
  GltfContainer,
  AudioSource,
  pointerEventsSystem,
  MeshCollider,
  ColliderLayer
} from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { setupUi } from './ui'

export function main() {
  // Ground
  const ground = engine.addEntity()
  Transform.create(ground, {
    position: Vector3.create(8, 0, 8)
  })
  GltfContainer.create(ground, {
    src: 'models/FloorBaseDirt_01.glb'
  })

  // Reference scale values
  const deflatedScale = Vector3.create(0.05, 0.05, 0.065)
  const inflatedScale = Vector3.create(0.11, 0.11, 0.075)

  // Fish
  const puffer = engine.addEntity()

  Transform.create(puffer, {
    position: Vector3.create(8, 1, 8),
    scale: deflatedScale
  })

  GltfContainer.create(puffer, {
    src: 'models/puffer.glb'
  })

  AudioSource.create(puffer, {
    audioClipUrl: 'sounds/deflate.wav',
    loop: false,
    playing: false
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: puffer,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Puff up!'
      }
    },
    () => {
      inflateFish(puffer)
    }
  )

  //utils.triggers.enableDebugDraw(true)

  //Trigger on fish
  utils.triggers.addTrigger(
    puffer,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'sphere', position: Vector3.create(0, 0, 0), radius: 2 }],
    () => inflateFish(puffer),
    undefined,
    Color3.Blue()
  )

  // Flag to avoid re-triggering
  let isInflating = false

  /// Reusable function to inflate fish, called both by the click and the trigger
  function inflateFish(fish: Entity) {
    // Avoid retriggering
    if (isInflating) return
    isInflating = true

    // Enlarge
    utils.tweens.startScaling(fish, deflatedScale, inflatedScale, 1, utils.InterpolationType.EASEINQUAD)

    // Wait, then shrink back
    utils.timers.setTimeout(() => {
      utils.tweens.startScaling(fish, inflatedScale, deflatedScale, 3, utils.InterpolationType.EASEINQUAD, () => {
        // When finished, reset flag to allow triggering again
        isInflating = false
      })

      const sound = AudioSource.getMutable(fish)
      sound.playing = true
      sound.pitch = 0.5 + Math.random()
    }, 2000)
  }

  // UI with GitHub link
  setupUi()
}
