import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'



export const EnemyShip = engine.defineComponent("EnemyShip", {})


const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  speed:  Schemas.Float,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent("MoveTransform", MoveTransportData)


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

export const SpawnerComponent = engine.defineComponent("Spawner", SpawnerComponentType)


export const Expire = engine.defineComponent("Expire", {timeLeft: Schemas.Float})



// const GameControlleType = {
//   spawnActive: Schemas.Boolean,
//   spawnInterval: Schemas.Float,
//   spawnCountDown: Schemas.Float,
//   score: Schemas.Int,
//   winningScore: Schemas.Int
// }

// export const GameControllerComponent = engine.defineComponent("GameController", GameControlleType)
