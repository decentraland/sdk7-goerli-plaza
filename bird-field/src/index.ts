import { engine, EngineInfo, GltfContainer, GltfContainerLoadingState, LoadingState, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { spawnBirds } from './modules/birds'
import { mendezCoroutineRuntime } from './modules/coroutine'

// please do not remove this coroutine, it exists to test the compliance of the GltfContainerLoadingState component
const corountime = mendezCoroutineRuntime(engine)

corountime.run(function* waitForAllGtfLoaded() {
  const info = EngineInfo.get(engine.RootEntity)

  console.log(info)

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

  yield // send all updates to renderer

  while (true) {
    let areLoading = false
    console.log(info)

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

  spawnBirds()

  console.log('birds loaded')
  console.log(info)
})
