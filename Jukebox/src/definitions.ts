/////// Define song list

import { engine, Schemas } from "@dcl/sdk/ecs";

export type Song = { src: string; name: string }

export const songs: Song[] = [
  { src: 'sounds/Telemann.mp3', name: 'Telemann' },
  { src: 'sounds/Bach.mp3', name: 'Bach' },
  { src: 'sounds/Brahms.mp3', name: 'Brahms' },
  { src: 'sounds/Chopin.mp3', name: 'Chopin' }
]

enum CustomComponentIds {
  SongButton = 2002,
  MoveAnimation = 2003
}

export const SongButton = engine.defineComponent(
  {
    jukebox: Schemas.Entity
  },
  CustomComponentIds.SongButton
)

export const MoveAnimation = engine.defineComponent(
  {
    from: Schemas.Vector3,
    to: Schemas.Vector3,
    currentPosition: Schemas.Number,
    deltaMultiplier: Schemas.Number
  },
  CustomComponentIds.MoveAnimation
)
