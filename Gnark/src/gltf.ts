import { Entity, engine, Transform, GltfContainer } from "@dcl/sdk/ecs";

export function createGLTF(
  transform: {
    position: { x: number; y: number; z: number }
    scale: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number; w: number }
  },
  model: string
): Entity {
  const gltf = engine.addEntity()

  Transform.create(gltf, transform)

  GltfContainer.create(gltf, {
    src: model
  })

  return gltf
}
