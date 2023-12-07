import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'
import {
  Animator,
  AudioSource,
  AvatarAttach,
  GltfContainer,
  Material,
  Transform,
  VideoPlayer,
  VisibilityComponent,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { setupUi } from './ui'

// You can remove this if you don't use any asset packs
initAssetPacks(engine, pointerEventsSystem, {
  Animator,
  AudioSource,
  AvatarAttach,
  Transform,
  VisibilityComponent,
  GltfContainer,
  Material,
  VideoPlayer
})

export function main() {
  // UI with GitHub link
  setupUi()
}
