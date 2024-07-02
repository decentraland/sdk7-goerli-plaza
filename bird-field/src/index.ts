import {
  engine,
  EngineInfo,
  GltfContainer,
  GltfContainerLoadingState,
  IEngine,
  LoadingState,
  Transform,
  Entity
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { spawnBirds } from './modules/birds'
import { mendezCoroutineRuntime } from './modules/coroutine'
import { setupUi } from './ui'

// please do not remove this coroutine, it exists to test the compliance of the GltfContainerLoadingState component
const corountime = mendezCoroutineRuntime(engine)
let entitiesToWait: Entity[]


function logCurrentMoment(log: string) {
  const info = EngineInfo.get(engine.RootEntity)
  console.log(`tick=${info.tickNumber} frame=${info.frameNumber} runtime=${info.totalRuntime} -- ${log}`)
}

corountime.run(function* waitForAllGtfLoaded() {
  logCurrentMoment(`initializing coroutine`)

  // preload the animated bird glbs (underground), for faster loading
  const birdPreloadDummy = engine.addEntity()
  GltfContainer.create(birdPreloadDummy, {
    src: 'assets/scene/bird.glb'
  })
  Transform.create(birdPreloadDummy, {
    position: Vector3.create(8, -10, 6)
  })

  //  preload the animated bird glbs (underground), for faster loading
  const birdFlyingPreloadDummy = engine.addEntity()
  GltfContainer.create(birdFlyingPreloadDummy, {
    src: 'assets/scene/bird_fly.glb'
  })
  Transform.create(birdFlyingPreloadDummy, {
    position: Vector3.create(8, -10, 6)
  })

  entitiesToWait = [birdPreloadDummy, birdFlyingPreloadDummy]

  yield* waitForAllModelsToLoad(engine)

  logCurrentMoment('spawningBirds')

  spawnBirds()
})

function* waitForAllModelsToLoad(engine: IEngine) {
  logCurrentMoment('flushing all changes to the renderer')

  yield // send all updates to renderer

  while (true) {
    let areLoading = entitiesToWait.some(entity => {
      const state = GltfContainerLoadingState.getOrNull(entity);
      return state == null || state.currentState != LoadingState.FINISHED;
    });

    if (areLoading) {
      yield // wait one frame
    } else {
      break // finish the loading loop
    }
  }
}

// UI with GitHub link
setupUi()
