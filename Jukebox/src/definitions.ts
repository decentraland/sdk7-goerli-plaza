/////// Define song list

import { engine, Schemas } from "@dcl/sdk/ecs";

export type Song = { src: string; name: string }

export const songs: Song[] = [
  { src: 'sounds/Telemann.mp3', name: 'Telemann' },
  { src: 'sounds/Bach.mp3', name: 'Bach' },
  { src: 'sounds/Brahms.mp3', name: 'Brahms' },
  { src: 'sounds/Chopin.mp3', name: 'Chopin' }
]


export const SongButton = engine.defineComponent(
  "SongButton",
  {
    jukebox: Schemas.Entity
  }
)

export const MoveAnimation = engine.defineComponent(
  "MoveAnimation",
  {
    from: Schemas.Vector3,
    to: Schemas.Vector3,
    currentPosition: Schemas.Number,
    deltaMultiplier: Schemas.Number
  }
)
