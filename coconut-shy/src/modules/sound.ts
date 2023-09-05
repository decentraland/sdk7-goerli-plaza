import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine } from '@dcl/sdk/ecs'

//Create audio entity to play sound
const pickUp = engine.addEntity()

//Create audio source component
AudioSource.create(pickUp, {
  audioClipUrl: 'sounds/pickUp.mp3',
  loop: false,
  playing: false,
  volume: 1
})

// Attach to local player position
AvatarAttach.create(pickUp, {
  anchorPointId: AvatarAnchorPointType.AAPT_POSITION
})

//Create a function to play pickUp sound
export function playPickUpSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(pickUp)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const throwSound = engine.addEntity()

//Create audio source component
AudioSource.create(throwSound, {
  audioClipUrl: 'sounds/throw.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create a function to play throw sound
export function playthrowSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(throwSound)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const hit01 = engine.addEntity()

//Create audio source component
AudioSource.create(hit01, {
  audioClipUrl: 'sounds/hit01.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create audio entity to play sound
const hit02 = engine.addEntity()

//Create audio source component
AudioSource.create(hit02, {
  audioClipUrl: 'sounds/hit02.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create audio entity to play sound
const hit03 = engine.addEntity()

//Create audio source component
AudioSource.create(hit03, {
  audioClipUrl: 'sounds/hit03.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create a function to play a hit sound at random
export function playRandomHitSound() {
  //Fetch mutable version of audio source components
  const audioSource = [AudioSource.getMutable(hit01), AudioSource.getMutable(hit02), AudioSource.getMutable(hit03)]
  //Get random number
  let randomTrackNo = Math.floor(Math.random() * 2)
  //Play the sound
  audioSource[randomTrackNo].playing = true
}
