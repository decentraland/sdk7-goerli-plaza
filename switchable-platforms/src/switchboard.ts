import {
  AudioSource,
  EasingFunction,
  engine,
  Entity,
  executeTask,
  GltfContainer,
  Transform,
  Tween,
  TweenLoop,
  TweenSequence
} from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const switchSound = engine.addEntity()
Transform.create(switchSound)
AudioSource.create(switchSound, { audioClipUrl: 'assets/scene/Audio/switch.mp3' })

export function createSwitchBoard(model: string, startPos: Vector3, endPos: Vector3): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position: startPos })

  const buttonA = engine.addEntity()
  GltfContainer.create(buttonA, { src: 'assets/scene/Models/buttonA.glb' })
  Transform.create(buttonA, { parent: entity })

  const buttonB = engine.addEntity()
  GltfContainer.create(buttonB, { src: 'assets/scene/Models/buttonB.glb' })
  Transform.create(buttonB, { parent: entity })

  const gear = engine.addEntity()
  GltfContainer.create(gear, { src: 'assets/scene/Models/gears.glb' })
  Transform.create(gear, { parent: entity })

  // Height of button when held down
  const pressedHeight = -0.12

  // Add toggle actions to buttons
  utils.toggles.addToggle(buttonA, utils.ToggleState.Off, (value) => {
    if (value == utils.ToggleState.On) {
      Transform.getMutable(buttonA).position.y = pressedHeight
      Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(switchSound).playing = true
    } else {
      Transform.getMutable(buttonA).position.y = 0
      Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(switchSound).playing = true
    }
  })

  utils.toggles.addToggle(buttonB, utils.ToggleState.Off, (value) => {
    if (value == utils.ToggleState.On) {
      Transform.getMutable(buttonB).position.y = pressedHeight
      Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(switchSound).playing = true
    } else {
      Transform.getMutable(buttonB).position.y = 0
      Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(switchSound).playing = true
    }
  })

  // trigger areas on top of each button
  utils.triggers.addTrigger(
    buttonA,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box', scale: Vector3.create(2.5, 2.5, 2.5), position: Vector3.create(1.5, 2, 0) }],
    () => {
      utils.toggles.set(buttonA, utils.ToggleState.On)
      movePlatform(entity, gear, 1800, endPos)
    },
    () => {
      utils.toggles.set(buttonA, utils.ToggleState.Off)
    },
    Color3.Yellow()
  )

  utils.triggers.addTrigger(
    buttonB,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box', scale: Vector3.create(2.5, 2.5, 2.5), position: Vector3.create(-1.5, 2, 0) }],
    () => {
      utils.toggles.set(buttonB, utils.ToggleState.On)
      movePlatform(entity, gear, 1800, startPos, true)
    },
    () => {
      utils.toggles.set(buttonB, utils.ToggleState.Off)
    },
    Color3.Yellow()
  )

  return entity
}

function movePlatform(platform: Entity, gear: Entity, rotationSpeed: number, targetPos: Vector3, backwards?: boolean) {
  Tween.createOrReplace(gear, {
    mode: Tween.Mode.Rotate({
      start: Quaternion.fromEulerDegrees(0, 0, 0),
      end: backwards ? Quaternion.fromEulerDegrees(0, 0, 180) : Quaternion.fromEulerDegrees(0, 0, -180)
    }),
    duration: rotationSpeed,
    easingFunction: EasingFunction.EF_LINEAR
  })
  TweenSequence.createOrReplace(gear, {
    loop: TweenLoop.TL_RESTART,
    sequence: [
      {
        mode: Tween.Mode.Rotate({
          start: backwards ? Quaternion.fromEulerDegrees(0, 0, 180) : Quaternion.fromEulerDegrees(0, 0, -180),
          end: backwards ? Quaternion.fromEulerDegrees(0, 0, 360) : Quaternion.fromEulerDegrees(0, 0, -360)
        }),
        duration: rotationSpeed,
        easingFunction: EasingFunction.EF_LINEAR
      }
    ]
  })

  const currentPos = Transform.get(platform).position
  const speed = Math.abs(targetPos.x - currentPos.x) * 0.25 * 1000

  Tween.createOrReplace(platform, {
    mode: Tween.Mode.Move({
      start: currentPos,
      end: targetPos
    }),
    duration: speed,
    easingFunction: EasingFunction.EF_LINEAR
  })

  utils.timers.setTimeout(() => {
    Tween.deleteFrom(gear)
    TweenSequence.deleteFrom(gear)
    Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
    AudioSource.getMutable(switchSound).playing = true
  }, speed)
}

// enable debug mode by default in preview mode
executeTask(async () => {
  try {
    const { getRealm } = await import('~system/Runtime')
    const realm = await getRealm({})
    if (realm.realmInfo?.isPreview) {
      //utils.triggers.enableDebugDraw(true)
    }
  } catch (err) {
    console.error(err)
  }
})
