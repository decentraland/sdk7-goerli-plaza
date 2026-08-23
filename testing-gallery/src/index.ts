import { engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { pointerVideoSystem, postColliderSystem } from './helper/window-post'
import { testGltfs } from './test/gltf'
import { testMaterial } from './test/material'
import { testMeshes } from './test/mesh'
import { testAvatarShape } from './test/avatar_shape'

export function main() {
  engine.addSystem(postColliderSystem)
  engine.addSystem(pointerVideoSystem)
  testGltfs(Vector3.create(1, 1, 12))
  testMeshes(Vector3.create(5, 1, 12))
  testMaterial(Vector3.create(9, 1, 12))
  testAvatarShape(Vector3.create(13, 1, 12))
}