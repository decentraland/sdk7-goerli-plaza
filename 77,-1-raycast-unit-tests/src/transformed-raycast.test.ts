import { Raycast, RaycastQueryType, RaycastResult } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { test } from '@dcl/sdk/testing'
import { assertComponentValue } from '@dcl/sdk/testing/assert'
import { createChainedEntities } from './helpers'

test('raycast: raycasting from a translated origin works', function* (context) {
  // this is the paremeter of the globalTarget
  const globalTarget = Vector3.create(0, 10, 0)

  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    { position: Vector3.create(10, 0, 10) },
    { position: Vector3.create(10, 0, 10) }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalTarget', globalTarget },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })

  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield

  // this is the global origin of the raycast, result of the translation of the entity
  const globalOrigin = Vector3.create(20, 0, 20)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.subtract(globalTarget, globalOrigin)),
    globalOrigin,
    hits: [],
    timestamp: 3
  })
})

test('raycast: localDirection raycasting from a translated origin works', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })

  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield

  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    globalOrigin,
    hits: [],
    timestamp: 3
  })
})

test('raycast: localDirection raycasting from a translated origin works, with rotated parent', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    },
    {
      scale: Vector3.create(1, 1, 1)
    }
  ])

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })

  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield

  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    globalOrigin,
    hits: [],
    timestamp: 3
  })
})

test('raycast: localDirection raycasting from a translated origin works, with rotated parent and offsetOrigin', function* (context) {
  // 1. Create an entity that is located in a transformed origin
  const entity = createChainedEntities([
    {
      position: Vector3.create(10, 0, 10),
      scale: Vector3.create(0.5, 0.5, 0.5)
    },
    {
      position: Vector3.create(10, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    },
    {
      scale: Vector3.create(1, 1, 1)
    }
  ])

  Raycast.create(entity, {
    // in this case, the originOffset is in the local space of the entity one unit forward
    originOffset: Vector3.Forward(),
    direction: { $case: 'localDirection', localDirection: Vector3.Forward() },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })

  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield

  // this is the global origin of the raycast, result of the translation and scaling of the entity
  const globalOrigin = Vector3.create(15, 0, 15)
  const rotatedForwardOrigin = Vector3.add(Vector3.create(0.5, 0, 0), globalOrigin)

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    // the direction is now right because the transform was rotated 90 degrees
    direction: Vector3.Right(),
    // and the globalOrigin is offsetted by originOffset
    globalOrigin: rotatedForwardOrigin,
    hits: [],
    timestamp: 3
  })
})
