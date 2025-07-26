import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createZombie } from './modules/zombie'
import { setupUi } from './ui'

export function main() {
  // Instantiate base model
  const baseModelEntity = engine.addEntity()
  Transform.create(baseModelEntity, {
    scale: Vector3.create(2, 1, 2)
  })
  GltfContainer.create(baseModelEntity, {
    src: 'assets/scene/Models/baseLight.glb'
  })

  createZombie(Vector3.create(1 + Math.random() * 30, 0.933, 1 + Math.random() * 30))

  createZombie(Vector3.create(1 + Math.random() * 30, 0.933, 1 + Math.random() * 30))

  // UI with GitHub link
  setupUi()
}
