import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, CameraModeArea, CameraType } from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils';
import { setCurrentFloor, currentFloor } from "./elevatorState";

// 3D models
const arrowsButton = 'models/elevator/arrows.glb';
const elevatorModel = 'models/elevator/elevator.glb';
const buttonModels = ['models/elevator/button1.glb', 'models/elevator/button2.glb', 'models/elevator/button3.glb'];



// Sounds
const callButtonSound = 'sounds/callButton.mp3'
const buttonSound = 'sounds/button.mp3';
const elevatorSound = 'sounds/elevatorHum.mp3';
const elevatorArrivalSound = 'sounds/elevatorPing.mp3';


// Stops
const floors = [
    { name: 'Ground Floor', height: 3.1 },
    { name: 'Second Floor', height: 11.45 },
    { name: 'Rooftop', height: 21.75 }
];

// Elevator buttons
const buttonPositionX = -28.935;
const buttonOffsetY = -0.005;
const buttonZpos1 = -20.7
const buttonZpos2 = -13.45
const buttonYOffsets = [0, 0.13, 0.28];


// Call buttons
const buttonPositions: Vector3[] = [
    Vector3.create(26.7725, 1.47, 16.02), // ground floor
    Vector3.create(26.3, 10.05, 16.02), // second floor
    Vector3.create(25.1, 19.975, 15.99)  // rooftop
];

// Elevator positions
const elevator1pos = Vector3.create(36.95 - 8, 3.1, 19.6)
const elevator1rot = Quaternion.fromEulerDegrees(0, -90, 0)
const elevator2pos = Vector3.create(28.95, 3.1, 12.35)
const elevator2rot = Quaternion.fromEulerDegrees(0, -90, 0)

let isMoving = false
let pathComplete = true;

function createElevator(position: Vector3, rotation: Quaternion) {
    const elevator = engine.addEntity();
    Transform.create(elevator, { position: position, rotation: rotation });
    GltfContainer.create(elevator, { src: elevatorModel, invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS });
    CameraModeArea.create(elevator, {
        area: Vector3.create(10, 30, 10),
        mode: CameraType.CT_FIRST_PERSON
    })
    return elevator;
}


function moveToFloor(entity: Entity, floorIndex: number) {

    if (isMoving) return;
    isMoving = true;

    const targetHeight = floors[floorIndex].height;
    const currentPosition1 = Transform.get(elevator).position;
    const currentPosition2 = Transform.get(elevator2).position;

    const targetPosition1 = Vector3.create(currentPosition1.x, targetHeight, currentPosition1.z);
    const targetPosition2 = Vector3.create(currentPosition2.x, targetHeight, currentPosition2.z);

    utils.playSound(elevatorSound, false, Transform.get(engine.PlayerEntity).position)
    pathComplete = false;
    setCurrentFloor(floorIndex);

    utils.tweens.startTranslation(elevator, currentPosition1, targetPosition1, 5, utils.InterpolationType.EASEOUTQUAD, () => {
        pathComplete = true;
        console.log('path complete');
        setCurrentFloor(floorIndex);
        console.log(`current floor: ${currentFloor} index: ${floorIndex}`);
        isMoving = false;
        utils.timers.setTimeout(() => {
            Transform.createOrReplace(elevator, { position: targetPosition1, rotation: elevator1rot })
            utils.playSound(elevatorArrivalSound, false, Transform.get(engine.PlayerEntity).position)
        }, 100)

    });

    utils.tweens.startTranslation(elevator2, currentPosition2, targetPosition2, 5, utils.InterpolationType.EASEOUTQUAD, () => {
        Transform.createOrReplace(elevator2, { position: targetPosition2, rotation: elevator2rot })
        utils.playSound(elevatorArrivalSound, false, Transform.get(engine.PlayerEntity).position)
            ;
    });

    if (pathComplete) { return }
}

function createElevatorButton(parent: Entity, position: Vector3, modelSrc: string, yOffset: number, index: number, doorsShouldOpen: boolean) {

    const button = engine.addEntity();
    const buttonPosition = Vector3.add(Transform.get(parent).position, position);
    Transform.create(button, {
        position: Vector3.create(buttonPosition.x, buttonPosition.y + yOffset, buttonPosition.z),
        parent: parent
    });

    GltfContainer.create(button, {
        src: modelSrc,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    });

    AudioSource.create(button, {
        audioClipUrl: buttonSound,
        playing: false,
        loop: false,
        volume: 100
    })

    Animator.create(button, {
        states: [
            {
                clip: "Push1",
                playing: false,
                loop: false
            }
        ]
    });

    pointerEventsSystem.onPointerDown(
        {
            entity: button,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `${floors[index].name}`,
                maxDistance: 15,
            },
        },
        () => {
            utils.playSound(buttonSound, false, Transform.get(engine.PlayerEntity).position);
            const animateButton = Animator.getClip(button, 'Push1');
            animateButton.playing = true;
            animateButton.loop = false;
            console.log(`Elevator button pressed: ${floors[index].name}`);
            moveToFloor(parent, index);
        }
    );
}

function initializeElevatorButtons(elevator: Entity, isLeftElevator: Boolean) {
    const buttons: Entity[] = [];
    const numFloors = floors.length;

    floors.forEach((_floor, index) => {

        const buttonPositionY = buttonOffsetY * (numFloors - index - 1);
        const currentElevator = isLeftElevator ? elevator : elevator2;
        const buttonZPOS = isLeftElevator ? buttonZpos1 : buttonZpos2;

        createElevatorButton(
            currentElevator,
            Vector3.create(buttonPositionX, buttonPositionY - 4.41, buttonZPOS),
            buttonModels[index],
            buttonYOffsets[index],
            index,
            true
        );
    });

    return buttons;
}

function createCallButton(position: Vector3, rotation: Vector3, floorIndex: number) {
    const callButton = engine.addEntity();
    Transform.create(callButton, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    });
    const audioSourceEntity = engine.addEntity();
    const audioSourcePosition = Vector3.create(position.x, position.y, position.z);
    Transform.create(audioSourceEntity, {
        position: audioSourcePosition,
    });
    AudioSource.create(audioSourceEntity, {
        audioClipUrl: callButtonSound,
        playing: false,
        loop: false,
        volume: 100
    })


    GltfContainer.create(callButton, {
        src: arrowsButton,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    });
    Animator.create(callButton, {
        states: [
            {
                clip: 'Push',
                playing: false,
                loop: false,
            }
        ]
    });


    pointerEventsSystem.onPointerDown(
        {
            entity: callButton,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `Call Elevator ${floors[floorIndex].name}`,
                maxDistance: 12,
            },
        },
        () => {
            utils.playSound(callButtonSound, false, Transform.get(engine.PlayerEntity).position)
            console.log('play call button sound')

            moveToFloor(elevator, floorIndex);
            moveToFloor(elevator2, floorIndex)
            Animator.playSingleAnimation(callButton, 'Push');
        }
    );
}

function initializeCallButtons() {
    buttonPositions.forEach((position, index) => {
        createCallButton(position, Vector3.create(0, -90, 0), index);
    });
}

const elevator = createElevator(elevator1pos, elevator1rot);
const elevator2 = createElevator(elevator2pos, elevator2rot);


initializeElevatorButtons(elevator, true);
initializeElevatorButtons(elevator2, false);
initializeCallButtons()

export const ElevatorModule = {
    createElevator,
    initializeElevatorButtons,
};
