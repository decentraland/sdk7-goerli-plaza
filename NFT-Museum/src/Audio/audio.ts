
import { engine, Entity, AvatarAttach, AvatarAnchorPointType, AudioSource } from "@dcl/sdk/ecs";
import { playPlaylist, togglePlaylist } from "./playlist";
import { playRadio, toggleRadio } from "./radio";

/// This is the Playlist, set to false to remove it
export let Playlist: Boolean = true;


// This is the radio, set to true to play it 
export let radioPlaying: boolean = false;


// Function to set the radio state
export function setRadioPlaying(value: boolean) {
  radioPlaying = value;
}



// Global variable to store the audio entity
let audioEntity: Entity | null = null;

// Function to get the state of stream playing
let isStreamPlaying = () => Playlist;

// Function to get the state of radio playing
let isRadioPlaying = () => radioPlaying;

// Variables to store the previous state of playlist and radio
let prevPlaylist: boolean = false;
let prevRadio: boolean = false;

// Function to toggle between stream and radio playing
export function togglePlay() {
  const streamPlaying = isStreamPlaying();
  const radioPlaying = isRadioPlaying();
  console.log('toggle audio');

  if (streamPlaying) {
    togglePlaylist();
    prevPlaylist = true;
    prevRadio = false;
    console.log(`playlist playing: ${streamPlaying}`);
  }

  if (radioPlaying) {
    toggleRadio();
    prevRadio = true;
    prevPlaylist = false;
  }

  // If neither stream nor radio were playing, play the previously active source
  if (!streamPlaying && !radioPlaying) {
    if (prevPlaylist) {
      playPlaylist();
    } else if (prevRadio) {
      playRadio();
    }
  }
}

// Global function to play an audio clip at the player's location
export function playAudioAtPlayer(audioClipUrl: string, volume: number = 1) {
  if (!audioEntity) {
    audioEntity = engine.addEntity();
    AvatarAttach.create(audioEntity, {
      anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
    });
    AudioSource.createOrReplace(audioEntity, {
      audioClipUrl: audioClipUrl,
      loop: false,
      volume: volume
    });
  }
  AudioSource.playSound(audioEntity, audioClipUrl, true);
  console.log('Audio played at player location:', audioClipUrl);
}
