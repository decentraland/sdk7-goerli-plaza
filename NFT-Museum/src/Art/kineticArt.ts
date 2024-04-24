import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from "~system/RestrictedActions";
import { linktreeURL } from "../social";
import { audioType, toggleAudio } from "../audio";
import { artPositions } from "./artData";



// Paths to 3D models and animation names
const kineticArtCircles = 'models/3d-art/kineticArt-threeCircles.glb';
const kineticArtCirclesClip = 'play2'

const kineticArtCircuit = 'models/3d-art/kineticArt-circuit.glb'
const kineticArtCircuitClip = 'play3'

const truck = 'models/3d-art/truck.glb'
const cone = 'models/3d-art/cone.glb'


export const kineticArtCollection: KineticData[] = [

    {
        room: 1,
        id: 26,
        position: Vector3.create(artPositions[26].position.x, artPositions[26].position.y - 0.58, artPositions[26].position.z + 0.1),
        rotation: Quaternion.fromEulerDegrees(artPositions[26].rotation.x, artPositions[26].rotation.y, artPositions[26].rotation.z),
        scale: artPositions[26].scale,
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10),
        modelPath: truck,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 1,
        id: 27,
        position: Vector3.create(artPositions[27].position.x, artPositions[27].position.y - 0.58, artPositions[27].position.z - 0.1),
        rotation: Quaternion.fromEulerDegrees(artPositions[27].rotation.x, artPositions[27].rotation.y, artPositions[27].rotation.z),
        scale: artPositions[27].scale,
        triggerPosition: Vector3.create(0, 0, 0),
        triggerScale: Vector3.create(6, 5, 10),
        modelPath: cone,
        url: linktreeURL,
        hoverText: 'Click'
    },
    {
        room: 2,
        id: 28,
        position: artPositions[28].position,
        rotation: Quaternion.fromEulerDegrees(artPositions[28].rotation.x, artPositions[28].rotation.y, artPositions[28].rotation.z),
        scale: artPositions[28].scale,
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
        id: 29,
        position: artPositions[29].position,
        rotation: Quaternion.fromEulerDegrees(artPositions[29].rotation.x, artPositions[29].rotation.y, artPositions[29].rotation.z), // rotation
        scale: artPositions[29].scale,
        triggerPosition: Vector3.create(2, 0, 0),
        triggerScale: Vector3.create(10, 4, 10),
        modelPath: kineticArtCircuit,
        animationClip: kineticArtCircuitClip,
        audio: null,
        url: linktreeURL,
        hoverText: 'Click'
    }
]

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
        [{ type: 'box', position: triggerPosition, scale: triggerScale }],
        function (otherEntity) {
            if (audio) { toggleAudio(audioType) }
            if (animationClip !== null) { Animator.playSingleAnimation(entity, animationClip, false) }
        },
        function (anotherEntity) {
            if (audio) { toggleAudio(audioType) }
            if (animationClip !== null) { Animator.stopAllAnimations(entity, false) }
        })
    //utils.triggers.enableDebugDraw(true)
    return entity
}

export function openKineticLink(url: string) {
    openExternalUrl({ url: url });
}
