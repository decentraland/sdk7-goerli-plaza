export * from '@dcl/sdk'
import { engine, GltfContainer, GltfContainerLoadingState, LoadingState, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { spawnBirds } from './modules/birds'
import { mendezCoroutineRuntime } from './modules/coroutine'

const corountime = mendezCoroutineRuntime(engine)

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

function* waitForAllAssetsLoaded() {
  while (true) {
    let areLoading = false

    for (const [_entity, loadingState] of engine.getEntitiesWith(GltfContainerLoadingState)) {
      if (loadingState.currentState == LoadingState.LOADING) {
        areLoading = true
        break
      }
    }

    if (areLoading) {
      yield // wait one frame
    } else {
      break // finish the loading loop
    }
  }
}

corountime.run(function* waitForAllGtfLoaded() {
  yield* waitForAllAssetsLoaded()
  spawnBirds()
})
