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
    const TriggerBox = targetEngine.defineComponent("TriggerBox", {})
    const TriggerArea = targetEngine.defineComponent( "TriggerArea",
        {
            size: Schemas.Vector3,
            centerOffset: Schemas.Vector3
        }
    )

    const TriggerState = targetEngine.defineComponent("TriggerState",
        {
            state: Schemas.Array(Schemas.Number)
        }
    )
    enum EventType {
        Enter,
        Exit
    }
    type EventMapType = Map<EventType, { cb: (entities: Entity[]) => void }>

    const eventsMap = new Map<Entity, EventMapType>()

    function checkTrigger(positionEntity: Entity, position: Vector3) {
        for (const [entity, area, state, transform] of targetEngine.getEntitiesWith(TriggerArea, TriggerState, Transform)) {
            const nextState = isPositionInsideTriggerArea(position, transform.position, area.size, area.centerOffset)
            const stateIndex = state.state.indexOf(positionEntity as number)
            const currentState = stateIndex !== -1

            if (currentState !== nextState) {
                const eventType = nextState ? EventType.Enter : EventType.Exit
                const data = eventsMap.get(entity)?.get(eventType)

                const triggerStateMutable = TriggerState.getMutable(entity)
                if (!currentState) {
                    triggerStateMutable.state.push(positionEntity as number)
                } else {
                    triggerStateMutable.state = triggerStateMutable.state.filter((item) => item !== positionEntity)
                }

                if (data) data.cb(triggerStateMutable.state)
            }
        }
    }

    function system() {
        const playerPosition = Transform.getOrNull(targetEngine.PlayerEntity)?.position || Vector3.Zero()
        checkTrigger(engine.PlayerEntity, playerPosition)
        for (const [entity, , transform] of targetEngine.getEntitiesWith(TriggerBox, Transform)) {
            checkTrigger(entity, transform.position)
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
        onPlayerEnter(entity: Entity, cb: (entities: Entity[]) => void) {
            const event = eventsMap.get(entity) || eventsMap.set(entity, new Map()).get(entity)!
            event.set(EventType.Enter, { cb })
        },
        onPlayerExit(entity: Entity, cb: (entities: Entity[]) => void) {
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
        },
        addTriggerBox(entity: Entity) {
            TriggerBox.createOrReplace(entity)
        },
        removeTriggerBox(entity: Entity) {
            TriggerBox.deleteFrom(entity)
        }
    }
}

export const triggerAreaSystem = createTriggerArea(engine)