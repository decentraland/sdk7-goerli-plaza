import { getNextComponentId } from './customComponentIds'

const GameControlleType = {
  spawnActive: Schemas.Boolean,
  spawnInterval: Schemas.Int,
  spawnCountDown: Schemas.Int,
  livesLeft: Schemas.Int,
  score: Schemas.Int,
  winningScore: Schemas.Int,
  maxZombies: Schemas.Int
}

export const GameControllerComponent = engine.defineComponent(GameControlleType, getNextComponentId())
