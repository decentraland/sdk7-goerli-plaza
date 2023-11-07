import { createBoundaryMarkers, createBoundaryPlanes, initBoidController } from './boids/setupBoids'
import { initBoidSystem, startBoidSystem } from './boidSystem'
import { createDebugUIButtons } from './ui/ui-hud-debugger'
import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { createShark } from './shark'
import { PatrolPath } from './systems/move'
import { setupUi } from './ui/ui'

export function main() {
  const seaBed = engine.addEntity()
  Transform.create(seaBed, {
    position: { x: 8, y: 0, z: 8 },
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: { x: 0.8, y: 0.8, z: 0.8 }
  })
  GltfContainer.create(seaBed, {
    src: 'models/Underwater.gltf'
  })

  const seaBed2 = engine.addEntity()
  Transform.create(seaBed2, {
    position: { x: 8, y: 0, z: 24 },
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: { x: 0.8, y: 0.8, z: 0.8 }
  })
  GltfContainer.create(seaBed2, {
    src: 'models/Underwater.gltf'
  })

  initBoidController()
  initBoidSystem()

  createDebugUIButtons()

  startBoidSystem()

  createBoundaryPlanes()
  createBoundaryMarkers()

  createShark()

  engine.addSystem(PatrolPath)

  // UI with GitHub link
  setupUi()
}
