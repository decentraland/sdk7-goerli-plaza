import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine } from '@dcl/sdk/ecs'

//Create audio entity to play sound
const punch = engine.addEntity()

//Create audio source component
AudioSource.create(punch, {
  audioClipUrl: 'sounds/punch.mp3'
})

// Attach to local player position
AvatarAttach.create(punch, {
  anchorPointId: AvatarAnchorPointType.AAPT_POSITION
})

//Create a function to play punch sound
export function playpunchSound() {
  AudioSource.playSound(punch, 'sounds/punch.mp3')
}
