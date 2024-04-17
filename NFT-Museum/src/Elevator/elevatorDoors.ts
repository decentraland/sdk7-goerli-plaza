import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { closeDoorOffset, createDoorEntity, createSlidingDoors, doorLmodel, doorRmodel, fastDoorSound, openDoorOffset } from "../doors";
import { engine, Transform, AudioSource } from "@dcl/sdk/ecs";
import { playAudioAtPlayer } from "../Audio/audio";
import * as utils from '@dcl-sdk/utils';
import { currentFloor, setCurrentFloor } from "./elevatorState";




// Elevator doors 
export function createElevatorDoors(
    position: Vector3,
    rotation: Vector3,
    doorLmodel: string,
    doorRmodel: string,
    openDoorOffset: number,
    closeDoorOffset: number,
    floorIndex: number,
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

    // General door movement 
    function moveDoors(offset: number) {
        isMoving = true; // Set isMoving to true when translation starts

        let currentDoorLPos = Transform.get(doorL).position;
        let currentDoorRPos = Transform.get(doorR).position;

        let targetDoorLPos = Vector3.add(currentDoorLPos, Vector3.create(offset + 0.0001, 0, 0));
        let targetDoorRPos = Vector3.subtract(currentDoorRPos, Vector3.create(offset + 0.0001, 0, 0));

        if (currentFloor === floorIndex) {

            utils.timers.setTimeout(() => playAudioAtPlayer(fastDoorSound, 100), 100)
            console.log('sound played')


            utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, 2, utils.InterpolationType.EASEINSINE);
            utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, 2, utils.InterpolationType.EASEINSINE, () => {
                isMoving = false; // Set isMoving to false when translation ends
            });


        }
    }


    function closeDoors() {
        if (isOpen) {
            console.log('close doors')
            moveDoors(-openDoorOffset);
            isOpen = false;
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
                });
            }, 100); // Delay the starting of the animation slightly to ensure consistency
            utils.timers.setTimeout(closeDoors, 4000);

        }
    }



    utils.triggers.addTrigger(
        doorParent,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{
            type: 'box',
            position: { x: 0, y: 0, z: 0 },
            scale: { x: 3, y: 3.5, z: 3 }
        }],
        function (otherEntity) {

            if (Date.now() - lastDoorInteractionTime < 2000) return; // Adjust the cooldown time as needed
            lastDoorInteractionTime = Date.now();

            console.log(`floor index: ${floorIndex}, current floor: ${currentFloor}`);

            // Check if the elevator is present at the current floor
            if (floorIndex !== currentFloor) {
                console.log('cant open doors')
                return; // Do not open the doors if the elevator is not at the current floor
            }

            doorsShouldOpen = true;
            setCurrentFloor(floorIndex)
            if (doorsShouldOpen && !isOpen) {
                openDoors();
                doorsShouldOpen = false;
            }
        },
        function (anotherEntity) {

            if (!isOpen && floorIndex == currentFloor) {
                openDoors();
                console.log('open doors')
                doorsShouldOpen = false;
            }
        }
    );


    // Uncomment line below to see the trigger box
    // utils.triggers.enableDebugDraw(true);
}


export function initializeElevatorDoors() {
    // Elevator doors, west ground floor
    createElevatorDoors(
        Vector3.create(26.9, 2.1, 19.635),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset,
        0
    );

    // Elevator doors, west first floor
    createElevatorDoors(
        Vector3.create(26.9, 10.3, 19.635),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset,
        1,
    );

    // Elevator doors, east ground floor
    createElevatorDoors(
        Vector3.create(26.9, 2.1, 12.36),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset,
        0,
    );

    // Elevator doors, east first floor
    createElevatorDoors(
        Vector3.create(26.9, 10.3, 12.36),
        Vector3.create(0, 90, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset,
        1,
    );



}