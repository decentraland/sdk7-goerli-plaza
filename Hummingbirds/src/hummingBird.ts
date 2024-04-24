import {
  Animator,
  CameraMode,
  EasingFunction,
  engine,
  Entity,
  GltfContainer,
  Schemas,
  Transform,
  Tween
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export function createHummingBird() {
  const bird = engine.addEntity()
  Transform.create(bird, {
    position: { x: 13, y: 3.5, z: 5 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
    scale: { x: 0.2, y: 0.2, z: 0.2 }
  })
  GltfContainer.create(bird, {
    src: 'models/hummingbird.glb'
  })
  Animator.create(bird, {
    states: [
      {
        clip: 'fly',
        loop: true,
        playing: true,
        shouldReset: false,
        speed: 2
      },
      {
        clip: 'look',
        loop: false,
        playing: false,
        shouldReset: false
      },
      {
        clip: 'shake',
        loop: false,
        playing: false,
        shouldReset: false
      }
    ]
  })

  // fly pattern
  utils.timers.setInterval(() => {
    const birdTransform = Transform.getMutable(bird)

    // next target
    const nextPos = {
      x: Math.random() * 12 + 2,
      y: Math.random() * 3 + 1,
      z: Math.random() * 12 + 2
    }

    const nextRot = Quaternion.fromLookAt(birdTransform.position, nextPos)

    // face new pos
    Tween.createOrReplace(bird, {
      mode: Tween.Mode.Rotate({
        start: birdTransform.rotation,
        end: nextRot
      }),
      duration: 300,
      easingFunction: EasingFunction.EF_EASEINSINE
    })

    // move to next pos (after rotating)
    utils.timers.setTimeout(
      () => {
        Tween.createOrReplace(bird, {
          mode: Tween.Mode.Move({
            start: birdTransform.position,
            end: nextPos
          }),
          duration: 2000,
          easingFunction: EasingFunction.EF_EASESINE
        })
      },
      300 // after rotation is over
    )

    // randomly play head animation
    utils.timers.setTimeout(
      () => randomHeadMovement(bird),
      2500 // after rotation and translation + pause
    )
  }, 4000) // loop every 4 seconds
}

// Randomly determine if any head moving animations are played
export function randomHeadMovement(bird: Entity) {
  const anim = Math.random()
  if (anim < 0.2) {
    const look = Animator.getClip(bird, 'look')
    look.playing = true
  } else if (anim > 0.8) {
    const shake = Animator.getClip(bird, 'shake')
    shake.playing = true
  }
}
