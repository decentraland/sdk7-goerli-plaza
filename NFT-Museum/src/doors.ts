import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/ecs'
import { Quaternion, Vector3 } from '@dcl/ecs-math'
import * as utils from '@dcl-sdk/utils'
import { Entity } from '@dcl/sdk/ecs'

// Audio for the sliding doors depends on audio.ts
export const doorLmodel = 'models/slidingDoor1-noAlpha.glb'
export const doorLmodelAlpha = 'models/slidingDoor1-Alpha.glb'
export const doorRmodel = 'models/slidingDoor2-noAlpha.glb'
export const doorRmodelAlpha = 'models/slidingDoor2-Alpha.glb'

export const singleDoor = 'models/slidingDoor-big-noAlpha.glb'
export const singleDoorAlpha = 'models/slidingDoor-big-Alpha.glb'
export const closeDoorOffset = 0
export const openDoorOffset = 1

export const fastDoorSound = 'sounds/slidingDoors_fast.mp3'
const doorSound = 'sounds/slidingDoors.mp3'

// south west gallery door, ground floor
const doorPos1 = Vector3.create(13.95, 2, 10.2)
const doorRot1 = Vector3.create(0, 90, 0)

// north west gallery door, ground floor
const doorPos2 = Vector3.create(13.95, 2, 21.81)
const doorRot2 = Vector3.create(0, 90, 0)

// First floor, north facing door
const doorPos3 = Vector3.create(9.36, 10.5, 23.9)
const doorRot3 = Vector3.create(0, 0, 0)

// First floor, south facing door
const doorPos4 = Vector3.create(9.375, 10.5, 8.1)
const doorRot4 = Vector3.create(0, 0, 0)

// Change door movement speed
export const doorDuration = 1 // 1 second
const bigDoorDuration = 2 // 2 seconds
export const cooldownTime = 2500 // 2500 miliseconds or 2.5 seconds

// Regular double glass sliding doors
export function createSlidingDoors(
  position: Vector3,
  rotation: Vector3,
  doorLmodel: string,
  doorLmodelAlpha: string,
  doorRmodel: string,
  doorRmodelAlpha: string,
  openDoorOffset: number,
  closeDoorOffset: number
) {
  let isMoving = false;
  let isOpen = false;
  let lastDoorInteractionTime = 0;
  const r = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z);

  const doorParent = engine.addEntity();
  Transform.create(doorParent, { position: position, rotation: r });

  const doorL = createDoorEntity(doorLmodel, closeDoorOffset, doorParent);
  const doorLalpha = createDoorEntity(doorLmodelAlpha, closeDoorOffset, doorParent);

  const doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent);
  const doorRalpha = createDoorEntity(doorRmodelAlpha, closeDoorOffset, doorParent);

// Manually copy the position values into new Vector3 objects
const initialClosedDoorLPos = Vector3.create(
  Transform.get(doorL).position.x,
  Transform.get(doorL).position.y,
  Transform.get(doorL).position.z
);

const initialClosedDoorRPos = Vector3.create(
  Transform.get(doorR).position.x,
  Transform.get(doorR).position.y,
  Transform.get(doorR).position.z
);

