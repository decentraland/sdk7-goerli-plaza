import { CustomComponents, dogStates } from '../components'
import { changeState } from './dogAI'

export function handleClicks() {
  const clickedEntities = engine.getEntitiesWith(PointerHoverFeedback)
  for (const [entity] of clickedEntities) {
    if (Input.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      if (CustomComponents.NPC.has(entity)) {
        const currentState = CustomComponents.NPC.getMutable(entity)
        if (currentState.state === dogStates.Sit) {
          changeState(entity, dogStates.Idle)
        } else {
          changeState(entity, dogStates.Sit)
        }
      }
    }
  }
}

engine.addSystem(handleClicks)
