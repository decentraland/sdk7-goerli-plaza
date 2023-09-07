import { Billboard, GltfContainer, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

export function createScene4() {
  const scene4 = engine.addEntity()

  Transform.create(scene4, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  const plat = engine.addEntity()
  Transform.create(plat, {
    position: Vector3.create(16, 8, 16),
    rotation: Quaternion.fromEulerDegrees(0, 270, 0),
    scale: Vector3.create(8, 1, 8),
    parent: scene4
  })
  GltfContainer.create(plat, {
    src: 'models/Platform_Pirates_Alt.glb'
  })
  const toggleEntText = engine.addEntity()
  TextShape.create(toggleEntText, { text: 'Return to Ground \n to Change Scene', fontSize: 0.5 })
  Transform.create(toggleEntText, { position: Vector3.create(0, 2, 0), parent: plat })
  Billboard.create(toggleEntText, {})

  return scene4
}
