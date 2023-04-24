import { AudioSource, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const switchSound = engine.addEntity()
Transform.create(switchSound)
AudioSource.create(switchSound, { audioClipUrl: 'sounds/switch.mp3' })

export function createSwitchBoard(model: string, startPos: Vector3, endPos: Vector3): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position: startPos })

  const buttonA = engine.addEntity()
  GltfContainer.create(buttonA, { src: 'models/buttonA.glb' })
  Transform.create(buttonA, { parent: entity })

  const buttonB = engine.addEntity()
  GltfContainer.create(buttonB, { src: 'models/buttonB.glb' })
  Transform.create(buttonB, { parent: entity })

  const gear = engine.addEntity()
  GltfContainer.create(gear, { src: 'models/gears.glb' })
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
      movePlatform(entity, gear, -180, endPos)
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
      movePlatform(entity, gear, 180, startPos)
    },
    () => {
      utils.toggles.set(buttonB, utils.ToggleState.Off)
    },
    Color3.Yellow()
  )

  return entity
}

function movePlatform(platform: Entity, gear: Entity, rotationSpeed: number, targetPos: Vector3) {
  utils.tweens.stopTranslation(platform)

  utils.perpetualMotions.startRotation(gear, Quaternion.fromEulerDegrees(0, 0, rotationSpeed))

  const currentPos = Transform.get(platform).position
  const speed = Math.abs(targetPos.x - currentPos.x) * 0.25

  utils.tweens.startTranslation(platform, currentPos, targetPos, speed, utils.InterpolationType.LINEAR, () => {
    utils.perpetualMotions.stopRotation(gear)
    Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
    AudioSource.getMutable(switchSound).playing = true
  })
}

utils.triggers.enableDebugDraw(true)
