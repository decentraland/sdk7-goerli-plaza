import { AudioStream } from "@dcl/sdk/ecs";
import { openExternalUrl } from "~system/RestrictedActions";
import { streamEntity } from "./playlist";


// This is the radio, set to true to play it 
export let radioPlaying: boolean = false;

// House Radio (24 House Radio)
let radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'

export function toggleRadio() {
  console.log('Radio playing', radioPlaying);

  radioPlaying = !radioPlaying;

  if (radioPlaying) {
    playRadio();
  } else {
    const audioStream = AudioStream.getMutable(streamEntity);
    audioStream.url = radioStation;
    audioStream.playing = false;
  }
}

export function setRadioPlaying(value: boolean) {
  radioPlaying = value;
}

export function openRadio() {
  openExternalUrl({ url: "https://onlineradiobox.com/ro/24house/?cs=ro.24house" })
}

export function playRadio() {
  if (radioPlaying) {
    const audioStream = AudioStream.getMutable(streamEntity);
    audioStream.url = radioStation;
    audioStream.playing = true;
  }
}
