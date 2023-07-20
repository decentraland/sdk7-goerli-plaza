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

function logCurrentMoment(log: string) {
  const info = EngineInfo.get(engine.RootEntity)
  console.log(`tick=${info.tickNumber} frame=${info.frameNumber} runtime=${info.totalRuntime} -- ${log}`)
}

corountime.run(function* waitForAllGtfLoaded() {
  logCurrentMoment(`initializing coroutine`)

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

  logCurrentMoment('spawningBirds')

  spawnBirds()
})

function* waitForAllModelsToLoad(engine: IEngine) {
  logCurrentMoment('flushing all changes to the renderer')

  yield // send all updates to renderer

  while (true) {
    let areLoading = false

    for (const [_entity, loadingState] of engine.getEntitiesWith(GltfContainerLoadingState)) {
      if (loadingState.currentState == LoadingState.LOADING) {
        areLoading = true
        logCurrentMoment('models are still loading')
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
