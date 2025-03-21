import * as utils from '@dcl-sdk/utils'
import { engine, Transform, MeshRenderer, VisibilityComponent } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { triggerEmote, triggerSceneEmote } from '~system/RestrictedActions'
// Example emotes array
const emotesToTrigger = [
  'emotes/Throw_emote.glb',
  'emotes/Pose_emote.glb'
  // ...more emotes
]
const basicEmotesToTrigger = [
  'robot',
  'wave',
  'money'
  // ...more emotes
]

let currentEmoteIndex = 0 // Initialize the current emote index
let isDancing = false // Flag to track if the player is dancing

export function createDanceArea(position: Vector3, scale: Vector3) {
  const myEntity = engine.addEntity()
  Transform.create(myEntity, {
    position: position,
    scale: scale
  })
  MeshRenderer.setBox(myEntity)

  ///MAKE TRUE FOR DEBUG
  VisibilityComponent.create(myEntity, { visible: false })

  ///REMEMBER TO MAKE THE TRIGGER POSITION AND SCALE = THE TRANSFORM POSITION AND SCALE!!
  utils.triggers.addTrigger(
    myEntity,
    1,
    1,
    [{ type: 'box', scale: scale, position: Vector3.create(0, 0, 0) }],
    function (otherEntity) {
      if (!isDancing) {
        isDancing = true
        currentEmoteIndex = 0
        triggerNextEmote()
        console.log('dancing')
      }
    },
    function (otherEntity) {
      if (isDancing) {
        isDancing = false
        console.log('noDance')
      }
    }
  )
}

export function createBasicDanceArea(position: Vector3, scale: Vector3) {
  const myEntity = engine.addEntity()
  Transform.create(myEntity, {
    position: position,
    scale: scale
  })
  MeshRenderer.setBox(myEntity)

  ///MAKE TRUE FOR DEBUG
  VisibilityComponent.create(myEntity, { visible: false })

  ///REMEMBER TO MAKE THE TRIGGER POSITION AND SCALE = THE TRANSFORM POSITION AND SCALE!!
  utils.triggers.addTrigger(
    myEntity,
    1,
    1,
    [{ type: 'box', scale: scale, position: Vector3.create(0, 0, 0) }],
    function (otherEntity) {
      if (!isDancing) {
        isDancing = true
        currentEmoteIndex = 0
        triggerBasicNextEmote()
        console.log('dancing')
      }
    },
    function (otherEntity) {
      if (isDancing) {
        isDancing = false
        console.log('noDance')
      }
    }
  )
}

export async function triggerNextEmote() {
  if (isDancing) {
    const emote = emotesToTrigger[currentEmoteIndex]
    await triggerSceneEmote({ src: emote, loop: false })

    // Move to the next emote or loop back to the beginning
    currentEmoteIndex = (currentEmoteIndex + 1) % emotesToTrigger.length

    // Trigger the next emote after a delay
    utils.timers.setTimeout(() => {
      triggerNextEmote()
    }, 3000) // Example delay of 3 second
  }
}

export async function triggerBasicNextEmote() {
  if (isDancing) {
    const emote = basicEmotesToTrigger[currentEmoteIndex]
    await triggerEmote({ predefinedEmote: emote })

    // Move to the next emote or loop back to the beginning
    currentEmoteIndex = (currentEmoteIndex + 1) % basicEmotesToTrigger.length

    // Trigger the next emote after a delay
    utils.timers.setTimeout(() => {
      triggerBasicNextEmote()
    }, 3000) // Example delay of 3 second
  }
}
