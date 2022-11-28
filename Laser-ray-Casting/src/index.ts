import { engine, GltfContainer, Material, MeshCollider, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { boxesCount, defaultMaterial, MovingCube, Ray, rayDistance, rayMaterial } from './definitions'
import movingCubesSystem from './modules/movingCubes'
import raycastSystem from './modules/ray'

export * from '@dcl/sdk'

function setup() {
  // laser turret
  const turretBase = engine.addEntity()
  GltfContainer.create(turretBase, { src: 'models/TurretBase_01.glb' })
  Transform.create(turretBase, {
    position: Vector3.create(16, 0, 2)
  })

  const turret = engine.addEntity()
  GltfContainer.create(turret, { src: 'models/Turret_01.glb' })
  Transform.create(turret, {
    position: Vector3.create(16, 1, 2)
  })
  Ray.create(turret, {
    power: 1000
  })

  // Ray
  const rayCube = engine.addEntity()
  Transform.create(rayCube, {
    position: Vector3.create(16, 1.645, 0)
  })

  const rayCubeObject = engine.addEntity()
  MeshRenderer.setBox(rayCubeObject)
  Transform.create(rayCubeObject, {
    parent: rayCube,
    scale: Vector3.create(0.1, 0.1, rayDistance),
    position: Vector3.create(0, 0, rayDistance / 2 + 3)
  })
  Material.setPbrMaterial(rayCubeObject, rayMaterial)

  for (let i = 0; i < boxesCount; i++) {
    const cube = engine.addEntity()
    Transform.create(cube, {
      position: Vector3.create(2 + i * 3, 1.5, 16)
    })
    MeshRenderer.setBox(cube)
    MeshCollider.setBox(cube)
    Material.setPbrMaterial(cube, defaultMaterial)
    MovingCube.create(cube)
  }

  const floor = engine.addEntity()
  GltfContainer.create(floor, { src: 'models/Floor_sciFi_03.glb' })
  Transform.create(floor, {
    position: Vector3.create(16, 0, 16),
    scale: Vector3.create(2, 0, 2)
  })

  engine.addSystem(movingCubesSystem)
  engine.addSystem(raycastSystem)

  Ray.create(engine.CameraEntity, {
    power: 1000
  })
}

setup()
