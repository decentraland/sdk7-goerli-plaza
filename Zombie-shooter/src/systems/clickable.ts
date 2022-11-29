import { Entity, engine, PointerHoverFeedback, InputAction, PointerEventType, inputSystem } from '@dcl/sdk/ecs'

const callbackMap = new Map<Entity, (entity: Entity) => void>()

export function clickedSystem() {
  for (const [entity] of engine.getEntitiesWith(PointerHoverFeedback)) {
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      const fn = callbackMap.get(entity)
      if (fn) fn(entity)
    }
  }
}

engine.addSystem(clickedSystem)

export function addClickBehavior(entity: Entity, fn: (entity: Entity) => void) {
  PointerHoverFeedback.create(entity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Click',
          maxDistance: 100,
          showFeedback: true
        }
      }
    ]
  })
  callbackMap.set(entity, fn)

  return entity
}
