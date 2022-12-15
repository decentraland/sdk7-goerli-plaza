import { engine, Entity, IEngine, Schemas, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

function isPositionInsideTriggerArea(
  targetPosition: Vector3,
  areaPosition: Vector3,
  areaSize: Vector3,
  areaCenterOffset: Vector3
): boolean {
  const detectionAreaCenter = Vector3.add(areaPosition, areaCenterOffset)
  const detectionAreaSize = areaSize

  const halfSize = Vector3.scale(detectionAreaSize, 0.5)
  const areaMinPosition = Vector3.create(
    detectionAreaCenter.x - halfSize.x,
    detectionAreaCenter.y - halfSize.y,
    detectionAreaCenter.z - halfSize.z
  )
  const areaMaxPosition = Vector3.create(
    detectionAreaCenter.x + halfSize.x,
    detectionAreaCenter.y + halfSize.y,
    detectionAreaCenter.z + halfSize.z
  )

  return (
    targetPosition.x > areaMinPosition.x &&
    targetPosition.y > areaMinPosition.y &&
    targetPosition.z > areaMinPosition.z &&
    targetPosition.x < areaMaxPosition.x &&
    targetPosition.y < areaMaxPosition.y &&
    targetPosition.z < areaMaxPosition.z
  )
}

export function createTriggerArea(targetEngine: IEngine) {
  const TriggerArea = targetEngine.defineComponent(
    {
      size: Schemas.Vector3,
      centerOffset: Schemas.Vector3
    },
    2000
  )

  const TriggerState = targetEngine.defineComponent(
    {
      state: Schemas.Boolean
    },
    2001
  )
  enum EventType {
    Enter,
    Exit
  }
  type EventMapType = Map<EventType, { cb: () => void }>

  const eventsMap = new Map<Entity, EventMapType>()

  function system() {
    const position = Transform.getOrNull(targetEngine.PlayerEntity)?.position || Vector3.Zero()
    for (const [entity, area, state, transform] of targetEngine.getEntitiesWith(TriggerArea, TriggerState, Transform)) {
      const nextState = isPositionInsideTriggerArea(position, transform.position, area.size, area.centerOffset)

      if (state.state !== nextState) {
        const eventType = nextState ? EventType.Enter : EventType.Exit
        const data = eventsMap.get(entity)?.get(eventType)

        TriggerState.getMutable(entity).state = nextState
        if (data) data.cb()
      }
    }
  }

  targetEngine.addSystem(system)

  return {
    setTriggerArea(entity: Entity, areaSize: Vector3, areaCenterOffset: Vector3) {
      TriggerArea.createOrReplace(entity, {
        size: areaSize,
        centerOffset: areaCenterOffset
      })
      TriggerState.createOrReplace(entity)
    },
    removeTriggerArea(entity: Entity) {
      TriggerArea.deleteFrom(entity)
      TriggerState.deleteFrom(entity)
    },
    onPlayerEnter(entity: Entity, cb: () => void) {
      const event = eventsMap.get(entity) || eventsMap.set(entity, new Map()).get(entity)!
      event.set(EventType.Enter, { cb })
    },
    onPlayerExit(entity: Entity, cb: () => void) {
      const event = eventsMap.get(entity) || eventsMap.set(entity, new Map()).get(entity)!
      event.set(EventType.Exit, { cb })
    },
    removeOnPlayerExit(entity: Entity) {
      eventsMap.get(entity)?.delete(EventType.Exit)
      if (eventsMap.get(entity)?.size === 0) {
        eventsMap.delete(entity)
      }
    },
    removeOnPlayerEnter(entity: Entity) {
      eventsMap.get(entity)?.delete(EventType.Enter)
      if (eventsMap.get(entity)?.size === 0) {
        eventsMap.delete(entity)
      }
    }
  }
}

export const triggerAreaSystem = createTriggerArea(engine)