function moveDoors(offset: number, onComplete?: () => void) {
  // Calculate the open positions relative to the initial closed positions
  const openDoorLPos = roundVector3(Vector3.create(
    initialClosedDoorLPos.x + offset, 
    initialClosedDoorLPos.y,
    initialClosedDoorLPos.z
  ));

  const openDoorRPos = roundVector3(Vector3.create(
    initialClosedDoorRPos.x - offset,
    initialClosedDoorRPos.y,
    initialClosedDoorRPos.z
  ));

  const roundedInitialClosedDoorLPos = roundVector3(initialClosedDoorLPos);
  const roundedInitialClosedDoorRPos = roundVector3(initialClosedDoorRPos);

  // Define a small tolerance for rounding errors
  const tolerance = 0.001;

  function forceExactPosition(entity: Entity, targetPos: Vector3) {
    const currentPos = Transform.get(entity).position;
    if (Math.abs(currentPos.x - targetPos.x) > tolerance ||
        Math.abs(currentPos.y - targetPos.y) > tolerance ||
        Math.abs(currentPos.z - targetPos.z) > tolerance) {
      // Safely adjust the position using Transform.getMutable()
      const mutableTransform = Transform.getMutable(entity);
      mutableTransform.position = targetPos;
    }
  }

  if (offset === 0) {
    // Closing - Move both main and alpha doors back to closed positions smoothly
    utils.tweens.startTranslation(doorL, Transform.get(doorL).position, roundedInitialClosedDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
      // Force doors to snap to exact positions at the end of the animation
      forceExactPosition(doorL, roundedInitialClosedDoorLPos);
      forceExactPosition(doorLalpha, roundedInitialClosedDoorLPos);
      isMoving = false;
      if (onComplete) onComplete();
    });

    utils.tweens.startTranslation(doorR, Transform.get(doorR).position, roundedInitialClosedDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
      forceExactPosition(doorR, roundedInitialClosedDoorRPos);
      forceExactPosition(doorRalpha, roundedInitialClosedDoorRPos);
    });

    // Smoothly close alpha doors using identical tween parameters
    utils.tweens.startTranslation(doorLalpha, Transform.get(doorLalpha).position, roundedInitialClosedDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD);
    utils.tweens.startTranslation(doorRalpha, Transform.get(doorRalpha).position, roundedInitialClosedDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD);

  } else {
    // Opening - Move both main and alpha doors to the open positions smoothly
    utils.tweens.startTranslation(doorL, roundedInitialClosedDoorLPos, openDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD);
    utils.tweens.startTranslation(doorR, roundedInitialClosedDoorRPos, openDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD);

    // Smoothly open alpha doors using identical tween parameters
    utils.tweens.startTranslation(doorLalpha, roundedInitialClosedDoorLPos, openDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD);
    utils.tweens.startTranslation(doorRalpha, roundedInitialClosedDoorRPos, openDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
      // Force exact final positions when open animation completes
      forceExactPosition(doorL, openDoorLPos);
      forceExactPosition(doorR, openDoorRPos);
      forceExactPosition(doorLalpha, openDoorLPos);
      forceExactPosition(doorRalpha, openDoorRPos);
      isMoving = false; // Ensure all doors (main and alpha) are done moving
    });
  }
}

function closeDoors() {
  if (!isOpen && !isMoving) return;
  isMoving = true;

  // Close both main and alpha doors
  moveDoors(0, () => {
    isOpen = false;
  });
}

function openDoors() {
  if (isOpen || isMoving) return;
  isOpen = true;
  isMoving = true;

  // Open both main and alpha doors
  moveDoors(openDoorOffset); 

  utils.timers.setTimeout(closeDoors, cooldownTime);
}






  utils.triggers.addTrigger(
      doorParent,
      utils.NO_LAYERS,
      utils.LAYER_1,
      [{ type: 'box', position: { x: 0, y: 0.25, z: 0 }, scale: { x: 5, y: 5, z: 5 } }],
      function (otherEntity) {
          if (Date.now() - lastDoorInteractionTime < cooldownTime) return; // Adjust the cooldown as needed
          lastDoorInteractionTime = Date.now();
          openDoors();
      }
  );
}


