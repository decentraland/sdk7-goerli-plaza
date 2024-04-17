import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/ecs"
import { Quaternion, Vector3 } from "@dcl/ecs-math"
import * as utils from '@dcl-sdk/utils';
import { Entity } from "@dcl/sdk/ecs";
import { playAudioAtPlayer } from "./Audio/audio";


// Audio for the sliding doors depends on audio.ts
export let doorLmodel = 'models/slidingDoor1.glb'
export let doorRmodel = 'models/slidingDoor2.glb'
export let singleDoor = 'models/slidingDoor-big.glb'
export let closeDoorOffset = 0
export let openDoorOffset = 1

export let fastDoorSound = 'sounds/slidingDoors_fast.mp3'
let doorSound = 'sounds/slidingDoors.mp3'

// Change door movement speed
let doorDuration = 1
let bigDoorDuration = 2

// Change when the door closes and cooldown duration
let cooldownTime = 2000 // 2000 miliseconds or 2 seconds


// Regular double glass sliding doors
export function createSlidingDoors(
    position: Vector3,
    rotation: Vector3,
    doorLmodel: string,
    doorRmodel: string,
    openDoorOffset: number,
    closeDoorOffset: number,
) {
    let doorParent = engine.addEntity();
    let doorsShouldOpen = false;
    let isMoving = false;
    let isOpen = false;
    let lastDoorInteractionTime = 0;
    let r = Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)

    Transform.create(doorParent, {
        position: position,
        rotation: r,
    });

    let doorL = createDoorEntity(doorLmodel, -closeDoorOffset, doorParent);
    let doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent);

    function moveDoors(offset: number) {
       /// instead of fetching the transforms use fixed start and end pos / open and closed pos based on offset and parent pos
       
        isMoving = true;
        if (isOpen) {
            //close it
        } else if (!isOpen) {
            // open it
        }

        let currentDoorLPos = Transform.get(doorL).position;
        let currentDoorRPos = Transform.get(doorR).position;
        let targetDoorLPos = Vector3.create(currentDoorLPos.x + offset, currentDoorLPos.y, currentDoorLPos.z);
        let targetDoorRPos = Vector3.create(currentDoorRPos.x - offset, currentDoorRPos.y, currentDoorRPos.z);

        playAudioAtPlayer(fastDoorSound, 1)

        utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, doorDuration, utils.InterpolationType.EASEINQUAD);
        utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, doorDuration, utils.InterpolationType.EASEINQUAD, () => {
            Transform.createOrReplace(doorL, {
                position: targetDoorLPos,
                parent: doorParent
            })
            Transform.createOrReplace(doorR, {
                position: targetDoorRPos,
                parent: doorParent
            })
            isMoving = false;
        });
    }


    function closeDoors() {
        if (isOpen) {
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
        [{
            type: 'box',
            position: { x: 0, y: 0.25, z: 0 },
            scale: { x: 3, y: 3.5, z: 3 }
        }],
        function (otherEntity) {

            if (Date.now() - lastDoorInteractionTime < cooldownTime) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();

            doorsShouldOpen = true;
            console.log('trigger doors');
            if (doorsShouldOpen && !isOpen) {
                openDoors();
                doorsShouldOpen = false;
            }
        },
        function (anotherEntity) {
            console.log('close doors')
        }
    );


    // Uncomment line below to see the trigger box
    //utils.triggers.enableDebugDraw(true);
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
    let doorShouldOpen = false;
    let isMovingSingle = false;
    let isOpenSingle = false;
    let lastDoorInteractionTime = 0;

    Transform.create(doorParent, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    });

    let door = createDoorEntity(doormodel, -closeDoorOffset, doorParent);

    function moveDoor(offset: number) {
        isMovingSingle = true;
        let currentDoorPos = Transform.get(door).position;
        let targetDoorPos = Vector3.create(currentDoorPos.x + offset, currentDoorPos.y, currentDoorPos.z);
        playAudioAtPlayer(doorSound, 1)
        console.log('sound played')
        utils.tweens.startTranslation(door, currentDoorPos, targetDoorPos, bigDoorDuration, utils.InterpolationType.EASEINSINE, () => {
            Transform.createOrReplace(door, {
                position: targetDoorPos,
                parent: doorParent
            })
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
            //let currentDoorPos = Transform.get(door).position;
            moveDoor(openDoorOffset);
            utils.timers.setTimeout(closeDoor, cooldownTime);
        }
    }

    utils.triggers.addTrigger(
        doorParent,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{
            type: 'box',
            position: { x: 0, y: 0, z: 0 },
            scale: { x: 12, y: 3.5, z: 3 }
        }],
        function (otherEntity) {

            if (Date.now() - lastDoorInteractionTime < cooldownTime) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();

            //doorShouldOpen = true;
            console.log('trigger doors');
            if (doorShouldOpen && !isOpenSingle) {
                openDoor();
                doorShouldOpen = false;
            }
        },
        function (anotherEntity) {
            console.log('close doors')
        }
    );
}

export function createDoorEntity(model: string, offsetX: number, parent: Entity) {
    let doorEntity = engine.addEntity();
    Transform.create(doorEntity, {
        position: Vector3.create(offsetX, 0, 0),
        rotation: Quaternion.Identity(),
        parent: parent
    });
    GltfContainer.create(doorEntity, {
        src: model,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    });

    return doorEntity;
}


// Creating all sets of doors
export function createAllDoors() {

    // south west gallery door, ground floor
    createSlidingDoors(
        Vector3.create(13.95, 2, 10.2),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset
    );

    // north west gallery door, ground floor
    createSlidingDoors(
        Vector3.create(13.95, 2, 21.81),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset
    );

    // First floor, north facing door
    createSlidingDoor(
        Vector3.create(9.36, 10.5, 23.9),
        Vector3.create(0, 0, 0),
        singleDoor,
        9,
        0
    )

    // First floor, south facing door
    createSlidingDoor(
        Vector3.create(9.375, 10.5, 8.1),
        Vector3.create(0, 0, 0),
        singleDoor,
        9,
        0
    )
}





