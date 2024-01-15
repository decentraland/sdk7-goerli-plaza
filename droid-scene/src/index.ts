import {
  EasingFunction,
  engine,
  Entity,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  Tween
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
      [{ type: 'box', scale: Vector3.create(12, 12, 12) }],
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

  // rotate
  Tween.createOrReplace(droid, {
    mode: Tween.Mode.Rotate({
      start: startRot,
      end: endRot
    }),
    duration: 2000,
    easingFunction: EasingFunction.EF_EASEELASTIC
  })

  // after rotating
  utils.timers.setTimeout(() => {

    // move
    Tween.createOrReplace(droid, {
      mode: Tween.Mode.Move({
        start: startPos,
        end: endPos
      }),
      duration: 2000,
      easingFunction: EasingFunction.EF_EASEOUTQUAD
    })
  }, 2000)

  // after moving
  utils.timers.setTimeout(() => {

    DROID_IS_MOVING = false
    const droid_last_rot_start = Transform.get(droid).rotation
    const droid_last_rot_end = Quaternion.fromLookAt(endPos, Transform.get(engine.PlayerEntity).position)

    // rotate to look at player
    Tween.createOrReplace(droid, {
      mode: Tween.Mode.Rotate({
        start: droid_last_rot_start,
        end: droid_last_rot_end
      }),
      duration: 2000,
      easingFunction: EasingFunction.EF_EASEINEXPO
    })
  }, 4200)


}
