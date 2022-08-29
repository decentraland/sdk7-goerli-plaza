
const { OnPointerDownResult } = engine.baseComponents


const callbackMap = new Map<Entity, (entity:Entity) => void>()


export function clickedSystem(dt: number) {
  const clickedBoshapes = engine.getEntitiesWith(OnPointerDownResult)

  for (const [entity, pointerDownResult] of clickedBoshapes) {
		const fn = callbackMap.get(entity)
		if (fn) fn(entity)
  }
}

engine.addSystem(clickedSystem)

export function addClickBehavior (entity:Entity, fn:(entity:Entity) => void ) {

	engine.baseComponents.OnPointerDown.create(entity, {
		button: 0,
		maxDistance: 100,
		hoverText: "click",
		showFeedback: true
	})
	callbackMap.set(entity, fn)
	

	return entity
}
