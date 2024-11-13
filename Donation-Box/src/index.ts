// We define the empty imports so the auto-complete feature works as expected.
import {Vector3,Quaternion } from '@dcl/sdk/math'
import { Animator, AudioSource, Entity, AvatarAttach, GltfContainer, Transform, VisibilityComponent, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'

import { buildScene } from './builder'

import { setupUi } from './ui'

function main(){

  buildScene()
  setupUi()
}

main()