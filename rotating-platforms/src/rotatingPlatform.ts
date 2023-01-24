//import * as utils from '@dcl/ecs-scene-utils'
import { engine, Entity, GltfContainer, Transform, TransformType } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import { KeepRotatingSystem } from './utils/keepRotating'

export function createRotatingPlatform(
  model: string,
  transform:Partial<TransformType>,
  rotation:Quaternion
): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, transform)

  //TODO DECIDE PATTERN TO USE
  //TODO add keep rotating component
  //keepRotatingSystem.addKeepRotating(entity,rotation);
  KeepRotatingSystem.instance.addKeepRotating(entity,rotation);
  
  return entity
}