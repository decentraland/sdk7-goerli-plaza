import {
  engine,
  EngineInfo,
  GltfContainer,
  GltfContainerLoadingState,
  IEngine,
  LoadingState,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { spawnBirds } from './modules/birds'
import { mendezCoroutineRuntime } from './modules/coroutine'

// please do not remove this coroutine, it exists to test the compliance of the GltfContainerLoadingState component
const corountime = mendezCoroutineRuntime(engine)

corountime.run(function* waitForAllGtfLoaded() {
  console.log('initializing coroutine', EngineInfo.get(engine.RootEntity))

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

  yield* waitForAllModelsToLoad(engine)

  console.log('spawningBirds', EngineInfo.get(engine.RootEntity))

  spawnBirds()
})

function* waitForAllModelsToLoad(engine: IEngine) {
  console.log('flushing all changes to the renderer', EngineInfo.get(engine.RootEntity))
  yield // send all updates to renderer

  while (true) {
    let areLoading = false

    for (const [_entity, loadingState] of engine.getEntitiesWith(GltfContainerLoadingState)) {
      if (loadingState.currentState == LoadingState.LOADING) {
        areLoading = true
        console.log('models are still loading', EngineInfo.get(engine.RootEntity))
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
