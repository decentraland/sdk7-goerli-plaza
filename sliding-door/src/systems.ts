import { Entity, Transform, engine, TransformType } from '@dcl/ecs'

import { Quaternion, Scalar, Vector3 } from '@dcl/sdk/math'

export function transformComponent(entity: Entity, end: Partial<TransformType>, duration: number = 0) {
    function getDefaults() {
      if (duration) {
        return { speed: 1 / duration, normalizedTime: 0, lerpTime: 0 }
      }
      return { speed: 0, normalizedTime: 1, lerpTime: 1 }
    }
  
    const transform = Transform.getOrNull(entity)
    if (!transform) {
      console.error(`[rotateComponent] Transform for entity ${entity} not found`)
      return
    }
  
    const cache = {
      entity,
      start: { rotation: { ...transform.rotation }, position: { ...transform.position }, scale: { ...transform.scale } },
      end,
      duration,
      ...getDefaults()
    }
  
    function update(dt: number) {
      cache.normalizedTime = Scalar.clamp(cache.normalizedTime + dt * cache.speed, 0, 1)
      // TODO: Interpolation
      cache.lerpTime = cache.normalizedTime
  
      const transform = Transform.getMutableOrNull(entity)
      if (!transform) {
        console.log('removed system, transform not found')
        return removeSystem()
      }
      if (cache.end.rotation) {
        transform.rotation = Quaternion.slerp(cache.start.rotation, cache.end.rotation, cache.lerpTime)
      }
      if (cache.end.position) {
        transform.position = Vector3.lerp(cache.start.position, cache.end.position, cache.lerpTime)
      }
      if (cache.end.scale) {
        transform.scale = Vector3.lerp(cache.start.scale, cache.end.scale, cache.lerpTime)
      }
  
      if (cache.normalizedTime >= 1) {
        console.log('removed system, normalizedtime')
        return removeSystem()
      }
    }
    engine.addSystem(update)
    const removeSystem = () => engine.removeSystem(update)
  }