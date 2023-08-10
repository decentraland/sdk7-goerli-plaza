import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine } from "@dcl/sdk/ecs";

//Create audio entity to play sound
const punch = engine.addEntity();

//Create audio source component
AudioSource.create(punch, {
    audioClipUrl: "sounds/punch.mp3",
    loop: false,
    playing: false,
    volume: 1,
});

// Attach to local player position
AvatarAttach.create(punch, {
    anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
})

//Create a function to play punch sound
export function playpunchSound() {
    //Fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(punch)
    //Play the sound
    audioSource.playing = true
}