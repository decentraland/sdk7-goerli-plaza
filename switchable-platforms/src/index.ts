import { engine, executeTask, GltfContainer, Material, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createCoin } from './coin'
import { createSwitchBoard } from './switchboard'

export function main() {
  // platform and rails
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'models/baseLight.glb' })
  Transform.create(base, { scale: Vector3.create(2, 1, 1) })

  const platforms = engine.addEntity()
  GltfContainer.create(platforms, { src: 'models/platforms.glb' })
  Transform.create(platforms)

  // coins
  createCoin('models/starCoin.glb', Vector3.create(29, 6, 8), Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0))

  // Switchboard

  const switchboard = createSwitchBoard('models/switchboard.glb', Vector3.create(8, 3, 8), Vector3.create(27, 3, 8))
}
