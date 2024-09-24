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
import { engine, Entity, Transform } from '@dcl/sdk/ecs'
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

  // Tolerance for floating-point precision issues
  const tolerance = 0.001

  // Store exact closed positions
  const initialClosedDoorLPos = Transform.get(doorL).position
  const initialClosedDoorRPos = Transform.get(doorR).position

  // Calculate open positions based on offset
  function calculateOpenPositions(offset: number) {
    const openDoorLPos = Vector3.create(initialClosedDoorLPos.x + offset, initialClosedDoorLPos.y, initialClosedDoorLPos.z)
    const openDoorRPos = Vector3.create(initialClosedDoorRPos.x - offset, initialClosedDoorRPos.y, initialClosedDoorRPos.z)
    return { openDoorLPos, openDoorRPos }
  }

  function forceExactPosition(entity: Entity, targetPos: Vector3) {
    const currentPos = Transform.get(entity).position
    if (
      Math.abs(currentPos.x - targetPos.x) > tolerance ||
      Math.abs(currentPos.y - targetPos.y) > tolerance ||
      Math.abs(currentPos.z - targetPos.z) > tolerance
    ) {
      const mutableTransform = Transform.getMutable(entity)
      mutableTransform.position = targetPos
      console.log(`Snapped ${entity} to exact position: ${targetPos}`)
    }
  }

  function moveDoors(offset: number, onComplete?: () => void) {
    const { openDoorLPos, openDoorRPos } = calculateOpenPositions(offset)

    // Get the current positions of the doors to start the tween from there
    const currentDoorLPos = Transform.get(doorL).position
    const currentDoorRPos = Transform.get(doorR).position
    const currentDoorLAlphaPos = Transform.get(doorLalpha).position
    const currentDoorRAlphaPos = Transform.get(doorRalpha).position

    isMoving = true

    // Move both doors with tweens (sliding from current position)
    utils.tweens.startTranslation(doorL, currentDoorLPos, openDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD)
    utils.tweens.startTranslation(doorLalpha, currentDoorLAlphaPos, openDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD)
    utils.tweens.startTranslation(doorR, currentDoorRPos, openDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
      // Only run onComplete after the doors fully slide
      if (onComplete) onComplete()
      isMoving = false
    })
    utils.tweens.startTranslation(doorRalpha, currentDoorRAlphaPos, openDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD)
  }

  function closeDoors() {
    if (isOpen) {
      // Move doors to the closed position smoothly
      moveDoors(0, () => {
        // Snap doors only if they are off by a small amount after tween completes
        forceExactPosition(doorL, initialClosedDoorLPos)
        forceExactPosition(doorR, initialClosedDoorRPos)
        forceExactPosition(doorLalpha, initialClosedDoorLPos)
        forceExactPosition(doorRalpha, initialClosedDoorRPos)
        console.log(`Closed doors to LPos: ${initialClosedDoorLPos}, RPos: ${initialClosedDoorRPos}`)
      })
      isOpen = false
    }
  }

  function openDoors() {
    if (!isOpen && !isMoving && doorsShouldOpen) {
      moveDoors(openDoorOffset, () => {
        console.log('Doors fully opened')
      })
      isOpen = true
      utils.timers.setTimeout(closeDoors, cooldownTime)
    }
  }

  // Trigger to open/close doors when conditions are met
  utils.triggers.addTrigger(
    doorParent,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', position: { x: 0, y: 0, z: 0 }, scale: { x: 4, y: 2, z: 4 } }],
    function (otherEntity) {
      if (Date.now() - lastDoorInteractionTime < cooldownTime) return
      lastDoorInteractionTime = Date.now()

      if (floorIndex !== currentFloor) {
        console.log('cant open doors')
        return
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
