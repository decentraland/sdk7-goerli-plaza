
import { Vector3, Quaternion } from '@dcl/sdk/math'
import {
    Animator, Entity, executeTask, MeshCollider,
    MeshRenderer, GltfContainer, Transform, PointerEvents, InputAction, PointerEventType, inputSystem, pointerEventsSystem,
    engine, AudioSource
} from '@dcl/sdk/ecs'
import { toggleUIVisibility, setupUi } from './ui';

import * as crypto from 'dcl-crypto-toolkit'


// NFT and token iDs to check 
const NFT_CONTRACT = crypto.contract.mainnet.Halloween2019Collection;
const TOKEN_IDS = [1, 2, 3, 4, 5];


// Door Entity
export const Door = engine.addEntity()
GltfContainer.create(Door, { src: 'models/door.glb' })
MeshRenderer.create(Door)
MeshCollider.create(Door)
Transform.create(Door, {
    position: Vector3.create(8, 0, 10),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
})

Animator.create(Door, {
    // Door states: closed, open
    states: [{
        clip: "Blank",
        playing: false,
        loop: false,
    }, {
        clip: "OpenDoor",
        playing: false,
        loop: false,
    }]
})

pointerEventsSystem.onPointerDown(
    {
        entity: Door,
        opts: { button: InputAction.IA_PRIMARY, hoverText: 'Eneter Club', maxDistance: 10 },

    },
    () => {
        checkNFTAndControlDoor();


    }
)


// Sounds
const acceptSound = engine.addEntity()
const rejectSound = engine.addEntity()
export const outsideSound = engine.addEntity()
const insideSound = engine.addEntity()

export function addAudio(entity: Entity, audioClipUrl: string) {
    AudioSource.create(entity, {
        audioClipUrl: audioClipUrl,
        playing: false,
        loop: false
    })
}

addAudio(acceptSound, 'sounds/accept.mp3')
addAudio(rejectSound, 'sounds/access_denied.mp3')
addAudio(insideSound, 'sounds/jazz.mp3')
addAudio(outsideSound, 'sounds/jazzMuffled.mp3')


export function playSound(entity: Entity, loop: boolean = false) {
    const audioSource = AudioSource.getMutable(entity);
    audioSource.playing = true;
    audioSource.loop = loop;
}

export function stopSound(entity: Entity) {
    const audioSource = AudioSource.getMutable(entity);
    audioSource.playing = false;
}

// play sound on startup 

playSound(outsideSound, true)

// NFT-check function 

async function checkNFTAndControlDoor() {
    let hasNFT = false;

    try {
        await executeTask(async () => {
            hasNFT = await crypto.nft.checkTokens(NFT_CONTRACT, TOKEN_IDS);
        });
    } catch (error) {
        console.log("Error checking NFTs:", error);
        playSound(rejectSound);
        toggleUIVisibility();
        return;
    }

    const doorAnimator = Animator.getMutable(Door);

    if (hasNFT) {
        // Open the door if the user has the NFT
        const openState = doorAnimator.states.find(state => state.clip === "OpenDoor");
        if (openState) {
            openState.playing = true;
            console.log("Opening animation");
            stopSound(outsideSound);
            playSound(insideSound, true);
        }
    } else {
        // Play reject sound and keep the door closed
        toggleUIVisibility();
        playSound(rejectSound);
    }
}

// Initialize Door State
Animator.getMutable(Door).states.forEach(state => state.playing = false)
