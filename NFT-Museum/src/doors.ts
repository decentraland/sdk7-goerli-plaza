import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/ecs"
import { Quaternion, Vector3 } from "@dcl/ecs-math"
import * as utils from '@dcl-sdk/utils';
import { Entity } from "@dcl/sdk/ecs";


// Audio for the sliding doors depends on audio.ts
export const doorLmodel = 'models/slidingDoor1.glb'
export const doorRmodel = 'models/slidingDoor2.glb'
export const singleDoor = 'models/slidingDoor-big.glb'
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
    doorRmodel: string,
    openDoorOffset: number,
    closeDoorOffset: number,
) {
    let isMoving = false;
    let isOpen = false;
    let lastDoorInteractionTime = 0;
    const r = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)

    const doorParent = engine.addEntity();
    Transform.create(doorParent, { position: position, rotation: r });

    const doorL = createDoorEntity(doorLmodel, -closeDoorOffset, doorParent);
    const doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent);

    function moveDoors(offset: number) {
        const closedDoorLPos = Transform.get(doorL).position
        const closedDoorRPos = Transform.get(doorR).position
        const openDoorLPos = Vector3.create(closedDoorLPos.x + offset, closedDoorLPos.y, closedDoorLPos.z);
        const openDoorRPos = Vector3.create(closedDoorRPos.x - offset, closedDoorRPos.y, closedDoorRPos.z);
        isMoving = true;

        utils.playSound(fastDoorSound, false, Transform.get(engine.PlayerEntity).position)

        utils.tweens.startTranslation(doorL, closedDoorLPos, openDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD);
        utils.tweens.startTranslation(doorR, closedDoorRPos, openDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
            Transform.createOrReplace(doorL, { position: openDoorLPos, parent: doorParent })
            Transform.createOrReplace(doorR, { position: openDoorRPos, parent: doorParent })
            isMoving = false;
        });
    }

    function closeDoors() {
        if (isOpen && !isMoving) {
            moveDoors(-openDoorOffset);
            isOpen = false;
        }
    }

    function openDoors() {
        if (!isOpen && !isMoving) {
            moveDoors(openDoorOffset);
            isOpen = true;
            utils.timers.setTimeout(closeDoors, cooldownTime)
        }
    }

    utils.triggers.addTrigger(
        doorParent,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', position: { x: 0, y: 0.25, z: 0 }, scale: { x: 5, y: 3.5, z: 5 } }],
        function (otherEntity) {
            if (Date.now() - lastDoorInteractionTime < cooldownTime) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();
            openDoors();
        },
    );
}

// Single sliding door (big one)
export function createSlidingDoor(
    position: Vector3,
    rotation: Vector3,
    doormodel: string,
    openDoorOffset: number,
    closeDoorOffset: number,
) {

    let doorParent = engine.addEntity();
    let isMovingSingle = false;
    let isOpenSingle = false;
    let lastDoorInteractionTime = 0;

    Transform.create(doorParent, { position: position, rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z) });
    let door = createDoorEntity(doormodel, -closeDoorOffset, doorParent);

    function moveDoor(offset: number) {

        isMovingSingle = true;
        let currentDoorPos = Transform.get(door).position;
        let targetDoorPos = Vector3.create(currentDoorPos.x + offset, currentDoorPos.y, currentDoorPos.z);
        utils.playSound(doorSound, false, Transform.get(engine.PlayerEntity).position)

        utils.tweens.startTranslation(door, currentDoorPos, targetDoorPos, bigDoorDuration, utils.InterpolationType.EASEINSINE, () => {
            Transform.createOrReplace(door, { position: targetDoorPos, parent: doorParent })
            isMovingSingle = false;
        });
    }

    function closeDoor() {

        if (isOpenSingle) {
            isOpenSingle = false;
            moveDoor(-openDoorOffset);
        }
    }


    function openDoor() {

        if (!isOpenSingle && !isMovingSingle) {
            isOpenSingle = true;
            moveDoor(openDoorOffset);
            utils.timers.setTimeout(closeDoor, cooldownTime);
        }
    }

    utils.triggers.addTrigger(
        doorParent,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', position: { x: 0, y: 0, z: 0 }, scale: { x: 13, y: 3.5, z: 5 } }],

        function (otherEntity) {

            if (Date.now() - lastDoorInteractionTime < cooldownTime) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();
            console.log('trigger doors');

            if (!isOpenSingle) {
                openDoor();
            }
        },
    );
}

export function createDoorEntity(model: string, offsetX: number, parent: Entity) {
    let doorEntity = engine.addEntity();
    Transform.create(doorEntity, { position: Vector3.create(offsetX, 0, 0), rotation: Quaternion.Identity(), parent: parent });
    GltfContainer.create(doorEntity, { src: model, invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS });
    return doorEntity;
}


export function createAllDoors() {
    createSlidingDoors(doorPos1, doorRot1, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset);
    createSlidingDoors(doorPos2, doorRot2, doorLmodel, doorRmodel, openDoorOffset, closeDoorOffset);
    createSlidingDoor(doorPos3, doorRot3, singleDoor, 9, 0)
    createSlidingDoor(doorPos4, doorRot4, singleDoor, 9, 0)
}





