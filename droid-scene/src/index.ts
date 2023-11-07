import {
  engine,
  Entity,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { setupUi } from './ui'

let DROID_IS_MOVING: boolean = false

export function main() {
  const droid = engine.getEntityOrNullByName('Ball Droid')
  if (droid) {
    utils.triggers.addTrigger(
      droid,
      utils.LAYER_1,
      utils.LAYER_1,
      [{ type: 'box', scale: Vector3.create(4, 4, 4) }],
      () => {
        if (DROID_IS_MOVING) return

        moveDroidToRandomPos(droid)
        DROID_IS_MOVING = true
      }
    )
  }

  // UI with GitHub link
  setupUi()
}

export function moveDroidToRandomPos(droid: Entity) {
  // Define start and end positions
  let startPos = Transform.get(droid).position
  let endPos = Vector3.create(Math.random() * 30 + 1, 1, Math.random() * 30 + 1)

  // Define start and end directions
  let startRot = Transform.get(droid).rotation
  let endRot = Quaternion.fromLookAt(Transform.get(droid).position, endPos)

  // Rotate a droid
  utils.tweens.startRotation(droid, startRot, endRot, 2, utils.InterpolationType.EASEOUTELASTIC, () => {
    utils.tweens.startTranslation(droid, startPos, endPos, 2, utils.InterpolationType.EASEOUTQUAD, () => {
      DROID_IS_MOVING = false
      const droid_last_rot_start = Transform.get(droid).rotation
      const droid_last_rot_end = Quaternion.fromLookAt(endPos, Transform.get(engine.PlayerEntity).position)

      utils.tweens.startRotation(droid, droid_last_rot_start, droid_last_rot_end, 2, utils.InterpolationType.EASEINEXPO)
    })
  })
}
