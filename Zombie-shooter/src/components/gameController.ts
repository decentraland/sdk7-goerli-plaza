const COMPONENT_ID = 2066

const GameControlleType = {
  spawnActive: Schemas.Boolean,
  spawnInterval: Schemas.Float,
  spawnCountDown: Schemas.Float,
  livesLeft: Schemas.Int,
  score: Schemas.Int,
  winningScore: Schemas.Int,
  maxZombies: Schemas.Int
}

export const GameControllerComponent = engine.defineComponent(GameControlleType, COMPONENT_ID)
