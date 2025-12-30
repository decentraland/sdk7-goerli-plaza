import {
  Animator,
  AvatarAnchorPointType,
  AvatarAttach,
  CameraMode,
  CameraModeArea,
  CameraType,
  ColliderLayer,
  Entity,
  GltfContainer,
  InputAction,
  PointerEvents,
  Transform,
  VisibilityComponent,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/ecs'
import { playringPassSound } from './sound'

// Config
const EDGE_OFFSET = 6
const Y_OFFSET = 8
const GROUND_OFFSET = 10
const SCENE_SIZE = 65
const MAX_HEIGHT = 20

// Creates a ring that floats up and down continuously
export function createRing(model: string, startPos: Vector3.Mutable, time: number) {
  const ring = engine.addEntity()
  let endPos: Vector3

  Transform.create(ring, {
    position: startPos
  })
  GltfContainer.create(ring, {
    src: model,
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  endPos = Vector3.create(startPos.x, startPos.y + Y_OFFSET, startPos.z)

  const trigger = engine.addEntity()
  Transform.create(trigger, { parent: ring, position: Vector3.create(0, 1.2, 0), scale: Vector3.create(10, 8.5, 1) })
  TriggerArea.setBox(trigger)
  triggerAreaEventsSystem.onTriggerExit(trigger, () => {
    startPos = Vector3.create(
      Math.random() * SCENE_SIZE + EDGE_OFFSET,
      Math.random() * MAX_HEIGHT + GROUND_OFFSET,
      Math.random() * SCENE_SIZE + EDGE_OFFSET
    )
    endPos = Vector3.create(startPos.x, startPos.y + GROUND_OFFSET, startPos.z)
    playringPassSound()
  })
  // Enable debug draw
  //utils.triggers.enableDebugDraw(true)

  // Move the ring up and down between start and end positions
  utils.toggles.addToggle(ring, utils.ToggleState.Off, (value: utils.ToggleState) => {
    if (value === utils.ToggleState.On) {
      utils.tweens.startTranslation(ring, startPos, endPos, time, utils.InterpolationType.LINEAR, function () {
        utils.toggles.flip(ring)
      })
    } else {
      utils.tweens.startTranslation(ring, endPos, startPos, time, utils.InterpolationType.LINEAR, function () {
        utils.toggles.flip(ring)
      })
    }
  })
  utils.toggles.flip(ring)
}
