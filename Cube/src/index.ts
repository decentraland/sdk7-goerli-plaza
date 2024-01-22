import {
  Animator,
  AudioSource,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  pointerEventsSystem,
  Transform,
  VideoPlayer,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'

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

import { bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { BounceScaling, Spinner } from './components'
import { createCube } from './factory'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {
  // draw UI
  setupUi()

  // fetch cube from Inspector
  const cube = engine.getEntityOrNullByName('Magic Cube')
  if (cube) {
    // Give the cube a color
    Material.setPbrMaterial(cube, { albedoColor: Color4.Blue() })

    // Make the cube spin, with the circularSystem
    Spinner.create(cube, { speed: 10 })

    // Give the cube a collider, to make it clickable
    MeshCollider.setBox(cube)

    // Add a click behavior to the cube, spawning new cubes in random places, and adding a bouncy effect for feedback
    pointerEventsSystem.onPointerDown(
      { entity: cube, opts: { button: InputAction.IA_POINTER, hoverText: 'spawn' } },
      () => {
        createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
        BounceScaling.createOrReplace(cube)
      }
    )
  }
}
