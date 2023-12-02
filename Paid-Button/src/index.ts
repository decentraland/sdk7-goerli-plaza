// We define the empty imports so the auto-complete feature works as expected.
import { } from '@dcl/sdk/math'
import { Animator, AudioSource, AvatarAttach, GltfContainer, Transform, VisibilityComponent, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'

import { buildScene } from './builder'
import { Paid_Button,Door } from './uiButton' 

export function main() {
  buildScene()     // 3d models 
  Door            // door with animation and sound 
  Paid_Button    // paid button with ui animation and sound
}

main()