import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { SmokeSource } from './definitions'
import smokeSystem from './modules/smoke'
import throwSmokeSystem from './modules/smokeSource'

function setup() {
  const fire = engine.addEntity()
  GltfContainer.create(fire, { src: 'models/Fireplace.glb' })
  Transform.create(fire, { position: Vector3.create(8, 0, 8) })

  // // Add a smoke source that creates a smoke puff every 0.2 seconds
  SmokeSource.create(fire, {
    particleCount: 50,
    smokeInterval: 0.2
  })

  const floor = engine.addEntity()
  GltfContainer.create(floor, { src: 'models/FloorBaseGrass.glb' })
  Transform.create(floor, { position: Vector3.create(8, 0, 8), scale: Vector3.create(1.6, 0.1, 1.6) })

  engine.addSystem(throwSmokeSystem)
  engine.addSystem(smokeSystem)
}

setup()
