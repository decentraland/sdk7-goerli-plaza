/////// Define song list

import { engine, Schemas } from '@dcl/sdk/ecs'

export type Song = { src: string; name: string }

export const songs: Song[] = [
  { src: 'assets/scene/Audio/Telemann.mp3', name: 'Telemann' },
  { src: 'assets/scene/Audio/Bach.mp3', name: 'Bach' },
  { src: 'assets/scene/Audio/Brahms.mp3', name: 'Brahms' },
  { src: 'assets/scene/Audio/Chopin.mp3', name: 'Chopin' }
]

export const SongButton = engine.defineComponent('SongButton', {
  jukebox: Schemas.Entity
})
