import { engine, Material, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

import {
  rayDistance,
  RayMesh
} from './definitions'

export function main() {
  function createRay(positionX: number, positionY: number, colorAlbedo: Color4, colorEmissive?: Color4, intensityEmissive?: number) {
    const rayMeshEntity = engine.addEntity()
    MeshRenderer.setBox(rayMeshEntity)
    Transform.create(rayMeshEntity, {
      scale: Vector3.create(0.1, 0.1, rayDistance),
      position: Vector3.create(positionX, positionY, 0)
    })

    Material.setPbrMaterial(rayMeshEntity, {
      albedoColor: colorAlbedo,
      emissiveColor: colorEmissive,
      emissiveIntensity: intensityEmissive
    })
    RayMesh.create(rayMeshEntity)
    return rayMeshEntity
  }

  //emissive 1, 2, 3, 4, 5, 10, 15, 30, 50, 75, 100

  let posY = 0

  createRay(0, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 1)
  createRay(2, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 2)
  createRay(4, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 3)
  createRay(6, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 4)
  createRay(8, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 5)
  createRay(10, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 10)
  createRay(12, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 15)
  createRay(14, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 30)
  createRay(16, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 50)
  createRay(18, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 75)
  createRay(20, posY, Color4.create(1, 0, 0), Color4.create(1, 0, 1), 100)

  posY = 4

  createRay(0, posY, Color4.create(1, 0, 0))
  createRay(2, posY, Color4.create(2, 0, 0))
  createRay(4, posY, Color4.create(3, 0, 0))
  createRay(6, posY, Color4.create(4, 0, 0))
  createRay(8, posY, Color4.create(5, 0, 0))
  createRay(10, posY, Color4.create(10, 0, 0))
  createRay(12, posY, Color4.create(15, 0, 0))
  createRay(14, posY, Color4.create(30, 0, 0))
  createRay(16, posY, Color4.create(50, 0, 0))
  createRay(18, posY, Color4.create(75, 0, 0))
  createRay(20, posY, Color4.create(100, 100, 0))
}
