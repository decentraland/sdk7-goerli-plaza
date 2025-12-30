import { engine, executeTask, GltfContainer, Material, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createCoin } from './coin'
import { createSwitchBoard } from './switchboard'
import { setupUi } from './ui'

export function main() {
  // platform and rails
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'assets/scene/Models/baseLight.glb' })
  Transform.create(base, { scale: Vector3.create(2, 1, 1) })

  const platforms = engine.addEntity()
  GltfContainer.create(platforms, { src: 'assets/scene/Models/platforms.glb' })
  Transform.create(platforms)

  // coins
  createCoin('assets/scene/Models/starCoin.glb', Vector3.create(29, 6, 8), Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0))

  // Switchboard

  const switchboard = createSwitchBoard('assets/scene/Models/switchboard.glb', Vector3.create(8, 3, 8), Vector3.create(27, 3, 8))

  // UI with GitHub link
  setupUi()
}
