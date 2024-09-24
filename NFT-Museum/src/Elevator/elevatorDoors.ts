import { Quaternion, Vector3 } from '@dcl/sdk/math'
import {
  closeDoorOffset,
  cooldownTime,
  createDoorEntity,
  doorDuration,
  doorLmodel,
  doorLmodelAlpha,
  doorRmodel,
  doorRmodelAlpha,
  fastDoorSound,
  openDoorOffset
} from '../doors'
import { engine, Transform } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { currentFloor } from './elevatorState'

// Elevator doors, west ground floor
const doorsPos1 = Vector3.create(26.9, 2.1, 19.635)
const doorsRot1 = Vector3.create(0, 90, 0)

// Elevator doors, west first floor
const doorsPos2 = Vector3.create(26.9, 10.3, 19.635)
const doorsRot2 = Vector3.create(0, 90, 0)

// Elevator doors, east ground floor
const doorsPos3 = Vector3.create(26.9, 2.1, 12.36)
const doorsRot3 = Vector3.create(0, 90, 0)

// Elevator doors, east first floor
const doorsPos4 = Vector3.create(26.9, 10.3, 12.36)
const doorsRot4 = Vector3.create(0, 90, 0)

export function createElevatorDoors(
  position: Vector3,
  rotation: Vector3,
  doorLmodel: string,
  doorRmodel: string,
  openDoorOffset: number,
  closeDoorOffset: number,
  floorIndex: number
) {
  let isMoving = false
  let isOpen = false
  let lastDoorInteractionTime = 0
  let doorsShouldOpen = false
  const r = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)

  const doorParent = engine.addEntity()
  Transform.create(doorParent, { position: position, rotation: r })

  const doorL = createDoorEntity(doorLmodel, -closeDoorOffset, doorParent)
  const doorLalpha = createDoorEntity(doorLmodelAlpha, -closeDoorOffset, doorParent)

  const doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent)
  const doorRalpha = createDoorEntity(doorRmodelAlpha, closeDoorOffset, doorParent)


  function moveDoors(offset: number) {
    const closedDoorLPos = Transform.get(doorL).position
    const closedDoorRPos = Transform.get(doorR).position
    const openDoorLPos = Vector3.create(closedDoorLPos.x + offset, closedDoorLPos.y, closedDoorLPos.z)
    const openDoorRPos = Vector3.create(closedDoorRPos.x - offset, closedDoorRPos.y, closedDoorRPos.z)
    isMoving = true

    if (currentFloor === floorIndex) {
      utils.playSound(fastDoorSound, false, Transform.get(engine.PlayerEntity).position)
      utils.tweens.startTranslation(
        doorL,
        closedDoorLPos,
        openDoorLPos,
        doorDuration,
        utils.InterpolationType.EASEINQUAD
      )
      utils.tweens.startTranslation(
        doorLalpha,
        closedDoorLPos,
        openDoorLPos,
        doorDuration,
        utils.InterpolationType.EASEINQUAD
      )
      utils.tweens.startTranslation(
        doorR,
        closedDoorRPos,
        openDoorRPos,
        doorDuration,
        utils.InterpolationType.EASEINQUAD,
        () => {
          Transform.createOrReplace(doorL, { position: openDoorLPos, parent: doorParent })
          Transform.createOrReplace(doorR, { position: openDoorRPos, parent: doorParent })
          isMoving = false
        }
      )
      utils.tweens.startTranslation(
        doorRalpha,
        closedDoorRPos,
        openDoorRPos,
        doorDuration,
        utils.InterpolationType.EASEINQUAD,
        () => {
          Transform.createOrReplace(doorL, { position: openDoorLPos, parent: doorParent })
          Transform.createOrReplace(doorR, { position: openDoorRPos, parent: doorParent })
          isMoving = false
        }
      )
    }
  }

  function closeDoors() {
    if (isOpen) {
      moveDoors(-openDoorOffset)
      isOpen = false
    }
  }

  function openDoors() {
    if (!isOpen && !isMoving && doorsShouldOpen) {
      moveDoors(openDoorOffset)
      isOpen = true
      utils.timers.setTimeout(closeDoors, cooldownTime)
    }
  }

  utils.triggers.addTrigger(
    doorParent,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', position: { x: 0, y: 0, z: 0 }, scale: { x: 4, y: 2, z: 4 } }],
    function (otherEntity) {
      console.log(`floor index: ${floorIndex}, current floor: ${currentFloor}`)

      if (Date.now() - lastDoorInteractionTime < cooldownTime) return // Adjust the cooldown time as needed
      lastDoorInteractionTime = Date.now()

      if (floorIndex !== currentFloor) {
        console.log('cant open doors')
        return // Do not open the doors if the elevator is not at the current floor
      } else {
        doorsShouldOpen = true
      }
      if (doorsShouldOpen && !isOpen) {
        utils.timers.setTimeout(() => {
          openDoors(), (doorsShouldOpen = false)
        }, 300)
      }
    }
  )
  // utils.triggers.enableDebugDraw(true);
}

export function initializeElevatorDoors() {
  createElevatorDoors(doorsPos1, doorsRot1, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset, 0)
  createElevatorDoors(doorsPos1, doorsRot1, doorLmodelAlpha, doorRmodelAlpha, openDoorOffset, closeDoorOffset, 0)


  createElevatorDoors(doorsPos2, doorsRot2, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset, 1)
  createElevatorDoors(doorsPos2, doorsRot2, doorLmodelAlpha, doorRmodelAlpha, openDoorOffset, closeDoorOffset, 1)


  createElevatorDoors(doorsPos3, doorsRot3, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset, 0)
  createElevatorDoors(doorsPos3, doorsRot3, doorLmodelAlpha, doorRmodelAlpha, openDoorOffset, closeDoorOffset, 0)


  createElevatorDoors(doorsPos4, doorsRot4, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset, 1)
  createElevatorDoors(doorsPos4, doorsRot4, doorLmodelAlpha, doorRmodelAlpha, openDoorOffset, closeDoorOffset, 1)

}
