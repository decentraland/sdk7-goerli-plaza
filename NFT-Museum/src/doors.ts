import { AudioSource, ColliderLayer, GltfContainer, Transform, engine } from "@dcl/ecs"
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
export let doorSound = 'sounds/slidingDoors.mp3'


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

    Transform.create(doorParent, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    });

    let doorL = createDoorEntity(doorLmodel, -closeDoorOffset, doorParent);
    let doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent);

    AudioSource.create(doorParent, {
        audioClipUrl: doorSound,
        loop: false,
        playing: false
    })
    // General door movement 
    function moveDoors(offset: number) {
        isMoving = true; // Set isMoving to true when translation starts

        let currentDoorLPos = Transform.get(doorL).position;
        let currentDoorRPos = Transform.get(doorR).position;

        let targetDoorLPos = Vector3.add(currentDoorLPos, Vector3.create(offset + 0.0001, 0, 0));
        let targetDoorRPos = Vector3.subtract(currentDoorRPos, Vector3.create(offset + 0.0001, 0, 0));

        // Play door sound
        let triggerAudio = AudioSource.playSound(doorParent, doorSound)
        utils.timers.setTimeout(() => playAudioAtPlayer(doorSound), 100)
        console.log('sound played')

        utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, 2, utils.InterpolationType.EASEINSINE);
        utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, 2, utils.InterpolationType.EASEINSINE, () => {
            isMoving = false; // Set isMoving to false when translation ends
        });
    }


    function closeDoors() {
        if (isOpen) {
            isOpen = false;
            moveDoors(-openDoorOffset);
        }
    }


    function openDoors() {
        if (!isOpen && !isMoving && doorsShouldOpen) {
            isOpen = true;

            let currentDoorLPos = Transform.get(doorL).position;
            let currentDoorRPos = Transform.get(doorR).position;

            let targetDoorLPos = Vector3.add(currentDoorLPos, Vector3.create(openDoorOffset, 0, 0));
            let targetDoorRPos = Vector3.subtract(currentDoorRPos, Vector3.create(openDoorOffset, 0, 0));

            moveDoors(openDoorOffset);

            utils.timers.setTimeout(() => {
                utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, 2, utils.InterpolationType.EASEINSINE);
                utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, 2, utils.InterpolationType.EASEINSINE, () => {
                    // After opening, start closing animation
                    utils.timers.setTimeout(closeDoors, 2000);
                });
            }, 100); // Delay the starting of the animation slightly to ensure consistency
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

            if (Date.now() - lastDoorInteractionTime < 2000) return; // Adjust the cooldown time as needed
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

// Single sliding door
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

    AudioSource.create(doorParent, {
        audioClipUrl: doorSound,
        loop: false,
        playing: false
    })

    function moveDoor(offset: number) {
        isMovingSingle = true; // Set isMoving to true when translation starts

        let currentDoorPos = Transform.get(door).position;

        let targetDoorPos = Vector3.add(currentDoorPos, Vector3.create(offset - 0.01, 0, 0));

        // Play door sound
        let triggerAudio = AudioSource.playSound(doorParent, doorSound)
        utils.timers.setTimeout(() => playAudioAtPlayer(doorSound), 100)
        console.log('sound played')

        utils.tweens.startTranslation(door, currentDoorPos, targetDoorPos, 2, utils.InterpolationType.EASEINSINE, () => {
            isMovingSingle = false; // Set isMoving to false when translation ends
        });
    }

    function closeDoor() {
        if (isOpenSingle) {
            isOpenSingle = false;
            moveDoor(-openDoorOffset);
        }
    }


    function openDoor() {
        if (!isOpenSingle && !isMovingSingle && doorShouldOpen) {
            isOpenSingle = true;

            let currentDoorPos = Transform.get(door).position;

            let targetDoorPos = Vector3.add(currentDoorPos, Vector3.create(openDoorOffset, 0, 0));

            moveDoor(openDoorOffset);

            utils.timers.setTimeout(() => {
                utils.tweens.startTranslation(door, currentDoorPos, targetDoorPos, 4, utils.InterpolationType.EASEINSINE, () => {
                    // After opening, start closing animation
                    utils.timers.setTimeout(closeDoor, 2000);
                });
            }, 100); // Delay the starting of the animation slightly to ensure consistency
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

            if (Date.now() - lastDoorInteractionTime < 2000) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();

            doorShouldOpen = true;
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

// General door creation
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





