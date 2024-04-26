import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { createGnark } from './gnark'

import { distanceSystem, walkAround } from './systems/gnarkAI'
import { setupUi } from './ui'

export function main() {
  const temple = engine.addEntity()

  Transform.create(temple, {
    position: Vector3.create(16, 0, 16),
    scale: Vector3.create(1.6, 1.6, 1.6)
  })

  GltfContainer.create(temple, {
    src: 'models/Temple.glb'
  })

  createGnark(0)
  createGnark(1)

  // UI with GitHub link
  setupUi()
}

engine.addSystem(walkAround)
engine.addSystem(distanceSystem)
