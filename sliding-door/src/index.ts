import { engine, InputAction, pointerEventsSystem, Schemas, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createWall, setMaterial } from './factory'
import * as utils from '@dcl-sdk/utils'

export function main() {
  const leftDoorClosed = Vector3.create(0.5, 0, 0)
  const leftDoorOpen = Vector3.create(1.25, 0, 0)
  const rightDoorClosed = Vector3.create(-0.5, 0, 0)
  const rightDoorOpen = Vector3.create(-1.25, 0, 0)

  // Create the walls
  createWall(Vector3.create(9.75, 1, 8), Vector3.create(1.5, 2.01, 0.1))
  createWall(Vector3.create(6.25, 1, 8), Vector3.create(1.5, 2.01, 0.1))

  // Create the doors
  const parentDoor = engine.addEntity()
  Transform.create(parentDoor, {
    position: Vector3.create(8, 1, 8)
  })

  const leftDoor = createWall(Vector3.create(0.5, 0, 0), Vector3.create(1.1, 2, 0.05), parentDoor)
  const rightDoor = createWall(Vector3.create(-0.5, 0, 0), Vector3.create(1.1, 2, 0.05), parentDoor)

  // Set material to the doors
  setMaterial(leftDoor)
  setMaterial(rightDoor)

  // Register event when you click on one of the doors
  pointerEventsSystem.onPointerDown(
    {
      entity: leftDoor,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Open / Close'
      }
    },
    () => utils.toggles.flip(parentDoor)
  )

  pointerEventsSystem.onPointerDown(
    {
      entity: rightDoor,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Open / Close'
      }
    },
    () => utils.toggles.flip(parentDoor)
  )

  // Add toggle actions to door
  utils.toggles.addToggle(parentDoor, utils.ToggleState.Off, (value) => {
    if (value == utils.ToggleState.On) {
      utils.tweens.startTranslation(leftDoor, leftDoorClosed, leftDoorOpen, 1, utils.InterpolationType.EASEOUTEBOUNCE)
      utils.tweens.startTranslation(
        rightDoor,
        rightDoorClosed,
        rightDoorOpen,
        1,
        utils.InterpolationType.EASEOUTEBOUNCE
      )
    } else {
      utils.tweens.startTranslation(leftDoor, leftDoorOpen, leftDoorClosed, 1, utils.InterpolationType.EASEEXPO)
      utils.tweens.startTranslation(rightDoor, rightDoorOpen, rightDoorClosed, 1, utils.InterpolationType.EASEEXPO)
    }
  })
}
