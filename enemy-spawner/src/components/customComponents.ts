import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

const COMPONENT_IDs = {
	enemyShip: 2228,
	moveTransform: 2229,
	enemySpawner: 2230,
	expire: 2231
}

export const EnemyShip = engine.defineComponent({}, COMPONENT_IDs.enemyShip)


const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  speed:  Schemas.Float,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_IDs.moveTransform)


// Spawner shapes
export enum SpawnerShape {
	CIRCLE,
	SQUARE,
	TRIANGLE
  }

// Enemy shapes
export enum ShipShapes {
	BLUE = 'models/blueSpaceship.glb',
	RED = 'models/redSpaceship.glb',
	GREEN  = 'models/greenSpaceship.glb'
  }

const SpawnerComponentType = {
  timeToNextSpawn: Schemas.Int,
  spawnerShape: Schemas.Enum<SpawnerShape>(Schemas.Int),
  enemyShape: Schemas.Enum<ShipShapes>(Schemas.String),
  size: Schemas.Int,
}

export const SpawnerComponent = engine.defineComponent(SpawnerComponentType, COMPONENT_IDs.enemySpawner)


export const Expire = engine.defineComponent({timeLeft: Schemas.Float}, COMPONENT_IDs.expire)



// const COMPONENT_ID = 2066

// const GameControlleType = {
//   spawnActive: Schemas.Boolean,
//   spawnInterval: Schemas.Float,
//   spawnCountDown: Schemas.Float,
//   score: Schemas.Int,
//   winningScore: Schemas.Int
// }

// export const GameControllerComponent = engine.defineComponent(GameControlleType, COMPONENT_ID)
