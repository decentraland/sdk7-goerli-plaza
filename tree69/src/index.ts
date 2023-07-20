import { engine, Transform, GltfContainer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

const createTree = (src: string, position: Vector3) => {
  const tree = engine.addEntity()
  GltfContainer.create(tree, {
    src
  })
  Transform.create(tree, {
    position,
    scale: Vector3.create(1.0, 1.0, 1.0)
  })
}

createTree('models/tree69.glb', Vector3.create(4.0, 2.5, 4.0))
createTree('models/tree69.glb', Vector3.create(4.0, 2.5, 12.0))
createTree('models/tree69.glb', Vector3.create(12.0, 2.5, 4.0))
createTree('models/tree69.glb', Vector3.create(12.0, 2.5, 12.0))
