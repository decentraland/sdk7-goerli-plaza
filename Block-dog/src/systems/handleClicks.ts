import { dogStates, NPComponent } from "../components/NPC"
import { changeState } from "./dogAI"


export function handleClicks() {
	const clickedEntities = engine.getEntitiesWith(PointerEvents)
	for (const [entity] of clickedEntities) {
		if(wasEntityClicked(entity, ActionButton.PRIMARY)){
			if(NPComponent.has(entity)){
				const currentState = NPComponent.getMutable(entity)
				if(currentState.state === dogStates.Sit){ 
					changeState(entity, dogStates.Idle)
				} else {
					changeState(entity, dogStates.Sit)
				} 
			
			}
		}
	}
  }
  

  engine.addSystem(handleClicks)