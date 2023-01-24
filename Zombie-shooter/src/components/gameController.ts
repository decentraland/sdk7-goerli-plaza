import { Schemas, engine } from "@dcl/sdk/ecs"

const GameControlleType = {
  spawnActive: Schemas.Boolean,
  spawnInterval: Schemas.Float,
  spawnCountDown: Schemas.Float,
  livesLeft: Schemas.Int,
  score: Schemas.Int,
  winningScore: Schemas.Int,
  maxZombies: Schemas.Int
}

export const GameControllerComponent = engine.defineComponent"GameControllerComponent", GameControlleType)
