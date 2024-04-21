import { AudioStream, engine } from "@dcl/sdk/ecs";
import { playlist } from "./playlist";
import * as utils from '@dcl-sdk/utils';


export const radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'


export function createStream(streamUrl: string): Promise<void> {
  return new Promise((resolve) => {
    const audioEntity = engine.addEntity();
    AudioStream.create(audioEntity, {
      url: streamUrl,
      playing: true,
    });
    console.log('stream created');

    utils.timers.setTimeout(() => {
      resolve();
    }, 1000); 
  });
}




interface AudioConfig {
  volume: number;
  isPlaying: boolean;
  streamUrl: string;
  currentSongIndex?: number;
}

export const audioConfig: { [key: string]: AudioConfig } = {
  radio: {
    volume: 0.5,
    isPlaying: false,
    streamUrl: "https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720"
  },
  playlist: {
    volume: 0.3,
    isPlaying: false,
    streamUrl: ""
  }
};

export async function toggleAudio(name: string) {
  const config = audioConfig[name];
  config.isPlaying = !config.isPlaying;

  if (config.isPlaying) {
    config.currentSongIndex = 0;

    if (name === 'playlist' && playlist.length > 0) {
      config.streamUrl = playlist[0].url;
    }

    if (name === 'radio') {
      config.streamUrl = radioStation;
      await createStream(radioStation); // Wait for the stream to be ready
      console.log(`audio config is playing ${config.isPlaying}`);
    }
  } else {
    delete config.currentSongIndex;
    config.streamUrl = '';
    console.log(`audio config is playing ${config.isPlaying}`);
    
    let audioEntities = engine.getEntitiesWith(AudioStream);
    for (const [entity] of audioEntities) {
      engine.removeEntity(entity);
    }
  }
}



export function setVolume(name: string, volume: number) {
  audioConfig[name].volume = volume;
}

export function isPlaying(name: string): boolean {
  return audioConfig[name].isPlaying;
}
