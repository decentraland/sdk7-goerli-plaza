import { engine, Raycast, RaycastQueryType, RaycastResult, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { test } from '@dcl/sdk/testing'
import { assertComponentValue } from '@dcl/sdk/testing/assert'

test('raycast: raycasting from an entity to global origin yields correct direction', function* (context) {
  const globalTarget = Vector3.create(0, 10, 0)
  const globalOrigin = Vector3.One()

  // 1. Create an entity with a transform component and a raycast component
  const entity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalTarget', globalTarget },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 3
  })

  // 2. Wait for the next frame to let the RaycastSystem to process the raycast
  yield // wait for next frame

  // 3. Validate that the RaycastResult component of the entity has the correct direction
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.subtract(globalTarget, globalOrigin)),
    globalOrigin,
    hits: [],
    timestamp: 3
  })
})

test('raycast: raycasting from an entity to local direction origin yields correct direction without transform', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const localDirection = Vector3.Down()

  const entity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'localDirection', localDirection },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 4
  })

  // wait for the next frame
  yield

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.Down()),
    globalOrigin,
    hits: [],
    timestamp: 4
  })
})

test('raycast: raycasting from an entity to another entity works like globalTarget', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const targetEntityGlobalOrigin = Vector3.create(0, 10, 10)

  const entity = engine.addEntity()
  const targetEntity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin })
  Transform.create(targetEntity, { position: targetEntityGlobalOrigin })

  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'targetEntity', targetEntity },
    continuous: false,
    maxDistance: 100,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 5
  })

  // wait for the next frame
  yield

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.subtract(targetEntityGlobalOrigin, globalOrigin)),
    globalOrigin,
    hits: [],
    timestamp: 5
  })
})

test('raycast: raycasting from an entity to local direction origin yields correct direction with last entity rotated', function* (context) {
  // create a new entity with a transform and a raycast component
  const globalOrigin = Vector3.create(0, 10, 0)
  const globalDirection = Vector3.Down()

  const entity = engine.addEntity()

  Transform.create(entity, { position: globalOrigin, rotation: Quaternion.fromEulerDegrees(45, 45, 45) })
  Raycast.create(entity, {
    originOffset: Vector3.Zero(),
    direction: { $case: 'globalDirection', globalDirection },
    continuous: false,
    maxDistance: 10,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    timestamp: 6
  })

  // wait for the next frame
  yield

  // check that the raycast result component was added to the entity
  assertComponentValue(entity, RaycastResult, {
    direction: Vector3.normalize(Vector3.Down()),
    globalOrigin,
    hits: [],
    timestamp: 6
  })
})
