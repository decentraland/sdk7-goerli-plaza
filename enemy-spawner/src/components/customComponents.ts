import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

export const EnemyShip = engine.defineComponent('EnemyShip', {})

const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  speed: Schemas.Float,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  interpolationType: Schemas.EnumNumber<InterpolationType>(InterpolationType, InterpolationType.EASESINE)
}

export const MoveTransformComponent = engine.defineComponent('MoveTransportData', MoveTransportData)

// Spawner shapes
export enum SpawnerShape {
  CIRCLE,
  SQUARE,
  TRIANGLE
}

// Enemy shapes
export enum ShipShapes {
  BLUE = 'assets/scene/Models/blueSpaceship.glb',
  RED = 'assets/scene/Models/redSpaceship.glb',
  GREEN = 'assets/scene/Models/greenSpaceship.glb'
}

const SpawnerComponentType = {
  timeToNextSpawn: Schemas.Int,
  spawnerShape: Schemas.EnumNumber<SpawnerShape>(SpawnerShape, SpawnerShape.CIRCLE),
  enemyShape: Schemas.EnumString<ShipShapes>(ShipShapes, ShipShapes.BLUE),
  size: Schemas.Int
}

export const SpawnerComponent = engine.defineComponent('SpawnerComponentType', SpawnerComponentType)

export const Expire = engine.defineComponent('Expire', {
  timeLeft: Schemas.Float
})

// const COMPONENT_ID = 2066

// const GameControlleType = {
//   spawnActive: Schemas.Boolean,
//   spawnInterval: Schemas.Float,
//   spawnCountDown: Schemas.Float,
//   score: Schemas.Int,
//   winningScore: Schemas.Int
// }

// export const GameControllerComponent = engine.defineComponent(GameControlleType, COMPONENT_ID)
