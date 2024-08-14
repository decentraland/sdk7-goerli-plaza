import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine, Transform } from '@dcl/sdk/ecs'

//Create audio entity to play sound
const shotSilencer = engine.addEntity()

//Create audio source component
AudioSource.create(shotSilencer, {
  audioClipUrl: 'sounds/shotSilencer.mp3',
  loop: false,
  playing: false,
  volume: 1
})

// Attach to local player position
Transform.getOrCreateMutable(shotSilencer).parent = engine.PlayerEntity

//Create a function to play pickUp sound
export function playshotSilencerSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(shotSilencer)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const shotTin = engine.addEntity()

//Create audio source component
AudioSource.create(shotTin, {
  audioClipUrl: 'sounds/shotTin.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create a function to play throw sound
export function playshotTinSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(shotTin)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const shotWood = engine.addEntity()

//Create audio source component
AudioSource.create(shotWood, {
  audioClipUrl: 'sounds/shotWood.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create a function to play throw sound
export function playshotWoodSound() {
  //Fetch mutable version of audio source component
  const audioSource = AudioSource.getMutable(shotWood)
  //Play the sound
  audioSource.playing = true
}

//Create audio entity to play sound
const can01 = engine.addEntity()

//Create audio source component
AudioSource.create(can01, {
  audioClipUrl: 'sounds/can01.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create audio entity to play sound
const can02 = engine.addEntity()

//Create audio source component
AudioSource.create(can02, {
  audioClipUrl: 'sounds/can02.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create audio entity to play sound
const can03 = engine.addEntity()

//Create audio source component
AudioSource.create(can03, {
  audioClipUrl: 'sounds/can03.mp3',
  loop: false,
  playing: false,
  volume: 1
})

//Create a function to play a hit sound at random
export function playRandomHitSound() {
  //Fetch mutable version of audio source components
  const audioSource = [AudioSource.getMutable(can01), AudioSource.getMutable(can02), AudioSource.getMutable(can03)]
  //Get random number
  let randomTrackNo = Math.floor(Math.random() * 2)
  //Play the sound
  audioSource[randomTrackNo].playing = true
}
