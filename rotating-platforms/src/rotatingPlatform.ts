//import * as utils from '@dcl/ecs-scene-utils'
import { engine, Entity, GltfContainer, Transform, TransformType } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export function createRotatingPlatform(
  model: string,
  transform:Partial<TransformType>,
  rotation:Quaternion
): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, transform)

  utils.perpetualMotions.startRotation(entity,rotation)
  
  return entity
}