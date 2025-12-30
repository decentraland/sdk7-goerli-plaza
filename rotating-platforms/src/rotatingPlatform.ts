import {
  engine,
  Entity,
  GltfContainer,
  Transform,
  TransformType,
  Tween
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

export enum Direction {
  X = 'x',
  Y = 'y',
  Z = 'z',
  invX = 'invx',
  invY = 'invy',
  invZ = 'invz'
}

export function createRotatingPlatform(
  model: string,
  transform: Partial<TransformType>,
  direction: Direction,
  duration: number
): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, transform)

  const speed = 180 / (duration / 1000)
  let directionQuat = Quaternion.Identity()

  switch (direction) {
    case Direction.X:
      directionQuat = Quaternion.fromEulerDegrees(0, 0, 90)
      break
    case Direction.invX:
      directionQuat = Quaternion.fromEulerDegrees(0, 0, -90)
      break
    case Direction.Y:
      directionQuat = Quaternion.fromEulerDegrees(0, 90, 0)
      break
    case Direction.invY:
      directionQuat = Quaternion.fromEulerDegrees(0, -90, 0)
      break
    case Direction.Z:
      directionQuat = Quaternion.fromEulerDegrees(90, 0, 0)
      break
    case Direction.invZ:
      directionQuat = Quaternion.fromEulerDegrees(-90, 0, 0)
      break
  }

  Tween.setRotateContinuous(entity, directionQuat, speed)

  return entity
}
