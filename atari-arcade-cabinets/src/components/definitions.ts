import { engine, Schemas } from '@dcl/sdk/ecs'
import { Games } from '../gameLogic/sharedConstants'

export const ArcadeFlag = engine.defineComponent('atari::ArcadeFlag', {
  game: Schemas.String
})

export const ArcadeScreenFlag = engine.defineComponent('atari::ArcadeScreenFlag', {
  game: Schemas.String
})

export const ArcadeTriggerFlag = engine.defineComponent('atari::ArcadeTriggerFlag', {
  game: Schemas.String
})

export const BallFlag = engine.defineComponent('atari::BallFlag', {
  direction: Schemas.Vector3,
  collider: Schemas.Boolean
})

export const BrickFlag = engine.defineComponent('atari::BrickFlag', {
  game: Schemas.String
})

export const CollisionFlag = engine.defineComponent('atari::collisionFlag', {})

export const GameElementsFlag = engine.defineComponent('atari::GameElementsFlag', {
  game: Schemas.String
})

export const HasGameLoaded = engine.defineComponent('atari::HasGameLoaded', {
  loaded: Schemas.Boolean,
  game: Schemas.String
})

export const IsBallAlive = engine.defineComponent('atari::IsBallAlive', {
  alive: Schemas.Boolean
})

export const KnobFlag = engine.defineComponent('atari::KnobFlag', {
  game: Schemas.String
})

export const LastHitFlag = engine.defineComponent('atari::LastHitFlag', {})

export const PaddleFlag = engine.defineComponent('atari::PaddleFlag', {
  game: Schemas.String
})

export const PlayerElementsFlag = engine.defineComponent('PlayerElementsFlag', {})

export const ReadyPlayerOneFlag = engine.defineComponent('atari::ReadyPlayerOneFlag', {
  game: Schemas.String
})

export const SpinComponent = engine.defineComponent('atari::SpinComponent', {
  clockwise: Schemas.Int
})

export const WallFlag = engine.defineComponent('atari::WallFlag', {
  normal: Schemas.Vector3
})
