export * from '@dcl/sdk'
import {
  EngineInfo,
  Entity,
  GltfContainer,
  GltfContainerLoadingState,
  LoadingState,
  MeshRenderer,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { test } from '@dcl/sdk/testing'
import { assertEquals, assertComponentValue } from '@dcl/sdk/testing/assert'

export let didTestsPass = false

test('ensure that cubes are in the scene on the first frame', function* () {
  const { tickNumber } = EngineInfo.get(engine.RootEntity)
  assertEquals(tickNumber, 1, 'Tick number must be 1')

  // check there is one cube in the entity 512
  assertComponentValue(512 as Entity, MeshRenderer, { mesh: { $case: 'box', box: { uvs: [] } } })

  // check GLTFs
  const towers = Array.from(engine.getEntitiesWith(GltfContainer))

  // check loading states
  const loadingStates = Array.from(engine.getEntitiesWith(GltfContainerLoadingState))
  console.log({ towers, loadingStates })

  assertEquals(
    loadingStates.length,
    towers.length,
    'The number of GltfContainerLoadingState must be equal to the number of GltfContainer'
  )
  for (const [entity, loadingState] of loadingStates) {
    assertEquals(
      loadingState.currentState,
      LoadingState.FINISHED,
      `The loading state of the entity ${entity} must be FINISHED`
    )
  }

  assertEquals(towers.length, 4, 'There are 4 GLTF')

  didTestsPass = true
})
