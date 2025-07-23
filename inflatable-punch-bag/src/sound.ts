import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine, Transform } from '@dcl/sdk/ecs'

//Create audio entity to play sound
const punch = engine.addEntity()

//Create audio source component
AudioSource.create(punch, {
  audioClipUrl: 'assets/scene/Audio/punch.mp3'
})

// Attach to local player position
Transform.getOrCreateMutable(punch).parent = engine.PlayerEntity

//Create a function to play punch sound
export function playpunchSound() {
  AudioSource.playSound(punch, 'assets/scene/Audio/punch.mp3')
}
