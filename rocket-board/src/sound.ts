import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine, Transform } from '@dcl/sdk/ecs'

//Create audio entity to play sound
const ringPass = engine.addEntity()

//Create audio source component
AudioSource.create(ringPass, {
  audioClipUrl: 'assets/scene/Audio/ringPass.mp3',
  loop: false,
  playing: false,
  volume: 1
})

// Attach to local player position
Transform.getOrCreateMutable(ringPass).parent = engine.PlayerEntity

//Create a function to play ringPass sound
export function playringPassSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(ringPass)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const rocketBooster = engine.addEntity()

//Create audio source component
AudioSource.create(rocketBooster, {
  audioClipUrl: 'assets/scene/Audio/rocketBooster.mp3',
  loop: true,
  playing: false,
  volume: 1
})

//Create a function to play rocketBooster sound
export function playrocketBoosterSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(rocketBooster)
  //Play the sound
  audioSource.playing = true
}

//Create a function to stop rocketBooster sound
export function stoprocketBoosterSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(rocketBooster)
  //Play the sound
  audioSource.playing = false
}
