import { AudioStream, engine } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from "~system/RestrictedActions";

export const audioType: string = 'playlist' // 'radio' or 'playlist'


// Customise the playlist here:  
export const customPlaylist: Song[] = [
  { title: 'DCLMF23 Set', artist: 'RED ALBERT', duration: (60 * 60), url: 'https://bafybeigyzew44hkz46vzugd3plpovkboshdztv74vkmhhflz44477kmqte.ipfs.nftstorage.link/' },
  { title: 'MVFW23 Set', artist: 'RED ALBERT', duration: (60 * 60) + 1, url: 'https://bafybeicvyrgg6jnvpajfenbdspaevx4yydizslxdgmgd6f2y4tptpkzjpu.ipfs.nftstorage.link/' },
  { title: 'LPM x SOA Set 22', artist: 'RED ALBERT', duration: (59 * 60) + 57, url: 'https://bafybeihis46rooueupvj3dett2sz6745lq5od3x74hvmtfvvollsldr5vq.ipfs.nftstorage.link/' },
];

const playlistLink = "https://www.mixcloud.com/alberto-mart%C3%ADnez-cobos/uploads/"

export const radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'
const radioLink = "https://onlineradiobox.com/ro/24house/?cs=ro.24house"


type Song = {
  title: string;
  artist: string;
  url: string;
  duration: number;
};

let currentSongIndex = 0;
export let currentSong = customPlaylist[currentSongIndex];
export let nowPlayingElement = currentSong.title;
export let playingArtist = currentSong.artist;

export function createStream(streamUrl: string): Promise<void> {
  return new Promise((resolve) => {

    const audioEntity = engine.addEntity();
    AudioStream.create(audioEntity, {
      url: streamUrl,
      playing: true,
    });

    utils.timers.setTimeout(() => {
      resolve();
    }, 5000);
  });
}

interface AudioConfig {
  volume: number;
  isPlaying: boolean;
  streamUrl: string;
  currentSongIndex?: number;
  preset: 'radio' | 'playlist';
}

export const audioConfig: { [key: string]: AudioConfig } = {
  radio: {
    volume: 0.5,
    isPlaying: false,
    streamUrl: "https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720",
    preset: 'radio'
  },
  playlist: {
    volume: 0.3,
    isPlaying: false,
    streamUrl: customPlaylist[currentSongIndex].url,
    preset: 'playlist'

  }
};

export async function toggleAudio(name: string) {

  const config = audioConfig[name];
  config.isPlaying = !config.isPlaying;

  if (config.isPlaying) {
    if (name === 'playlist' && customPlaylist.length > 0) {
      config.currentSongIndex = 0;
      config.streamUrl = customPlaylist[0].url;
      await createStream(config.streamUrl);
      console.log(`Now playing song: ${customPlaylist[0].title}`);
    } else if (name === 'radio') {
      config.streamUrl = radioStation;
      await createStream(radioStation);
      console.log(`Now playing radio station`);
    }
  } else {
    delete config.currentSongIndex;
    config.streamUrl = '';
    console.log(`Audio stopped`);

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

export function skipSong() {
  if (currentSongIndex < customPlaylist.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }

  currentSong = customPlaylist[currentSongIndex];
  console.log(`Now playing song: ${customPlaylist[currentSongIndex].title}`);

  let audioEntities = engine.getEntitiesWith(AudioStream);
  for (const [entity] of audioEntities) {
    engine.removeEntity(entity);
  }
  createStream(customPlaylist[currentSongIndex].url);
}


export function openRadio() {
  openExternalUrl({ url: radioLink })
}

export function openMixcloud() {
  openExternalUrl({ url: playlistLink })
}

export function updateNowPlayingTitle(title: string, artist: string) {

  currentSong.title = title;
  currentSong.artist = artist;
  console.log(`Playing:\n ${currentSong.title}\n ${currentSong.artist}`)

  return { title: nowPlayingElement, artist: playingArtist }
}