// Single sliding door (big one)
export function createSlidingDoor(
  position: Vector3,
  rotation: Vector3,
  doormodel: string,
  doorModelAlpha: string,
  openDoorOffset: number,
  closeDoorOffset: number
) {
  let doorParent = engine.addEntity()
  let isMovingSingle = false
  let isOpenSingle = false
  let lastDoorInteractionTime = 0

  Transform.create(doorParent, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
  })

  let door = createDoorEntity(doormodel, -closeDoorOffset, doorParent)
  let doorAlpha = createDoorEntity(doorModelAlpha, -closeDoorOffset, doorParent)

  // Store exact closed position
  const initialClosedDoorPos = Transform.get(door).position

  // Calculate open position based on offset
  const openDoorPos = Vector3.create(initialClosedDoorPos.x + openDoorOffset, initialClosedDoorPos.y, initialClosedDoorPos.z)

  function moveDoor(offset: number) {
    isMovingSingle = true

    // Get the current positions of both the door and the alpha door
    const currentDoorPos = Transform.get(door).position
    const currentDoorAlphaPos = Transform.get(doorAlpha).position

    // Calculate target position based on offset (open or closed)
    const targetDoorPos = Vector3.create(initialClosedDoorPos.x + offset, initialClosedDoorPos.y, initialClosedDoorPos.z)

    utils.playSound(doorSound, false, Transform.get(engine.PlayerEntity).position)

    // Move the door
    utils.tweens.startTranslation(
      door,
      currentDoorPos,
      targetDoorPos,
      bigDoorDuration,
      utils.InterpolationType.EASEINSINE,
      () => {
        Transform.createOrReplace(door, { position: targetDoorPos, parent: doorParent })
        isMovingSingle = false
      }
    )

    // Move the alpha door in sync with the main door
    utils.tweens.startTranslation(
      doorAlpha,
      currentDoorAlphaPos,
      targetDoorPos,
      bigDoorDuration,
      utils.InterpolationType.EASEINSINE,
      () => {
        Transform.createOrReplace(doorAlpha, { position: targetDoorPos, parent: doorParent })
        isMovingSingle = false
      }
    )
  }

  function closeDoor() {
    if (isOpenSingle) {
      isOpenSingle = false
      moveDoor(0) // Move the door back to the exact closed position (0 offset)
    }
  }

  function openDoor() {
    if (!isOpenSingle && !isMovingSingle) {
      isOpenSingle = true
      moveDoor(openDoorOffset) // Move the door to the open position using the exact offset
      utils.timers.setTimeout(closeDoor, cooldownTime) // Automatically close the door after a delay
    }
  }

  utils.triggers.addTrigger(
    doorParent,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', position: { x: 0, y: 0, z: 0 }, scale: { x: 13, y: 3.5, z: 5 } }],

    function (otherEntity) {
      if (Date.now() - lastDoorInteractionTime < cooldownTime) return // Adjust the cooldown time as needed
      lastDoorInteractionTime = Date.now()
      console.log('trigger doors')

      if (!isOpenSingle) {
        openDoor()
      }
    }
  )
}



export function createDoorEntity(model: string, offsetX: number, parent: Entity) {
  let doorEntity = engine.addEntity()
  Transform.create(doorEntity, {
    position: Vector3.create(offsetX, 0, 0),
    rotation: Quaternion.Identity(),
    parent: parent
  })
  GltfContainer.create(doorEntity, { src: model, invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS })
  return doorEntity
}

export function createAllDoors() {
  createSlidingDoors(doorPos1, doorRot1, doorLmodel, doorLmodelAlpha, doorRmodel, doorRmodelAlpha, openDoorOffset, closeDoorOffset)
  createSlidingDoors(doorPos2, doorRot2, doorLmodel, doorLmodelAlpha, doorRmodel, doorRmodelAlpha, openDoorOffset, closeDoorOffset)
  createSlidingDoor(doorPos3, doorRot3, singleDoor, singleDoorAlpha, 9, 0)
  createSlidingDoor(doorPos4, doorRot4, singleDoor, singleDoorAlpha, 9, 0)
}


function roundVector3(vec: Vector3, decimals: number = 4): Vector3 {
  return Vector3.create(
    parseFloat(vec.x.toFixed(decimals)),
    parseFloat(vec.y.toFixed(decimals)),
    parseFloat(vec.z.toFixed(decimals))
  );
}
