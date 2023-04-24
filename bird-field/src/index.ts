export * from '@dcl/sdk'
import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { spawnBirds } from './modules/birds'
import * as utils from '@dcl-sdk/utils'

function setup() {
  // Instantiate ground model
  const ground = engine.addEntity()
  GltfContainer.create(ground, {
    src: 'models/sand.glb'
  })

  // preload the animated bird glbs (underground), for faster loading
  const birdPreloadDummy = engine.addEntity()
  GltfContainer.create(birdPreloadDummy, {
    src: 'models/bird.glb'
  })
  Transform.create(birdPreloadDummy, {
    position: Vector3.create(8, -10, 6)
  })

  //  preload the animated bird glbs (underground), for faster loading
  const birdFlyingPreloadDummy = engine.addEntity()
  GltfContainer.create(birdFlyingPreloadDummy, {
    src: 'models/bird_fly.glb'
  })
  Transform.create(birdFlyingPreloadDummy, {
    position: Vector3.create(8, -10, 6)
  })

  // defer the spawn of the birds by 100ms
  utils.timers.setTimeout(spawnBirds, 100)
}

setup()
