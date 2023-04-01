import { engine, GltfContainer, Material, MeshCollider, MeshRenderer, Transform, ColliderLayer } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { boxesCount, defaultMaterial, MovingCube, Ray, rayDistance, rayMaterial, RayMesh } from './definitions'
import movingCubesSystem from './modules/movingCubes'
import { raycastResultsSystem, createRaycast } from './modules/ray'

export * from '@dcl/sdk'

function createCube(targetPosition: Vector3, movingCube: boolean)
{
  const cube = engine.addEntity()
  Transform.create(cube, {
    position: targetPosition
  })
  MeshRenderer.setBox(cube)
  MeshCollider.setBox(cube)
  Material.setPbrMaterial(cube, defaultMaterial)
  if(movingCube)
    MovingCube.create(cube)
  
  return cube
}

function setup() {
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

  const turret = engine.addEntity()
  GltfContainer.create(turret, { src: 'models/Turret_01.glb' })
  Transform.create(turret, {
    position: Vector3.create(16, 1, 2),
	rotation: Quaternion.fromEulerDegrees(0,0,0)
  })
  Ray.create(turret, {
    power: 30
  })
  createRaycast(turret)

  // Ray mesh
  const rayMesh = engine.addEntity()
  MeshRenderer.setBox(rayMesh)
  Transform.create(rayMesh, {
    scale: Vector3.create(0.1, 0.1, rayDistance),
    position: Vector3.create(16, 1.645, rayDistance / 2 + 2)
  })
  Material.setPbrMaterial(rayMesh, rayMaterial)
  RayMesh.create(rayMesh)

  // Moving cubes
  for (let i = 0; i < boxesCount; i++) {
    createCube(Vector3.create(2 + i * 3, 1.5, 16), true)
  }
  
  // Extra cubes with custom collision layer
  const customLayerCube1 = createCube(Vector3.create(16, 1.5, 20), false)
  MeshCollider.getMutable(customLayerCube1).collisionMask = ColliderLayer.CL_CUSTOM1
  const customLayerCube2 = createCube(Vector3.create(16, 1.5, 24), false)
  MeshCollider.getMutable(customLayerCube2).collisionMask = ColliderLayer.CL_CUSTOM2
  const customLayerCube3 = createCube(Vector3.create(16, 1.5, 28), false)
  MeshCollider.getMutable(customLayerCube3).collisionMask = ColliderLayer.CL_CUSTOM3
  

  engine.addSystem(movingCubesSystem)
  engine.addSystem(raycastResultsSystem)
}

setup()
