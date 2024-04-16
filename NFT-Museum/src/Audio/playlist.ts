import { engine, AudioStream } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { openExternalUrl } from "~system/RestrictedActions";




/// This is the Playlist, set to false to remove it
export let streamPlayingRef: { value: boolean } = { value: false }; // Set an initial value

///// PLAYLIST

type Song = {
  title: string;
  artist: string;
  url: string;
  duration: number; // Duration in seconds
};


// Adjust song titles, artists, durations and stream links or audio paths here 
export const playlist: Song[] = [
  { title: 'DCLMF23 Set', artist: 'RED ALBERT', duration: (60 * 60), url: 'https://bafybeigyzew44hkz46vzugd3plpovkboshdztv74vkmhhflz44477kmqte.ipfs.nftstorage.link/' },
  { title: 'MVFW23 Set', artist: 'RED ALBERT', duration: (60 * 60) + 1, url: 'https://bafybeicvyrgg6jnvpajfenbdspaevx4yydizslxdgmgd6f2y4tptpkzjpu.ipfs.nftstorage.link/' },
  { title: 'LPM x SOA Set 22', artist: 'RED ALBERT', duration: (59 * 60) + 57, url: 'https://bafybeihis46rooueupvj3dett2sz6745lq5od3x74hvmtfvvollsldr5vq.ipfs.nftstorage.link/' },

];


// Update the value of streamPlayingRef when necessary
export function updateStreamPlaying(value: boolean) {
  streamPlayingRef.value = value;
}

export function togglePlaylist() {
  const stream = AudioStream.getMutable(streamEntity);

  // Toggle the playing state of the audio stream
  stream.playing = !stream.playing;

  // Update the value of streamPlayingRef based on the new state
  streamPlayingRef.value = stream.playing;

  console.log('After toggle:', streamPlayingRef.value);
}

export function playPlaylist() {
  const stream = AudioStream.getMutable(streamEntity);

  stream.playing = true
  streamPlayingRef.value = stream.playing;

  console.log('After toggle:', streamPlayingRef.value);
}

export function openMixcloud() {
  openExternalUrl({ url: "https://www.mixcloud.com/alberto-mart%C3%ADnez-cobos/uploads/" })
}



let currentSongIndex = 0;
export const currentSong = playlist[currentSongIndex];
export let nowPlayingElement = currentSong.title;
export let playingArtist = currentSong.artist;
export let updateTitle = nowPlayingElement

export function updateNowPlayingTitle(title: string, artist: string) {


  console.log('Before Update:', playlist[currentSongIndex]);
  currentSong.title = title;
  currentSong.artist = artist;
  console.log(`Playing:\n ${currentSong.title}\n ${currentSong.artist}`)

  console.log('After Update:', playlist[currentSongIndex]);

  return { title: nowPlayingElement, artist: playingArtist }
}

// Shuffle the playlist
export function shufflePlaylist(playlist: Song[]) {
  if (!playlist || !playlist.length) {
    console.error("Playlist is empty or undefined");
    return;
  }
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
  }
}

export const streamEntity = engine.addEntity();
AudioStream.create(streamEntity, {
  url: "",
  playing: false,
  volume: 0.8
});


// Play the current song
export function playCurrentSong() {
  console.log('Playing current song:', currentSong.title);
  if (currentSongIndex < playlist.length) {
    const currentSong = playlist[currentSongIndex];
    const audioStream = AudioStream.getMutable(streamEntity);
    const currentArtist = currentSong.artist;
    const currentTitle = currentSong.title;

    audioStream.url = currentSong.url;
    audioStream.playing = true;

    utils.timers.setTimeout(() => {
      audioStream.playing = false;
      currentSongIndex++;
      if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
      }
      playCurrentSong();
      updateNowPlayingTitle(currentTitle, currentArtist);

    }, currentSong.duration * 1000);
  }
}


export function skipSong() {
  if (currentSongIndex < playlist.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  playCurrentSong();
}
