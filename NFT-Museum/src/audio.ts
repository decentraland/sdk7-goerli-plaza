import { AudioStream, engine } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from "~system/RestrictedActions";

export const audioType: string = 'radio' // 'radio' or 'playlist'


// House Radio (24 House Radio)
export const radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'
const radioLink = "https://onlineradiobox.com/ro/24house/?cs=ro.24house"



// Red Albert Playlist
export const customPlaylist: Song[] = [
  { title: 'DCLMF23 Set', artist: 'RED ALBERT', duration: (60 * 60), url: 'https://bafybeigyzew44hkz46vzugd3plpovkboshdztv74vkmhhflz44477kmqte.ipfs.nftstorage.link/' },
  { title: 'MVFW23 Set', artist: 'RED ALBERT', duration: (60 * 60) + 1, url: 'https://bafybeicvyrgg6jnvpajfenbdspaevx4yydizslxdgmgd6f2y4tptpkzjpu.ipfs.nftstorage.link/' },
  { title: 'LPM x SOA Set 22', artist: 'RED ALBERT', duration: (59 * 60) + 57, url: 'https://bafybeihis46rooueupvj3dett2sz6745lq5od3x74hvmtfvvollsldr5vq.ipfs.nftstorage.link/' },
];
const playlistLink = "https://www.mixcloud.com/alberto-mart%C3%ADnez-cobos/uploads/"



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
      volume: 0.1
    });

    utils.timers.setTimeout(() => {
      resolve();
    }, 5000);
  });
}

interface AudioConfig {
  isPlaying: boolean;
  streamUrl: string;
  currentSongIndex?: number;
  preset: 'radio' | 'playlist';
}

export const audioConfig: { [key: string]: AudioConfig } = {
  radio: {
    isPlaying: false,
    streamUrl: "https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720",
    preset: 'radio'
  },
  playlist: {
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
       createStream(config.streamUrl);
      console.log(`Now playing song: ${customPlaylist[0].title}`);
    }
    else if (name === 'radio') {
      config.streamUrl = radioStation;
       createStream(radioStation);
      console.log(`Now playing radio station`);
    }
  } else if (!config.isPlaying) {
    delete config.currentSongIndex;
    config.streamUrl = '';
    config.isPlaying = false
    audioConfig[audioType].isPlaying = false;
    console.log(`Audio stopped`);

    let audioEntities = engine.getEntitiesWith(AudioStream);
    for (const [entity] of audioEntities) {
      AudioStream.getMutable(entity).playing = false;
    }
  }
}

export function isPlaying(name: string): boolean {
  return audioConfig[name].isPlaying;
}

export async function skipSong() {
  if (currentSongIndex < customPlaylist.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  currentSong = customPlaylist[currentSongIndex];
  
  let audioEntities = engine.getEntitiesWith(AudioStream);
  for (const [entity] of audioEntities) {
    AudioStream.deleteFrom(entity)
    engine.removeEntity(entity);
  }
  await createStream(customPlaylist[currentSongIndex].url);
  console.log(`Now playing song: ${customPlaylist[currentSongIndex].title}`);
}

export async function prevSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = customPlaylist.length - 1;
  }
  currentSong = customPlaylist[currentSongIndex];
  
  let audioEntities = engine.getEntitiesWith(AudioStream);
  for (const [entity] of audioEntities) {
    engine.removeEntity(entity);
  }
  await createStream(customPlaylist[currentSongIndex].url);
  console.log(`Now playing song: ${customPlaylist[currentSongIndex].title}`);
}

export function openRadioLink() {
  openExternalUrl({ url: radioLink })
}

export function openPlaylistLink() {
  openExternalUrl({ url: playlistLink })
}

export function updateNowPlayingTitle(title: string, artist: string) {
  currentSong.title = title;
  currentSong.artist = artist;
  console.log(`Playing:\n ${currentSong.title}\n ${currentSong.artist}`)

  return { title: nowPlayingElement, artist: playingArtist }
}