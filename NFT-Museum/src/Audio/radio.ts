import { AudioStream } from "@dcl/sdk/ecs";
import { openExternalUrl } from "~system/RestrictedActions";
import { streamEntity } from "./playlist";


// This is the radio, set to true to play it 
//export let radioPlaying: boolean = true;

// House Radio (24 House Radio)

export function openRadio() {
  openExternalUrl({ url: "https://onlineradiobox.com/ro/24house/?cs=ro.24house" })
}
/*
export function toggleRadio() {
  
  radioPlaying = !radioPlaying;
  console.log('Radio playing', radioPlaying);
  
  if (!radioPlaying) {
    const audioStream = AudioStream.getMutable(streamEntity);
    audioStream.url = radioStation;
    audioStream.playing = false;
  } else {
    playRadio();
  }
}

export function setRadioPlaying(value: boolean) {
  radioPlaying = value;
}


export function playRadio() {
  if (radioPlaying) {
    const audioStream = AudioStream.getMutable(streamEntity);
    audioStream.url = radioStation;
    audioStream.playing = true;
  }
}
*/