import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, pointerEventsSystem, InputAction, TransformType } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { togglePlay } from "../Audio/audio";
import { artPosA, artPosB, artPosC, artPosD, artRotA, artRotB, artRotC, artRotD } from "./artPositions";
import { openExternalUrl } from "~system/RestrictedActions";
import { linktreeURL } from "../social";

// Paths to 3D models and animation names
const kineticArtCircles = 'models/3d-art/kineticArt-threeCircles.glb';
const kineticArtCirclesClip = 'play2'

const kineticArtCircuit = 'models/3d-art/kineticArt-circuit.glb'
const kineticArtCircuitClip = 'play3'

const truck = 'models/3d-art/truck.glb'

const cone = 'models/3d-art/cone.glb'

export type KineticData = {
    room: number
    id: number
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    triggerPosition: Vector3
    triggerScale: Vector3
    modelPath: string
    animationClip?: string | null
    audio?: string | null
    url: string
    hoverText: string
}

export const kineticArtCollection: KineticData[] = [

    {
        room: 1,
        id: 27,
        position: Vector3.create(artPosA.x, artPosA.y - 0.58, artPosA.z + 0.1),
        rotation: Quaternion.fromEulerDegrees(artRotA.x, artRotA.y, artRotA.z),
        scale: Vector3.create(0.5, 0.5, 0.5),
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10),
        modelPath: truck,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 1,
        id: 28,
        position: Vector3.create(artPosB.x + 0, artPosB.y - 0.58, artPosB.z - 0.1),
        rotation: Quaternion.fromEulerDegrees(artRotB.x, artRotB.y, artRotB.z),
        scale: Vector3.create(0.75, 0.75, 0.75),
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10),
        modelPath: cone,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 2,
        id: 29,
        position: artPosC,
        rotation: Quaternion.fromEulerDegrees(artRotC.x, artRotC.y, artRotC.z),
        scale: Vector3.create(0.5, 0.5, 0.5),
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10),
        modelPath: kineticArtCircles,
        animationClip: kineticArtCirclesClip,
        audio: null,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 2,
        id: 30,
        position: artPosD,
        rotation: Quaternion.fromEulerDegrees(artRotD.x, artRotD.y, artRotD.z), // rotation
        scale: Vector3.create(0.8, 0.8, 0.8),
        triggerPosition: Vector3.create(2, 0, 0),
        triggerScale: Vector3.create(10, 4, 10),
        modelPath: kineticArtCircuit,
        animationClip: kineticArtCircuitClip,
        audio: null,
        url: linktreeURL,
        hoverText: 'Click'
    }
]



export function createKineticArt(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    triggerPosition: Vector3,
    triggerScale: Vector3,
    modelPath: string,
    animationClip: string | null = null, // optional parameter to add an animation clip
    audio: string | null = null, // optional parameter to add sound
    url: string,
    hoverText: string
) {

    let entity = engine.addEntity();
    Transform.create(entity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale
    })

    GltfContainer.create(entity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    pointerEventsSystem.onPointerDown(
        {
            entity: entity,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: hoverText,
            },
        },
        function () {
            console.log('clicked artwork');
            openExternalUrl({
                url: url,
            });
        }
    );
    if (animationClip !== null) {
        Animator.create(entity, {
            states: [
                {
                    clip: animationClip,
                    playing: false,
                    loop: true
                }
            ]
        })
    }


    utils.triggers.addTrigger(
        entity,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{
            type: 'box',
            position: triggerPosition,
            scale: triggerScale
        }],
        function (otherEntity) {
            if (audio) {
                togglePlay()
                utils.playSound(audio, false, Transform.get(engine.PlayerEntity).position)
            }
            if (animationClip !== null) {
                let animateArt = Animator.playSingleAnimation(entity, animationClip, false)
            }
        },
        function (anotherEntity) {
            if (audio) {
                togglePlay()
            }
            if (animationClip !== null) {
                let stopAnim = Animator.stopAllAnimations(entity, false)
            }
        })
    //utils.triggers.enableDebugDraw(true)
    return entity
}


