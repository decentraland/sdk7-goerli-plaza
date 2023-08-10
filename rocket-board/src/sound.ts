import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine } from "@dcl/sdk/ecs";

//Create audio entity to play sound
const ringPass = engine.addEntity();

//Create audio source component
AudioSource.create(ringPass, {
    audioClipUrl: "sounds/ringPass.mp3",
    loop: false,
    playing: false,
    volume: 1,
});

// Attach to local player position
AvatarAttach.create(ringPass, {
    anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
})

//Create a function to play ringPass sound
export function playringPassSound() {
    //Fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(ringPass)
    //Play the sound
    audioSource.playing = true
}


//Create audio entity to play sound
const rocketBooster = engine.addEntity();

//Create audio source component
AudioSource.create(rocketBooster, {
    audioClipUrl: "sounds/rocketBooster.mp3",
    loop: true,
    playing: false,
    volume: 1,
});

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