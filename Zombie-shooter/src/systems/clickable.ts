
const callbackMap = new Map<Entity, (entity:Entity) => void>()


export function clickedSystem(dt: number) {

	for (const [entity] of engine.getEntitiesWith(PointerEvents)) {
	  if (wasEntityClicked(entity, ActionButton.PRIMARY)) {
		const fn = callbackMap.get(entity)
		if (fn) fn(entity)
	  }
	}
}

engine.addSystem(clickedSystem)

export function addClickBehavior (entity:Entity, fn:(entity:Entity) => void ) {

	PointerEvents.create(entity, {
		pointerEvents: [
			{
			  eventType: PointerEventType.DOWN,
			  eventInfo: {
				button: ActionButton.PRIMARY,
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
