import { ColliderLayer, engine, GltfContainer, Material, MeshCollider, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import {
  boxesCount,
  defaultMaterial,
  inmuneMaterial,
  MovingCube,
  rayDistance,
  rayMaterial,
  RayMesh
} from './definitions'
import movingCubesSystem from './modules/movingCubes'
import { createRaycast } from './modules/ray'
import { setupUi } from './ui'

export function main() {
  const floor = engine.addEntity()
  GltfContainer.create(floor, { src: 'models/Floor_sciFi_03.glb' })
  Transform.create(floor, {
    position: Vector3.create(16, 0, 16),
    scale: Vector3.create(2, 0, 2)
  })

  // laser turret
  const turretBase = engine.addEntity()
  GltfContainer.create(turretBase, { src: 'models/TurretBase_01.glb' })
  Transform.create(turretBase, {
    position: Vector3.create(16, 0, 2)
  })

  const turretEntity = engine.addEntity()
  GltfContainer.create(turretEntity, { src: 'models/Turret_01.glb' })
  Transform.create(turretEntity, {
    position: Vector3.create(16, 1, 2),
    rotation: Quaternion.fromEulerDegrees(0, 300, 0)
  })

  // turret constant rotation
  let rotationSpeed = 10
  engine.addSystem((deltaTime) => {
    const transform = Transform.getMutable(turretEntity)
    const currentRotation = Quaternion.toEulerAngles(transform.rotation)
    const yRotation = currentRotation.y + rotationSpeed * deltaTime
    transform.rotation = Quaternion.fromEulerDegrees(currentRotation.x, yRotation, currentRotation.z)

    if (
      (rotationSpeed < 0 && yRotation < 336 && yRotation > 300) ||
      (rotationSpeed > 0 && yRotation > 24 && yRotation < 300)
    )
      rotationSpeed *= -1
  })

  // Ray mesh
  const rayMeshEntity = engine.addEntity()
  MeshRenderer.setBox(rayMeshEntity)
  Transform.create(rayMeshEntity, {
    scale: Vector3.create(0.1, 0.1, rayDistance),
    position: Vector3.create(0, 0.645, rayDistance / 2 + 2),
    parent: turretEntity
  })
  Material.setPbrMaterial(rayMeshEntity, rayMaterial)
  RayMesh.create(rayMeshEntity)

  createRaycast(turretEntity, rayMeshEntity)

  // Moving cubes
  for (let i = 0; i < boxesCount; i++) {
    createCube(Vector3.create(2 + i * 3, 1.5, 16), true)
  }

  // Extra cubes with custom collision layer
  const customLayerCube1 = createCube(Vector3.create(16, 1.5, 20), false)
  MeshCollider.getMutable(customLayerCube1).collisionMask = ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_PHYSICS
  const customLayerCube2 = createCube(Vector3.create(16, 1.5, 24), false)
  MeshCollider.getMutable(customLayerCube2).collisionMask = ColliderLayer.CL_CUSTOM2
  Material.setPbrMaterial(customLayerCube2, inmuneMaterial)
  const customLayerCube3 = createCube(Vector3.create(16, 1.5, 28), false)
  MeshCollider.getMutable(customLayerCube3).collisionMask = ColliderLayer.CL_CUSTOM3

  engine.addSystem(movingCubesSystem)
  //engine.addSystem(raycastResultsSystem)

  function createCube(targetPosition: Vector3, movingCube: boolean) {
    const cube = engine.addEntity()
    Transform.create(cube, {
      position: targetPosition
    })
    MeshRenderer.setBox(cube)
    MeshCollider.setBox(cube)
    Material.setPbrMaterial(cube, defaultMaterial)
    if (movingCube) MovingCube.create(cube)

    return cube
  }

  // UI with GitHub link
  setupUi()
}
