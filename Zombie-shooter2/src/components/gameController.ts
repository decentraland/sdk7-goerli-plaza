import { getNextComponentId } from './customComponentIds'

const GameControlleType = MapType({
  spawnActive: EcsBoolean,
  spawnInterval: Int32,
  spawnCountDown: Int32,
  livesLeft: Int32,
  score: Int32,
  winningScore: Int32,
  maxZombies: Int32
})

export const GameControllerComponent = engine.defineComponent(getNextComponentId(), GameControlleType)
